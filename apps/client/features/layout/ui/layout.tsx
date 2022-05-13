import { FC } from 'react'
import Head from 'next/head'
import { Header } from './header'
export const Layuot: FC = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Head>
        <title>Crypto Memes</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <div className="flex-1 hero bg-base-200">
        <div className="py-6 mx-auto max-w-7xl sm:px-6 lg:px-8">{children}</div>
      </div>
    </div>
  )
}
