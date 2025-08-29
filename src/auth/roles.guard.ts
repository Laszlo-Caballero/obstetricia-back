import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { RolesEnum } from './enum/roles';
import { ROLES_KEY } from './decorators/roles.decorator';
import { RequestUser } from './interface/type';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext) {
    const requiredRole = this.reflector.getAllAndOverride<RolesEnum>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!requiredRole) {
      return true;
    }
    const { user } = context.switchToHttp().getRequest<RequestUser>();

    if ((user.role as RolesEnum) === RolesEnum.Administrador) {
      return true;
    }

    return (user.role as RolesEnum) === requiredRole;
  }
}
