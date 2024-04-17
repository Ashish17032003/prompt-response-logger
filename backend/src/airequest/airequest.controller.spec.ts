import { Test, TestingModule } from '@nestjs/testing';
import { AirequestController } from './airequest.controller';

describe('AirequestController', () => {
  let controller: AirequestController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AirequestController],
    }).compile();

    controller = module.get<AirequestController>(AirequestController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
