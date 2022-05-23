import { privateRoute } from 'features/auth'
import { Results } from 'features/game/ui/results'
import { useRouter } from 'next/router'

export const getServerSideProps = privateRoute

const GameResultsPage = () => {
  const router = useRouter()
  const { id } = router.query
  return typeof id === 'string' ? <Results /> : null
}

export default GameResultsPage
