import { Test, TestingModule } from '@nestjs/testing';
import { FaucetsController } from './faucets.controller';

describe('Faucets Controller', () => {
  let controller: FaucetsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FaucetsController],
    }).compile();

    controller = module.get<FaucetsController>(FaucetsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
