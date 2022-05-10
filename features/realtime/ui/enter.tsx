import { atom, useAtom } from 'jotai'
import { useRouter } from 'next/router'

export const lobbyIdAtom = atom('')
export const Enter = () => {
  const { push } = useRouter()
  const [value, setVluea] = useAtom(lobbyIdAtom)
  const goToLobby = () => {
    value && push(`/lobby/${value}`)
  }
  return (
    <div className="min-h-screen hero bg-base-200">
      <div className="text-center hero-content">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold">Connect to Game</h1>
          {/* <p className="py-6">Enter lobby id.</p> */}
          <div className="flex gap-4 mt-6">
            <input
              onChange={(e) => setVluea(e.target.value)}
              maxLength={6}
              type="text"
              //   placeholder="Type here"
              className="w-full max-w-xs input input-bordered input-primary"
            />

            <button className="btn btn-primary" onClick={goToLobby}>
              Go
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
