import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  Query,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { PostaService } from './posta.service';
import { CreatePostaDto } from './dto/create-posta.dto';
import { UpdatePostaDto } from './dto/update-posta.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { FindByDistanceDto } from './dto/findByDistance.dto';
// import { Auth } from 'src/auth/decorators/auth.decorator';
// import { RolesEnum } from 'src/auth/enum/roles';

@Controller('posta')
export class PostaController {
  constructor(private readonly postaService: PostaService) {}

  // @Auth(RolesEnum.Administrador)
  @Post()
  create(@Body() createPostaDto: CreatePostaDto) {
    return this.postaService.create(createPostaDto);
  }

  @Post('import-excel')
  @UseInterceptors(FileInterceptor('file'))
  importExcel(@UploadedFile() file: Express.Multer.File) {
    return this.postaService.importExcel(file);
  }

  @Get()
  findAll(
    @Query('limit') limit?: number,
    @Query('page') page?: number,
    @Query('regionId') regionId?: number,
    @Query('status') status?: boolean,
    @Query('search') search?: string,
  ) {
    return this.postaService.findAll(limit, page, regionId, status, search);
  }

  // @Auth(RolesEnum.Administrador)
  @Get('export')
  async exportData(@Res() res) {
    const { buffer, fileName } = await this.postaService.exportData();
    res.header('Content-Disposition', `attachment; filename=${fileName}.xlsx`);
    res.type(
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    );
    res.send(buffer);
  }

  @Post('find-by-distance')
  findByDistance(@Body() body: FindByDistanceDto) {
    return this.postaService.findByDistance(body);
  }

  @Get('search/:input')
  searchPostas(@Param('input') input: string) {
    return this.postaService.searchPostas(input);
  }

  // @Auth(RolesEnum.Administrador)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postaService.findOne(+id);
  }

  // @Auth(RolesEnum.Administrador)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePostaDto: UpdatePostaDto) {
    return this.postaService.update(+id, updatePostaDto);
  }

  // @Auth(RolesEnum.Administrador)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postaService.remove(+id);
  }
}
