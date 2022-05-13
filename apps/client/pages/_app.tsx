import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { AppMainProvider } from 'app/app-providers'
import { Provider as JotaiProvider } from 'jotai'
import { Layuot } from 'features/layout'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <JotaiProvider>
      <AppMainProvider>
        <Layuot>
          <Component {...pageProps} />
        </Layuot>
      </AppMainProvider>
    </JotaiProvider>
  )
}

export default MyApp
