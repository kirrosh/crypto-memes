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
  async getUsersInRoom(@Param('lobby') id) {
    const users = await this.socketService.socket.of('/').adapter.fetchSockets({
      rooms: new Set([this.lobbyService.createLobbyName(id)]),
    });
    const u = await this.socketService.socket
      .of('/')
      .adapter.sockets(new Set([this.lobbyService.createLobbyName(id)]));
    console.log(users.map((s) => s.data));
    console.log(u);
    return users.map((s) => s.data);
  }
}
