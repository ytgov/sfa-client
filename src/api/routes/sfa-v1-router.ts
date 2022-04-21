

import express, { Request, Response } from "express";
import { RequireAuth } from "./auth";

import * as sfa from "../services/sfa-v1-service";


export const legacyRouter = express.Router();

// REQUEST_STATUS_CORR
legacyRouter.get(
	'/api/v1/data/RequestStatusCorrs/:requestTypeId',
	RequireAuth,
	sfa.getRequestStatusCorr
);
legacyRouter.get(
	'/api/v1/data/RequestStatusCorrs',
	RequireAuth,
	sfa.getAllRequestStatusCorr
);
legacyRouter.post(
	'/api/v1/data/RequestStatusCorrs',
	RequireAuth,
	sfa.postRequestStatusCorr
);
legacyRouter.put(
	'/api/v1/data/RequestStatusCorrs/:requestTypeId',
	RequireAuth,
	sfa.putRequestStatusCorr
);
legacyRouter.delete(
	'/api/v1/data/RequestStatusCorrs/:requestTypeId',
	RequireAuth,
	sfa.deleteRequestStatusCorr
);

// REQUEST_TYPE
legacyRouter.get(
	'/api/v1/data/RequestTypes/:requestTypeId',
	RequireAuth,
	sfa.getRequestType
);
legacyRouter.get('/api/v1/data/RequestTypes', RequireAuth, sfa.getAllRequestType);
legacyRouter.post('/api/v1/data/RequestTypes', RequireAuth, sfa.postRequestType);
legacyRouter.put(
	'/api/v1/data/RequestTypes/:requestTypeId',
	RequireAuth,
	sfa.putRequestType
);
legacyRouter.delete(
	'/api/v1/data/RequestTypes/:requestTypeId',
	RequireAuth,
	sfa.deleteRequestType
);

// REQUIREMENT_MET
legacyRouter.get(
	'/api/v1/data/RequirementMet/:requirementMetId',
	RequireAuth,
	sfa.getRequirementMet
);
legacyRouter.get('/api/v1/data/RequirementMet', RequireAuth, sfa.getAllRequirementMet);
legacyRouter.post('/api/v1/data/RequirementMet', RequireAuth, sfa.postRequirementMet);
legacyRouter.put(
	'/api/v1/data/RequirementMet/:requirementMetId',
	RequireAuth,
	sfa.putRequirementMet
);
legacyRouter.delete(
	'/api/v1/data/RequirementMet/:requirementMetId',
	RequireAuth,
	sfa.deleteRequirementMet
);

// REQUIREMENT_TYPE
legacyRouter.get(
	'/api/v1/data/RequirementTypes/:requirementTypeId',
	RequireAuth,
	sfa.getRequirementType
);
legacyRouter.get(
	'/api/v1/data/RequirementTypes',
	RequireAuth,
	sfa.getAllRequirementType
);
legacyRouter.post('/api/v1/data/RequirementTypes', RequireAuth, sfa.postRequirementType);
legacyRouter.put(
	'/api/v1/data/RequirementTypes/:requirementTypeId',
	RequireAuth,
	sfa.putRequirementType
);
legacyRouter.delete(
	'/api/v1/data/RequirementTypes/:requirementTypeId',
	RequireAuth,
	sfa.deleteRequirementType
);

// RESIDENCE
legacyRouter.get('/api/v1/data/Residences/:residenceId', RequireAuth, sfa.getResidence);
legacyRouter.get('/api/v1/data/Residences', RequireAuth, sfa.getAllResidence);
legacyRouter.post('/api/v1/data/Residences', RequireAuth, sfa.postResidence);
legacyRouter.put('/api/v1/data/Residences/:residenceId', RequireAuth, sfa.putResidence);
legacyRouter.delete(
	'/api/v1/data/Residences/:residenceId',
	RequireAuth,
	sfa.deleteResidence
);

// SFA_DOCUMENT_LINK
legacyRouter.get(
	'/api/v1/data/SfaDocumentLinks/:sfaDocumentLinkId',
	RequireAuth,
	sfa.getSfaDocumentLink
);
legacyRouter.get(
	'/api/v1/data/SfaDocumentLinks',
	RequireAuth,
	sfa.getAllSfaDocumentLink
);
legacyRouter.post('/api/v1/data/SfaDocumentLinks', RequireAuth, sfa.postSfaDocumentLink);
legacyRouter.put(
	'/api/v1/data/SfaDocumentLinks/:sfaDocumentLinkId',
	RequireAuth,
	sfa.putSfaDocumentLink
);
legacyRouter.delete(
	'/api/v1/data/SfaDocumentLinks/:sfaDocumentLinkId',
	RequireAuth,
	sfa.deleteSfaDocumentLink
);

// SPOUSE_TAX_RATE
legacyRouter.get(
	'/api/v1/data/SpouseTaxRates/:academicYear',
	RequireAuth,
	sfa.getSpouseTaxRate
);
legacyRouter.get('/api/v1/data/SpouseTaxRates', RequireAuth, sfa.getAllSpouseTaxRate);
legacyRouter.post('/api/v1/data/SpouseTaxRates', RequireAuth, sfa.postSpouseTaxRate);
legacyRouter.put(
	'/api/v1/data/SpouseTaxRates/:academicYear',
	RequireAuth,
	sfa.putSpouseTaxRate
);
legacyRouter.delete(
	'/api/v1/data/SpouseTaxRates/:academicYear',
	RequireAuth,
	sfa.deleteSpouseTaxRate
);

// STA_LOOKUP
legacyRouter.get('/api/v1/data/StaLookup/:academicYear', RequireAuth, sfa.getStaLookup);
legacyRouter.get('/api/v1/data/StaLookup', RequireAuth, sfa.getAllStaLookup);
legacyRouter.post('/api/v1/data/StaLookup', RequireAuth, sfa.postStaLookup);
legacyRouter.put('/api/v1/data/StaLookup/:academicYear', RequireAuth, sfa.putStaLookup);
legacyRouter.delete(
	'/api/v1/data/StaLookup/:academicYear',
	RequireAuth,
	sfa.deleteStaLookup
);

// STANDARD_OF_LIVING
legacyRouter.get(
	'/api/v1/data/StandardOfLiving/:academicYear',
	RequireAuth,
	sfa.getStandardOfLiving
);
legacyRouter.get(
	'/api/v1/data/StandardOfLiving',
	RequireAuth,
	sfa.getAllStandardOfLiving
);
legacyRouter.post(
	'/api/v1/data/StandardOfLiving',
	RequireAuth,
	sfa.postStandardOfLiving
);
legacyRouter.put(
	'/api/v1/data/StandardOfLiving/:academicYear',
	RequireAuth,
	sfa.putStandardOfLiving
);
legacyRouter.delete(
	'/api/v1/data/StandardOfLiving/:academicYear',
	RequireAuth,
	sfa.deleteStandardOfLiving
);

// STATUS
legacyRouter.get('/api/v1/data/Status/:statusId', RequireAuth, sfa.getStatus);
legacyRouter.get('/api/v1/data/Status', RequireAuth, sfa.getAllStatus);
legacyRouter.post('/api/v1/data/Status', RequireAuth, sfa.postStatus);
legacyRouter.put('/api/v1/data/Status/:statusId', RequireAuth, sfa.putStatus);
legacyRouter.delete('/api/v1/data/Status/:statusId', RequireAuth, sfa.deleteStatus);

// STATUS_REASON
legacyRouter.get(
	'/api/v1/data/StatusReasons/:statusReasonId',
	RequireAuth,
	sfa.getStatusReason
);
legacyRouter.get('/api/v1/data/StatusReasons', RequireAuth, sfa.getAllStatusReason);
legacyRouter.post('/api/v1/data/StatusReasons', RequireAuth, sfa.postStatusReason);
legacyRouter.put(
	'/api/v1/data/StatusReasons/:statusReasonId',
	RequireAuth,
	sfa.putStatusReason
);
legacyRouter.delete(
	'/api/v1/data/StatusReasons/:statusReasonId',
	RequireAuth,
	sfa.deleteStatusReason
);

// STUDENT
legacyRouter.get('/api/v1/data/Students/:studentId', RequireAuth, sfa.getStudent);
legacyRouter.get('/api/v1/data/Students', RequireAuth, sfa.getAllStudent);
legacyRouter.post('/api/v1/data/Students', RequireAuth, sfa.postStudent);
legacyRouter.put('/api/v1/data/Students/:studentId', RequireAuth, sfa.putStudent);
legacyRouter.delete('/api/v1/data/Students/:studentId', RequireAuth, sfa.deleteStudent);

// STUDENT_CATEGORY
legacyRouter.get(
	'/api/v1/data/StudentCategory/:studentCategoryCode',
	RequireAuth,
	sfa.getStudentCategory
);
legacyRouter.get('/api/v1/data/StudentCategory', RequireAuth, sfa.getAllStudentCategory);
legacyRouter.post('/api/v1/data/StudentCategory', RequireAuth, sfa.postStudentCategory);
legacyRouter.put(
	'/api/v1/data/StudentCategory/:studentCategoryCode',
	RequireAuth,
	sfa.putStudentCategory
);
legacyRouter.delete(
	'/api/v1/data/StudentCategory/:studentCategoryCode',
	RequireAuth,
	sfa.deleteStudentCategory
);

// STUDENT_CONSENT
legacyRouter.get(
	'/api/v1/data/StudentConsent/:studentConsentId',
	RequireAuth,
	sfa.getStudentConsent
);
legacyRouter.get('/api/v1/data/StudentConsent', RequireAuth, sfa.getAllStudentConsent);
legacyRouter.post('/api/v1/data/StudentConsent', RequireAuth, sfa.postStudentConsent);
legacyRouter.put(
	'/api/v1/data/StudentConsent/:studentConsentId',
	RequireAuth,
	sfa.putStudentConsent
);
legacyRouter.delete(
	'/api/v1/data/StudentConsent/:studentConsentId',
	RequireAuth,
	sfa.deleteStudentConsent
);

// STUDENT_CONTRIBUTION
legacyRouter.get(
	'/api/v1/data/StudentContributions/:academicYear',
	RequireAuth,
	sfa.getStudentContribution
);
legacyRouter.get(
	'/api/v1/data/StudentContributions',
	RequireAuth,
	sfa.getAllStudentContribution
);
legacyRouter.post(
	'/api/v1/data/StudentContributions',
	RequireAuth,
	sfa.postStudentContribution
);
legacyRouter.put(
	'/api/v1/data/StudentContributions/:academicYear',
	RequireAuth,
	sfa.putStudentContribution
);
legacyRouter.delete(
	'/api/v1/data/StudentContributions/:academicYear',
	RequireAuth,
	sfa.deleteStudentContribution
);

// STUDENT_LIVING_ALLOWANCE
legacyRouter.get(
	'/api/v1/data/StudentLivingAllowances/:academicYear',
	RequireAuth,
	sfa.getStudentLivingAllowance
);
legacyRouter.get(
	'/api/v1/data/StudentLivingAllowances',
	RequireAuth,
	sfa.getAllStudentLivingAllowance
);
legacyRouter.post(
	'/api/v1/data/StudentLivingAllowances',
	RequireAuth,
	sfa.postStudentLivingAllowance
);
legacyRouter.put(
	'/api/v1/data/StudentLivingAllowances/:academicYear',
	RequireAuth,
	sfa.putStudentLivingAllowance
);
legacyRouter.delete(
	'/api/v1/data/StudentLivingAllowances/:academicYear',
	RequireAuth,
	sfa.deleteStudentLivingAllowance
);

// STUDY_AREA
legacyRouter.get('/api/v1/data/StudyAreas/:studyAreaId', RequireAuth, sfa.getStudyArea);
legacyRouter.get('/api/v1/data/StudyAreas', RequireAuth, sfa.getAllStudyArea);
legacyRouter.post('/api/v1/data/StudyAreas', RequireAuth, sfa.postStudyArea);
legacyRouter.put('/api/v1/data/StudyAreas/:studyAreaId', RequireAuth, sfa.putStudyArea);
legacyRouter.delete(
	'/api/v1/data/StudyAreas/:studyAreaId',
	RequireAuth,
	sfa.deleteStudyArea
);

