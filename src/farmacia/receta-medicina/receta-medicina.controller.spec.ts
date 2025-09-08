import { Test, TestingModule } from '@nestjs/testing';
import { RecetaMedicinaController } from './receta-medicina.controller';
import { RecetaMedicinaService } from './receta-medicina.service';

describe('RecetaMedicinaController', () => {
  let controller: RecetaMedicinaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RecetaMedicinaController],
      providers: [RecetaMedicinaService],
    }).compile();

    controller = module.get<RecetaMedicinaController>(RecetaMedicinaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
