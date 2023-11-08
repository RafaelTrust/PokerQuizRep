import { Test, TestingModule } from '@nestjs/testing';
import { BibliotecaService } from './biblioteca.service';

describe('BibliotecaService', () => {
  let service: BibliotecaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BibliotecaService],
    }).compile();

    service = module.get<BibliotecaService>(BibliotecaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
