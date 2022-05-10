import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useMetamaskAuth } from 'features/auth'
import { Lobby } from 'features/realtime'
import { privateRoute, PrivateRouteProps } from 'features/auth'
import { RealtimeProvider } from 'app/app-providers'

export const getServerSideProps = privateRoute

const Home: NextPage<PrivateRouteProps> = ({ address }) => {
  const [auth, signIn, signOut] = useMetamaskAuth()

  return (
    <RealtimeProvider accountAddress={address}>
      <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <Head>
          <title>Create Next App</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        {/* <Lobby /> */}
        <button onClick={signOut}>Logout</button>

        <footer className="flex items-center justify-center w-full h-24 border-t">
          <a
            className="flex items-center justify-center gap-2"
            href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Powered by{' '}
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </a>
        </footer>
      </div>
    </RealtimeProvider>
  )
}

export default Home
