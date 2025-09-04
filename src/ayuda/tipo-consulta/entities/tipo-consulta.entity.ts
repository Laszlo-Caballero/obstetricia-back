import { Consulta } from "../../../ayuda/consulta/entities/consulta.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class TipoConsulta {
    @PrimaryGeneratedColumn()
    tipoId: number;

    @Column()
    nombre: string;

    @Column()
    descripcion: string;

    @Column({default: true})
    estado:boolean

    @OneToMany(()=> Consulta, (consulta) => consulta.tipo)
    consultas: Consulta[]
}
