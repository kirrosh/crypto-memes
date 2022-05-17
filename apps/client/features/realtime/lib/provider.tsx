import { authAtom } from 'features/auth'
import { useAtomValue } from 'jotai'
import { FC, useEffect } from 'react'
import { useQuery } from 'react-query'
import { socketAtom } from './socketIo'

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
