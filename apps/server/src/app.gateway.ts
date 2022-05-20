import {
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayInit,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Socket, Server } from 'socket.io';
import { SocketService } from './socket/socket.service';
import { RoomsService } from './rooms/rooms.service';
import { LobbyService } from './utils/lobby/lobby.service';
import { GameService } from './game/game.service';
import { Reaction, Situation } from '@prisma/client';

@WebSocketGateway({ cors: true })
export class AppGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  constructor(
    private socketService: SocketService,
    private roomsService: RoomsService,
    private lobbyService: LobbyService,
    private gameService: GameService,
  ) {}
  @WebSocketServer()
  server: Server;

  private logger: Logger = new Logger('AppGateway');

  @SubscribeMessage('play-situation')
  playSituation(
    client: Socket,
    payload: { roomId: string; situation: Situation },
  ): void {
    this.gameService.playSituation({ ...payload, userId: client.data.id });
  }
  @SubscribeMessage('play-reaction')
  playReaction(
    client: Socket,
    payload: { roomId: string; reaction: Reaction },
  ): void {
    console.log('play-reaction', payload);
    this.gameService.playReaction({ ...payload, userId: client.data.id });
  }

  @SubscribeMessage('join-lobby')
  handleJoinLobby(
    client: Socket,
    payload: {
      lobby: string;
      account: string;
    },
  ): void {
    this.logger.log('join to lobby: ' + payload.lobby);
    client.join(this.lobbyService.createLobbyName(payload.lobby));
    client.data = {
      account: payload.account,
      id: client.id,
    };
    this.logger.log('rooms: ' + this.server.of('/').adapter.rooms.size);
  }
  @SubscribeMessage('leave-lobby')
  handleCreateRoom(client: Socket, payload: string): void {
    client.leave(payload);
  }

  @SubscribeMessage('start-game')
  startGame(client: Socket, roomId: string): void {
    this.gameService.createGame(roomId);
  }

  afterInit(server: Server) {
    this.socketService.socket = server;
    this.logger.log('Init');
    this.roomsService.onRoomChange();
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  handleConnection(client: Socket, ...args: any[]) {
    this.logger.log(`Client connected: ${client.id}`);
  }
}
