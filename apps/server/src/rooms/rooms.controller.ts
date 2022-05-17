import { Controller, Get, Param } from '@nestjs/common';
import { SocketService } from 'src/socket/socket.service';
import { LobbyService } from 'src/utils/lobby/lobby.service';

@Controller('rooms')
export class RoomsController {
  constructor(
    private readonly socketService: SocketService,
    private lobbyService: LobbyService,
  ) {}

  @Get()
  getRooms() {
    return Array.from(this.socketService.socket.of('/').adapter.rooms.keys())
      .filter(this.lobbyService.isCustomLobby)
      .map(this.lobbyService.parceLobbyName);
  }
  @Get('/:lobby/users')
  getUsersInRoom(@Param('lobby') id: string) {
    return this.socketService.getUsersInRoom(
      new Set([this.lobbyService.createLobbyName(id)]),
    );
  }
}