// STUDY_FIELD
legacyRouter.get(
	'/api/v1/data/StudyFields/:studyFieldId',
	RequireAuth,
	sfa.getStudyField
);
legacyRouter.get('/api/v1/data/StudyFields', RequireAuth, sfa.getAllStudyField);
legacyRouter.post('/api/v1/data/StudyFields', RequireAuth, sfa.postStudyField);
legacyRouter.put(
	'/api/v1/data/StudyFields/:studyFieldId',
	RequireAuth,
	sfa.putStudyField
);
legacyRouter.delete(
	'/api/v1/data/StudyFields/:studyFieldId',
	RequireAuth,
	sfa.deleteStudyField
);

// STUDY_TAX_RATE
legacyRouter.get(
	'/api/v1/data/StudyTaxRates/:academicYear',
	RequireAuth,
	sfa.getStudyTaxRate
);
legacyRouter.get('/api/v1/data/StudyTaxRates', RequireAuth, sfa.getAllStudyTaxRate);
legacyRouter.post('/api/v1/data/StudyTaxRates', RequireAuth, sfa.postStudyTaxRate);
legacyRouter.put(
	'/api/v1/data/StudyTaxRates/:academicYear',
	RequireAuth,
	sfa.putStudyTaxRate
);
legacyRouter.delete(
	'/api/v1/data/StudyTaxRates/:academicYear',
	RequireAuth,
	sfa.deleteStudyTaxRate
);

// SYSTEM_DEP_PARAMS
legacyRouter.get(
	'/api/v1/data/SystemDepParams/:dependentCount',
	RequireAuth,
	sfa.getSystemDepParams
);
legacyRouter.get('/api/v1/data/SystemDepParams', RequireAuth, sfa.getAllSystemDepParams);
legacyRouter.post('/api/v1/data/SystemDepParams', RequireAuth, sfa.postSystemDepParams);
legacyRouter.put(
	'/api/v1/data/SystemDepParams/:dependentCount',
	RequireAuth,
	sfa.putSystemDepParams
);
legacyRouter.delete(
	'/api/v1/data/SystemDepParams/:dependentCount',
	RequireAuth,
	sfa.deleteSystemDepParams
);

// SYSTEM_PARAMETER
legacyRouter.get(
	'/api/v1/data/SystemParameters/:secondResidenceRate',
	RequireAuth,
	sfa.getSystemParameter
);
legacyRouter.get(
	'/api/v1/data/SystemParameters',
	RequireAuth,
	sfa.getAllSystemParameter
);
legacyRouter.post('/api/v1/data/SystemParameters', RequireAuth, sfa.postSystemParameter);
legacyRouter.put(
	'/api/v1/data/SystemParameters/:secondResidenceRate',
	RequireAuth,
	sfa.putSystemParameter
);
legacyRouter.delete(
	'/api/v1/data/SystemParameters/:secondResidenceRate',
	RequireAuth,
	sfa.deleteSystemParameter
);

// TAB_PAGE_ITEM
legacyRouter.get('/api/v1/data/TabPageItems/:formName', RequireAuth, sfa.getTabPageItem);
legacyRouter.get('/api/v1/data/TabPageItems', RequireAuth, sfa.getAllTabPageItem);
legacyRouter.post('/api/v1/data/TabPageItems', RequireAuth, sfa.postTabPageItem);
legacyRouter.put('/api/v1/data/TabPageItems/:formName', RequireAuth, sfa.putTabPageItem);
legacyRouter.delete(
	'/api/v1/data/TabPageItems/:formName',
	RequireAuth,
	sfa.deleteTabPageItem
);

// TABLE_FORM_POPLIST
legacyRouter.get(
	'/api/v1/data/TableFormPoplists/:tableName',
	RequireAuth,
	sfa.getTableFormPoplist
);
legacyRouter.get(
	'/api/v1/data/TableFormPoplists',
	RequireAuth,
	sfa.getAllTableFormPoplist
);
legacyRouter.post(
	'/api/v1/data/TableFormPoplists',
	RequireAuth,
	sfa.postTableFormPoplist
);
legacyRouter.put(
	'/api/v1/data/TableFormPoplists/:tableName',
	RequireAuth,
	sfa.putTableFormPoplist
);
legacyRouter.delete(
	'/api/v1/data/TableFormPoplists/:tableName',
	RequireAuth,
	sfa.deleteTableFormPoplist
);

// TRANSPORTATION
legacyRouter.get(
	'/api/v1/data/Transportation/:transportationId',
	RequireAuth,
	sfa.getTransportation
);
legacyRouter.get('/api/v1/data/Transportation', RequireAuth, sfa.getAllTransportation);
legacyRouter.post('/api/v1/data/Transportation', RequireAuth, sfa.postTransportation);
legacyRouter.put(
	'/api/v1/data/Transportation/:transportationId',
	RequireAuth,
	sfa.putTransportation
);
legacyRouter.delete(
	'/api/v1/data/Transportation/:transportationId',
	RequireAuth,
	sfa.deleteTransportation
);

// VENDOR_FMIS
legacyRouter.get('/api/v1/data/VendorFmis/:active', RequireAuth, sfa.getVendorFmis);
legacyRouter.get('/api/v1/data/VendorFmis', RequireAuth, sfa.getAllVendorFmis);
legacyRouter.post('/api/v1/data/VendorFmis', RequireAuth, sfa.postVendorFmis);
legacyRouter.put('/api/v1/data/VendorFmis/:active', RequireAuth, sfa.putVendorFmis);
legacyRouter.delete(
	'/api/v1/data/VendorFmis/:active',
	RequireAuth,
	sfa.deleteVendorFmis
);

// VENDOR_UPDATE
legacyRouter.get(
	'/api/v1/data/VendorUpdates/:vendorUpdateId',
	RequireAuth,
	sfa.getVendorUpdate
);
legacyRouter.get('/api/v1/data/VendorUpdates', RequireAuth, sfa.getAllVendorUpdate);
legacyRouter.post('/api/v1/data/VendorUpdates', RequireAuth, sfa.postVendorUpdate);
legacyRouter.put(
	'/api/v1/data/VendorUpdates/:vendorUpdateId',
	RequireAuth,
	sfa.putVendorUpdate
);
legacyRouter.delete(
	'/api/v1/data/VendorUpdates/:vendorUpdateId',
	RequireAuth,
	sfa.deleteVendorUpdate
);

// VERIFICATION_LOG
legacyRouter.get(
	'/api/v1/data/VerificationLogs/:verificationLogId',
	RequireAuth,
	sfa.getVerificationLog
);
legacyRouter.get(
	'/api/v1/data/VerificationLogs',
	RequireAuth,
	sfa.getAllVerificationLog
);
legacyRouter.post('/api/v1/data/VerificationLogs', RequireAuth, sfa.postVerificationLog);
legacyRouter.put(
	'/api/v1/data/VerificationLogs/:verificationLogId',
	RequireAuth,
	sfa.putVerificationLog
);
legacyRouter.delete(
	'/api/v1/data/VerificationLogs/:verificationLogId',
	RequireAuth,
	sfa.deleteVerificationLog
);

// YEA
legacyRouter.get('/api/v1/data/Yea/:fname', RequireAuth, sfa.getYea);
legacyRouter.get('/api/v1/data/Yea', RequireAuth, sfa.getAllYea);
legacyRouter.post('/api/v1/data/Yea', RequireAuth, sfa.postYea);
legacyRouter.put('/api/v1/data/Yea/:fname', RequireAuth, sfa.putYea);
legacyRouter.delete('/api/v1/data/Yea/:fname', RequireAuth, sfa.deleteYea);

// YEA_UPDATE
legacyRouter.get('/api/v1/data/YeaUpdates/:fname', RequireAuth, sfa.getYeaUpdate);
legacyRouter.get('/api/v1/data/YeaUpdates', RequireAuth, sfa.getAllYeaUpdate);
legacyRouter.post('/api/v1/data/YeaUpdates', RequireAuth, sfa.postYeaUpdate);
legacyRouter.put('/api/v1/data/YeaUpdates/:fname', RequireAuth, sfa.putYeaUpdate);
legacyRouter.delete('/api/v1/data/YeaUpdates/:fname', RequireAuth, sfa.deleteYeaUpdate);

// YG_COST
legacyRouter.get('/api/v1/data/YgCosts/:ygCostId', RequireAuth, sfa.getYgCost);
legacyRouter.get('/api/v1/data/YgCosts', RequireAuth, sfa.getAllYgCost);
legacyRouter.post('/api/v1/data/YgCosts', RequireAuth, sfa.postYgCost);
legacyRouter.put('/api/v1/data/YgCosts/:ygCostId', RequireAuth, sfa.putYgCost);
legacyRouter.delete('/api/v1/data/YgCosts/:ygCostId', RequireAuth, sfa.deleteYgCost);

// ABORIGINAL_STATUS
legacyRouter.get(
	'/api/v1/data/AboriginalStatus/:aboriginalStatusId',
	RequireAuth,
	sfa.getAboriginalStatus
);
legacyRouter.get(
	'/api/v1/data/AboriginalStatus',
	RequireAuth,
	sfa.getAllAboriginalStatus
);
legacyRouter.post(
	'/api/v1/data/AboriginalStatus',
	RequireAuth,
	sfa.postAboriginalStatus
);
legacyRouter.put(
	'/api/v1/data/AboriginalStatus/:aboriginalStatusId',
	RequireAuth,
	sfa.putAboriginalStatus
);
legacyRouter.delete(
	'/api/v1/data/AboriginalStatus/:aboriginalStatusId',
	RequireAuth,
	sfa.deleteAboriginalStatus
);

// AGE_DISTRIBUTION
legacyRouter.get(
	'/api/v1/data/AgeDistribution/:ageDistributionId',
	RequireAuth,
	sfa.getAgeDistribution
);
legacyRouter.get('/api/v1/data/AgeDistribution', RequireAuth, sfa.getAllAgeDistribution);
legacyRouter.post('/api/v1/data/AgeDistribution', RequireAuth, sfa.postAgeDistribution);
legacyRouter.put(
	'/api/v1/data/AgeDistribution/:ageDistributionId',
	RequireAuth,
	sfa.putAgeDistribution
);
legacyRouter.delete(
	'/api/v1/data/AgeDistribution/:ageDistributionId',
	RequireAuth,
	sfa.deleteAgeDistribution
);

// AGENCY
legacyRouter.get('/api/v1/data/Agency/:agencyId', RequireAuth, sfa.getAgency);
legacyRouter.get('/api/v1/data/Agency', RequireAuth, sfa.getAllAgency);
legacyRouter.post('/api/v1/data/Agency', RequireAuth, sfa.postAgency);
legacyRouter.put('/api/v1/data/Agency/:agencyId', RequireAuth, sfa.putAgency);
legacyRouter.delete('/api/v1/data/Agency/:agencyId', RequireAuth, sfa.deleteAgency);

// AGENCY_ASSISTANCE
legacyRouter.get(
	'/api/v1/data/AgencyAssistance/:historyDetailId',
	RequireAuth,
	sfa.getAgencyAssistance
);
legacyRouter.get(
	'/api/v1/data/AgencyAssistance',
	RequireAuth,
	sfa.getAllAgencyAssistance
);
legacyRouter.post(
	'/api/v1/data/AgencyAssistance',
	RequireAuth,
	sfa.postAgencyAssistance
);
legacyRouter.put(
	'/api/v1/data/AgencyAssistance/:historyDetailId',
	RequireAuth,
	sfa.putAgencyAssistance
);
legacyRouter.delete(
	'/api/v1/data/AgencyAssistance/:historyDetailId',
	RequireAuth,
	sfa.deleteAgencyAssistance
);

