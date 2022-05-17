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

@WebSocketGateway({ cors: true })
export class AppGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  constructor(
    private socketService: SocketService,
    private roomsService: RoomsService,
    private lobbyService: LobbyService,
  ) {}
  @WebSocketServer()
  server: Server;

  private logger: Logger = new Logger('AppGateway');

  @SubscribeMessage('msgToServer1')
  handleMessage(client: Socket, payload: string): void {
    this.server.emit('msgToClient', payload);
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
