import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Recurso } from './entities/recurso.entity';
import { Repository } from 'typeorm';
import { RedisService } from 'src/redis/redis.service';
import { join } from 'path';
import * as fs from 'fs';

@Injectable()
export class RecursoService {
  private readonly recursoKey = 'recurso';

  constructor(
    @InjectRepository(Recurso)
    private recursoRepository: Repository<Recurso>,
    private readonly redisService: RedisService,
  ) {}

  async create(file: Express.Multer.File, destination?: string) {
    const fix = Date.now();
    const ext = file.originalname.split('.').pop();
    const baseName = file.originalname.replace(/\.[^/.]+$/, '');
    const name = `${baseName}-${fix}.${ext}`;

    const safeFolder = (destination || '').replace(/[^a-zA-Z0-9_-]/g, '');
    const dest = join(__dirname, '../../public', safeFolder || '');

    if (!fs.existsSync(dest)) {
      fs.mkdirSync(dest, { recursive: true });
    }

    const newPath = join(dest, name);

    fs.writeFileSync(newPath, file.buffer);

    const newRecurso = this.recursoRepository.create({
      nombre: name,
      extension: ext,
      url: destination ? `/static/${destination}/${name}` : `/static/${name}`,
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
