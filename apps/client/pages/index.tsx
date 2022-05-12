import type { NextPage } from 'next'
import Head from 'next/head'
import { privateRoute, PrivateRouteProps } from 'features/auth'
import { Enter } from 'features/realtime'
import { useConnection } from 'features/realtime/lib/socketIo'

export const getServerSideProps = privateRoute

const Home: NextPage<PrivateRouteProps> = ({ address }) => {
  return (
    <div>
      <Head>
        <title>Crypto Mmes</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Enter />
    </div>
  )
}

export default Home
