import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppGateway } from './app.gateway';
import { RoomsController } from './rooms/rooms.controller';
import { SocketModule } from './socket/socket.module';

@Module({
  imports: [SocketModule],
  controllers: [AppController, RoomsController],
  providers: [AppService, AppGateway],
})
export class AppModule {}
