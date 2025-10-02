import { HttpException, Injectable } from '@nestjs/common';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Categoria } from './entities/categoria.entity';
import { Like, Repository } from 'typeorm';
import { RedisService } from 'src/redis/redis.service';
import { Workbook } from 'exceljs';

@Injectable()
export class CategoriaService {
  private readonly categoriakey: 'categoria';
  constructor(
    @InjectRepository(Categoria)
    private readonly categoriaRepository: Repository<Categoria>,

    private readonly redisService: RedisService,
  ) {}

  async create(createCategoriaDto: CreateCategoriaDto) {
    const categoria = this.categoriaRepository.create(createCategoriaDto);

    await this.categoriaRepository.insert(categoria);

    const [findAllCategoria, count] =
      await this.categoriaRepository.findAndCount();

    await this.redisService.set('categorias', findAllCategoria);

    return {
      status: 200,
      message: 'Category created succesfully',
      data: findAllCategoria.slice(0, 10),
      metadata: {
        totalItems: count,
        totalPages: Math.ceil(count / 10),
        currentPage: 1,
      },
    };
  }

  async findAll(
    limit: number = 10,
    page: number = 1,
    status?: boolean,
    search?: string,
  ) {
    const [dbCategoria, totalItems] =
      await this.categoriaRepository.findAndCount({
        take: limit,
        skip: (page - 1) * limit,
        where: {
          ...(status != undefined && { estado: status }),
          ...(search && { nombre: Like(`%${search}%`) }),
        },
      });

    return {
      status: 200,
      message: 'Categoria retrieved successfully from database',
      data: dbCategoria,
      metadata: {
        totalItems,
        totalPages: Math.ceil(totalItems / limit),
        currentPage: page,
      },
    };
  }

  async rawCategorias() {
    const cacheCategoria =
      await this.redisService.get<Categoria[]>('categorias');

    if (cacheCategoria) {
      return {
        status: 200,
        message: 'Category retrieved succesfully from cache',
        data: cacheCategoria,
      };
    }

    const dbCategoria = await this.categoriaRepository.find();
    await this.redisService.set('categorias', dbCategoria);

    return {
      satus: 200,
      message: 'Category retrieved successfully from database',
      data: dbCategoria,
    };
  }

  async findOne(id: number) {
    const findCategoria = await this.categoriaRepository.findOneBy({
      categoriaId: id,
    });

    if (!findCategoria) {
      throw new HttpException('Category not found', 404);
    }

    return {
      status: 200,
      message: 'Category retrieved successfully',
      data: findCategoria,
    };
  }

  async update(id: number, updateCategoriaDto: UpdateCategoriaDto) {
    const findCategoria = await this.categoriaRepository.findOneBy({
      categoriaId: id,
    });

    if (!findCategoria) {
      throw new HttpException('Category not found', 404);
    }

    await this.categoriaRepository.update(id, updateCategoriaDto);

    const findAllCategoria = await this.categoriaRepository.find();

    await this.redisService.set('categorias', findAllCategoria);

    return {
      status: 200,
      message: 'Category updated succesfully',
      data: null,
    };
  }

  async remove(id: number) {
    const findCategoria = await this.categoriaRepository.findOneBy({
      categoriaId: id,
    });

    if (!findCategoria) {
      throw new HttpException('Category not found', 404);
    }

    await this.categoriaRepository.update(id, { estado: false });

    const findAllCategoria = await this.categoriaRepository.find();

    await this.redisService.set('categorias', findAllCategoria);

    return {
      status: 200,
      message: 'Category removed successfully',
      data: null,
    };
  }

  async exportData() {
    const today = new Date();

    const day = today.getDate().toString().padStart(2, '0');
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    const year = today.getFullYear().toString();

    const fileName = `Categoria-${day}-${month}-${year}`;

    const workbook = new Workbook();
    const worksheet = workbook.addWorksheet(fileName);
    worksheet.columns = [
      {
        header: 'ID',
        key: 'categoriaId',
      },
      {
        header: 'Nombre Categoria',
        key: 'nombre',
        width: 30,
      },
      {
        header: 'Estado',
        key: 'estado',
        width: 30,
      },
    ];

    const headerRow = worksheet.getRow(1);
    headerRow.eachCell((cell) => {
      cell.font = { bold: true, color: { argb: 'FFFFFFFF' }, size: 12 };
      cell.alignment = { vertical: 'middle', horizontal: 'center' };
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: '4472C4' },
      };
      cell.border = {
        bottom: { style: 'thin', color: { argb: 'FF000000' } },
      };
    });

    const allCategorias = await this.categoriaRepository.find();

    allCategorias.map((categoria) => {
      return worksheet.addRow({
        categoriaId: categoria.categoriaId,
        nombre: categoria.nombre,
        estado: categoria.estado,
      });
    });
    const buffer = await workbook.xlsx.writeBuffer();
    return { buffer, fileName };
  }
}
