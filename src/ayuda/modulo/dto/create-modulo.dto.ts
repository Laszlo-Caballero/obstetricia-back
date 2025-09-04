import { IsNotEmpty, IsString } from "class-validator";

export class CreateModuloDto {
    @IsString()
    @IsNotEmpty()
    nombre: string

    @IsString()
    @IsNotEmpty()
    descripcion: string
}
