import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
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

@Controller('files')
export class FilesController {
  constructor(private filesServices: FilesService) {}

  @Get('carpets')
  allFilesRoot() {
    return this.filesServices.allFiles('');
  }

  @Get('carpets/*path')
  allFiles(@Param('path') path: string) {
    return this.filesServices.allFiles(path);
  }

  @Get('folder')
  allFoldersRoot() {
    return this.filesServices.allFolders('');
  }

  @Get('folder/*path')
  allFolders(@Param('path') path: string) {
    return this.filesServices.allFolders(path);
  }

  @Post('folder')
  createFolderRoot(@Body() name: CreateFolderDto) {
    return this.filesServices.createFolder('', name.name);
  }

  @Post('folder/*path')
  createFolder(@Param('path') path: string, @Body() name: CreateFolderDto) {
    return this.filesServices.createFolder(path, name.name);
  }

  @Post('upload')
  @UseInterceptors(FilesInterceptor('files', 1000))
  uploadFilesRoot(@UploadedFiles() files: Express.Multer.File[]) {
    return this.filesServices.uploadFiles('', files);
  }

  @Post('upload/*path')
  @UseInterceptors(FilesInterceptor('files', 1000))
  uploadFiles(
    @Param('path') path: string,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    return this.filesServices.uploadFiles(path, files);
  }

  @Delete('remove')
  removeFilesRoot(@Body() files: DeleteFilesDto) {
    return this.filesServices.removeFiles('', files);
  }

  @Delete('remove/*path')
  removeFiles(@Param('path') path: string, @Body() files: DeleteFilesDto) {
    return this.filesServices.removeFiles(path, files);
  }

  @Get('download')
  downloadFileRoot(@Res() res: Response) {
    const filePath = this.filesServices.getFilePath('');
    res.sendFile(filePath);
  }

  @Get('download/*path')
  downloadFile(@Param('path') path: string, @Res() res: Response) {
    const filePath = this.filesServices.getFilePath(path);
    res.sendFile(filePath);
  }

  @Put('rename')
  async renameFileRoot(@Body() files: RenameFileDto) {
    return this.filesServices.renameFile('', files);
  }

  @Put('rename/*path')
  async renameFile(@Param('path') path: string, @Body() files: RenameFileDto) {
    return this.filesServices.renameFile(path, files);
  }

  @Put('move')
  async moveFileRoot(@Body() file: MoveFileDto) {
    return this.filesServices.moveFile('', file);
  }

  @Put('move/*path')
  async moveFile(@Param('path') path: string, @Body() file: MoveFileDto) {
    return this.filesServices.moveFile(path, file);
  }
}
