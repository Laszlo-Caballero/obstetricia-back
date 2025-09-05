import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RedisService } from './redis/redis.service';
import { RedisModule } from './redis/redis.module';
import { ObstetraModule } from './obstetra/obstetra.module';
import { AuthModule } from './auth/auth.module';
import { RoleModule } from './role/role.module';
import { EnfermerasModule } from './enfermeras/enfermeras.module';
import { TurnosModule } from './turnos/turnos.module';
import { PostaModule } from './posta/posta.module';
import { CitaModule } from './cita/cita.module';
import { PacientesModule } from './pacientes/pacientes.module';
import { PruebaLaboratorioModule } from './prueba-laboratorio/prueba-laboratorio.module';
import { RecetaModule } from './receta/receta.module';
import { MedicinaModule } from './medicina/medicina.module';
import { DiagnosticoModule } from './diagnostico/diagnostico.module';
import { ProgramaModule } from './programa/programa.module';
import { UtilsModule } from './utils/utils.module';
import { ModuloModule } from './ayuda/modulo/modulo.module';
import { PrioridadModule } from './ayuda/prioridad/prioridad.module';
import { TipoConsultaModule } from './ayuda/tipo-consulta/tipo-consulta.module';
import { ConsultaModule } from './ayuda/consulta/consulta.module';

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
    RedisModule,
    ObstetraModule,
    AuthModule,
    RoleModule,
    EnfermerasModule,
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
  ],
  controllers: [],
  providers: [RedisService],
})
export class AppModule {}
