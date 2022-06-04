import classNames from 'classnames'
import { socketAtom } from 'features/realtime'
import { atom, useAtom, useAtomValue } from 'jotai'
import { Modal } from 'react-daisyui'
import { ISituation } from 'types/api'

type Props = {
  situations: ISituation[]
  gameId: string
  isSituationModalOpen: boolean
}

export const selectedSituationAtom = atom<ISituation | undefined>(undefined)

export const Situations = ({
  situations,
  gameId,
  isSituationModalOpen,
}: Props) => {
  const socket = useAtomValue(socketAtom)
  const [selectedSituation, selectSituation] = useAtom(selectedSituationAtom)
  const onSituationClick = (situation: ISituation) => {
    if (!selectedSituation) {
      socket?.emit('play-situation', { roomId: gameId, situation })
      selectSituation(situation)
    }
  }

  return (
    <Modal open={isSituationModalOpen}>
      <Modal.Body>
        <div className="flex gap-2 overflow-x-auto">
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
      </Modal.Body>
    </Modal>
  )
}
