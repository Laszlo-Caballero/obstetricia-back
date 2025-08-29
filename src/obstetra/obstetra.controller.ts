import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ObstetraService } from './obstetra.service';
import { CreateObstetraDto } from './dto/create-obstetra.dto';
import { UpdateObstetraDto } from './dto/update-obstetra.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { RolesEnum } from 'src/auth/enum/roles';

@Controller('obstetra')
export class ObstetraController {
  constructor(private readonly obstetraService: ObstetraService) {}

  @Auth(RolesEnum.Administrador)
  @Post()
  create(@Body() createObstetraDto: CreateObstetraDto) {
    return this.obstetraService.create(createObstetraDto);
  }

  @Auth(RolesEnum.Administrador)
  @Get()
  findAll() {
    return this.obstetraService.findAll();
  }

  @Auth()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.obstetraService.findOne(+id);
  }

  @Auth(RolesEnum.Administrador)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateObstetraDto: UpdateObstetraDto,
  ) {
    return this.obstetraService.update(+id, updateObstetraDto);
  }

  @Auth(RolesEnum.Administrador)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.obstetraService.remove(+id);
  }
}
