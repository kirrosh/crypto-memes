import { Test, TestingModule } from '@nestjs/testing';
import { SituationsService } from './situations.service';

describe('SituationsService', () => {
  let service: SituationsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SituationsService],
    }).compile();

    service = module.get<SituationsService>(SituationsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
