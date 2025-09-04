import { IsNotEmpty, IsString } from "class-validator"

export class CreatePrioridadDto {
    @IsString()
    @IsNotEmpty()
    nombre: string

}
