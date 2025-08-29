import { Test, TestingModule } from '@nestjs/testing';
import { TipoPruebaService } from './tipo-prueba.service';

describe('TipoPruebaService', () => {
  let service: TipoPruebaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TipoPruebaService],
    }).compile();

    service = module.get<TipoPruebaService>(TipoPruebaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
