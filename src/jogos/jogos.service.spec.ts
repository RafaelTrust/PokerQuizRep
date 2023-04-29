import { Test, TestingModule } from '@nestjs/testing';
import { JogosService } from './jogos.service';

describe('JogosService', () => {
  let service: JogosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [JogosService],
    }).compile();

    service = module.get<JogosService>(JogosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
