import { Injectable } from '@nestjs/common';
import { QueryRecetaDto } from './dto/query.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Receta } from './entities/receta.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RecetaService {
  constructor(
    @InjectRepository(Receta)
    private readonly recetaRepository: Repository<Receta>,
  ) {}

  async findAll(query: QueryRecetaDto) {
    const { limit = 10, page = 1 } = query;

    const [data, total] = await this.recetaRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      relations: {
        cita: {
          personal: true,
        },
      },
    });

    return {
      message: 'Recetas obtenidas correctamente',
      data,
      status: 200,
      metadata: {
        totalItems: total,
        totalPages: Math.ceil(total / limit),
        currentPage: page,
      },
    };
  }

  async findOne(id: number) {
    const receta = await this.recetaRepository.findOne({
      where: { recetaId: id },
      relations: {
        cita: {
          personal: true,
        },
        motivos: true,
        recetaMedicinas: {
          medicina: {
            categoria: true,
            presentacion: true,
            recurso: true,
          },
        },
      },
    });

    return {
      message: 'Receta obtenida correctamente',
      data: receta,
      status: 200,
    };
  }
}