// APPLICATION_TYPE
legacyRouter.get(
	'/api/v1/data/ApplicationTypes/:applicationTypeId',
	RequireAuth,
	sfa.getApplicationType
);
legacyRouter.get(
	'/api/v1/data/ApplicationTypes',
	RequireAuth,
	sfa.getAllApplicationType
);
legacyRouter.post('/api/v1/data/ApplicationTypes', RequireAuth, sfa.postApplicationType);
legacyRouter.put(
	'/api/v1/data/ApplicationTypes/:applicationTypeId',
	RequireAuth,
	sfa.putApplicationType
);
legacyRouter.delete(
	'/api/v1/data/ApplicationTypes/:applicationTypeId',
	RequireAuth,
	sfa.deleteApplicationType
);

// ASSESSMENT
legacyRouter.get(
	'/api/v1/data/Assessments/:assessmentId',
	RequireAuth,
	sfa.getAssessment
);
legacyRouter.get('/api/v1/data/Assessments', RequireAuth, sfa.getAllAssessment);
legacyRouter.post('/api/v1/data/Assessments', RequireAuth, sfa.postAssessment);
legacyRouter.put(
	'/api/v1/data/Assessments/:assessmentId',
	RequireAuth,
	sfa.putAssessment
);
legacyRouter.delete(
	'/api/v1/data/Assessments/:assessmentId',
	RequireAuth,
	sfa.deleteAssessment
);

// ASSESSMENT_TYPE
legacyRouter.get(
	'/api/v1/data/AssessmentTypes/:assessmentTypeId',
	RequireAuth,
	sfa.getAssessmentType
);
legacyRouter.get('/api/v1/data/AssessmentTypes', RequireAuth, sfa.getAllAssessmentType);
legacyRouter.post('/api/v1/data/AssessmentTypes', RequireAuth, sfa.postAssessmentType);
legacyRouter.put(
	'/api/v1/data/AssessmentTypes/:assessmentTypeId',
	RequireAuth,
	sfa.putAssessmentType
);
legacyRouter.delete(
	'/api/v1/data/AssessmentTypes/:assessmentTypeId',
	RequireAuth,
	sfa.deleteAssessmentType
);

// BATCH_GROUP
legacyRouter.get(
	'/api/v1/data/BatchGroups/:batchGroupId',
	RequireAuth,
	sfa.getBatchGroup
);
legacyRouter.get('/api/v1/data/BatchGroups', RequireAuth, sfa.getAllBatchGroup);
legacyRouter.post('/api/v1/data/BatchGroups', RequireAuth, sfa.postBatchGroup);
legacyRouter.put(
	'/api/v1/data/BatchGroups/:batchGroupId',
	RequireAuth,
	sfa.putBatchGroup
);
legacyRouter.delete(
	'/api/v1/data/BatchGroups/:batchGroupId',
	RequireAuth,
	sfa.deleteBatchGroup
);

// BATCH_PARAMETER
legacyRouter.get(
	'/api/v1/data/BatchParameters/:batchParameterId',
	RequireAuth,
	sfa.getBatchParameter
);
legacyRouter.get('/api/v1/data/BatchParameters', RequireAuth, sfa.getAllBatchParameter);
legacyRouter.post('/api/v1/data/BatchParameters', RequireAuth, sfa.postBatchParameter);
legacyRouter.put(
	'/api/v1/data/BatchParameters/:batchParameterId',
	RequireAuth,
	sfa.putBatchParameter
);
legacyRouter.delete(
	'/api/v1/data/BatchParameters/:batchParameterId',
	RequireAuth,
	sfa.deleteBatchParameter
);

// CATEGORY
legacyRouter.get('/api/v1/data/Category/:categoryId', RequireAuth, sfa.getCategory);
legacyRouter.get('/api/v1/data/Category', RequireAuth, sfa.getAllCategory);
legacyRouter.post('/api/v1/data/Category', RequireAuth, sfa.postCategory);
legacyRouter.put('/api/v1/data/Category/:categoryId', RequireAuth, sfa.putCategory);
legacyRouter.delete(
	'/api/v1/data/Category/:categoryId',
	RequireAuth,
	sfa.deleteCategory
);

// CHANGE_REASON
legacyRouter.get(
	'/api/v1/data/ChangeReason/:changeReasonId',
	RequireAuth,
	sfa.getChangeReason
);
legacyRouter.get('/api/v1/data/ChangeReason', RequireAuth, sfa.getAllChangeReason);
legacyRouter.post('/api/v1/data/ChangeReason', RequireAuth, sfa.postChangeReason);
legacyRouter.put(
	'/api/v1/data/ChangeReason/:changeReasonId',
	RequireAuth,
	sfa.putChangeReason
);
legacyRouter.delete(
	'/api/v1/data/ChangeReason/:changeReasonId',
	RequireAuth,
	sfa.deleteChangeReason
);

// CHILD_CARE_CEILING
legacyRouter.get(
	'/api/v1/data/ChildCareCeilings/:academicYear',
	RequireAuth,
	sfa.getChildCareCeiling
);
legacyRouter.get(
	'/api/v1/data/ChildCareCeilings',
	RequireAuth,
	sfa.getAllChildCareCeiling
);
legacyRouter.post(
	'/api/v1/data/ChildCareCeilings',
	RequireAuth,
	sfa.postChildCareCeiling
);
legacyRouter.put(
	'/api/v1/data/ChildCareCeilings/:academicYear',
	RequireAuth,
	sfa.putChildCareCeiling
);
legacyRouter.delete(
	'/api/v1/data/ChildCareCeilings/:academicYear',
	RequireAuth,
	sfa.deleteChildCareCeiling
);

// CITY
legacyRouter.get('/api/v1/data/City/:cityId', RequireAuth, sfa.getCity);
legacyRouter.get('/api/v1/data/City', RequireAuth, sfa.getAllCity);
legacyRouter.post('/api/v1/data/City', RequireAuth, sfa.postCity);
legacyRouter.put('/api/v1/data/City/:cityId', RequireAuth, sfa.putCity);
legacyRouter.delete('/api/v1/data/City/:cityId', RequireAuth, sfa.deleteCity);

// COMMUNICATION
legacyRouter.get(
	'/api/v1/data/Communication/:communicationId',
	RequireAuth,
	sfa.getCommunication
);
legacyRouter.get('/api/v1/data/Communication', RequireAuth, sfa.getAllCommunication);
legacyRouter.post('/api/v1/data/Communication', RequireAuth, sfa.postCommunication);
legacyRouter.put(
	'/api/v1/data/Communication/:communicationId',
	RequireAuth,
	sfa.putCommunication
);
legacyRouter.delete(
	'/api/v1/data/Communication/:communicationId',
	RequireAuth,
	sfa.deleteCommunication
);

// COMMUNICATION_LOG
legacyRouter.get(
	'/api/v1/data/CommunicationLogs/:communicationLogId',
	RequireAuth,
	sfa.getCommunicationLog
);
legacyRouter.get(
	'/api/v1/data/CommunicationLogs',
	RequireAuth,
	sfa.getAllCommunicationLog
);
legacyRouter.post(
	'/api/v1/data/CommunicationLogs',
	RequireAuth,
	sfa.postCommunicationLog
);
legacyRouter.put(
	'/api/v1/data/CommunicationLogs/:communicationLogId',
	RequireAuth,
	sfa.putCommunicationLog
);
legacyRouter.delete(
	'/api/v1/data/CommunicationLogs/:communicationLogId',
	RequireAuth,
	sfa.deleteCommunicationLog
);

// COMMUNICATION_TYPE
legacyRouter.get(
	'/api/v1/data/CommunicationType/:communicationTypeId',
	RequireAuth,
	sfa.getCommunicationType
);
legacyRouter.get(
	'/api/v1/data/CommunicationType',
	RequireAuth,
	sfa.getAllCommunicationType
);
legacyRouter.post(
	'/api/v1/data/CommunicationType',
	RequireAuth,
	sfa.postCommunicationType
);
legacyRouter.put(
	'/api/v1/data/CommunicationType/:communicationTypeId',
	RequireAuth,
	sfa.putCommunicationType
);
legacyRouter.delete(
	'/api/v1/data/CommunicationType/:communicationTypeId',
	RequireAuth,
	sfa.deleteCommunicationType
);

// CONVERT_YTID_TO_PEN
legacyRouter.get(
	'/api/v1/data/ConvertYtidToPen/:ytid',
	RequireAuth,
	sfa.getConvertYtidToPen
);
legacyRouter.get(
	'/api/v1/data/ConvertYtidToPen',
	RequireAuth,
	sfa.getAllConvertYtidToPen
);
legacyRouter.post(
	'/api/v1/data/ConvertYtidToPen',
	RequireAuth,
	sfa.postConvertYtidToPen
);
legacyRouter.put(
	'/api/v1/data/ConvertYtidToPen/:ytid',
	RequireAuth,
	sfa.putConvertYtidToPen
);
legacyRouter.delete(
	'/api/v1/data/ConvertYtidToPen/:ytid',
	RequireAuth,
	sfa.deleteConvertYtidToPen
);

// CORR_TYPE_BATCH_PARAM
legacyRouter.get(
	'/api/v1/data/CorrTypeBatchParams/:correspondenceTypeId',
	RequireAuth,
	sfa.getCorrTypeBatchParam
);
legacyRouter.get(
	'/api/v1/data/CorrTypeBatchParams',
	RequireAuth,
	sfa.getAllCorrTypeBatchParam
);
legacyRouter.post(
	'/api/v1/data/CorrTypeBatchParams',
	RequireAuth,
	sfa.postCorrTypeBatchParam
);
legacyRouter.put(
	'/api/v1/data/CorrTypeBatchParams/:correspondenceTypeId',
	RequireAuth,
	sfa.putCorrTypeBatchParam
);
legacyRouter.delete(
	'/api/v1/data/CorrTypeBatchParams/:correspondenceTypeId',
	RequireAuth,
	sfa.deleteCorrTypeBatchParam
);

// CORRES_BATCH_PARAM
legacyRouter.get(
	'/api/v1/data/CorresBatchParams/:correspondenceId',
	RequireAuth,
	sfa.getCorresBatchParam
);
legacyRouter.get(
	'/api/v1/data/CorresBatchParams',
	RequireAuth,
	sfa.getAllCorresBatchParam
);
legacyRouter.post(
	'/api/v1/data/CorresBatchParams',
	RequireAuth,
	sfa.postCorresBatchParam
);
legacyRouter.put(
	'/api/v1/data/CorresBatchParams/:correspondenceId',
	RequireAuth,
	sfa.putCorresBatchParam
);
legacyRouter.delete(
	'/api/v1/data/CorresBatchParams/:correspondenceId',
	RequireAuth,
	sfa.deleteCorresBatchParam
);

// CORRESPONDENCE
legacyRouter.get(
	'/api/v1/data/Correspondences/:correspondenceId',
	RequireAuth,
	sfa.getCorrespondence
);
legacyRouter.get('/api/v1/data/Correspondences', RequireAuth, sfa.getAllCorrespondence);
legacyRouter.post('/api/v1/data/Correspondences', RequireAuth, sfa.postCorrespondence);
legacyRouter.put(
	'/api/v1/data/Correspondences/:correspondenceId',
	RequireAuth,
	sfa.putCorrespondence
);
legacyRouter.delete(
	'/api/v1/data/Correspondences/:correspondenceId',
	RequireAuth,
	sfa.deleteCorrespondence
);

