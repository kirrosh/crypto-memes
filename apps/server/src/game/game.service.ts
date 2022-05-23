import { Injectable } from '@nestjs/common';
import { Reaction, Situation } from '@prisma/client';
import { ReactionsService } from 'src/reactions/reactions.service';
import { SituationsService } from 'src/situations/situations.service';
import { SocketService } from 'src/socket/socket.service';
import { LobbyService } from 'src/utils/lobby/lobby.service';
import { GameProcess, PlayerInfo, Timer } from './game-process';
import { PlayerBot } from './player-bot';

type TurnType = 'situation' | 'reaction' | 'vote';

@Injectable()
export class GameService {
  constructor(
    private readonly situationsService: SituationsService,
    private readonly reactionsService: ReactionsService,
    private readonly lobbyService: LobbyService,
    private readonly socketService: SocketService,
  ) {}
  private gamesMap: Map<string, GameProcess> = new Map();
  private gamesBotsMap: Map<string, Map<string, PlayerBot>> = new Map();

  async createGame(gameId: string, bots?: string[]) {
    if (this.gamesMap.has(gameId)) {
      return;
    }
    const situations = await this.situationsService.situations({});
    const reactions = await this.reactionsService.reactions({});
    const lobbyName = this.lobbyService.createLobbyName(gameId);
    const users = await this.socketService.getUsersInRoom(new Set([lobbyName]));
    let players = users.map((u) => ({ playerId: u.id, name: u.account }));
    if (bots) {
      const botsPlayers = bots.map(
        (b) =>
          new PlayerBot({
            address: b,
            playReaction: (userId, reaction) =>
              this.playReaction({
                userId,
                reaction,
                roomId: gameId,
              }),
            playSituation: (userId, situation) =>
              this.playSituation({
                userId,
                situation,
                roomId: gameId,
              }),
            playVote: (winner) => this.playVote({ roomId: gameId, winner }),
          }),
      );
      const botsMap = new Map(botsPlayers.map((p) => [p.id, p]));
      this.gamesBotsMap.set(gameId, botsMap);
      players = players.concat(
        botsPlayers.map((b) => ({ playerId: b.id, name: b.address })),
      );
    }
    const game = new GameProcess({
      situations,
      reactions,
      gameId,
      players,
      emitPlayerInfo: (playersInfo: PlayerInfo, playerId: string) => {
        if (PlayerBot.isBot(playerId)) {
          this.setBotsPlayerINfo(gameId, playerId, playersInfo);
        } else {
          this.socketService.socket
            .to(playerId)
            .emit('player-info', playersInfo);
        }
      },
      onTimerTick: (timer: Timer) => {
        this.socketService.socket.to(lobbyName).emit('timer-countdown', timer);
        this.notifyBots(gameId, timer);
      },
      onEndgame: () => {
        this.socketService.socket.to(lobbyName).emit('game-ended', game);
        this.gamesMap.delete(gameId);
      },
    });

    this.gamesMap.set(gameId, game);

    this.socketService.socket.to(lobbyName).emit('game-started', game);

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

  playVote({ roomId, winner }: { roomId: string; winner: string }) {
    const game = this.gamesMap.get(roomId);
    game.playVote({ winner });
  }

  setBotsPlayerINfo(roomId: string, playerId: string, playerInfo: PlayerInfo) {
    const bots = this.gamesBotsMap.get(roomId);
    if (!bots) {
      return;
    }
    bots.get(playerId)?.setPlayerInfo(playerInfo);
  }

  notifyBots(roomId: string, timer: Timer) {
    const bots = this.gamesBotsMap.get(roomId);
    if (!bots) {
      return;
    }
    bots.forEach((bot) => {
      bot.notifyBot(timer);
    });
  }
}
