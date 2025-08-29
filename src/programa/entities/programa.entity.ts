import { Enfermera } from 'src/enfermeras/entities/enfermera.entity';
import { Obstetra } from 'src/obstetra/entities/obstetra.entity';
import { OneToMany } from 'typeorm';

export class Programa {
  @OneToMany(() => Enfermera, (enfermera) => enfermera.programa)
  enfermeras: Enfermera[];

  @OneToMany(() => Obstetra, (obstetra) => obstetra.programa)
  obstetras: Obstetra[];
}
