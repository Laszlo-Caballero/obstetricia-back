import { HttpException, Injectable } from '@nestjs/common';
import { CreateConsultaDto } from './dto/create-consulta.dto';
import { UpdateConsultaDto } from './dto/update-consulta.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Consulta } from './entities/consulta.entity';
import { Like, Repository } from 'typeorm';
import { Modulo } from '../modulo/entities/modulo.entity';
import { Prioridad } from '../prioridad/entities/prioridad.entity';
import { TipoConsulta } from '../tipo-consulta/entities/tipo-consulta.entity';
import { Auth } from 'src/auth/entities/auth.entity';
import { RedisService } from 'src/redis/redis.service';
import { Workbook } from 'exceljs';

@Injectable()
export class ConsultaService {
  private readonly consultaKey = 'consulta';
  
    constructor(
      @InjectRepository(Consulta)
      private readonly consultaRepository: Repository<Consulta>,
      @InjectRepository(Modulo)
      private readonly moduloRepository: Repository<Modulo>,
      @InjectRepository(Prioridad)
      private readonly prioridadRepository: Repository<Prioridad>,
      @InjectRepository(TipoConsulta)
      private readonly tipoRepository: Repository<TipoConsulta>,
      @InjectRepository(Auth)
      private readonly userRepository: Repository<Auth>,

      private readonly redisService: RedisService,
    ) {}

  async create(createConsultaDto: CreateConsultaDto) {
    const { moduloId, prioridadId, tipoId, userId, ...rest } = createConsultaDto;

    const findModulo = await this.moduloRepository.findOneBy({ moduloId });
    const findPrioridad = await this.prioridadRepository.findOneBy({prioridadId})
    const findTipo = await this.tipoRepository.findOneBy({tipoId})
    const findUser = await this.userRepository.findOneBy({userId})

    if (!findModulo) {
      throw new HttpException('Module not found', 404);
    }
    if (!findPrioridad) {
      throw new HttpException('Priority not found', 404);
    }
    if (!findTipo) {
      throw new HttpException('Type not found', 404);
    }
    if (!findUser) {
      throw new HttpException('User not found', 404);
    }

    const consulta = this.consultaRepository.create({
      ...rest,
      modulo: findModulo,
      prioridad: findPrioridad,
      tipo: findTipo,
      user: findUser,
    });

    await this.consultaRepository.insert(consulta);
    const findAllConsulta = await this.consultaRepository.find();

    await this.redisService.set('consultas', findAllConsulta);

    return {
      status: 200,
      message: 'Consultation created successfully',
      data: consulta,
    };
  }

  async findAll( limit: number = 10,
    page: number = 1,
    moduloId?: number,
    prioridadId?: number,
    tipoId?: number,
    userId?: number,
    status?: boolean,
    search?: string,) {

    const [dbConsulta, totalItems] = await this.consultaRepository.findAndCount({
      relations: ['modulo', 'prioridad', 'tipo', 'user'],
      take: limit,
      skip: (page - 1) * limit,
      where: {
        ...(moduloId && { modulo: { moduloId } }),
        ...(prioridadId && { prioridad: { prioridadId } }),
        ...(tipoId && { tipo: { tipoId } }),
        ...(userId && { user: { userId } }),
        ...(status !== undefined && { estado: status }),
        ...(search && { nombre: Like(`%${search}%`) }),
      },
    });

    return {
      status: 200,
      message: 'Consultation retrieved successfully from database',
      data: dbConsulta,
      metadata: {
        totalItems,
        totalPages: Math.ceil(totalItems / limit),
        currentPage: page,
      },
    };
  }

  async rawConsultas() {
    const cacheConsultas = await this.redisService.get<Consulta[]>('consultas');

    if (cacheConsultas) {
      return {
        status: 200,
        message: 'Consultation retrieved successfully from cache',
        data: cacheConsultas,
      };
    }

    const dbConsulta = await this.consultaRepository.find();
    await this.redisService.set('consultas', dbConsulta);

    return {
      status: 200,
      message: 'Consultation retrieved successfully from database',
      data: dbConsulta,
    };
  }

  async findOne(id: number) {
    const findConsulta = await this.consultaRepository.findOneBy({ consultaId: id });

    if (!findConsulta) {
      throw new HttpException('Consultation not found', 404);
    }

    return {
      status: 200,
      message: 'Consultation retrieved successfully',
      data: findConsulta,
    }
  }

  async update(id: number, updateConsultaDto: UpdateConsultaDto) {
    const findConsulta = await this.consultaRepository.findOneBy({ consultaId: id });

    if (!findConsulta) {
      throw new HttpException('Consultation not found', 404);
    }

    await this.consultaRepository.update(id, updateConsultaDto);

    const findAllConsulta = await this.consultaRepository.find();

    await this.redisService.set('consultas', findAllConsulta);

    return {
      status: 200,
      message: 'Consultation updated successfully',
      data: null,
    };
  }

  async remove(id: number) {
    const findConsulta = await this.consultaRepository.findOneBy({ consultaId: id });

    if (!findConsulta) {
      throw new HttpException('Consultation not found', 404);
    }

    await this.consultaRepository.update(id, { estado: false });
    const findAllConsulta = await this.consultaRepository.find();

    await this.redisService.set('consultas', findAllConsulta);
    return {
      status: 200,
      message: 'Consultation removed successfully',
      data: null,
    };
  }

  async exportData() {
    const today = new Date();

    const day = today.getDate().toString().padStart(2, '0');
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    const year = today.getFullYear().toString();

    const fileName = `Consulta-${day}-${month}-${year}`;

    const workbook = new Workbook();
    const worksheet = workbook.addWorksheet(fileName);
    worksheet.columns = [
      {
        header: 'ID',
        key: 'consultaId',
      },
      {
        header: 'Asunto Consulta',
        key: 'asunto',
        width: 40,
      },
      {
        header: 'Descripcion',
        key: 'descripcion',
        width: 200,
      },
      {
        header: 'Correo',
        key: 'correo',
        width: 20,
      },
      {
        header: 'Telefono',
        key: 'telefono',
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

    const allConsultas = await this.consultaRepository.find();

    allConsultas.map((consulta) => {
      return worksheet.addRow({
        consultaId: consulta.consultaId,
        asunto: consulta.asunto,
        descripcion: consulta.descripcion,
        correo: consulta.correo,
        telefono: consulta.telefono,
        estado: consulta.estado,
      });
    });

    const buffer = await workbook.xlsx.writeBuffer();

    return { buffer, fileName };
  }
}
