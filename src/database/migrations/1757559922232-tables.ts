import { MigrationInterface, QueryRunner } from "typeorm";

export class Tables1757559922232 implements MigrationInterface {
    name = 'Tables1757559922232'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cita" ADD "fecha" datetime NOT NULL`);
        await queryRunner.query(`ALTER TABLE "cita" ADD "nota" nvarchar(255) NOT NULL CONSTRAINT "DF_32ecbff98c15074637e116507ae" DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE "cita" ADD "estado" bit NOT NULL CONSTRAINT "DF_4e77a2abdb4f7c2bb4cc949d61a" DEFAULT 1`);
        await queryRunner.query(`ALTER TABLE "cita" ADD "turnoTurnoId" int`);
        await queryRunner.query(`ALTER TABLE "cita" ADD "programaProgramaId" int`);
        await queryRunner.query(`ALTER TABLE "cita" ADD CONSTRAINT "FK_c0fb74ddce9752b1eaed78f6876" FOREIGN KEY ("turnoTurnoId") REFERENCES "turno"("turnoId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "cita" ADD CONSTRAINT "FK_fe9b861a150f618479f17663e92" FOREIGN KEY ("programaProgramaId") REFERENCES "programa"("programaId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cita" DROP CONSTRAINT "FK_fe9b861a150f618479f17663e92"`);
        await queryRunner.query(`ALTER TABLE "cita" DROP CONSTRAINT "FK_c0fb74ddce9752b1eaed78f6876"`);
        await queryRunner.query(`ALTER TABLE "cita" DROP COLUMN "programaProgramaId"`);
        await queryRunner.query(`ALTER TABLE "cita" DROP COLUMN "turnoTurnoId"`);
        await queryRunner.query(`ALTER TABLE "cita" DROP CONSTRAINT "DF_4e77a2abdb4f7c2bb4cc949d61a"`);
        await queryRunner.query(`ALTER TABLE "cita" DROP COLUMN "estado"`);
        await queryRunner.query(`ALTER TABLE "cita" DROP CONSTRAINT "DF_32ecbff98c15074637e116507ae"`);
        await queryRunner.query(`ALTER TABLE "cita" DROP COLUMN "nota"`);
        await queryRunner.query(`ALTER TABLE "cita" DROP COLUMN "fecha"`);
    }

}
