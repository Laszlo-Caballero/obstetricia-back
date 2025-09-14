import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Distrito } from 'src/posta/entities/distrito.entity';
import { Provincia } from 'src/posta/entities/provincia.entity';
import { Region } from 'src/posta/entities/region.entity';
import { RedisService } from 'src/redis/redis.service';
import { Repository } from 'typeorm';

@Injectable()
export class UtilsService {
  private readonly keyRegion = 'region';
  private readonly keyProvincia = 'provincia';
  private readonly keyDistrito = 'distrito';

  constructor(
    @InjectRepository(Region) private regionRepository: Repository<Region>,
    @InjectRepository(Provincia)
    private provinciaRepository: Repository<Provincia>,
    @InjectRepository(Distrito)
    private distritoRepository: Repository<Distrito>,
    private readonly redisService: RedisService,
  ) {}

  async findAllRegions() {
    const cacheRegiones = await this.redisService.get<Region[]>(this.keyRegion);
    if (cacheRegiones) {
      return {
        status: 200,
        message: 'Regions retrieved successfully from cache',
        data: cacheRegiones,
      };
    }
    const regiones = await this.regionRepository.find();
    await this.redisService.set(this.keyRegion, regiones);
    return {
      status: 200,
      message: 'Regions retrieved successfully from database',
      data: regiones,
    };
  }

  async findProvinciaByRegion(idRegion: number) {
    const cacheProvincias = await this.redisService.get<Provincia[]>(
      `${this.keyProvincia}-${idRegion}`,
    );

    if (cacheProvincias) {
      return {
        status: 200,
        message: 'Provincias retrieved successfully from cache',
        data: cacheProvincias,
      };
    }

    const findRegion = await this.regionRepository.findOne({
      where: { regionId: idRegion },
      relations: ['provincias'],
    });

    if (!findRegion) {
      throw new HttpException('Region not found', 404);
    }

    await this.redisService.set(
      `${this.keyProvincia}-${idRegion}`,
      findRegion.provincias,
    );

    return {
      status: 200,
      message: 'Provincias retrieved successfully',
      data: findRegion.provincias,
    };
  }

  async findDistritoByProvincia(idProvincia: number) {
    const cacheDistritos = await this.redisService.get<Distrito[]>(
      `${this.keyDistrito}-${idProvincia}`,
    );

    if (cacheDistritos) {
      return {
        status: 200,
        message: 'Distritos retrieved successfully from cache',
        data: cacheDistritos,
      };
    }

    const findProvincia = await this.provinciaRepository.findOne({
      where: { provinciaId: idProvincia },
      relations: ['distritos'],
    });

    if (!findProvincia) {
      throw new HttpException('Provincia not found', 404);
    }

    await this.redisService.set(
      `${this.keyDistrito}-${idProvincia}`,
      findProvincia.distritos,
    );

    return {
      status: 200,
      message: 'Distritos retrieved successfully',
      data: findProvincia.distritos,
    };
  }

  async findAllProvincias() {
    const cacheProvincias = await this.redisService.get<Region[]>(
      this.keyProvincia,
    );

    if (cacheProvincias) {
      return {
        status: 200,
        message: 'Provincias retrieved successfully from cache',
        data: cacheProvincias,
      };
    }

    const provincias = await this.provinciaRepository.find();
    await this.redisService.set(this.keyProvincia, provincias);
    return {
      status: 200,
      message: 'Provincias retrieved successfully from database',
      data: provincias,
    };
  }

  async findAllDistritos() {
    const cacheDistritos = await this.redisService.get<Region[]>(
      this.keyDistrito,
    );
    if (cacheDistritos) {
      return {
        status: 200,
        message: 'Distritos retrieved successfully from cache',
        data: cacheDistritos,
      };
    }

    const distritos = await this.distritoRepository.find();
    await this.redisService.set(this.keyDistrito, distritos);
    return {
      status: 200,
      message: 'Distritos retrieved successfully from database',
      data: distritos,
    };
  }
}
