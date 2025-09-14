import { HttpException, Injectable } from '@nestjs/common';
import { CreatePostaDto } from './dto/create-posta.dto';
import { UpdatePostaDto } from './dto/update-posta.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Posta } from './entities/posta.entity';
import { Repository, Like } from 'typeorm';
import { Workbook } from 'exceljs';
import { Region } from './entities/region.entity';
import { Provincia } from './entities/provincia.entity';
import { Distrito } from './entities/distrito.entity';
import { PostaType } from './type/type';
import { parse } from 'date-fns';
import { FindByDistanceDto } from './dto/findByDistance.dto';

@Injectable()
export class PostaService {
  constructor(
    @InjectRepository(Posta)
    private readonly postaRepository: Repository<Posta>,
    @InjectRepository(Region)
    private readonly regionRepository: Repository<Region>,
    @InjectRepository(Provincia)
    private readonly provinciaRepository: Repository<Provincia>,
    @InjectRepository(Distrito)
    private readonly distritoRepository: Repository<Distrito>,
  ) {}

  async create(createPostaDto: CreatePostaDto) {
    const { regionId, provinciaId, distritoId, ...rest } = createPostaDto;

    const findRegion = await this.regionRepository.findOneBy({ regionId });

    if (!findRegion) {
      throw new HttpException('Region not found', 404);
    }

    const findProvincia = await this.provinciaRepository.findOneBy({
      provinciaId,
    });
    if (!findProvincia) {
      throw new HttpException('Provincia not found', 404);
    }

    const findDistrito = await this.distritoRepository.findOneBy({
      distritoId,
    });

    if (!findDistrito) {
      throw new HttpException('Distrito not found', 404);
    }

    const posta = this.postaRepository.create({
      ...rest,
      region: findRegion,
      provincia: findProvincia,
      distrito: findDistrito,
    });

    await this.postaRepository.insert(posta);

    return {
      status: 200,
      message: 'Post created successfully',
      data: posta,
    };
  }

  async importExcel(file: Express.Multer.File) {
    const workbook = new Workbook();

    if (!file?.buffer || file?.buffer?.length === 0) {
      throw new HttpException('File is empty', 400);
    }
    const buffer = Buffer.from(file.buffer);

    // @ts-expect-error: exceljs types do not recognize Buffer input for load method
    await workbook.xlsx.load(buffer);

    const worksheet = workbook.getWorksheet(1);

    const data: PostaType[] = [];

    worksheet?.eachRow((row, rowNumber) => {
      if (rowNumber === 1) return;
      const ipress = row.getCell(1).text;
      const ruc = row.getCell(2).text;
      const nombre = row.getCell(3).text;
      const departamentoNombre = row.getCell(4).text;
      const provinciaNombre = row.getCell(5).text;
      const distritoNombre = row.getCell(6).text;
      const lng = row.getCell(7).text;
      const lat = row.getCell(8).text;
      const altitud = row.getCell(9).text;
      const fechaInicioActividad = parse(
        row.getCell(10).text,
        'dd/MM/yyyy',
        new Date(),
      );
      const fechaRegistro = parse(
        row.getCell(11).text,
        'dd/MM/yyyy',
        new Date(),
      );

      if (nombre === 'ACTUALIZAR' || ipress === '') {
        return;
      }

      data.push({
        ipress: ipress || '',
        nombre: nombre || '',
        ruc: ruc || '',
        departamentoNombre: departamentoNombre || '',
        provinciaNombre: provinciaNombre || '',
        distritoNombre: distritoNombre || '',
        lat: lat || '',
        lng: lng || '',
        altitud: altitud || '',
        fechaInicioActividad: fechaInicioActividad || '',
        fechaRegistro: fechaRegistro || '',
      });
    });

    await Promise.all(
      data.map(async (item) => {
        const findDepartamento = await this.regionRepository.findOneBy({
          nombre: Like(`%${item.departamentoNombre}%`),
        });

        if (!findDepartamento) {
          return;
        }

        const findProvincia = await this.provinciaRepository.findOneBy({
          nombre: Like(`%${item.provinciaNombre}%`),
        });

        if (!findProvincia) {
          return;
        }

        const findDistrito = await this.distritoRepository.findOneBy({
          nombre: Like(`%${item.distritoNombre}%`),
        });

        if (!findDistrito) {
          return;
        }

        if (item.lat === '' || item.lng === '') {
          return;
        }

        const newPosta = this.postaRepository.create({
          ipress: item.ipress,
          ruc: item.ruc,
          nombre: item.nombre,
          direccion: '', //TODO:cambiar por que si viene en el excel
          lat: item.lat,
          lng: item.lng,
          altitud: item.altitud,
          capacidad: 0,
          fechaInicioActividad: item.fechaInicioActividad,
          region: findDepartamento,
          provincia: findProvincia,
          distrito: findDistrito,
          fechaCreacion: item.fechaRegistro,
        });

        await this.postaRepository.insert(newPosta);
      }),
    );

    const [findFilterPosta, totalItems] =
      await this.postaRepository.findAndCount({
        skip: 0,
        take: 10,
        relations: ['region', 'provincia', 'distrito'],
      });

    return {
      status: 200,
      message: 'File processed successfully',
      data: findFilterPosta,
      metadata: {
        totalItems,
        totalPages: Math.ceil(totalItems / 10),
        currentPage: 1,
      },
    };
  }

