import { Controller, Get } from '@nestjs/common';
import { UtilsService } from './utils.service';

@Controller('utils')
export class UtilsController {
  constructor(private readonly utilsService: UtilsService) {}

  @Get('regiones')
  async findAllRegions() {
    return this.utilsService.findAllRegions();
  }

  @Get('provincias')
  async findAllProvincias() {
    return this.utilsService.findAllProvincias();
  }

  @Get('distritos')
  async findAllDistritos() {
    return this.utilsService.findAllDistritos();
  }
}
