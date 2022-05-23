import { ITimer, socketAtom, IPlayerInfo } from 'features/realtime'
import { useAtomValue, useAtom } from 'jotai'
import { useMemo } from 'react'
import { Mask } from 'react-daisyui'
import { IReaction } from 'types/api'
import { selectedReactionAtom } from './reactions'

type Props = {
  activeReactions: ITimer['activeReactions']
  players: ITimer['players']
  gameId: string
  role: IPlayerInfo['role']
}

export const Vote = ({ activeReactions, players, gameId, role }: Props) => {
  const socket = useAtomValue(socketAtom)
  const playersMap = useMemo(() => {
    const playersMap = new Map<
      string,
      { playerId: string; name: string; points: number }
    >()
    players.forEach((p) => {
      playersMap.set(p.playerId, p)
    })
    return playersMap
  }, [players.length])

  const onVoteClick = (playerId: string) => {
    if (role === 'lead') {
      socket?.emit('play-vote', { roomId: gameId, winner: playerId })
    }
  }
  return (
    <div className="flex gap-2">
      {Array.from(Object.entries(activeReactions)).map(([key, value]) => (
        <div key={key}>
          <span>{playersMap.get(key)?.name.slice(0, 3)}</span>
          <Mask
            src={value.url}
            width={100}
            height={100}
            variant="squircle"
            className="p-4 bg-primary"
            onClick={() => onVoteClick(key)}
          />
        </div>
      ))}
    </div>
  )
}
