import { HttpException, Injectable } from '@nestjs/common';
import { CreateMedicinaDto } from './dto/create-medicina.dto';
import { UpdateMedicinaDto } from './dto/update-medicina.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Medicina } from './entities/medicina.entity';
import { Like, Repository } from 'typeorm';
import { Categoria } from '../categoria/entities/categoria.entity';
import { Presentacion } from '../presentacion/entities/presentacion.entity';
import { RedisService } from 'src/redis/redis.service';
import { Workbook } from 'exceljs';
import { Recurso } from 'src/recurso/entities/recurso.entity';
import { Motivo } from 'src/motivos/entities/motivo.entity';
import { MotivoDto } from 'src/motivos/dto/motivo.dto';

@Injectable()
export class MedicinaService {
  private readonly medicinakey = 'medicina';

  constructor(
    @InjectRepository(Medicina)
    private readonly medicinaRepository: Repository<Medicina>,
    @InjectRepository(Categoria)
    private readonly categoriaRepository: Repository<Categoria>,
    @InjectRepository(Presentacion)
    private readonly presentacionRepository: Repository<Presentacion>,
    @InjectRepository(Recurso)
    private readonly recursoRepository: Repository<Recurso>,
    @InjectRepository(Motivo)
    private readonly motivoRepository: Repository<Motivo>,
    private readonly redisService: RedisService,
  ) {}

  async create(createMedicinaDto: CreateMedicinaDto) {
    const { categoriaId, presentacionId, recursoId, ...rest } =
      createMedicinaDto;

    const findCategoria = await this.categoriaRepository.findOneBy({
      categoriaId,
    });
    const findPresentacion = await this.presentacionRepository.findOneBy({
      presentacionId,
    });

    const findRecurso = await this.recursoRepository.findOneBy({
      recursoId,
    });

    if (!findCategoria) {
      throw new HttpException('Category not found', 404);
    }
    if (!findPresentacion) {
      throw new HttpException('Appearance not found', 404);
    }

    if (!findRecurso) {
      throw new HttpException('Resource not found', 404);
    }

    const medicina = this.medicinaRepository.create({
      ...rest,
      categoria: findCategoria,
      presentacion: findPresentacion,
      recurso: findRecurso,
    });

    await this.medicinaRepository.insert(medicina);

    return {
      status: 200,
      message: 'Medicine created successfully',
      data: medicina,
    };
  }

  async findAll(
    limit: number = 10,
    page: number = 1,
    categoriaId?: number,
    presentacionId?: number,
    status?: boolean,
    search?: string,
  ) {
    const [dbMedicina, totalItems] = await this.medicinaRepository.findAndCount(
      {
        relations: ['categoria', 'presentacion', 'recurso', 'motivo'],
        take: limit,
        skip: (page - 1) * limit,
        where: {
          ...(categoriaId && { categoria: { categoriaId } }),
          ...(presentacionId && { presentacion: { presentacionId } }),
          ...(status !== undefined && { estado: status }),
          ...(search && { nombre: Like(`%${search}%`) }),
        },
      },
    );

    return {
      status: 200,
      message: 'Medicine retrieved successfully from database',
      data: dbMedicina,
      metadata: {
        totalItems,
        totalPages: Math.ceil(totalItems / limit),
        currentPage: page,
      },
    };
  }

  async searchMedicina(input: string) {
    const medicinaList = await this.medicinaRepository.find({
      where: { nombre: Like(`%${input}%`) },
      take: 10,
    });

    return {
      message: 'Buscada exitosa',
      status: 200,
      data: medicinaList,
    };
  }

  async rawMedicinas() {
    const cacheMedicina = await this.redisService.get<Medicina[]>('medicinas');

    if (cacheMedicina) {
      return {
        status: 200,
        message: 'Medicine retrieved successfully from cache',
        data: cacheMedicina,
      };
    }

    const dbMedicina = await this.medicinaRepository.find();
    await this.redisService.set('medicinas', dbMedicina);

    return {
      status: 200,
      message: 'Medicine retrieved successfully from database',
      data: dbMedicina,
    };
  }

