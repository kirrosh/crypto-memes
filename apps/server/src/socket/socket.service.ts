import { Injectable } from '@nestjs/common';
import { Server } from 'socket.io';
import { GameService } from 'src/game/game.service';

@Injectable()
export class SocketService {
  public socket: Server = null;
  constructor() {}

  async getUsersInRoom(rooms: Set<string>) {
    const users = await this.socket.of('/').adapter.fetchSockets({
      rooms,
    });
    return users.map((s) => s.data) as { id: string; account: string }[];
  }
}
