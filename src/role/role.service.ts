import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Roles } from './entities/roles.entity';
import { Repository } from 'typeorm';
import { RedisService } from 'src/redis/redis.service';

@Injectable()
export class RoleService {
  private roleKey = 'role';

  constructor(
    @InjectRepository(Roles)
    private rolesRepository: Repository<Roles>,
    private redisService: RedisService,
  ) {}

  async findAll() {
    const roles = await this.redisService.get<Roles[]>(this.roleKey);

    if (roles) {
      return {
        status: 200,
        message: 'Roles retrieved successfully',
        data: roles,
      };
    }

    const allRoles = await this.rolesRepository.find();
    await this.redisService.set(this.roleKey, allRoles);

    return {
      status: 200,
      message: 'Roles retrieved successfully',
      data: allRoles,
    };
  }
}
