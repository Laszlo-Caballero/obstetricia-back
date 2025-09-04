import { MigrationInterface, QueryRunner } from 'typeorm';

export class Regiones1757017807772 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            INSERT INTO region (nombre) VALUES
            ('Amazonas'),
            ('Áncash'),
            ('Apurímac'),
            ('Arequipa'),
            ('Ayacucho'),
            ('Cajamarca'),
            ('Callao'),
            ('Cusco'),
            ('Huancavelica'),
            ('Huánuco'),
            ('Ica'),
            ('Junín'),
            ('La Libertad'),
            ('Lambayeque'),
            ('Lima'),
            ('Loreto'),
            ('Madre de Dios'),
            ('Moquegua'),
            ('Pasco'),
            ('Piura'),
            ('Puno'),
            ('San Martín'),
            ('Tacna'),
            ('Tumbes'),
            ('Ucayali');
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            DELETE FROM region WHERE nombre IN ('Amazonas', 'Áncash', 'Apurímac', 'Arequipa', 'Ayacucho', 'Cajamarca', 'Callao', 'Cusco', 'Huancavelica', 'Huánuco', 'Ica', 'Junín', 'La Libertad', 'Lambayeque', 'Lima', 'Loreto', 'Madre de Dios', 'Moquegua', 'Pasco', 'Piura', 'Puno', 'San Martín', 'Tacna', 'Tumbes', 'Ucayali');
        `);
  }
}
