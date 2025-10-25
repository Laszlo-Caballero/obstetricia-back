import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TipoPersonalService } from './tipo-personal.service';
import { CreateTipoPersonalDto } from './dto/create-tipo-personal.dto';
import { UpdateTipoPersonalDto } from './dto/update-tipo-personal.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { RolesEnum } from 'src/auth/enum/roles';

@Controller('tipo-personal')
export class TipoPersonalController {
  constructor(private readonly tipoPersonalService: TipoPersonalService) {}

  @Auth(RolesEnum.Administrador)
  @Post()
  create(@Body() createTipoPersonalDto: CreateTipoPersonalDto) {
    return this.tipoPersonalService.create(createTipoPersonalDto);
  }

  @Auth(RolesEnum.Administrador)
  @Get()
  findAll() {
    return this.tipoPersonalService.findAll();
  }

  @Auth(RolesEnum.Administrador)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tipoPersonalService.findOne(+id);
  }

  @Auth(RolesEnum.Administrador)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTipoPersonalDto: UpdateTipoPersonalDto,
  ) {
    return this.tipoPersonalService.update(+id, updateTipoPersonalDto);
  }

  @Auth(RolesEnum.Administrador)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tipoPersonalService.remove(+id);
  }
}
