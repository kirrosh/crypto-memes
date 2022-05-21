import { privateRoute } from 'features/auth'
import { Lobby } from 'features/lobby'
import { useRouter } from 'next/router'

export const getServerSideProps = privateRoute

const LobbyPage = () => {
  const router = useRouter()
  const { id } = router.query
  return typeof id === 'string' ? <Lobby lobbyId={id} /> : null
}

export default LobbyPage
