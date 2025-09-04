import { HttpException, Injectable } from '@nestjs/common';
import { CreateModuloDto } from './dto/create-modulo.dto';
import { UpdateModuloDto } from './dto/update-modulo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { Modulo } from './entities/modulo.entity';
import { RedisService } from 'src/redis/redis.service';
import { Workbook } from 'exceljs';

@Injectable()
export class ModuloService {

  private readonly modulokey: 'modulo'
  constructor(
    @InjectRepository(Modulo)
    private readonly moduloRepository: Repository<Modulo>,

    private readonly redisService: RedisService,
  ){}

  async create(createModuloDto: CreateModuloDto) {

    const modulo = this.moduloRepository.create(createModuloDto);

    await this.moduloRepository.insert(modulo)
    const findAllModulo = await this.moduloRepository.find()

    await this.redisService.set('modulos', findAllModulo)

    return {
      status: 200,
      message: 'Modulo created succesfully',
      data: modulo,
    };
  }

  async findAll(
    limit: number = 10,
    page: number = 1,
    status?: boolean,
    search?: string,
  ) {

    const[dbModulo, totalItems] = await this.moduloRepository.findAndCount({
      take: limit,
      skip: (page - 1) * limit,
      where:{
        ...(status != undefined && {estado: status}),
        ...(search && {nombre: Like(`%${search}%`)} ),
      }
    })

    return {
      status: 200,
      message: 'Modulo retrieved successfully from database',
      data: dbModulo,
      metadata: {
        totalItems,
        totalPages: Math.ceil(totalItems / limit),
        currentPage: page,
      }
    };
  }

  async rawModulos(){
    const cacheModulo = await this.redisService.get<Modulo[]>('modulos');

    if(cacheModulo){
      return{
        status:200,
        message: 'Module retrieved succesfully from cache',
        data: cacheModulo,
      }
    }

    const dbModulo = await this.moduloRepository.find();
    await this.redisService.set('modulos', dbModulo);

    return{
      satus: 200,
      message: 'Module retrieved successfully from database',
      data: dbModulo,
    }
  }

async  findOne(id: number) {
    const findModulo = await this.moduloRepository.findOneBy({moduloId: id})

    if (!findModulo){
      throw new HttpException('Module not found', 404);
    }

    return{
      status: 200,
      message: 'Module retrieved successfully',
      data: findModulo,
    };
  }

  async update(id: number, updateModuloDto: UpdateModuloDto) {
    const findModulo = await this.moduloRepository.findOneBy({moduloId: id});

    if (!findModulo){
      throw new HttpException('Module not found', 404);
    }

    await this.moduloRepository.update(id, updateModuloDto);

    const findAllModulo = await this.moduloRepository.find();

    await this.redisService.set('modulos', findAllModulo);

    return {
      status: 200,
      message: 'Module updated succesfully',
      data: null,
    }
  }

  async remove(id: number) {
    const findModulo = await this.moduloRepository.findOneBy({moduloId: id});

    if (!findModulo){
      throw new HttpException('Module not found', 404);
    }

    await this.moduloRepository.update(id, {estado: false });
    const findAllModulo = await this.moduloRepository.find();

    await this.redisService.set('modulos', findAllModulo);

    return {
      status: 200,
      message: 'Module removed successfully',
      data: null,
    };
  }

  async exportData() {
    const today = new Date();

    const day = today.getDate().toString().padStart(2, '0');
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    const year = today.getFullYear().toString();

    const fileName = `Modulo-${day}-${month}-${year}`;

    const workbook = new Workbook();
    const worksheet =workbook.addWorksheet(fileName);
    worksheet.columns = [
      {
        header: 'ID',
        key: 'moduloId',
      },
      {
        header: 'Nombre Modulo',
        key: 'nombre',
        width: 30,
      },
      {
        header: 'Descripción',
        key: 'descripcion',
        width: 200,
      },
      {
        header: 'Estado',
        key: 'estado',
        width: 30,
      },
    ];

    const headerRow = worksheet.getRow(1);
    headerRow.eachCell((cell) => {
      cell.font = {bold: true, color: { argb: 'FFFFFFFF'}, size: 12};
      cell.alignment = {vertical: 'middle', horizontal: 'center'};
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: '4472C4' },
      };
      cell.border = {
        bottom: { style: 'thin', color: { argb: 'FF000000'}},
      };
    });

    const allModulos = await this.moduloRepository.find();

    allModulos.map((modulo) => {
      return worksheet.addRow({
        moduloId: modulo.moduloId,
        nombre: modulo.nombre,
        descripcion: modulo.descripcion,
        estado: modulo.estado,
      });
    });

    const buffer = await workbook.xlsx.writeBuffer();

    return  {buffer, fileName};
  }
}
