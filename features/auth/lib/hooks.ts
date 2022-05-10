import { atom, useAtom } from 'jotai'
import { useRouter } from 'next/router'
import { useCallback, useEffect } from 'react'
import { SiweMessage } from 'siwe'
import { useAccount, useConnect, useNetwork } from 'wagmi'

export const authAtom = atom<{
  address?: string
  chainId?: number
  error?: Error
  loading?: boolean
}>({ loading: true })

export const useMetamaskAuth = () => {
  const { push } = useRouter()
  const { data: accountData, error } = useAccount()
  const { activeChain } = useNetwork()

  const { connect, connectors } = useConnect()
  const [auth, setAuth] = useAtom(authAtom)

  const signIn = useCallback(async () => {
    try {
      const connector = connectors[0]
      setAuth({ loading: true })
      const res = await connect(connector) // connect from useConnect
      if (!accountData) {
        throw error ?? new Error('Something went wrong')
      }
      const address = accountData?.address
      const chainId = activeChain?.id
      const nonceRes = await fetch('/api/auth/nonce')
      const message = new SiweMessage({
        domain: window.location.host,
        address,
        statement: 'Sign in with Ethereum to the app.',
        uri: window.location.origin,
        version: '1',
        chainId,
        nonce: await nonceRes.text(),
      })

      const signer = await connector.getSigner()
      const signature = await signer.signMessage(message.prepareMessage())

      const verifyRes = await fetch('/api/auth/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message, signature }),
      })
      if (!verifyRes.ok) throw new Error('Error verifying message')

      setAuth({ address, loading: false, chainId })
      push('/')
    } catch (error: any) {
      setAuth({ error, loading: false })
    }
  }, [])

  const signOut = useCallback(async () => {
    await fetch('/api/auth/logout', { method: 'POST' })
    setAuth({})
    push('/start')
  }, [])

  // useEffect(() => {
  //   if (
  //     account.data?.address &&
  //     auth.address &&
  //     account.data?.address !== auth.address
  //   ) {
  //     signOut()
  //   }
  // }, [account.data?.address, auth.address])

  return [auth, signIn, signOut] as [typeof auth, typeof signIn, typeof signOut]
}

export const useInitAuth = () => {
  const [auth, setAuth] = useAtom(authAtom)
  const handler = useCallback(async () => {
    try {
      const res = await fetch('/api/auth/me')
      const json = await res.json()
      json.address && setAuth((x) => ({ ...x, address: json.address }))
    } finally {
      setAuth((x) => ({ ...x, loading: false }))
    }
  }, [])
  useEffect(() => {
    ;(async () => await handler())()
  }, [auth.address])

  useEffect(() => {
    // 2. window is focused (in case user logs out of another window)
    window.addEventListener('focus', handler)
    return () => window.removeEventListener('focus', handler)
  }, [])
}
