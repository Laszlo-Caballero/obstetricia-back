import { MigrationInterface, QueryRunner } from 'typeorm';

export class Tables1757684310061 implements MigrationInterface {
  name = 'Tables1757684310061';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "personal" ADD "nota" nvarchar(255) NOT NULL CONSTRAINT "DF_c55d9ca522a398acab8130b2411" DEFAULT ''`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "personal" DROP CONSTRAINT "DF_c55d9ca522a398acab8130b2411"`,
    );
    await queryRunner.query(`ALTER TABLE "personal" DROP COLUMN "nota"`);
  }
}
