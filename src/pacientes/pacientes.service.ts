import { HttpException, Injectable } from '@nestjs/common';
import { CreatePacienteDto } from './dto/create-paciente.dto';
import { UpdatePacienteDto } from './dto/update-paciente.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Paciente } from './entities/paciente.entity';
import { Like, Repository } from 'typeorm';

@Injectable()
export class PacientesService {
  constructor(
    @InjectRepository(Paciente)
    private readonly pacienteRepository: Repository<Paciente>,
  ) {}

  async create(createPacienteDto: CreatePacienteDto) {
    const newPaciente = this.pacienteRepository.create(createPacienteDto);

    await this.pacienteRepository.insert(newPaciente);

    return {
      status: 201,
      message: 'Paciente creado exitosamente',
      data: newPaciente,
    };
  }

  async findAll(
    limit: number = 10,
    page: number = 1,
    status?: boolean,
    search?: string,
  ) {
    const [dbPaciente, totalItems] = await this.pacienteRepository.findAndCount(
      {
        relations: ['citas'],
        take: limit,
        skip: (page - 1) * limit,
        where: {
          ...(status !== undefined && { estado: status }),
          ...(search && { nombres: Like(`%${search}%`) }),
        },
      },
    );

    return {
      status: 200,
      message: 'Lista de pacientes',
      data: dbPaciente,
      metadata: {
        totalItems,
        totalPages: Math.ceil(totalItems / limit),
        currentPage: page,
      },
    };
  }

  async findOne(dni: string) {
    const paciente = await this.pacienteRepository.findOne({
      relations: ['citas'],
      where: { dni },
    });

    if (!paciente) {
      throw new HttpException('Paciente no encontrado', 404);
    }

    return {
      status: 200,
      message: 'Paciente encontrado',
      data: paciente,
    };
  }

  async update(id: number, updatePacienteDto: UpdatePacienteDto) {
    const paciente = await this.pacienteRepository.findOneBy({
      pacienteId: id,
    });

    if (!paciente) {
      throw new HttpException('Paciente no encontrado', 404);
    }

    await this.pacienteRepository.update(id, updatePacienteDto);

    return {
      status: 200,
      message: 'Paciente actualizado exitosamente',
      data: null,
    };
  }

  async remove(id: number) {
    const paciente = await this.pacienteRepository.findOneBy({
      pacienteId: id,
    });

    if (!paciente) {
      throw new HttpException('Paciente no encontrado', 404);
    }

    await this.pacienteRepository.update(id, { estado: false });

    return {
      status: 200,
      message: 'Paciente eliminado exitosamente',
      data: null,
    };
  }
}
