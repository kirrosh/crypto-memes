import { timerAtom } from 'features/realtime'
import { useAtomValue } from 'jotai'
import { Players } from './players'

export const Results = () => {
  const timer = useAtomValue(timerAtom)
  return timer ? <Players players={timer?.players} /> : <div>No data :(</div>
}
