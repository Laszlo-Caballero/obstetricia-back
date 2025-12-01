import { Injectable } from '@nestjs/common';
import { CreateRecetaDto } from './dto/create-receta.dto';

@Injectable()
export class RecetaService {
  create(createRecetaDto: CreateRecetaDto) {
    return 'This action adds a new receta';
  }

  findAll() {
    return `This action returns all receta`;
  }

  findOne(id: number) {
    return `This action returns a #${id} receta`;
  }

  remove(id: number) {
    return `This action removes a #${id} receta`;
  }
}
