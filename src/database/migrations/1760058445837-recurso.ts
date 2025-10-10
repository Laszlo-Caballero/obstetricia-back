import { MigrationInterface, QueryRunner } from 'typeorm';

export class Recurso1760058445837 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        insert into recurso (nombre, extension, url) values
        ('gato', 'webp', '/static/gato.webp')
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        delete from recurso where nombre = 'gato' and extension = 'webp' and url = '/static/gato.webp';
        `);
  }
}
