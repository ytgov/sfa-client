import { Knex } from "knex";
import { BaseRepository } from "../base-repository";
import { UploadedFile } from "express-fileupload";
import * as fs from "fs";

interface CSLRestrictedDTO {
    id: string,
    amount_disbursed: string,
    birth_date: string,
    first_name: string,
    last_name: string,
    over_award: string,
    restriction_reason_id: string,
    restriction_warn_id: string,
    weeks_accumulated: string,
};

export class CSLRestrictedData extends BaseRepository {

    constructor(maindb: Knex<any, unknown>) {
        super(maindb);
        //this.applicationRepo = new ApplicationRepository(maindb);
    }

    //AfterPForm ()
    async getResponse(
        file: UploadedFile
    ): Promise<any> {

        const dataFile = file.data;

        const fiteredData: CSLRestrictedDTO[] = this.filterRecords(file.data);

        const csvData = this.convertToCSV(fiteredData);

        fs.writeFile('bulk_insert.csv', csvData, (err) => {
            if (err) {
                console.error('Error al crear el archivo:', err);
                return;
            }
            console.log('El archivo ha sido creado exitosamente.');
        });

        // const truncateTable = await this.mainDb('sfa.csl_restricted').truncate();
        //console.log(fiteredData);

        //const resUpdate = await this.insertRecords(fiteredData);


        return { success: true, data: {} };
    }

    async insertRecords(
        records: CSLRestrictedDTO[]
    ): Promise<boolean> {

        try {


            //const identityOff = await this.mainDb.raw('SET IDENTITY_INSERT sfa.csl_restricted ON;');

            //console.log("ENTRANDO", identityOff);
            for await (const record of records) {

                await this.mainDb('sfa.csl_restricted').insert([
                    {
                        //id: record.id,
                        last_name: '+' + record.last_name,
                        first_name: '+' + record.first_name,
                        birth_date: record.birth_date,
                        over_award: record.over_award,
                        restriction_warn_id: record.restriction_warn_id,
                        restriction_reason_id: record.restriction_reason_id,
                        amount_disbursed: record.amount_disbursed,
                        weeks_accumulated: record.weeks_accumulated
                    }
                ]);
                // ${record.id},
                await this.mainDb.raw(`
                    EXEC sfa.insert_csl_restricted_data
                   
                    ${record.last_name.indexOf("'") > 0 ? '"' + record.last_name + '"' : "'" + record.last_name + "'"},
                    ${record.first_name.indexOf("'") > 0 ? '"' + record.first_name + '"' : "'" + record.first_name + "'"},
                    '${record.birth_date}',
                    '${record.over_award ?? ''}',
                    '${record.restriction_warn_id ?? ''}',
                    '${record.restriction_reason_id ?? ''}',
                    '${record.amount_disbursed ?? ''}',
                    '${record.weeks_accumulated ?? ''}';
                `);
            }

            //await this.mainDb.raw('SET IDENTITY_INSERT sfa.csl_restricted OFF');

            return true;
        } catch (error) {
            console.log(error);
            return false;
        }

    }

    filterRecords(
        dataFile: Buffer
    ): any[] {

        const firstFilter: string[] = dataFile.toString()?.split('\n');

        const secondFilter: CSLRestrictedDTO[] = firstFilter
            .filter((data: string, index) => data.length > 0)
            .map((data: string, index) => {

                const restrictedData: any = {
                    id: '',
                    amount_disbursed: '',
                    birth_date: '',
                    first_name: '',
                    last_name: '',
                    over_award: '',
                    restriction_reason_id: '',
                    restriction_warn_id: '',
                    weeks_accumulated: '',
                    nslsc_restrict1: '',
                    nslsc_restrict2: '',
                    nslsc_restrict3: '',
                    calsc_restrict1: '',
                    calsc_restrict2: '',
                    calsc_restrict3: '',
                    fi_restrict1: ''
                };

                //CSL_RESTRICTED_ID
                restrictedData.id = data.slice(0, 9).trim();
                //AMOUNT_DISBURSED
                restrictedData.amount_disbursed = data.slice(86, 92).trim();
                //BIRTH_DATE
                restrictedData.birth_date = data.slice(69, 77).trim();
                //FIRST_NAME
                restrictedData.first_name = data.slice(39, 69).trim();
                //LAST_NAME
                restrictedData.last_name = data.slice(9, 39).trim();
                //OVER_AWARD
                restrictedData.over_award = data.slice(77, 83).trim();
                //RESTRICTION_REASON_ID
                restrictedData.restriction_reason_id = data.slice(85, 86).trim();
                //RESTRICTION_WARN_ID
                restrictedData.restriction_warn_id = data.slice(84, 85).trim();
                //WEEKS_ACCUMULATED
                restrictedData.weeks_accumulated = data.slice(93, 96).trim();

                return restrictedData;
            });

        return secondFilter;
    }

    convertToCSV(arr: any[]) {
        const array = [Object.keys(arr[0])].concat(arr)

        return array.map(it => {
            return Object.values(it).toString()
        }).join('\n')
    }


}