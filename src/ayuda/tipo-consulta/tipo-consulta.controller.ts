import { Controller, Get, Res, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { TipoConsultaService } from './tipo-consulta.service';
import { CreateTipoConsultaDto } from './dto/create-tipo-consulta.dto';
import { UpdateTipoConsultaDto } from './dto/update-tipo-consulta.dto';

@Controller('ayuda/tipo-consulta')
export class TipoConsultaController {
  constructor(private readonly tipoConsultaService: TipoConsultaService) {}

  @Post()
  create(@Body() createTipoConsultaDto: CreateTipoConsultaDto) {
    return this.tipoConsultaService.create(createTipoConsultaDto);
  }

  @Get()
  findAll(
    @Query ('limit') limit?: number,
    @Query ('page') page?: number,
    @Query ('status') status?: boolean,
    @Query ('search') search?: string,
  ) {
    return this.tipoConsultaService.findAll(limit, page, status, search);
  }

  @Get('export')
    async exportData(@Res() res) {
      const { buffer, fileName } = await this.tipoConsultaService.exportData();
      res.header('Content-Disposition', `attachment; filename=${fileName}.xlsx`);
      res.type(
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      );
      res.send(buffer);
  }
  
  @Get('raw-tipos')
  getRawTipos() {
    return this.tipoConsultaService.rawTipos();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tipoConsultaService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTipoConsultaDto: UpdateTipoConsultaDto) {
    return this.tipoConsultaService.update(+id, updateTipoConsultaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tipoConsultaService.remove(+id);
  }
}
