import { Controller, Get, Param, Delete, Query } from '@nestjs/common';
import { MotivosService } from './motivos.service';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { RolesEnum } from 'src/auth/enum/roles';
import { QueryDto } from './dto/query.dto';

@Controller('motivos')
export class MotivosController {
  constructor(private readonly motivosService: MotivosService) {}

  @Auth(RolesEnum.Administrador)
  @Get()
  findAll(@Query() query: QueryDto) {
    return this.motivosService.findAll(query);
  }

  @Auth(RolesEnum.Administrador)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.motivosService.findOne(+id);
  }

  @Auth(RolesEnum.Administrador)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.motivosService.remove(+id);
  }
}
