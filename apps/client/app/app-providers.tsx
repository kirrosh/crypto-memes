import { FC } from 'react'
import { createClient, chain, Provider as WagmiProvider } from 'wagmi'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
import { useInitAuth } from 'features/auth'

import { SocketListenersProvider, useConnection } from 'features/realtime'
import {
  QueryClient,
  QueryClientProvider,
  QueryFunctionContext,
  QueryKey,
} from 'react-query'
import ky from 'ky'

function defaultQueryFn<T>({ queryKey }: QueryFunctionContext<QueryKey, any>) {
  return ky.get(`${process.env.NEXT_PUBLIC_WS}${queryKey[0]}`).json<T>()
  // const { data } = await axios.get(`https://jsonplaceholder.typicode.com${queryKey[0]}`);
  // return data;
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      queryFn: defaultQueryFn,
    },
  },
})

const client = createClient({
  autoConnect: true,
  connectors: [
    new MetaMaskConnector({
      chains: [chain.polygon, chain.polygonMumbai],
      options: { shimDisconnect: true },
    }),
  ],
})

export const AppMainProvider: FC = ({ children }) => {
  useInitAuth()
  useConnection()
  return (
    <WagmiProvider client={client}>
      <QueryClientProvider client={queryClient}>
        <SocketListenersProvider></SocketListenersProvider>
        {children}
      </QueryClientProvider>
    </WagmiProvider>
  )
}