// CORRESPONDENCE_TYPE
legacyRouter.get(
	'/api/v1/data/CorrespondenceTypes/:correspondenceTypeId',
	RequireAuth,
	sfa.getCorrespondenceType
);
legacyRouter.get(
	'/api/v1/data/CorrespondenceTypes',
	RequireAuth,
	sfa.getAllCorrespondenceType
);
legacyRouter.post(
	'/api/v1/data/CorrespondenceTypes',
	RequireAuth,
	sfa.postCorrespondenceType
);
legacyRouter.put(
	'/api/v1/data/CorrespondenceTypes/:correspondenceTypeId',
	RequireAuth,
	sfa.putCorrespondenceType
);
legacyRouter.delete(
	'/api/v1/data/CorrespondenceTypes/:correspondenceTypeId',
	RequireAuth,
	sfa.deleteCorrespondenceType
);

// COUNTRY
legacyRouter.get('/api/v1/data/Country/:countryId', RequireAuth, sfa.getCountry);
legacyRouter.get('/api/v1/data/Country', RequireAuth, sfa.getAllCountry);
legacyRouter.post('/api/v1/data/Country', RequireAuth, sfa.postCountry);
legacyRouter.put('/api/v1/data/Country/:countryId', RequireAuth, sfa.putCountry);
legacyRouter.delete('/api/v1/data/Country/:countryId', RequireAuth, sfa.deleteCountry);

// COURSE_ENROLLED
legacyRouter.get(
	'/api/v1/data/CourseEnrolled/:courseEnrolledId',
	RequireAuth,
	sfa.getCourseEnrolled
);
legacyRouter.get('/api/v1/data/CourseEnrolled', RequireAuth, sfa.getAllCourseEnrolled);
legacyRouter.post('/api/v1/data/CourseEnrolled', RequireAuth, sfa.postCourseEnrolled);
legacyRouter.put(
	'/api/v1/data/CourseEnrolled/:courseEnrolledId',
	RequireAuth,
	sfa.putCourseEnrolled
);
legacyRouter.delete(
	'/api/v1/data/CourseEnrolled/:courseEnrolledId',
	RequireAuth,
	sfa.deleteCourseEnrolled
);

// CSG_LOOKUP
legacyRouter.get('/api/v1/data/CsgLookup/:academicYear', RequireAuth, sfa.getCsgLookup);
legacyRouter.get('/api/v1/data/CsgLookup', RequireAuth, sfa.getAllCsgLookup);
legacyRouter.post('/api/v1/data/CsgLookup', RequireAuth, sfa.postCsgLookup);
legacyRouter.put('/api/v1/data/CsgLookup/:academicYear', RequireAuth, sfa.putCsgLookup);
legacyRouter.delete(
	'/api/v1/data/CsgLookup/:academicYear',
	RequireAuth,
	sfa.deleteCsgLookup
);

// CSG_THRESHOLD
legacyRouter.get(
	'/api/v1/data/CsgThreshold/:academicYear',
	RequireAuth,
	sfa.getCsgThreshold
);
legacyRouter.get('/api/v1/data/CsgThreshold', RequireAuth, sfa.getAllCsgThreshold);
legacyRouter.post('/api/v1/data/CsgThreshold', RequireAuth, sfa.postCsgThreshold);
legacyRouter.put(
	'/api/v1/data/CsgThreshold/:academicYear',
	RequireAuth,
	sfa.putCsgThreshold
);
legacyRouter.delete(
	'/api/v1/data/CsgThreshold/:academicYear',
	RequireAuth,
	sfa.deleteCsgThreshold
);

// CSL_CODE
legacyRouter.get('/api/v1/data/CslCodes/:cslCodeId', RequireAuth, sfa.getCslCode);
legacyRouter.get('/api/v1/data/CslCodes', RequireAuth, sfa.getAllCslCode);
legacyRouter.post('/api/v1/data/CslCodes', RequireAuth, sfa.postCslCode);
legacyRouter.put('/api/v1/data/CslCodes/:cslCodeId', RequireAuth, sfa.putCslCode);
legacyRouter.delete('/api/v1/data/CslCodes/:cslCodeId', RequireAuth, sfa.deleteCslCode);

// CSL_CODE_OLD
legacyRouter.get('/api/v1/data/CslCodeOld/:cslCode', RequireAuth, sfa.getCslCodeOld);
legacyRouter.get('/api/v1/data/CslCodeOld', RequireAuth, sfa.getAllCslCodeOld);
legacyRouter.post('/api/v1/data/CslCodeOld', RequireAuth, sfa.postCslCodeOld);
legacyRouter.put('/api/v1/data/CslCodeOld/:cslCode', RequireAuth, sfa.putCslCodeOld);
legacyRouter.delete(
	'/api/v1/data/CslCodeOld/:cslCode',
	RequireAuth,
	sfa.deleteCslCodeOld
);

// CSL_LOOKUP
legacyRouter.get('/api/v1/data/CslLookup/:academicYear', RequireAuth, sfa.getCslLookup);
legacyRouter.get('/api/v1/data/CslLookup', RequireAuth, sfa.getAllCslLookup);
legacyRouter.post('/api/v1/data/CslLookup', RequireAuth, sfa.postCslLookup);
legacyRouter.put('/api/v1/data/CslLookup/:academicYear', RequireAuth, sfa.putCslLookup);
legacyRouter.delete(
	'/api/v1/data/CslLookup/:academicYear',
	RequireAuth,
	sfa.deleteCslLookup
);

// CSL_NARS_HISTORY
legacyRouter.get(
	'/api/v1/data/CslNarsHistory/:cslNarsHistoryId',
	RequireAuth,
	sfa.getCslNarsHistory
);
legacyRouter.get('/api/v1/data/CslNarsHistory', RequireAuth, sfa.getAllCslNarsHistory);
legacyRouter.post('/api/v1/data/CslNarsHistory', RequireAuth, sfa.postCslNarsHistory);
legacyRouter.put(
	'/api/v1/data/CslNarsHistory/:cslNarsHistoryId',
	RequireAuth,
	sfa.putCslNarsHistory
);
legacyRouter.delete(
	'/api/v1/data/CslNarsHistory/:cslNarsHistoryId',
	RequireAuth,
	sfa.deleteCslNarsHistory
);

// CSL_NARS_HISTORY_2010JUL29
legacyRouter.get(
	'/api/v1/data/CslNarsHistory2010jul29/:cslNarsHistoryId',
	RequireAuth,
	sfa.getCslNarsHistory2010jul29
);
legacyRouter.get(
	'/api/v1/data/CslNarsHistory2010jul29',
	RequireAuth,
	sfa.getAllCslNarsHistory2010jul29
);
legacyRouter.post(
	'/api/v1/data/CslNarsHistory2010jul29',
	RequireAuth,
	sfa.postCslNarsHistory2010jul29
);
legacyRouter.put(
	'/api/v1/data/CslNarsHistory2010jul29/:cslNarsHistoryId',
	RequireAuth,
	sfa.putCslNarsHistory2010jul29
);
legacyRouter.delete(
	'/api/v1/data/CslNarsHistory2010jul29/:cslNarsHistoryId',
	RequireAuth,
	sfa.deleteCslNarsHistory2010jul29
);

// CSL_NARS_HISTORY_2010MAY
legacyRouter.get(
	'/api/v1/data/CslNarsHistory2010may/:cslNarsHistoryId',
	RequireAuth,
	sfa.getCslNarsHistory2010may
);
legacyRouter.get(
	'/api/v1/data/CslNarsHistory2010may',
	RequireAuth,
	sfa.getAllCslNarsHistory2010may
);
legacyRouter.post(
	'/api/v1/data/CslNarsHistory2010may',
	RequireAuth,
	sfa.postCslNarsHistory2010may
);
legacyRouter.put(
	'/api/v1/data/CslNarsHistory2010may/:cslNarsHistoryId',
	RequireAuth,
	sfa.putCslNarsHistory2010may
);
legacyRouter.delete(
	'/api/v1/data/CslNarsHistory2010may/:cslNarsHistoryId',
	RequireAuth,
	sfa.deleteCslNarsHistory2010may
);

// CSL_NARS_HISTORY_2011JAN27
legacyRouter.get(
	'/api/v1/data/CslNarsHistory2011jan27/:cslNarsHistoryId',
	RequireAuth,
	sfa.getCslNarsHistory2011jan27
);
legacyRouter.get(
	'/api/v1/data/CslNarsHistory2011jan27',
	RequireAuth,
	sfa.getAllCslNarsHistory2011jan27
);
legacyRouter.post(
	'/api/v1/data/CslNarsHistory2011jan27',
	RequireAuth,
	sfa.postCslNarsHistory2011jan27
);
legacyRouter.put(
	'/api/v1/data/CslNarsHistory2011jan27/:cslNarsHistoryId',
	RequireAuth,
	sfa.putCslNarsHistory2011jan27
);
legacyRouter.delete(
	'/api/v1/data/CslNarsHistory2011jan27/:cslNarsHistoryId',
	RequireAuth,
	sfa.deleteCslNarsHistory2011jan27
);

// CSL_NSLSC_ADDRESS
legacyRouter.get(
	'/api/v1/data/CslNslscAddress/:cslNslscAddressId',
	RequireAuth,
	sfa.getCslNslscAddress
);
legacyRouter.get('/api/v1/data/CslNslscAddress', RequireAuth, sfa.getAllCslNslscAddress);
legacyRouter.post('/api/v1/data/CslNslscAddress', RequireAuth, sfa.postCslNslscAddress);
legacyRouter.put(
	'/api/v1/data/CslNslscAddress/:cslNslscAddressId',
	RequireAuth,
	sfa.putCslNslscAddress
);
legacyRouter.delete(
	'/api/v1/data/CslNslscAddress/:cslNslscAddressId',
	RequireAuth,
	sfa.deleteCslNslscAddress
);

// CSL_REASON
legacyRouter.get('/api/v1/data/CslReasons/:cslReasonId', RequireAuth, sfa.getCslReason);
legacyRouter.get('/api/v1/data/CslReasons', RequireAuth, sfa.getAllCslReason);
legacyRouter.post('/api/v1/data/CslReasons', RequireAuth, sfa.postCslReason);
legacyRouter.put('/api/v1/data/CslReasons/:cslReasonId', RequireAuth, sfa.putCslReason);
legacyRouter.delete(
	'/api/v1/data/CslReasons/:cslReasonId',
	RequireAuth,
	sfa.deleteCslReason
);

// CSL_RESTRICTED
legacyRouter.get(
	'/api/v1/data/CslRestricted/:cslRestrictedId',
	RequireAuth,
	sfa.getCslRestricted
);
legacyRouter.get('/api/v1/data/CslRestricted', RequireAuth, sfa.getAllCslRestricted);
legacyRouter.post('/api/v1/data/CslRestricted', RequireAuth, sfa.postCslRestricted);
legacyRouter.put(
	'/api/v1/data/CslRestricted/:cslRestrictedId',
	RequireAuth,
	sfa.putCslRestricted
);
legacyRouter.delete(
	'/api/v1/data/CslRestricted/:cslRestrictedId',
	RequireAuth,
	sfa.deleteCslRestricted
);

// CSL_RESTRICTED_BACKUP
legacyRouter.get(
	'/api/v1/data/CslRestrictedBackup/:cslRestrictedId',
	RequireAuth,
	sfa.getCslRestrictedBackup
);
legacyRouter.get(
	'/api/v1/data/CslRestrictedBackup',
	RequireAuth,
	sfa.getAllCslRestrictedBackup
);
legacyRouter.post(
	'/api/v1/data/CslRestrictedBackup',
	RequireAuth,
	sfa.postCslRestrictedBackup
);
legacyRouter.put(
	'/api/v1/data/CslRestrictedBackup/:cslRestrictedId',
	RequireAuth,
	sfa.putCslRestrictedBackup
);
legacyRouter.delete(
	'/api/v1/data/CslRestrictedBackup/:cslRestrictedId',
	RequireAuth,
	sfa.deleteCslRestrictedBackup
);

