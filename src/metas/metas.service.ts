import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateMetaDto } from './dto/create-meta.dto';
import { UpdateMetaDto } from './dto/update-meta.dto';
import { Meta, MetaDocument } from './entities/meta.entity';

@Injectable()
export class MetasService {
  constructor(
    @InjectModel(Meta.name)
    private readonly metaModel: Model<MetaDocument>,
  ) {}

  async create(createMetaDto: CreateMetaDto) {
    const nuevaMeta = new this.metaModel(createMetaDto);
    const savedMeta = await nuevaMeta.save();

    return {
      message: 'Meta creada exitosamente',
      data: savedMeta,
      status: HttpStatus.CREATED,
    };
  }

  async findAll() {
    const metas = await this.metaModel.find().exec();

    return {
      message: 'Metas retrieved successfully',
      data: metas,
      status: HttpStatus.OK,
    };
  }

  async findOne(id: string) {
    const meta = await this.metaModel.findById(id).exec();

    if (!meta) {
      throw new HttpException('Meta no encontrada', HttpStatus.NOT_FOUND);
    }

    return {
      message: 'Meta retrieved successfully',
      data: meta,
      status: HttpStatus.OK,
    };
  }

  async update(id: string, updateMetaDto: UpdateMetaDto) {
    const updatedMeta = await this.metaModel
      .findByIdAndUpdate(id, updateMetaDto, { new: true })
      .exec();

    if (!updatedMeta) {
      throw new HttpException('Meta no encontrada', HttpStatus.NOT_FOUND);
    }

    return {
      message: 'Meta actualizada exitosamente',
      data: updatedMeta,
      status: HttpStatus.OK,
    };
  }

  async remove(id: string) {
    const deletedMeta = await this.metaModel.findByIdAndDelete(id).exec();

    if (!deletedMeta) {
      throw new HttpException('Meta no encontrada', HttpStatus.NOT_FOUND);
    }

    return {
      message: 'Meta eliminada exitosamente',
      status: HttpStatus.OK,
    };
  }
}
