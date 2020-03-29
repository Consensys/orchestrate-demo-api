import { Test, TestingModule } from '@nestjs/testing';
import { NetworksService } from './networks.service';

describe('NetworksService', () => {
  let service: NetworksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NetworksService],
    }).compile();

    service = module.get<NetworksService>(NetworksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
