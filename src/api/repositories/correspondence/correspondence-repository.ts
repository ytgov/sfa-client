import { Knex } from "knex";
import { BaseRepository } from "../base-repository";
import { StudentRepository } from "repositories";

export class CorrespondenceRepository extends BaseRepository {

    private studentRepo: StudentRepository;

    constructor(maindb: Knex<any, unknown>) {
        super(maindb);
        this.studentRepo = new StudentRepository(maindb);
    }
    
    async createLetterParams(correspondence_id?: number, student_id?: number, application_id?: number): Promise<void> {

        const address_select = await this.studentRepo.getAddressText(student_id, application_id);
        
    }
}