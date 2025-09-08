import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RecetaMedicinaService } from './receta-medicina.service';
import { CreateRecetaMedicinaDto } from './dto/create-receta-medicina.dto';
import { UpdateRecetaMedicinaDto } from './dto/update-receta-medicina.dto';

@Controller('receta-medicina')
export class RecetaMedicinaController {
  constructor(private readonly recetaMedicinaService: RecetaMedicinaService) {}

  @Post()
  create(@Body() createRecetaMedicinaDto: CreateRecetaMedicinaDto) {
    return this.recetaMedicinaService.create(createRecetaMedicinaDto);
  }

  @Get()
  findAll() {
    return this.recetaMedicinaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.recetaMedicinaService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRecetaMedicinaDto: UpdateRecetaMedicinaDto) {
    return this.recetaMedicinaService.update(+id, updateRecetaMedicinaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.recetaMedicinaService.remove(+id);
  }
}
