import { PubNubProvider } from 'pubnub-react'
import { Children, FC, useMemo } from 'react'
import PubNub from 'pubnub'
import { createClient, chain, Provider as WagmiProvider } from 'wagmi'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
import { useInitAuth, useMetamaskAuth } from 'features/auth'
import { Provider as JotaiProvider } from 'jotai'

type Props = {
  accountAddress: string
}
export const RealtimeProvider: FC<Props> = ({ accountAddress, children }) => {
  const client = useMemo(() => {
    return new PubNub({
      publishKey: process.env.NEXT_PUBLIC_PUBNUB_PUBLISH_KEY,
      subscribeKey: process.env.NEXT_PUBLIC_PUBNUB_SUBSCRIBE_KEY || '',
      uuid: accountAddress,
    })
  }, [accountAddress])
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
  return (
    <JotaiProvider>
      <WagmiProvider client={client}>{children}</WagmiProvider>
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
