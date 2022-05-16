import { Controller, Get } from '@nestjs/common';
import { SituationsService } from './situations.service';

@Controller('situations')
export class SituationsController {
  constructor(private readonly situationsService: SituationsService) {}

  @Get()
  getHello() {
    console.log('sit');
    return this.situationsService.situations({});
  }
}
