import { Consulta } from "../../..//ayuda/consulta/entities/consulta.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Prioridad {
    @PrimaryGeneratedColumn()
    prioridadId: number;

    @Column()
    nombre: string;

    @Column({default: true})
    estado: boolean;

    @OneToMany(()=> Consulta, (consulta) => consulta.prioridad)
    consultas: Consulta[]
}
