import { MigrationInterface, QueryRunner } from 'typeorm';

export class Programas1756447694101 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
    INSERT INTO Programa (nombre, descripcion) VALUES
('Obstetricia General', 'Atención integral de la mujer durante el embarazo, parto y puerperio.'),
('Medicina Materno-Fetal', 'Diagnóstico y manejo de embarazos de alto riesgo y patologías fetales.'),
('Ginecología Oncológica', 'Prevención, diagnóstico y tratamiento de cánceres ginecológicos como cuello uterino, ovario y endometrio.'),
('Reproducción Humana', 'Tratamiento de infertilidad y técnicas de reproducción asistida.'),
('Endocrinología Ginecológica', 'Trastornos hormonales en la mujer, como síndrome de ovario poliquístico y menopausia.'),
('Uroginecología', 'Diagnóstico y manejo de incontinencia urinaria, prolapso genital y disfunciones del piso pélvico.'),
('Medicina Reproductiva y Perinatología', 'Atención avanzada de la mujer y del feto durante el embarazo y el parto.'),
('Planificación Familiar y Anticoncepción', 'Métodos y programas de planificación familiar, salud sexual y reproductiva.'),
('Ecografía Obstétrica y Ginecológica', 'Diagnóstico por imágenes en embarazo y salud ginecológica.'),
('Cirugía Ginecológica Mínimamente Invasiva', 'Laparoscopia e histeroscopia para el tratamiento quirúrgico de patologías ginecológicas.');`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE Programa`);
  }
}
