import { usePubNub } from 'pubnub-react'
import { useCallback, useEffect } from 'react'

type Props = {
  lobbyId: string
}
export const Lobby = ({ lobbyId }: Props) => {
  const pubnub = usePubNub()
  useEffect(() => {
    pubnub.addListener({
      message: (msg) => {
        console.log(msg)
      },
      presence: (msg) => console.log(msg),
    })
    pubnub.subscribe({
      channels: [lobbyId],
      withPresence: true,
    })
    return () => {
      pubnub.unsubscribe({
        channels: [lobbyId],
      })
    }
  }, [pubnub, lobbyId])

  // const sendMessage = useCallback(() => {
  //   return pubnub.publish({
  //     channel: lobbyId,
  //     message: { type: 'MESSAGE', text: 'Hello' },
  //   })
  // }, [pubnub])

  return (
    <div className="min-h-screen hero bg-base-200">
      <div className="text-center hero-content">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold">Lobby {lobbyId}</h1>
          {/* <p className="py-6">Enter lobby id.</p> */}
          <div className="flex gap-4 mt-6"></div>
        </div>
      </div>
    </div>
  )
}