// DATA_CORRECTION
legacyRouter.get(
	'/api/v1/data/DataCorrections/:dataCorrectionId',
	RequireAuth,
	sfa.getDataCorrection
);
legacyRouter.get('/api/v1/data/DataCorrections', RequireAuth, sfa.getAllDataCorrection);
legacyRouter.post('/api/v1/data/DataCorrections', RequireAuth, sfa.postDataCorrection);
legacyRouter.put(
	'/api/v1/data/DataCorrections/:dataCorrectionId',
	RequireAuth,
	sfa.putDataCorrection
);
legacyRouter.delete(
	'/api/v1/data/DataCorrections/:dataCorrectionId',
	RequireAuth,
	sfa.deleteDataCorrection
);

// DEPENDENT
legacyRouter.get('/api/v1/data/Dependents/:dependentId', RequireAuth, sfa.getDependent);
legacyRouter.get('/api/v1/data/Dependents', RequireAuth, sfa.getAllDependent);
legacyRouter.post('/api/v1/data/Dependents', RequireAuth, sfa.postDependent);
legacyRouter.put('/api/v1/data/Dependents/:dependentId', RequireAuth, sfa.putDependent);
legacyRouter.delete(
	'/api/v1/data/Dependents/:dependentId',
	RequireAuth,
	sfa.deleteDependent
);

// DEPENDENT_ELIGIBILITY
legacyRouter.get(
	'/api/v1/data/DependentEligibility/:dependentEligibilityId',
	RequireAuth,
	sfa.getDependentEligibility
);
legacyRouter.get(
	'/api/v1/data/DependentEligibility',
	RequireAuth,
	sfa.getAllDependentEligibility
);
legacyRouter.post(
	'/api/v1/data/DependentEligibility',
	RequireAuth,
	sfa.postDependentEligibility
);
legacyRouter.put(
	'/api/v1/data/DependentEligibility/:dependentEligibilityId',
	RequireAuth,
	sfa.putDependentEligibility
);
legacyRouter.delete(
	'/api/v1/data/DependentEligibility/:dependentEligibilityId',
	RequireAuth,
	sfa.deleteDependentEligibility
);

// DISAB_SERVICE_TYPE
legacyRouter.get(
	'/api/v1/data/DisabServiceTypes/:disabServiceTypeId',
	RequireAuth,
	sfa.getDisabServiceType
);
legacyRouter.get(
	'/api/v1/data/DisabServiceTypes',
	RequireAuth,
	sfa.getAllDisabServiceType
);
legacyRouter.post(
	'/api/v1/data/DisabServiceTypes',
	RequireAuth,
	sfa.postDisabServiceType
);
legacyRouter.put(
	'/api/v1/data/DisabServiceTypes/:disabServiceTypeId',
	RequireAuth,
	sfa.putDisabServiceType
);
legacyRouter.delete(
	'/api/v1/data/DisabServiceTypes/:disabServiceTypeId',
	RequireAuth,
	sfa.deleteDisabServiceType
);

// DISABILITY
legacyRouter.get(
	'/api/v1/data/Disability/:disabilityId',
	RequireAuth,
	sfa.getDisability
);
legacyRouter.get('/api/v1/data/Disability', RequireAuth, sfa.getAllDisability);
legacyRouter.post('/api/v1/data/Disability', RequireAuth, sfa.postDisability);
legacyRouter.put(
	'/api/v1/data/Disability/:disabilityId',
	RequireAuth,
	sfa.putDisability
);
legacyRouter.delete(
	'/api/v1/data/Disability/:disabilityId',
	RequireAuth,
	sfa.deleteDisability
);

// DISABILITY_REQUIREMENT
legacyRouter.get(
	'/api/v1/data/DisabilityRequirements/:disabilityRequirementId',
	RequireAuth,
	sfa.getDisabilityRequirement
);
legacyRouter.get(
	'/api/v1/data/DisabilityRequirements',
	RequireAuth,
	sfa.getAllDisabilityRequirement
);
legacyRouter.post(
	'/api/v1/data/DisabilityRequirements',
	RequireAuth,
	sfa.postDisabilityRequirement
);
legacyRouter.put(
	'/api/v1/data/DisabilityRequirements/:disabilityRequirementId',
	RequireAuth,
	sfa.putDisabilityRequirement
);
legacyRouter.delete(
	'/api/v1/data/DisabilityRequirements/:disabilityRequirementId',
	RequireAuth,
	sfa.deleteDisabilityRequirement
);

// DISABILITY_TYPE
legacyRouter.get(
	'/api/v1/data/DisabilityTypes/:disabilityTypeId',
	RequireAuth,
	sfa.getDisabilityType
);
legacyRouter.get('/api/v1/data/DisabilityTypes', RequireAuth, sfa.getAllDisabilityType);
legacyRouter.post('/api/v1/data/DisabilityTypes', RequireAuth, sfa.postDisabilityType);
legacyRouter.put(
	'/api/v1/data/DisabilityTypes/:disabilityTypeId',
	RequireAuth,
	sfa.putDisabilityType
);
legacyRouter.delete(
	'/api/v1/data/DisabilityTypes/:disabilityTypeId',
	RequireAuth,
	sfa.deleteDisabilityType
);

// DISBURSEMENT
legacyRouter.get(
	'/api/v1/data/Disbursements/:disbursementId',
	RequireAuth,
	sfa.getDisbursement
);
legacyRouter.get('/api/v1/data/Disbursements', RequireAuth, sfa.getAllDisbursement);
legacyRouter.post('/api/v1/data/Disbursements', RequireAuth, sfa.postDisbursement);
legacyRouter.put(
	'/api/v1/data/Disbursements/:disbursementId',
	RequireAuth,
	sfa.putDisbursement
);
legacyRouter.delete(
	'/api/v1/data/Disbursements/:disbursementId',
	RequireAuth,
	sfa.deleteDisbursement
);

// DISBURSEMENT_TYPE
legacyRouter.get(
	'/api/v1/data/DisbursementTypes/:disbursementTypeId',
	RequireAuth,
	sfa.getDisbursementType
);
legacyRouter.get(
	'/api/v1/data/DisbursementTypes',
	RequireAuth,
	sfa.getAllDisbursementType
);
legacyRouter.post(
	'/api/v1/data/DisbursementTypes',
	RequireAuth,
	sfa.postDisbursementType
);
legacyRouter.put(
	'/api/v1/data/DisbursementTypes/:disbursementTypeId',
	RequireAuth,
	sfa.putDisbursementType
);
legacyRouter.delete(
	'/api/v1/data/DisbursementTypes/:disbursementTypeId',
	RequireAuth,
	sfa.deleteDisbursementType
);

// ECERT_IMPORT
legacyRouter.get(
	'/api/v1/data/EcertImports/:sequenceNumber',
	RequireAuth,
	sfa.getEcertImport
);
legacyRouter.get('/api/v1/data/EcertImports', RequireAuth, sfa.getAllEcertImport);
legacyRouter.post('/api/v1/data/EcertImports', RequireAuth, sfa.postEcertImport);
legacyRouter.put(
	'/api/v1/data/EcertImports/:sequenceNumber',
	RequireAuth,
	sfa.putEcertImport
);
legacyRouter.delete(
	'/api/v1/data/EcertImports/:sequenceNumber',
	RequireAuth,
	sfa.deleteEcertImport
);

// EDUCATION
legacyRouter.get('/api/v1/data/Education/:educationId', RequireAuth, sfa.getEducation);
legacyRouter.get('/api/v1/data/Education', RequireAuth, sfa.getAllEducation);
legacyRouter.post('/api/v1/data/Education', RequireAuth, sfa.postEducation);
legacyRouter.put('/api/v1/data/Education/:educationId', RequireAuth, sfa.putEducation);
legacyRouter.delete(
	'/api/v1/data/Education/:educationId',
	RequireAuth,
	sfa.deleteEducation
);

// EDUCATION_LEVEL
legacyRouter.get(
	'/api/v1/data/EducationLevel/:educationLevelId',
	RequireAuth,
	sfa.getEducationLevel
);
legacyRouter.get('/api/v1/data/EducationLevel', RequireAuth, sfa.getAllEducationLevel);
legacyRouter.post('/api/v1/data/EducationLevel', RequireAuth, sfa.postEducationLevel);
legacyRouter.put(
	'/api/v1/data/EducationLevel/:educationLevelId',
	RequireAuth,
	sfa.putEducationLevel
);
legacyRouter.delete(
	'/api/v1/data/EducationLevel/:educationLevelId',
	RequireAuth,
	sfa.deleteEducationLevel
);

// ENTITLEMENT_ERROR
legacyRouter.get(
	'/api/v1/data/EntitlementErrors/:entitlementErrorId',
	RequireAuth,
	sfa.getEntitlementError
);
legacyRouter.get(
	'/api/v1/data/EntitlementErrors',
	RequireAuth,
	sfa.getAllEntitlementError
);
legacyRouter.post(
	'/api/v1/data/EntitlementErrors',
	RequireAuth,
	sfa.postEntitlementError
);
legacyRouter.put(
	'/api/v1/data/EntitlementErrors/:entitlementErrorId',
	RequireAuth,
	sfa.putEntitlementError
);
legacyRouter.delete(
	'/api/v1/data/EntitlementErrors/:entitlementErrorId',
	RequireAuth,
	sfa.deleteEntitlementError
);

// ENTITLEMENT_ERROR_CODES
legacyRouter.get(
	'/api/v1/data/EntitlementErrorCodes/:errorCode',
	RequireAuth,
	sfa.getEntitlementErrorCodes
);
legacyRouter.get(
	'/api/v1/data/EntitlementErrorCodes',
	RequireAuth,
	sfa.getAllEntitlementErrorCodes
);
legacyRouter.post(
	'/api/v1/data/EntitlementErrorCodes',
	RequireAuth,
	sfa.postEntitlementErrorCodes
);
legacyRouter.put(
	'/api/v1/data/EntitlementErrorCodes/:errorCode',
	RequireAuth,
	sfa.putEntitlementErrorCodes
);
legacyRouter.delete(
	'/api/v1/data/EntitlementErrorCodes/:errorCode',
	RequireAuth,
	sfa.deleteEntitlementErrorCodes
);

// EXPENSE
legacyRouter.get('/api/v1/data/Expenses/:expenseId', RequireAuth, sfa.getExpense);
legacyRouter.get('/api/v1/data/Expenses', RequireAuth, sfa.getAllExpense);
legacyRouter.post('/api/v1/data/Expenses', RequireAuth, sfa.postExpense);
legacyRouter.put('/api/v1/data/Expenses/:expenseId', RequireAuth, sfa.putExpense);
legacyRouter.delete('/api/v1/data/Expenses/:expenseId', RequireAuth, sfa.deleteExpense);

// EXPENSE_CATEGORY
legacyRouter.get(
	'/api/v1/data/ExpenseCategory/:expenseCategoryId',
	RequireAuth,
	sfa.getExpenseCategory
);
legacyRouter.get('/api/v1/data/ExpenseCategory', RequireAuth, sfa.getAllExpenseCategory);
legacyRouter.post('/api/v1/data/ExpenseCategory', RequireAuth, sfa.postExpenseCategory);
legacyRouter.put(
	'/api/v1/data/ExpenseCategory/:expenseCategoryId',
	RequireAuth,
	sfa.putExpenseCategory
);
legacyRouter.delete(
	'/api/v1/data/ExpenseCategory/:expenseCategoryId',
	RequireAuth,
	sfa.deleteExpenseCategory
);

// EXTERNAL_YEA
legacyRouter.get('/api/v1/data/ExternalYea/:fname', RequireAuth, sfa.getExternalYea);
legacyRouter.get('/api/v1/data/ExternalYea', RequireAuth, sfa.getAllExternalYea);
legacyRouter.post('/api/v1/data/ExternalYea', RequireAuth, sfa.postExternalYea);
legacyRouter.put('/api/v1/data/ExternalYea/:fname', RequireAuth, sfa.putExternalYea);
legacyRouter.delete(
	'/api/v1/data/ExternalYea/:fname',
	RequireAuth,
	sfa.deleteExternalYea
);

