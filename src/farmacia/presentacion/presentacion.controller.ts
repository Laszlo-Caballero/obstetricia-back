import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Res,
} from '@nestjs/common';
import { PresentacionService } from './presentacion.service';
import { CreatePresentacionDto } from './dto/create-presentacion.dto';
import { UpdatePresentacionDto } from './dto/update-presentacion.dto';

@Controller('farmacia/presentacion')
export class PresentacionController {
  constructor(private readonly presentacionService: PresentacionService) {}

  @Post()
  create(@Body() createPresentacionDto: CreatePresentacionDto) {
    return this.presentacionService.create(createPresentacionDto);
  }

  @Get()
  findAll(
    @Query('limit') limit?: number,
    @Query('page') page?: number,
    @Query('status') status?: boolean,
    @Query('search') search?: string,
  ) {
    return this.presentacionService.findAll(limit, page, status, search);
  }

  @Get('export')
  async exportData(@Res() res) {
    const { buffer, fileName } = await this.presentacionService.exportData();
    res.header('Content-Disposition', `attachment; filename=${fileName}.xlsx`);
    res.type(
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    );
    res.send(buffer);
  }

  @Get('raw-presentaciones')
  getRawpresentaciones() {
    return this.presentacionService.rawPresentaciones();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.presentacionService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePresentacionDto: UpdatePresentacionDto,
  ) {
    return this.presentacionService.update(+id, updatePresentacionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.presentacionService.remove(+id);
  }
}
