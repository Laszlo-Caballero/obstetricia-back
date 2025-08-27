import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ObstetraService } from './obstetra.service';
import { CreateObstetraDto } from './dto/create-obstetra.dto';
import { UpdateObstetraDto } from './dto/update-obstetra.dto';

@Controller('obstetra')
export class ObstetraController {
  constructor(private readonly obstetraService: ObstetraService) {}

  @Post()
  create(@Body() createObstetraDto: CreateObstetraDto) {
    return this.obstetraService.create(createObstetraDto);
  }

  @Get()
  findAll() {
    return this.obstetraService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.obstetraService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateObstetraDto: UpdateObstetraDto) {
    return this.obstetraService.update(+id, updateObstetraDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.obstetraService.remove(+id);
  }
}
