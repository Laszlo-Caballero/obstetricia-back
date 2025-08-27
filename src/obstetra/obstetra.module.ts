import { Module } from '@nestjs/common';
import { ObstetraService } from './obstetra.service';
import { ObstetraController } from './obstetra.controller';

@Module({
  controllers: [ObstetraController],
  providers: [ObstetraService],
})
export class ObstetraModule {}
