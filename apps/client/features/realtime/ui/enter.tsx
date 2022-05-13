import { atom, useAtom } from 'jotai'
import { useRouter } from 'next/router'
import { Button, Input } from 'react-daisyui'

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
        {/* <p className="py-6">Enter lobby id.</p> */}
        <div className="flex gap-4 mt-6">
          <Input
            onChange={(e) => setVluea(e.target.value)}
            maxLength={6}
            //   type="text"
            //   placeholder="Type here"
            //   className="w-full max-w-xs input input-bordered input-primary"
          />

          <Button color="info" onClick={goToLobby}>
            Go
          </Button>
        </div>
      </div>
    </div>
  )
}
