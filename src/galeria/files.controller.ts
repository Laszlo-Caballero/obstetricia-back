import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  Res,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FilesService } from './files.service';
import { CreateFolderDto } from './dto/createFolder.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { DeleteFilesDto } from './dto/deleteFiles.dto';
import { Response } from 'express';
import { RenameFileDto } from './dto/renameFile.dto';
import { MoveFileDto } from './dto/file.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { RolesEnum } from 'src/auth/enum/roles';
import { RequestUser } from 'src/auth/interface/type';

@Controller('files')
export class FilesController {
  constructor(private filesServices: FilesService) {}

  @Auth()
  @Get('carpets')
  allFilesRoot() {
    return this.filesServices.allFiles('');
  }

  @Auth()
  @Get('carpets/*path')
  allFiles(@Param('path') path: string) {
    return this.filesServices.allFiles(path);
  }

  @Auth()
  @Get('folder')
  allFoldersRoot(@Req() req: RequestUser) {
    return this.filesServices.allFolders('', req);
  }

  @Auth()
  @Get('folder/*path')
  allFolders(@Param('path') path: string, @Req() req: RequestUser) {
    return this.filesServices.allFolders(path, req);
  }

  @Auth(RolesEnum.Administrador)
  @Post('folder')
  createFolderRoot(@Body() name: CreateFolderDto) {
    return this.filesServices.createFolder('', name);
  }

  @Auth(RolesEnum.Administrador)
  @Post('folder/*path')
  createFolder(@Param('path') path: string, @Body() name: CreateFolderDto) {
    return this.filesServices.createFolder(path, name);
  }

  @Auth()
  @Post('upload')
  @UseInterceptors(FilesInterceptor('files', 1000))
  uploadFilesRoot(@UploadedFiles() files: Express.Multer.File[]) {
    return this.filesServices.uploadFiles('', files);
  }

  @Auth()
  @Post('upload/*path')
  @UseInterceptors(FilesInterceptor('files', 1000))
  uploadFiles(
    @Param('path') path: string,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    return this.filesServices.uploadFiles(path, files);
  }

  @Auth()
  @Delete('remove')
  removeFilesRoot(@Body() files: DeleteFilesDto) {
    return this.filesServices.removeFiles('', files);
  }

  @Auth()
  @Delete('remove/*path')
  removeFiles(@Param('path') path: string, @Body() files: DeleteFilesDto) {
    return this.filesServices.removeFiles(path, files);
  }

  @Auth()
  @Get('download/:file')
  downloadFileRoot(@Param('file') file: string, @Res() res: Response) {
    const filePath = this.filesServices.getFilePath(file);
    res.sendFile(filePath);
  }

  @Auth()
  @Get('download/*path')
  downloadFile(@Param('path') path: string, @Res() res: Response) {
    const filePath = this.filesServices.getFilePath(path);
    res.sendFile(filePath);
  }

  @Auth()
  @Put('rename')
  async renameFileRoot(@Body() files: RenameFileDto) {
    return this.filesServices.renameFile('', files);
  }

  @Auth()
  @Put('rename/*path')
  async renameFile(@Param('path') path: string, @Body() files: RenameFileDto) {
    return this.filesServices.renameFile(path, files);
  }

  @Auth()
  @Put('move')
  async moveFileRoot(@Body() file: MoveFileDto) {
    return this.filesServices.moveFile('', file);
  }

  @Auth()
  @Put('move/*path')
  async moveFile(@Param('path') path: string, @Body() file: MoveFileDto) {
    return this.filesServices.moveFile(path, file);
  }
}
