import { Controller, Get, Param, Query } from '@nestjs/common';
import { RecetaService } from './receta.service';
import { QueryRecetaDto } from './dto/query.dto';

@Controller('receta')
export class RecetaController {
  constructor(private readonly recetaService: RecetaService) {}

  @Get()
  findAll(@Query() query: QueryRecetaDto) {
    return this.recetaService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.recetaService.findOne(+id);
  }
}
