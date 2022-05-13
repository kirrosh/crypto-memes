import { atom, useAtom } from 'jotai'
import { useRouter } from 'next/router'
import { Button, Input } from 'react-daisyui'
import { LobbyList } from './lobbyList'

export const lobbyIdAtom = atom('')
export const Enter = () => {
  const { push } = useRouter()
  const [value, setVluea] = useAtom(lobbyIdAtom)
  const goToLobby = () => {
    value && push(`/lobby/${value}`)
  }
  return (
    <div className="text-center hero-content">
      <div className="max-w-md">
        <h1 className="text-5xl font-bold">Connect to Game</h1>
        <LobbyList />
        <div className="flex gap-4 mt-6">
          <Input onChange={(e) => setVluea(e.target.value)} maxLength={6} />

          <Button color="info" onClick={goToLobby}>
            Create
          </Button>
        </div>
      </div>
    </div>
  )
}
