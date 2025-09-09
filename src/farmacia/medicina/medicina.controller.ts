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
import { MedicinaService } from './medicina.service';
import { CreateMedicinaDto } from './dto/create-medicina.dto';
import { UpdateMedicinaDto } from './dto/update-medicina.dto';

@Controller('farmacia/medicina')
export class MedicinaController {
  constructor(private readonly medicinaService: MedicinaService) {}

  @Post()
  create(@Body() createMedicinaDto: CreateMedicinaDto) {
    return this.medicinaService.create(createMedicinaDto);
  }

  @Get()
  findAll(
    @Query('limit') limit?: number,
    @Query('page') page?: number,
    @Query('categoriaId') categoriaId?: number,
    @Query('presentacionId') presentacionId?: number,
    @Query('status') status?: boolean,
    @Query('search') search?: string,
  ) {
    return this.medicinaService.findAll(
      limit,
      page,
      categoriaId,
      presentacionId,
      status,
      search,
    );
  }

  @Get('export')
  async exportData(@Res() res) {
    const { buffer, fileName } = await this.medicinaService.exportData();
    res.header('Content-Disposition', `attachment; filename=${fileName}.xlsx`);
    res.type(
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    );
    res.send(buffer);
  }

  @Get('search/:input')
  searchMedicina(@Param('input') input: string) {
    return this.medicinaService.searchMedicina(input);
  }

  @Get('raw-medicinas')
  getRawMedicinas() {
    return this.medicinaService.rawMedicinas();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.medicinaService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateMedicinaDto: UpdateMedicinaDto,
  ) {
    return this.medicinaService.update(+id, updateMedicinaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.medicinaService.remove(+id);
  }
}
