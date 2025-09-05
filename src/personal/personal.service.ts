import { HttpException, Injectable } from '@nestjs/common';
import { CreatePersonalDto } from './dto/create-personal.dto';
import { UpdatePersonalDto } from './dto/update-personal.dto';
import { Repository } from 'typeorm';
import { Personal } from './entities/personal.entity';
import { Turno } from 'src/turnos/entities/turno.entity';
import { Posta } from 'src/posta/entities/posta.entity';
import { TipoPersonal } from 'src/tipo-personal/entities/tipo-personal.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class PersonalService {
  constructor(
    @InjectRepository(Personal)
    private readonly personalRepository: Repository<Personal>,
    @InjectRepository(Turno)
    private readonly turnoRepository: Repository<Turno>,
    @InjectRepository(Posta)
    private readonly postaRepository: Repository<Posta>,
    @InjectRepository(TipoPersonal)
    private readonly tipoPersonalRepository: Repository<TipoPersonal>,
  ) {}

  async create(createPersonalDto: CreatePersonalDto) {
    const { turnoId, tipoPersonalId, postaId, ...personal } = createPersonalDto;

    const turno = await this.turnoRepository.findOneBy({ turnoId });

    if (!turno) {
      throw new HttpException('Turno no encontrado', 404);
    }

    const tipoPersonal = await this.tipoPersonalRepository.findOneBy({
      tipoPersonalId,
    });

    if (!tipoPersonal) {
      throw new HttpException('Tipo de personal no encontrado', 404);
    }

    const posta = await this.postaRepository.findOneBy({ postaId });

    if (!posta) {
      throw new HttpException('Posta no encontrada', 404);
    }

    const newPersonal = this.personalRepository.create({
      ...personal,
      turno,
      tipoPersonal,
      posta,
    });

    await this.personalRepository.insert(newPersonal);

    return {
      message: 'Personal creado exitosamente',
      status: 201,
      data: newPersonal,
    };
  }

  async findAll() {
    const personal = await this.personalRepository.find();
    return {
      message: 'Personal encontrado exitosamente',
      status: 200,
      data: personal,
    };
  }

  async findOne(id: number) {
    const personal = await this.personalRepository.findOneBy({
      personalId: id,
    });

    if (!personal) {
      throw new HttpException('Personal no encontrado', 404);
    }

    return {
      message: 'Personal encontrado exitosamente',
      status: 200,
      data: personal,
    };
  }

  async update(id: number, updatePersonalDto: UpdatePersonalDto) {
    const findOne = await this.personalRepository.findOneBy({ personalId: id });
    if (!findOne) {
      throw new HttpException('Personal no encontrado', 404);
    }

    const { turnoId, tipoPersonalId, postaId, ...personal } = updatePersonalDto;

    const turno = await this.turnoRepository.findOneBy({ turnoId });

    if (!turno) {
      throw new HttpException('Turno no encontrado', 404);
    }

    const tipoPersonal = await this.tipoPersonalRepository.findOneBy({
      tipoPersonalId,
    });

    if (!tipoPersonal) {
      throw new HttpException('Tipo de personal no encontrado', 404);
    }

    const posta = await this.postaRepository.findOneBy({ postaId });

    if (!posta) {
      throw new HttpException('Posta no encontrada', 404);
    }

    await this.personalRepository.update(id, {
      ...personal,
      turno,
      tipoPersonal,
      posta,
    });

    return {
      message: 'Personal actualizado exitosamente',
      status: 200,
      data: null,
    };
  }

  async remove(id: number) {
    const findOne = await this.personalRepository.findOneBy({ personalId: id });
    if (!findOne) {
      throw new HttpException('Personal no encontrado', 404);
    }

    await this.personalRepository.update(id, { estado: false });

    return {
      message: 'Personal eliminado exitosamente',
      status: 200,
      data: null,
    };
  }
}
