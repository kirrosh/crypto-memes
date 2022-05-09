import { usePubNub } from 'pubnub-react'
import { useCallback, useEffect } from 'react'

const CHAT_ID = '1432'

export const Lobby = () => {
  const pubnub = usePubNub()
  useEffect(() => {
    // pubnub
    //   ?.publish({ channel: CHAT_ID, message: { type: 'CONNECT' } })
    //   .then(() => {
    //     console.log('connected')
    //     pubnub.hereNow(
    //       {
    //         channels: [CHAT_ID],
    //         includeState: true,
    //       },
    //       function (status, response) {
    //         console.log(status, response)
    //       }
    //     )
    //   })

    pubnub.addListener({
      message: (msg) => {
        console.log(msg)
      },
      presence: (msg) => console.log(msg),
    })
    pubnub.subscribe({
      channels: [CHAT_ID],
      withPresence: true,
    })
  }, [pubnub])

  const sendMessage = useCallback(() => {
    return pubnub.publish({
      channel: CHAT_ID,
      message: { type: 'MESSAGE', text: 'Hello' },
    })
  }, [pubnub])

  return <button onClick={sendMessage}>Send</button>
}