// FIELD_PROGRAM
legacyRouter.get(
	'/api/v1/data/FieldPrograms/:studyFieldId',
	RequireAuth,
	sfa.getFieldProgram
);
legacyRouter.get('/api/v1/data/FieldPrograms', RequireAuth, sfa.getAllFieldProgram);
legacyRouter.post('/api/v1/data/FieldPrograms', RequireAuth, sfa.postFieldProgram);
legacyRouter.put(
	'/api/v1/data/FieldPrograms/:studyFieldId',
	RequireAuth,
	sfa.putFieldProgram
);
legacyRouter.delete(
	'/api/v1/data/FieldPrograms/:studyFieldId',
	RequireAuth,
	sfa.deleteFieldProgram
);

// FIRST_NATION
legacyRouter.get(
	'/api/v1/data/FirstNations/:firstNationId',
	RequireAuth,
	sfa.getFirstNation
);
legacyRouter.get('/api/v1/data/FirstNations', RequireAuth, sfa.getAllFirstNation);
legacyRouter.post('/api/v1/data/FirstNations', RequireAuth, sfa.postFirstNation);
legacyRouter.put(
	'/api/v1/data/FirstNations/:firstNationId',
	RequireAuth,
	sfa.putFirstNation
);
legacyRouter.delete(
	'/api/v1/data/FirstNations/:firstNationId',
	RequireAuth,
	sfa.deleteFirstNation
);

// FUNDING_GROUP
legacyRouter.get(
	'/api/v1/data/FundingGroups/:fundingGroupId',
	RequireAuth,
	sfa.getFundingGroup
);
legacyRouter.get('/api/v1/data/FundingGroups', RequireAuth, sfa.getAllFundingGroup);
legacyRouter.post('/api/v1/data/FundingGroups', RequireAuth, sfa.postFundingGroup);
legacyRouter.put(
	'/api/v1/data/FundingGroups/:fundingGroupId',
	RequireAuth,
	sfa.putFundingGroup
);
legacyRouter.delete(
	'/api/v1/data/FundingGroups/:fundingGroupId',
	RequireAuth,
	sfa.deleteFundingGroup
);

// FUNDING_REQUEST
legacyRouter.get(
	'/api/v1/data/FundingRequests/:fundingRequestId',
	RequireAuth,
	sfa.getFundingRequest
);
legacyRouter.get('/api/v1/data/FundingRequests', RequireAuth, sfa.getAllFundingRequest);
legacyRouter.post('/api/v1/data/FundingRequests', RequireAuth, sfa.postFundingRequest);
legacyRouter.put(
	'/api/v1/data/FundingRequests/:fundingRequestId',
	RequireAuth,
	sfa.putFundingRequest
);
legacyRouter.delete(
	'/api/v1/data/FundingRequests/:fundingRequestId',
	RequireAuth,
	sfa.deleteFundingRequest
);

// HIDE_PART_TIME_REASON
legacyRouter.get(
	'/api/v1/data/HidePartTimeReasons/:historyDetailId',
	RequireAuth,
	sfa.getHidePartTimeReason
);
legacyRouter.get(
	'/api/v1/data/HidePartTimeReasons',
	RequireAuth,
	sfa.getAllHidePartTimeReason
);
legacyRouter.post(
	'/api/v1/data/HidePartTimeReasons',
	RequireAuth,
	sfa.postHidePartTimeReason
);
legacyRouter.put(
	'/api/v1/data/HidePartTimeReasons/:historyDetailId',
	RequireAuth,
	sfa.putHidePartTimeReason
);
legacyRouter.delete(
	'/api/v1/data/HidePartTimeReasons/:historyDetailId',
	RequireAuth,
	sfa.deleteHidePartTimeReason
);

// HIGH_SCHOOL
legacyRouter.get(
	'/api/v1/data/HighSchools/:highSchoolId',
	RequireAuth,
	sfa.getHighSchool
);
legacyRouter.get('/api/v1/data/HighSchools', RequireAuth, sfa.getAllHighSchool);
legacyRouter.post('/api/v1/data/HighSchools', RequireAuth, sfa.postHighSchool);
legacyRouter.put(
	'/api/v1/data/HighSchools/:highSchoolId',
	RequireAuth,
	sfa.putHighSchool
);
legacyRouter.delete(
	'/api/v1/data/HighSchools/:highSchoolId',
	RequireAuth,
	sfa.deleteHighSchool
);

// HISTORY_DETAIL
legacyRouter.get(
	'/api/v1/data/HistoryDetails/:historyDetailId',
	RequireAuth,
	sfa.getHistoryDetail
);
legacyRouter.get('/api/v1/data/HistoryDetails', RequireAuth, sfa.getAllHistoryDetail);
legacyRouter.post('/api/v1/data/HistoryDetails', RequireAuth, sfa.postHistoryDetail);
legacyRouter.put(
	'/api/v1/data/HistoryDetails/:historyDetailId',
	RequireAuth,
	sfa.putHistoryDetail
);
legacyRouter.delete(
	'/api/v1/data/HistoryDetails/:historyDetailId',
	RequireAuth,
	sfa.deleteHistoryDetail
);

// INFO_CATEGORY
legacyRouter.get(
	'/api/v1/data/InfoCategory/:infoCategoryId',
	RequireAuth,
	sfa.getInfoCategory
);
legacyRouter.get('/api/v1/data/InfoCategory', RequireAuth, sfa.getAllInfoCategory);
legacyRouter.post('/api/v1/data/InfoCategory', RequireAuth, sfa.postInfoCategory);
legacyRouter.put(
	'/api/v1/data/InfoCategory/:infoCategoryId',
	RequireAuth,
	sfa.putInfoCategory
);
legacyRouter.delete(
	'/api/v1/data/InfoCategory/:infoCategoryId',
	RequireAuth,
	sfa.deleteInfoCategory
);

// INSTITUTION
/* legacyRouter.get("/api/v1/data/Institutions/:institutionId", RequireAuth, sfa.getInstitution)
legacyRouter.get("/api/v1/data/Institutions", RequireAuth, sfa.getAllInstitution)
legacyRouter.post("/api/v1/data/Institutions", RequireAuth, sfa.postInstitution)
legacyRouter.put("/api/v1/data/Institutions/:institutionId", RequireAuth, sfa.putInstitution)
legacyRouter.delete("/api/v1/data/Institutions/:institutionId", RequireAuth, sfa.deleteInstitution) */

// INSTITUTION_LEVEL
legacyRouter.get(
	'/api/v1/data/InstitutionLevels/:institutionLevelId',
	RequireAuth,
	sfa.getInstitutionLevel
);
legacyRouter.get(
	'/api/v1/data/InstitutionLevels',
	RequireAuth,
	sfa.getAllInstitutionLevel
);
legacyRouter.post(
	'/api/v1/data/InstitutionLevels',
	RequireAuth,
	sfa.postInstitutionLevel
);
legacyRouter.put(
	'/api/v1/data/InstitutionLevels/:institutionLevelId',
	RequireAuth,
	sfa.putInstitutionLevel
);
legacyRouter.delete(
	'/api/v1/data/InstitutionLevels/:institutionLevelId',
	RequireAuth,
	sfa.deleteInstitutionLevel
);

// INSTITUTION_REQUEST_TYPE
legacyRouter.get(
	'/api/v1/data/InstitutionRequestTypes/:institutionId',
	RequireAuth,
	sfa.getInstitutionRequestType
);
legacyRouter.get(
	'/api/v1/data/InstitutionRequestTypes',
	RequireAuth,
	sfa.getAllInstitutionRequestType
);
legacyRouter.post(
	'/api/v1/data/InstitutionRequestTypes',
	RequireAuth,
	sfa.postInstitutionRequestType
);
legacyRouter.put(
	'/api/v1/data/InstitutionRequestTypes/:institutionId',
	RequireAuth,
	sfa.putInstitutionRequestType
);
legacyRouter.delete(
	'/api/v1/data/InstitutionRequestTypes/:institutionId',
	RequireAuth,
	sfa.deleteInstitutionRequestType
);

// INSTITUTION_TYPE
legacyRouter.get(
	'/api/v1/data/InstitutionTypes/:institutionTypeId',
	RequireAuth,
	sfa.getInstitutionType
);
legacyRouter.get(
	'/api/v1/data/InstitutionTypes',
	RequireAuth,
	sfa.getAllInstitutionType
);
legacyRouter.post('/api/v1/data/InstitutionTypes', RequireAuth, sfa.postInstitutionType);
legacyRouter.put(
	'/api/v1/data/InstitutionTypes/:institutionTypeId',
	RequireAuth,
	sfa.putInstitutionType
);
legacyRouter.delete(
	'/api/v1/data/InstitutionTypes/:institutionTypeId',
	RequireAuth,
	sfa.deleteInstitutionType
);

// INSTRUCTION_TYPE
legacyRouter.get(
	'/api/v1/data/InstructionTypes/:instructionTypeId',
	RequireAuth,
	sfa.getInstructionType
);
legacyRouter.get(
	'/api/v1/data/InstructionTypes',
	RequireAuth,
	sfa.getAllInstructionType
);
legacyRouter.post('/api/v1/data/InstructionTypes', RequireAuth, sfa.postInstructionType);
legacyRouter.put(
	'/api/v1/data/InstructionTypes/:instructionTypeId',
	RequireAuth,
	sfa.putInstructionType
);
legacyRouter.delete(
	'/api/v1/data/InstructionTypes/:instructionTypeId',
	RequireAuth,
	sfa.deleteInstructionType
);

// INVESTMENT
legacyRouter.get(
	'/api/v1/data/Investments/:investmentId',
	RequireAuth,
	sfa.getInvestment
);
legacyRouter.get('/api/v1/data/Investments', RequireAuth, sfa.getAllInvestment);
legacyRouter.post('/api/v1/data/Investments', RequireAuth, sfa.postInvestment);
legacyRouter.put(
	'/api/v1/data/Investments/:investmentId',
	RequireAuth,
	sfa.putInvestment
);
legacyRouter.delete(
	'/api/v1/data/Investments/:investmentId',
	RequireAuth,
	sfa.deleteInvestment
);

// INVESTMENT_TYPE
legacyRouter.get(
	'/api/v1/data/InvestmentTypes/:investmentTypeId',
	RequireAuth,
	sfa.getInvestmentType
);
legacyRouter.get('/api/v1/data/InvestmentTypes', RequireAuth, sfa.getAllInvestmentType);
legacyRouter.post('/api/v1/data/InvestmentTypes', RequireAuth, sfa.postInvestmentType);
legacyRouter.put(
	'/api/v1/data/InvestmentTypes/:investmentTypeId',
	RequireAuth,
	sfa.putInvestmentType
);
legacyRouter.delete(
	'/api/v1/data/InvestmentTypes/:investmentTypeId',
	RequireAuth,
	sfa.deleteInvestmentType
);

// LANGUAGE
legacyRouter.get('/api/v1/data/Languages/:languageId', RequireAuth, sfa.getLanguage);
legacyRouter.get('/api/v1/data/Languages', RequireAuth, sfa.getAllLanguage);
legacyRouter.post('/api/v1/data/Languages', RequireAuth, sfa.postLanguage);
legacyRouter.put('/api/v1/data/Languages/:languageId', RequireAuth, sfa.putLanguage);
legacyRouter.delete(
	'/api/v1/data/Languages/:languageId',
	RequireAuth,
	sfa.deleteLanguage
);

// LOOKUP_TABLE
legacyRouter.get('/api/v1/data/LookupTable/:tableName', RequireAuth, sfa.getLookupTable);
legacyRouter.get('/api/v1/data/LookupTable', RequireAuth, sfa.getAllLookupTable);
legacyRouter.post('/api/v1/data/LookupTable', RequireAuth, sfa.postLookupTable);
legacyRouter.put('/api/v1/data/LookupTable/:tableName', RequireAuth, sfa.putLookupTable);
legacyRouter.delete(
	'/api/v1/data/LookupTable/:tableName',
	RequireAuth,
	sfa.deleteLookupTable
);

