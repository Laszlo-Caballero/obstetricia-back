import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  readdir,
  mkdir,
  writeFile,
  unlink,
  rm,
  rename,
} from 'node:fs/promises';
import { join } from 'node:path';
import { existsSync } from 'fs';
import { DeleteFilesDto } from './dto/deleteFiles.dto';
import { accessSync } from 'node:fs';
import { RenameFileDto } from './dto/renameFile.dto';
import { MoveFileDto } from './dto/file.dto';

@Injectable()
export class FilesService {
  private path = join(__dirname, '../../public');

  private orderFiles(files: string[]) {
    const contentFiles = files
      .filter((value) => {
        if (value.includes('.')) return value;
      })
      .sort()
      .reverse();

    const folders = files
      .filter((value) => {
        if (!value.includes('.')) return value;
      })
      .sort()
      .reverse();

    return {
      folders,
      files: contentFiles,
    };
  }

  async allFiles(dir: string) {
    const decodedDir = decodeURIComponent(dir);

    const path = join(this.path, decodedDir);

    try {
      const files = await readdir(path);

      const orderFiles = this.orderFiles(files);

      return {
        message: 'Files found',
        status: 200,
        data: orderFiles,
      };
    } catch {
      throw new BadRequestException('Directory not found');
    }
  }

  async allFolders(dir: string) {
    const decodedDir = decodeURIComponent(dir);

    const path = join(this.path, decodedDir);

    try {
      const files = await readdir(path);
      const orderFiles = this.orderFiles(files);

      return {
        message: 'Folders found',
        status: 200,
        data: orderFiles.folders,
      };
    } catch {
      throw new BadRequestException('Directory not found');
    }
  }

  getFilePath(dir: string) {
    const parseDir = dir.replace('_', ' ');
    const decodedDir = decodeURIComponent(parseDir);
    const path = join(this.path, decodedDir);

    try {
      // Verifica si el archivo existe
      accessSync(path);
      return path;
    } catch (error) {
      if (error.code === 'ENOENT') {
        throw new NotFoundException('File not found');
      }
      throw new BadRequestException('Failed to get file path');
    }
  }

  async createFolder(dir: string, name: string) {
    const decodedDir = decodeURIComponent(dir);

    const path = join(this.path, decodedDir, name);

    try {
      await mkdir(path);
      return {
        message: 'Folder created',
        status: 201,
      };
    } catch {
      throw new BadRequestException('Directory as already exist');
    }
  }

  async uploadFiles(dir: string, files: Express.Multer.File[]) {
    const decodedDir = decodeURIComponent(dir);

    const path = join(this.path, decodedDir);

    const isExist = existsSync(path);

    if (!isExist) {
      throw new BadRequestException('Directory not found');
    }

    try {
      for (const file of files) {
        const filePath = join(path, file.originalname);
        await writeFile(filePath, file.buffer);
      }
      return {
        message: 'Files uploaded',
        status: 201,
      };
    } catch {
      throw new BadRequestException('Directory not found');
    }
  }

  async removeFiles(dir: string, file: DeleteFilesDto) {
    const decodedDir = decodeURIComponent(dir);

    const path = join(this.path, decodedDir);

    const isExist = existsSync(path);

    if (!isExist) {
      throw new BadRequestException('Directory not found');
    }

    try {
      if (file.name.includes('.')) {
        const filepath = join(path, decodeURIComponent(file.name));
        await unlink(filepath);
        return {
          message: 'File removed',
          statusCode: 200,
        };
      }

      const filepath = join(path, decodeURIComponent(file.name));
      await rm(filepath, {
        recursive: true,
        force: true,
      });

      return {
        message: 'Folder removed',
        status: 200,
      };
    } catch {
      throw new BadRequestException('File not found');
    }
  }

  async renameFile(dir: string, file: RenameFileDto) {
    const decodedDir = decodeURIComponent(dir);
    const path = join(this.path, decodedDir);

    const isExist = existsSync(path);
    if (!isExist) {
      throw new BadRequestException('File not exist');
    }

    try {
      const oldPath = join(path, file.name);
      const newPath = join(path, file.newName);

      await rename(oldPath, newPath);

      return {
        message: 'File renamed',
        statusCode: 200,
      };
    } catch {
      throw new BadRequestException('File not found');
    }
  }

  async moveFile(dir: string, file: MoveFileDto) {
    const decodedDir = decodeURIComponent(dir);
    const path = join(this.path, decodedDir);

    const isExist = existsSync(path);

    if (!isExist) {
      throw new BadRequestException('Directory not found');
    }

    const toPath = join(this.path, decodedDir, file.folder);
    const isExistFolder = existsSync(toPath);

    if (!isExistFolder) {
      throw new BadRequestException('Folder not found');
    }

    try {
      const oldPath = join(path, file.name);
      const newPath = join(path, file.folder, file.name);

      await rename(oldPath, newPath);

      return {
        message: 'File moved',
        status: 200,
      };
    } catch {
      throw new BadRequestException('File not found');
    }
  }
}
