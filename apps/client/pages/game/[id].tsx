import { privateRoute } from 'features/auth'
import { Game } from 'features/game'
import { useRouter } from 'next/router'

export const getServerSideProps = privateRoute

const GameyPage = () => {
  const router = useRouter()
  const { id } = router.query
  return typeof id === 'string' ? <Game gameId={id} /> : null
}

export default GameyPage
