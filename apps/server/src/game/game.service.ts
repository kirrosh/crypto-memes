import { Injectable } from '@nestjs/common';
import { Reaction, Situation } from '@prisma/client';
import { ReactionsService } from 'src/reactions/reactions.service';
import { SituationsService } from 'src/situations/situations.service';
import { SocketService } from 'src/socket/socket.service';
import { LobbyService } from 'src/utils/lobby/lobby.service';

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
        { reaction?: number; situation?: number; points: number }
      >;
      lead?: string;
      turn: number;
    }
  > = new Map();
  async createGame() {
    const situations = await this.situationsService.situations({});
    const reactions = await this.reactionsService.reactions({});
    return { situations, reactions, players: new Map(), turn: 0, lead: '' };
  }

  async startGame(roomId: string) {
    const game = await this.createGame();
    const users = await this.socketService.getUsersInRoom(
      new Set([this.lobbyService.createLobbyName(roomId)]),
    );
    users.map((u, i) =>
      game.players.set(u.id, {
        points: 0,
      }),
    );
    game.lead = users[0]?.id;
    this.gamesMap.set(roomId, game);
    this.socketService.socket
      .to(this.lobbyService.createLobbyName(roomId))
      .emit('start-game', game);
    setTimeout(() => this.nextTurn(roomId), 1000 * 15);
  }

  playReaction(roomId: string, userId: string, reactionId: number) {
    const game = this.gamesMap.get(roomId);
    game.players.get(userId).reaction = reactionId;
  }
  playSituation(roomId: string, userId: string, situationId: number) {
    const game = this.gamesMap.get(roomId);
    game.players.get(userId).situation = situationId;
  }

  makeWinner(roomId: string) {
    const game = this.gamesMap.get(roomId);
    const winner: string =
      game.players.keys()[(game.players.size * Math.random()) | 0];
    return winner;
  }

  nextTurn(roomId: string) {
    const game = this.gamesMap.get(roomId);
    const winner = this.makeWinner(roomId);
    game.lead = winner;
    game.players.forEach((p, u) => {
      p.reaction = undefined;
      p.situation = undefined;
      if (u === winner) {
        p.points++;
      }
    });
    game.turn++;
    if (game.turn === 3) {
      this.socketService.socket
        .to(this.lobbyService.createLobbyName(roomId))
        .emit('end-game', game);
      this.gamesMap.delete(roomId);
    } else {
      this.socketService.socket
        .to(this.lobbyService.createLobbyName(roomId))
        .emit('next-turn', game);
      setTimeout(() => this.nextTurn(roomId), 1000 * 15);
    }
  }
}