// MARITAL_STATUS
legacyRouter.get(
	'/api/v1/data/MaritalStatus/:maritalStatusId',
	RequireAuth,
	sfa.getMaritalStatus
);
legacyRouter.get('/api/v1/data/MaritalStatus', RequireAuth, sfa.getAllMaritalStatus);
legacyRouter.post('/api/v1/data/MaritalStatus', RequireAuth, sfa.postMaritalStatus);
legacyRouter.put(
	'/api/v1/data/MaritalStatus/:maritalStatusId',
	RequireAuth,
	sfa.putMaritalStatus
);
legacyRouter.delete(
	'/api/v1/data/MaritalStatus/:maritalStatusId',
	RequireAuth,
	sfa.deleteMaritalStatus
);

// MENU_STATE
legacyRouter.get('/api/v1/data/MenuStates/:menuStateId', RequireAuth, sfa.getMenuState);
legacyRouter.get('/api/v1/data/MenuStates', RequireAuth, sfa.getAllMenuState);
legacyRouter.post('/api/v1/data/MenuStates', RequireAuth, sfa.postMenuState);
legacyRouter.put('/api/v1/data/MenuStates/:menuStateId', RequireAuth, sfa.putMenuState);
legacyRouter.delete(
	'/api/v1/data/MenuStates/:menuStateId',
	RequireAuth,
	sfa.deleteMenuState
);

// MESSAGE
legacyRouter.get('/api/v1/data/Messages/:mesgId', RequireAuth, sfa.getMessage);
legacyRouter.get('/api/v1/data/Messages', RequireAuth, sfa.getAllMessage);
legacyRouter.post('/api/v1/data/Messages', RequireAuth, sfa.postMessage);
legacyRouter.put('/api/v1/data/Messages/:mesgId', RequireAuth, sfa.putMessage);
legacyRouter.delete('/api/v1/data/Messages/:mesgId', RequireAuth, sfa.deleteMessage);

// CURRENT_DEPENDENT_ELIGIBILITY
legacyRouter.get(
	'/api/v1/data/CurrentDependentEligibility/:historyDetailId',
	RequireAuth,
	sfa.getCurrentDependentEligibility
);
legacyRouter.get(
	'/api/v1/data/CurrentDependentEligibility',
	RequireAuth,
	sfa.getAllCurrentDependentEligibility
);
legacyRouter.post(
	'/api/v1/data/CurrentDependentEligibility',
	RequireAuth,
	sfa.postCurrentDependentEligibility
);
legacyRouter.put(
	'/api/v1/data/CurrentDependentEligibility/:historyDetailId',
	RequireAuth,
	sfa.putCurrentDependentEligibility
);
legacyRouter.delete(
	'/api/v1/data/CurrentDependentEligibility/:historyDetailId',
	RequireAuth,
	sfa.deleteCurrentDependentEligibility
);

// MSFAA
legacyRouter.get('/api/v1/data/Msfaa/:msfaaId', RequireAuth, sfa.getMsfaa);
legacyRouter.get('/api/v1/data/Msfaa', RequireAuth, sfa.getAllMsfaa);
legacyRouter.post('/api/v1/data/Msfaa', RequireAuth, sfa.postMsfaa);
legacyRouter.put('/api/v1/data/Msfaa/:msfaaId', RequireAuth, sfa.putMsfaa);
legacyRouter.delete('/api/v1/data/Msfaa/:msfaaId', RequireAuth, sfa.deleteMsfaa);

// FUNDING_HISTORY
legacyRouter.get(
	'/api/v1/data/FundingHistory/:studentId',
	RequireAuth,
	sfa.getFundingHistory
);
legacyRouter.get('/api/v1/data/FundingHistory', RequireAuth, sfa.getAllFundingHistory);
legacyRouter.post('/api/v1/data/FundingHistory', RequireAuth, sfa.postFundingHistory);
legacyRouter.put(
	'/api/v1/data/FundingHistory/:studentId',
	RequireAuth,
	sfa.putFundingHistory
);
legacyRouter.delete(
	'/api/v1/data/FundingHistory/:studentId',
	RequireAuth,
	sfa.deleteFundingHistory
);

// MSFAA_EMAIL_LOG
legacyRouter.get(
	'/api/v1/data/MsfaaEmailLogs/:msfaaEmailLogId',
	RequireAuth,
	sfa.getMsfaaEmailLog
);
legacyRouter.get('/api/v1/data/MsfaaEmailLogs', RequireAuth, sfa.getAllMsfaaEmailLog);
legacyRouter.post('/api/v1/data/MsfaaEmailLogs', RequireAuth, sfa.postMsfaaEmailLog);
legacyRouter.put(
	'/api/v1/data/MsfaaEmailLogs/:msfaaEmailLogId',
	RequireAuth,
	sfa.putMsfaaEmailLog
);
legacyRouter.delete(
	'/api/v1/data/MsfaaEmailLogs/:msfaaEmailLogId',
	RequireAuth,
	sfa.deleteMsfaaEmailLog
);

// FUNDING_REQUEST_REQUIREMENT
legacyRouter.get(
	'/api/v1/data/FundingRequestRequirements/:requestTypeId',
	RequireAuth,
	sfa.getFundingRequestRequirement
);
legacyRouter.get(
	'/api/v1/data/FundingRequestRequirements',
	RequireAuth,
	sfa.getAllFundingRequestRequirement
);
legacyRouter.post(
	'/api/v1/data/FundingRequestRequirements',
	RequireAuth,
	sfa.postFundingRequestRequirement
);
legacyRouter.put(
	'/api/v1/data/FundingRequestRequirements/:requestTypeId',
	RequireAuth,
	sfa.putFundingRequestRequirement
);
legacyRouter.delete(
	'/api/v1/data/FundingRequestRequirements/:requestTypeId',
	RequireAuth,
	sfa.deleteFundingRequestRequirement
);

// MSFAA_IMPORT
legacyRouter.get(
	'/api/v1/data/MsfaaImport/:agreementNumber',
	RequireAuth,
	sfa.getMsfaaImport
);
legacyRouter.get('/api/v1/data/MsfaaImport', RequireAuth, sfa.getAllMsfaaImport);
legacyRouter.post('/api/v1/data/MsfaaImport', RequireAuth, sfa.postMsfaaImport);
legacyRouter.put(
	'/api/v1/data/MsfaaImport/:agreementNumber',
	RequireAuth,
	sfa.putMsfaaImport
);
legacyRouter.delete(
	'/api/v1/data/MsfaaImport/:agreementNumber',
	RequireAuth,
	sfa.deleteMsfaaImport
);

// INQ_STATUS
legacyRouter.get('/api/v1/data/InqStatus/:requestType', RequireAuth, sfa.getInqStatus);
legacyRouter.get('/api/v1/data/InqStatus', RequireAuth, sfa.getAllInqStatus);
legacyRouter.post('/api/v1/data/InqStatus', RequireAuth, sfa.postInqStatus);
legacyRouter.put('/api/v1/data/InqStatus/:requestType', RequireAuth, sfa.putInqStatus);
legacyRouter.delete(
	'/api/v1/data/InqStatus/:requestType',
	RequireAuth,
	sfa.deleteInqStatus
);

// OFFICER
legacyRouter.get('/api/v1/data/Officers/:officerId', RequireAuth, sfa.getOfficer);
legacyRouter.get('/api/v1/data/Officers', RequireAuth, sfa.getAllOfficer);
legacyRouter.post('/api/v1/data/Officers', RequireAuth, sfa.postOfficer);
legacyRouter.put('/api/v1/data/Officers/:officerId', RequireAuth, sfa.putOfficer);
legacyRouter.delete('/api/v1/data/Officers/:officerId', RequireAuth, sfa.deleteOfficer);

// REQUEST_REQUIREMENT_MET
legacyRouter.get(
	'/api/v1/data/RequestRequirementMet/:requestTypeId',
	RequireAuth,
	sfa.getRequestRequirementMet
);
legacyRouter.get(
	'/api/v1/data/RequestRequirementMet',
	RequireAuth,
	sfa.getAllRequestRequirementMet
);
legacyRouter.post(
	'/api/v1/data/RequestRequirementMet',
	RequireAuth,
	sfa.postRequestRequirementMet
);
legacyRouter.put(
	'/api/v1/data/RequestRequirementMet/:requestTypeId',
	RequireAuth,
	sfa.putRequestRequirementMet
);
legacyRouter.delete(
	'/api/v1/data/RequestRequirementMet/:requestTypeId',
	RequireAuth,
	sfa.deleteRequestRequirementMet
);

// OWNERSHIP
legacyRouter.get('/api/v1/data/Ownership/:ownershipId', RequireAuth, sfa.getOwnership);
legacyRouter.get('/api/v1/data/Ownership', RequireAuth, sfa.getAllOwnership);
legacyRouter.post('/api/v1/data/Ownership', RequireAuth, sfa.postOwnership);
legacyRouter.put('/api/v1/data/Ownership/:ownershipId', RequireAuth, sfa.putOwnership);
legacyRouter.delete(
	'/api/v1/data/Ownership/:ownershipId',
	RequireAuth,
	sfa.deleteOwnership
);

// REQUIREMENT_MET_VIEW
legacyRouter.get(
	'/api/v1/data/RequirementMetViews/:requirementMetId',
	RequireAuth,
	sfa.getRequirementMetView
);
legacyRouter.get(
	'/api/v1/data/RequirementMetViews',
	RequireAuth,
	sfa.getAllRequirementMetView
);
legacyRouter.post(
	'/api/v1/data/RequirementMetViews',
	RequireAuth,
	sfa.postRequirementMetView
);
legacyRouter.put(
	'/api/v1/data/RequirementMetViews/:requirementMetId',
	RequireAuth,
	sfa.putRequirementMetView
);
legacyRouter.delete(
	'/api/v1/data/RequirementMetViews/:requirementMetId',
	RequireAuth,
	sfa.deleteRequirementMetView
);

// PARENT_CONTRIBUTION_FORMULA
legacyRouter.get(
	'/api/v1/data/ParentContributionFormulas/:academicYear',
	RequireAuth,
	sfa.getParentContributionFormula
);
legacyRouter.get(
	'/api/v1/data/ParentContributionFormulas',
	RequireAuth,
	sfa.getAllParentContributionFormula
);
legacyRouter.post(
	'/api/v1/data/ParentContributionFormulas',
	RequireAuth,
	sfa.postParentContributionFormula
);
legacyRouter.put(
	'/api/v1/data/ParentContributionFormulas/:academicYear',
	RequireAuth,
	sfa.putParentContributionFormula
);
legacyRouter.delete(
	'/api/v1/data/ParentContributionFormulas/:academicYear',
	RequireAuth,
	sfa.deleteParentContributionFormula
);

// SFAI_FUNDING_HISTORY
legacyRouter.get(
	'/api/v1/data/SfaiFundingHistory/:studentId',
	RequireAuth,
	sfa.getSfaiFundingHistory
);
legacyRouter.get(
	'/api/v1/data/SfaiFundingHistory',
	RequireAuth,
	sfa.getAllSfaiFundingHistory
);
legacyRouter.post(
	'/api/v1/data/SfaiFundingHistory',
	RequireAuth,
	sfa.postSfaiFundingHistory
);
legacyRouter.put(
	'/api/v1/data/SfaiFundingHistory/:studentId',
	RequireAuth,
	sfa.putSfaiFundingHistory
);
legacyRouter.delete(
	'/api/v1/data/SfaiFundingHistory/:studentId',
	RequireAuth,
	sfa.deleteSfaiFundingHistory
);

