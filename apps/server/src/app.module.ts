import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppGateway } from './app.gateway';
import { RoomsController } from './rooms/rooms.controller';
import { SocketModule } from './socket/socket.module';
import { PrismaService } from './prisma/prisma.service';
import { SituationsService } from './situations/situations.service';
import { SituationsController } from './situations/situations.controller';

@Module({
  imports: [SocketModule],
  controllers: [AppController, RoomsController, SituationsController],
  providers: [AppService, AppGateway, PrismaService, SituationsService],
})
export class AppModule {}
