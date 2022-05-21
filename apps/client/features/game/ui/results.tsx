import { formatAddress } from 'features/auth'
import { Mask } from 'react-daisyui'
import { IReaction } from 'types/api'

type Props = {
  activeReactions: Map<string, IReaction>
}

export const Results = ({ activeReactions }: Props) => {
  return (
    <div>
      {Array.from(activeReactions.entries()).map(([key, value]) => (
        <div key={key}>
          <span>{formatAddress(key)}</span>
          <Mask
            src={value.url}
            width={200}
            height={200}
            variant="squircle"
            className="p-8 bg-primary"
            //   onClick={() => onReactionClick(r)}
            //   border={selectedReaction?.id === r.id}
          />
        </div>
      ))}
    </div>
  )
}
