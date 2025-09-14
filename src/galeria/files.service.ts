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

  private parsePath(dir: string) {
    return dir.split(',').join('/');
  }

  async allFiles(dir: string) {
    const parsedDir = this.parsePath(dir);

    const decodedDir = decodeURIComponent(parsedDir);

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
    const parsedDir = this.parsePath(dir);
    const decodedDir = decodeURIComponent(parsedDir);

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
    const preDir = this.parsePath(dir);
    // const parseDir = preDir.replace('_', ' ');
    const decodedDir = decodeURIComponent(preDir);
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
    const parsedDir = this.parsePath(dir);
    const decodedDir = decodeURIComponent(parsedDir);

    const path = join(this.path, decodedDir, name);

    try {
      await mkdir(path);

      const { data } = await this.allFiles(dir);

      return {
        message: 'Folder created',
        status: 201,
        data,
      };
    } catch {
      throw new BadRequestException('Directory as already exist');
    }
  }

  async uploadFiles(dir: string, files: Express.Multer.File[]) {
    const parsedDir = this.parsePath(dir);
    const decodedDir = decodeURIComponent(parsedDir);

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
      const { data } = await this.allFiles(dir);
      return {
        message: 'Files uploaded',
        status: 201,
        data,
      };
    } catch {
      throw new BadRequestException('Directory not found');
    }
  }

  async removeFiles(dir: string, file: DeleteFilesDto) {
    const parsedDir = this.parsePath(dir);
    const decodedDir = decodeURIComponent(parsedDir);

    const path = join(this.path, decodedDir);

    const isExist = existsSync(path);

    if (!isExist) {
      throw new BadRequestException('Directory not found');
    }

    try {
      if (file.name.includes('.')) {
        const filepath = join(path, decodeURIComponent(file.name));
        await unlink(filepath);

        const { data } = await this.allFiles(dir);
        return {
          message: 'File removed',
          status: 200,
          data,
        };
      }

      const filepath = join(path, decodeURIComponent(file.name));
      await rm(filepath, {
        recursive: true,
        force: true,
      });

      const { data } = await this.allFiles(dir);
      return {
        message: 'Folder removed',
        status: 200,
        data,
      };
    } catch {
      throw new BadRequestException('File not found');
    }
  }

  async renameFile(dir: string, file: RenameFileDto) {
    const parsedDir = this.parsePath(dir);
    const decodedDir = decodeURIComponent(parsedDir);
    const path = join(this.path, decodedDir);

    const isExist = existsSync(path);
    if (!isExist) {
      throw new BadRequestException('File not exist');
    }

    try {
      const oldPath = join(path, file.name);
      const newPath = join(path, file.newName);

      await rename(oldPath, newPath);

      const { data } = await this.allFiles(dir);

      return {
        message: 'File renamed',
        status: 200,
        data,
      };
    } catch {
      throw new BadRequestException('File not found');
    }
  }

  async moveFile(dir: string, file: MoveFileDto) {
    const parsedDir = this.parsePath(dir);
    const decodedDir = decodeURIComponent(parsedDir);
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

      const { data } = await this.allFiles(dir);
      return {
        message: 'File moved',
        status: 200,
        data,
      };
    } catch {
      throw new BadRequestException('File not found');
    }
  }
}
