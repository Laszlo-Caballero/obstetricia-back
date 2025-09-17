import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseInterceptors,
  UploadedFile,
  Req,
  Query,
  Res,
} from '@nestjs/common';
import { DocumentacionService } from './documentacion.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { RolesEnum } from 'src/auth/enum/roles';
import { RequestUser } from 'src/auth/interface/type';
import { diskStorage } from 'multer';
import { join } from 'path';
import { Response } from 'express';

@Controller('documentacion')
export class DocumentacionController {
  constructor(private readonly documentacionService: DocumentacionService) {}

  @Auth(RolesEnum.Administrador)
  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: join(__dirname, '../../public', 'documentacion'),
        filename: (req, file, cb) => {
          const fix = Date.now();
          const [fileName, ext] = file.originalname.split('.');
          const name = `${fileName}-${fix}.${ext}`;
          cb(null, name);
        },
      }),
    }),
  )
  create(
    @Body('type') type: string,
    @UploadedFile() file: Express.Multer.File,
    @Req() req: RequestUser,
  ) {
    return this.documentacionService.create(type, file, req);
  }

  @Auth(RolesEnum.Administrador)
  @Get()
  findAll(@Query('order') order: 'ASC' | 'DESC' = 'DESC') {
    return this.documentacionService.findAll(order);
  }

  @Auth(RolesEnum.Administrador)
  @Get('find/:version')
  findOne(@Param('version') version: string) {
    return this.documentacionService.findOne(version);
  }

  @Auth()
  @Get('last')
  findLast() {
    return this.documentacionService.findLast();
  }

  @Auth()
  @Get('download-last')
  async downloadLast(@Res() res: Response) {
    const { fileStream, version } =
      await this.documentacionService.donwloadLast();

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader(
      'Content-Disposition',
      `attachment; filename=documentacion-v${version}.pdf`,
    );

    fileStream.pipe(res);
  }
}
