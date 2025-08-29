import { Module } from '@nestjs/common';
import { PostaService } from './posta.service';
import { PostaController } from './posta.controller';

@Module({
  controllers: [PostaController],
  providers: [PostaService],
})
export class PostaModule {}
