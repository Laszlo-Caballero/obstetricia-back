import { Injectable } from '@nestjs/common';
import { CreatePostaDto } from './dto/create-posta.dto';
import { UpdatePostaDto } from './dto/update-posta.dto';

@Injectable()
export class PostaService {
  create(createPostaDto: CreatePostaDto) {
    return 'This action adds a new posta';
  }

  findAll() {
    return `This action returns all posta`;
  }

  findOne(id: number) {
    return `This action returns a #${id} posta`;
  }

  update(id: number, updatePostaDto: UpdatePostaDto) {
    return `This action updates a #${id} posta`;
  }

  remove(id: number) {
    return `This action removes a #${id} posta`;
  }
}
