import { Injectable } from '@nestjs/common';
import { CreateTipoPersonalDto } from './dto/create-tipo-personal.dto';
import { UpdateTipoPersonalDto } from './dto/update-tipo-personal.dto';

@Injectable()
export class TipoPersonalService {
  create(createTipoPersonalDto: CreateTipoPersonalDto) {
    return 'This action adds a new tipoPersonal';
  }

  findAll() {
    return `This action returns all tipoPersonal`;
  }

  findOne(id: number) {
    return `This action returns a #${id} tipoPersonal`;
  }

  update(id: number, updateTipoPersonalDto: UpdateTipoPersonalDto) {
    return `This action updates a #${id} tipoPersonal`;
  }

  remove(id: number) {
    return `This action removes a #${id} tipoPersonal`;
  }
}
