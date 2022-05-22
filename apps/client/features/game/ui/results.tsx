import { formatAddress } from 'features/auth'
import { ITimer } from 'features/realtime'
import { useMemo } from 'react'
import { Mask } from 'react-daisyui'
import { IReaction } from 'types/api'

type Props = {
  activeReactions: ITimer['activeReactions']
  players: ITimer['players']
}

export const Results = ({ activeReactions, players }: Props) => {
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
          />
        </div>
      ))}
    </div>
  )
}
