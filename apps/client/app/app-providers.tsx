import { FC } from 'react'
import { createClient, chain, Provider as WagmiProvider } from 'wagmi'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
import { useInitAuth } from 'features/auth'

import { useConnection } from 'features/realtime/lib/socketIo'

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
  return <WagmiProvider client={client}>{children}</WagmiProvider>
}
