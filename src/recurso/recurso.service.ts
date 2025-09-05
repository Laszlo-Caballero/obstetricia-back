import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Recurso } from './entities/recurso.entity';
import { Repository } from 'typeorm';
import { RedisService } from 'src/redis/redis.service';

@Injectable()
export class RecursoService {
  private readonly recursoKey = 'recurso';

  constructor(
    @InjectRepository(Recurso)
    private recursoRepository: Repository<Recurso>,
    private readonly redisService: RedisService,
  ) {}

  async create(file: Express.Multer.File) {
    const [fileName, ext] = file.filename.split('.');
    const newRecurso = this.recursoRepository.create({
      nombre: fileName,
      extension: ext,
      url: `/static/${file.filename}`,
    });

    await this.recursoRepository.insert(newRecurso);

    const findAll = await this.recursoRepository.find();
    await this.redisService.set(this.recursoKey, findAll);

    return {
      message: 'Recurso creado exitosamente',
      status: 200,
      data: findAll,
    };
  }

  async findAll() {
    const cachedData = await this.redisService.get(this.recursoKey);
    if (cachedData) {
      return {
        message: 'Recurso obtenido desde cache',
        status: 200,
        data: cachedData,
      };
    }

    const findAll = await this.recursoRepository.find();
    await this.redisService.set(this.recursoKey, findAll);

    return {
      message: 'Recurso obtenido desde base de datos',
      status: 200,
      data: findAll,
    };
  }

  async findOne(id: number) {
    const findOne = await this.recursoRepository.findOneBy({ recursoId: id });
    if (!findOne) {
      throw new HttpException('Recurso no encontrado', 404);
    }

    return {
      message: 'Recurso obtenido exitosamente',
      status: 200,
      data: findOne,
    };
  }
}