// PARENT_DEPENDENT
legacyRouter.get(
	'/api/v1/data/ParentDependents/:parentDependentId',
	RequireAuth,
	sfa.getParentDependent
);
legacyRouter.get(
	'/api/v1/data/ParentDependents',
	RequireAuth,
	sfa.getAllParentDependent
);
legacyRouter.post('/api/v1/data/ParentDependents', RequireAuth, sfa.postParentDependent);
legacyRouter.put(
	'/api/v1/data/ParentDependents/:parentDependentId',
	RequireAuth,
	sfa.putParentDependent
);
legacyRouter.delete(
	'/api/v1/data/ParentDependents/:parentDependentId',
	RequireAuth,
	sfa.deleteParentDependent
);

// STEP_CHANGE_REASONS
legacyRouter.get(
	'/api/v1/data/StepChangeReasons/:studentId',
	RequireAuth,
	sfa.getStepChangeReasons
);
legacyRouter.get(
	'/api/v1/data/StepChangeReasons',
	RequireAuth,
	sfa.getAllStepChangeReasons
);
legacyRouter.post(
	'/api/v1/data/StepChangeReasons',
	RequireAuth,
	sfa.postStepChangeReasons
);
legacyRouter.put(
	'/api/v1/data/StepChangeReasons/:studentId',
	RequireAuth,
	sfa.putStepChangeReasons
);
legacyRouter.delete(
	'/api/v1/data/StepChangeReasons/:studentId',
	RequireAuth,
	sfa.deleteStepChangeReasons
);

// sysdiagrams
legacyRouter.get('/api/v1/data/Sysdiagrams/:name', RequireAuth, sfa.getSysdiagrams);
legacyRouter.get('/api/v1/data/Sysdiagrams', RequireAuth, sfa.getAllSysdiagrams);
legacyRouter.post('/api/v1/data/Sysdiagrams', RequireAuth, sfa.postSysdiagrams);
legacyRouter.put('/api/v1/data/Sysdiagrams/:name', RequireAuth, sfa.putSysdiagrams);
legacyRouter.delete(
	'/api/v1/data/Sysdiagrams/:name',
	RequireAuth,
	sfa.deleteSysdiagrams
);

// PARENT_RESIDENT
legacyRouter.get(
	'/api/v1/data/ParentResident/:parentResidentId',
	RequireAuth,
	sfa.getParentResident
);
legacyRouter.get('/api/v1/data/ParentResident', RequireAuth, sfa.getAllParentResident);
legacyRouter.post('/api/v1/data/ParentResident', RequireAuth, sfa.postParentResident);
legacyRouter.put(
	'/api/v1/data/ParentResident/:parentResidentId',
	RequireAuth,
	sfa.putParentResident
);
legacyRouter.delete(
	'/api/v1/data/ParentResident/:parentResidentId',
	RequireAuth,
	sfa.deleteParentResident
);

// VW_APPLICATION_REQUIREMENTS
legacyRouter.get(
	'/api/v1/data/VwApplicationRequirements/:historyDetailId',
	RequireAuth,
	sfa.getVwApplicationRequirements
);
legacyRouter.get(
	'/api/v1/data/VwApplicationRequirements',
	RequireAuth,
	sfa.getAllVwApplicationRequirements
);
legacyRouter.post(
	'/api/v1/data/VwApplicationRequirements',
	RequireAuth,
	sfa.postVwApplicationRequirements
);
legacyRouter.put(
	'/api/v1/data/VwApplicationRequirements/:historyDetailId',
	RequireAuth,
	sfa.putVwApplicationRequirements
);
legacyRouter.delete(
	'/api/v1/data/VwApplicationRequirements/:historyDetailId',
	RequireAuth,
	sfa.deleteVwApplicationRequirements
);

// PART_TIME_REASON
legacyRouter.get(
	'/api/v1/data/PartTimeReasons/:partTimeReasonId',
	RequireAuth,
	sfa.getPartTimeReason
);
legacyRouter.get('/api/v1/data/PartTimeReasons', RequireAuth, sfa.getAllPartTimeReason);
legacyRouter.post('/api/v1/data/PartTimeReasons', RequireAuth, sfa.postPartTimeReason);
legacyRouter.put(
	'/api/v1/data/PartTimeReasons/:partTimeReasonId',
	RequireAuth,
	sfa.putPartTimeReason
);
legacyRouter.delete(
	'/api/v1/data/PartTimeReasons/:partTimeReasonId',
	RequireAuth,
	sfa.deletePartTimeReason
);

// YEA_DISTINCT
legacyRouter.get('/api/v1/data/YeaDistinct/:ytid', RequireAuth, sfa.getYeaDistinct);
legacyRouter.get('/api/v1/data/YeaDistinct', RequireAuth, sfa.getAllYeaDistinct);
legacyRouter.post('/api/v1/data/YeaDistinct', RequireAuth, sfa.postYeaDistinct);
legacyRouter.put('/api/v1/data/YeaDistinct/:ytid', RequireAuth, sfa.putYeaDistinct);
legacyRouter.delete(
	'/api/v1/data/YeaDistinct/:ytid',
	RequireAuth,
	sfa.deleteYeaDistinct
);

// PERIOD
legacyRouter.get('/api/v1/data/Periods/:periodId', RequireAuth, sfa.getPeriod);
legacyRouter.get('/api/v1/data/Periods', RequireAuth, sfa.getAllPeriod);
legacyRouter.post('/api/v1/data/Periods', RequireAuth, sfa.postPeriod);
legacyRouter.put('/api/v1/data/Periods/:periodId', RequireAuth, sfa.putPeriod);
legacyRouter.delete('/api/v1/data/Periods/:periodId', RequireAuth, sfa.deletePeriod);

// YG_STATS_EXPORT
legacyRouter.get(
	'/api/v1/data/YgStatsExport/:studentId',
	RequireAuth,
	sfa.getYgStatsExport
);
legacyRouter.get('/api/v1/data/YgStatsExport', RequireAuth, sfa.getAllYgStatsExport);
legacyRouter.post('/api/v1/data/YgStatsExport', RequireAuth, sfa.postYgStatsExport);
legacyRouter.put(
	'/api/v1/data/YgStatsExport/:studentId',
	RequireAuth,
	sfa.putYgStatsExport
);
legacyRouter.delete(
	'/api/v1/data/YgStatsExport/:studentId',
	RequireAuth,
	sfa.deleteYgStatsExport
);

// PORTAL_STATUS
legacyRouter.get(
	'/api/v1/data/PortalStatus/:portalStatusId',
	RequireAuth,
	sfa.getPortalStatus
);
legacyRouter.get('/api/v1/data/PortalStatus', RequireAuth, sfa.getAllPortalStatus);
legacyRouter.post('/api/v1/data/PortalStatus', RequireAuth, sfa.postPortalStatus);
legacyRouter.put(
	'/api/v1/data/PortalStatus/:portalStatusId',
	RequireAuth,
	sfa.putPortalStatus
);
legacyRouter.delete(
	'/api/v1/data/PortalStatus/:portalStatusId',
	RequireAuth,
	sfa.deletePortalStatus
);

// PRESTUDY_EMPLOY_STATUS
legacyRouter.get(
	'/api/v1/data/PrestudyEmployStatus/:prestudyEmployStatusId',
	RequireAuth,
	sfa.getPrestudyEmployStatus
);
legacyRouter.get(
	'/api/v1/data/PrestudyEmployStatus',
	RequireAuth,
	sfa.getAllPrestudyEmployStatus
);
legacyRouter.post(
	'/api/v1/data/PrestudyEmployStatus',
	RequireAuth,
	sfa.postPrestudyEmployStatus
);
legacyRouter.put(
	'/api/v1/data/PrestudyEmployStatus/:prestudyEmployStatusId',
	RequireAuth,
	sfa.putPrestudyEmployStatus
);
legacyRouter.delete(
	'/api/v1/data/PrestudyEmployStatus/:prestudyEmployStatusId',
	RequireAuth,
	sfa.deletePrestudyEmployStatus
);

// PRESTUDY_TAX_RATE
legacyRouter.get(
	'/api/v1/data/PrestudyTaxRates/:academicYear',
	RequireAuth,
	sfa.getPrestudyTaxRate
);
legacyRouter.get(
	'/api/v1/data/PrestudyTaxRates',
	RequireAuth,
	sfa.getAllPrestudyTaxRate
);
legacyRouter.post('/api/v1/data/PrestudyTaxRates', RequireAuth, sfa.postPrestudyTaxRate);
legacyRouter.put(
	'/api/v1/data/PrestudyTaxRates/:academicYear',
	RequireAuth,
	sfa.putPrestudyTaxRate
);
legacyRouter.delete(
	'/api/v1/data/PrestudyTaxRates/:academicYear',
	RequireAuth,
	sfa.deletePrestudyTaxRate
);

// PROGRAM
legacyRouter.get('/api/v1/data/Programs/:programId', RequireAuth, sfa.getProgram);
legacyRouter.get('/api/v1/data/Programs', RequireAuth, sfa.getAllProgram);
legacyRouter.post('/api/v1/data/Programs', RequireAuth, sfa.postProgram);
legacyRouter.put('/api/v1/data/Programs/:programId', RequireAuth, sfa.putProgram);
legacyRouter.delete('/api/v1/data/Programs/:programId', RequireAuth, sfa.deleteProgram);

// PROVINCE
legacyRouter.get('/api/v1/data/Provinces/:provinceId', RequireAuth, sfa.getProvince);
legacyRouter.get('/api/v1/data/Provinces', RequireAuth, sfa.getAllProvince);
legacyRouter.post('/api/v1/data/Provinces', RequireAuth, sfa.postProvince);
legacyRouter.put('/api/v1/data/Provinces/:provinceId', RequireAuth, sfa.putProvince);
legacyRouter.delete(
	'/api/v1/data/Provinces/:provinceId',
	RequireAuth,
	sfa.deleteProvince
);

// RELATIONSHIP
legacyRouter.get(
	'/api/v1/data/Relationships/:relationshipId',
	RequireAuth,
	sfa.getRelationship
);
legacyRouter.get('/api/v1/data/Relationships', RequireAuth, sfa.getAllRelationship);
legacyRouter.post('/api/v1/data/Relationships', RequireAuth, sfa.postRelationship);
legacyRouter.put(
	'/api/v1/data/Relationships/:relationshipId',
	RequireAuth,
	sfa.putRelationship
);
legacyRouter.delete(
	'/api/v1/data/Relationships/:relationshipId',
	RequireAuth,
	sfa.deleteRelationship
);

// REPORT_EXPENSE_CATEGORY
legacyRouter.get(
	'/api/v1/data/ReportExpenseCategory/:reportExpenseCategoryId',
	RequireAuth,
	sfa.getReportExpenseCategory
);
legacyRouter.get(
	'/api/v1/data/ReportExpenseCategory',
	RequireAuth,
	sfa.getAllReportExpenseCategory
);
legacyRouter.post(
	'/api/v1/data/ReportExpenseCategory',
	RequireAuth,
	sfa.postReportExpenseCategory
);
legacyRouter.put(
	'/api/v1/data/ReportExpenseCategory/:reportExpenseCategoryId',
	RequireAuth,
	sfa.putReportExpenseCategory
);
legacyRouter.delete(
	'/api/v1/data/ReportExpenseCategory/:reportExpenseCategoryId',
	RequireAuth,
	sfa.deleteReportExpenseCategory
);

// REQUEST_REQUIREMENT
legacyRouter.get(
	'/api/v1/data/RequestRequirements/:requestTypeId',
	RequireAuth,
	sfa.getRequestRequirement
);
legacyRouter.get(
	'/api/v1/data/RequestRequirements',
	RequireAuth,
	sfa.getAllRequestRequirement
);
legacyRouter.post(
	'/api/v1/data/RequestRequirements',
	RequireAuth,
	sfa.postRequestRequirement
);
legacyRouter.put(
	'/api/v1/data/RequestRequirements/:requestTypeId',
	RequireAuth,
	sfa.putRequestRequirement
);
legacyRouter.delete(
	'/api/v1/data/RequestRequirements/:requestTypeId',
	RequireAuth,
	sfa.deleteRequestRequirement
);
