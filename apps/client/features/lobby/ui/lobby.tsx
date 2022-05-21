import {
  socketAtom,
  useSubscribeToGame,
  useSubscribeToLobby,
} from 'features/realtime'
import { useAtomValue } from 'jotai'
import { useCallback } from 'react'
import { Button, Table } from 'react-daisyui'

type Props = {
  lobbyId: string
}

export const Lobby = ({ lobbyId }: Props) => {
  const socket = useAtomValue(socketAtom)
  useSubscribeToGame(lobbyId)
  const goToGame = useCallback(() => {
    socket?.emit('start-game', lobbyId)
  }, [socket, lobbyId])
  const { data: users } = useSubscribeToLobby(lobbyId)

  return (
    <div className="text-center hero-content">
      <div className="max-w-md">
        <h1 className="text-5xl font-bold">Lobby {lobbyId}</h1>
        <Table compact zebra>
          <Table.Head>
            <span />
            <span>Account</span>
          </Table.Head>

          <Table.Body>
            {users?.map((room, i) => (
              <Table.Row key={room.account}>
                <span>{i + 1}</span>
                <span>{room.account}</span>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
        <Button onClick={goToGame}>Start</Button>
      </div>
    </div>
  )
}
