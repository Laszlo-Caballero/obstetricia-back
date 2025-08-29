import { Injectable } from '@nestjs/common';
import { CreateEnfermeraDto } from './dto/create-enfermera.dto';
import { UpdateEnfermeraDto } from './dto/update-enfermera.dto';

@Injectable()
export class EnfermerasService {
  create(createEnfermeraDto: CreateEnfermeraDto) {
    return 'This action adds a new enfermera';
  }

  findAll() {
    return `This action returns all enfermeras`;
  }

  findOne(id: number) {
    return `This action returns a #${id} enfermera`;
  }

  update(id: number, updateEnfermeraDto: UpdateEnfermeraDto) {
    return `This action updates a #${id} enfermera`;
  }

  remove(id: number) {
    return `This action removes a #${id} enfermera`;
  }
}
