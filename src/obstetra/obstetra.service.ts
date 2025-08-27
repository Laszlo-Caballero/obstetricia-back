import { Injectable } from '@nestjs/common';
import { CreateObstetraDto } from './dto/create-obstetra.dto';
import { UpdateObstetraDto } from './dto/update-obstetra.dto';

@Injectable()
export class ObstetraService {
  create(createObstetraDto: CreateObstetraDto) {
    return 'This action adds a new obstetra';
  }

  findAll() {
    return `This action returns all obstetra`;
  }

  findOne(id: number) {
    return `This action returns a #${id} obstetra`;
  }

  update(id: number, updateObstetraDto: UpdateObstetraDto) {
    return `This action updates a #${id} obstetra`;
  }

  remove(id: number) {
    return `This action removes a #${id} obstetra`;
  }
}
