import { useAtomValue } from 'jotai'
import { useRouter } from 'next/router'
import { useCallback, useEffect } from 'react'
import { socketAtom } from './socketIo'

export const useSubscribeToGame = (gameId: string) => {
  const socket = useAtomValue(socketAtom)
  const router = useRouter()
  const onGameStart = useCallback(() => {
    router.push(`/game/${gameId}`)
  }, [gameId])
  const onGameEnd = useCallback(() => {
    router.push(`/game/${gameId}/results`)
  }, [gameId])

  useEffect(() => {
    if (socket && gameId) {
      socket.on('game-started', onGameStart)
      socket.on('game-ended', onGameEnd)
    }
    return () => {
      if (socket) {
        socket.off('game-started', onGameStart)
        socket.off('game-ended', onGameEnd)
      }
    }
  }, [socket, onGameStart])
}
