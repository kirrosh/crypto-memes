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
      <div className="grid flex-1 overflow-x-hidden place-items-center bg-base-200 ">
        <div className="w-full px-2 py-6 max-w-7xl md:px-6 lg:px-8">
          {children}
        </div>
      </div>
    </div>
  )
}
