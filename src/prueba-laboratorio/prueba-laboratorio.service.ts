import { Injectable } from '@nestjs/common';
import { CreatePruebaLaboratorioDto } from './dto/create-prueba-laboratorio.dto';
import { UpdatePruebaLaboratorioDto } from './dto/update-prueba-laboratorio.dto';

@Injectable()
export class PruebaLaboratorioService {
  create(createPruebaLaboratorioDto: CreatePruebaLaboratorioDto) {
    return 'This action adds a new pruebaLaboratorio';
  }

  findAll() {
    return `This action returns all pruebaLaboratorio`;
  }

  findOne(id: number) {
    return `This action returns a #${id} pruebaLaboratorio`;
  }

  update(id: number, updatePruebaLaboratorioDto: UpdatePruebaLaboratorioDto) {
    return `This action updates a #${id} pruebaLaboratorio`;
  }

  remove(id: number) {
    return `This action removes a #${id} pruebaLaboratorio`;
  }
}
