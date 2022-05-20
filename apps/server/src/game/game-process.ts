import { Reaction, Situation } from '@prisma/client';

type Player = {
  reaction?: Reaction;
  situation?: Situation;
  points: number;
  situations: Situation[];
  reactions: Reaction[];
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
  onTimerTick: (paylod: {
    countdown: number;
    turnType: TurnType;
    turn: number;
  }) => void;
  onEndgame: () => void;

  constructor({
    emitPlayerInfo,
    onTimerTick,
    gameId,
    reactions,
    situations,
    onEndgame,
  }: {
    gameId: string;
    situations: Situation[];
    reactions: Reaction[];
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
    this.turn = 0;
    this.players = new Map();
    this.emitPlayerInfo = emitPlayerInfo;
    this.onTimerTick = onTimerTick;
    this.timer = {
      countdown: 20,
      turnType: 'situation' as TurnType,
    };
    this.activeReactions = new Map();
    this.onEndgame = onEndgame;
  }

  getSituationsFromDeck(amount: number) {
    return this.situations.splice(0, amount);
  }
  getReactionsFromDeck(amount: number) {
    return this.reactions.splice(0, amount);
  }

  addPlayer(playerId: string) {
    this.players.set(playerId, {
      points: 0,
      reactions: this.getReactionsFromDeck(3),
      situations: this.getSituationsFromDeck(2),
    });
  }

  makeLead(playerId: string) {
    this.lead = playerId;
  }

  playReaction({ reaction, userId }: { userId: string; reaction: Reaction }) {
    this.activeReactions.set(userId, reaction);
    this.players.get(userId).reaction = reaction;
    this.players.get(userId).reactions = this.players
      .get(userId)
      .reactions.filter((r) => r.id !== reaction.id);
    // add +1 to player size
    if (
      this.activeReactions.size > 0 &&
      this.activeReactions.size === this.players.size
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
        this.emitAllPlayersInfo();
        break;
      }
    }
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
    const { timer, turn } = this;
    this.onTimerTick({
      ...timer,
      turn,
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
    const winner: string =
      this.players.keys()[(this.players.size * Math.random()) | 0];
    this.players.get(winner) && this.players.get(winner).points++;
    this.lead = winner;
  }
}
