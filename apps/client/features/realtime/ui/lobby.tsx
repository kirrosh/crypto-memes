import { authAtom } from 'features/auth'
import { useAtomValue } from 'jotai'
import { useRouter } from 'next/router'
import { useCallback, useEffect } from 'react'
import { Button, Table } from 'react-daisyui'
import { useQuery } from 'react-query'
import { socketAtom } from '../lib/socketIo'
import { useSubscribeToLobby } from '../lib/useSubscribeToLobby'

type Props = {
  lobbyId: string
}

export const Lobby = ({ lobbyId }: Props) => {
  const { push } = useRouter()

  const goToGame = useCallback(() => {
    push(`/game/${lobbyId}`)
  }, [lobbyId])
  const { data: users } = useSubscribeToLobby(lobbyId)
  // const { data: users } = useQuery<{ account: string; id: string }[]>(
  //   `/rooms/${lobbyId}/users`
  // )

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
