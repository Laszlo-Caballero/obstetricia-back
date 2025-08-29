import { Controller, Body, Post, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { LoginDto } from './dto/login.dto';
import { Auth } from './decorators/auth.decorator';
import { RolesEnum } from './enum/roles';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.register(createAuthDto);
  }

  @Post('login')
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Post('admin')
  registerAdmin() {
    return this.authService.registerAdmin();
  }

  @Auth(RolesEnum.Obstetra)
  @Get('profile')
  getProfile() {
    return 'User Profile';
  }
}
