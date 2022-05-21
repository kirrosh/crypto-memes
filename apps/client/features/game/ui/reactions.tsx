import classNames from 'classnames'
import { socketAtom } from 'features/realtime'
import { useAtomValue, useAtom, atom } from 'jotai'
import { Avatar, Mask } from 'react-daisyui'
import { IReaction } from 'types/api'

type Props = {
  gameId: string
  reactions: IReaction[]
  disabled: boolean
}

export const selectedReactionAtom = atom<IReaction | undefined>(undefined)

export const Reactions = ({ gameId, reactions, disabled }: Props) => {
  const socket = useAtomValue(socketAtom)
  const [selectedReaction, selectRection] = useAtom(selectedReactionAtom)
  const onReactionClick = (reaction: IReaction) => {
    if (!selectedReaction && !disabled) {
      socket?.emit('play-reaction', { roomId: gameId, reaction })
      selectRection(reaction)
    }
  }

  return (
    <div className="flex gap-2">
      {reactions.map((r) => (
        <Mask
          key={r.id}
          src={r.url}
          width={200}
          height={200}
          variant="squircle"
          className={classNames(
            'p-8 bg-primary',
            selectedReaction?.id === r.id && 'bg-green-500'
          )}
          onClick={() => onReactionClick(r)}
          //   border={selectedReaction?.id === r.id}
        >
          {/* <Mask
            key={r.id}
            src={r.url}
            variant="squircle"
            onClick={() => onReactionClick(r)}
            //   border={selectedReaction?.id === r.id}
          /> */}
        </Mask>
      ))}
    </div>
  )
}
