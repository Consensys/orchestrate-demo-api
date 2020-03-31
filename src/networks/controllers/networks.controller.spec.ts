import { Test, TestingModule } from '@nestjs/testing';
import { NetworksController } from './networks.controller';

describe('Networks Controller', () => {
  let controller: NetworksController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NetworksController],
    }).compile();

    controller = module.get<NetworksController>(NetworksController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
