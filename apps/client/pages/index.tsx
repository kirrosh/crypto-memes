import type { NextPage } from 'next'
import { privateRoute, PrivateRouteProps } from 'features/auth'
import { Enter } from 'features/lobby'

export const getServerSideProps = privateRoute

const Home: NextPage<PrivateRouteProps> = ({ address }) => {
  return <Enter />
}

export default Home
