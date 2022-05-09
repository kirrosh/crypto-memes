import '../styles/globals.css'
import type { AppProps } from 'next/app'
import PubNub from 'pubnub'
import { PubNubProvider, usePubNub } from 'pubnub-react'
import { useMemo } from 'react'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
import { Provider, createClient, chain } from 'wagmi'

const client = createClient({
  autoConnect: true,
  connectors: [
    new MetaMaskConnector({
      chains: [chain.polygon, chain.polygonMumbai],
      options: { shimDisconnect: true },
    }),
  ],
})

function MyApp({ Component, pageProps }: AppProps) {
  const pubnub = useMemo(() => {
    return new PubNub({
      publishKey: process.env.NEXT_PUBLIC_PUBNUB_PUBLISH_KEY,
      subscribeKey: process.env.NEXT_PUBLIC_PUBNUB_SUBSCRIBE_KEY || '',
      uuid: 'f5282630-3444-4654-a87b-2ef42d2ba64c',
    })
  }, [])

  if (!pubnub) {
    return <>Loaidng...</>
  }

  return (
    <PubNubProvider client={pubnub}>
      <Provider client={client}>
        <Component {...pageProps} />
      </Provider>
    </PubNubProvider>
  )
}

export default MyApp
