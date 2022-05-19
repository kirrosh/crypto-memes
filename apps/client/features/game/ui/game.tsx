import { socketAtom, useGameTimer, usePlayerInfo } from 'features/realtime'
import { useSubscribeToGame } from 'features/realtime/lib/useSubscribeToGame'
import { atom, useAtom, useAtomValue } from 'jotai'
import { useEffect } from 'react'
import { Avatar, Card } from 'react-daisyui'
import { IReaction, ISituation } from 'types/api'

type Props = {
  gameId: string
}

const selectedReactionAtom = atom<IReaction | undefined>(undefined)
const selectedSituationAtom = atom<ISituation | undefined>(undefined)

export const Game = ({ gameId }: Props) => {
  const socket = useAtomValue(socketAtom)
  const [selectedReaction, selectRection] = useAtom(selectedReactionAtom)
  const [selectedSituation, selectSituation] = useAtom(selectedSituationAtom)
  const game = useSubscribeToGame(gameId)
  const playerInfo = usePlayerInfo(gameId)
  const timer = useGameTimer(gameId)
  useEffect(() => {
    selectRection(undefined)
  }, [timer?.turn])

  const onReactionClick = (reaction: IReaction) => {
    if (!selectedReaction) {
      socket?.emit('play-reaction', { roomId: gameId, reaction })
      selectRection(reaction)
    }
  }
  const onSituationClick = (situation: ISituation) => {
    if (!selectedSituation) {
      socket?.emit('play-situation', { roomId: gameId, situation })
      selectSituation(situation)
    }
  }

  return (
    <div>
      <div className="flex gap-2">
        <h1>{timer?.turn}</h1>
        <h2>{timer?.turnType}</h2>
        <h3>{timer?.countdown}</h3>
      </div>
      <div className="flex gap-2">
        {playerInfo?.situations.map((s) => (
          <div
            onClick={() => onSituationClick(s)}
            className="p-4 bg-blue-800 rounded-lg w-52 aspect-card"
          >
            <h2 className="font-bold text-white">{s.value}</h2>
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        {playerInfo?.reactions.map((r) => (
          <Avatar
            key={r.id}
            src={r.url}
            onClick={() => onReactionClick(r)}
            border={selectedReaction?.id === r.id}
          />
        ))}
      </div>
      {/* {playerInfo?.role === 'lead' ? (
        <div className="flex gap-2">
          {playerInfo.situations.map((s) => (
            <div
              onClick={() => onSituationClick(s)}
              className="p-4 bg-blue-800 border-round w-52"
            >
              <h2>{s.value}</h2>
            </div>
          ))}
        </div>
      ) : (
        playerInfo?.reactions.map((r) => (
          <Avatar
            key={r.id}
            src={r.url}
            onClick={() => onReactionClick(r)}
            border={selectedReaction?.id === r.id}
          />
        ))
      )} */}
    </div>
  )
}
