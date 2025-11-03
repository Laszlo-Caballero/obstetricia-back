import { Request } from 'express';
import { RolesEnum } from '../enum/roles';

export interface JwtPayload {
  userId: number;
  user: string;
  role: RolesEnum;
  postaId?: number;
  iat: number;
}

export interface RequestUser extends Request {
  user: JwtPayload;
}

export interface OtpPayload {
  code: string;
  userId: number;
  postaId: number;
  email: string;
  payload_jwt: {
    userId: number;
    user: string;
    role: string;
    postaId: number;
  };
}

export interface User {
  userId: number;
  user: string;
  password: string;
  personal: Personal;
  role: Role;
  recurso: Recurso;
}

export interface Personal {
  personalId: number;
  nombre: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  fechaNacimiento: string;
  correo: string;
  sexo: string;
  telefono: string;
  dni: string;
  codigoColegio: string;
  estado: boolean;
  nota: string;
}

export interface Role {
  roleId: number;
  roleName: string;
}

export interface Recurso {
  recursoId: number;
  nombre: string;
  extension: string;
  url: string;
  fechaSubida: string;
}
