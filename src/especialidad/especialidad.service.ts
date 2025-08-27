import { HttpException, Injectable } from '@nestjs/common';
import { CreateEspecialidadDto } from './dto/create-especialidad.dto';
import { UpdateEspecialidadDto } from './dto/update-especialidad.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Especialidad } from './entities/especialidad.entity';
import { Repository } from 'typeorm';
import { RedisService } from 'src/redis/redis.service';

@Injectable()
export class EspecialidadService {
  private key = 'especialidades';

  constructor(
    @InjectRepository(Especialidad)
    private especialidadRepository: Repository<Especialidad>,
    private redisService: RedisService,
  ) {}

  async create(createEspecialidadDto: CreateEspecialidadDto) {
    const especialidad = this.especialidadRepository.create(
      createEspecialidadDto,
    );

    await this.especialidadRepository.insert(especialidad);

    const allEspecialidades = await this.especialidadRepository.find();

    await this.redisService.set(this.key, allEspecialidades);

    return {
      status: 200,
      message: 'Especialidad created successfully',
      data: allEspecialidades,
    };
  }

  async findAll() {
    const cacheEspecialidades = await this.redisService.get<Especialidad[]>(
      this.key,
    );

    if (cacheEspecialidades) {
      return {
        status: 200,
        message: 'Especialidades retrieved from cache',
        data: cacheEspecialidades,
      };
    }

    const allEspecialidades = await this.especialidadRepository.find();

    await this.redisService.set(this.key, allEspecialidades);

    return {
      status: 200,
      message: 'Especialidades retrieved from database',
      data: allEspecialidades,
    };
  }

  async findOne(id: number) {
    const findEspecialidad = await this.especialidadRepository.findOne({
      where: { especialidadId: id },
    });

    if (!findEspecialidad) {
      throw new HttpException('Especialidad not found', 404);
    }

    return {
      status: 200,
      message: 'Especialidad retrieved successfully',
      data: findEspecialidad,
    };
  }

  async update(id: number, updateEspecialidadDto: UpdateEspecialidadDto) {
    const findEspecialidad = await this.especialidadRepository.findOne({
      where: { especialidadId: id },
    });

    if (!findEspecialidad) {
      throw new HttpException('Especialidad not found', 404);
    }

    await this.especialidadRepository.update(id, updateEspecialidadDto);

    const findAllEspecialidades = await this.especialidadRepository.find();

    await this.redisService.set(this.key, findAllEspecialidades);

    return {
      status: 200,
      message: 'Especialidad updated successfully',
      data: findAllEspecialidades,
    };
  }

  async remove(id: number) {
    const findEspecialidad = await this.especialidadRepository.findOne({
      where: { especialidadId: id },
    });

    if (!findEspecialidad) {
      throw new HttpException('Especialidad not found', 404);
    }

    await this.especialidadRepository.update(id, {
      estado: false,
    });

    const findAllEspecialidades = await this.especialidadRepository.find();

    await this.redisService.set(this.key, findAllEspecialidades);

    return {
      status: 200,
      message: 'Especialidad removed successfully',
      data: findAllEspecialidades,
    };
  }
}
