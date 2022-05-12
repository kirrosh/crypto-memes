import { Lobby } from 'features/realtime'
import { useRouter } from 'next/router'

const LobbyPage = () => {
  const router = useRouter()
  const { id } = router.query
  return typeof id === 'string' ? <Lobby lobbyId={id} /> : null
}

export default LobbyPage