  async findOne(id: number) {
    const findMedicina = await this.medicinaRepository.findOne({
      relations: ['categoria', 'presentacion', 'recurso', 'motivo'],
      where: { medicinaId: id },
    });

    if (!findMedicina) {
      throw new HttpException('Medicine not found', 404);
    }

    return {
      status: 200,
      message: 'Medicine retrieved successfully',
      data: findMedicina,
    };
  }

  async update(id: number, updateMedicinaDto: UpdateMedicinaDto) {
    const { categoriaId, presentacionId, recursoId, ...rest } =
      updateMedicinaDto;

    const findCategoria = await this.categoriaRepository.findOneBy({
      categoriaId,
    });
    const findPresentacion = await this.presentacionRepository.findOneBy({
      presentacionId,
    });

    const findRecurso = await this.recursoRepository.findOneBy({
      recursoId,
    });

    if (!findCategoria) {
      throw new HttpException('Category not found', 404);
    }
    if (!findPresentacion) {
      throw new HttpException('Appearance not found', 404);
    }

    if (!findRecurso) {
      throw new HttpException('Resource not found', 404);
    }

    await this.medicinaRepository.update(id, {
      ...rest,
      categoria: findCategoria,
      presentacion: findPresentacion,
      recurso: findRecurso,
    });

    const findAllMedicina = await this.medicinaRepository.find();

    await this.redisService.set('medicinas', findAllMedicina);

    return {
      status: 200,
      message: 'Medicine updated successfully',
      data: null,
    };
  }

  async remove(id: number, motivoDto: MotivoDto) {
    const findMedicina = await this.medicinaRepository.findOneBy({
      medicinaId: id,
    });

    if (!findMedicina) {
      throw new HttpException('Medicine not found', 404);
    }

    const newMotivo = this.motivoRepository.create({
      medicina: findMedicina,
      razon: motivoDto.razon,
      nombreTabla: 'Medicina',
    });

    await this.motivoRepository.insert(newMotivo);

    await this.medicinaRepository.update(id, { estado: false });
    const findAllMedicina = await this.medicinaRepository.find();

    await this.redisService.set('medicinas', findAllMedicina);
    return {
      status: 200,
      message: 'Medicine removed successfully',
      data: null,
    };
  }

  async exportData() {
    const today = new Date();

    const day = today.getDate().toString().padStart(2, '0');
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    const year = today.getFullYear().toString();

    const fileName = `Medicina-${day}-${month}-${year}`;

    const workbook = new Workbook();
    const worksheet = workbook.addWorksheet(fileName);
    worksheet.columns = [
      {
        header: 'ID',
        key: 'medicinaId',
      },
      {
        header: 'Nombre Medicna',
        key: 'nombre',
        width: 40,
      },
      {
        header: 'Descripcion',
        key: 'descripcion',
        width: 200,
      },
      {
        header: 'Codigo',
        key: 'codigo',
        width: 20,
      },
      {
        header: 'Stock',
        key: 'stock',
        width: 30,
      },
      {
        header: 'Estado',
        key: 'estado',
        width: 30,
      },
      {
        header: 'Fecha Creacion',
        key: 'fechaCreacion',
        width: 20,
      },
      {
        header: 'Categoria',
        key: 'categoria',
        width: 30,
      },
      {
        header: 'Presentacion',
        key: 'presentacion',
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

    const allMedicinas = await this.medicinaRepository.find();

    allMedicinas.map((medicina) => {
      return worksheet.addRow({
        medicinaId: medicina.medicinaId,
        nombre: medicina.nombre,
        descripcion: medicina.descripcion,
        codigo: medicina.codigo,
        stock: medicina.stock,
        estado: medicina.estado,
        fechaCeracion: medicina.fechaCreacion,
        categoria: medicina.categoria?.nombre,
        presentacion: medicina.presentacion?.nombre,
      });
    });

    const buffer = await workbook.xlsx.writeBuffer();

    return { buffer, fileName };
  }
}
