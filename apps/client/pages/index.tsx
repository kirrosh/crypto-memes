import type { NextPage } from 'next'
import { privateRoute, PrivateRouteProps } from 'features/auth'
import { Enter } from 'features/lobby'
import { Board } from 'features/game/ui/board'

export const getServerSideProps = privateRoute

const Home: NextPage<PrivateRouteProps> = ({ address }) => {
  return <Board />
}

export default Home
