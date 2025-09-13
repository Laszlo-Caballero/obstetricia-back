import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RedisService } from './redis/redis.service';
import { RedisModule } from './redis/redis.module';
import { AuthModule } from './auth/auth.module';
import { RoleModule } from './role/role.module';
import { TurnosModule } from './turnos/turnos.module';
import { PostaModule } from './posta/posta.module';
import { CitaModule } from './cita/cita.module';
import { PacientesModule } from './pacientes/pacientes.module';
import { PruebaLaboratorioModule } from './prueba-laboratorio/prueba-laboratorio.module';
import { RecetaModule } from './farmacia/receta/receta.module';
import { MedicinaModule } from './farmacia/medicina/medicina.module';
import { DiagnosticoModule } from './diagnostico/diagnostico.module';
import { ProgramaModule } from './programa/programa.module';
import { UtilsModule } from './utils/utils.module';
import { ModuloModule } from './ayuda/modulo/modulo.module';
import { PrioridadModule } from './ayuda/prioridad/prioridad.module';
import { TipoConsultaModule } from './ayuda/tipo-consulta/tipo-consulta.module';
import { ConsultaModule } from './ayuda/consulta/consulta.module';
import { PersonalModule } from './personal/personal.module';
import { TipoPersonalModule } from './tipo-personal/tipo-personal.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { RecursoModule } from './recurso/recurso.module';
import { PresentacionModule } from './farmacia/presentacion/presentacion.module';
import { CategoriaModule } from './farmacia/categoria/categoria.module';
import { RecetaMedicinaModule } from './farmacia/receta-medicina/receta-medicina.module';
import { FilesModule } from './galeria/files.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mssql',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT!),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      options: {
        encrypt: process.env.ENCRYPT === 'true',
        trustServerCertificate: true,
      },
      requestTimeout: 0,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
      serveRoot: '/static',
    }),
    RedisModule,
    AuthModule,
    RoleModule,
    TurnosModule,
    PostaModule,
    CitaModule,
    PacientesModule,
    PruebaLaboratorioModule,
    RecetaModule,
    MedicinaModule,
    DiagnosticoModule,
    ProgramaModule,
    UtilsModule,
    ModuloModule,
    PrioridadModule,
    TipoConsultaModule,
    ConsultaModule,
    PersonalModule,
    TipoPersonalModule,
    RecursoModule,
    PresentacionModule,
    CategoriaModule,
    RecetaMedicinaModule,
    FilesModule,
  ],
  controllers: [],
  providers: [RedisService],
})
export class AppModule {}
