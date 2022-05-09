import '../styles/globals.css'
import type { AppProps } from 'next/app'
import PubNub from 'pubnub'
import { PubNubProvider, usePubNub } from 'pubnub-react'
import { useMemo } from 'react'

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
      <Component {...pageProps} />
    </PubNubProvider>
  )
}

export default MyApp
