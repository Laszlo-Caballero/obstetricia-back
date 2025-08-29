import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EnfermerasService } from './enfermeras.service';
import { CreateEnfermeraDto } from './dto/create-enfermera.dto';
import { UpdateEnfermeraDto } from './dto/update-enfermera.dto';

@Controller('enfermeras')
export class EnfermerasController {
  constructor(private readonly enfermerasService: EnfermerasService) {}

  @Post()
  create(@Body() createEnfermeraDto: CreateEnfermeraDto) {
    return this.enfermerasService.create(createEnfermeraDto);
  }

  @Get()
  findAll() {
    return this.enfermerasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.enfermerasService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEnfermeraDto: UpdateEnfermeraDto) {
    return this.enfermerasService.update(+id, updateEnfermeraDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.enfermerasService.remove(+id);
  }
}
