import { IsNumber, IsPositive } from 'class-validator';

export class SetRoleDto {
  @IsNumber()
  @IsPositive()
  obstetraId: number;

  @IsNumber()
  @IsPositive()
  roleId: number;
}
