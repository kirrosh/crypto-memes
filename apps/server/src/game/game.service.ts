import { Injectable } from '@nestjs/common';
import { Reaction, Situation } from '@prisma/client';
import { ReactionsService } from 'src/reactions/reactions.service';
import { SituationsService } from 'src/situations/situations.service';
import { SocketService } from 'src/socket/socket.service';
import { LobbyService } from 'src/utils/lobby/lobby.service';
import { GameProcess, PlayerInfo } from './game-process';

type TurnType = 'situation' | 'reaction' | 'vote';

type ITimer = {
  countdown: number;
  turnType: TurnType;
  turn: number;
  activeSituation: Situation;
  activeReactions: Map<string, Reaction>;
};

@Injectable()
export class GameService {
  constructor(
    private readonly situationsService: SituationsService,
    private readonly reactionsService: ReactionsService,
    private readonly lobbyService: LobbyService,
    private readonly socketService: SocketService,
  ) {}
  private gamesMap: Map<string, GameProcess> = new Map();

  async createGame(gameId: string) {
    if (this.gamesMap.has(gameId)) {
      return;
    }
    const situations = await this.situationsService.situations({});
    const reactions = await this.reactionsService.reactions({});
    const users = await this.socketService.getUsersInRoom(
      new Set([this.lobbyService.createLobbyName(gameId)]),
    );
    const game = new GameProcess({
      situations,
      reactions,
      gameId,
      players: users.map((u) => u.id),
      emitPlayerInfo: (playersInfo: PlayerInfo, playerId: string) => {
        this.socketService.socket.to(playerId).emit('player-info', playersInfo);
      },
      onTimerTick: (timer: ITimer) => {
        this.socketService.socket
          .to(this.lobbyService.createLobbyName(gameId))
          .emit('timer-game', timer);
      },
      onEndgame: () => {
        this.socketService.socket
          .to(this.lobbyService.createLobbyName(gameId))
          .emit('end-game', game);
        this.gamesMap.delete(gameId);
      },
    });

    this.gamesMap.set(gameId, game);

    this.socketService.socket
      .to(this.lobbyService.createLobbyName(gameId))
      .emit('game-started', game);

    game.emitAllPlayersInfo();
    game.startCountdown();
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
    game.playReaction({ userId, reaction });
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
    game.playSituation({ userId, situation });
  }
}
