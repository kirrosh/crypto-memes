import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from 'src/prisma/prisma.service';
import { SituationsController } from './situations.controller';
import { SituationsService } from './situations.service';

describe('SituationsController', () => {
  let controller: SituationsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SituationsService, PrismaService],
      controllers: [SituationsController],
    }).compile();

    controller = module.get<SituationsController>(SituationsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
