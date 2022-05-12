import { useAtomValue } from 'jotai'
import { useCallback, useEffect } from 'react'
import { Button } from 'react-daisyui'
import { socketAtom } from '../lib/socketIo'

type Props = {
  lobbyId: string
}

export const Lobby = ({ lobbyId }: Props) => {
  const socket = useAtomValue(socketAtom)

  useEffect(() => {
    socket?.emit('joinLobby', lobbyId)
  }, [socket])

  const emit = useCallback(() => {
    socket?.emit('joinLobby', lobbyId)
  }, [socket])
  return (
    <div className="min-h-screen hero bg-base-200">
      <div className="text-center hero-content">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold">Lobby {lobbyId}</h1>
          <div className="flex gap-4 mt-6"></div>
          <Button onClick={emit}>Emit</Button>
        </div>
      </div>
    </div>
  )
}
