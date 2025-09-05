import { HttpException, Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { Auth } from './entities/auth.entity';
import { Like, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { hash, compare } from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import { Roles } from 'src/role/entities/roles.entity';
import { SetRoleDto } from './dto/setRole.dto';
import { Personal } from 'src/personal/entities/personal.entity';
import { Recurso } from 'src/recurso/entities/recurso.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Auth)
    private readonly authRepository: Repository<Auth>,
    @InjectRepository(Recurso)
    private readonly recursoRepository: Repository<Recurso>,
    @InjectRepository(Roles)
    private readonly rolesRepository: Repository<Roles>,
    @InjectRepository(Personal)
    private readonly personalRepository: Repository<Personal>,
    private jwtService: JwtService,
  ) {}

  async register(createAuthDto: CreateAuthDto) {
    const { personalId, password } = createAuthDto;

    const findPersonal = await this.personalRepository.findOne({
      where: { personalId: personalId },
    });

    if (!findPersonal) {
      throw new HttpException('Personal not found', 404);
    }

    let findRecurso;
    console.log(createAuthDto.recursoId);

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

    const hashPassword = await hash(password, 10);

    const newAuth = this.authRepository.create({
      password: hashPassword,
      user: createAuthDto.user,
      personal: findPersonal,
      recurso: findRecurso,
    });
    await this.authRepository.insert(newAuth);

    await this.personalRepository.update(findPersonal.personalId, {
      user: newAuth,
    });

    const payload = { user: newAuth.user, role: '' };

    const token = this.jwtService.sign(payload);

    return {
      status: 200,
      message: 'User registered successfully',
      data: newAuth,
      token,
    };
  }

  async login(loginDto: LoginDto) {
    const { user, password } = loginDto;

    const foundUser = await this.authRepository.findOne({
      where: { user: user },
      relations: ['personal', 'role'],
    });

    if (!foundUser) {
      throw new HttpException('User not found', 404);
    }

    const isPasswordValid = await compare(password, foundUser.password);

    if (!isPasswordValid) {
      throw new HttpException('Invalid password', 401);
    }

    const payload = {
      user: foundUser.user,
      role: foundUser.role.roleName,
    };

    const token = this.jwtService.sign(payload);

    return {
      status: 200,
      message: 'Login successful',
      data: foundUser,
      token,
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

  async registerAdmin() {
    const findRecurso = await this.recursoRepository.findOneBy({
      nombre: Like('%gato%'),
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
}
