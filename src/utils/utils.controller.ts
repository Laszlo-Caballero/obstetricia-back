import { Controller, Get, Param } from '@nestjs/common';
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

  @Get('provincias/:idRegion')
  async findProvinciaByRegion(@Param('idRegion') idRegion: number) {
    return this.utilsService.findProvinciaByRegion(idRegion);
  }

  @Get('distritos/:idProvincia')
  async findDistritoByProvincia(@Param('idProvincia') idProvincia: number) {
    return this.utilsService.findDistritoByProvincia(idProvincia);
  }

  @Get('distritos')
  async findAllDistritos() {
    return this.utilsService.findAllDistritos();
  }
}
