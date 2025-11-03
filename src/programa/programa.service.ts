import { HttpException, Injectable } from '@nestjs/common';
import { CreateProgramaDto } from './dto/create-programa.dto';
import { UpdateProgramaDto } from './dto/update-programa.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { Programa } from './entities/programa.entity';
import { Personal } from 'src/personal/entities/personal.entity';
import { QueryDto } from './dto/query.dto';
import { QueryConditions } from 'src/interface/type';
import { JwtPayload } from 'src/auth/interface/type';
import { RolesEnum } from 'src/auth/enum/roles';
import { Posta } from 'src/posta/entities/posta.entity';

@Injectable()
export class ProgramaService {
  constructor(
    @InjectRepository(Programa)
    private programaRepository: Repository<Programa>,
    @InjectRepository(Personal)
    private personalRepository: Repository<Personal>,
    @InjectRepository(Posta)
    private postaRepository: Repository<Posta>,
  ) {}

  async create(createProgramaDto: CreateProgramaDto, user: JwtPayload) {
    const { responsableId, ...rest } = createProgramaDto;
    const findResponsable = await this.personalRepository.findOne({
      where: { personalId: responsableId },
    });

    if (!findResponsable) {
      throw new HttpException('El responsable no existe', 400);
    }

    const findPosta = await this.postaRepository.findOne({
      where: { postaId: user.postaId },
    });

    if (!findPosta) {
      throw new HttpException('La posta no existe', 400);
    }

    const newPrograma = this.programaRepository.create({
      ...rest,
      responsable: findResponsable,
      posta: findPosta,
    });

    await this.programaRepository.insert(newPrograma);

    return { status: 201, message: 'Programa creado', data: newPrograma };
  }

  async findAll(query: QueryDto, jwt: JwtPayload) {
    const { limit, page, search, estado, searchByName } = query;

    const where: QueryConditions<Programa> = {};

    if (estado) {
      where.estado = estado === 'true';
    }

    if (search) {
      where.responsable = {
        nombre: Like(`%${search}%`),
      };
    }

    if (jwt.role != RolesEnum.Administrador) {
      where.posta = {
        postaId: jwt.postaId,
      };
    }

    if (searchByName) {
      where.nombre = Like(`%${searchByName}%`);
    }

    const [programas, totalItems] = await this.programaRepository.findAndCount({
      relations: [
        'responsable',
        'personal',
        'citas',
        'personal',
        'responsable.user',
        'responsable.user.recurso',
        'posta',
      ],
      where,
      take: limit,
      skip: (page - 1) * limit,
    });

    return {
      status: 200,
      message: 'OK',
      data: programas,
      metadata: {
        totalItems,
        totalPages: Math.ceil(totalItems / limit),
        currentPage: page,
      },
    };
  }

  async findOne(id: number, jwt: JwtPayload) {
    const programa = await this.programaRepository.findOne({
      where: { programaId: id },
      relations: [
        'responsable',
        'personal',
        'citas',
        'personal',
        'responsable.user',
        'responsable.user.recurso',
        'posta',
      ],
    });

    if (!programa) {
      throw new HttpException('Programa no encontrado', 404);
    }

    if (
      jwt.role != RolesEnum.Administrador &&
      programa.posta.postaId != jwt.postaId
    ) {
      throw new HttpException('Programa no encontrado', 404);
    }

    return { status: 200, message: 'OK', data: programa };
  }

  async update(
    id: number,
    updateProgramaDto: UpdateProgramaDto,
    jwt: JwtPayload,
  ) {
    const { responsableId, ...rest } = updateProgramaDto;

    const findPrograma = await this.programaRepository.findOne({
      where: { programaId: id },
      relations: ['posta'],
    });

    if (!findPrograma) {
      throw new HttpException('Programa no encontrado', 404);
    }

    if (
      jwt.role != RolesEnum.Administrador &&
      findPrograma.posta.postaId != jwt.postaId
    ) {
      throw new HttpException('Programa no encontrado', 404);
    }

    const findResponsable = await this.personalRepository.findOne({
      where: { personalId: responsableId },
    });

    if (!findResponsable) {
      throw new HttpException('El responsable no existe', 400);
    }

    await this.programaRepository.update(id, {
      ...rest,
      responsable: findResponsable,
    });

    return { status: 200, message: 'OK', data: null };
  }

  async remove(id: number, jwt: JwtPayload) {
    const findPrograma = await this.programaRepository.findOne({
      where: { programaId: id },
      relations: ['posta'],
    });

    if (!findPrograma) {
      throw new HttpException('Programa no encontrado', 404);
    }
    if (
      jwt.role != RolesEnum.Administrador &&
      findPrograma.posta.postaId != jwt.postaId
    ) {
      throw new HttpException('Programa no encontrado', 404);
    }

    await this.programaRepository.update(id, { estado: false });

    return { status: 200, message: 'OK', data: null };
  }
}
