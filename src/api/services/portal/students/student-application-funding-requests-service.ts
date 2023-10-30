import { groupBy, keyBy } from "lodash";

import db from "@/db/db-client";
import { NON_EXISTANT_ID } from "@/utils/constants";

import Assessment from "@/models/assessment";
import FundingRequest from "@/models/funding-request";

export default class StudentApplicationFundingRequestsService {
  #applicationId: number;

  constructor({ applicationId }: { applicationId: number }) {
    this.#applicationId = applicationId;
  }

  ////
  // Data format
  // fundingRequests: [
  //   {
  //      id
  //      requestType: {},
  //      ...
  //      assessments: [
  //        {
  //          id:112,
  //          disbursements: [{}]
  //        }
  //      ]
  //    }
  // ]
  async getFundingRequests() {
    const fundingRequests = await db("fundingRequest")
      .where({ applicationId: this.#applicationId })
      .leftJoin("status", "fundingRequest.statusId", "status.id")
      .leftJoin("statusReason", "fundingRequest.statusReasonId", "status.id")
      .select(
        "fundingRequest.*",
        "status.description as statusDescription",
        "statusReason.description as reasonDescription"
      );

    await this.#injectRequestTypes(fundingRequests);
    await this.#injectAssessments(fundingRequests);

    return fundingRequests;
  }

  async #injectRequestTypes(fundingRequests: FundingRequest[]) {
    const requestTypeIds = fundingRequests.map((fundingRequest) => fundingRequest.requestTypeId);
    const requestTypeHash = await db("requestType")
      .where("id", "in", requestTypeIds)
      .then((rows) => keyBy(rows, "id"));

    fundingRequests.forEach((fundingRequest) => {
      const requestTypeId = fundingRequest.requestTypeId || NON_EXISTANT_ID;
      fundingRequest.requestType = requestTypeHash[requestTypeId];
    });
  }

  async #injectAssessments(fundingRequests: FundingRequest[]) {
    const fundingRequestIds = fundingRequests.map((fundingRequest) => fundingRequest.id);
    const assessments = await db("assessment").whereIn("fundingRequestId", fundingRequestIds);

    await this.#injectDisbursements(assessments);

    const assessmentsHash = groupBy(assessments, "fundingRequestId");
    fundingRequests.forEach((fundingRequest) => {
      const fundingRequestId = fundingRequest.id || NON_EXISTANT_ID;
      fundingRequest.assessments = assessmentsHash[fundingRequestId];
    });
  }

  async #injectDisbursements(assessments: Assessment[]) {
    const assessmentIds = assessments.map((assessment) => assessment.id);

    const disbursementsHash = await db("disbursement")
      .leftJoin("changeReason", "disbursement.changeReasonId", "changeReason.id")
      .whereIn("assessmentId", assessmentIds)
      .select("disbursement.*", "changeReason.description as changeReasonDescription")
      .then((rows) => groupBy(rows, "assessmentId"));

    assessments.forEach((assessment) => {
      const assessmentId = assessment.id || NON_EXISTANT_ID;
      assessment.disbursements = disbursementsHash[assessmentId];
    });
  }
}
