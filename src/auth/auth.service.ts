import { HttpException, Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { Auth } from './entities/auth.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Obstetra } from 'src/obstetra/entities/obstetra.entity';
import { hash, compare } from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import { Roles } from 'src/role/entities/roles.entity';
import { SetRoleDto } from './dto/setRole.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Auth)
    private readonly authRepository: Repository<Auth>,

    @InjectRepository(Roles)
    private readonly rolesRepository: Repository<Roles>,
    @InjectRepository(Obstetra)
    private readonly obstetraRepository: Repository<Obstetra>,
    private jwtService: JwtService,
  ) {}

  async register(createAuthDto: CreateAuthDto) {
    const { obstetraId, password } = createAuthDto;

    const findObstetra = await this.obstetraRepository.findOne({
      where: { obstetraId: obstetraId },
    });

    if (!findObstetra) {
      throw new HttpException('Obstetra not found', 404);
    }

    const hashPassword = await hash(password, 10);

    const newAuth = this.authRepository.create({
      password: hashPassword,
      obstetra: findObstetra,
      user: createAuthDto.user,
    });
    await this.authRepository.insert(newAuth);

    await this.obstetraRepository.update(findObstetra.obstetraId, {
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
      relations: ['obstetra', 'role'],
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
    const { obstetraId, roleId } = setRoleDto;

    const findObstetra = await this.obstetraRepository.findOne({
      where: { obstetraId: obstetraId },
      relations: ['user'],
    });

    if (!findObstetra) {
      throw new HttpException('Obstetra not found', 404);
    }

    const findRole = await this.rolesRepository.findOne({
      where: { roleId: roleId },
    });

    if (!findRole) {
      throw new HttpException('Role not found', 404);
    }

    if (!findObstetra.user) {
      throw new HttpException('Obstetra has no associated user', 404);
    }

    await this.authRepository.update(findObstetra.user.userId, {
      role: findRole,
    });

    return {
      status: 200,
      message: 'Role updated successfully',
      data: null,
    };
  }

  async registerAdmin() {
    const newObstetra = this.obstetraRepository.create({
      apellido_materno: 'Admin',
      apellido_paterno: 'Admin',
      nombre: 'Admin',
      cop: '0000',
      titulo: 'Administrador',
    });

    await this.obstetraRepository.insert(newObstetra);

    const hasPassword = await hash('Admin123', 10);

    const findRole = await this.rolesRepository.findOne({
      where: { roleName: 'Administrador' },
    });

    if (!findRole) {
      throw new HttpException('Role not found', 404);
    }

    const newAdmin = this.authRepository.create({
      password: hasPassword,
      obstetra: newObstetra,
      user: 'Admin',
      role: findRole,
    });

    await this.authRepository.insert(newAdmin);

    await this.obstetraRepository.update(newObstetra.obstetraId, {
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
