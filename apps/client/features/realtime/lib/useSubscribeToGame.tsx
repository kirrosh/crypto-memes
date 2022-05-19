import { atom, useAtomValue, useAtom } from 'jotai'
import ky from 'ky'
import { useEffect } from 'react'
import { useMutation, useQuery } from 'react-query'
import { socketAtom } from './socketIo'

type IGame = {
  situations: { id: number; value: string }[]
  reactions: { id: number; url: string }[]
  players: Map<
    string,
    { reaction?: number; situation?: number; points: number }
  >
  lead?: string
  turn: number
}

export const gameAtom = atom<IGame | undefined>(undefined)

// export const cardsAtom = atom<{
//   situations: { id: number; value: string }[]
//   reactions: { id: number; url: string }[]
// }>({ reactions: [], situations: [] })

export const useSubscribeToGame = (gameId: string) => {
  const socket = useAtomValue(socketAtom)
  const [game, setGame] = useAtom(gameAtom)
  // const { mutate } = useMutation(() => {
  //   return ky.post(`${process.env.NEXT_PUBLIC_WS}/game/${gameId}/start`).json()
  // })
  useEffect(() => {
    if (socket && gameId) {
      socket.on('game-started', setGame)
      socket.on('next-turn', setGame)
      // socket.emit('start-game', gameId)
      setTimeout(() => {
        socket.emit('start-game', gameId)
      }, 100)
    }
    return () => {
      if (socket) {
        socket.off('game-started', setGame)
        socket.off('next-turn', setGame)
        socket?.emit('leave-lobby', gameId)
      }
    }
  }, [socket, gameId])
  return game
}
