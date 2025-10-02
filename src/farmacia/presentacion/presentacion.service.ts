import { HttpException, Injectable } from '@nestjs/common';
import { CreatePresentacionDto } from './dto/create-presentacion.dto';
import { UpdatePresentacionDto } from './dto/update-presentacion.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Presentacion } from './entities/presentacion.entity';
import { Like, Repository } from 'typeorm';
import { RedisService } from 'src/redis/redis.service';
import { Workbook } from 'exceljs';

@Injectable()
export class PresentacionService {
  private readonly presentacionkey: 'presentacion';
  constructor(
    @InjectRepository(Presentacion)
    private readonly presentacionRepository: Repository<Presentacion>,

    private readonly redisService: RedisService,
  ) {}

  async create(createPresentacionDto: CreatePresentacionDto) {
    const presentacion = this.presentacionRepository.create(
      createPresentacionDto,
    );

    await this.presentacionRepository.insert(presentacion);

    const [findAllPresentacion, count] =
      await this.presentacionRepository.findAndCount();
    await this.redisService.set('presentaciones', findAllPresentacion);

    return {
      status: 200,
      message: 'Appearance created succesfully',
      data: findAllPresentacion.slice(0, 10),
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
    const [dbPresentacion, totalItems] =
      await this.presentacionRepository.findAndCount({
        take: limit,
        skip: (page - 1) * limit,
        where: {
          ...(status != undefined && { estado: status }),
          ...(search && { nombre: Like(`%${search}%`) }),
        },
      });

    return {
      status: 200,
      message: 'Appearance retrieved successfully from database',
      data: dbPresentacion,
      metadata: {
        totalItems,
        totalPages: Math.ceil(totalItems / limit),
        currentPage: page,
      },
    };
  }

  async rawPresentaciones() {
    const cachePresentacion =
      await this.redisService.get<Presentacion[]>('presentaciones');

    if (cachePresentacion) {
      return {
        status: 200,
        message: 'Appearance retrieved succesfully from cache',
        data: cachePresentacion,
      };
    }

    const dbPresentacion = await this.presentacionRepository.find();
    await this.redisService.set('presentaciones', dbPresentacion);

    return {
      satus: 200,
      message: 'Appearance retrieved successfully from database',
      data: dbPresentacion,
    };
  }

  async findOne(id: number) {
    const findPresentacion = await this.presentacionRepository.findOneBy({
      presentacionId: id,
    });

    if (!findPresentacion) {
      throw new HttpException('Appearance not found', 404);
    }

    return {
      status: 200,
      message: 'Appearance retrieved successfully',
      data: findPresentacion,
    };
  }

  async update(id: number, updatePresentacionDto: UpdatePresentacionDto) {
    const findPresentacion = await this.presentacionRepository.findOneBy({
      presentacionId: id,
    });

    if (!findPresentacion) {
      throw new HttpException('Appearance not found', 404);
    }

    await this.presentacionRepository.update(id, updatePresentacionDto);

    const findAllPresentacion = await this.presentacionRepository.find();

    await this.redisService.set('presentaciones', findAllPresentacion);

    return {
      status: 200,
      message: 'Appearance updated succesfully',
      data: null,
    };
  }

  async remove(id: number) {
    const findPresentacion = await this.presentacionRepository.findOneBy({
      presentacionId: id,
    });

    if (!findPresentacion) {
      throw new HttpException('Appearance not found', 404);
    }

    await this.presentacionRepository.update(id, { estado: false });

    const findAllPresentacion = await this.presentacionRepository.find();

    await this.redisService.set('presentaciones', findAllPresentacion);

    return {
      status: 200,
      message: 'Appearance removed successfully',
      data: null,
    };
  }

  async exportData() {
    const today = new Date();

    const day = today.getDate().toString().padStart(2, '0');
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    const year = today.getFullYear().toString();

    const fileName = `Presentacion-${day}-${month}-${year}`;

    const workbook = new Workbook();
    const worksheet = workbook.addWorksheet(fileName);
    worksheet.columns = [
      {
        header: 'ID',
        key: 'presentacionId',
      },
      {
        header: 'Nombre Presentacion',
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

    const allPresentaciones = await this.presentacionRepository.find();

    allPresentaciones.map((presentacion) => {
      return worksheet.addRow({
        presentacionId: presentacion.presentacionId,
        nombre: presentacion.nombre,
        estado: presentacion.estado,
      });
    });
    const buffer = await workbook.xlsx.writeBuffer();
    return { buffer, fileName };
  }
}
