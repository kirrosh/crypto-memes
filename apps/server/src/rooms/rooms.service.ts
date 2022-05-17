import { Injectable, Logger } from '@nestjs/common';
import { SocketService } from 'src/socket/socket.service';
import { LobbyService } from 'src/utils/lobby/lobby.service';

@Injectable()
export class RoomsService {
  constructor(
    private readonly socketService: SocketService,
    private lobbyService: LobbyService,
  ) {}
  private logger: Logger = new Logger('RoomsService');

  onRoomChange() {
    this.socketService.socket.of('/').adapter.on('create-room', (room) => {
      if (this.lobbyService.isCustomLobby(room)) {
        this.socketService.socket.emit('room-created', room);
      }
      this.logger.log(`room ${room} was created`);
    });

    this.socketService.socket.of('/').adapter.on('join-room', (room, id) => {
      if (this.lobbyService.isCustomLobby(room)) {
        this.socketService.socket.to(room).emit('user-joined', id);
      }
      this.logger.log(`socket ${id} has joined room ${room}`);
    });

    this.socketService.socket.of('/').adapter.on('leave-room', (room, id) => {
      this.socketService.socket.to(room).emit('user-leave', id);
      this.logger.log(`socket ${id} has leaved room ${room}`);
    });
  }
}
