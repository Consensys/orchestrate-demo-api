import { Test, TestingModule } from '@nestjs/testing';
import { TxSenderService } from './tx-sender.service';

describe('TxSenderService', () => {
  let service: TxSenderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TxSenderService],
    }).compile();

    service = module.get<TxSenderService>(TxSenderService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
