import {
  Controller,
  Get,
  Post,
  Param,
  UseInterceptors,
  UploadedFile,
  Body,
} from '@nestjs/common';
import { RecursoService } from './recurso.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('recurso')
export class RecursoController {
  constructor(private readonly recursoService: RecursoService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  create(@UploadedFile() file: Express.Multer.File, @Body() body: any) {
    return this.recursoService.create(file, body.destination as string);
  }
  @Post('one')
  @UseInterceptors(FileInterceptor('file'))
  createOne(@UploadedFile() file: Express.Multer.File, @Body() body: any) {
    return this.recursoService.createOne(file, body.destination as string);
  }

  @Get()
  findAll() {
    return this.recursoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.recursoService.findOne(+id);
  }
}
