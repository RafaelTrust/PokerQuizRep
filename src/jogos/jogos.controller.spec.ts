import { Test, TestingModule } from '@nestjs/testing';
import { JogosController } from './jogos.controller';
import { JogosService } from './jogos.service';

describe('JogosController', () => {
  let controller: JogosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [JogosController],
      providers: [JogosService],
    }).compile();

    controller = module.get<JogosController>(JogosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
