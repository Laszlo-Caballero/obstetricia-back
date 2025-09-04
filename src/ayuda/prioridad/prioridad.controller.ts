import { Controller, Get, Res, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { PrioridadService } from './prioridad.service';
import { CreatePrioridadDto } from './dto/create-prioridad.dto';
import { UpdatePrioridadDto } from './dto/update-prioridad.dto';

@Controller('ayuda/prioridad')
export class PrioridadController {
  constructor(private readonly prioridadService: PrioridadService) {}

  @Post()
  create(@Body() createPrioridadDto: CreatePrioridadDto) {
    return this.prioridadService.create(createPrioridadDto);
  }

  @Get()
  findAll(
    @Query ('limit') limit?: number,
    @Query ('page') page?: number,
    @Query ('status') status?: boolean,
    @Query ('search') search?: string
  ) {
    return this.prioridadService.findAll(limit, page, status, search);
  }
  @Get('export')
    async exportData(@Res() res) {
      const { buffer, fileName } = await this.prioridadService.exportData();
      res.header('Content-Disposition', `attachment; filename=${fileName}.xlsx`);
      res.type(
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      );
      res.send(buffer);
    }

  @Get('raw-prioridad')
  getRawprioridades() {
    return this.prioridadService.rawPrioridades();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.prioridadService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePrioridadDto: UpdatePrioridadDto) {
    return this.prioridadService.update(+id, updatePrioridadDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.prioridadService.remove(+id);
  }
}
