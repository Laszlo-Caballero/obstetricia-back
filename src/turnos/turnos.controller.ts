import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TurnosService } from './turnos.service';
import { CreateTurnoDto } from './dto/create-turno.dto';
import { UpdateTurnoDto } from './dto/update-turno.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { RolesEnum } from 'src/auth/enum/roles';

@Controller('turnos')
export class TurnosController {
  constructor(private readonly turnosService: TurnosService) {}

  @Auth(RolesEnum.Administrador)
  @Post()
  create(@Body() createTurnoDto: CreateTurnoDto) {
    return this.turnosService.create(createTurnoDto);
  }

  @Auth(RolesEnum.Administrador)
  @Get()
  findAll() {
    return this.turnosService.findAll();
  }

  @Auth(RolesEnum.Administrador)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.turnosService.findOne(+id);
  }

  @Auth(RolesEnum.Administrador)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTurnoDto: UpdateTurnoDto) {
    return this.turnosService.update(+id, updateTurnoDto);
  }

  @Auth(RolesEnum.Administrador)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.turnosService.remove(+id);
  }
}
