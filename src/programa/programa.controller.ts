import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { ProgramaService } from './programa.service';
import { CreateProgramaDto } from './dto/create-programa.dto';
import { UpdateProgramaDto } from './dto/update-programa.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { RolesEnum } from 'src/auth/enum/roles';
import { QueryDto } from './dto/query.dto';
import { MotivoDto } from 'src/motivos/dto/motivo.dto';

@Controller('programa')
export class ProgramaController {
  constructor(private readonly programaService: ProgramaService) {}
  @Auth(RolesEnum.Administrador)
  @Post()
  create(@Body() createProgramaDto: CreateProgramaDto) {
    return this.programaService.create(createProgramaDto);
  }

  @Get()
  findAll(@Query() query: QueryDto) {
    return this.programaService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.programaService.findOne(+id);
  }
  @Auth(RolesEnum.Administrador)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateProgramaDto: UpdateProgramaDto,
  ) {
    return this.programaService.update(+id, updateProgramaDto);
  }

  @Auth(RolesEnum.Administrador)
  @Delete(':id')
  remove(@Param('id') id: string, @Body() motivoDto: MotivoDto) {
    return this.programaService.remove(+id, motivoDto);
  }
}
