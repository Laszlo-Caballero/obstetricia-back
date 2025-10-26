import { HttpException, Injectable } from '@nestjs/common';
import { CreateProgramaDto } from './dto/create-programa.dto';
import { UpdateProgramaDto } from './dto/update-programa.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { Programa } from './entities/programa.entity';
import { Personal } from 'src/personal/entities/personal.entity';
import { QueryDto } from './dto/query.dto';
import { QueryConditions } from 'src/interface/type';

@Injectable()
export class ProgramaService {
  constructor(
    @InjectRepository(Programa)
    private programaRepository: Repository<Programa>,
    @InjectRepository(Personal)
    private personalRepository: Repository<Personal>,
  ) {}

  async create(createProgramaDto: CreateProgramaDto) {
    const { responsableId, ...rest } = createProgramaDto;
    const findResponsable = await this.personalRepository.findOne({
      where: { personalId: responsableId },
    });

    if (!findResponsable) {
      throw new HttpException('El responsable no existe', 400);
    }

    const newPrograma = this.programaRepository.create({
      ...rest,
      responsable: findResponsable,
    });

    await this.programaRepository.insert(newPrograma);

    return { status: 201, message: 'Programa creado', data: newPrograma };
  }

  async findAll(query: QueryDto) {
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

  async findOne(id: number) {
    const programa = await this.programaRepository.findOne({
      where: { programaId: id },
      relations: [
        'responsable',
        'personal',
        'citas',
        'personal',
        'responsable.user',
        'responsable.user.recurso',
      ],
    });

    if (!programa) {
      throw new HttpException('Programa no encontrado', 404);
    }

    return { status: 200, message: 'OK', data: programa };
  }

  async update(id: number, updateProgramaDto: UpdateProgramaDto) {
    const { responsableId, ...rest } = updateProgramaDto;

    const findPrograma = await this.programaRepository.findOne({
      where: { programaId: id },
    });

    if (!findPrograma) {
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

  async remove(id: number) {
    const findPrograma = await this.programaRepository.findOne({
      where: { programaId: id },
    });

    if (!findPrograma) {
      throw new HttpException('Programa no encontrado', 404);
    }

    await this.programaRepository.update(id, { estado: false });

    return { status: 200, message: 'OK', data: null };
  }
}
