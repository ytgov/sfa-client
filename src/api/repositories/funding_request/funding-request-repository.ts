import { Knex } from "knex";
import { FundingRequestDTO, FundingRequestTable, fundingRequestColumns } from "../../models";
import { BaseRepository } from "../base-repository";
import { IMainTable } from "repositories/i-main-table";

export class FundingRequestRepository extends BaseRepository implements IMainTable {
    
    private funding_request: Partial<FundingRequestDTO> = {};

    protected mainTable = "sfa.funding_request";

    constructor(maindb: Knex<any, unknown>) {
        super(maindb);
    }

    getMainTable(): string {
        return this.mainTable;
    }

    getFundingRequestTable(fundingRequest: FundingRequestDTO): FundingRequestTable {
        return Object.keys(fundingRequest)
            .filter(key => fundingRequestColumns.includes(key as keyof FundingRequestTable))
            .reduce((obj: any, key) => {
                obj[key as keyof FundingRequestTable] = fundingRequest[key as keyof FundingRequestTable];
                return obj as FundingRequestTable;
            }, {});
    }


    async getCsgOnlyFlag(funding_request_id?: number, application_id?: number): Promise<boolean> {
        let result = false;

        if (funding_request_id && application_id) {
            result = await this.getScalarValue<boolean>("fn_get_csg_only_flag", [funding_request_id, application_id])
        }

        return result;
    }

    async getFundingRequestById(id?: number): Promise<Partial<FundingRequestDTO>> {

        if (id) {
            this.funding_request = await this.mainDb(this.mainTable)
                .select("*")
                .where({ id })
                .first();
        }
                
        return this.funding_request;
    }

    async updateFundingRequest(id: number, funding_request: FundingRequestDTO): Promise<FundingRequestDTO> {
        const filtered = this.getFundingRequestTable(funding_request);
        const result = await this.mainDb(this.mainTable)
                                .update(filtered)
                                .where({
                                    id: id
                                })
                                .returning("*");
        return result[0];
    }
}