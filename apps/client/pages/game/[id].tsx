import { Game } from 'features/game'
import { useRouter } from 'next/router'

const GameyPage = () => {
  const router = useRouter()
  const { id } = router.query
  return typeof id === 'string' ? <Game gameId={id} /> : null
}

export default GameyPage
