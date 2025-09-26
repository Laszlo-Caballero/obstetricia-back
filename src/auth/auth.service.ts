import { HttpException, Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { Auth } from './entities/auth.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { hash, compare } from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import { Roles } from 'src/role/entities/roles.entity';
import { SetRoleDto } from './dto/setRole.dto';
import { Personal } from 'src/personal/entities/personal.entity';
import { Recurso } from 'src/recurso/entities/recurso.entity';
import { OtpPayload, RequestUser } from './interface/type';
import { TokenDto } from './dto/token.dto';
import axios from 'axios';
import { ProfileDto } from './dto/profile.dto';
import { PasswordDto } from './dto/password.dto';
import { RedisService } from 'src/redis/redis.service';
import { Resend } from 'resend';
import { emailTemplate } from './template/template';
import crypto from 'crypto';
import uuid from 'uuid';
import { OtpDto } from './dto/otpDto';

@Injectable()
export class AuthService {
  private readonly resend: Resend;

  constructor(
    @InjectRepository(Auth)
    private readonly authRepository: Repository<Auth>,
    @InjectRepository(Recurso)
    private readonly recursoRepository: Repository<Recurso>,
    @InjectRepository(Roles)
    private readonly rolesRepository: Repository<Roles>,
    @InjectRepository(Personal)
    private readonly personalRepository: Repository<Personal>,
    private readonly jwtService: JwtService,
    private readonly redisService: RedisService,
  ) {
    this.resend = new Resend(process.env.RESEND_API_KEY);
  }

  async verifyCaptcha(tokenDto: TokenDto) {
    try {
      const res = await axios.post(
        `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.CAPTCHA_SECRET_KEY}&response=${tokenDto.token}`,
      );
      if (!res.data.success) {
        throw new HttpException('Captcha verification failed', 400);
      }

      return {
        status: 200,
        message: 'Captcha verified successfully',
        data: null,
      };
    } catch {
      throw new HttpException('Captcha verification failed', 400);
    }
  }

  async getProfile(data: RequestUser) {
    const foundUser = await this.authRepository.findOne({
      where: { userId: data.user.userId },
      relations: ['personal', 'role', 'personal.posta', 'recurso'],
    });

    return {
      status: 200,
      message: 'Profile fetched successfully',
      data: foundUser,
    };
  }

  async register(createAuthDto: CreateAuthDto) {
    const { personalId, roleId, password } = createAuthDto;

    const findPersonal = await this.personalRepository.findOne({
      where: { personalId: personalId },
    });

    if (!findPersonal) {
      throw new HttpException('Personal not found', 404);
    }

    let findRecurso;

    if (!createAuthDto.recursoId) {
      findRecurso = await this.recursoRepository.findOneBy({
        nombre: 'gato',
      });
    } else {
      findRecurso = await this.recursoRepository.findOne({
        where: { recursoId: createAuthDto.recursoId },
      });
    }

    if (!findRecurso) {
      throw new HttpException('Default recurso not found', 404);
    }

    const findRole = await this.rolesRepository.findOne({
      where: { roleId: roleId },
    });

    if (!findRole) {
      throw new HttpException('Role not found', 404);
    }

    const hashPassword = await hash(password, 10);

    const newAuth = this.authRepository.create({
      password: hashPassword,
      user: createAuthDto.user,
      personal: findPersonal,
      recurso: findRecurso,
      role: findRole,
    });
    await this.authRepository.insert(newAuth);

    await this.personalRepository.update(findPersonal.personalId, {
      user: newAuth,
    });

    const payload = {
      userId: newAuth.userId,
      user: newAuth.user,
      role: newAuth.role.roleName,
      postaId: null,
    };

    const token = this.jwtService.sign(payload);

    return {
      status: 200,
      message: 'User registered successfully',
      token,
      data: { ...newAuth, token },
    };
  }

  async login(loginDto: LoginDto) {
    const { user, password, postaId } = loginDto;

    const foundUser = await this.authRepository.findOne({
      where: { user: user },
      relations: ['personal', 'role', 'personal.posta', 'recurso'],
    });

    if (!foundUser) {
      throw new HttpException('User not found', 404);
    }

    const isPasswordValid = await compare(password, foundUser.password);

    if (!isPasswordValid) {
      throw new HttpException('Invalid password', 401);
    }

    const posta = foundUser.personal.posta.find((p) => p.postaId === postaId);

    if (!posta && foundUser.role.roleName !== 'Administrador') {
      throw new HttpException('Posta not found', 404);
    }

    const code = crypto.randomInt(100000, 1000000).toString();

    const { error } = await this.resend.emails.send({
      from: 'Obstetra <noreply@resend.dev>',
      to: foundUser.personal.correo,
      subject: 'Nuevo inicio de sesión',
      html: emailTemplate(code),
    });

    if (error) {
      throw new HttpException(
        `Error al enviar el correo: ${error.message}`,
        500,
      );
    }

    const payload_redis = {
      code,
      userId: foundUser.userId,
      postaId: postaId,
      payload_jwt: {
        userId: foundUser.userId,
        user: foundUser.user,
        role: foundUser.role.roleName,
        postaId: posta ? posta.postaId : 0,
      },
    };

    const code_otp = uuid.v4();

    await this.redisService.setWithExpiry(code_otp, payload_redis, 600);

    return {
      status: 200,
      message: 'Login successful',
      data: {
        ...foundUser,
        personal: {
          ...foundUser.personal,
          posta: posta ? posta : null,
        },
        code_otp,
        // token,
      },
    };
  }

  async verifyOtp(otpDto: OtpDto) {
    const { code, code_otp } = otpDto;

    const data = await this.redisService.get<OtpPayload>(code_otp);

    if (!data) {
      throw new HttpException('OTP expired or invalid', 400);
    }

    const isValid = data.code === code;

    if (!isValid) {
      throw new HttpException('Invalid OTP code', 400);
    }

    const token = this.jwtService.sign(data.payload_jwt);

    await this.redisService.del(code_otp);

    return {
      status: 200,
      message: 'OTP verified successfully',
      data: {
        token,
      },
    };
  }

  async setRole(setRoleDto: SetRoleDto) {
    const { personalId, roleId } = setRoleDto;

    const findPersonal = await this.personalRepository.findOne({
      where: { personalId: personalId },
      relations: ['user'],
    });

    if (!findPersonal) {
      throw new HttpException('Personal not found', 404);
    }

    const findRole = await this.rolesRepository.findOne({
      where: { roleId: roleId },
    });

    if (!findRole) {
      throw new HttpException('Role not found', 404);
    }

    if (!findPersonal.user) {
      throw new HttpException('Personal has no associated user', 404);
    }

    await this.authRepository.update(findPersonal.user.userId, {
      role: findRole,
    });

    return {
      status: 200,
      message: 'Role updated successfully',
      data: null,
    };
  }

  async updateFoto(req: RequestUser, foto: Express.Multer.File) {
    const foundUser = await this.authRepository.findOne({
      where: { userId: req.user.userId },
      relations: ['personal'],
    });

    if (!foundUser) {
      throw new HttpException('User not found', 404);
    }

    const newRecurso = this.recursoRepository.create({
      nombre: foto.filename,
      extension: foto.filename.split('.').pop(),
      url: `/static/foto/${foto.filename}`,
    });

    await this.recursoRepository.insert(newRecurso);

    await this.authRepository.update(foundUser.userId, {
      recurso: newRecurso,
    });

    const updatedUser = await this.authRepository.findOne({
      where: { userId: req.user.userId },
      relations: ['personal', 'role', 'personal.posta', 'recurso'],
    });

    const posta = updatedUser?.personal.posta.find(
      (p) => p.postaId === req.user.postaId,
    );

    return {
      status: 200,
      message: 'Foto updated successfully',
      data: {
        ...updatedUser,
        personal: {
          ...updatedUser?.personal,
          posta: posta ? posta : null,
        },
      },
    };
  }

  async registerAdmin() {
    const findRecurso = await this.recursoRepository.findOneBy({
      nombre: 'gato',
    });
    if (!findRecurso) {
      throw new HttpException('Default recurso not found', 404);
    }

    const newPersonal = this.personalRepository.create({
      apellidoMaterno: 'Admin',
      apellidoPaterno: 'Admin',
      nombre: 'Admin',
      sexo: 'Macho men',
      dni: '70672402',
      fechaNacimiento: new Date('1999-01-01'),
      telefono: '000000000',
      codigoColegio: '0000',
      estado: true,
    });

    await this.personalRepository.insert(newPersonal);

    const hasPassword = await hash('Admin123', 10);

    const findRole = await this.rolesRepository.findOne({
      where: { roleName: 'Administrador' },
    });

    if (!findRole) {
      throw new HttpException('Role not found', 404);
    }

    const newAdmin = this.authRepository.create({
      password: hasPassword,
      personal: newPersonal,
      user: 'Admin',
      role: findRole,
      recurso: findRecurso,
    });

    await this.authRepository.insert(newAdmin);

    await this.personalRepository.update(newPersonal.personalId, {
      user: newAdmin,
    });

    const payload = {
      user: newAdmin.user,
      role: findRole.roleName,
    };

    const token = this.jwtService.sign(payload);

    return {
      status: 200,
      message: 'Admin registered successfully',
      data: newAdmin,
      token: token,
    };
  }
  validateUser(data: RequestUser) {
    return {
      message: 'Usuario validado correctamente',
      status: true,
      role: data.user.role,
    };
  }

  async updateProfile(data: ProfileDto, req: RequestUser) {
    const foundUser = await this.personalRepository.findOne({
      where: { user: { userId: req.user.userId } },
    });
    if (!foundUser) {
      throw new HttpException('User not found', 404);
    }

    await this.personalRepository.update(foundUser.personalId, {
      ...data,
    });
    const updatedUser = await this.authRepository.findOne({
      where: { userId: req.user.userId },
    });
    return {
      status: 200,
      message: 'Profile updated successfully',
      data: updatedUser,
    };
  }

  async changePassword(req: RequestUser, passwordDto: PasswordDto) {
    const { previousPassword, newPassword } = passwordDto;

    const foundUser = await this.authRepository.findOne({
      where: { userId: req.user.userId },
    });

    if (!foundUser) {
      throw new HttpException('User not found', 404);
    }

    const isPasswordValid = await compare(previousPassword, foundUser.password);

    if (!isPasswordValid) {
      throw new HttpException('Previous password is incorrect', 400);
    }

    const hashedNewPassword = await hash(newPassword, 10);

    await this.authRepository.update(foundUser.userId, {
      password: hashedNewPassword,
    });

    return {
      status: 200,
      message: 'Password changed successfully',
      data: null,
    };
  }
}
