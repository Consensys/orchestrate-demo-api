import { Test, TestingModule } from '@nestjs/testing';
import { TransactionCrafterService } from './transaction-crafter.service';

describe('TransactionCrafterService', () => {
  let service: TransactionCrafterService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TransactionCrafterService],
    }).compile();

    service = module.get<TransactionCrafterService>(TransactionCrafterService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
