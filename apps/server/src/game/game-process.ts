import { Reaction, Situation } from '@prisma/client';

type Player = {
  playerId: string;
  reaction?: Reaction;
  situation?: Situation;
  points: number;
  situations: Situation[];
  reactions: Reaction[];
};

export type Timer = {
  countdown: number;
  turnType: TurnType;
  turn: number;
  activeSituation: Situation;
  activeReactions: Map<string, Reaction>;
  players: Player[];
};

export type PlayerInfo = {
  role: 'lead' | 'player';
} & Player;

type TurnType = 'situation' | 'reaction' | 'vote';

export class GameProcess {
  situations: Situation[];
  reactions: Reaction[];
  gameId: string;
  turn: number;
  players: Map<string, Player>;
  lead?: string;
  activeSituation?: Situation;
  activeReactions: Map<string, Reaction>;
  timer: {
    countdown: number;
    turnType: TurnType;
  };
  emitPlayerInfo: (playersInfo: PlayerInfo, playerId: string) => void;
  onTimerTick: (paylod: Timer) => void;
  onEndgame: () => void;

  constructor({
    gameId,
    players,
    reactions,
    situations,
    onEndgame,
    emitPlayerInfo,
    onTimerTick,
  }: {
    gameId: string;
    situations: Situation[];
    reactions: Reaction[];
    players: string[];
    emitPlayerInfo: (playersInfo: PlayerInfo, playerId: string) => void;
    onTimerTick: (paylod: {
      countdown: number;
      turnType: TurnType;
      turn: number;
    }) => void;
    onEndgame: () => void;
  }) {
    this.gameId = gameId;
    this.situations = situations;
    this.reactions = reactions;
    this.turn = 1;
    this.players = new Map();
    this.emitPlayerInfo = emitPlayerInfo;
    this.onTimerTick = onTimerTick;
    this.timer = {
      countdown: 20,
      turnType: 'situation' as TurnType,
    };
    this.activeReactions = new Map();
    this.onEndgame = onEndgame;
    players.forEach((playerId) => this.addPlayer(playerId));
    this.lead = players[0];
  }

  getSituationsFromDeck(amount: number) {
    return this.situations.splice(0, amount);
  }
  getReactionsFromDeck(amount: number) {
    return this.reactions.splice(0, amount);
  }

  addPlayer(playerId: string) {
    this.players.set(playerId, {
      playerId,
      points: 0,
      reactions: this.getReactionsFromDeck(3),
      situations: this.getSituationsFromDeck(2),
    });
  }

  playReaction({ reaction, userId }: { userId: string; reaction: Reaction }) {
    this.activeReactions.set(userId, reaction);
    this.players.get(userId).reaction = reaction;
    this.players.get(userId).reactions = this.players
      .get(userId)
      .reactions.filter((r) => r.id !== reaction.id);
    if (
      this.activeReactions.size > 0 &&
      this.activeReactions.size === this.players.size - 1
    ) {
      this.timer.countdown = 0;
    }
  }

  playSituation({
    situation,
    userId,
  }: {
    userId: string;
    situation: Situation;
  }) {
    this.activeSituation = situation;
    this.players.get(userId).situation = situation;
    this.players.get(userId).situations = this.players
      .get(userId)
      .situations.filter((r) => r.id !== situation.id);
    this.timer.countdown = 0;
  }

  updatecards() {
    this.players.forEach((player, id) => {
      if (id === this.lead) {
        this.players.set(id, {
          ...player,
          reaction: undefined,
          situation: undefined,
          situations: player.situations.concat(this.getSituationsFromDeck(1)),
        });
      } else {
        this.players.set(id, {
          ...player,
          reaction: undefined,
          situation: undefined,
          reactions: player.reactions.concat(this.getReactionsFromDeck(1)),
        });
      }
    });
  }

  resetActiveCards() {
    this.activeReactions.clear();
    this.activeSituation = undefined;
  }

  async nextPhase() {
    const { timer } = this;
    switch (timer.turnType) {
      case 'situation': {
        timer.countdown = 20;
        timer.turnType = 'reaction';
        break;
      }
      case 'reaction': {
        timer.countdown = 5;
        timer.turnType = 'vote';
        break;
      }
      case 'vote': {
        timer.countdown = 20;
        timer.turnType = 'situation';
        this.turn++;

        this.makeWinner();
        this.updatecards();
        this.resetActiveCards();
        break;
      }
    }
    this.emitAllPlayersInfo();
    this.countdownTimer();
  }
  emitAllPlayersInfo() {
    this.players.forEach((player, id) =>
      this.emitPlayerInfo(
        {
          ...player,
          role: this.lead === id ? 'lead' : 'player',
        },
        id,
      ),
    );
  }

  countdownTimer() {
    const { timer, turn, activeReactions, activeSituation, players } = this;
    this.onTimerTick({
      ...timer,
      turn,
      activeReactions:
        timer.turnType === 'reaction' ? activeReactions : undefined,
      activeSituation,
      players: Array.from(players.values()),
    });
    if (turn === 5) {
      this.onEndgame();
      return;
    }

    if (timer.countdown > 0) {
      timer.countdown--;
      setTimeout(() => {
        this.countdownTimer();
      }, 1000);
    } else {
      this.nextPhase();
    }
  }

  startCountdown() {
    setTimeout(() => {
      this.countdownTimer();
    }, 1000);
  }

  makeWinner() {
    const winner: string = this.getRandomKey(this.players);
    this.players.get(winner) && this.players.get(winner).points++;
    this.lead = winner;
  }
  getRandomKey(collection: Map<string, any>) {
    let keys = Array.from(collection.keys());
    return keys[Math.floor(Math.random() * keys.length)];
  }
}
