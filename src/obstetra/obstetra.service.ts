import { HttpException, Injectable } from '@nestjs/common';
import { CreateObstetraDto } from './dto/create-obstetra.dto';
import { UpdateObstetraDto } from './dto/update-obstetra.dto';
import { Repository } from 'typeorm';
import { Obstetra } from './entities/obstetra.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Programa } from 'src/programa/entities/programa.entity';
import { RedisService } from 'src/redis/redis.service';
import { Posta } from 'src/posta/entities/posta.entity';

@Injectable()
export class ObstetraService {
  private readonly obstetraKey = 'obstetra';

  constructor(
    @InjectRepository(Obstetra)
    private readonly obstetraRepository: Repository<Obstetra>,
    @InjectRepository(Programa)
    private readonly programaRepository: Repository<Programa>,

    @InjectRepository(Posta)
    private readonly postaRepository: Repository<Posta>,

    private readonly redisService: RedisService,
  ) {}

  async create(createObstetraDto: CreateObstetraDto) {
    const { programaId, postaId, ...obstetraData } = createObstetraDto;

    const programa = await this.programaRepository.findOneBy({ programaId });

    if (!programa) {
      throw new HttpException('Programa not found', 404);
    }

    const posta = await this.postaRepository.findOneBy({ postaId });

    if (!posta) {
      throw new HttpException('Posta not found', 404);
    }

    const obstetra = this.obstetraRepository.create({
      ...obstetraData,
      programa,
      posta,
    });

    await this.obstetraRepository.insert(obstetra);

    const allObstetras = await this.obstetraRepository.find({
      relations: ['programa', 'posta'],
    });

    await this.redisService.set<Obstetra[]>(this.obstetraKey, allObstetras);

    return {
      status: 200,
      message: 'Obstetra created successfully',
      data: allObstetras,
    };
  }

  async findAll() {
    const cachedObstetras = await this.redisService.get<Obstetra[]>(
      this.obstetraKey,
    );

    if (cachedObstetras) {
      return {
        status: 200,
        message: 'Obstetras retrieved from cache',
        data: cachedObstetras,
      };
    }

    const allObstetras = await this.obstetraRepository.find({
      relations: ['programa', 'posta'],
    });

    await this.redisService.set<Obstetra[]>(this.obstetraKey, allObstetras);

    return {
      status: 200,
      message: 'Obstetras retrieved from database',
      data: allObstetras,
    };
  }

  async findOne(id: number) {
    const findObstetra = await this.obstetraRepository.findOneBy({
      obstetraId: id,
    });

    if (!findObstetra) {
      throw new HttpException('Obstetra not found', 404);
    }

    return {
      status: 200,
      message: 'Obstetra retrieved successfully',
      data: findObstetra,
    };
  }

  async update(id: number, updateObstetraDto: UpdateObstetraDto) {
    const obstetraFind = await this.obstetraRepository.findOneBy({
      obstetraId: id,
    });

    if (!obstetraFind) {
      throw new HttpException('Obstetra not found', 404);
    }

    const { programaId, postaId, ...obstetraData } = updateObstetraDto;

    const programa = await this.programaRepository.findOneBy({ programaId });

    if (!programa) {
      throw new HttpException('Programa not found', 404);
    }

    const posta = await this.postaRepository.findOneBy({ postaId });

    if (!posta) {
      throw new HttpException('Posta not found', 404);
    }

    await this.obstetraRepository.update(id, {
      ...obstetraData,
      programa,
      posta,
    });

    const allObstetras = await this.obstetraRepository.find({
      relations: ['programa', 'posta'],
    });

    await this.redisService.set<Obstetra[]>(this.obstetraKey, allObstetras);

    return {
      status: 200,
      message: 'Obstetra updated successfully',
      data: allObstetras,
    };
  }

  async remove(id: number) {
    const findObstetra = await this.obstetraRepository.findOneBy({
      obstetraId: id,
    });

    if (!findObstetra) {
      throw new HttpException('Obstetra not found', 404);
    }

    await this.obstetraRepository.update(id, { estado: false });

    const allObstetras = await this.obstetraRepository.find({
      relations: ['programa', 'posta'],
    });

    await this.redisService.set<Obstetra[]>(this.obstetraKey, allObstetras);

    return {
      status: 200,
      message: 'Obstetra removed successfully',
      data: allObstetras,
    };
  }
}
