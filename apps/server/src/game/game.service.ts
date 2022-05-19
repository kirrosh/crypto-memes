import { Injectable } from '@nestjs/common';
import { Reaction, Situation } from '@prisma/client';
import { ReactionsService } from 'src/reactions/reactions.service';
import { SituationsService } from 'src/situations/situations.service';
import { SocketService } from 'src/socket/socket.service';
import { LobbyService } from 'src/utils/lobby/lobby.service';

type TurnType = 'situation' | 'reaction' | 'vote';
type PlayerRole = 'lead' | 'player';

@Injectable()
export class GameService {
  constructor(
    private readonly situationsService: SituationsService,
    private readonly reactionsService: ReactionsService,
    private readonly lobbyService: LobbyService,
    private readonly socketService: SocketService,
  ) {}
  private gamesMap: Map<
    string,
    {
      situations: Situation[];
      reactions: Reaction[];
      players: Map<
        string,
        {
          reaction?: Reaction;
          situation?: Situation;
          points: number;
          situations: Situation[];
          reactions: Reaction[];
        }
      >;
      activeSituation?: Situation;
      lead?: string;
      turn: number;
      timer: {
        countdown: number;
        turnType: TurnType;
      };
    }
  > = new Map();
  async createGame() {
    const situations = await this.situationsService.situations({});
    const reactions = await this.reactionsService.reactions({});
    return {
      situations,
      reactions,
      players: new Map(),
      turn: 0,
      lead: '',
      timer: { countdown: 10, turnType: 'situation' as TurnType },
    };
  }

  countdownTimer(roomId: string) {
    const game = this.gamesMap.get(roomId);
    if (!game) return;
    const { timer, turn } = game;
    this.socketService.socket
      .to(this.lobbyService.createLobbyName(roomId))
      .emit('timer-game', {
        countdown: timer.countdown,
        turnType: timer.turnType,
        turn,
      });
    if (timer.countdown > 0) {
      timer.countdown--;
      setTimeout(() => {
        this.countdownTimer(roomId);
      }, 1000);
    } else {
      this.startNewTurn(roomId);
    }
  }

  async startGame(roomId: string) {
    const game = await this.createGame();
    const users = await this.socketService.getUsersInRoom(
      new Set([this.lobbyService.createLobbyName(roomId)]),
    );
    game.lead = users[0]?.id;
    users.map((u) =>
      game.players.set(u.id, {
        points: 0,
        situations: game.situations.splice(0, 2),
        reactions: game.reactions.splice(0, 3),
      }),
    );

    this.gamesMap.set(roomId, game);

    this.socketService.socket
      .to(this.lobbyService.createLobbyName(roomId))
      .emit('game-started', game);

    this.emitPlayerInfo(roomId);

    setTimeout(() => {
      this.countdownTimer(roomId);
    }, 1000);
  }

  emitPlayerInfo(roomId: string) {
    const game = this.gamesMap.get(roomId);
    game.players.forEach((player, id) =>
      this.socketService.socket.to(id).emit('player-info', {
        ...player,
        role: game.lead === id ? 'lead' : 'player',
      }),
    );
  }

  async startNewTurn(roomId: string) {
    const game = this.gamesMap.get(roomId);

    const { timer } = game;
    if (game.turn === 5) {
      this.socketService.socket
        .to(this.lobbyService.createLobbyName(roomId))
        .emit('end-game', game);
      this.gamesMap.delete(roomId);
      return;
    }

    switch (timer.turnType) {
      case 'situation': {
        timer.countdown = 10;
        timer.turnType = 'reaction';
        break;
      }
      case 'reaction': {
        timer.countdown = 5;
        timer.turnType = 'vote';
        break;
      }
      case 'vote':
        {
          timer.countdown = 10;
          timer.turnType = 'situation';
          game.turn++;
          this.makeWinner(roomId);
          this.emitPlayerInfo(roomId);
        }
        break;
    }
    this.countdownTimer(roomId);
  }

  playReaction({
    reaction,
    roomId,
    userId,
  }: {
    roomId: string;
    userId: string;
    reaction: Reaction;
  }) {
    const game = this.gamesMap.get(roomId);
    game.players.get(userId).reaction = reaction;
    game.players.get(userId).reactions = game.players
      .get(userId)
      .reactions.filter((r) => r.id !== reaction.id);
  }

  playSituation({
    roomId,
    situation,
    userId,
  }: {
    roomId: string;
    userId: string;
    situation: Situation;
  }) {
    const game = this.gamesMap.get(roomId);
    game.players.get(userId).situation = situation;
    game.players.get(userId).situations = game.players
      .get(userId)
      .situations.filter((r) => r.id !== situation.id);
  }

  makeWinner(roomId: string) {
    const game = this.gamesMap.get(roomId);
    const winner: string =
      game.players.keys()[(game.players.size * Math.random()) | 0];
    game.players.get(winner) && game.players.get(winner).points++;
    game.lead = winner;
    return winner;
  }

  updatecards(roomId: string, winner: string) {
    const game = this.gamesMap.get(roomId);
    game.players.forEach((player, id) => {
      if (id === winner) {
        game.players.set(id, {
          ...player,
          reaction: undefined,
          situation: undefined,
          // situations: game.situations.splice(0, 2),
        });
      } else {
        game.players.set(id, {
          ...player,
          reaction: undefined,
          situation: undefined,
          // reactions: game.reactions.splice(0, 3),
        });
      }
    });
  }
}
