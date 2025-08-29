import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Programa {
    @PrimaryGeneratedColumn()
    programaId: number;

    @Column()
    nombre: string;

    @Column()
    descripcion: string;

    @Column({ default: true })
    estado: boolean;

}
