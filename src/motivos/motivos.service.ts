import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Motivo } from './entities/motivo.entity';
import { Repository } from 'typeorm';
import { QueryDto } from './dto/query.dto';

@Injectable()
export class MotivosService {
  constructor(
    @InjectRepository(Motivo)
    private readonly motivoRepository: Repository<Motivo>,
  ) {}

  async findAll(query: QueryDto) {
    const [result, motivos] = await this.motivoRepository.findAndCount({
      take: query.limit,
      skip: (query.page - 1) * query.limit,
    });

    return {
      status: 200,
      message: 'Motivos obtenidos exitosamente',
      data: result,
      metadata: {
        totalItems: motivos,
        totalPages: Math.ceil(motivos / query.limit),
        currentPage: query.page,
      },
    };
  }

  async findOne(id: number) {
    const motivo = await this.motivoRepository.findOneBy({ motivoId: id });
    if (!motivo) {
      throw new HttpException('Motivo no encontrado', 404);
    }

    return {
      status: 200,
      message: 'Motivo obtenido exitosamente',
      data: motivo,
    };
  }

  async remove(id: number) {
    const findMotivo = await this.motivoRepository.findOneBy({ motivoId: id });

    if (!findMotivo) {
      throw new HttpException('Motivo no encontrado', 404);
    }

    await this.motivoRepository.delete({ motivoId: id });

    return {
      status: 200,
      message: 'Motivo eliminado exitosamente',
      data: null,
    };
  }
}
