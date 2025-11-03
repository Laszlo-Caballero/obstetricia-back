import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Req,
} from '@nestjs/common';
import { ProgramaService } from './programa.service';
import { CreateProgramaDto } from './dto/create-programa.dto';
import { UpdateProgramaDto } from './dto/update-programa.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { RolesEnum } from 'src/auth/enum/roles';
import { QueryDto } from './dto/query.dto';
import { RequestUser } from 'src/auth/interface/type';

@Controller('programa')
export class ProgramaController {
  constructor(private readonly programaService: ProgramaService) {}
  @Auth(RolesEnum.Supervisor)
  @Post()
  create(
    @Body() createProgramaDto: CreateProgramaDto,
    @Req() { user }: RequestUser,
  ) {
    return this.programaService.create(createProgramaDto, user);
  }

  @Auth()
  @Get()
  findAll(@Query() query: QueryDto, @Req() { user }: RequestUser) {
    return this.programaService.findAll(query, user);
  }

  @Auth()
  @Get(':id')
  findOne(@Param('id') id: string, @Req() { user }: RequestUser) {
    return this.programaService.findOne(+id, user);
  }
  @Auth(RolesEnum.Supervisor)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateProgramaDto: UpdateProgramaDto,
    @Req() { user }: RequestUser,
  ) {
    return this.programaService.update(+id, updateProgramaDto, user);
  }

  @Auth(RolesEnum.Supervisor)
  @Delete(':id')
  remove(@Param('id') id: string, @Req() { user }: RequestUser) {
    return this.programaService.remove(+id, user);
  }
}
