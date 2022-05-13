import ky from 'ky'
import { useRouter } from 'next/router'
import { useCallback } from 'react'
import { Button, Table } from 'react-daisyui'
import { useQuery } from 'react-query'

type RoomsResponse = {
  rooms: string[]
}

export const LobbyList = () => {
  const { push } = useRouter()
  const { data } = useQuery('rooms', () =>
    ky.get(`http://localhost:5000/rooms`).json<RoomsResponse>()
  )
  console.log(data)
  const goToLobby = useCallback((id: string) => {
    push(`/lobby/${id}`)
  }, [])
  return (
    <Table compact zebra>
      <Table.Head>
        <span />
        <span>Name</span>
        <span>Connect</span>
      </Table.Head>

      <Table.Body>
        {data?.rooms.map((room, i) => (
          <Table.Row key={room}>
            <span>{i + 1}</span>
            <span>{room}</span>
            <Button onClick={() => goToLobby(room)}>Connect</Button>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  )
}
