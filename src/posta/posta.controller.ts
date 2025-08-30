import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
} from '@nestjs/common';
import { PostaService } from './posta.service';
import { CreatePostaDto } from './dto/create-posta.dto';
import { UpdatePostaDto } from './dto/update-posta.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { RolesEnum } from 'src/auth/enum/roles';

@Controller('posta')
export class PostaController {
  constructor(private readonly postaService: PostaService) {}

  @Auth(RolesEnum.Administrador)
  @Post()
  create(@Body() createPostaDto: CreatePostaDto) {
    return this.postaService.create(createPostaDto);
  }

  @Get()
  findAll() {
    return this.postaService.findAll();
  }

  @Auth(RolesEnum.Administrador)
  @Get('export')
  async exportData(@Res() res) {
    const { buffer, fileName } = await this.postaService.exportData();
    res.header('Content-Disposition', `attachment; filename=${fileName}.xlsx`);
    res.type(
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    );
    res.send(buffer);
  }

  @Auth(RolesEnum.Administrador)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postaService.findOne(+id);
  }

  @Auth(RolesEnum.Administrador)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePostaDto: UpdatePostaDto) {
    return this.postaService.update(+id, updatePostaDto);
  }

  @Auth(RolesEnum.Administrador)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postaService.remove(+id);
  }
}
