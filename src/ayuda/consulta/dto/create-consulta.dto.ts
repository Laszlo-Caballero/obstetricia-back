import {
    IsNotEmpty,
    IsNumber,
    IsString,
} from 'class-validator';

export class CreateConsultaDto {
    @IsString()
    @IsNotEmpty()
    asunto: string;

    @IsString()
    @IsNotEmpty()
    descripcion: string;

    @IsString()
    @IsNotEmpty()
    correo: string;

    @IsString()
    @IsNotEmpty()
    telefono: string;

    @IsNumber()
    @IsNotEmpty()
    moduloId: number;

    @IsNumber()
    @IsNotEmpty()
    tipoId: number;

    @IsNumber()
    @IsNotEmpty()
    prioridadId: number;

    @IsNumber()
    @IsNotEmpty()
    userId: number;
}
