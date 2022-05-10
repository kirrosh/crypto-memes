import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { AppMainProvider } from 'app/app-providers'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AppMainProvider>
      <Component {...pageProps} />
    </AppMainProvider>
  )
}

export default MyApp
