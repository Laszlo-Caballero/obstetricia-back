import {
  Controller,
  Get,
  Post,
  Param,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { RecursoService } from './recurso.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { join } from 'path';

@Controller('recurso')
export class RecursoController {
  constructor(private readonly recursoService: RecursoService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: join(__dirname, '../../public'),
        filename: (req, file, cb) => {
          const fix = Date.now();
          const [fileName, ext] = file.originalname.split('.');
          const name = `${fileName}-${fix}.${ext}`;
          cb(null, name);
        },
      }),
    }),
  )
  create(@UploadedFile() file: Express.Multer.File) {
    return this.recursoService.create(file);
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
