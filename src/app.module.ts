import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RedisService } from './redis/redis.service';
import { RedisModule } from './redis/redis.module';
import { ObstetraModule } from './obstetra/obstetra.module';
import { EspecialidadModule } from './especialidad/especialidad.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mssql',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT!),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      options: {
        encrypt: process.env.ENCRYPT === 'true',
        trustServerCertificate: true,
      },
    }),
    RedisModule,
    ObstetraModule,
    EspecialidadModule,
  ],
  controllers: [],
  providers: [RedisService],
})
export class AppModule {}
