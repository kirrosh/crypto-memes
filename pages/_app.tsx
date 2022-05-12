import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { AppMainProvider } from 'app/app-providers'
import { useConnection } from 'features/realtime/lib/socketIo'
import { Provider as JotaiProvider } from 'jotai'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <JotaiProvider>
      <AppMainProvider>
        <Component {...pageProps} />
      </AppMainProvider>
    </JotaiProvider>
  )
}

export default MyApp
