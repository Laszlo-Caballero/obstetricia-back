import {
  Controller,
  Body,
  Post,
  Get,
  Patch,
  Req,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { LoginDto } from './dto/login.dto';
import { Auth } from './decorators/auth.decorator';
import { RolesEnum } from './enum/roles';
import { SetRoleDto } from './dto/setRole.dto';
import { RequestUser } from './interface/type';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { join } from 'path';
import { TokenDto } from './dto/token.dto';
import { ProfileDto } from './dto/profile.dto';
import { PasswordDto } from './dto/password.dto';
import { OtpDto } from './dto/otpDto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  // @Auth(RolesEnum.Administrador)
  @Post('register')
  register(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.register(createAuthDto);
  }

  @Post('login')
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Post('verify-otp')
  verifyOtp(@Body() otpDto: OtpDto) {
    return this.authService.verifyOtp(otpDto);
  }

  @Post('resend-otp')
  resendOtp(@Body('code_otp') code_otp: string) {
    return this.authService.resendOtp(code_otp);
  }

  @Post('admin')
  registerAdmin() {
    return this.authService.registerAdmin();
  }

  @Post('verify-captcha')
  verifyCaptcha(@Body() tokenDto: TokenDto) {
    return this.authService.verifyCaptcha(tokenDto);
  }

  @Auth(RolesEnum.Administrador)
  @Patch('set-role')
  setRole(@Body() setRoleDto: SetRoleDto) {
    return this.authService.setRole(setRoleDto);
  }

  @Auth()
  @Get('profile')
  getProfile(@Req() req: RequestUser) {
    return this.authService.getProfile(req);
  }

  @Auth()
  @Get('validate')
  validateToken(@Req() req: RequestUser) {
    return this.authService.validateUser(req);
  }

  @Auth()
  @Post('update-foto')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: join(__dirname, '../../public', 'foto'),
        filename: (req, file, cb) => {
          const fix = Date.now();
          const [fileName, ext] = file.originalname.split('.');
          const name = `${fileName}-${fix}.${ext}`;
          cb(null, name);
        },
      }),
    }),
  )
  updateFoto(
    @Req() req: RequestUser,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.authService.updateFoto(req, file);
  }

  @Auth()
  @Patch('update-profile')
  updateProfile(@Req() req: RequestUser, @Body() body: ProfileDto) {
    return this.authService.updateProfile(body, req);
  }

  @Auth()
  @Patch('update-password')
  updatePassword(@Req() req: RequestUser, @Body() body: PasswordDto) {
    return this.authService.changePassword(req, body);
  }
}
