import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { AppMainProvider } from 'app/app-providers'
import { Provider as JotaiProvider } from 'jotai'
import { Layuot } from 'features/layout'

function MyApp({ Component, pageProps, router }: AppProps) {
  // return <div />
  const isGame = router.route === '/game/[id]' || router.route === '/lobby/[id]'
  const { id } = router.query
  return (
    <JotaiProvider>
      <AppMainProvider>
        <Layuot>
          {/* <Layuot>
          {isGame && typeof id === 'string' ? (
            <GameLayout gameId={id}> */}
          <Component {...pageProps} />
          {/* </GameLayout>
          ) : (
            <Component {...pageProps} />
          )}
        </Layuot> */}
        </Layuot>
      </AppMainProvider>
    </JotaiProvider>
  )
}

export default MyApp
