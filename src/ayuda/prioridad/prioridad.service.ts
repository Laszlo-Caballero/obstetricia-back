import { HttpException, Injectable } from '@nestjs/common';
import { CreatePrioridadDto } from './dto/create-prioridad.dto';
import { UpdatePrioridadDto } from './dto/update-prioridad.dto';
import { Prioridad } from './entities/prioridad.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { RedisService } from 'src/redis/redis.service';
import { Workbook } from 'exceljs';

@Injectable()
export class PrioridadService {
  private readonly prioridadkey: 'prioridad'
    constructor(
      @InjectRepository(Prioridad)
      private readonly prioridadRepository: Repository<Prioridad>,
  
      private readonly redisService: RedisService,
    ){}

  async create(createPrioridadDto: CreatePrioridadDto) {

    const prioridad = this.prioridadRepository.create(createPrioridadDto);

    await this.prioridadRepository.insert(prioridad)

    const findAllPrioridad = await this.prioridadRepository.find()
    await this.redisService.set('prioridades', findAllPrioridad)

    return {
      status: 200,
      message: 'Priority created succesfully',
      data: prioridad,
    };
  }

  async findAll( limit: number = 10,
    page: number = 1,
    status?: boolean,
    search?: string,) {

    const[dbPrioridad, totalItems] = await this.prioridadRepository.findAndCount({
          take: limit,
          skip: (page - 1) * limit,
          where:{
            ...(status != undefined && {estado: status}),
            ...(search && {nombre: Like(`%${search}%`)} ),
          }
        })
    
        return {
          status: 200,
          message: 'Priority retrieved successfully from database',
          data: dbPrioridad,
          metadata: {
            totalItems,
            totalPages: Math.ceil(totalItems / limit),
            currentPage: page,
          }
        };
  }

  async rawPrioridades(){
      const cachePrioridad = await this.redisService.get<Prioridad[]>('prioridades');
  
      if(cachePrioridad){
        return{
          status:200,
          message: 'Priority retrieved succesfully from cache',
          data: cachePrioridad,
        }
      }
  
      const dbPrioridad = await this.prioridadRepository.find();
      await this.redisService.set('prioridades', dbPrioridad);
  
      return{
        satus: 200,
        message: 'Priority retrieved successfully from database',
        data: dbPrioridad,
      }
    }

  async findOne(id: number) {
    const findPrioridad = await this.prioridadRepository.findOneBy({prioridadId: id})

    if (!findPrioridad){
      throw new HttpException('Priority not found', 404);
    }

    return{
      status: 200,
      message: 'Priority retrieved successfully',
      data: findPrioridad,
    };
  }

  async update(id: number, updatePrioridadDto: UpdatePrioridadDto) {
    const findPrioridad = await this.prioridadRepository.findOneBy({prioridadId: id});

    if (!findPrioridad){
      throw new HttpException('Priority not found', 404);
    }

    await this.prioridadRepository.update(id, updatePrioridadDto);

    const findAllPrioridad = await this.prioridadRepository.find();

    await this.redisService.set('prioridades', findAllPrioridad);

    return {
      status: 200,
      message: 'Priority updated succesfully',
      data: null,
    }
  }

  async remove(id: number) {
    const findPrioridad = await this.prioridadRepository.findOneBy({prioridadId: id});

    if (!findPrioridad){
      throw new HttpException('Priority not found', 404);
    }

    await this.prioridadRepository.update(id, {estado: false });

    const findAllPrioridad = await this.prioridadRepository.find();

    await this.redisService.set('prioridades', findAllPrioridad);

    return {
      status: 200,
      message: 'Priority removed successfully',
      data: null,
    };
  }
  
  async exportData() {
    const today = new Date();

    const day = today.getDate().toString().padStart(2, '0');
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    const year = today.getFullYear().toString();

    const fileName = `Prioridad-${day}-${month}-${year}`;

    const workbook = new Workbook();
    const worksheet =workbook.addWorksheet(fileName);
    worksheet.columns = [
      {
        header: 'ID',
        key: 'prioridadId',
      },
      {
        header: 'Nombre Prioridad',
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

    const allPrioridades = await this.prioridadRepository.find();

    allPrioridades.map((prioridad) => {
      return worksheet.addRow({
        prioridadId: prioridad.prioridadId,
        nombre: prioridad.nombre,
        estado: prioridad.estado,
      });
    });
    const buffer = await workbook.xlsx.writeBuffer();
    return  {buffer, fileName};
  }
}
