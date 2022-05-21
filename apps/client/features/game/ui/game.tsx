import { useGameTimer, usePlayerInfo } from 'features/realtime'
import { ITimer } from 'features/realtime/lib/useGameTimer'
import { useSubscribeToGame } from 'features/realtime/lib/useSubscribeToGame'
import { useSetAtom } from 'jotai'
import { useEffect } from 'react'
import { Countdown, Progress } from 'react-daisyui'
import { Reactions, selectedReactionAtom } from './reactions'
import { Results } from './results'
import { selectedSituationAtom, Situations } from './situations'

type Props = {
  gameId: string
}

const useProgress = (timer?: ITimer) => {
  if (!timer) {
    return 0
  }
  const { countdown, turnType } = timer
  if (turnType === 'vote') {
    return 100 - Math.round((countdown / 5) * 100)
  } else {
    return 100 - Math.round((countdown / 20) * 100)
  }
}

export const Game = ({ gameId }: Props) => {
  const selectRection = useSetAtom(selectedReactionAtom)
  const selectSituation = useSetAtom(selectedSituationAtom)

  const playerInfo = usePlayerInfo(gameId)
  const timer = useGameTimer(gameId)
  useEffect(() => {
    selectRection(undefined)
    selectSituation(undefined)
  }, [timer?.turn])

  if (!timer || !playerInfo) {
    return <div>Loading...</div>
  }
  return (
    <div className="flex flex-col items-center justify-between h-full gap-4">
      <div className="flex flex-col items-center gap-3">
        <h1 className="text-4xl">{timer.activeSituation?.value}</h1>
        <Countdown value={timer.countdown} className="text-4xl" />
        <h1>Turn {timer.turn}</h1>
      </div>
      <div className="justify-self-end">
        {timer.turnType === 'vote' && timer.activeReactions && (
          <Results activeReactions={timer.activeReactions} />
        )}
        {playerInfo.role === 'lead' ? (
          <Situations
            gameId={gameId}
            situations={playerInfo.situations}
            disabled={timer.turnType !== 'situation'}
          />
        ) : (
          <Reactions
            gameId={gameId}
            reactions={playerInfo.reactions}
            disabled={timer.turnType !== 'reaction'}
          />
        )}
      </div>
    </div>
  )
}
