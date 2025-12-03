import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCitaDto } from './dto/create-cita.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Receta } from 'src/farmacia/receta/entities/receta.entity';
import { Repository } from 'typeorm';
import { Cita } from './entities/cita.entity';
import { Personal } from 'src/personal/entities/personal.entity';
import { Paciente } from 'src/pacientes/entities/paciente.entity';
import { PruebaLaboratorio } from 'src/prueba-laboratorio/entities/prueba-laboratorio.entity';
import { Diagnostico } from 'src/diagnostico/entities/diagnostico.entity';
import { Programa } from 'src/programa/entities/programa.entity';
import { JwtPayload } from 'src/auth/interface/type';
import { Turno } from 'src/turnos/entities/turno.entity';
import { QueryCitaDto } from './dto/query.dto';
import { Motivo } from 'src/motivos/entities/motivo.entity';
import { MotivoDto } from 'src/motivos/dto/motivo.dto';
import { CompleteCitaDto } from './dto/complete-cita.dto';
import { RecetaMedicina } from 'src/farmacia/receta-medicina/entities/receta-medicina.entity';
import { Medicina } from 'src/farmacia/medicina/entities/medicina.entity';
import { Recurso } from 'src/recurso/entities/recurso.entity';

@Injectable()
export class CitaService {
  constructor(
    @InjectRepository(Receta)
    private readonly recetaRepository: Repository<Receta>,
    @InjectRepository(Cita)
    private readonly citaRepository: Repository<Cita>,
    @InjectRepository(Personal)
    private readonly personalRepository: Repository<Personal>,
    @InjectRepository(Paciente)
    private readonly pacienteRepository: Repository<Paciente>,
    @InjectRepository(PruebaLaboratorio)
    private readonly pruebaLaboratorioRepository: Repository<PruebaLaboratorio>,
    @InjectRepository(Diagnostico)
    private readonly diagnosticoRepository: Repository<Diagnostico>,
    @InjectRepository(Programa)
    private readonly programaRepository: Repository<Programa>,
    @InjectRepository(Turno)
    private readonly turnoRepository: Repository<Turno>,
    @InjectRepository(Motivo)
    private readonly motivoRepository: Repository<Motivo>,
    @InjectRepository(RecetaMedicina)
    private readonly recetaMedicinaRepository: Repository<RecetaMedicina>,
    @InjectRepository(Medicina)
    private readonly medicinaRepository: Repository<Medicina>,
    @InjectRepository(Recurso)
    private readonly recursoRepository: Repository<Recurso>,
  ) {}

  async createCita(createCitaDto: CreateCitaDto, user: JwtPayload) {
    const { pacienteId, personalId, programaId, turnoId, ...rest } =
      createCitaDto;

    const findCreatedBy = await this.personalRepository.findOneBy({
      personalId: user.userId,
    });

    if (!findCreatedBy) {
      throw new HttpException('Personal creador no encontrado', 404);
    }

    const findPaciente = await this.pacienteRepository.findOneBy({
      pacienteId,
    });

    if (!findPaciente) {
      throw new HttpException('Paciente no encontrado', 404);
    }
    const findPersonal = await this.personalRepository.findOneBy({
      personalId,
    });

    if (!findPersonal) {
      throw new HttpException('Personal no encontrado', 404);
    }

    const findPrograma = await this.programaRepository.findOneBy({
      programaId,
    });

    if (!findPrograma) {
      throw new HttpException('Programa no encontrado', 404);
    }

    const findTurno = await this.turnoRepository.findOneBy({
      turnoId,
    });

    if (!findTurno) {
      throw new HttpException('Turno no encontrado', 404);
    }

    const nuevaCita = this.citaRepository.create({
      ...rest,
      paciente: findPaciente,
      personal: findPersonal,
      creadoPor: findCreatedBy,
      programa: findPrograma,
      turno: findTurno,
    });

    const saveCita = await this.citaRepository.save(nuevaCita);

    return {
      message: 'Cita creada exitosamente',
      status: 200,
      data: saveCita,
    };
  }

  async findAll(query: QueryCitaDto) {
    const [findAllCitas, totalCitas] = await this.citaRepository.findAndCount({
      relations: ['paciente', 'personal', 'creadoPor', 'programa', 'turno'],
      skip: (query.page - 1) * query.limit,
      take: query.limit,
    });

    return {
      message: 'Citas retrieved successfully',
      data: findAllCitas,
      metadata: {
        totalItems: totalCitas,
        totalPages: Math.ceil(totalCitas / query.limit),
        currentPage: query.page,
      },
      status: HttpStatus.OK,
    };
  }