  async findAll(
    limit: number = 10,
    page: number = 1,
    regionId?: number,
    status?: boolean,
    search?: string,
  ) {
    const [dbPosta, totalItems] = await this.postaRepository.findAndCount({
      relations: ['region', 'provincia', 'distrito'],
      take: limit,
      skip: (page - 1) * limit,
      where: {
        ...(regionId && { region: { regionId } }),
        ...(status !== undefined && { estado: status }),
        ...(search && { nombre: Like(`%${search}%`) }),
      },
    });

    return {
      status: 200,
      message: 'Post retrieved successfully from database',
      data: dbPosta,
      metadata: {
        totalItems,
        totalPages: Math.ceil(totalItems / limit),
        currentPage: page,
      },
    };
  }

  async searchPostas(input: string) {
    const postaList = await this.postaRepository.find({
      where: { nombre: Like(`%${input}%`) },
      take: 10,
    });

    return {
      message: 'Buscada exitosa',
      status: 200,
      data: postaList,
    };
  }

  async findOne(id: number) {
    const findPosta = await this.postaRepository.findOne({
      where: { postaId: id },
      relations: ['region', 'provincia', 'distrito'],
    });

    if (!findPosta) {
      throw new HttpException('Post not found', 404);
    }

    return {
      status: 200,
      message: 'Post retrieved successfully',
      data: findPosta,
    };
  }

  async update(id: number, updatePostaDto: UpdatePostaDto) {
    const { regionId, provinciaId, distritoId, ...rest } = updatePostaDto;

    const findRegion = await this.regionRepository.findOneBy({ regionId });

    if (!findRegion) {
      throw new HttpException('Region not found', 404);
    }

    const findProvincia = await this.provinciaRepository.findOneBy({
      provinciaId,
    });
    if (!findProvincia) {
      throw new HttpException('Provincia not found', 404);
    }

    const findDistrito = await this.distritoRepository.findOneBy({
      distritoId,
    });

    if (!findDistrito) {
      throw new HttpException('Distrito not found', 404);
    }

    const findPosta = await this.postaRepository.findOneBy({ postaId: id });

    if (!findPosta) {
      throw new HttpException('Post not found', 404);
    }

    await this.postaRepository.update(id, {
      ...rest,
      region: findRegion,
      provincia: findProvincia,
      distrito: findDistrito,
    });

    return {
      status: 200,
      message: 'Post updated successfully',
      data: null,
    };
  }

  async remove(id: number) {
    const findPosta = await this.postaRepository.findOneBy({ postaId: id });

    if (!findPosta) {
      throw new HttpException('Post not found', 404);
    }

    await this.postaRepository.update(id, { estado: false });

    return {
      status: 200,
      message: 'Post removed successfully',
      data: null,
    };
  }

  async exportData() {
    const today = new Date();

    const day = today.getDate().toString().padStart(2, '0');
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    const year = today.getFullYear().toString();

    const fileName = `Posta-${day}-${month}-${year}`;

    const workbook = new Workbook();
    const worksheet = workbook.addWorksheet(fileName);
    worksheet.columns = [
      {
        header: 'ipress',
        key: 'ipress',
        width: 30,
      },
      {
        header: 'RUC',
        key: 'ruc',
        width: 30,
      },
      {
        header: 'Nombre Posta',
        key: 'nombre',
        width: 30,
      },
      {
        header: 'Capacidad',
        key: 'capacidad',
        width: 30,
      },
      {
        header: 'Estado',
        key: 'estado',
        width: 30,
      },
      {
        header: 'Direccion',
        key: 'direccion',
        width: 30,
      },
      {
        header: 'Latitud',
        key: 'lat',
        width: 20,
      },
      {
        header: 'Longitud',
        key: 'lng',
        width: 20,
      },
      {
        header: 'Altitud',
        key: 'altitud',
        width: 20,
      },
      {
        header: 'Fecha Inicio Actividad',
        key: 'fechaInicioActividad',
        width: 20,
      },
      {
        header: 'Fecha Creacion',
        key: 'fechaCreacion',
        width: 20,
      },
      {
        header: 'Region',
        key: 'region',
        width: 30,
      },
      {
        header: 'Provincia',
        key: 'provincia',
        width: 30,
      },
      {
        header: 'Distrito',
        key: 'distrito',
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

    const allPostas = await this.postaRepository.find({
      relations: ['region', 'provincia', 'distrito'],
    });

    allPostas.map((posta) => {
      return worksheet.addRow({
        ipress: posta.ipress,
        ruc: posta.ruc,
        nombre: posta.nombre,
        capacidad: posta.capacidad,
        estado: posta.estado,
        direccion: posta.direccion,
        lat: posta.lat,
        lng: posta.lng,
        altitud: posta.altitud,
        fechaInicioActividad: posta.fechaInicioActividad,
        fechaCreacion: posta.fechaCreacion,
        region: posta.region.nombre,
        provincia: posta.provincia?.nombre,
        distrito: posta.distrito?.nombre,
      });
    });

    const buffer = await workbook.xlsx.writeBuffer();

    return { buffer, fileName };
  }

  async findByDistance(body: FindByDistanceDto) {
    const { lat, lng, distance } = body;

    const rawData = await this.postaRepository.query(
      `
    exec find_by_distance @Distance=@0, @LAT=@1, @LNG=@2
  `,
      [distance, lat, lng],
    );

    return {
      status: 200,
      message: 'Postas retrieved successfully',
      data: rawData,
    };
  }
}
