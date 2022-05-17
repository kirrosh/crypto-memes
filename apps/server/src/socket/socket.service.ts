import { Injectable } from '@nestjs/common';
import { Server } from 'socket.io';
import { GameService } from 'src/game/game.service';

@Injectable()
export class SocketService {
  public socket: Server = null;
  constructor(private readonly gameService: GameService) {}
}
