import { Auth } from '../../../auth/entities/auth.entity';
import { Modulo } from "../../../ayuda/modulo/entities/modulo.entity";
import { Prioridad } from "../../..//ayuda/prioridad/entities/prioridad.entity";
import { TipoConsulta } from "../../..//ayuda/tipo-consulta/entities/tipo-consulta.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Relation } from "typeorm";

@Entity()
export class Consulta {

    @PrimaryGeneratedColumn()
    consultaId: number;

    @Column()
    asunto: string;

    @Column()
    descripcion: string;

    @Column()
    correo: string;

    @Column()
    telefono: string;

    @Column({default: true})
    estado: boolean;

    @ManyToOne(()=> Modulo, (modulo) => modulo.consultas)
    modulo: Modulo;

    @ManyToOne(() => Prioridad, (prioridad) => prioridad.consultas)
    prioridad: Prioridad;

    @ManyToOne(() => TipoConsulta, (tipo) => tipo.consultas)
    tipo: TipoConsulta;

    @ManyToOne(() => Auth, (auth) => auth.consultas)
    user: Relation<Auth>;
}
