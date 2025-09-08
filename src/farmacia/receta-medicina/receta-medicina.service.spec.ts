import { Test, TestingModule } from '@nestjs/testing';
import { RecetaMedicinaService } from './receta-medicina.service';

describe('RecetaMedicinaService', () => {
  let service: RecetaMedicinaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RecetaMedicinaService],
    }).compile();

    service = module.get<RecetaMedicinaService>(RecetaMedicinaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
