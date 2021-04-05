import {MigrationInterface, QueryRunner} from "typeorm";

export class addFields1617521907595 implements MigrationInterface {
    name = 'addFields1617521907595'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "recipe" DROP COLUMN "previewId"`);
        await queryRunner.query(`ALTER TABLE "recipe" ADD "prevId" character varying`);
        await queryRunner.query(`ALTER TABLE "recipe" ADD "nextId" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "recipe" DROP COLUMN "nextId"`);
        await queryRunner.query(`ALTER TABLE "recipe" DROP COLUMN "prevId"`);
        await queryRunner.query(`ALTER TABLE "recipe" ADD "previewId" character varying`);
    }

}
