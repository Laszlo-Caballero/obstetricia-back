import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsString,
  ValidateNested,
} from 'class-validator';
import { CreateRecetaMedicinaDto } from 'src/farmacia/receta-medicina/dto/create-receta-medicina.dto';

export class CreateRecetaDto {
  @IsString()
  @IsNotEmpty()
  detalle: string;

  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => CreateRecetaMedicinaDto)
  @IsNotEmpty({ each: true })
  recetasMedicinas: CreateRecetaMedicinaDto[];
}
