import { Knex } from "knex";
import { BaseRepository } from "../base-repository";
import { MsfaaDTO, MsfaaTable, msfaaColumns } from "../../models";
import { MsfaaApplicationDTO } from "../../models/dto/MsfaaApplicationDTO";
import { IMainTable } from "../i-main-table";

export class MsfaaRepository extends BaseRepository implements IMainTable {

    private msfaa: Partial<MsfaaDTO> = {};

    protected mainTable: string = "sfa.msfaa";

    constructor(maindb: Knex<any, unknown>) {
        super(maindb)
    }

    getMainTable(): string {
        return this.mainTable;
    }

    getMsfaaTable(msfaa: MsfaaDTO): MsfaaTable {
        return Object.keys(msfaa)
            .filter(key => msfaaColumns.includes(key as keyof MsfaaTable))
            .reduce((obj: any, key) => {
                obj[key as keyof MsfaaTable] = msfaa[key as keyof MsfaaTable];
                return obj as MsfaaTable;
            }, {});
    }

    async updateMsfaa(id: number, msfaa: MsfaaDTO): Promise<MsfaaDTO> {
        const filtered = this.getMsfaaTable(msfaa);
        const result = await this.mainDb(this.mainTable)
                                .update(filtered)
                                .where({
                                    id: id
                                })
                                .returning("*");
        return result[0];
    }

    async insertMsfaa(msfaa: MsfaaDTO): Promise<MsfaaDTO> {
        const filtered = this.getMsfaaTable(msfaa);
        const result = await this.mainDb(this.mainTable).insert(filtered).returning("*");        
        return result[0];
    }

    async getMsfaaById(msfaa_id: number | undefined): Promise<Partial<MsfaaDTO>> {
        if (msfaa_id) {
            this.msfaa = await this.mainDb("sfa.msfaa")
                .select(
                    "sfa.msfaa.*"
                )
                .where({ id: msfaa_id })
                .first();
        }
        
        return this.msfaa;
    }

    async getMsfaaByStudentId(student_id: number | undefined): Promise<Partial<MsfaaDTO>> {
        if (student_id) {
            const result = await this.mainDb.raw(`EXEC sfa.sp_get_msfaa_by_student_id @student_id = ${student_id}`);
            if (Array.isArray(result) && result.length > 0) {
                this.msfaa = this.singleResult(result);
            }
        }
        return this.msfaa;
    }

    async getMsfaaApplicationByStudentId(student_id: number | undefined): Promise<Partial<MsfaaApplicationDTO>> {
        let result: Partial<MsfaaApplicationDTO> = {};
        if (student_id) {
            const data = await this.mainDb.raw(`EXEC sfa.sp_get_msfaa_application_by_student_id @student_id = ${student_id}`);
            if (Array.isArray(data) && data.length > 0) {
                result = this.singleResult(data);
            }
        }

        return result;
    }

    async getCountMsfaaFullTimeStudent(student_id?: number): Promise<number> {
        let result = 0;

        if (student_id) {
            result = await this.getScalarValue<number>("fn_get_msfaa_student_fulltime_count", [student_id]);
        }

        return result;
    }
}