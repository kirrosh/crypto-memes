import { atom, useAtomValue, useAtom } from 'jotai'
import { useEffect } from 'react'
import { IReaction, ISituation } from 'types/api'
import { socketAtom } from './socketIo'

export type ITimer = {
  countdown: number
  turnType: string
  turn: number
  activeSituation?: ISituation
  activeReactions: Record<string, IReaction>
  players: { playerId: string; name: string; points: number }[]
}

export const timerAtom = atom<ITimer | undefined>(undefined)

export const useGameTimer = (gameId: string) => {
  const socket = useAtomValue(socketAtom)
  const [timer, setTimer] = useAtom(timerAtom)
  useEffect(() => {
    socket?.on('timer-countdown', setTimer)
    return () => {
      socket?.off('timer-countdown', setTimer)
    }
  }, [socket, gameId])
  return timer
}

export type IPlayerInfo = {
  reaction?: IReaction
  situation?: ISituation
  points: number
  situations: ISituation[]
  reactions: IReaction[]
  role: 'lead' | 'player'
}

export const playerInfoAtom = atom<IPlayerInfo | undefined>(undefined)
export const usePlayerInfo = (gameId: string) => {
  const socket = useAtomValue(socketAtom)
  const [playerInfo, setPlayerInfo] = useAtom(playerInfoAtom)
  useEffect(() => {
    socket?.on('player-info', setPlayerInfo)
    return () => {
      socket?.off('player-info', setPlayerInfo)
    }
  }, [socket, gameId])
  return playerInfo
}
