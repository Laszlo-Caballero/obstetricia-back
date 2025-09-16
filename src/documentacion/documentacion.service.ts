import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Documentacion } from './entities/documentacion.entity';
import { Model } from 'mongoose';
import { InjectRepository } from '@nestjs/typeorm';
import { Auth } from 'src/auth/entities/auth.entity';
import { Repository } from 'typeorm';
import { RequestUser } from 'src/auth/interface/type';
import { Recurso } from 'src/recurso/entities/recurso.entity';
import { RedisService } from 'src/redis/redis.service';

@Injectable()
export class DocumentacionService {
  private readonly keyDocumentacion = 'documentacion';

  constructor(
    @InjectModel(Documentacion.name)
    private readonly documentacionModel: Model<Documentacion>,
    @InjectRepository(Auth)
    private readonly authRepository: Repository<Auth>,
    @InjectRepository(Recurso)
    private readonly recursoRepository: Repository<Recurso>,
    private readonly redisService: RedisService,
  ) {}

  getVersion(type: string, lastDocument?: Documentacion | null) {
    if (type === 'MAYOR') {
      return lastDocument ? Math.floor(lastDocument.version) + 1 : 1.0;
    }

    if (lastDocument) {
      console.log(lastDocument.version + 0.1);
      return lastDocument.version + 0.1;
    }

    return 1.0;
  }

  async create(type: string, file: Express.Multer.File, req: RequestUser) {
    if (!type || (type !== 'MAYOR' && type !== 'MENOR')) {
      throw new HttpException('Type is bad', 400);
    }

    if (!file) {
      throw new HttpException('File is required', 400);
    }

    const ext = file.originalname.split('.').pop();
    if (ext !== 'pdf') {
      throw new HttpException('File must be a PDF', 400);
    }

    const user = await this.authRepository.findOne({
      where: { userId: req.user.userId },
      relations: ['personal'],
    });
    if (!user) {
      throw new Error('User not found');
    }

    const lastDocument = await this.documentacionModel
      .findOne()
      .sort({ version: -1 })
      .exec();

    const version = this.getVersion(type, lastDocument);

    const newRecurso = this.recursoRepository.create({
      nombre: file.filename,
      extension: file.filename.split('.').pop(),
      url: `/static/documentacion/${file.filename}`,
    });

    await this.recursoRepository.insert(newRecurso);

    const newDocumentacion = await this.documentacionModel.create({
      version: version,
      resource: newRecurso,
      user: {
        userId: user.userId,
        nombre: user.personal.nombre,
        apellidoPaterno: user.personal.apellidoPaterno,
        apellidoMaterno: user.personal.apellidoMaterno,
      },
    });

    await newDocumentacion.save();

    const findAll = await this.documentacionModel.find().exec();
    await this.redisService.set(this.keyDocumentacion, findAll);

    return {
      status: 200,
      message: 'Documentacion created successfully',
      data: findAll,
    };
  }

  async findAll(order: string = 'DESC') {
    const cache = await this.redisService.get<Documentacion[]>(
      this.keyDocumentacion,
    );

    if (cache) {
      return {
        status: 200,
        message: 'Documentacion retrieved from cache',
        data: cache.sort((a, b) => {
          if (order === 'ASC') {
            return a.version - b.version;
          }
          return b.version - a.version;
        }),
      };
    }

    const findAll = await this.documentacionModel.find().exec();
    await this.redisService.set(this.keyDocumentacion, findAll);

    return {
      status: 200,
      message: 'Documentacion retrieved from database',
      data: findAll.sort((a, b) => {
        if (order === 'ASC') {
          return a.version - b.version;
        }
        return b.version - a.version;
      }),
    };
  }

  async findOne(version: string) {
    const parseVersion = parseFloat(version);
    if (isNaN(parseVersion)) {
      throw new HttpException('Version is not valid', 400);
    }

    const documentacion = await this.documentacionModel
      .findOne({ version: parseVersion })
      .exec();
    if (!documentacion) {
      throw new HttpException('Documentacion not found', 404);
    }

    return {
      status: 200,
      message: 'Documentacion retrieved successfully',
      data: documentacion,
    };
  }

  async findLast() {
    const documentacion = await this.documentacionModel
      .findOne()
      .sort({ version: -1 })
      .exec();
    if (!documentacion) {
      throw new HttpException('Documentacion not found', 404);
    }

    return {
      status: 200,
      message: 'Documentacion retrieved successfully',
      data: documentacion,
    };
  }
}
