import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PruebaLaboratorio } from './entities/prueba-laboratorio.entity';
import { Repository } from 'typeorm';
import { QueryPruebaLaboratorioDto } from './dto/query.dto';

@Injectable()
export class PruebaLaboratorioService {
  constructor(
    @InjectRepository(PruebaLaboratorio)
    private readonly pruebaLaboratorioRepository: Repository<PruebaLaboratorio>,
  ) {}

  async findAll(query: QueryPruebaLaboratorioDto) {
    const { limit = 10, page = 1 } = query;

    const [data, total] = await this.pruebaLaboratorioRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
    });

    return {
      message: 'Pruebas de laboratorio obtenidas correctamente',
      data,
      status: 200,
      metadata: {
        totalItems: total,
        totalPages: Math.ceil(total / limit),
        currentPage: page,
      },
    };
  }

  findOne(id: number) {
    return `This action returns a #${id} pruebaLaboratorio`;
  }

  remove(id: number) {
    return `This action removes a #${id} pruebaLaboratorio`;
  }
}
