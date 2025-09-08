import { Injectable } from '@nestjs/common';
import { CreateRecetaMedicinaDto } from './dto/create-receta-medicina.dto';
import { UpdateRecetaMedicinaDto } from './dto/update-receta-medicina.dto';

@Injectable()
export class RecetaMedicinaService {
  create(createRecetaMedicinaDto: CreateRecetaMedicinaDto) {
    return 'This action adds a new recetaMedicina';
  }

  findAll() {
    return `This action returns all recetaMedicina`;
  }

  findOne(id: number) {
    return `This action returns a #${id} recetaMedicina`;
  }

  update(id: number, updateRecetaMedicinaDto: UpdateRecetaMedicinaDto) {
    return `This action updates a #${id} recetaMedicina`;
  }

  remove(id: number) {
    return `This action removes a #${id} recetaMedicina`;
  }
}
