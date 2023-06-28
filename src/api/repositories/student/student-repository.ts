import { Knex } from "knex";
import { StudentDTO } from "models";
import { BaseRepository } from "../base-repository"

export class StudentRepository extends BaseRepository {
    private student: StudentDTO = {} as StudentDTO;

    constructor(maindb: Knex<any, unknown>) {
        super(maindb);
    }

    async getStudentCategoryId(desc: string): Promise<number> {
        return await this.getScalarValue<number>("fn_get_student_category_id", [desc]);
    }

    async getStudentById(student_id?: number): Promise<StudentDTO> {

        if (student_id) {
            this.student = await this.mainDb("sfa.student")
                .select("*")
                .where({ id: student_id })
                .first();
        }

        return this.student;
    }
}