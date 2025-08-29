import { HttpException, Injectable } from '@nestjs/common';
import { CreatePostaDto } from './dto/create-posta.dto';
import { UpdatePostaDto } from './dto/update-posta.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Posta } from './entities/posta.entity';
import { Repository } from 'typeorm';
import { RedisService } from 'src/redis/redis.service';

@Injectable()
export class PostaService {
  private readonly postaKey = 'posta';

  constructor(
    @InjectRepository(Posta)
    private readonly postaRepository: Repository<Posta>,
    private readonly redisService: RedisService,
  ) {}

  async create(createPostaDto: CreatePostaDto) {
    const posta = this.postaRepository.create(createPostaDto);

    await this.postaRepository.insert(posta);

    const allPosta = await this.postaRepository.find();

    await this.redisService.set(this.postaKey, allPosta);

    return {
      status: 200,
      message: 'Post created successfully',
      data: allPosta,
    };
  }

  async findAll() {
    const allPosta = await this.redisService.get<Posta[]>(this.postaKey);

    if (allPosta) {
      return {
        status: 200,
        message: 'Post retrieved successfully from cache',
        data: allPosta,
      };
    }

    const dbPosta = await this.postaRepository.find();

    await this.redisService.set(this.postaKey, dbPosta);

    return {
      status: 200,
      message: 'Post retrieved successfully from database',
      data: dbPosta,
    };
  }

  async findOne(id: number) {
    const findPosta = await this.postaRepository.findOneBy({ postaId: id });

    if (!findPosta) {
      throw new HttpException('Post not found', 404);
    }

    return {
      status: 200,
      message: 'Post retrieved successfully',
      data: findPosta,
    };
  }

  async update(id: number, updatePostaDto: UpdatePostaDto) {
    const findPosta = await this.postaRepository.findOneBy({ postaId: id });

    if (!findPosta) {
      throw new HttpException('Post not found', 404);
    }

    await this.postaRepository.update(id, updatePostaDto);

    const allPosta = await this.postaRepository.find();

    await this.redisService.set(this.postaKey, allPosta);

    return {
      status: 200,
      message: 'Post updated successfully',
      data: allPosta,
    };
  }

  async remove(id: number) {
    const findPosta = await this.postaRepository.findOneBy({ postaId: id });

    if (!findPosta) {
      throw new HttpException('Post not found', 404);
    }

    await this.postaRepository.update(id, { estado: false });

    const allPosta = await this.postaRepository.find();

    await this.redisService.set(this.postaKey, allPosta);

    return {
      status: 200,
      message: 'Post removed successfully',
      data: allPosta,
    };
  }
}
