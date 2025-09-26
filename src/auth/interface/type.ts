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

export interface OtpPayload {
  code: string;
  userId: number;
  postaId: number;
  payload_jwt: {
    userId: number;
    user: string;
    role: string;
    postaId: number;
  };
}
