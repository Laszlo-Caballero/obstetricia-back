import { MigrationInterface, QueryRunner } from 'typeorm';

export class Tables1758287038372 implements MigrationInterface {
  name = 'Tables1758287038372';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "paciente" ADD "telefono" nvarchar(255) NOT NULL CONSTRAINT "DF_6e7fc0df739d1465a05835c9f81" DEFAULT ''`,
    );
    await queryRunner.query(
      `ALTER TABLE "paciente" ADD "nota" nvarchar(255) NOT NULL CONSTRAINT "DF_1d520876a72302a67f17d48a4f3" DEFAULT ''`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "paciente" DROP CONSTRAINT "DF_1d520876a72302a67f17d48a4f3"`,
    );
    await queryRunner.query(`ALTER TABLE "paciente" DROP COLUMN "nota"`);
    await queryRunner.query(
      `ALTER TABLE "paciente" DROP CONSTRAINT "DF_6e7fc0df739d1465a05835c9f81"`,
    );
    await queryRunner.query(`ALTER TABLE "paciente" DROP COLUMN "telefono"`);
  }
}
