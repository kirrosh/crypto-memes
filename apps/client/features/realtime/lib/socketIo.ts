import { atom, useSetAtom } from 'jotai'
import { useEffect } from 'react'
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
    const socket = io(process.env.NEXT_PUBLIC_WS || url)
    socket.on('connect', () => {
      console.log(socket.id)
      setSocket(socket)
    })
    return () => {
      socket.close()
      setSocket(null)
    }
  }, [])
}
