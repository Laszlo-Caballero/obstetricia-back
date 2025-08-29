import { MigrationInterface, QueryRunner } from 'typeorm';

export class Roles1756415319035 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            INSERT INTO Roles (roleName) VALUES
            ('Obstetra'),
            ('Enfermera'),
            ('Administrador');
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            DELETE FROM Roles WHERE roleName IN
            ('Obstetra',
            'Enfermera',
            'Administrador');
    `);
  }
}
