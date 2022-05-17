import { authAtom } from 'features/auth'
import { useAtomValue } from 'jotai'
import { FC, useEffect } from 'react'
import { useQuery } from 'react-query'
import { socketAtom } from './socketIo'

export const useSubscribeToLobby = (lobbyId: string) => {
  const auth = useAtomValue(authAtom)
  const socket = useAtomValue(socketAtom)
  const query = useQuery<{ account: string; id: string }[]>(
    `/rooms/${lobbyId}/users`
  )

  useEffect(() => {
    if (socket && auth.address && lobbyId) {
      socket.on('join-room', query.refetch)
      socket.on('leave-room', query.refetch)
      setTimeout(() => {
        socket?.emit('join-lobby', {
          lobby: lobbyId,
          account: auth.address,
        })
      }, 100)
    }
    return () => {
      if (socket) {
        socket.off('join-room', query.refetch)
        socket.off('leave-room', query.refetch)
        socket?.emit('leave-lobby', lobbyId)
      }
    }
  }, [socket, lobbyId, auth.address])
  return query
}

export const SocketListenersProvider: FC = ({ children }) => {
  const socket = useAtomValue(socketAtom)
  const { refetch: refetchRooms } = useQuery<string[]>('/rooms')
  useEffect(() => {
    if (socket) {
      socket.on('create-room', refetchRooms)
    }
    return () => {
      if (socket) {
        socket.off('create-room', refetchRooms)
      }
    }
  }, [socket])

  return <>{children}</>
}
