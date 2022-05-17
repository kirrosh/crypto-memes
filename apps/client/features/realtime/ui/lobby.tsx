import { authAtom } from 'features/auth'
import { useAtomValue } from 'jotai'
import { useEffect } from 'react'
import { Table } from 'react-daisyui'
import { useQuery } from 'react-query'
import { socketAtom } from '../lib/socketIo'

type Props = {
  lobbyId: string
}

export const Lobby = ({ lobbyId }: Props) => {
  const auth = useAtomValue(authAtom)
  const socket = useAtomValue(socketAtom)
  const { data: users } = useQuery<{ account: string; id: string }[]>(
    `/rooms/${lobbyId}/users`
  )
  console.log(users)
  useEffect(() => {
    const onlobby = (lobby: any) => {
      console.log(lobby)
    }
    socket?.emit('joinLobby', {
      lobby: lobbyId,
      account: auth.address,
    })
    socket?.on('lobbyUpdate', onlobby)
    return () => {
      socket?.off('lobbyUpdate', onlobby)
    }
  }, [socket])

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
      </div>
    </div>
  )
}
