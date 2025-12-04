import { Injectable } from '@nestjs/common';

@Injectable()
export class InicioService {


  findAll() {
    return `This action returns all inicio`;
  }

  findOne(id: number) {
    return `This action returns a #${id} inicio`;
  }

  remove(id: number) {
    return `This action removes a #${id} inicio`;
  }
}
