import { PubNubProvider } from 'pubnub-react'
import { Children, FC, useMemo } from 'react'
import PubNub from 'pubnub'
import { createClient, chain, Provider as WagmiProvider } from 'wagmi'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
import { authAtom, useInitAuth, useMetamaskAuth } from 'features/auth'
import { Provider as JotaiProvider, useAtomValue } from 'jotai'
import { useRouter } from 'next/router'

type Props = {
  accountAddress?: string
}
export const RealtimeProvider: FC<Props> = ({ accountAddress, children }) => {
  const client = useMemo(
    () =>
      accountAddress &&
      new PubNub({
        publishKey: process.env.NEXT_PUBLIC_PUBNUB_PUBLISH_KEY,
        subscribeKey: process.env.NEXT_PUBLIC_PUBNUB_SUBSCRIBE_KEY || '',
        uuid: accountAddress,
      }),
    [accountAddress]
  )
  if (!client) {
    return <>Loading...</>
  }
  return <PubNubProvider client={client}>{children}</PubNubProvider>
}

const client = createClient({
  autoConnect: true,
  connectors: [
    new MetaMaskConnector({
      chains: [chain.polygon, chain.polygonMumbai],
      options: { shimDisconnect: true },
    }),
  ],
})

export const AppMainProvider: FC = ({ children }) => {
  useInitAuth()
  const auth = useAtomValue(authAtom)
  const { pathname } = useRouter()
  if (pathname === '/start') {
    return (
      <JotaiProvider>
        <WagmiProvider client={client}>{children}</WagmiProvider>
      </JotaiProvider>
    )
  }
  return (
    <JotaiProvider>
      <RealtimeProvider accountAddress={auth.address}>
        <WagmiProvider client={client}>{children}</WagmiProvider>
      </RealtimeProvider>
    </JotaiProvider>
  )
}

// export const AuthProvider: FC = ({ children }) => {
//   useInitAuth()
//   const [auth, signIn, signOut] = useMetamaskAuth()
//   console.log(auth)
//   if (auth.address) {
//     return (
//       <RealtimeProvider accountAddress={auth.address}>
//         {children}
//       </RealtimeProvider>
//     )
//   }
//   return <>Loading...</>
// }
