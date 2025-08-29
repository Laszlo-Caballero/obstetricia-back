import { Injectable } from '@nestjs/common';
import { CreateMedicinaDto } from './dto/create-medicina.dto';
import { UpdateMedicinaDto } from './dto/update-medicina.dto';

@Injectable()
export class MedicinaService {
  create(createMedicinaDto: CreateMedicinaDto) {
    return 'This action adds a new medicina';
  }

  findAll() {
    return `This action returns all medicina`;
  }

  findOne(id: number) {
    return `This action returns a #${id} medicina`;
  }

  update(id: number, updateMedicinaDto: UpdateMedicinaDto) {
    return `This action updates a #${id} medicina`;
  }

  remove(id: number) {
    return `This action removes a #${id} medicina`;
  }
}
