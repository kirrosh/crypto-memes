import { ITimer } from 'features/realtime'
import { Avatar } from 'react-daisyui'

type Props = {
  players: ITimer['players']
}

export const Players = ({ players }: Props) => {
  return (
    <div className="flex gap-4 px-4 py-2 overflow-x-auto">
      {players.map((p) => (
        <Avatar
          key={p.playerId}
          letters={p.name.slice(0, 3)}
          shape="circle"
          //   border
          size="sm"
        />
      ))}
    </div>
  )
}
