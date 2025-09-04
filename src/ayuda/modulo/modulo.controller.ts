import { Controller, Get, Post, Body, Patch, Param, Res, Delete, Query } from '@nestjs/common';
import { ModuloService } from './modulo.service';
import { CreateModuloDto } from './dto/create-modulo.dto';
import { UpdateModuloDto } from './dto/update-modulo.dto';

@Controller('ayuda/modulo')
export class ModuloController {
  constructor(private readonly moduloService: ModuloService) {}

  @Post()
  create(@Body() createModuloDto: CreateModuloDto) {
    return this.moduloService.create(createModuloDto);
  }

  @Get()
  findAll(
    @Query ('limit') limit?: number,
    @Query ('page') page?: number,
    @Query ('status') status?: boolean,
    @Query ('search') search?: string,
  ) {
    return this.moduloService.findAll(limit, page, status, search);
  }
  
  @Get('export')
  async exportData(@Res() res) {
    const { buffer, fileName } = await this.moduloService.exportData();
    res.header('Content-Disposition', `attachment; filename=${fileName}.xlsx`);
    res.type(
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    );
    res.send(buffer);
  }

  @Get('raw-modulos')
  getRawModulos() {
    return this.moduloService.rawModulos();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.moduloService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateModuloDto: UpdateModuloDto) {
    return this.moduloService.update(+id, updateModuloDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.moduloService.remove(+id);
  }
}
