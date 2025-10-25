import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Cita } from '../../cita/entities/cita.entity';

@Entity()
export class Paciente {
  @PrimaryGeneratedColumn()
  pacienteId: number;

  @Column()
  dni: string;

  @Column()
  nombres: string;

  @Column()
  apellido_paterno: string;

  @Column()
  apellido_materno: string;

  @Column()
  fecha_nacimiento: Date;

  @Column({ default: '' })
  telefono: string;

  @Column({ default: '' })
  nota: string;

  @Column({ default: '' })
  sexo: string;

  @Column()
  direccion: string;

  @Column()
  departamento: string;

  @Column()
  provincia: string;

  @Column()
  distrito: string;

  @Column({ default: true })
  estado: boolean;

  @OneToMany(() => Cita, (cita) => cita.paciente)
  citas: Cita[];
}
