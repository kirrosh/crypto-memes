import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppGateway } from './app.gateway';
import { RoomsController } from './rooms/rooms.controller';
import { SocketModule } from './socket/socket.module';
import { PrismaService } from './prisma/prisma.service';
import { SituationsService } from './situations/situations.service';
import { SituationsController } from './situations/situations.controller';
import { GameService } from './game/game.service';
import { ReactionsService } from './reactions/reactions.service';
import { RoomsService } from './rooms/rooms.service';
import { LobbyService } from './utils/lobby/lobby.service';
import { GameController } from './game/game.controller';

@Module({
  imports: [SocketModule],
  controllers: [
    AppController,
    RoomsController,
    SituationsController,
    GameController,
  ],
  providers: [
    AppService,
    AppGateway,
    PrismaService,
    SituationsService,
    GameService,
    ReactionsService,
    RoomsService,
    LobbyService,
  ],
})
export class AppModule {}
