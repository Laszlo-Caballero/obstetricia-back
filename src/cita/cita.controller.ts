import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Req,
  Query,
  Patch,
} from '@nestjs/common';
import { CitaService } from './cita.service';
import { CreateCitaDto } from './dto/create-cita.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { RequestUser } from 'src/auth/interface/type';
import { QueryCitaDto } from './dto/query.dto';
import { MotivoDto } from 'src/motivos/dto/motivo.dto';
import { CompleteCitaDto } from './dto/complete-cita.dto';

@Controller('cita')
export class CitaController {
  constructor(private readonly citaService: CitaService) {}

  @Auth()
  @Post()
  create(@Body() createCitaDto: CreateCitaDto, @Req() req: RequestUser) {
    return this.citaService.createCita(createCitaDto, req.user);
  }

  @Auth()
  @Get()
  findAll(@Query() query: QueryCitaDto) {
    return this.citaService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.citaService.findOne(+id);
  }
  @Auth()
  @Get('personal/hoy')
  findCitasHoy(@Req() req: RequestUser) {
    return this.citaService.findCitasHoy(req.user);
  }

  @Auth()
  @Patch('/completar/:id')
  completarCita(@Param('id') id: string, @Body() body: CompleteCitaDto) {
    return this.citaService.completeCita(+id, body);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Body() body: MotivoDto) {
    return this.citaService.remove(+id, body);
  }
}
