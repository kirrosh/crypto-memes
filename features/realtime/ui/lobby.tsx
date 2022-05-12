// import { useChannelMembers, useChannels } from '@pubnub/react-chat-components'
import { usePubNub } from 'pubnub-react'
import { useCallback, useEffect, useMemo } from 'react'

type Props = {
  lobbyId: string
}

const log = (msg: any) => console.log(msg)
const log2 = (msg: any) => console.log(msg)

export const Lobby = ({ lobbyId }: Props) => {
  // const [members, fetchPage, total, error] = useChannelMembers({
  //   filter: '',
  //   channel: lobbyId,
  // })
  // console.log(members)
  const pubnub = usePubNub()

  const listeners = useMemo(() => {
    return {
      // message: log,
      presence: (msg: any) => {
        console.log(msg)
        pubnub.hereNow(
          { channels: [lobbyId], includeUUIDs: true },
          (err, res) => {
            console.log(res)
          }
        )
      },
    }
  }, [lobbyId, pubnub])
  useEffect(() => {
    pubnub.addListener(listeners)
    pubnub.subscribe({
      channels: [lobbyId],
      withPresence: true,
    })
    return () => {
      pubnub.removeListener(listeners)
      pubnub.unsubscribe({
        channels: [lobbyId],
      })
    }
  }, [pubnub, lobbyId, listeners])

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
