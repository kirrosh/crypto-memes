import { Reaction, Situation } from '@prisma/client';
import { v4 } from 'uuid';
import { PlayerInfo, Timer } from './game-process';

export class PlayerBot {
  static isBot(id: string): boolean {
    return id.startsWith('bot-');
  }
  id: string;
  address: string;
  playerInfo?: PlayerInfo;
  playSituation: (userId: string, situation: Situation) => void;
  playReaction: (userId: string, reaction: Reaction) => void;

  constructor({
    address,
    playSituation,
    playReaction,
  }: {
    address: string;
    playSituation: (userId: string, situation: Situation) => void;
    playReaction: (userId: string, reaction: Reaction) => void;
  }) {
    this.id = 'bot-' + v4();
    this.address = address;
    this.playSituation = playSituation;
    this.playReaction = playReaction;
  }

  setPlayerInfo(playerInfo: PlayerInfo) {
    this.playerInfo = playerInfo;
  }

  notifyBot(timer: Timer) {
    if (this.playerInfo?.role === 'lead') {
      if (timer.turnType === 'situation') {
        this.playSituation(this.id, this.playerInfo?.situations[0]);
      }
    }
    if (this.playerInfo?.role === 'player') {
      if (timer.turnType === 'reaction' && !this.playerInfo?.reaction) {
        this.playReaction(this.id, this.playerInfo.reactions[0]);
      }
    }
  }
}
