import { HttpException, Injectable } from '@nestjs/common';
import { CreateTurnoDto } from './dto/create-turno.dto';
import { UpdateTurnoDto } from './dto/update-turno.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Turno } from './entities/turno.entity';
import { Repository } from 'typeorm';
import { RedisService } from 'src/redis/redis.service';

@Injectable()
export class TurnosService {
  private readonly turnoKey = 'turnos';

  constructor(
    @InjectRepository(Turno)
    private readonly turnoRepository: Repository<Turno>,
    private readonly redisService: RedisService,
  ) {}

  async create(createTurnoDto: CreateTurnoDto) {
    const newTurno = this.turnoRepository.create(createTurnoDto);
    await this.turnoRepository.insert(newTurno);

    const findAll = await this.turnoRepository.find();
    await this.redisService.set(this.turnoKey, findAll);

    return {
      message: 'Turno creado exitosamente',
      status: 200,
      data: findAll,
    };
  }

  async findAll() {
    const cachedData = await this.redisService.get<Turno[]>(this.turnoKey);
    if (cachedData) {
      return {
        message: 'Turnos obtenidos desde la caché',
        status: 200,
        data: cachedData,
      };
    }

    const findAll = await this.turnoRepository.find();
    await this.redisService.set(this.turnoKey, findAll);

    return {
      message: 'Turnos obtenidos desde la base de datos',
      status: 200,
      data: findAll,
    };
  }

  async findOne(id: number) {
    const findOne = await this.turnoRepository.findOneBy({ turnoId: id });
    if (!findOne) {
      throw new HttpException('Turno no encontrado', 404);
    }

    return {
      message: 'Turno obtenido exitosamente',
      status: 200,
      data: findOne,
    };
  }

  async update(id: number, updateTurnoDto: UpdateTurnoDto) {
    const findOne = await this.turnoRepository.findOneBy({ turnoId: id });
    if (!findOne) {
      throw new HttpException('Turno no encontrado', 404);
    }

    await this.turnoRepository.update(id, updateTurnoDto);
    const findAll = await this.turnoRepository.find();
    await this.redisService.set(this.turnoKey, findAll);

    return {
      message: 'Turno actualizado exitosamente',
      status: 200,
      data: findAll,
    };
  }

  async remove(id: number) {
    const findOne = await this.turnoRepository.findOneBy({ turnoId: id });
    if (!findOne) {
      throw new HttpException('Turno no encontrado', 404);
    }

    await this.turnoRepository.update(id, { estado: false });
    const findAll = await this.turnoRepository.find();
    await this.redisService.set(this.turnoKey, findAll);

    return {
      message: 'Turno eliminado exitosamente',
      status: 200,
      data: findAll,
    };
  }
}
