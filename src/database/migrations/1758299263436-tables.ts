import { MigrationInterface, QueryRunner } from 'typeorm';

export class Tables1758299263436 implements MigrationInterface {
  name = 'Tables1758299263436';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "medicina" ADD "stockMinimo" int NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "medicina" ADD "dosis" nvarchar(255) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "medicina" ADD "unidades" int NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "medicina" ADD "necesitaReceta" bit NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "medicina" ADD "recursoRecursoId" int`,
    );
    await queryRunner.query(
      `ALTER TABLE "medicina" ADD CONSTRAINT "FK_d0429c69b40ac3f0463896f748b" FOREIGN KEY ("recursoRecursoId") REFERENCES "recurso"("recursoId") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "medicina" DROP CONSTRAINT "FK_d0429c69b40ac3f0463896f748b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "medicina" DROP COLUMN "recursoRecursoId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "medicina" DROP COLUMN "necesitaReceta"`,
    );
    await queryRunner.query(`ALTER TABLE "medicina" DROP COLUMN "unidades"`);
    await queryRunner.query(`ALTER TABLE "medicina" DROP COLUMN "dosis"`);
    await queryRunner.query(`ALTER TABLE "medicina" DROP COLUMN "stockMinimo"`);
    await queryRunner.query(`ALTER TABLE "posta" ADD "GeoLocation" geography`);
  }
}
