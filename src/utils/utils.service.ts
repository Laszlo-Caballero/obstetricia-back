import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Region } from 'src/posta/entities/region.entity';
import { RedisService } from 'src/redis/redis.service';
import { Repository } from 'typeorm';

@Injectable()
export class UtilsService {
  private readonly keyRegion = 'region';

  constructor(
    @InjectRepository(Region) private regionRepository: Repository<Region>,
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
}
