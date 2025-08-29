import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { RolesEnum } from '../enum/roles';
import { ROLES_KEY } from './roles.decorator';
import { RolesGuard } from '../roles.guard';
import { JwtAuthGuard } from '../jwt-auth.guard';

export function Auth(role?: RolesEnum) {
  return applyDecorators(
    SetMetadata(ROLES_KEY, role),
    UseGuards(JwtAuthGuard, RolesGuard),
  );
}
