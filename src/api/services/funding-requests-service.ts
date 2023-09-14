import { isNil } from "lodash";

import db from "@/db/db-client";

import FundingRequest from "@/models/funding-request";

import ApplicationsService from "@/services/applications-service";

namespace FundingRequestsService {
  export type IncludeTypes = (
    | "application"
    | "assessments"
    | "disbursements"
    | "requestType"
    | "status"
    | "statusReason"
    | "yea"
  )[];
}

export default class FundingRequestsService {
  #includes: FundingRequestsService.IncludeTypes;

  constructor({ includes }: { includes?: FundingRequestsService.IncludeTypes } = {}) {
    this.#includes = includes || [];
  }

  static includes(includes: FundingRequestsService.IncludeTypes) {
    return new FundingRequestsService({ includes });
  }

  static find(id: number) {
    const service = new FundingRequestsService();
    return service.find(id);
  }

  // OPINION: if you want this to be faster, switch to Sequelize.
  // It would be more worthwhile than writing these as massive dynamic queries and recreating an ORM.
  async find(id: number): Promise<FundingRequest> {
    const fundingRequest = await db<FundingRequest>("fundingRequest")
      .where({ id })
      .first()
      .then((fundingRequest) => {
        if (fundingRequest) return fundingRequest;

        throw new Error("Funding request not found");
      });

    if (this.#includes.includes("application")) {
      fundingRequest.application = await ApplicationsService.includes([
        "institutionCampus",
        "primaryAddress",
        "student",
        "studyArea",
      ]).find(fundingRequest.applicationId);

      let msfaaNumbers = await db("msfaa")
        .where({ student_id: fundingRequest.application.studentId })
        .max("id as maxid")
        .max("signedDate as maxSignDate")
        .first();

      fundingRequest.msfaaNumber = "";
      fundingRequest.msfaaSigned = undefined;

      if (msfaaNumbers) {
        if (msfaaNumbers.maxid) {
          let max = "0000000000" + msfaaNumbers.maxid;
          fundingRequest.msfaaNumber = max.substring(max.length - 10);
        }

        if (msfaaNumbers.maxSignDate) fundingRequest.msfaaSigned = msfaaNumbers.maxSignDate || undefined;
      }
    }

    if (this.#includes.includes("assessments")) {
      fundingRequest.assessments = await db("assessment").where({
        fundingRequestId: fundingRequest.id,
      });
    }

    if (this.#includes.includes("disbursements")) {
      // this is CSLFT and we include the grants with it!
      if (fundingRequest.requestTypeId == 4) {
        let childFundingRequests = await db("fundingRequest").where({ application_id: fundingRequest.applicationId });
        //the related grants
        let childTypeIds = [35, 32, 29, 28];
        childFundingRequests = childFundingRequests.filter((c) => childTypeIds.includes(c.requestTypeId));

        fundingRequest.disbursements = await db("disbursement")
          .join("fundingRequest", "fundingRequest.id", "disbursement.fundingRequestId")
          .join("requestType", "requestType.id", "fundingRequest.requestTypeId")
          .select("requestType.description as fundingRequestDescription", "disbursement.*")
          .whereIn("fundingRequestId", [fundingRequest.id, ...childFundingRequests.map((fr) => fr.id)])
          .orderBy("disbursement.issueDate");
      } else {
        fundingRequest.disbursements = await db("disbursement").where({
          fundingRequestId: fundingRequest.id,
        });
      }
    }

    if (this.#includes.includes("requestType") && fundingRequest.requestTypeId) {
      fundingRequest.requestType = await db("requestType")
        .where({ id: fundingRequest.requestTypeId })
        .first()
        .then((requestType) => {
          if (requestType) return requestType;

          throw new Error("Request type not found");
        });
    }

    if (this.#includes.includes("status") && fundingRequest.statusId) {
      fundingRequest.status = await db("status")
        .where({ id: fundingRequest.statusId })
        .first()
        .then((status) => {
          if (status) return status;

          throw new Error("Status not found");
        });
    }

    if (this.#includes.includes("statusReason") && fundingRequest.statusReasonId) {
      const statusReason = await db("statusReason").where({ id: fundingRequest.statusReasonId }).first();
      if (isNil(statusReason)) throw new Error("Status reason not found");

      fundingRequest.statusReason = statusReason;
    }

    if (this.#includes.includes("yea")) {
      const yeaEarned = await db.raw("SELECT TOP 1 sfa.fn_get_yea_total(?) AS earned", [
        fundingRequest.application?.student?.yukonId,
      ]);
      const yeaUsed = await db.raw("SELECT TOP 1 sfa.fn_get_system_yea_used(?) AS used", [
        fundingRequest.application?.studentId,
      ]);

      let eVal = yeaEarned[0].earned || 0;
      let uVal = yeaUsed[0].used || 0;
      //if (isNil(statusReason)) throw new Error("Status reason not found")

      fundingRequest.yeaRemaining = (eVal - uVal) * 100;
    }

    return fundingRequest;
  }
}
