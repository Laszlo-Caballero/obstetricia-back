import { HttpException, Injectable } from '@nestjs/common';
import { CreateProgramaDto } from './dto/create-programa.dto';
import { UpdateProgramaDto } from './dto/update-programa.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Programa } from './entities/programa.entity';
import { RedisService } from 'src/redis/redis.service';

@Injectable()
export class ProgramaService {
  private readonly programasKey = 'programas';

  constructor(
    @InjectRepository(Programa)
    private programaRepository: Repository<Programa>,
    private redisService: RedisService,
  ) {}

  async create(createProgramaDto: CreateProgramaDto) {
    const newPrograma = this.programaRepository.create(createProgramaDto);
    await this.programaRepository.insert(newPrograma);

    const allProgramas = await this.programaRepository.find();
    await this.redisService.set(this.programasKey, allProgramas);

    return {
      status: 200,
      message: 'Programa creado exitosamente',
      data: allProgramas,
    };
  }

  async findAll() {
    const programas = await this.redisService.get<Programa[]>(
      this.programasKey,
    );

    if (programas) {
      return { status: 200, message: 'OK', data: programas };
    }

    const allProgramas = await this.programaRepository.find();

    await this.redisService.set(this.programasKey, allProgramas);

    return { status: 200, message: 'OK', data: allProgramas };
  }

  async findOne(id: number) {
    const findPrograma = await this.programaRepository.findOneBy({
      programaId: id,
    });

    if (!findPrograma) {
      throw new HttpException('Programa no encontrado', 404);
    }

    return { status: 200, message: 'OK', data: findPrograma };
  }

  async update(id: number, updateProgramaDto: UpdateProgramaDto) {
    const findPrograma = await this.programaRepository.findOneBy({
      programaId: id,
    });

    if (!findPrograma) {
      throw new HttpException('Programa no encontrado', 404);
    }

    await this.programaRepository.update(id, updateProgramaDto);

    const allProgramas = await this.programaRepository.find();

    await this.redisService.set(this.programasKey, allProgramas);

    return { status: 200, message: 'OK', data: allProgramas };
  }

  async remove(id: number) {
    const findPrograma = await this.programaRepository.findOneBy({
      programaId: id,
    });

    if (!findPrograma) {
      throw new HttpException('Programa no encontrado', 404);
    }

    await this.programaRepository.update(id, { estado: false });

    const allProgramas = await this.programaRepository.find();

    await this.redisService.set(this.programasKey, allProgramas);

    return { status: 200, message: 'OK', data: allProgramas };
  }
}
