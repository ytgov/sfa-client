import FundingRequest from "@/models/funding-request";
import Institution, { InstitutionNames } from "@/models/institution";
import RequestType, { RequestTypes } from "@/models/request-type";
import Status, { Statuses } from "@/models/status";
import User from "@/models/user";

import FundingRequestsService from "@/services/funding-requests-service";
import UploaderService from "@/services/admin/funding-requests/letters/uploader-service";

import StudentTrainingAllowanceAlkanAirApprovalLetterService from "@/services/admin/funding-requests/letters/student-training-allowance-alkan-air-approval-letter-service";
import StudentTrainingAllowanceRejectionLetterService from "@/services/admin/funding-requests/letters/student-training-allowance-rejection-letter-service";
import StudentTrainingAllowanceYukonUniversityApprovalLetterService from "@/services/admin/funding-requests/letters/student-training-allowance-yukon-university-approval-letter-service";
import YukonGrantInstitutionApprovalLetterService from "@/services/admin/funding-requests/letters/yukon-grant-institution-approval-letter-service";
import YukonGrantStudentApprovalLetterService from "@/services/admin/funding-requests/letters/yukon-grant-student-approval-letter-service";
import YukonGrantStudentRejectionLetterService from "@/services/admin/funding-requests/letters/yukon-grant-student-rejection-letter-service";
import YukonExcellenceAwardsApprovalLetterService from "@/services/admin/funding-requests/letters/yukon-excellence-awards-approval-letter-service";
import YukonExcellenceAwardsRejectionLetterService from "@/services/admin/funding-requests/letters/yukon-excellence-awards-rejection-letter-service";
import CanadaStudentLoanFulltimeApprovalLetterService from "@/services/admin/funding-requests/letters/canada-student-loan-fulltime-approval-letter-service";
import CanadaStudentLoanFulltimeRejectionLetterService from "@/services/admin/funding-requests/letters/canada-student-loan-fulltime-rejection-letter-service";

export default class CreateService {
  #fundingRequestId: number;
  #currentUser: User;

  constructor({ fundingRequestId, currentUser }: { fundingRequestId: number; currentUser: User }) {
    this.#fundingRequestId = fundingRequestId;
    this.#currentUser = currentUser;
  }

