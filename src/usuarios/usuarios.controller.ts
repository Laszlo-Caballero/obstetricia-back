import { Controller, Get, Param, Delete, Query } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { RolesEnum } from 'src/auth/enum/roles';
import { QueryDto } from './dto/query.dto';

@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  @Auth(RolesEnum.Administrador)
  @Get()
  findAll(@Query() query: QueryDto) {
    return this.usuariosService.findAll(query);
  }

  @Auth(RolesEnum.Administrador)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usuariosService.findOne(+id);
  }

  @Auth(RolesEnum.Administrador)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usuariosService.remove(+id);
  }
}
