import {
  useGameTimer,
  usePlayerInfo,
  useSubscribeToGame,
} from 'features/realtime'
import { FC, useEffect } from 'react'

type Props = {
  gameId: string
}

export const GameLayout: FC<Props> = ({ children, gameId }) => {
  useSubscribeToGame(gameId)
  usePlayerInfo(gameId)
  useGameTimer(gameId)
  useEffect(() => {
    console.log('mounting GameLayout')
    return () => {
      console.log('unmounting GameLayout')
    }
  }, [])
  return <>{children}</>
}
