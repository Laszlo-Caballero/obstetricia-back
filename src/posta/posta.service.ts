import { HttpException, Injectable } from '@nestjs/common';
import { CreatePostaDto } from './dto/create-posta.dto';
import { UpdatePostaDto } from './dto/update-posta.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Posta } from './entities/posta.entity';
import { Repository } from 'typeorm';
import { RedisService } from 'src/redis/redis.service';
import { Workbook } from 'exceljs';
import { Region } from './entities/region.entity';

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

    const allPosta = await this.postaRepository.find({
      relations: ['region'],
    });

    await this.redisService.set(this.postaKey, allPosta);

    return {
      status: 200,
      message: 'Post created successfully',
      data: allPosta,
    };
  }

  async findAll() {
    const allPosta = await this.redisService.get<Posta[]>(this.postaKey);

    if (allPosta) {
      return {
        status: 200,
        message: 'Post retrieved successfully from cache',
        data: allPosta,
      };
    }

    const dbPosta = await this.postaRepository.find({
      relations: ['region'],
    });

    await this.redisService.set(this.postaKey, dbPosta);

    return {
      status: 200,
      message: 'Post retrieved successfully from database',
      data: dbPosta,
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

    const allPosta = await this.postaRepository.find();

    await this.redisService.set(this.postaKey, allPosta);

    return {
      status: 200,
      message: 'Post updated successfully',
      data: allPosta,
    };
  }

  async remove(id: number) {
    const findPosta = await this.postaRepository.findOneBy({ postaId: id });

    if (!findPosta) {
      throw new HttpException('Post not found', 404);
    }

    await this.postaRepository.update(id, { estado: false });

    const allPosta = await this.postaRepository.find();

    await this.redisService.set(this.postaKey, allPosta);

    return {
      status: 200,
      message: 'Post removed successfully',
      data: allPosta,
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
