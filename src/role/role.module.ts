import { Module } from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleController } from './role.controller';
import { Roles } from './entities/roles.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RedisModule } from 'src/redis/redis.module';

@Module({
  imports: [RedisModule, TypeOrmModule.forFeature([Roles])],
  controllers: [RoleController],
  providers: [RoleService],
})
export class RoleModule {}
