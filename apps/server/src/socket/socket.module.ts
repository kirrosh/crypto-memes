import { Global, Module } from '@nestjs/common';
import { GameService } from 'src/game/game.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { ReactionsService } from 'src/reactions/reactions.service';
import { SituationsService } from 'src/situations/situations.service';
import { LobbyService } from 'src/utils/lobby/lobby.service';
import { SocketService } from './socket.service';

@Global()
@Module({
  providers: [
    SocketService,
    GameService,
    ReactionsService,
    SituationsService,
    PrismaService,
    LobbyService,
  ],
  exports: [SocketService],
})
export class SocketModule {}
