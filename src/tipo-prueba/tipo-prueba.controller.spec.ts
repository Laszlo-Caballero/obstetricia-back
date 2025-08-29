import { Test, TestingModule } from '@nestjs/testing';
import { TipoPruebaController } from './tipo-prueba.controller';
import { TipoPruebaService } from './tipo-prueba.service';

describe('TipoPruebaController', () => {
  let controller: TipoPruebaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TipoPruebaController],
      providers: [TipoPruebaService],
    }).compile();

    controller = module.get<TipoPruebaController>(TipoPruebaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
