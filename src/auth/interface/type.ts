import { Request } from 'express';

export interface JwtPayload {
  user: string;
  role: string;
  iat: number;
}

export interface RequestUser extends Request {
  user: JwtPayload;
}
