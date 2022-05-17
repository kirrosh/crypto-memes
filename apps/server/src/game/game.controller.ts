import { Controller, Param, Post } from '@nestjs/common';
import { GameService } from './game.service';

@Controller('game')
export class GameController {
  constructor(private readonly gameSerivece: GameService) {}
  @Post('/:roomId/start')
  startGame(@Param('roomId') roomId: string) {
    this.gameSerivece.startGame(roomId);
    return { ok: true };
  }
}
