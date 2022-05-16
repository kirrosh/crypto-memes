import { Test, TestingModule } from '@nestjs/testing';
import { SituationsController } from './situations.controller';

describe('SituationsController', () => {
  let controller: SituationsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SituationsController],
    }).compile();

    controller = module.get<SituationsController>(SituationsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
