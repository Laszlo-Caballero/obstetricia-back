import {
  Controller,
  Get,
  Res,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { ConsultaService } from './consulta.service';
import { CreateConsultaDto } from './dto/create-consulta.dto';
import { UpdateConsultaDto } from './dto/update-consulta.dto';

@Controller('ayuda/consulta')
export class ConsultaController {
  constructor(private readonly consultaService: ConsultaService) {}

  @Post()
  create(@Body() createConsultaDto: CreateConsultaDto) {
    return this.consultaService.create(createConsultaDto);
  }

  @Get()
  findAll(
    @Query('limit') limit?: number,
    @Query('page') page?: number,
    @Query('moduloId') moduloId?: number,
    @Query('prioridadId') prioridadId?: number,
    @Query('tipoId') tipoId?: number,
    @Query('userId') userId?: number,
    @Query('status') status?: boolean,
    @Query('search') search?: string,
  ) {
    return this.consultaService.findAll(
      limit,
      page,
      moduloId,
      prioridadId,
      tipoId,
      userId,
      status,
      search,
    );
  }

  @Get('export')
  async exportData(@Res() res) {
    const { buffer, fileName } = await this.consultaService.exportData();
    res.header('Content-Disposition', `attachment; filename=${fileName}.xlsx`);
    res.type(
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    );
    res.send(buffer);
  }

  @Get('raw-consultas')
  getRawConsultas() {
    return this.consultaService.rawConsultas();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.consultaService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateConsultaDto: UpdateConsultaDto,
  ) {
    return this.consultaService.update(+id, updateConsultaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.consultaService.remove(+id);
  }
}
