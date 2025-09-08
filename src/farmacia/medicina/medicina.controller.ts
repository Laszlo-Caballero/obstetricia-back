import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MedicinaService } from './medicina.service';
import { CreateMedicinaDto } from './dto/create-medicina.dto';
import { UpdateMedicinaDto } from './dto/update-medicina.dto';

@Controller('medicina')
export class MedicinaController {
  constructor(private readonly medicinaService: MedicinaService) {}

  @Post()
  create(@Body() createMedicinaDto: CreateMedicinaDto) {
    return this.medicinaService.create(createMedicinaDto);
  }

  @Get()
  findAll() {
    return this.medicinaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.medicinaService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMedicinaDto: UpdateMedicinaDto) {
    return this.medicinaService.update(+id, updateMedicinaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.medicinaService.remove(+id);
  }
}
