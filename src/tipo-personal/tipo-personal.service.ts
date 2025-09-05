import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateTipoPersonalDto } from './dto/create-tipo-personal.dto';
import { UpdateTipoPersonalDto } from './dto/update-tipo-personal.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TipoPersonal } from './entities/tipo-personal.entity';
import { Repository } from 'typeorm';
import { RedisService } from 'src/redis/redis.service';

@Injectable()
export class TipoPersonalService {
  private readonly tipoKey = 'tipoPersonal';

  constructor(
    @InjectRepository(TipoPersonal)
    private tipoPersonalRepository: Repository<TipoPersonal>,
    private readonly redisService: RedisService,
  ) {}

  async create(createTipoPersonalDto: CreateTipoPersonalDto) {
    const newTipoPersonal = this.tipoPersonalRepository.create(
      createTipoPersonalDto,
    );
    await this.tipoPersonalRepository.insert(newTipoPersonal);

    const findAll = await this.tipoPersonalRepository.find();

    await this.redisService.set(this.tipoKey, findAll);

    return {
      message: 'Tipo de personal creado exitosamente',
      status: 200,
      data: findAll,
    };
  }

  async findAll() {
    const cachedData = await this.redisService.get(this.tipoKey);
    if (cachedData) {
      return {
        message: 'Tipo de personal obtenidos desde cache',
        status: 200,
        data: cachedData,
      };
    }

    const findAll = await this.tipoPersonalRepository.find();
    await this.redisService.set(this.tipoKey, findAll);

    return {
      message: 'Tipo de personal obtenidos desde base de datos',
      status: 200,
      data: findAll,
    };
  }

  async findOne(id: number) {
    const findOne = await this.tipoPersonalRepository.findOneBy({
      tipoPersonalId: id,
    });
    if (!findOne) {
      throw new HttpException(
        'Tipo de personal no encontrado',
        HttpStatus.NOT_FOUND,
      );
    }

    return {
      message: 'Tipo de personal encontrado',
      status: 200,
      data: findOne,
    };
  }

  async update(id: number, updateTipoPersonalDto: UpdateTipoPersonalDto) {
    const findOne = await this.tipoPersonalRepository.findOneBy({
      tipoPersonalId: id,
    });
    if (!findOne) {
      throw new HttpException(
        'Tipo de personal no encontrado',
        HttpStatus.NOT_FOUND,
      );
    }

    await this.tipoPersonalRepository.update(id, updateTipoPersonalDto);
    const findAll = await this.tipoPersonalRepository.find();
    await this.redisService.set(this.tipoKey, findAll);

    return {
      message: 'Tipo de personal actualizado exitosamente',
      status: 200,
      data: findAll,
    };
  }

  async remove(id: number) {
    const findOne = await this.tipoPersonalRepository.findOneBy({
      tipoPersonalId: id,
    });
    if (!findOne) {
      throw new HttpException(
        'Tipo de personal no encontrado',
        HttpStatus.NOT_FOUND,
      );
    }

    await this.tipoPersonalRepository.update(id, { estado: false });
    const findAll = await this.tipoPersonalRepository.find();
    await this.redisService.set(this.tipoKey, findAll);

    return {
      message: 'Tipo de personal eliminado exitosamente',
      status: 200,
      data: findAll,
    };
  }
}
