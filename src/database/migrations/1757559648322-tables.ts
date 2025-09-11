import { MigrationInterface, QueryRunner } from "typeorm";

export class Tables1757559648322 implements MigrationInterface {
    name = 'Tables1757559648322'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "paciente" DROP COLUMN "estado_civil"`);
        await queryRunner.query(`ALTER TABLE "posta" DROP COLUMN "GeoLocation"`);
        await queryRunner.query(`ALTER TABLE "paciente" ADD "direccion" nvarchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "paciente" ADD "departamento" nvarchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "paciente" ADD "provincia" nvarchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "paciente" ADD "distrito" nvarchar(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "paciente" DROP COLUMN "distrito"`);
        await queryRunner.query(`ALTER TABLE "paciente" DROP COLUMN "provincia"`);
        await queryRunner.query(`ALTER TABLE "paciente" DROP COLUMN "departamento"`);
        await queryRunner.query(`ALTER TABLE "paciente" DROP COLUMN "direccion"`);
        await queryRunner.query(`ALTER TABLE "posta" ADD "GeoLocation" geography`);
        await queryRunner.query(`ALTER TABLE "paciente" ADD "estado_civil" nvarchar(255) NOT NULL`);
    }

}
