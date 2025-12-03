import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Auth } from 'src/auth/entities/auth.entity';
import { Repository } from 'typeorm';
import { QueryDto } from './dto/query.dto';

@Injectable()
export class UsuariosService {
  constructor(
    @InjectRepository(Auth)
    private readonly authRepository: Repository<Auth>,
  ) {}

  async findAll(query: QueryDto) {
    const [usuarios, total] = await this.authRepository.findAndCount({
      skip: (query.page - 1) * query.limit,
      take: query.limit,
      relations: {
        personal: {
          posta: true,
          tipoPersonal: true,
        },
        recurso: true,
      },
    });

    return {
      message: 'Usuarios encontrados',
      data: usuarios,
      status: 200,
      metadata: {
        totalItems: total,
        totalPages: Math.ceil(total / query.limit),
        currentPage: query.page,
      },
    };
  }

  async findOne(id: number) {
    const usuario = await this.authRepository.findOneBy({ userId: id });

    if (!usuario) {
      throw new HttpException('Usuario no encontrado', HttpStatus.NOT_FOUND);
    }

    return {
      message: 'Usuario encontrado',
      data: usuario,
      status: 200,
    };
  }

  remove(id: number) {
    return `This action removes a #${id} usuario`;
  }
}