  async findOne(id: number) {
    const cita = await this.citaRepository.findOne({
      where: { citaId: id },
      relations: [
        'paciente',
        'personal',
        'creadoPor',
        'programa',
        'turno',
        'diagnosticos',
        'laboratorios',
        'receta',
        'receta.recetaMedicinas',
        'receta.recetaMedicinas.medicina',
        'motivos',
      ],
    });

    if (!cita) {
      throw new HttpException('Cita no encontrada', HttpStatus.NOT_FOUND);
    }

    return {
      message: 'Cita retrieved successfully',
      data: cita,
      status: HttpStatus.OK,
    };
  }

  async remove(id: number, motivo: MotivoDto) {
    const cita = await this.citaRepository.findOneBy({
      citaId: id,
    });

    if (!cita) {
      throw new HttpException('Cita no encontrada', HttpStatus.NOT_FOUND);
    }

    await this.citaRepository.update(id, { estado: 'Cancelada' });

    const newMotivo = this.motivoRepository.create({
      cita: cita,
      razon: motivo.razon,
      nombreTabla: 'Cita',
    });

    await this.motivoRepository.save(newMotivo);

    const [findAllCitas, totalCitas] = await this.citaRepository.findAndCount({
      relations: ['paciente', 'personal', 'creadoPor', 'programa', 'turno'],
      take: 10,
    });

    return {
      message: 'Cita removed successfully',
      data: findAllCitas,
      status: HttpStatus.OK,
      metadata: {
        totalItems: totalCitas,
        totalPages: Math.ceil(totalCitas / 10),
        currentPage: 1,
      },
    };
  }

  async completeCita(id: number, body: CompleteCitaDto) {
    const findCita = await this.citaRepository.findOneBy({
      citaId: id,
    });

    if (!findCita) {
      throw new HttpException('Cita no encontrada', HttpStatus.NOT_FOUND);
    }

    const { receta, diagnosticos, laboratorios } = body;

    const { detalle, recetasMedicinas } = receta;

    const nuevaReceta = this.recetaRepository.create({
      detalle,
      cita: findCita,
    });

    const savedReceta = await this.recetaRepository.save(nuevaReceta);

    await Promise.all(
      recetasMedicinas.map(async (rm) => {
        const { medicinaId, ...rest } = rm;
        const findMedicina = await this.medicinaRepository.findOneBy({
          medicinaId,
        });

        if (!findMedicina) {
          throw new HttpException(
            `Medicina con ID ${medicinaId} no encontrada`,
            HttpStatus.NOT_FOUND,
          );
        }

        const nuevaRecetaMedicina = this.recetaMedicinaRepository.create({
          medicina: findMedicina,
          receta: savedReceta,
          ...rest,
        });

        return this.recetaMedicinaRepository.save(nuevaRecetaMedicina);
      }),
    );

    const diagnosticosSave = await Promise.all(
      diagnosticos.map(async (diag) => {
        const nuevaDiagnostico = this.diagnosticoRepository.create({
          ...diag,
        });
        return this.diagnosticoRepository.save(nuevaDiagnostico);
      }),
    );

    findCita.diagnosticos = diagnosticosSave;

    const laboratoriosSave = await Promise.all(
      laboratorios.map(async (lab) => {
        const { estado, nombre, recursoId } = lab;

        let recurso: Recurso | null = null;
        if (recursoId) {
          const findRecurso = await this.recursoRepository.findOneBy({
            recursoId,
          });
          if (!findRecurso) {
            throw new HttpException(
              `Recurso de laboratorio con ID ${recursoId} no encontrado`,
              HttpStatus.NOT_FOUND,
            );
          }
          recurso = findRecurso;
        }

        const nuevaLaboratorio = this.pruebaLaboratorioRepository.create({
          estado,
          nombre,
          ...(recurso ? { documento: recurso } : {}),
        });

        return this.pruebaLaboratorioRepository.save(nuevaLaboratorio);
      }),
    );

    findCita.laboratorios = laboratoriosSave;
    findCita.estado = 'Completada';

    const updatedCita = await this.citaRepository.save(findCita);

    return {
      message: 'Cita completed successfully',
      data: updatedCita,
      status: HttpStatus.OK,
    };
  }
}
