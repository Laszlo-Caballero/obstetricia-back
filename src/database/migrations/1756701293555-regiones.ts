import { MigrationInterface, QueryRunner } from 'typeorm';

export class Regiones1756701293555 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            INSERT INTO region (nombre) VALUES ('Amazonas');
            INSERT INTO region (nombre) VALUES ('Áncash');
            INSERT INTO region (nombre) VALUES ('Apurímac');
            INSERT INTO region (nombre) VALUES ('Arequipa');
            INSERT INTO region (nombre) VALUES ('Ayacucho');
            INSERT INTO region (nombre) VALUES ('Cajamarca');
            INSERT INTO region (nombre) VALUES ('Callao');
            INSERT INTO region (nombre) VALUES ('Cusco');
            INSERT INTO region (nombre) VALUES ('Huancavelica');
            INSERT INTO region (nombre) VALUES ('Huánuco');
            INSERT INTO region (nombre) VALUES ('Ica');
            INSERT INTO region (nombre) VALUES ('Junín');
            INSERT INTO region (nombre) VALUES ('La Libertad');
            INSERT INTO region (nombre) VALUES ('Lambayeque');
            INSERT INTO region (nombre) VALUES ('Lima');
            INSERT INTO region (nombre) VALUES ('Loreto');
            INSERT INTO region (nombre) VALUES ('Madre de Dios');
            INSERT INTO region (nombre) VALUES ('Moquegua');
            INSERT INTO region (nombre) VALUES ('Pasco');
            INSERT INTO region (nombre) VALUES ('Piura');
            INSERT INTO region (nombre) VALUES ('Puno');
            INSERT INTO region (nombre) VALUES ('San Martín');
            INSERT INTO region (nombre) VALUES ('Tacna');
            INSERT INTO region (nombre) VALUES ('Tumbes');
            INSERT INTO region (nombre) VALUES ('Ucayali');
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            DELETE FROM region WHERE nombre IN ('Amazonas', 'Áncash', 'Apurímac', 'Arequipa', 'Ayacucho', 'Cajamarca', 'Callao', 'Cusco', 'Huancavelica', 'Huánuco', 'Ica', 'Junín', 'La Libertad', 'Lambayeque', 'Lima', 'Loreto', 'Madre de Dios', 'Moquegua', 'Pasco', 'Piura', 'Puno', 'San Martín', 'Tacna', 'Tumbes', 'Ucayali');
        `);
  }
}
