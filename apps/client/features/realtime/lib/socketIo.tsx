import { atom, useAtomValue, useSetAtom } from 'jotai'
import { FC, useEffect } from 'react'
import { useQuery } from 'react-query'
import { io, Socket } from 'socket.io-client'

const url = 'http://localhost:5000'

export interface DefaultEventsMap {
  [event: string]: (...args: any[]) => void
}

export const socketAtom = atom<Socket<
  DefaultEventsMap,
  DefaultEventsMap
> | null>(null)

export const useConnection = () => {
  const setSocket = useSetAtom(socketAtom)
  useEffect(() => {
    const socket = io(process.env.NEXT_PUBLIC_WS || url, {
      secure: true,
      transports: ['websocket'],
      rejectUnauthorized: false,
    })
    socket.on('connect', () => {
      setSocket(socket)
    })
    return () => {
      socket.close()
      setSocket(null)
    }
  }, [])
}

export const SocketListenersProvider: FC = ({ children }) => {
  const socket = useAtomValue(socketAtom)
  const { refetch: refetchRooms } = useQuery<string[]>('/rooms')
  useEffect(() => {
    if (socket) {
      socket.on('room-created', refetchRooms)
    }
    return () => {
      if (socket) {
        socket.off('room-created', refetchRooms)
      }
    }
  }, [socket])

  return <>{children}</>
}
