import { HttpException, Injectable } from '@nestjs/common';
import { CreatePostaDto } from './dto/create-posta.dto';
import { UpdatePostaDto } from './dto/update-posta.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Posta } from './entities/posta.entity';
import { Repository, Like } from 'typeorm';
import { Workbook } from 'exceljs';
import { Region } from './entities/region.entity';
import { RedisService } from 'src/redis/redis.service';

@Injectable()
export class PostaService {
  private readonly postaKey = 'posta';

  constructor(
    @InjectRepository(Posta)
    private readonly postaRepository: Repository<Posta>,
    @InjectRepository(Region)
    private readonly regionRepository: Repository<Region>,
    private readonly redisService: RedisService,
  ) {}

  async create(createPostaDto: CreatePostaDto) {
    const { regionId, ...rest } = createPostaDto;

    const findRegion = await this.regionRepository.findOneBy({ regionId });

    if (!findRegion) {
      throw new HttpException('Region not found', 404);
    }

    const posta = this.postaRepository.create({
      ...rest,
      region: findRegion,
    });

    await this.postaRepository.insert(posta);
    const findAllPosta = await this.postaRepository.find();

    await this.redisService.set('postas', findAllPosta);

    return {
      status: 200,
      message: 'Post created successfully',
      data: posta,
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
      relations: ['region'],
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

  async rawPostas() {
    const cachePostas = await this.redisService.get<Posta[]>('postas');

    if (cachePostas) {
      return {
        status: 200,
        message: 'Post retrieved successfully from cache',
        data: cachePostas.map((posta) => ({
          lat: Number(posta.lat),
          lng: Number(posta.lng),
        })),
      };
    }

    const dbPostas = await this.postaRepository.find();
    await this.redisService.set('postas', dbPostas);

    return {
      status: 200,
      message: 'Post retrieved successfully from database',
      data: dbPostas.map((posta) => ({
        lat: Number(posta.lat),
        lng: Number(posta.lng),
      })),
    };
  }

  async findOne(id: number) {
    const findPosta = await this.postaRepository.findOneBy({ postaId: id });

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
    const findPosta = await this.postaRepository.findOneBy({ postaId: id });

    if (!findPosta) {
      throw new HttpException('Post not found', 404);
    }

    await this.postaRepository.update(id, updatePostaDto);

    const findAllPosta = await this.postaRepository.find();

    await this.redisService.set('postas', findAllPosta);

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
    const findAllPosta = await this.postaRepository.find();

    await this.redisService.set('postas', findAllPosta);
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
        header: 'ID',
        key: 'postaId',
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

    const allPostas = await this.postaRepository.find();

    allPostas.map((posta) => {
      return worksheet.addRow({
        postaId: posta.postaId,
        nombre: posta.nombre,
        capacidad: posta.capacidad,
        estado: posta.estado,
        direccion: posta.direccion,
        lat: posta.lat,
        lng: posta.lng,
      });
    });

    const buffer = await workbook.xlsx.writeBuffer();

    return { buffer, fileName };
  }
}
