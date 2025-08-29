import { Injectable } from '@nestjs/common';
import { CreateTipoPruebaDto } from './dto/create-tipo-prueba.dto';
import { UpdateTipoPruebaDto } from './dto/update-tipo-prueba.dto';

@Injectable()
export class TipoPruebaService {
  create(createTipoPruebaDto: CreateTipoPruebaDto) {
    return 'This action adds a new tipoPrueba';
  }

  findAll() {
    return `This action returns all tipoPrueba`;
  }

  findOne(id: number) {
    return `This action returns a #${id} tipoPrueba`;
  }

  update(id: number, updateTipoPruebaDto: UpdateTipoPruebaDto) {
    return `This action updates a #${id} tipoPrueba`;
  }

  remove(id: number) {
    return `This action removes a #${id} tipoPrueba`;
  }
}
