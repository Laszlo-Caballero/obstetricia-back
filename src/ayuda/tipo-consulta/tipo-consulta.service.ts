import { HttpException, Injectable } from '@nestjs/common';
import { CreateTipoConsultaDto } from './dto/create-tipo-consulta.dto';
import { UpdateTipoConsultaDto } from './dto/update-tipo-consulta.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TipoConsulta } from './entities/tipo-consulta.entity';
import { Like, Repository } from 'typeorm';
import { RedisService } from 'src/redis/redis.service';
import { Workbook } from 'exceljs';

@Injectable()
export class TipoConsultaService {
  private readonly tipokey: 'tipo'
    constructor(
      @InjectRepository(TipoConsulta)
      private readonly tipoRepository: Repository<TipoConsulta>,
  
      private readonly redisService: RedisService,
    ){}

  async create(createTipoConsultaDto: CreateTipoConsultaDto) {

    const tipo = this.tipoRepository.create(createTipoConsultaDto);

    await this.tipoRepository.insert(tipo)
    const findAllTipo = await this.tipoRepository.find()

    await this.redisService.set('tipos', findAllTipo)

    return {
      status: 200,
      message: 'Type created succesfully',
      date: tipo,
    };
  }

  async findAll(
    limit: number = 10,
    page: number = 1,
    status?: boolean,
    search?: string,
  ) {
    const[dbTipos, totalItems] = await this.tipoRepository.findAndCount({
      take: limit,
      skip: (page - 1) * limit,
      where:{
        ...(status != undefined && {estado: status}),
        ...(search && {nombre: Like(`%${search}%`)} ),
      }
    })

    return {
      status: 200,
      message: 'Type retrieved successfully from database',
      data: dbTipos,
      metadata: {
        totalItems,
        totalPages: Math.ceil(totalItems / limit),
        currentPage: page,
      }
    };
  }
  async rawTipos(){
    const cacheTipos = await this.redisService.get<TipoConsulta[]>('tipos');

    if(cacheTipos){
      return{
        status:200,
        message: 'Type retrieved succesfully from cache',
        data: cacheTipos,
      }
    }

    const dbTipos = await this.tipoRepository.find();
    await this.redisService.set('tipos', dbTipos);

    return{
      satus: 200,
      message: 'Type retrieved successfully from database',
      data: dbTipos,
    }
  }

  async findOne(id: number) {
    const findTipo = await this.tipoRepository.findOneBy({tipoId: id})
    
    if (!findTipo){
      throw new HttpException('Type not found', 404);
    }

    return{
      status: 200,
      message: 'Type retrieved successfully',
      data: findTipo,
    };
  }

  async update(id: number, updateTipoConsultaDto: UpdateTipoConsultaDto) {
    const findTipo = await this.tipoRepository.findOneBy({tipoId: id});

    if (!findTipo){
      throw new HttpException('Type not found', 404);
    }

    await this.tipoRepository.update(id, updateTipoConsultaDto);

    const findAllTipo = await this.tipoRepository.find();

    await this.redisService.set('tipos', findAllTipo);

    return {
      status: 200,
      message: 'Type updated succesfully',
      data: null,
    }
  }

  async remove(id: number) {
    const findTipo = await this.tipoRepository.findOneBy({tipoId: id});

    if (!findTipo){
      throw new HttpException('Type not found', 404);
    }

    await this.tipoRepository.update(id, {estado: false });
    const findAllTipo = await this.tipoRepository.find();

    await this.redisService.set('tipos', findAllTipo);

    return {
      status: 200,
      message: 'Type removed successfully',
      data: null,
    };
  }
  async exportData() {
    const today = new Date();

    const day = today.getDate().toString().padStart(2, '0');
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    const year = today.getFullYear().toString();

    const fileName = `Tipo-${day}-${month}-${year}`;

    const workbook = new Workbook();
    const worksheet =workbook.addWorksheet(fileName);
    worksheet.columns = [
      {
        header: 'ID',
        key: 'tipoId',
      },
      {
        header: 'Nombre Tipo',
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

    const allTipos = await this.tipoRepository.find();

    allTipos.map((tipo) => {
      return worksheet.addRow({
        tipoId: tipo.tipoId,
        nombre: tipo.nombre,
        descripcion: tipo.descripcion,
        estado: tipo.estado,
      });
    });

    const buffer = await workbook.xlsx.writeBuffer();

    return  {buffer, fileName};
  }
}
