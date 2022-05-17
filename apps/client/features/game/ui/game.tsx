import { socketAtom } from 'features/realtime'
import { useSubscribeToGame } from 'features/realtime/lib/useSubscribeToGame'
import { useAtomValue } from 'jotai'

type Props = {
  gameId: string
}

export const Game = ({ gameId }: Props) => {
  const socket = useAtomValue(socketAtom)
  useSubscribeToGame(gameId)

  return <div>{gameId}</div>
}
