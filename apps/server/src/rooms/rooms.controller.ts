import { Controller, Get } from '@nestjs/common';
import { SocketService } from 'src/socket/socket.service';

@Controller('rooms')
export class RoomsController {
  constructor(private readonly socketService: SocketService) {}

  @Get()
  getHello() {
    return {
      message: 'Hello World!',
      rooms: Array.from(this.socketService.socket.of('/').adapter.rooms.keys()),
      roomsSize: this.socketService.socket.of('/').adapter.rooms.size,
    };
  }
}
