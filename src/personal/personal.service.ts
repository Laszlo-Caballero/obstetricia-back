import { HttpException, Injectable } from '@nestjs/common';
import { CreatePersonalDto } from './dto/create-personal.dto';
import { UpdatePersonalDto } from './dto/update-personal.dto';
import { Like, Repository } from 'typeorm';
import { Personal } from './entities/personal.entity';
import { Turno } from 'src/turnos/entities/turno.entity';
import { Posta } from 'src/posta/entities/posta.entity';
import { TipoPersonal } from 'src/tipo-personal/entities/tipo-personal.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { MotivoDto } from 'src/motivos/dto/motivo.dto';
import { Motivo } from 'src/motivos/entities/motivo.entity';

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
    @InjectRepository(Motivo)
    private readonly motivoRepository: Repository<Motivo>,
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

    const posta = await Promise.all(
      postaId.map(async (id) => {
        const posta = await this.postaRepository.findOneBy({ postaId: id });
        if (!posta) {
          throw new HttpException(`Posta con ID ${id} no encontrada`, 404);
        }

        return posta;
      }),
    );

    if (!posta || posta.length !== postaId.length) {
      throw new HttpException('Posta no encontrada', 404);
    }

    const newPersonal = this.personalRepository.create({
      ...personal,
      turno,
      tipoPersonal,
      posta,
    });

    await this.personalRepository.save(newPersonal);

    return {
      message: 'Personal creado exitosamente',
      status: 201,
      data: newPersonal,
    };
  }

  async findAll(
    limit: number = 10,
    page: number = 1,
    search?: string,
    tipoPersonalId?: number,
  ) {
    const [personal, totalItems] = await this.personalRepository.findAndCount({
      where: {
        ...(search && { nombres: Like(`%${search}%`) }),
        ...(tipoPersonalId && { tipoPersonal: { tipoPersonalId } }),
      },
      relations: ['turno', 'tipoPersonal', 'posta', 'user', 'motivos'],
      take: limit,
      skip: (page - 1) * limit,
    });
    return {
      message: 'Personal encontrado exitosamente',
      status: 200,
      data: personal,
      metadata: {
        totalItems,
        totalPages: Math.ceil(totalItems / limit),
        currentPage: page,
      },
    };
  }

  async findOne(id: number) {
    const personal = await this.personalRepository.findOne({
      where: { personalId: id },
      relations: ['turno', 'tipoPersonal', 'posta', 'user', 'motivos'],
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
    let findOne = await this.personalRepository.findOneBy({ personalId: id });
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

    const posta = await Promise.all(
      postaId!.map(async (id) => {
        const posta = await this.postaRepository.findOneBy({ postaId: id });
        if (!posta) {
          throw new HttpException(`Posta con ID ${id} no encontrada`, 404);
        }

        return posta;
      }),
    );

    if (!posta || posta.length !== postaId!.length) {
      throw new HttpException('Posta no encontrada', 404);
    }

    findOne = {
      ...findOne,
      ...personal,
      turno,
      tipoPersonal,
      posta,
    };

    // await this.personalRepository.update(id, {
    //   ...personal,
    //   turno,
    //   tipoPersonal,
    // });

    await this.personalRepository.save(findOne);

    return {
      message: 'Personal actualizado exitosamente',
      status: 200,
      data: null,
    };
  }

  async remove(id: number, motivoDto: MotivoDto) {
    const findPersonal = await this.personalRepository.findOne({
      where: { personalId: id },
    });

    if (!findPersonal) {
      throw new HttpException('Personal no encontrado', 404);
    }

    const newMotivo = this.motivoRepository.create({
      personal: findPersonal,
      razon: motivoDto.razon,
      nombreTabla: 'Personal',
    });

    await this.motivoRepository.insert(newMotivo);

    await this.personalRepository.update(id, { estado: false });

    const [personal, totalItems] = await this.personalRepository.findAndCount({
      relations: ['turno', 'tipoPersonal', 'posta', 'user', 'motivos'],
      take: 10,
    });

    return {
      status: 200,
      message: 'OK',
      data: personal,
      metadata: {
        totalItems,
        totalPages: Math.ceil(totalItems / 10),
        currentPage: 1,
      },
    };
  }
}
