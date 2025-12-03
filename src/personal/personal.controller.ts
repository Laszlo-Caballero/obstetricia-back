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
import { PersonalService } from './personal.service';
import { CreatePersonalDto } from './dto/create-personal.dto';
import { UpdatePersonalDto } from './dto/update-personal.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { RolesEnum } from 'src/auth/enum/roles';
import { MotivoDto } from 'src/motivos/dto/motivo.dto';

@Controller('personal')
export class PersonalController {
  constructor(private readonly personalService: PersonalService) {}

  @Post()
  create(@Body() createPersonalDto: CreatePersonalDto) {
    return this.personalService.create(createPersonalDto);
  }

  @Get()
  findAll(
    @Query('limit') limit: number,
    @Query('page') page: number,
    @Query('search') search: string,
    @Query('tipoPersonalId') tipoPersonalId: number,
  ) {
    return this.personalService.findAll(limit, page, search, tipoPersonalId);
  }

  @Get('not-user')
  findAllNotUser() {
    return this.personalService.findAllNotUser();
  }

  @Get('obstetras')
  findObstetras() {
    return this.personalService.findObstetras();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.personalService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePersonalDto: UpdatePersonalDto,
  ) {
    return this.personalService.update(+id, updatePersonalDto);
  }

  @Auth(RolesEnum.Administrador)
  @Delete(':id')
  remove(@Param('id') id: string, @Body() motivoDto: MotivoDto) {
    return this.personalService.remove(+id, motivoDto);
  }
}
