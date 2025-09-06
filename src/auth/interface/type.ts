import { Request } from 'express';

export interface JwtPayload {
  userId: number;
  user: string;
  role: string;
  postaId?: number;
  iat: number;
}

export interface RequestUser extends Request {
  user: JwtPayload;
}
