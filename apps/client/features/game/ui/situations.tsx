import classNames from 'classnames'
import { socketAtom } from 'features/realtime'
import { atom, useAtom, useAtomValue } from 'jotai'
import { ISituation } from 'types/api'

type Props = {
  situations: ISituation[]
  gameId: string
  disabled?: boolean
}

export const selectedSituationAtom = atom<ISituation | undefined>(undefined)

export const Situations = ({ situations, gameId, disabled }: Props) => {
  const socket = useAtomValue(socketAtom)
  const [selectedSituation, selectSituation] = useAtom(selectedSituationAtom)
  const onSituationClick = (situation: ISituation) => {
    if (!selectedSituation && !disabled) {
      socket?.emit('play-situation', { roomId: gameId, situation })
      selectSituation(situation)
    }
  }

  return (
    <div className="flex flex-wrap gap-2">
      {situations.map((s) => (
        <div
          onClick={() => onSituationClick(s)}
          className={classNames(
            'p-4 bg-primary rounded-2xl w-52 aspect-card cursor-pointer hover:shadow-md',
            selectedSituation?.id === s.id && 'bg-green-500'
          )}
        >
          <h2 className="text-2xl font-bold text-white">{s.value}</h2>
        </div>
      ))}
    </div>
  )
}
