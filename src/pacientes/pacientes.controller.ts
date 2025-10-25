import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { PacientesService } from './pacientes.service';
import { CreatePacienteDto } from './dto/create-paciente.dto';
import { UpdatePacienteDto } from './dto/update-paciente.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('pacientes')
export class PacientesController {
  constructor(private readonly pacientesService: PacientesService) {}

  @Post()
  create(@Body() createPacienteDto: CreatePacienteDto) {
    return this.pacientesService.create(createPacienteDto);
  }

  @Get()
  findAll(
    @Query('limit') limit?: number,
    @Query('page') page?: number,
    @Query('status') status?: boolean,
    @Query('search') search?: string,
    @Query('dni') dni?: string,
  ) {
    return this.pacientesService.findAll(limit, page, status, search, dni);
  }

  @Get(':dni')
  findOne(@Param('dni') dni: string) {
    return this.pacientesService.findOne(dni);
  }

  @Patch(':dni')
  update(
    @Param('dni') dni: string,
    @Body() updatePacienteDto: UpdatePacienteDto,
  ) {
    return this.pacientesService.update(dni, updatePacienteDto);
  }

  @Delete(':dni')
  remove(@Param('dni') dni: string) {
    return this.pacientesService.remove(dni);
  }

  @Post('/import-excel')
  @UseInterceptors(FileInterceptor('file'))
  uploadFiles(@UploadedFile() file: Express.Multer.File) {
    return this.pacientesService.importExcel(file);
  }
}