  // Contains complex business logic for generating appropriate letters
  async preform(): Promise<string[]> {
    const fundingRequest = await this.#getFundingRequest(this.#fundingRequestId);
    const requestStatus = this.#getRequestStatus(fundingRequest);
    const requestType = this.#getRequestType(fundingRequest);
    const currentUser = this.#currentUser;
    const director = await this.#getDirector();
    const uploader = new UploaderService({ fundingRequest, currentUser });

    if (requestType === RequestType.Types.YUKON_GRANT && requestStatus === Status.Types.AWARDED) {
      return this.#generateYukonGrantLetters({
        director,
        uploader,
        fundingRequest,
        currentUser,
      });
    } else if (requestType === RequestType.Types.YUKON_GRANT && requestStatus === Status.Types.REJECTED) {
      return this.#generateYukonGrantRejectionLetter({
        director,
        uploader,
        fundingRequest,
        currentUser,
      });
    } else if (requestType === RequestType.Types.YUKON_EXCELLENCE_AWARDS && requestStatus === Status.Types.AWARDED) {
      return this.#generateYukonExcellenceAwardsLetter({
        director,
        uploader,
        fundingRequest,
        currentUser,
      });
    } else if (requestType === RequestType.Types.YUKON_EXCELLENCE_AWARDS && requestStatus === Status.Types.REJECTED) {
      return this.#generateYukonExcellenceAwardsRejectionLetter({
        director,
        uploader,
        fundingRequest,
        currentUser,
      });
    } else if (requestType === RequestType.Types.STUDENT_TRAINING_ALLOWANCE && requestStatus === Status.Types.AWARDED) {
      // FUTURE: this could become a separate service
      const institutionName = this.#getInstitutionName(fundingRequest);
      if (institutionName === Institution.Names.YUKON_UNIVERSITY) {
        return this.#generateStudentTrainingAllowanceYukonUniversityApprovalLetter({
          director,
          uploader,
          fundingRequest,
          currentUser,
        });
      } else if (institutionName === Institution.Names.ALKAN_AIR_FLIGHT_TRAINING) {
        return this.#generateStudentTrainingAllowanceAlkanAirApprovalLetter({
          director,
          uploader,
          fundingRequest,
          currentUser,
        });
      } else {
        throw new Error(
          `Could not generate Student Training Allowance letter for institution name: ${institutionName}`
        );
      }
    } else if (
      requestType === RequestType.Types.STUDENT_TRAINING_ALLOWANCE &&
      requestStatus === Status.Types.REJECTED
    ) {
      return this.#generateStudentTrainingAllowanceRejectionLetter({
        director,
        uploader,
        fundingRequest,
        currentUser,
      });
    }
    else if (requestType === RequestType.Types.CANADA_STUDENT_LOAN_FULL_TIME && requestStatus === Status.Types.AWARDED) {
      return this.#generateCanadaStudentLoanFulltimeLetter({
        director,
        uploader,
        fundingRequest,
        currentUser,
      });
    } else if (requestType === RequestType.Types.CANADA_STUDENT_LOAN_FULL_TIME && requestStatus === Status.Types.REJECTED) {
      return this.#generateCanadaStudentLoanFulltimeLetterRejectionLetter({
        director,
        uploader,
        fundingRequest,
        currentUser,
      });
    }
    
    else {
      throw new Error(
        `Could not generate letter for this funding request with request type: ${requestType} and status: ${requestStatus}`
      );
    }
  }

  // TODO: consider refactoring this to its own service
  // generate yukon-grant-institution-approval
  // generate yukon-grant-student-approval
  async #generateYukonGrantLetters({
    director,
    fundingRequest,
    currentUser,
    uploader,
  }: {
    director: User;
    fundingRequest: FundingRequest;
    currentUser: User;
    uploader: UploaderService;
  }): Promise<string[]> {
    const letterNames = [];
    const yukonGrantInstitutionLetterService = new YukonGrantInstitutionApprovalLetterService({
      fundingRequest,
      director,
      signingOfficer: currentUser,
    });
    const yukonGrantInstitutionLetter = await yukonGrantInstitutionLetterService.renderAsPdf();
    const yukonGrantInstitutionLetterName = yukonGrantInstitutionLetterService.buildFileName({
      format: "pdf",
    });
    await uploader.upload(yukonGrantInstitutionLetter, yukonGrantInstitutionLetterName);

    const yukonGrantStudentLetterService = new YukonGrantStudentApprovalLetterService({
      director,
      fundingRequest,
      signingOfficer: currentUser,
    });
    const yukonGrantStudentLetter = await yukonGrantStudentLetterService.renderAsPdf();
    const yukonGrantStudentLetterName = yukonGrantStudentLetterService.buildFileName({
      format: "pdf",
    });
    await uploader.upload(yukonGrantStudentLetter, yukonGrantStudentLetterName);

    return [yukonGrantInstitutionLetterName, yukonGrantStudentLetterName];
  }

  // generate yukon-grant-student-rejection
  async #generateYukonGrantRejectionLetter({
    director,
    uploader,
    fundingRequest,
    currentUser,
  }: {
    director: User;
    uploader: UploaderService;
    fundingRequest: FundingRequest;
    currentUser: User;
  }): Promise<string[]> {
    const rejectionLetterService = new YukonGrantStudentRejectionLetterService({
      director,
      fundingRequest,
      signingOfficer: currentUser,
    });

    const rejectionLetter = await rejectionLetterService.renderAsPdf();
    const rejectionLetterName = rejectionLetterService.buildFileName({ format: "pdf" });
    await uploader.upload(rejectionLetter, rejectionLetterName);

    return [rejectionLetterName];
  }

  async #generateYukonExcellenceAwardsLetter({
    director,
    fundingRequest,
    currentUser,
    uploader,
  }: {
    director: User;
    fundingRequest: FundingRequest;
    currentUser: User;
    uploader: UploaderService;
  }): Promise<string[]> {
    const letterNames = [];

    const approvalLetterService = new YukonExcellenceAwardsApprovalLetterService({
      director,
      fundingRequest,
      signingOfficer: currentUser,
    });
    const approvalLetter = await approvalLetterService.renderAsPdf();
    const approvalLetterName = approvalLetterService.buildFileName({
      format: "pdf",
    });
    await uploader.upload(approvalLetter, approvalLetterName);

    return [approvalLetterName];
  }

  // generate yukon-grant-student-rejection
  async #generateYukonExcellenceAwardsRejectionLetter({
    director,
    uploader,
    fundingRequest,
    currentUser,
  }: {
    director: User;
    uploader: UploaderService;
    fundingRequest: FundingRequest;
    currentUser: User;
  }): Promise<string[]> {
    const rejectionLetterService = new YukonExcellenceAwardsRejectionLetterService({
      director,
      fundingRequest,
      signingOfficer: currentUser,
    });

    const rejectionLetter = await rejectionLetterService.renderAsPdf();
    const rejectionLetterName = rejectionLetterService.buildFileName({ format: "pdf" });
    await uploader.upload(rejectionLetter, rejectionLetterName);

    return [rejectionLetterName];
  }

  // generate student-training-allowance-yukon-university-approval
  async #generateStudentTrainingAllowanceYukonUniversityApprovalLetter({
    director,
    uploader,
    fundingRequest,
    currentUser,
  }: {
    director: User;
    uploader: UploaderService;
    fundingRequest: FundingRequest;
    currentUser: User;
  }): Promise<string[]> {
    const letterService = new StudentTrainingAllowanceYukonUniversityApprovalLetterService({
      fundingRequest,
      director,
      signingOfficer: currentUser,
    });
    const letter = await letterService.renderAsPdf();
    const letterName = letterService.buildFileName({ format: "pdf" });
    await uploader.upload(letter, letterName);

    return [letterName];
  }

  // generate student-training-allowance-alkan-air-approval
  async #generateStudentTrainingAllowanceAlkanAirApprovalLetter({
    director,
    uploader,
    fundingRequest,
    currentUser,
  }: {
    director: User;
    uploader: UploaderService;
    fundingRequest: FundingRequest;
    currentUser: User;
  }): Promise<string[]> {
    const letterService = new StudentTrainingAllowanceAlkanAirApprovalLetterService({
      fundingRequest,
      director,
      signingOfficer: currentUser,
    });
    const letter = await letterService.renderAsPdf();
    const letterName = letterService.buildFileName({ format: "pdf" });
    await uploader.upload(letter, letterName);

    return [letterName];
  }

  // generate student-training-allowance-rejection
  async #generateStudentTrainingAllowanceRejectionLetter({
    director,
    uploader,
    fundingRequest,
    currentUser,
  }: {
    director: User;
    uploader: UploaderService;
    fundingRequest: FundingRequest;
    currentUser: User;
  }): Promise<string[]> {
    const rejectionLetterService = new StudentTrainingAllowanceRejectionLetterService({
      director,
      fundingRequest,
      signingOfficer: currentUser,
    });
    const rejectionLetter = await rejectionLetterService.renderAsPdf();
    const rejectionLetterName = rejectionLetterService.buildFileName({ format: "pdf" });
    await uploader.upload(rejectionLetter, rejectionLetterName);

    return [rejectionLetterName];
  }

  async #generateCanadaStudentLoanFulltimeLetter({
    director,
    fundingRequest,
    currentUser,
    uploader,
  }: {
    director: User;
    fundingRequest: FundingRequest;
    currentUser: User;
    uploader: UploaderService;
  }): Promise<string[]> {
    const letterService = new CanadaStudentLoanFulltimeApprovalLetterService({
      fundingRequest,
      director,
      signingOfficer: currentUser,
    });
    const letter = await letterService.renderAsPdf();
    const letterName = letterService.buildFileName({
      format: "pdf",
    });
    await uploader.upload(letter, letterName);

    return [letterName];
  }

  async #generateCanadaStudentLoanFulltimeLetterRejectionLetter({
    director,
    uploader,
    fundingRequest,
    currentUser,
  }: {
    director: User;
    uploader: UploaderService;
    fundingRequest: FundingRequest;
    currentUser: User;
  }): Promise<string[]> {
    const letterService = new CanadaStudentLoanFulltimeRejectionLetterService({
      director,
      fundingRequest,
      signingOfficer: currentUser,
    });

    const letter = await letterService.renderAsPdf();
    const letterName = letterService.buildFileName({ format: "pdf" });
    await uploader.upload(letter, letterName);

    return [letterName];
  }

  #getFundingRequest(fundingRequestId: number): Promise<FundingRequest> {
    return FundingRequestsService.includes([
      "application",
      "assessments",
      "disbursements",
      "requestType",
      "status",
      "statusReason",
      "yea",
    ]).find(fundingRequestId);
  }

  #getRequestType(fundingRequest: FundingRequest): RequestTypes {
    const requestType = fundingRequest.requestType?.description;
    if (!RequestType.isValidRequestType(requestType)) throw new Error(`Invalid request type: ${requestType}`);

    return requestType;
  }

  #getRequestStatus(fundingRequest: FundingRequest): Statuses {
    const status = fundingRequest.status?.description;
    if (!Status.isValidStatus(status)) throw new Error(`Invalid status: ${status}`);

    return status;
  }

  #getInstitutionName(fundingRequest: FundingRequest): InstitutionNames {
    const institutionName = fundingRequest.application?.institutionCampus?.institution?.name;
    if (!Institution.isValidInstitutionName(institutionName))
      throw new Error(`Invalid institution name: ${institutionName}`);

    return institutionName;
  }

  // TODO: This should pull from the database once the director exists there
  async #getDirector(): Promise<User> {
    return {
      firstName: "Kirsti",
      lastName: "de Vries",
      email: "kirsti.devries@yukon.ca",
      phone: "867-667-5129",
      position: "Director of Training Programs",
    } as User;
  }
}
