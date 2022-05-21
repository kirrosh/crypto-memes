import { useRouter } from 'next/router'
import { useCallback } from 'react'
import { Button, Table } from 'react-daisyui'
import { useQuery } from 'react-query'

type SituationsResponse = {
  id: number
  value: string
}

export const LobbyList = () => {
  const { push } = useRouter()
  const { data } = useQuery<string[]>('/rooms')

  const { data: situations } = useQuery<SituationsResponse>('/situations')
  console.log(situations)
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
        {data?.map((room, i) => (
          <Table.Row key={room + i}>
            <span>{i + 1}</span>
            <span>{room}</span>
            <Button onClick={() => goToLobby(room)}>Connect</Button>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  )
}
