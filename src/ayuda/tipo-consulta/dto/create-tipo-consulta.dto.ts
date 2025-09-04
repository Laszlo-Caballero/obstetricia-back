import { IsNotEmpty, IsString } from "class-validator";

export class CreateTipoConsultaDto {
    @IsString()
    @IsNotEmpty()
    nombre: string

    @IsString()
    @IsNotEmpty()
    descripcion: string
}
