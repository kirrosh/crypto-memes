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
  playVote: (winner: string) => void;

  constructor({
    address,
    playSituation,
    playReaction,
    playVote,
  }: {
    address: string;
    playSituation: (userId: string, situation: Situation) => void;
    playReaction: (userId: string, reaction: Reaction) => void;
    playVote: (winner: string) => void;
  }) {
    this.id = 'bot-' + v4();
    this.address = address;
    this.playSituation = playSituation;
    this.playReaction = playReaction;
    this.playVote = playVote;
  }

  setPlayerInfo(playerInfo: PlayerInfo) {
    this.playerInfo = playerInfo;
  }

  notifyBot(timer: Timer) {
    if (this.playerInfo?.role === 'lead') {
      if (timer.turnType === 'situation' && timer.countdown > 5) {
        setTimeout(() => {
          this.playSituation(this.id, this.playerInfo?.situations[0]);
        }, 1000);
      }
      if (timer.turnType === 'vote' && timer.countdown > 5) {
        setTimeout(() => {
          this.playVote(timer.players.at(0)?.playerId);
        }, 1000);
      }
    }
    if (this.playerInfo?.role === 'player') {
      if (timer.turnType === 'reaction' && !this.playerInfo?.reaction) {
        this.playReaction(this.id, this.playerInfo.reactions[0]);
      }
    }
  }
}
