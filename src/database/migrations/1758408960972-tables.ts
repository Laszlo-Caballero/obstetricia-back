import { MigrationInterface, QueryRunner } from 'typeorm';

export class Tables1758408960972 implements MigrationInterface {
  name = 'Tables1758408960972';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "medicina" DROP COLUMN "descripcion"`);
    await queryRunner.query(
      `ALTER TABLE "medicina" ADD "descripcion" text NOT NULL CONSTRAINT "DF_6fe625bebb3410c87f8e938eb86" DEFAULT ''`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "medicina" DROP CONSTRAINT "DF_6fe625bebb3410c87f8e938eb86"`,
    );
    await queryRunner.query(`ALTER TABLE "medicina" DROP COLUMN "descripcion"`);
    await queryRunner.query(
      `ALTER TABLE "medicina" ADD "descripcion" nvarchar(255) NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE "posta" ADD "GeoLocation" geography`);
  }
}
