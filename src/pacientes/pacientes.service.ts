import { HttpException, Injectable } from '@nestjs/common';
import { CreatePacienteDto } from './dto/create-paciente.dto';
import { UpdatePacienteDto } from './dto/update-paciente.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Paciente } from './entities/paciente.entity';
import { Like, Repository } from 'typeorm';
import { Workbook } from 'exceljs';
import { isValid, parse } from 'date-fns';

@Injectable()
export class PacientesService {
  constructor(
    @InjectRepository(Paciente)
    private readonly pacienteRepository: Repository<Paciente>,
  ) {}

  async create(createPacienteDto: CreatePacienteDto) {
    const findDni = await this.pacienteRepository.findOneBy({
      dni: createPacienteDto.dni,
    });

    if (findDni) {
      throw new HttpException('El DNI ya está registrado', 400);
    }

    const newPaciente = this.pacienteRepository.create(createPacienteDto);

    await this.pacienteRepository.insert(newPaciente);

    const [dbPaciente, totalItems] = await this.pacienteRepository.findAndCount(
      {
        relations: ['citas'],
        take: 10,
      },
    );

    return {
      status: 201,
      message: 'Paciente creado exitosamente',
      data: dbPaciente,
      metadata: {
        totalItems,
        totalPages: Math.ceil(totalItems / 10),
        currentPage: 1,
      },
    };
  }

  async findAll(
    limit: number = 10,
    page: number = 1,
    status?: boolean,
    search?: string,
    dni?: string,
  ) {
    const [dbPaciente, totalItems] = await this.pacienteRepository.findAndCount(
      {
        relations: ['citas'],
        take: limit,
        skip: (page - 1) * limit,
        where: {
          ...(status !== undefined && { estado: status }),
          ...(search && { nombres: Like(`%${search}%`) }),
          ...(dni && { dni: Like(`%${dni}%`) }),
        },
      },
    );

    return {
      status: 200,
      message: 'Lista de pacientes',
      data: dbPaciente,
      metadata: {
        totalItems,
        totalPages: Math.ceil(totalItems / limit),
        currentPage: page,
      },
    };
  }

  async findOne(dni: string) {
    const paciente = await this.pacienteRepository.findOne({
      relations: ['citas'],
      where: { dni },
    });

    if (!paciente) {
      throw new HttpException('Paciente no encontrado', 404);
    }

    return {
      status: 200,
      message: 'Paciente encontrado',
      data: paciente,
    };
  }

  async update(id: number, updatePacienteDto: UpdatePacienteDto) {
    const paciente = await this.pacienteRepository.findOneBy({
      pacienteId: id,
    });

    if (!paciente) {
      throw new HttpException('Paciente no encontrado', 404);
    }

    await this.pacienteRepository.update(id, updatePacienteDto);

    return {
      status: 200,
      message: 'Paciente actualizado exitosamente',
      data: null,
    };
  }

  async remove(id: number) {
    const paciente = await this.pacienteRepository.findOneBy({
      pacienteId: id,
    });

    if (!paciente) {
      throw new HttpException('Paciente no encontrado', 404);
    }

    await this.pacienteRepository.update(id, { estado: false });

    return {
      status: 200,
      message: 'Paciente eliminado exitosamente',
      data: null,
    };
  }

  async importExcel(file: Express.Multer.File) {
    if (!file) {
      throw new HttpException('No se ha subido ningún archivo', 400);
    }

    const workbook = new Workbook();

    const buffer = Buffer.from(file.buffer);
    // @ts-expect-error: exceljs types do not recognize Buffer input for load method
    await workbook.xlsx.load(buffer);

    const worksheet = workbook.getWorksheet('paciente');

    const pacientes: CreatePacienteDto[] = [];

    worksheet?.eachRow((row, rowNumber) => {
      if (rowNumber === 1) return;
      const dni = row.getCell(1)?.text?.trim();
      const apellido_paterno = row.getCell(2)?.text?.trim();
      const apellido_materno = row.getCell(3)?.text?.trim();
      const nombres = row.getCell(4)?.text?.trim();
      const fecha_nacimiento = row.getCell(5)?.text?.trim();
      const direccion = row.getCell(6)?.text?.trim();
      const departamento = row.getCell(8)?.text?.trim();
      const provincia = row.getCell(9)?.text?.trim();
      const distrito = row.getCell(10)?.text?.trim();

      const isValidDate = isValid(
        parse(fecha_nacimiento, 'dd/MM/yyyy', new Date()),
      );

      const telefono = '';

      const newPaciente: CreatePacienteDto = {
        apellido_materno,
        apellido_paterno,
        departamento,
        direccion,
        dni,
        distrito,
        fecha_nacimiento: isValidDate
          ? parse(fecha_nacimiento, 'dd/MM/yyyy', new Date())
          : new Date(),
        nombres,
        provincia,
        telefono,
        nota: '',
      };
      pacientes.push(newPaciente);
    });
    await Promise.all(
      pacientes.map(async (paciente) => {
        const newPaciente = this.pacienteRepository.create(paciente);

        await this.pacienteRepository.insert(newPaciente);
      }),
    );

    return {
      status: 201,
      message: 'Pacientes importados exitosamente',
      data: null,
    };
  }
}
