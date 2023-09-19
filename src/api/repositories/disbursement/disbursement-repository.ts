import { Knex } from "knex";
import { BaseRepository } from "../base-repository";
import { DisbursementDTO, DisbursementTable, disbursementColumns } from "../../models";
import { IMainTable } from "../i-main-table";
import { PortalStatusDTO } from "models/dto/PortalStatusDTO";

export class DisbursementRepository extends BaseRepository implements IMainTable {
  protected mainTable: string = "sfa.disbursement";

  private disbursement: Partial<DisbursementDTO> = {};

  constructor(maindb: Knex<any, unknown>) {
    super(maindb);
  }

  getMainTable(): string {
    return this.mainTable;
  }

  getDisbursementTable(disbursement: DisbursementDTO): DisbursementTable {
    return Object.keys(disbursement)
      .filter((key) => disbursementColumns.includes(key as keyof DisbursementTable))
      .reduce((obj: any, key) => {
        obj[key as keyof DisbursementTable] = disbursement[key as keyof DisbursementTable];
        return obj as DisbursementTable;
      }, {});
  }

  async getByAssessmentId(assessment_id: number | undefined): Promise<Array<Partial<DisbursementDTO>>> {
    let result: Array<Partial<DisbursementDTO>> = [];

    if (assessment_id) {
      const query = await this.mainDb(this.mainTable)
        .select("*")
        .where({ assessment_id: assessment_id })
        .orderBy("id", "asc");

      query.forEach((x: DisbursementDTO) => {
        x.delete_flag = false;
        result.push(x);
      });
    }

    return result;
  }

  async getECertificateList(assessment_id: number | undefined): Promise<Array<Partial<DisbursementDTO>>> {
    let result: Array<Partial<DisbursementDTO>> = [];

    if (assessment_id) {
      const query = await this.mainDb(this.mainTable)
        .select("*")
        .where({ assessment_id: assessment_id })
        .whereNotNull("csl_cert_seq_number")
        .orderBy("id", "asc");

      query.forEach((x: DisbursementDTO) => result.push(x));
    }

    return result;
  }

  async getPortalStatusList(): Promise<Array<Partial<PortalStatusDTO>>> {
    let result: Array<Partial<PortalStatusDTO>> = [];

    const query = await this.mainDb("sfa.portal_status").select("*").orderBy("id", "asc");

    query.forEach((x: PortalStatusDTO) => result.push(x));

    return result;
  }

  async getTotalGrantAmount(application_id?: number): Promise<number> {
    let result = 0;

    if (application_id) {
      result = await this.getScalarValue<number>("fn_get_total_grant_amount", [application_id]);
    }

    return result;
  }

  async getGrantAmount(application_id?: number, request_type_id?: number): Promise<number> {
    let result = 0;

    if (application_id && request_type_id) {
      result = await this.getScalarValue<number>("fn_get_grant_amount", [application_id, request_type_id]);
    }

    return result;
  }

  async getDisbursedAmount(funding_request_id?: number, assessment_id?: number): Promise<number> {
    let result = 0;

    if (funding_request_id && assessment_id) {
      result = await this.getScalarValue<number>("fn_get_disbursed_amount_fct", [funding_request_id, assessment_id]);
    }

    return result;
  }

  async getPreviousDisbursedAmount(funding_request_id?: number, assessment_id?: number): Promise<number> {
    let result = 0;

    if (funding_request_id && assessment_id) {
      result = await this.getScalarValue<number>("fn_get_previous_disbursed_amount", [
        funding_request_id,
        assessment_id,
      ]);
    }

    return result;
  }

  async getMaxTransaction(funding_request_id?: number): Promise<string> {
    let result = 0;

    if (funding_request_id) {
      result = await this.getScalarValue<number>("fn_get_disbursement_max_transaction", [funding_request_id]);
    }

    return result.toString();
  }

  async getNextTransactionSequenceValue(): Promise<string> {
    const query = await this.mainDb.raw("SELECT NEXT VALUE FOR sfa.CSL_TRANSACTION_SEQ as nextVal;");
    const result: Partial<{ nextVal?: number }> = this.singleResult(query);
    return result.nextVal?.toString() ?? "0";
  }

  async getTopDisbursements(application_id?: number): Promise<Array<Partial<DisbursementDTO>>> {
    let result: Array<Partial<DisbursementDTO>> = [];

    if (application_id) {
      result = await this.mainDb.raw(`SELECT * FROM sfa.fn_get_top_disbursements(${application_id})`);
      if (!Array.isArray(result)) {
        result = [];
      }
    }

    return result;
  }
}
