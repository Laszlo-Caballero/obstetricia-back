import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Auth } from './entities/auth.entity';
import { Roles } from 'src/role/entities/roles.entity';
import { ConfigModule } from '@nestjs/config';
import { Personal } from 'src/personal/entities/personal.entity';
import { Recurso } from 'src/recurso/entities/recurso.entity';
import { RedisModule } from 'src/redis/redis.module';
import { TwilioModule } from 'nestjs-twilio';

@Module({
  imports: [
    ConfigModule.forRoot(),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
    }),
    TypeOrmModule.forFeature([Auth, Roles, Personal, Recurso]),
    RedisModule,
    TwilioModule.forRoot({
      accountSid: process.env.TWILIO_ACCOUNT_SID,
      authToken: process.env.TWILIO_AUTH_TOKEN,
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
