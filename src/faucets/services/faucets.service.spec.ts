import { Test, TestingModule } from '@nestjs/testing';
import { FaucetsService } from './faucets.service';

describe('FaucetsService', () => {
  let service: FaucetsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FaucetsService],
    }).compile();

    service = module.get<FaucetsService>(FaucetsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
