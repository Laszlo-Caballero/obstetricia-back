import { Controller, Get } from '@nestjs/common';
import { UtilsService } from './utils.service';

@Controller('utils')
export class UtilsController {
  constructor(private readonly utilsService: UtilsService) {}

  @Get('regiones')
  async findAllRegions() {
    return this.utilsService.findAllRegions();
  }
}
