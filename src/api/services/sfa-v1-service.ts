import { DB_CONFIG } from "../config";
import express, { Request, Response } from "express";
import knex from "knex";

const db = knex(DB_CONFIG)

// REQUEST_STATUS_CORR
export function getAllRequestStatusCorr(req: Request, res: Response) {
	db
		.select('*')
		.from('SFAADMIN.REQUEST_STATUS_CORR')
		.then((sql_res: any) => res.send(sql_res))
		.catch(function (e: any) {
			res.status(400).send('Not found');
			console.log(e);
		});
};

export function getRequestStatusCorr(req: Request, res: Response) {
	db
		.select('*')
		.from('SFAADMIN.REQUEST_STATUS_CORR')
		.where({ REQUEST_TYPE_ID: req.params.requestTypeId })
		.then((sql_res: any) => res.send(sql_res))
		.catch(function (e: any) {
			res.status(400).send('Not found');
			console.log(e);
		});
};

export function postRequestStatusCorr(req: Request, res: Response) {
	console.log(req.body);
	db
		.raw(
			'SELECT max(REQUEST_TYPE_ID) as REQUEST_TYPE_ID FROM SFAADMIN.REQUEST_STATUS_CORR'
		)
		.then((sql_res: any) => {
			console.log(sql_res);
			req.body.REQUEST_TYPE_ID = sql_res[0].REQUEST_TYPE_ID + 1;
			console.log(req.body);
			db('SFAADMIN.REQUEST_STATUS_CORR')
				.insert(req.body)
				.then(() => res.send('entry updated'))
				.catch(function (e: any) {
					res.status(400).send('Not found');
					console.log(e);
				});
		})
		.catch(function (e: any) {
			res.status(400).send('Not Found');
			console.log(e);
		});
};

export function putRequestStatusCorr(req: Request, res: Response) {
	db('SFAADMIN.REQUEST_STATUS_CORR')
		.where({ REQUEST_TYPE_ID: req.params.requestTypeId })
		.update(req.body)
		.then(() => res.send('entry updated'))
		.catch(function (e: any) {
			res.status(404).send('Not found');
			console.log(e);
		});
};

export function deleteRequestStatusCorr(req: Request, res: Response) {
	db
		.delete()
		.from('SFAADMIN.REQUEST_STATUS_CORR')
		.where({ REQUEST_TYPE_ID: req.params.requestTypeId })
		.then(() => res.send('entry deleted'))
		.catch(function (e: any) {
			res.status(404).send('Not found');
			console.log(e);
		});
};

// REQUEST_TYPE
export function getAllRequestType(req: Request, res: Response) {
	db
		.select('*')
		.from('SFAADMIN.REQUEST_TYPE')
		.then((sql_res: any) => res.send(sql_res))
		.catch(function (e: any) {
			res.status(400).send('Not found');
			console.log(e);
		});
};

export function getRequestType(req: Request, res: Response) {
	db
		.select('*')
		.from('SFAADMIN.REQUEST_TYPE')
		.where({ REQUEST_TYPE_ID: req.params.requestTypeId })
		.then((sql_res: any) => res.send(sql_res))
		.catch(function (e: any) {
			res.status(400).send('Not found');
			console.log(e);
		});
};

export function postRequestType(req: Request, res: Response) {
	console.log(req.body);
	db
		.raw(
			'SELECT max(REQUEST_TYPE_ID) as REQUEST_TYPE_ID FROM SFAADMIN.REQUEST_TYPE'
		)
		.then((sql_res: any) => {
			console.log(sql_res);
			req.body.REQUEST_TYPE_ID = sql_res[0].REQUEST_TYPE_ID + 1;
			console.log(req.body);
			db('SFAADMIN.REQUEST_TYPE')
				.insert(req.body)
				.then(() => res.send('entry updated'))
				.catch(function (e: any) {
					res.status(400).send('Not found');
					console.log(e);
				});
		})
		.catch(function (e: any) {
			res.status(400).send('Not Found');
			console.log(e);
		});
};

export function putRequestType(req: Request, res: Response) {
	db('SFAADMIN.REQUEST_TYPE')
		.where({ REQUEST_TYPE_ID: req.params.requestTypeId })
		.update(req.body)
		.then(() => res.send('entry updated'))
		.catch(function (e: any) {
			res.status(404).send('Not found');
			console.log(e);
		});
};

export function deleteRequestType(req: Request, res: Response) {
	db
		.delete()
		.from('SFAADMIN.REQUEST_TYPE')
		.where({ REQUEST_TYPE_ID: req.params.requestTypeId })
		.then(() => res.send('entry deleted'))
		.catch(function (e: any) {
			res.status(404).send('Not found');
			console.log(e);
		});
};

// REQUIREMENT_MET
export function getAllRequirementMet(req: Request, res: Response) {
	db
		.select('*')
		.from('SFAADMIN.REQUIREMENT_MET')
		.then((sql_res: any) => res.send(sql_res))
		.catch(function (e: any) {
			res.status(400).send('Not found');
			console.log(e);
		});
};

export function getRequirementMet(req: Request, res: Response) {
	db
		.select('*')
		.from('SFAADMIN.REQUIREMENT_MET')
		.where({ REQUIREMENT_MET_ID: req.params.requirementMetId })
		.then((sql_res: any) => res.send(sql_res))
		.catch(function (e: any) {
			res.status(400).send('Not found');
			console.log(e);
		});
};

export function postRequirementMet(req: Request, res: Response) {
	console.log(req.body);
	db
		.raw(
			'SELECT max(REQUIREMENT_MET_ID) as REQUIREMENT_MET_ID FROM SFAADMIN.REQUIREMENT_MET'
		)
		.then((sql_res: any) => {
			console.log(sql_res);
			req.body.REQUIREMENT_MET_ID = sql_res[0].REQUIREMENT_MET_ID + 1;
			console.log(req.body);
			db('SFAADMIN.REQUIREMENT_MET')
				.insert(req.body)
				.then(() => res.send('entry updated'))
				.catch(function (e: any) {
					res.status(400).send('Not found');
					console.log(e);
				});
		})
		.catch(function (e: any) {
			res.status(400).send('Not Found');
			console.log(e);
		});
};

export function putRequirementMet(req: Request, res: Response) {
	db('SFAADMIN.REQUIREMENT_MET')
		.where({ REQUIREMENT_MET_ID: req.params.requirementMetId })
		.update(req.body)
		.then(() => res.send('entry updated'))
		.catch(function (e: any) {
			res.status(404).send('Not found');
			console.log(e);
		});
};

export function deleteRequirementMet(req: Request, res: Response) {
	db
		.delete()
		.from('SFAADMIN.REQUIREMENT_MET')
		.where({ REQUIREMENT_MET_ID: req.params.requirementMetId })
		.then(() => res.send('entry deleted'))
		.catch(function (e: any) {
			res.status(404).send('Not found');
			console.log(e);
		});
};

// REQUIREMENT_TYPE
export function getAllRequirementType(req: Request, res: Response) {
	db
		.select('*')
		.from('SFAADMIN.REQUIREMENT_TYPE')
		.then((sql_res: any) => res.send(sql_res))
		.catch(function (e: any) {
			res.status(400).send('Not found');
			console.log(e);
		});
};

export function getRequirementType(req: Request, res: Response) {
	db
		.select('*')
		.from('SFAADMIN.REQUIREMENT_TYPE')
		.where({ REQUIREMENT_TYPE_ID: req.params.requirementTypeId })
		.then((sql_res: any) => res.send(sql_res))
		.catch(function (e: any) {
			res.status(400).send('Not found');
			console.log(e);
		});
};

export function postRequirementType(req: Request, res: Response) {
	console.log(req.body);
	db
		.raw(
			'SELECT max(REQUIREMENT_TYPE_ID) as REQUIREMENT_TYPE_ID FROM SFAADMIN.REQUIREMENT_TYPE'
		)
		.then((sql_res: any) => {
			console.log(sql_res);
			req.body.REQUIREMENT_TYPE_ID = sql_res[0].REQUIREMENT_TYPE_ID + 1;
			console.log(req.body);
			db('SFAADMIN.REQUIREMENT_TYPE')
				.insert(req.body)
				.then(() => res.send('entry updated'))
				.catch(function (e: any) {
					res.status(400).send('Not found');
					console.log(e);
				});
		})
		.catch(function (e: any) {
			res.status(400).send('Not Found');
			console.log(e);
		});
};

export function putRequirementType(req: Request, res: Response) {
	db('SFAADMIN.REQUIREMENT_TYPE')
		.where({ REQUIREMENT_TYPE_ID: req.params.requirementTypeId })
		.update(req.body)
		.then(() => res.send('entry updated'))
		.catch(function (e: any) {
			res.status(404).send('Not found');
			console.log(e);
		});
};

export function deleteRequirementType(req: Request, res: Response) {
	db
		.delete()
		.from('SFAADMIN.REQUIREMENT_TYPE')
		.where({ REQUIREMENT_TYPE_ID: req.params.requirementTypeId })
		.then(() => res.send('entry deleted'))
		.catch(function (e: any) {
			res.status(404).send('Not found');
			console.log(e);
		});
};

// RESIDENCE
export function getAllResidence(req: Request, res: Response) {
	db
		.select('*')
		.from('SFAADMIN.RESIDENCE')
		.then((sql_res: any) => res.send(sql_res))
		.catch(function (e: any) {
			res.status(400).send('Not found');
			console.log(e);
		});
};

export function getResidence(req: Request, res: Response) {
	db
		.select('*')
		.from('SFAADMIN.RESIDENCE')
		.where({ RESIDENCE_ID: req.params.residenceId })
		.then((sql_res: any) => res.send(sql_res))
		.catch(function (e: any) {
			res.status(400).send('Not found');
			console.log(e);
		});
};

export function postResidence(req: Request, res: Response) {
	console.log(req.body);
	db
		.raw('SELECT max(RESIDENCE_ID) as RESIDENCE_ID FROM SFAADMIN.RESIDENCE')
		.then((sql_res: any) => {
			console.log(sql_res);
			req.body.RESIDENCE_ID = sql_res[0].RESIDENCE_ID + 1;
			console.log(req.body);
			db('SFAADMIN.RESIDENCE')
				.insert(req.body)
				.then(() => res.send('entry updated'))
				.catch(function (e: any) {
					res.status(400).send('Not found');
					console.log(e);
				});
		})
		.catch(function (e: any) {
			res.status(400).send('Not Found');
			console.log(e);
		});
};

export function putResidence(req: Request, res: Response) {
	db('SFAADMIN.RESIDENCE')
		.where({ RESIDENCE_ID: req.params.residenceId })
		.update(req.body)
		.then(() => res.send('entry updated'))
		.catch(function (e: any) {
			res.status(404).send('Not found');
			console.log(e);
		});
};

export function deleteResidence(req: Request, res: Response) {
	db
		.delete()
		.from('SFAADMIN.RESIDENCE')
		.where({ RESIDENCE_ID: req.params.residenceId })
		.then(() => res.send('entry deleted'))
		.catch(function (e: any) {
			res.status(404).send('Not found');
			console.log(e);
		});
};

// SFA_DOCUMENT_LINK
export function getAllSfaDocumentLink(req: Request, res: Response) {
	db
		.select('*')
		.from('SFAADMIN.SFA_DOCUMENT_LINK')
		.then((sql_res: any) => res.send(sql_res))
		.catch(function (e: any) {
			res.status(400).send('Not found');
			console.log(e);
		});
};

export function getSfaDocumentLink(req: Request, res: Response) {
	db
		.select('*')
		.from('SFAADMIN.SFA_DOCUMENT_LINK')
		.where({ SFA_DOCUMENT_LINK_ID: req.params.sfaDocumentLinkId })
		.then((sql_res: any) => res.send(sql_res))
		.catch(function (e: any) {
			res.status(400).send('Not found');
			console.log(e);
		});
};

export function postSfaDocumentLink(req: Request, res: Response) {
	console.log(req.body);
	db
		.raw(
			'SELECT max(SFA_DOCUMENT_LINK_ID) as SFA_DOCUMENT_LINK_ID FROM SFAADMIN.SFA_DOCUMENT_LINK'
		)
		.then((sql_res: any) => {
			console.log(sql_res);
			req.body.SFA_DOCUMENT_LINK_ID = sql_res[0].SFA_DOCUMENT_LINK_ID + 1;
			console.log(req.body);
			db('SFAADMIN.SFA_DOCUMENT_LINK')
				.insert(req.body)
				.then(() => res.send('entry updated'))
				.catch(function (e: any) {
					res.status(400).send('Not found');
					console.log(e);
				});
		})
		.catch(function (e: any) {
			res.status(400).send('Not Found');
			console.log(e);
		});
};

export function putSfaDocumentLink(req: Request, res: Response) {
	db('SFAADMIN.SFA_DOCUMENT_LINK')
		.where({ SFA_DOCUMENT_LINK_ID: req.params.sfaDocumentLinkId })
		.update(req.body)
		.then(() => res.send('entry updated'))
		.catch(function (e: any) {
			res.status(404).send('Not found');
			console.log(e);
		});
};

export function deleteSfaDocumentLink(req: Request, res: Response) {
	db
		.delete()
		.from('SFAADMIN.SFA_DOCUMENT_LINK')
		.where({ SFA_DOCUMENT_LINK_ID: req.params.sfaDocumentLinkId })
		.then(() => res.send('entry deleted'))
		.catch(function (e: any) {
			res.status(404).send('Not found');
			console.log(e);
		});
};

// SPOUSE_TAX_RATE
export function getAllSpouseTaxRate(req: Request, res: Response) {
	db
		.select('*')
		.from('SFAADMIN.SPOUSE_TAX_RATE')
		.then((sql_res: any) => res.send(sql_res))
		.catch(function (e: any) {
			res.status(400).send('Not found');
			console.log(e);
		});
};

export function getSpouseTaxRate(req: Request, res: Response) {
	db
		.select('*')
		.from('SFAADMIN.SPOUSE_TAX_RATE')
		.where({ ACADEMIC_YEAR: req.params.academicYear })
		.then((sql_res: any) => res.send(sql_res))
		.catch(function (e: any) {
			res.status(400).send('Not found');
			console.log(e);
		});
};

export function postSpouseTaxRate(req: Request, res: Response) {
	console.log(req.body);
	db
		.raw(
			'SELECT max(ACADEMIC_YEAR) as ACADEMIC_YEAR FROM SFAADMIN.SPOUSE_TAX_RATE'
		)
		.then((sql_res: any) => {
			console.log(sql_res);
			req.body.ACADEMIC_YEAR = sql_res[0].ACADEMIC_YEAR + 1;
			console.log(req.body);
			db('SFAADMIN.SPOUSE_TAX_RATE')
				.insert(req.body)
				.then(() => res.send('entry updated'))
				.catch(function (e: any) {
					res.status(400).send('Not found');
					console.log(e);
				});
		})
		.catch(function (e: any) {
			res.status(400).send('Not Found');
			console.log(e);
		});
};

export function putSpouseTaxRate(req: Request, res: Response) {
	db('SFAADMIN.SPOUSE_TAX_RATE')
		.where({ ACADEMIC_YEAR: req.params.academicYear })
		.update(req.body)
		.then(() => res.send('entry updated'))
		.catch(function (e: any) {
			res.status(404).send('Not found');
			console.log(e);
		});
};

export function deleteSpouseTaxRate(req: Request, res: Response) {
	db
		.delete()
		.from('SFAADMIN.SPOUSE_TAX_RATE')
		.where({ ACADEMIC_YEAR: req.params.academicYear })
		.then(() => res.send('entry deleted'))
		.catch(function (e: any) {
			res.status(404).send('Not found');
			console.log(e);
		});
};

// STA_LOOKUP
export function getAllStaLookup(req: Request, res: Response) {
	db
		.select('*')
		.from('SFAADMIN.STA_LOOKUP')
		.then((sql_res: any) => res.send(sql_res))
		.catch(function (e: any) {
			res.status(400).send('Not found');
			console.log(e);
		});
};

export function getStaLookup(req: Request, res: Response) {
	db
		.select('*')
		.from('SFAADMIN.STA_LOOKUP')
		.where({ ACADEMIC_YEAR: req.params.academicYear })
		.then((sql_res: any) => res.send(sql_res))
		.catch(function (e: any) {
			res.status(400).send('Not found');
			console.log(e);
		});
};

export function postStaLookup(req: Request, res: Response) {
	console.log(req.body);
	db
		.raw('SELECT max(ACADEMIC_YEAR) as ACADEMIC_YEAR FROM SFAADMIN.STA_LOOKUP')
		.then((sql_res: any) => {
			console.log(sql_res);
			req.body.ACADEMIC_YEAR = sql_res[0].ACADEMIC_YEAR + 1;
			console.log(req.body);
			db('SFAADMIN.STA_LOOKUP')
				.insert(req.body)
				.then(() => res.send('entry updated'))
				.catch(function (e: any) {
					res.status(400).send('Not found');
					console.log(e);
				});
		})
		.catch(function (e: any) {
			res.status(400).send('Not Found');
			console.log(e);
		});
};

export function putStaLookup(req: Request, res: Response) {
	db('SFAADMIN.STA_LOOKUP')
		.where({ ACADEMIC_YEAR: req.params.academicYear })
		.update(req.body)
		.then(() => res.send('entry updated'))
		.catch(function (e: any) {
			res.status(404).send('Not found');
			console.log(e);
		});
};

export function deleteStaLookup(req: Request, res: Response) {
	db
		.delete()
		.from('SFAADMIN.STA_LOOKUP')
		.where({ ACADEMIC_YEAR: req.params.academicYear })
		.then(() => res.send('entry deleted'))
		.catch(function (e: any) {
			res.status(404).send('Not found');
			console.log(e);
		});
};

// STANDARD_OF_LIVING
export function getAllStandardOfLiving(req: Request, res: Response) {
	db
		.select('*')
		.from('SFAADMIN.STANDARD_OF_LIVING')
		.then((sql_res: any) => res.send(sql_res))
		.catch(function (e: any) {
			res.status(400).send('Not found');
			console.log(e);
		});
};

export function getStandardOfLiving(req: Request, res: Response) {
	db
		.select('*')
		.from('SFAADMIN.STANDARD_OF_LIVING')
		.where({ ACADEMIC_YEAR: req.params.academicYear })
		.then((sql_res: any) => res.send(sql_res))
		.catch(function (e: any) {
			res.status(400).send('Not found');
			console.log(e);
		});
};

export function postStandardOfLiving(req: Request, res: Response) {
	console.log(req.body);
	db
		.raw(
			'SELECT max(ACADEMIC_YEAR) as ACADEMIC_YEAR FROM SFAADMIN.STANDARD_OF_LIVING'
		)
		.then((sql_res: any) => {
			console.log(sql_res);
			req.body.ACADEMIC_YEAR = sql_res[0].ACADEMIC_YEAR + 1;
			console.log(req.body);
			db('SFAADMIN.STANDARD_OF_LIVING')
				.insert(req.body)
				.then(() => res.send('entry updated'))
				.catch(function (e: any) {
					res.status(400).send('Not found');
					console.log(e);
				});
		})
		.catch(function (e: any) {
			res.status(400).send('Not Found');
			console.log(e);
		});
};

export function putStandardOfLiving(req: Request, res: Response) {
	db('SFAADMIN.STANDARD_OF_LIVING')
		.where({ ACADEMIC_YEAR: req.params.academicYear })
		.update(req.body)
		.then(() => res.send('entry updated'))
		.catch(function (e: any) {
			res.status(404).send('Not found');
			console.log(e);
		});
};

export function deleteStandardOfLiving(req: Request, res: Response) {
	db
		.delete()
		.from('SFAADMIN.STANDARD_OF_LIVING')
		.where({ ACADEMIC_YEAR: req.params.academicYear })
		.then(() => res.send('entry deleted'))
		.catch(function (e: any) {
			res.status(404).send('Not found');
			console.log(e);
		});
};

// STATUS
export function getAllStatus(req: Request, res: Response) {
	db
		.select('*')
		.from('SFAADMIN.STATUS')
		.then((sql_res: any) => res.send(sql_res))
		.catch(function (e: any) {
			res.status(400).send('Not found');
			console.log(e);
		});
};

export function getStatus(req: Request, res: Response) {
	db
		.select('*')
		.from('SFAADMIN.STATUS')
		.where({ STATUS_ID: req.params.statusId })
		.then((sql_res: any) => res.send(sql_res))
		.catch(function (e: any) {
			res.status(400).send('Not found');
			console.log(e);
		});
};

export function postStatus(req: Request, res: Response) {
	console.log(req.body);
	db
		.raw('SELECT max(STATUS_ID) as STATUS_ID FROM SFAADMIN.STATUS')
		.then((sql_res: any) => {
			console.log(sql_res);
			req.body.STATUS_ID = sql_res[0].STATUS_ID + 1;
			console.log(req.body);
			db('SFAADMIN.STATUS')
				.insert(req.body)
				.then(() => res.send('entry updated'))
				.catch(function (e: any) {
					res.status(400).send('Not found');
					console.log(e);
				});
		})
		.catch(function (e: any) {
			res.status(400).send('Not Found');
			console.log(e);
		});
};

export function putStatus(req: Request, res: Response) {
	db('SFAADMIN.STATUS')
		.where({ STATUS_ID: req.params.statusId })
		.update(req.body)
		.then(() => res.send('entry updated'))
		.catch(function (e: any) {
			res.status(404).send('Not found');
			console.log(e);
		});
};

export function deleteStatus(req: Request, res: Response) {
	db
		.delete()
		.from('SFAADMIN.STATUS')
		.where({ STATUS_ID: req.params.statusId })
		.then(() => res.send('entry deleted'))
		.catch(function (e: any) {
			res.status(404).send('Not found');
			console.log(e);
		});
};

// STATUS_REASON
export function getAllStatusReason(req: Request, res: Response) {
	db
		.select('*')
		.from('SFAADMIN.STATUS_REASON')
		.then((sql_res: any) => res.send(sql_res))
		.catch(function (e: any) {
			res.status(400).send('Not found');
			console.log(e);
		});
};

export function getStatusReason(req: Request, res: Response) {
	db
		.select('*')
		.from('SFAADMIN.STATUS_REASON')
		.where({ STATUS_REASON_ID: req.params.statusReasonId })
		.then((sql_res: any) => res.send(sql_res))
		.catch(function (e: any) {
			res.status(400).send('Not found');
			console.log(e);
		});
};

export function postStatusReason(req: Request, res: Response) {
	console.log(req.body);
	db
		.raw(
			'SELECT max(STATUS_REASON_ID) as STATUS_REASON_ID FROM SFAADMIN.STATUS_REASON'
		)
		.then((sql_res: any) => {
			console.log(sql_res);
			req.body.STATUS_REASON_ID = sql_res[0].STATUS_REASON_ID + 1;
			console.log(req.body);
			db('SFAADMIN.STATUS_REASON')
				.insert(req.body)
				.then(() => res.send('entry updated'))
				.catch(function (e: any) {
					res.status(400).send('Not found');
					console.log(e);
				});
		})
		.catch(function (e: any) {
			res.status(400).send('Not Found');
			console.log(e);
		});
};

export function putStatusReason(req: Request, res: Response) {
	db('SFAADMIN.STATUS_REASON')
		.where({ STATUS_REASON_ID: req.params.statusReasonId })
		.update(req.body)
		.then(() => res.send('entry updated'))
		.catch(function (e: any) {
			res.status(404).send('Not found');
			console.log(e);
		});
};

export function deleteStatusReason(req: Request, res: Response) {
	db
		.delete()
		.from('SFAADMIN.STATUS_REASON')
		.where({ STATUS_REASON_ID: req.params.statusReasonId })
		.then(() => res.send('entry deleted'))
		.catch(function (e: any) {
			res.status(404).send('Not found');
			console.log(e);
		});
};

// STUDENT
export function getAllStudent(req: Request, res: Response) {
	db
		.select('*')
		.from('SFAADMIN.STUDENT')
		.then((sql_res: any) => res.send(sql_res))
		.catch(function (e: any) {
			res.status(400).send('Not found');
			console.log(e);
		});
};

export function getStudent(req: Request, res: Response) {
	db
		.select('*')
		.from('SFAADMIN.STUDENT')
		.where({ STUDENT_ID: req.params.studentId })
		.then((sql_res: any) => res.send(sql_res))
		.catch(function (e: any) {
			res.status(400).send('Not found');
			console.log(e);
		});
};

export function postStudent(req: Request, res: Response) {
	console.log(req.body);
	db
		.raw('SELECT max(STUDENT_ID) as STUDENT_ID FROM SFAADMIN.STUDENT')
		.then((sql_res: any) => {
			console.log(sql_res);
			req.body.STUDENT_ID = sql_res[0].STUDENT_ID + 1;
			console.log(req.body);
			db('SFAADMIN.STUDENT')
				.insert(req.body)
				.then(() => res.send('entry updated'))
				.catch(function (e: any) {
					res.status(400).send('Not found');
					console.log(e);
				});
		})
		.catch(function (e: any) {
			res.status(400).send('Not Found');
			console.log(e);
		});
};

export function putStudent(req: Request, res: Response) {
	db('SFAADMIN.STUDENT')
		.where({ STUDENT_ID: req.params.studentId })
		.update(req.body)
		.then(() => res.send('entry updated'))
		.catch(function (e: any) {
			res.status(404).send('Not found');
			console.log(e);
		});
};

export function deleteStudent(req: Request, res: Response) {
	db
		.delete()
		.from('SFAADMIN.STUDENT')
		.where({ STUDENT_ID: req.params.studentId })
		.then(() => res.send('entry deleted'))
		.catch(function (e: any) {
			res.status(404).send('Not found');
			console.log(e);
		});
};

// STUDENT_CATEGORY
export function getAllStudentCategory(req: Request, res: Response) {
	db
		.select('*')
		.from('SFAADMIN.STUDENT_CATEGORY')
		.then((sql_res: any) => res.send(sql_res))
		.catch(function (e: any) {
			res.status(400).send('Not found');
			console.log(e);
		});
};

export function getStudentCategory(req: Request, res: Response) {
	db
		.select('*')
		.from('SFAADMIN.STUDENT_CATEGORY')
		.where({ STUDENT_CATEGORY_CODE: req.params.studentCategoryCode })
		.then((sql_res: any) => res.send(sql_res))
		.catch(function (e: any) {
			res.status(400).send('Not found');
			console.log(e);
		});
};

export function postStudentCategory(req: Request, res: Response) {
	console.log(req.body);
	db
		.raw(
			'SELECT max(STUDENT_CATEGORY_CODE) as STUDENT_CATEGORY_CODE FROM SFAADMIN.STUDENT_CATEGORY'
		)
		.then((sql_res: any) => {
			console.log(sql_res);
			req.body.STUDENT_CATEGORY_CODE = sql_res[0].STUDENT_CATEGORY_CODE + 1;
			console.log(req.body);
			db('SFAADMIN.STUDENT_CATEGORY')
				.insert(req.body)
				.then(() => res.send('entry updated'))
				.catch(function (e: any) {
					res.status(400).send('Not found');
					console.log(e);
				});
		})
		.catch(function (e: any) {
			res.status(400).send('Not Found');
			console.log(e);
		});
};

export function putStudentCategory(req: Request, res: Response) {
	db('SFAADMIN.STUDENT_CATEGORY')
		.where({ STUDENT_CATEGORY_CODE: req.params.studentCategoryCode })
		.update(req.body)
		.then(() => res.send('entry updated'))
		.catch(function (e: any) {
			res.status(404).send('Not found');
			console.log(e);
		});
};

export function deleteStudentCategory(req: Request, res: Response) {
	db
		.delete()
		.from('SFAADMIN.STUDENT_CATEGORY')
		.where({ STUDENT_CATEGORY_CODE: req.params.studentCategoryCode })
		.then(() => res.send('entry deleted'))
		.catch(function (e: any) {
			res.status(404).send('Not found');
			console.log(e);
		});
};

// STUDENT_CONSENT
export function getAllStudentConsent(req: Request, res: Response) {
	db
		.select('*')
		.from('SFAADMIN.STUDENT_CONSENT')
		.then((sql_res: any) => res.send(sql_res))
		.catch(function (e: any) {
			res.status(400).send('Not found');
			console.log(e);
		});
};

export function getStudentConsent(req: Request, res: Response) {
	db
		.select('*')
		.from('SFAADMIN.STUDENT_CONSENT')
		.where({ STUDENT_CONSENT_ID: req.params.studentConsentId })
		.then((sql_res: any) => res.send(sql_res))
		.catch(function (e: any) {
			res.status(400).send('Not found');
			console.log(e);
		});
};

export function postStudentConsent(req: Request, res: Response) {
	console.log(req.body);
	db
		.raw(
			'SELECT max(STUDENT_CONSENT_ID) as STUDENT_CONSENT_ID FROM SFAADMIN.STUDENT_CONSENT'
		)
		.then((sql_res: any) => {
			console.log(sql_res);
			req.body.STUDENT_CONSENT_ID = sql_res[0].STUDENT_CONSENT_ID + 1;
			console.log(req.body);
			db('SFAADMIN.STUDENT_CONSENT')
				.insert(req.body)
				.then(() => res.send('entry updated'))
				.catch(function (e: any) {
					res.status(400).send('Not found');
					console.log(e);
				});
		})
		.catch(function (e: any) {
			res.status(400).send('Not Found');
			console.log(e);
		});
};

export function putStudentConsent(req: Request, res: Response) {
	db('SFAADMIN.STUDENT_CONSENT')
		.where({ STUDENT_CONSENT_ID: req.params.studentConsentId })
		.update(req.body)
		.then(() => res.send('entry updated'))
		.catch(function (e: any) {
			res.status(404).send('Not found');
			console.log(e);
		});
};

export function deleteStudentConsent(req: Request, res: Response) {
	db
		.delete()
		.from('SFAADMIN.STUDENT_CONSENT')
		.where({ STUDENT_CONSENT_ID: req.params.studentConsentId })
		.then(() => res.send('entry deleted'))
		.catch(function (e: any) {
			res.status(404).send('Not found');
			console.log(e);
		});
};

// STUDENT_CONTRIBUTION
export function getAllStudentContribution(req: Request, res: Response) {
	db
		.select('*')
		.from('SFAADMIN.STUDENT_CONTRIBUTION')
		.then((sql_res: any) => res.send(sql_res))
		.catch(function (e: any) {
			res.status(400).send('Not found');
			console.log(e);
		});
};

export function getStudentContribution(req: Request, res: Response) {
	db
		.select('*')
		.from('SFAADMIN.STUDENT_CONTRIBUTION')
		.where({ ACADEMIC_YEAR: req.params.academicYear })
		.then((sql_res: any) => res.send(sql_res))
		.catch(function (e: any) {
			res.status(400).send('Not found');
			console.log(e);
		});
};

export function postStudentContribution(req: Request, res: Response) {
	console.log(req.body);
	db
		.raw(
			'SELECT max(ACADEMIC_YEAR) as ACADEMIC_YEAR FROM SFAADMIN.STUDENT_CONTRIBUTION'
		)
		.then((sql_res: any) => {
			console.log(sql_res);
			req.body.ACADEMIC_YEAR = sql_res[0].ACADEMIC_YEAR + 1;
			console.log(req.body);
			db('SFAADMIN.STUDENT_CONTRIBUTION')
				.insert(req.body)
				.then(() => res.send('entry updated'))
				.catch(function (e: any) {
					res.status(400).send('Not found');
					console.log(e);
				});
		})
		.catch(function (e: any) {
			res.status(400).send('Not Found');
			console.log(e);
		});
};

export function putStudentContribution(req: Request, res: Response) {
	db('SFAADMIN.STUDENT_CONTRIBUTION')
		.where({ ACADEMIC_YEAR: req.params.academicYear })
		.update(req.body)
		.then(() => res.send('entry updated'))
		.catch(function (e: any) {
			res.status(404).send('Not found');
			console.log(e);
		});
};

export function deleteStudentContribution(req: Request, res: Response) {
	db
		.delete()
		.from('SFAADMIN.STUDENT_CONTRIBUTION')
		.where({ ACADEMIC_YEAR: req.params.academicYear })
		.then(() => res.send('entry deleted'))
		.catch(function (e: any) {
			res.status(404).send('Not found');
			console.log(e);
		});
};

// STUDENT_LIVING_ALLOWANCE
export function getAllStudentLivingAllowance(req: Request, res: Response) {
	db
		.select('*')
		.from('SFAADMIN.STUDENT_LIVING_ALLOWANCE')
		.then((sql_res: any) => res.send(sql_res))
		.catch(function (e: any) {
			res.status(400).send('Not found');
			console.log(e);
		});
};

export function getStudentLivingAllowance(req: Request, res: Response) {
	db
		.select('*')
		.from('SFAADMIN.STUDENT_LIVING_ALLOWANCE')
		.where({ ACADEMIC_YEAR: req.params.academicYear })
		.then((sql_res: any) => res.send(sql_res))
		.catch(function (e: any) {
			res.status(400).send('Not found');
			console.log(e);
		});
};

export function postStudentLivingAllowance(req: Request, res: Response) {
	console.log(req.body);
	db
		.raw(
			'SELECT max(ACADEMIC_YEAR) as ACADEMIC_YEAR FROM SFAADMIN.STUDENT_LIVING_ALLOWANCE'
		)
		.then((sql_res: any) => {
			console.log(sql_res);
			req.body.ACADEMIC_YEAR = sql_res[0].ACADEMIC_YEAR + 1;
			console.log(req.body);
			db('SFAADMIN.STUDENT_LIVING_ALLOWANCE')
				.insert(req.body)
				.then(() => res.send('entry updated'))
				.catch(function (e: any) {
					res.status(400).send('Not found');
					console.log(e);
				});
		})
		.catch(function (e: any) {
			res.status(400).send('Not Found');
			console.log(e);
		});
};

export function putStudentLivingAllowance(req: Request, res: Response) {
	db('SFAADMIN.STUDENT_LIVING_ALLOWANCE')
		.where({ ACADEMIC_YEAR: req.params.academicYear })
		.update(req.body)
		.then(() => res.send('entry updated'))
		.catch(function (e: any) {
			res.status(404).send('Not found');
			console.log(e);
		});
};

export function deleteStudentLivingAllowance(req: Request, res: Response) {
	db
		.delete()
		.from('SFAADMIN.STUDENT_LIVING_ALLOWANCE')
		.where({ ACADEMIC_YEAR: req.params.academicYear })
		.then(() => res.send('entry deleted'))
		.catch(function (e: any) {
			res.status(404).send('Not found');
			console.log(e);
		});
};

// STUDY_AREA
export function getAllStudyArea(req: Request, res: Response) {
	db
		.select('*')
		.from('SFAADMIN.STUDY_AREA')
		.then((sql_res: any) => res.send(sql_res))
		.catch(function (e: any) {
			res.status(400).send('Not found');
			console.log(e);
		});
};

export function getStudyArea(req: Request, res: Response) {
	db
		.select('*')
		.from('SFAADMIN.STUDY_AREA')
		.where({ STUDY_AREA_ID: req.params.studyAreaId })
		.then((sql_res: any) => res.send(sql_res))
		.catch(function (e: any) {
			res.status(400).send('Not found');
			console.log(e);
		});
};

export function postStudyArea(req: Request, res: Response) {
	console.log(req.body);
	db
		.raw('SELECT max(STUDY_AREA_ID) as STUDY_AREA_ID FROM SFAADMIN.STUDY_AREA')
		.then((sql_res: any) => {
			console.log(sql_res);
			req.body.STUDY_AREA_ID = sql_res[0].STUDY_AREA_ID + 1;
			console.log(req.body);
			db('SFAADMIN.STUDY_AREA')
				.insert(req.body)
				.then(() => res.send('entry updated'))
				.catch(function (e: any) {
					res.status(400).send('Not found');
					console.log(e);
				});
		})
		.catch(function (e: any) {
			res.status(400).send('Not Found');
			console.log(e);
		});
};

export function putStudyArea(req: Request, res: Response) {
	db('SFAADMIN.STUDY_AREA')
		.where({ STUDY_AREA_ID: req.params.studyAreaId })
		.update(req.body)
		.then(() => res.send('entry updated'))
		.catch(function (e: any) {
			res.status(404).send('Not found');
			console.log(e);
		});
};

export function deleteStudyArea(req: Request, res: Response) {
	db
		.delete()
		.from('SFAADMIN.STUDY_AREA')
		.where({ STUDY_AREA_ID: req.params.studyAreaId })
		.then(() => res.send('entry deleted'))
		.catch(function (e: any) {
			res.status(404).send('Not found');
			console.log(e);
		});
};

// STUDY_FIELD
export function getAllStudyField(req: Request, res: Response) {
	db
		.select('*')
		.from('SFAADMIN.STUDY_FIELD')
		.then((sql_res: any) => res.send(sql_res))
		.catch(function (e: any) {
			res.status(400).send('Not found');
			console.log(e);
		});
};

export function getStudyField(req: Request, res: Response) {
	db
		.select('*')
		.from('SFAADMIN.STUDY_FIELD')
		.where({ STUDY_FIELD_ID: req.params.studyFieldId })
		.then((sql_res: any) => res.send(sql_res))
		.catch(function (e: any) {
			res.status(400).send('Not found');
			console.log(e);
		});
};

export function postStudyField(req: Request, res: Response) {
	console.log(req.body);
	db
		.raw(
			'SELECT max(STUDY_FIELD_ID) as STUDY_FIELD_ID FROM SFAADMIN.STUDY_FIELD'
		)
		.then((sql_res: any) => {
			console.log(sql_res);
			req.body.STUDY_FIELD_ID = sql_res[0].STUDY_FIELD_ID + 1;
			console.log(req.body);
			db('SFAADMIN.STUDY_FIELD')
				.insert(req.body)
				.then(() => res.send('entry updated'))
				.catch(function (e: any) {
					res.status(400).send('Not found');
					console.log(e);
				});
		})
		.catch(function (e: any) {
			res.status(400).send('Not Found');
			console.log(e);
		});
};

export function putStudyField(req: Request, res: Response) {
	db('SFAADMIN.STUDY_FIELD')
		.where({ STUDY_FIELD_ID: req.params.studyFieldId })
		.update(req.body)
		.then(() => res.send('entry updated'))
		.catch(function (e: any) {
			res.status(404).send('Not found');
			console.log(e);
		});
};

export function deleteStudyField(req: Request, res: Response) {
	db
		.delete()
		.from('SFAADMIN.STUDY_FIELD')
		.where({ STUDY_FIELD_ID: req.params.studyFieldId })
		.then(() => res.send('entry deleted'))
		.catch(function (e: any) {
			res.status(404).send('Not found');
			console.log(e);
		});
};

// STUDY_TAX_RATE
export function getAllStudyTaxRate(req: Request, res: Response) {
	db
		.select('*')
		.from('SFAADMIN.STUDY_TAX_RATE')
		.then((sql_res: any) => res.send(sql_res))
		.catch(function (e: any) {
			res.status(400).send('Not found');
			console.log(e);
		});
};

export function getStudyTaxRate(req: Request, res: Response) {
	db
		.select('*')
		.from('SFAADMIN.STUDY_TAX_RATE')
		.where({ ACADEMIC_YEAR: req.params.academicYear })
		.then((sql_res: any) => res.send(sql_res))
		.catch(function (e: any) {
			res.status(400).send('Not found');
			console.log(e);
		});
};

export function postStudyTaxRate(req: Request, res: Response) {
	console.log(req.body);
	db
		.raw(
			'SELECT max(ACADEMIC_YEAR) as ACADEMIC_YEAR FROM SFAADMIN.STUDY_TAX_RATE'
		)
		.then((sql_res: any) => {
			console.log(sql_res);
			req.body.ACADEMIC_YEAR = sql_res[0].ACADEMIC_YEAR + 1;
			console.log(req.body);
			db('SFAADMIN.STUDY_TAX_RATE')
				.insert(req.body)
				.then(() => res.send('entry updated'))
				.catch(function (e: any) {
					res.status(400).send('Not found');
					console.log(e);
				});
		})
		.catch(function (e: any) {
			res.status(400).send('Not Found');
			console.log(e);
		});
};

export function putStudyTaxRate(req: Request, res: Response) {
	db('SFAADMIN.STUDY_TAX_RATE')
		.where({ ACADEMIC_YEAR: req.params.academicYear })
		.update(req.body)
		.then(() => res.send('entry updated'))
		.catch(function (e: any) {
			res.status(404).send('Not found');
			console.log(e);
		});
};

export function deleteStudyTaxRate(req: Request, res: Response) {
	db
		.delete()
		.from('SFAADMIN.STUDY_TAX_RATE')
		.where({ ACADEMIC_YEAR: req.params.academicYear })
		.then(() => res.send('entry deleted'))
		.catch(function (e: any) {
			res.status(404).send('Not found');
			console.log(e);
		});
};

// SYSTEM_DEP_PARAMS
export function getAllSystemDepParams(req: Request, res: Response) {
	db
		.select('*')
		.from('SFAADMIN.SYSTEM_DEP_PARAMS')
		.then((sql_res: any) => res.send(sql_res))
		.catch(function (e: any) {
			res.status(400).send('Not found');
			console.log(e);
		});
};

export function getSystemDepParams(req: Request, res: Response) {
	db
		.select('*')
		.from('SFAADMIN.SYSTEM_DEP_PARAMS')
		.where({ DEPENDENT_COUNT: req.params.dependentCount })
		.then((sql_res: any) => res.send(sql_res))
		.catch(function (e: any) {
			res.status(400).send('Not found');
			console.log(e);
		});
};

export function postSystemDepParams(req: Request, res: Response) {
	console.log(req.body);
	db
		.raw(
			'SELECT max(DEPENDENT_COUNT) as DEPENDENT_COUNT FROM SFAADMIN.SYSTEM_DEP_PARAMS'
		)
		.then((sql_res: any) => {
			console.log(sql_res);
			req.body.DEPENDENT_COUNT = sql_res[0].DEPENDENT_COUNT + 1;
			console.log(req.body);
			db('SFAADMIN.SYSTEM_DEP_PARAMS')
				.insert(req.body)
				.then(() => res.send('entry updated'))
				.catch(function (e: any) {
					res.status(400).send('Not found');
					console.log(e);
				});
		})
		.catch(function (e: any) {
			res.status(400).send('Not Found');
			console.log(e);
		});
};

export function putSystemDepParams(req: Request, res: Response) {
	db('SFAADMIN.SYSTEM_DEP_PARAMS')
		.where({ DEPENDENT_COUNT: req.params.dependentCount })
		.update(req.body)
		.then(() => res.send('entry updated'))
		.catch(function (e: any) {
			res.status(404).send('Not found');
			console.log(e);
		});
};

export function deleteSystemDepParams(req: Request, res: Response) {
	db
		.delete()
		.from('SFAADMIN.SYSTEM_DEP_PARAMS')
		.where({ DEPENDENT_COUNT: req.params.dependentCount })
		.then(() => res.send('entry deleted'))
		.catch(function (e: any) {
			res.status(404).send('Not found');
			console.log(e);
		});
};

// SYSTEM_PARAMETER
export function getAllSystemParameter(req: Request, res: Response) {
	db
		.select('*')
		.from('SFAADMIN.SYSTEM_PARAMETER')
		.then((sql_res: any) => res.send(sql_res))
		.catch(function (e: any) {
			res.status(400).send('Not found');
			console.log(e);
		});
};

export function getSystemParameter(req: Request, res: Response) {
	db
		.select('*')
		.from('SFAADMIN.SYSTEM_PARAMETER')
		.where({ SECOND_RESIDENCE_RATE: req.params.secondResidenceRate })
		.then((sql_res: any) => res.send(sql_res))
		.catch(function (e: any) {
			res.status(400).send('Not found');
			console.log(e);
		});
};

export function postSystemParameter(req: Request, res: Response) {
	console.log(req.body);
	db
		.raw(
			'SELECT max(SECOND_RESIDENCE_RATE) as SECOND_RESIDENCE_RATE FROM SFAADMIN.SYSTEM_PARAMETER'
		)
		.then((sql_res: any) => {
			console.log(sql_res);
			req.body.SECOND_RESIDENCE_RATE = sql_res[0].SECOND_RESIDENCE_RATE + 1;
			console.log(req.body);
			db('SFAADMIN.SYSTEM_PARAMETER')
				.insert(req.body)
				.then(() => res.send('entry updated'))
				.catch(function (e: any) {
					res.status(400).send('Not found');
					console.log(e);
				});
		})
		.catch(function (e: any) {
			res.status(400).send('Not Found');
			console.log(e);
		});
};

export function putSystemParameter(req: Request, res: Response) {
	db('SFAADMIN.SYSTEM_PARAMETER')
		.where({ SECOND_RESIDENCE_RATE: req.params.secondResidenceRate })
		.update(req.body)
		.then(() => res.send('entry updated'))
		.catch(function (e: any) {
			res.status(404).send('Not found');
			console.log(e);
		});
};

export function deleteSystemParameter(req: Request, res: Response) {
	db
		.delete()
		.from('SFAADMIN.SYSTEM_PARAMETER')
		.where({ SECOND_RESIDENCE_RATE: req.params.secondResidenceRate })
		.then(() => res.send('entry deleted'))
		.catch(function (e: any) {
			res.status(404).send('Not found');
			console.log(e);
		});
};

// TAB_PAGE_ITEM
export function getAllTabPageItem(req: Request, res: Response) {
	db
		.select('*')
		.from('SFAADMIN.TAB_PAGE_ITEM')
		.then((sql_res: any) => res.send(sql_res))
		.catch(function (e: any) {
			res.status(400).send('Not found');
			console.log(e);
		});
};

export function getTabPageItem(req: Request, res: Response) {
	db
		.select('*')
		.from('SFAADMIN.TAB_PAGE_ITEM')
		.where({ FORM_NAME: req.params.formName })
		.then((sql_res: any) => res.send(sql_res))
		.catch(function (e: any) {
			res.status(400).send('Not found');
			console.log(e);
		});
};

export function postTabPageItem(req: Request, res: Response) {
	console.log(req.body);
	db
		.raw('SELECT max(FORM_NAME) as FORM_NAME FROM SFAADMIN.TAB_PAGE_ITEM')
		.then((sql_res: any) => {
			console.log(sql_res);
			req.body.FORM_NAME = sql_res[0].FORM_NAME + 1;
			console.log(req.body);
			db('SFAADMIN.TAB_PAGE_ITEM')
				.insert(req.body)
				.then(() => res.send('entry updated'))
				.catch(function (e: any) {
					res.status(400).send('Not found');
					console.log(e);
				});
		})
		.catch(function (e: any) {
			res.status(400).send('Not Found');
			console.log(e);
		});
};

export function putTabPageItem(req: Request, res: Response) {
	db('SFAADMIN.TAB_PAGE_ITEM')
		.where({ FORM_NAME: req.params.formName })
		.update(req.body)
		.then(() => res.send('entry updated'))
		.catch(function (e: any) {
			res.status(404).send('Not found');
			console.log(e);
		});
};

export function deleteTabPageItem(req: Request, res: Response) {
	db
		.delete()
		.from('SFAADMIN.TAB_PAGE_ITEM')
		.where({ FORM_NAME: req.params.formName })
		.then(() => res.send('entry deleted'))
		.catch(function (e: any) {
			res.status(404).send('Not found');
			console.log(e);
		});
};

// TABLE_FORM_POPLIST
export function getAllTableFormPoplist(req: Request, res: Response) {
	db
		.select('*')
		.from('SFAADMIN.TABLE_FORM_POPLIST')
		.then((sql_res: any) => res.send(sql_res))
		.catch(function (e: any) {
			res.status(400).send('Not found');
			console.log(e);
		});
};

export function getTableFormPoplist(req: Request, res: Response) {
	db
		.select('*')
		.from('SFAADMIN.TABLE_FORM_POPLIST')
		.where({ TABLE_NAME: req.params.tableName })
		.then((sql_res: any) => res.send(sql_res))
		.catch(function (e: any) {
			res.status(400).send('Not found');
			console.log(e);
		});
};

export function postTableFormPoplist(req: Request, res: Response) {
	console.log(req.body);
	db
		.raw(
			'SELECT max(TABLE_NAME) as TABLE_NAME FROM SFAADMIN.TABLE_FORM_POPLIST'
		)
		.then((sql_res: any) => {
			console.log(sql_res);
			req.body.TABLE_NAME = sql_res[0].TABLE_NAME + 1;
			console.log(req.body);
			db('SFAADMIN.TABLE_FORM_POPLIST')
				.insert(req.body)
				.then(() => res.send('entry updated'))
				.catch(function (e: any) {
					res.status(400).send('Not found');
					console.log(e);
				});
		})
		.catch(function (e: any) {
			res.status(400).send('Not Found');
			console.log(e);
		});
};

export function putTableFormPoplist(req: Request, res: Response) {
	db('SFAADMIN.TABLE_FORM_POPLIST')
		.where({ TABLE_NAME: req.params.tableName })
		.update(req.body)
		.then(() => res.send('entry updated'))
		.catch(function (e: any) {
			res.status(404).send('Not found');
			console.log(e);
		});
};

export function deleteTableFormPoplist(req: Request, res: Response) {
	db
		.delete()
		.from('SFAADMIN.TABLE_FORM_POPLIST')
		.where({ TABLE_NAME: req.params.tableName })
		.then(() => res.send('entry deleted'))
		.catch(function (e: any) {
			res.status(404).send('Not found');
			console.log(e);
		});
};

// TRANSPORTATION
export function getAllTransportation(req: Request, res: Response) {
	db
		.select('*')
		.from('SFAADMIN.TRANSPORTATION')
		.then((sql_res: any) => res.send(sql_res))
		.catch(function (e: any) {
			res.status(400).send('Not found');
			console.log(e);
		});
};

export function getTransportation(req: Request, res: Response) {
	db
		.select('*')
		.from('SFAADMIN.TRANSPORTATION')
		.where({ TRANSPORTATION_ID: req.params.transportationId })
		.then((sql_res: any) => res.send(sql_res))
		.catch(function (e: any) {
			res.status(400).send('Not found');
			console.log(e);
		});
};

export function postTransportation(req: Request, res: Response) {
	console.log(req.body);
	db
		.raw(
			'SELECT max(TRANSPORTATION_ID) as TRANSPORTATION_ID FROM SFAADMIN.TRANSPORTATION'
		)
		.then((sql_res: any) => {
			console.log(sql_res);
			req.body.TRANSPORTATION_ID = sql_res[0].TRANSPORTATION_ID + 1;
			console.log(req.body);
			db('SFAADMIN.TRANSPORTATION')
				.insert(req.body)
				.then(() => res.send('entry updated'))
				.catch(function (e: any) {
					res.status(400).send('Not found');
					console.log(e);
				});
		})
		.catch(function (e: any) {
			res.status(400).send('Not Found');
			console.log(e);
		});
};

export function putTransportation(req: Request, res: Response) {
	db('SFAADMIN.TRANSPORTATION')
		.where({ TRANSPORTATION_ID: req.params.transportationId })
		.update(req.body)
		.then(() => res.send('entry updated'))
		.catch(function (e: any) {
			res.status(404).send('Not found');
			console.log(e);
		});
};

export function deleteTransportation(req: Request, res: Response) {
	db
		.delete()
		.from('SFAADMIN.TRANSPORTATION')
		.where({ TRANSPORTATION_ID: req.params.transportationId })
		.then(() => res.send('entry deleted'))
		.catch(function (e: any) {
			res.status(404).send('Not found');
			console.log(e);
		});
};

// VENDOR_FMIS
export function getAllVendorFmis(req: Request, res: Response) {
	db
		.select('*')
		.from('SFAADMIN.VENDOR_FMIS')
		.then((sql_res: any) => res.send(sql_res))
		.catch(function (e: any) {
			res.status(400).send('Not found');
			console.log(e);
		});
};

export function getVendorFmis(req: Request, res: Response) {
	db
		.select('*')
		.from('SFAADMIN.VENDOR_FMIS')
		.where({ ACTIVE: req.params.active })
		.then((sql_res: any) => res.send(sql_res))
		.catch(function (e: any) {
			res.status(400).send('Not found');
			console.log(e);
		});
};

export function postVendorFmis(req: Request, res: Response) {
	console.log(req.body);
	db
		.raw('SELECT max(ACTIVE) as ACTIVE FROM SFAADMIN.VENDOR_FMIS')
		.then((sql_res: any) => {
			console.log(sql_res);
			req.body.ACTIVE = sql_res[0].ACTIVE + 1;
			console.log(req.body);
			db('SFAADMIN.VENDOR_FMIS')
				.insert(req.body)
				.then(() => res.send('entry updated'))
				.catch(function (e: any) {
					res.status(400).send('Not found');
					console.log(e);
				});
		})
		.catch(function (e: any) {
			res.status(400).send('Not Found');
			console.log(e);
		});
};

export function putVendorFmis(req: Request, res: Response) {
	db('SFAADMIN.VENDOR_FMIS')
		.where({ ACTIVE: req.params.active })
		.update(req.body)
		.then(() => res.send('entry updated'))
		.catch(function (e: any) {
			res.status(404).send('Not found');
			console.log(e);
		});
};

export function deleteVendorFmis(req: Request, res: Response) {
	db
		.delete()
		.from('SFAADMIN.VENDOR_FMIS')
		.where({ ACTIVE: req.params.active })
		.then(() => res.send('entry deleted'))
		.catch(function (e: any) {
			res.status(404).send('Not found');
			console.log(e);
		});
};

// VENDOR_UPDATE
export function getAllVendorUpdate(req: Request, res: Response) {
	db
		.select('*')
		.from('SFAADMIN.VENDOR_UPDATE')
		.then((sql_res: any) => res.send(sql_res))
		.catch(function (e: any) {
			res.status(400).send('Not found');
			console.log(e);
		});
};

export function getVendorUpdate(req: Request, res: Response) {
	db
		.select('*')
		.from('SFAADMIN.VENDOR_UPDATE')
		.where({ VENDOR_UPDATE_ID: req.params.vendorUpdateId })
		.then((sql_res: any) => res.send(sql_res))
		.catch(function (e: any) {
			res.status(400).send('Not found');
			console.log(e);
		});
};

export function postVendorUpdate(req: Request, res: Response) {
	console.log(req.body);
	db
		.raw(
			'SELECT max(VENDOR_UPDATE_ID) as VENDOR_UPDATE_ID FROM SFAADMIN.VENDOR_UPDATE'
		)
		.then((sql_res: any) => {
			console.log(sql_res);
			req.body.VENDOR_UPDATE_ID = sql_res[0].VENDOR_UPDATE_ID + 1;
			console.log(req.body);
			db('SFAADMIN.VENDOR_UPDATE')
				.insert(req.body)
				.then(() => res.send('entry updated'))
				.catch(function (e: any) {
					res.status(400).send('Not found');
					console.log(e);
				});
		})
		.catch(function (e: any) {
			res.status(400).send('Not Found');
			console.log(e);
		});
};

export function putVendorUpdate(req: Request, res: Response) {
	db('SFAADMIN.VENDOR_UPDATE')
		.where({ VENDOR_UPDATE_ID: req.params.vendorUpdateId })
		.update(req.body)
		.then(() => res.send('entry updated'))
		.catch(function (e: any) {
			res.status(404).send('Not found');
			console.log(e);
		});
};

export function deleteVendorUpdate(req: Request, res: Response) {
	db
		.delete()
		.from('SFAADMIN.VENDOR_UPDATE')
		.where({ VENDOR_UPDATE_ID: req.params.vendorUpdateId })
		.then(() => res.send('entry deleted'))
		.catch(function (e: any) {
			res.status(404).send('Not found');
			console.log(e);
		});
};

// VERIFICATION_LOG
export function getAllVerificationLog(req: Request, res: Response) {
	db
		.select('*')
		.from('SFAADMIN.VERIFICATION_LOG')
		.then((sql_res: any) => res.send(sql_res))
		.catch(function (e: any) {
			res.status(400).send('Not found');
			console.log(e);
		});
};

export function getVerificationLog(req: Request, res: Response) {
	db
		.select('*')
		.from('SFAADMIN.VERIFICATION_LOG')
		.where({ VERIFICATION_LOG_ID: req.params.verificationLogId })
		.then((sql_res: any) => res.send(sql_res))
		.catch(function (e: any) {
			res.status(400).send('Not found');
			console.log(e);
		});
};

export function postVerificationLog(req: Request, res: Response) {
	console.log(req.body);
	db
		.raw(
			'SELECT max(VERIFICATION_LOG_ID) as VERIFICATION_LOG_ID FROM SFAADMIN.VERIFICATION_LOG'
		)
		.then((sql_res: any) => {
			console.log(sql_res);
			req.body.VERIFICATION_LOG_ID = sql_res[0].VERIFICATION_LOG_ID + 1;
			console.log(req.body);
			db('SFAADMIN.VERIFICATION_LOG')
				.insert(req.body)
				.then(() => res.send('entry updated'))
				.catch(function (e: any) {
					res.status(400).send('Not found');
					console.log(e);
				});
		})
		.catch(function (e: any) {
			res.status(400).send('Not Found');
			console.log(e);
		});
};

export function putVerificationLog(req: Request, res: Response) {
	db('SFAADMIN.VERIFICATION_LOG')
		.where({ VERIFICATION_LOG_ID: req.params.verificationLogId })
		.update(req.body)
		.then(() => res.send('entry updated'))
		.catch(function (e: any) {
			res.status(404).send('Not found');
			console.log(e);
		});
};

export function deleteVerificationLog(req: Request, res: Response) {
	db
		.delete()
		.from('SFAADMIN.VERIFICATION_LOG')
		.where({ VERIFICATION_LOG_ID: req.params.verificationLogId })
		.then(() => res.send('entry deleted'))
		.catch(function (e: any) {
			res.status(404).send('Not found');
			console.log(e);
		});
};

// YEA
export function getAllYea(req: Request, res: Response) {
	db
		.select('*')
		.from('SFAADMIN.YEA')
		.then((sql_res: any) => res.send(sql_res))
		.catch(function (e: any) {
			res.status(400).send('Not found');
			console.log(e);
		});
};

export function getYea(req: Request, res: Response) {
	db
		.select('*')
		.from('SFAADMIN.YEA')
		.where({ FNAME: req.params.fname })
		.then((sql_res: any) => res.send(sql_res))
		.catch(function (e: any) {
			res.status(400).send('Not found');
			console.log(e);
		});
};

export function postYea(req: Request, res: Response) {
	console.log(req.body);
	db
		.raw('SELECT max(FNAME) as FNAME FROM SFAADMIN.YEA')
		.then((sql_res: any) => {
			console.log(sql_res);
			req.body.FNAME = sql_res[0].FNAME + 1;
			console.log(req.body);
			db('SFAADMIN.YEA')
				.insert(req.body)
				.then(() => res.send('entry updated'))
				.catch(function (e: any) {
					res.status(400).send('Not found');
					console.log(e);
				});
		})
		.catch(function (e: any) {
			res.status(400).send('Not Found');
			console.log(e);
		});
};

export function putYea(req: Request, res: Response) {
	db('SFAADMIN.YEA')
		.where({ FNAME: req.params.fname })
		.update(req.body)
		.then(() => res.send('entry updated'))
		.catch(function (e: any) {
			res.status(404).send('Not found');
			console.log(e);
		});
};

export function deleteYea(req: Request, res: Response) {
	db
		.delete()
		.from('SFAADMIN.YEA')
		.where({ FNAME: req.params.fname })
		.then(() => res.send('entry deleted'))
		.catch(function (e: any) {
			res.status(404).send('Not found');
			console.log(e);
		});
};

// YEA_UPDATE
export function getAllYeaUpdate(req: Request, res: Response) {
	db
		.select('*')
		.from('SFAADMIN.YEA_UPDATE')
		.then((sql_res: any) => res.send(sql_res))
		.catch(function (e: any) {
			res.status(400).send('Not found');
			console.log(e);
		});
};

export function getYeaUpdate(req: Request, res: Response) {
	db
		.select('*')
		.from('SFAADMIN.YEA_UPDATE')
		.where({ FNAME: req.params.fname })
		.then((sql_res: any) => res.send(sql_res))
		.catch(function (e: any) {
			res.status(400).send('Not found');
			console.log(e);
		});
};

export function postYeaUpdate(req: Request, res: Response) {
	console.log(req.body);
	db
		.raw('SELECT max(FNAME) as FNAME FROM SFAADMIN.YEA_UPDATE')
		.then((sql_res: any) => {
			console.log(sql_res);
			req.body.FNAME = sql_res[0].FNAME + 1;
			console.log(req.body);
			db('SFAADMIN.YEA_UPDATE')
				.insert(req.body)
				.then(() => res.send('entry updated'))
				.catch(function (e: any) {
					res.status(400).send('Not found');
					console.log(e);
				});
		})
		.catch(function (e: any) {
			res.status(400).send('Not Found');
			console.log(e);
		});
};

export function putYeaUpdate(req: Request, res: Response) {
	db('SFAADMIN.YEA_UPDATE')
		.where({ FNAME: req.params.fname })
		.update(req.body)
		.then(() => res.send('entry updated'))
		.catch(function (e: any) {
			res.status(404).send('Not found');
			console.log(e);
		});
};

export function deleteYeaUpdate(req: Request, res: Response) {
	db
		.delete()
		.from('SFAADMIN.YEA_UPDATE')
		.where({ FNAME: req.params.fname })
		.then(() => res.send('entry deleted'))
		.catch(function (e: any) {
			res.status(404).send('Not found');
			console.log(e);
		});
};

// YG_COST
export function getAllYgCost(req: Request, res: Response) {
	db
		.select('*')
		.from('SFAADMIN.YG_COST')
		.then((sql_res: any) => res.send(sql_res))
		.catch(function (e: any) {
			res.status(400).send('Not found');
			console.log(e);
		});
};

export function getYgCost(req: Request, res: Response) {
	db
		.select('*')
		.from('SFAADMIN.YG_COST')
		.where({ YG_COST_ID: req.params.ygCostId })
		.then((sql_res: any) => res.send(sql_res))
		.catch(function (e: any) {
			res.status(400).send('Not found');
			console.log(e);
		});
};

export function postYgCost(req: Request, res: Response) {
	console.log(req.body);
	db
		.raw('SELECT max(YG_COST_ID) as YG_COST_ID FROM SFAADMIN.YG_COST')
		.then((sql_res: any) => {
			console.log(sql_res);
			req.body.YG_COST_ID = sql_res[0].YG_COST_ID + 1;
			console.log(req.body);
			db('SFAADMIN.YG_COST')
				.insert(req.body)
				.then(() => res.send('entry updated'))
				.catch(function (e: any) {
					res.status(400).send('Not found');
					console.log(e);
				});
		})
		.catch(function (e: any) {
			res.status(400).send('Not Found');
			console.log(e);
		});
};

export function putYgCost(req: Request, res: Response) {
	db('SFAADMIN.YG_COST')
		.where({ YG_COST_ID: req.params.ygCostId })
		.update(req.body)
		.then(() => res.send('entry updated'))
		.catch(function (e: any) {
			res.status(404).send('Not found');
			console.log(e);
		});
};

export function deleteYgCost(req: Request, res: Response) {
	db
		.delete()
		.from('SFAADMIN.YG_COST')
		.where({ YG_COST_ID: req.params.ygCostId })
		.then(() => res.send('entry deleted'))
		.catch(function (e: any) {
			res.status(404).send('Not found');
			console.log(e);
		});
};

// ABORIGINAL_STATUS
export function getAllAboriginalStatus(req: Request, res: Response) {
	db
		.select('*')
		.from('SFAADMIN.ABORIGINAL_STATUS')
		.then((sql_res: any) => res.send(sql_res))
		.catch(function (e: any) {
			res.status(400).send('Not found');
			console.log(e);
		});
};

export function getAboriginalStatus(req: Request, res: Response) {
	db
		.select('*')
		.from('SFAADMIN.ABORIGINAL_STATUS')
		.where({ ABORIGINAL_STATUS_ID: req.params.aboriginalStatusId })
		.then((sql_res: any) => res.send(sql_res))
		.catch(function (e: any) {
			res.status(400).send('Not found');
			console.log(e);
		});
};

export function postAboriginalStatus(req: Request, res: Response) {
	console.log(req.body);
	db
		.raw(
			'SELECT max(ABORIGINAL_STATUS_ID) as ABORIGINAL_STATUS_ID FROM SFAADMIN.ABORIGINAL_STATUS'
		)
		.then((sql_res: any) => {
			console.log(sql_res);
			req.body.ABORIGINAL_STATUS_ID = sql_res[0].ABORIGINAL_STATUS_ID + 1;
			console.log(req.body);
			db('SFAADMIN.ABORIGINAL_STATUS')
				.insert(req.body)
				.then(() => res.send('entry updated'))
				.catch(function (e: any) {
					res.status(400).send('Not found');
					console.log(e);
				});
		})
		.catch(function (e: any) {
			res.status(400).send('Not Found');
			console.log(e);
		});
};

export function putAboriginalStatus(req: Request, res: Response) {
	db('SFAADMIN.ABORIGINAL_STATUS')
		.where({ ABORIGINAL_STATUS_ID: req.params.aboriginalStatusId })
		.update(req.body)
		.then(() => res.send('entry updated'))
		.catch(function (e: any) {
			res.status(404).send('Not found');
			console.log(e);
		});
};

export function deleteAboriginalStatus(req: Request, res: Response) {
	db
		.delete()
		.from('SFAADMIN.ABORIGINAL_STATUS')
		.where({ ABORIGINAL_STATUS_ID: req.params.aboriginalStatusId })
		.then(() => res.send('entry deleted'))
		.catch(function (e: any) {
			res.status(404).send('Not found');
			console.log(e);
		});
};

// AGE_DISTRIBUTION
export function getAllAgeDistribution(req: Request, res: Response) {
	db
		.select('*')
		.from('SFAADMIN.AGE_DISTRIBUTION')
		.then((sql_res: any) => res.send(sql_res))
		.catch(function (e: any) {
			res.status(400).send('Not found');
			console.log(e);
		});
};

export function getAgeDistribution(req: Request, res: Response) {
	db
		.select('*')
		.from('SFAADMIN.AGE_DISTRIBUTION')
		.where({ AGE_DISTRIBUTION_ID: req.params.ageDistributionId })
		.then((sql_res: any) => res.send(sql_res))
		.catch(function (e: any) {
			res.status(400).send('Not found');
			console.log(e);
		});
};

export function postAgeDistribution(req: Request, res: Response) {
	console.log(req.body);
	db
		.raw(
			'SELECT max(AGE_DISTRIBUTION_ID) as AGE_DISTRIBUTION_ID FROM SFAADMIN.AGE_DISTRIBUTION'
		)
		.then((sql_res: any) => {
			console.log(sql_res);
			req.body.AGE_DISTRIBUTION_ID = sql_res[0].AGE_DISTRIBUTION_ID + 1;
			console.log(req.body);
			db('SFAADMIN.AGE_DISTRIBUTION')
				.insert(req.body)
				.then(() => res.send('entry updated'))
				.catch(function (e: any) {
					res.status(400).send('Not found');
					console.log(e);
				});
		})
		.catch(function (e: any) {
			res.status(400).send('Not Found');
			console.log(e);
		});
};

export function putAgeDistribution(req: Request, res: Response) {
	db('SFAADMIN.AGE_DISTRIBUTION')
		.where({ AGE_DISTRIBUTION_ID: req.params.ageDistributionId })
		.update(req.body)
		.then(() => res.send('entry updated'))
		.catch(function (e: any) {
			res.status(404).send('Not found');
			console.log(e);
		});
};

export function deleteAgeDistribution(req: Request, res: Response) {
	db
		.delete()
		.from('SFAADMIN.AGE_DISTRIBUTION')
		.where({ AGE_DISTRIBUTION_ID: req.params.ageDistributionId })
		.then(() => res.send('entry deleted'))
		.catch(function (e: any) {
			res.status(404).send('Not found');
			console.log(e);
		});
};

// AGENCY
export function getAllAgency(req: Request, res: Response) {
	db
		.select('*')
		.from('SFAADMIN.AGENCY')
		.then((sql_res: any) => res.send(sql_res))
		.catch(function (e: any) {
			res.status(400).send('Not found');
			console.log(e);
		});
};

export function getAgency(req: Request, res: Response) {
	db
		.select('*')
		.from('SFAADMIN.AGENCY')
		.where({ AGENCY_ID: req.params.agencyId })
		.then((sql_res: any) => res.send(sql_res))
		.catch(function (e: any) {
			res.status(400).send('Not found');
			console.log(e);
		});
};

export function postAgency(req: Request, res: Response) {
	console.log(req.body);
	db
		.raw('SELECT max(AGENCY_ID) as AGENCY_ID FROM SFAADMIN.AGENCY')
		.then((sql_res: any) => {
			console.log(sql_res);
			req.body.AGENCY_ID = sql_res[0].AGENCY_ID + 1;
			console.log(req.body);
			db('SFAADMIN.AGENCY')
				.insert(req.body)
				.then(() => res.send('entry updated'))
				.catch(function (e: any) {
					res.status(400).send('Not found');
					console.log(e);
				});
		})
		.catch(function (e: any) {
			res.status(400).send('Not Found');
			console.log(e);
		});
};

export function putAgency(req: Request, res: Response) {
	db('SFAADMIN.AGENCY')
		.where({ AGENCY_ID: req.params.agencyId })
		.update(req.body)
		.then(() => res.send('entry updated'))
		.catch(function (e: any) {
			res.status(404).send('Not found');
			console.log(e);
		});
};

export function deleteAgency(req: Request, res: Response) {
	db
		.delete()
		.from('SFAADMIN.AGENCY')
		.where({ AGENCY_ID: req.params.agencyId })
		.then(() => res.send('entry deleted'))
		.catch(function (e: any) {
			res.status(404).send('Not found');
			console.log(e);
		});
};

// AGENCY_ASSISTANCE
export function getAllAgencyAssistance(req: Request, res: Response) {
	db
		.select('*')
		.from('SFAADMIN.AGENCY_ASSISTANCE')
		.then((sql_res: any) => res.send(sql_res))
		.catch(function (e: any) {
			res.status(400).send('Not found');
			console.log(e);
		});
};

export function getAgencyAssistance(req: Request, res: Response) {
	db
		.select('*')
		.from('SFAADMIN.AGENCY_ASSISTANCE')
		.where({ HISTORY_DETAIL_ID: req.params.historyDetailId })
		.then((sql_res: any) => res.send(sql_res))
		.catch(function (e: any) {
			res.status(400).send('Not found');
			console.log(e);
		});
};

export function postAgencyAssistance(req: Request, res: Response) {
	console.log(req.body);
	db
		.raw(
			'SELECT max(HISTORY_DETAIL_ID) as HISTORY_DETAIL_ID FROM SFAADMIN.AGENCY_ASSISTANCE'
		)
		.then((sql_res: any) => {
			console.log(sql_res);
			req.body.HISTORY_DETAIL_ID = sql_res[0].HISTORY_DETAIL_ID + 1;
			console.log(req.body);
			db('SFAADMIN.AGENCY_ASSISTANCE')
				.insert(req.body)
				.then(() => res.send('entry updated'))
				.catch(function (e: any) {
					res.status(400).send('Not found');
					console.log(e);
				});
		})
		.catch(function (e: any) {
			res.status(400).send('Not Found');
			console.log(e);
		});
};

export function putAgencyAssistance(req: Request, res: Response) {
	db('SFAADMIN.AGENCY_ASSISTANCE')
		.where({ HISTORY_DETAIL_ID: req.params.historyDetailId })
		.update(req.body)
		.then(() => res.send('entry updated'))
		.catch(function (e: any) {
			res.status(404).send('Not found');
			console.log(e);
		});
};

export function deleteAgencyAssistance(req: Request, res: Response) {
	db
		.delete()
		.from('SFAADMIN.AGENCY_ASSISTANCE')
		.where({ HISTORY_DETAIL_ID: req.params.historyDetailId })
		.then(() => res.send('entry deleted'))
		.catch(function (e: any) {
			res.status(404).send('Not found');
			console.log(e);
		});
};

// APPLICATION_TYPE
export function getAllApplicationType(req: Request, res: Response) {
	db
		.select('*')
		.from('SFAADMIN.APPLICATION_TYPE')
		.then((sql_res: any) => res.send(sql_res))
		.catch(function (e: any) {
			res.status(400).send('Not found');
			console.log(e);
		});
};

export function getApplicationType(req: Request, res: Response) {
	db
		.select('*')
		.from('SFAADMIN.APPLICATION_TYPE')
		.where({ APPLICATION_TYPE_ID: req.params.applicationTypeId })
		.then((sql_res: any) => res.send(sql_res))
		.catch(function (e: any) {
			res.status(400).send('Not found');
			console.log(e);
		});
};

export function postApplicationType(req: Request, res: Response) {
	console.log(req.body);
	db
		.raw(
			'SELECT max(APPLICATION_TYPE_ID) as APPLICATION_TYPE_ID FROM SFAADMIN.APPLICATION_TYPE'
		)
		.then((sql_res: any) => {
			console.log(sql_res);
			req.body.APPLICATION_TYPE_ID = sql_res[0].APPLICATION_TYPE_ID + 1;
			console.log(req.body);
			db('SFAADMIN.APPLICATION_TYPE')
				.insert(req.body)
				.then(() => res.send('entry updated'))
				.catch(function (e: any) {
					res.status(400).send('Not found');
					console.log(e);
				});
		})
		.catch(function (e: any) {
			res.status(400).send('Not Found');
			console.log(e);
		});
};

export function putApplicationType(req: Request, res: Response) {
	db('SFAADMIN.APPLICATION_TYPE')
		.where({ APPLICATION_TYPE_ID: req.params.applicationTypeId })
		.update(req.body)
		.then(() => res.send('entry updated'))
		.catch(function (e: any) {
			res.status(404).send('Not found');
			console.log(e);
		});
};

export function deleteApplicationType(req: Request, res: Response) {
	db
		.delete()
		.from('SFAADMIN.APPLICATION_TYPE')
		.where({ APPLICATION_TYPE_ID: req.params.applicationTypeId })
		.then(() => res.send('entry deleted'))
		.catch(function (e: any) {
			res.status(404).send('Not found');
			console.log(e);
		});
};

// ASSESSMENT
export function getAllAssessment(req: Request, res: Response) {
	db
		.select('*')
		.from('SFAADMIN.ASSESSMENT')
		.then((sql_res: any) => res.send(sql_res))
		.catch(function (e: any) {
			res.status(400).send('Not found');
			console.log(e);
		});
};

export function getAssessment(req: Request, res: Response) {
	db
		.select('*')
		.from('SFAADMIN.ASSESSMENT')
		.where({ ASSESSMENT_ID: req.params.assessmentId })
		.then((sql_res: any) => res.send(sql_res))
		.catch(function (e: any) {
			res.status(400).send('Not found');
			console.log(e);
		});
};

export function postAssessment(req: Request, res: Response) {
	console.log(req.body);
	db
		.raw('SELECT max(ASSESSMENT_ID) as ASSESSMENT_ID FROM SFAADMIN.ASSESSMENT')
		.then((sql_res: any) => {
			console.log(sql_res);
			req.body.ASSESSMENT_ID = sql_res[0].ASSESSMENT_ID + 1;
			console.log(req.body);
			db('SFAADMIN.ASSESSMENT')
				.insert(req.body)
				.then(() => res.send('entry updated'))
				.catch(function (e: any) {
					res.status(400).send('Not found');
					console.log(e);
				});
		})
		.catch(function (e: any) {
			res.status(400).send('Not Found');
			console.log(e);
		});
};

export function putAssessment(req: Request, res: Response) {
	db('SFAADMIN.ASSESSMENT')
		.where({ ASSESSMENT_ID: req.params.assessmentId })
		.update(req.body)
		.then(() => res.send('entry updated'))
		.catch(function (e: any) {
			res.status(404).send('Not found');
			console.log(e);
		});
};

export function deleteAssessment(req: Request, res: Response) {
	db
		.delete()
		.from('SFAADMIN.ASSESSMENT')
		.where({ ASSESSMENT_ID: req.params.assessmentId })
		.then(() => res.send('entry deleted'))
		.catch(function (e: any) {
			res.status(404).send('Not found');
			console.log(e);
		});
};

// ASSESSMENT_TYPE
export function getAllAssessmentType(req: Request, res: Response) {
	db
		.select('*')
		.from('SFAADMIN.ASSESSMENT_TYPE')
		.then((sql_res: any) => res.send(sql_res))
		.catch(function (e: any) {
			res.status(400).send('Not found');
			console.log(e);
		});
};

export function getAssessmentType(req: Request, res: Response) {
	db
		.select('*')
		.from('SFAADMIN.ASSESSMENT_TYPE')
		.where({ ASSESSMENT_TYPE_ID: req.params.assessmentTypeId })
		.then((sql_res: any) => res.send(sql_res))
		.catch(function (e: any) {
			res.status(400).send('Not found');
			console.log(e);
		});
};

export function postAssessmentType(req: Request, res: Response) {
	console.log(req.body);
	db
		.raw(
			'SELECT max(ASSESSMENT_TYPE_ID) as ASSESSMENT_TYPE_ID FROM SFAADMIN.ASSESSMENT_TYPE'
		)
		.then((sql_res: any) => {
			console.log(sql_res);
			req.body.ASSESSMENT_TYPE_ID = sql_res[0].ASSESSMENT_TYPE_ID + 1;
			console.log(req.body);
			db('SFAADMIN.ASSESSMENT_TYPE')
				.insert(req.body)
				.then(() => res.send('entry updated'))
				.catch(function (e: any) {
					res.status(400).send('Not found');
					console.log(e);
				});
		})
		.catch(function (e: any) {
			res.status(400).send('Not Found');
			console.log(e);
		});
};

export function putAssessmentType(req: Request, res: Response) {
	db('SFAADMIN.ASSESSMENT_TYPE')
		.where({ ASSESSMENT_TYPE_ID: req.params.assessmentTypeId })
		.update(req.body)
		.then(() => res.send('entry updated'))
		.catch(function (e: any) {
			res.status(404).send('Not found');
			console.log(e);
		});
};

export function deleteAssessmentType(req: Request, res: Response) {
	db
		.delete()
		.from('SFAADMIN.ASSESSMENT_TYPE')
		.where({ ASSESSMENT_TYPE_ID: req.params.assessmentTypeId })
		.then(() => res.send('entry deleted'))
		.catch(function (e: any) {
			res.status(404).send('Not found');
			console.log(e);
		});
};

// BATCH_GROUP
export function getAllBatchGroup(req: Request, res: Response) {
	db
		.select('*')
		.from('SFAADMIN.BATCH_GROUP')
		.then((sql_res: any) => res.send(sql_res))
		.catch(function (e: any) {
			res.status(400).send('Not found');
			console.log(e);
		});
};

export function getBatchGroup(req: Request, res: Response) {
	db
		.select('*')
		.from('SFAADMIN.BATCH_GROUP')
		.where({ BATCH_GROUP_ID: req.params.batchGroupId })
		.then((sql_res: any) => res.send(sql_res))
		.catch(function (e: any) {
			res.status(400).send('Not found');
			console.log(e);
		});
};

export function postBatchGroup(req: Request, res: Response) {
	console.log(req.body);
	db
		.raw(
			'SELECT max(BATCH_GROUP_ID) as BATCH_GROUP_ID FROM SFAADMIN.BATCH_GROUP'
		)
		.then((sql_res: any) => {
			console.log(sql_res);
			req.body.BATCH_GROUP_ID = sql_res[0].BATCH_GROUP_ID + 1;
			console.log(req.body);
			db('SFAADMIN.BATCH_GROUP')
				.insert(req.body)
				.then(() => res.send('entry updated'))
				.catch(function (e: any) {
					res.status(400).send('Not found');
					console.log(e);
				});
		})
		.catch(function (e: any) {
			res.status(400).send('Not Found');
			console.log(e);
		});
};

export function putBatchGroup(req: Request, res: Response) {
	db('SFAADMIN.BATCH_GROUP')
		.where({ BATCH_GROUP_ID: req.params.batchGroupId })
		.update(req.body)
		.then(() => res.send('entry updated'))
		.catch(function (e: any) {
			res.status(404).send('Not found');
			console.log(e);
		});
};

export function deleteBatchGroup(req: Request, res: Response) {
	db
		.delete()
		.from('SFAADMIN.BATCH_GROUP')
		.where({ BATCH_GROUP_ID: req.params.batchGroupId })
		.then(() => res.send('entry deleted'))
		.catch(function (e: any) {
			res.status(404).send('Not found');
			console.log(e);
		});
};

// BATCH_PARAMETER
export function getAllBatchParameter(req: Request, res: Response) {
	db
		.select('*')
		.from('SFAADMIN.BATCH_PARAMETER')
		.then((sql_res: any) => res.send(sql_res))
		.catch(function (e: any) {
			res.status(400).send('Not found');
			console.log(e);
		});
};

export function getBatchParameter(req: Request, res: Response) {
	db
		.select('*')
		.from('SFAADMIN.BATCH_PARAMETER')
		.where({ BATCH_PARAMETER_ID: req.params.batchParameterId })
		.then((sql_res: any) => res.send(sql_res))
		.catch(function (e: any) {
			res.status(400).send('Not found');
			console.log(e);
		});
};

export function postBatchParameter(req: Request, res: Response) {
	console.log(req.body);
	db
		.raw(
			'SELECT max(BATCH_PARAMETER_ID) as BATCH_PARAMETER_ID FROM SFAADMIN.BATCH_PARAMETER'
		)
		.then((sql_res: any) => {
			console.log(sql_res);
			req.body.BATCH_PARAMETER_ID = sql_res[0].BATCH_PARAMETER_ID + 1;
			console.log(req.body);
			db('SFAADMIN.BATCH_PARAMETER')
				.insert(req.body)
				.then(() => res.send('entry updated'))
				.catch(function (e: any) {
					res.status(400).send('Not found');
					console.log(e);
				});
		})
		.catch(function (e: any) {
			res.status(400).send('Not Found');
			console.log(e);
		});
};

export function putBatchParameter(req: Request, res: Response) {
	db('SFAADMIN.BATCH_PARAMETER')
		.where({ BATCH_PARAMETER_ID: req.params.batchParameterId })
		.update(req.body)
		.then(() => res.send('entry updated'))
		.catch(function (e: any) {
			res.status(404).send('Not found');
			console.log(e);
		});
};

export function deleteBatchParameter(req: Request, res: Response) {
	db
		.delete()
		.from('SFAADMIN.BATCH_PARAMETER')
		.where({ BATCH_PARAMETER_ID: req.params.batchParameterId })
		.then(() => res.send('entry deleted'))
		.catch(function (e: any) {
			res.status(404).send('Not found');
			console.log(e);
		});
};

// CATEGORY
export function getAllCategory(req: Request, res: Response) {
	db
		.select('*')
		.from('SFAADMIN.CATEGORY')
		.then((sql_res: any) => res.send(sql_res))
		.catch(function (e: any) {
			res.status(400).send('Not found');
			console.log(e);
		});
};

export function getCategory(req: Request, res: Response) {
	db
		.select('*')
		.from('SFAADMIN.CATEGORY')
		.where({ CATEGORY_ID: req.params.categoryId })
		.then((sql_res: any) => res.send(sql_res))
		.catch(function (e: any) {
			res.status(400).send('Not found');
			console.log(e);
		});
};

export function postCategory(req: Request, res: Response) {
	console.log(req.body);
	db
		.raw('SELECT max(CATEGORY_ID) as CATEGORY_ID FROM SFAADMIN.CATEGORY')
		.then((sql_res: any) => {
			console.log(sql_res);
			req.body.CATEGORY_ID = sql_res[0].CATEGORY_ID + 1;
			console.log(req.body);
			db('SFAADMIN.CATEGORY')
				.insert(req.body)
				.then(() => res.send('entry updated'))
				.catch(function (e: any) {
					res.status(400).send('Not found');
					console.log(e);
				});
		})
		.catch(function (e: any) {
			res.status(400).send('Not Found');
			console.log(e);
		});
};

export function putCategory(req: Request, res: Response) {
	db('SFAADMIN.CATEGORY')
		.where({ CATEGORY_ID: req.params.categoryId })
		.update(req.body)
		.then(() => res.send('entry updated'))
		.catch(function (e: any) {
			res.status(404).send('Not found');
			console.log(e);
		});
};

export function deleteCategory(req: Request, res: Response) {
	db
		.delete()
		.from('SFAADMIN.CATEGORY')
		.where({ CATEGORY_ID: req.params.categoryId })
		.then(() => res.send('entry deleted'))
		.catch(function (e: any) {
			res.status(404).send('Not found');
			console.log(e);
		});
};

// CHANGE_REASON
export function getAllChangeReason(req: Request, res: Response) {
	db
		.select('*')
		.from('SFAADMIN.CHANGE_REASON')
		.then((sql_res: any) => res.send(sql_res))
		.catch(function (e: any) {
			res.status(400).send('Not found');
			console.log(e);
		});
};

export function getChangeReason(req: Request, res: Response) {
	db
		.select('*')
		.from('SFAADMIN.CHANGE_REASON')
		.where({ CHANGE_REASON_ID: req.params.changeReasonId })
		.then((sql_res: any) => res.send(sql_res))
		.catch(function (e: any) {
			res.status(400).send('Not found');
			console.log(e);
		});
};

export function postChangeReason(req: Request, res: Response) {
	console.log(req.body);
	db
		.raw(
			'SELECT max(CHANGE_REASON_ID) as CHANGE_REASON_ID FROM SFAADMIN.CHANGE_REASON'
		)
		.then((sql_res: any) => {
			console.log(sql_res);
			req.body.CHANGE_REASON_ID = sql_res[0].CHANGE_REASON_ID + 1;
			console.log(req.body);
			db('SFAADMIN.CHANGE_REASON')
				.insert(req.body)
				.then(() => res.send('entry updated'))
				.catch(function (e: any) {
					res.status(400).send('Not found');
					console.log(e);
				});
		})
		.catch(function (e: any) {
			res.status(400).send('Not Found');
			console.log(e);
		});
};

export function putChangeReason(req: Request, res: Response) {
	db('SFAADMIN.CHANGE_REASON')
		.where({ CHANGE_REASON_ID: req.params.changeReasonId })
		.update(req.body)
		.then(() => res.send('entry updated'))
		.catch(function (e: any) {
			res.status(404).send('Not found');
			console.log(e);
		});
};

export function deleteChangeReason(req: Request, res: Response) {
	db
		.delete()
		.from('SFAADMIN.CHANGE_REASON')
		.where({ CHANGE_REASON_ID: req.params.changeReasonId })
		.then(() => res.send('entry deleted'))
		.catch(function (e: any) {
			res.status(404).send('Not found');
			console.log(e);
		});
};

// CHILD_CARE_CEILING
export function getAllChildCareCeiling(req: Request, res: Response) {
	db
		.select('*')
		.from('SFAADMIN.CHILD_CARE_CEILING')
		.then((sql_res: any) => res.send(sql_res))
		.catch(function (e: any) {
			res.status(400).send('Not found');
			console.log(e);
		});
};

export function getChildCareCeiling(req: Request, res: Response) {
	db
		.select('*')
		.from('SFAADMIN.CHILD_CARE_CEILING')
		.where({ ACADEMIC_YEAR: req.params.academicYear })
		.then((sql_res: any) => res.send(sql_res))
		.catch(function (e: any) {
			res.status(400).send('Not found');
			console.log(e);
		});
};

export function postChildCareCeiling(req: Request, res: Response) {
	console.log(req.body);
	db
		.raw(
			'SELECT max(ACADEMIC_YEAR) as ACADEMIC_YEAR FROM SFAADMIN.CHILD_CARE_CEILING'
		)
		.then((sql_res: any) => {
			console.log(sql_res);
			req.body.ACADEMIC_YEAR = sql_res[0].ACADEMIC_YEAR + 1;
			console.log(req.body);
			db('SFAADMIN.CHILD_CARE_CEILING')
				.insert(req.body)
				.then(() => res.send('entry updated'))
				.catch(function (e: any) {
					res.status(400).send('Not found');
					console.log(e);
				});
		})
		.catch(function (e: any) {
			res.status(400).send('Not Found');
			console.log(e);
		});
};

export function putChildCareCeiling(req: Request, res: Response) {
	db('SFAADMIN.CHILD_CARE_CEILING')
		.where({ ACADEMIC_YEAR: req.params.academicYear })
		.update(req.body)
		.then(() => res.send('entry updated'))
		.catch(function (e: any) {
			res.status(404).send('Not found');
			console.log(e);
		});
};

export function deleteChildCareCeiling(req: Request, res: Response) {
	db
		.delete()
		.from('SFAADMIN.CHILD_CARE_CEILING')
		.where({ ACADEMIC_YEAR: req.params.academicYear })
		.then(() => res.send('entry deleted'))
		.catch(function (e: any) {
			res.status(404).send('Not found');
			console.log(e);
		});
};

// CITY
export function getAllCity(req: Request, res: Response) {
	db
		.select('*')
		.from('SFAADMIN.CITY')
		.then((sql_res: any) => res.send(sql_res))
		.catch(function (e: any) {
			res.status(400).send('Not found');
			console.log(e);
		});
};

export function getCity(req: Request, res: Response) {
	db
		.select('*')
		.from('SFAADMIN.CITY')
		.where({ CITY_ID: req.params.cityId })
		.then((sql_res: any) => res.send(sql_res))
		.catch(function (e: any) {
			res.status(400).send('Not found');
			console.log(e);
		});
};

export function postCity(req: Request, res: Response) {
	console.log(req.body);
	db
		.raw('SELECT max(CITY_ID) as CITY_ID FROM SFAADMIN.CITY')
		.then((sql_res: any) => {
			console.log(sql_res);
			req.body.CITY_ID = sql_res[0].CITY_ID + 1;
			console.log(req.body);
			db('SFAADMIN.CITY')
				.insert(req.body)
				.then(() => res.send('entry updated'))
				.catch(function (e: any) {
					res.status(400).send('Not found');
					console.log(e);
				});
		})
		.catch(function (e: any) {
			res.status(400).send('Not Found');
			console.log(e);
		});
};

export function putCity(req: Request, res: Response) {
	db('SFAADMIN.CITY')
		.where({ CITY_ID: req.params.cityId })
		.update(req.body)
		.then(() => res.send('entry updated'))
		.catch(function (e: any) {
			res.status(404).send('Not found');
			console.log(e);
		});
};

export function deleteCity(req: Request, res: Response) {
	db
		.delete()
		.from('SFAADMIN.CITY')
		.where({ CITY_ID: req.params.cityId })
		.then(() => res.send('entry deleted'))
		.catch(function (e: any) {
			res.status(404).send('Not found');
			console.log(e);
		});
};

// COMMUNICATION
export function getAllCommunication(req: Request, res: Response) {
	db
		.select('*')
		.from('SFAADMIN.COMMUNICATION')
		.then((sql_res: any) => res.send(sql_res))
		.catch(function (e: any) {
			res.status(400).send('Not found');
			console.log(e);
		});
};

export function getCommunication(req: Request, res: Response) {
	db
		.select('*')
		.from('SFAADMIN.COMMUNICATION')
		.where({ COMMUNICATION_ID: req.params.communicationId })
		.then((sql_res: any) => res.send(sql_res))
		.catch(function (e: any) {
			res.status(400).send('Not found');
			console.log(e);
		});
};

export function postCommunication(req: Request, res: Response) {
	console.log(req.body);
	db
		.raw(
			'SELECT max(COMMUNICATION_ID) as COMMUNICATION_ID FROM SFAADMIN.COMMUNICATION'
		)
		.then((sql_res: any) => {
			console.log(sql_res);
			req.body.COMMUNICATION_ID = sql_res[0].COMMUNICATION_ID + 1;
			console.log(req.body);
			db('SFAADMIN.COMMUNICATION')
				.insert(req.body)
				.then(() => res.send('entry updated'))
				.catch(function (e: any) {
					res.status(400).send('Not found');
					console.log(e);
				});
		})
		.catch(function (e: any) {
			res.status(400).send('Not Found');
			console.log(e);
		});
};

export function putCommunication(req: Request, res: Response) {
	db('SFAADMIN.COMMUNICATION')
		.where({ COMMUNICATION_ID: req.params.communicationId })
		.update(req.body)
		.then(() => res.send('entry updated'))
		.catch(function (e: any) {
			res.status(404).send('Not found');
			console.log(e);
		});
};

export function deleteCommunication(req: Request, res: Response) {
	db
		.delete()
		.from('SFAADMIN.COMMUNICATION')
		.where({ COMMUNICATION_ID: req.params.communicationId })
		.then(() => res.send('entry deleted'))
		.catch(function (e: any) {
			res.status(404).send('Not found');
			console.log(e);
		});
};

// COMMUNICATION_LOG
export function getAllCommunicationLog(req: Request, res: Response) {
	db
		.select('*')
		.from('SFAADMIN.COMMUNICATION_LOG')
		.then((sql_res: any) => res.send(sql_res))
		.catch(function (e: any) {
			res.status(400).send('Not found');
			console.log(e);
		});
};

export function getCommunicationLog(req: Request, res: Response) {
	db
		.select('*')
		.from('SFAADMIN.COMMUNICATION_LOG')
		.where({ COMMUNICATION_LOG_ID: req.params.communicationLogId })
		.then((sql_res: any) => res.send(sql_res))
		.catch(function (e: any) {
			res.status(400).send('Not found');
			console.log(e);
		});
};

export function postCommunicationLog(req: Request, res: Response) {
	console.log(req.body);
	db
		.raw(
			'SELECT max(COMMUNICATION_LOG_ID) as COMMUNICATION_LOG_ID FROM SFAADMIN.COMMUNICATION_LOG'
		)
		.then((sql_res: any) => {
			console.log(sql_res);
			req.body.COMMUNICATION_LOG_ID = sql_res[0].COMMUNICATION_LOG_ID + 1;
			console.log(req.body);
			db('SFAADMIN.COMMUNICATION_LOG')
				.insert(req.body)
				.then(() => res.send('entry updated'))
				.catch(function (e: any) {
					res.status(400).send('Not found');
					console.log(e);
				});
		})
		.catch(function (e: any) {
			res.status(400).send('Not Found');
			console.log(e);
		});
};

export function putCommunicationLog(req: Request, res: Response) {
	db('SFAADMIN.COMMUNICATION_LOG')
		.where({ COMMUNICATION_LOG_ID: req.params.communicationLogId })
		.update(req.body)
		.then(() => res.send('entry updated'))
		.catch(function (e: any) {
			res.status(404).send('Not found');
			console.log(e);
		});
};

export function deleteCommunicationLog(req: Request, res: Response) {
	db
		.delete()
		.from('SFAADMIN.COMMUNICATION_LOG')
		.where({ COMMUNICATION_LOG_ID: req.params.communicationLogId })
		.then(() => res.send('entry deleted'))
		.catch(function (e: any) {
			res.status(404).send('Not found');
			console.log(e);
		});
};

// COMMUNICATION_TYPE
export function getAllCommunicationType(req: Request, res: Response) {
	db
		.select('*')
		.from('SFAADMIN.COMMUNICATION_TYPE')
		.then((sql_res: any) => res.send(sql_res))
		.catch(function (e: any) {
			res.status(400).send('Not found');
			console.log(e);
		});
};

export function getCommunicationType(req: Request, res: Response) {
	db
		.select('*')
		.from('SFAADMIN.COMMUNICATION_TYPE')
		.where({ COMMUNICATION_TYPE_ID: req.params.communicationTypeId })
		.then((sql_res: any) => res.send(sql_res))
		.catch(function (e: any) {
			res.status(400).send('Not found');
			console.log(e);
		});
};

export function postCommunicationType(req: Request, res: Response) {
	console.log(req.body);
	db
		.raw(
			'SELECT max(COMMUNICATION_TYPE_ID) as COMMUNICATION_TYPE_ID FROM SFAADMIN.COMMUNICATION_TYPE'
		)
		.then((sql_res: any) => {
			console.log(sql_res);
			req.body.COMMUNICATION_TYPE_ID = sql_res[0].COMMUNICATION_TYPE_ID + 1;
			console.log(req.body);
			db('SFAADMIN.COMMUNICATION_TYPE')
				.insert(req.body)
				.then(() => res.send('entry updated'))
				.catch(function (e: any) {
					res.status(400).send('Not found');
					console.log(e);
				});
		})
		.catch(function (e: any) {
			res.status(400).send('Not Found');
			console.log(e);
		});
};

export function putCommunicationType(req: Request, res: Response) {
	db('SFAADMIN.COMMUNICATION_TYPE')
		.where({ COMMUNICATION_TYPE_ID: req.params.communicationTypeId })
		.update(req.body)
		.then(() => res.send('entry updated'))
		.catch(function (e: any) {
			res.status(404).send('Not found');
			console.log(e);
		});
};

export function deleteCommunicationType(req: Request, res: Response) {
	db
		.delete()
		.from('SFAADMIN.COMMUNICATION_TYPE')
		.where({ COMMUNICATION_TYPE_ID: req.params.communicationTypeId })
		.then(() => res.send('entry deleted'))
		.catch(function (e: any) {
			res.status(404).send('Not found');
			console.log(e);
		});
};

// CONVERT_YTID_TO_PEN
export function getAllConvertYtidToPen(req: Request, res: Response) {
	db
		.select('*')
		.from('SFAADMIN.CONVERT_YTID_TO_PEN')
		.then((sql_res: any) => res.send(sql_res))
		.catch(function (e: any) {
			res.status(400).send('Not found');
			console.log(e);
		});
};

export function getConvertYtidToPen(req: Request, res: Response) {
	db
		.select('*')
		.from('SFAADMIN.CONVERT_YTID_TO_PEN')
		.where({ YTID: req.params.ytid })
		.then((sql_res: any) => res.send(sql_res))
		.catch(function (e: any) {
			res.status(400).send('Not found');
			console.log(e);
		});
};

export function postConvertYtidToPen(req: Request, res: Response) {
	console.log(req.body);
	db
		.raw('SELECT max(YTID) as YTID FROM SFAADMIN.CONVERT_YTID_TO_PEN')
		.then((sql_res: any) => {
			console.log(sql_res);
			req.body.YTID = sql_res[0].YTID + 1;
			console.log(req.body);
			db('SFAADMIN.CONVERT_YTID_TO_PEN')
				.insert(req.body)
				.then(() => res.send('entry updated'))
				.catch(function (e: any) {
					res.status(400).send('Not found');
					console.log(e);
				});
		})
		.catch(function (e: any) {
			res.status(400).send('Not Found');
			console.log(e);
		});
};

export function putConvertYtidToPen(req: Request, res: Response) {
	db('SFAADMIN.CONVERT_YTID_TO_PEN')
		.where({ YTID: req.params.ytid })
		.update(req.body)
		.then(() => res.send('entry updated'))
		.catch(function (e: any) {
			res.status(404).send('Not found');
			console.log(e);
		});
};

export function deleteConvertYtidToPen(req: Request, res: Response) {
	db
		.delete()
		.from('SFAADMIN.CONVERT_YTID_TO_PEN')
		.where({ YTID: req.params.ytid })
		.then(() => res.send('entry deleted'))
		.catch(function (e: any) {
			res.status(404).send('Not found');
			console.log(e);
		});
};

// CORR_TYPE_BATCH_PARAM
export function getAllCorrTypeBatchParam(req: Request, res: Response) {
	db
		.select('*')
		.from('SFAADMIN.CORR_TYPE_BATCH_PARAM')
		.then((sql_res: any) => res.send(sql_res))
		.catch(function (e: any) {
			res.status(400).send('Not found');
			console.log(e);
		});
};

export function getCorrTypeBatchParam(req: Request, res: Response) {
	db
		.select('*')
		.from('SFAADMIN.CORR_TYPE_BATCH_PARAM')
		.where({ CORRESPONDENCE_TYPE_ID: req.params.correspondenceTypeId })
		.then((sql_res: any) => res.send(sql_res))
		.catch(function (e: any) {
			res.status(400).send('Not found');
			console.log(e);
		});
};

export function postCorrTypeBatchParam(req: Request, res: Response) {
	console.log(req.body);
	db
		.raw(
			'SELECT max(CORRESPONDENCE_TYPE_ID) as CORRESPONDENCE_TYPE_ID FROM SFAADMIN.CORR_TYPE_BATCH_PARAM'
		)
		.then((sql_res: any) => {
			console.log(sql_res);
			req.body.CORRESPONDENCE_TYPE_ID = sql_res[0].CORRESPONDENCE_TYPE_ID + 1;
			console.log(req.body);
			db('SFAADMIN.CORR_TYPE_BATCH_PARAM')
				.insert(req.body)
				.then(() => res.send('entry updated'))
				.catch(function (e: any) {
					res.status(400).send('Not found');
					console.log(e);
				});
		})
		.catch(function (e: any) {
			res.status(400).send('Not Found');
			console.log(e);
		});
};

export function putCorrTypeBatchParam(req: Request, res: Response) {
	db('SFAADMIN.CORR_TYPE_BATCH_PARAM')
		.where({ CORRESPONDENCE_TYPE_ID: req.params.correspondenceTypeId })
		.update(req.body)
		.then(() => res.send('entry updated'))
		.catch(function (e: any) {
			res.status(404).send('Not found');
			console.log(e);
		});
};

export function deleteCorrTypeBatchParam(req: Request, res: Response) {
	db
		.delete()
		.from('SFAADMIN.CORR_TYPE_BATCH_PARAM')
		.where({ CORRESPONDENCE_TYPE_ID: req.params.correspondenceTypeId })
		.then(() => res.send('entry deleted'))
		.catch(function (e: any) {
			res.status(404).send('Not found');
			console.log(e);
		});
};

// CORRES_BATCH_PARAM
export function getAllCorresBatchParam(req: Request, res: Response) {
	db
		.select('*')
		.from('SFAADMIN.CORRES_BATCH_PARAM')
		.then((sql_res: any) => res.send(sql_res))
		.catch(function (e: any) {
			res.status(400).send('Not found');
			console.log(e);
		});
};

export function getCorresBatchParam(req: Request, res: Response) {
	db
		.select('*')
		.from('SFAADMIN.CORRES_BATCH_PARAM')
		.where({ CORRESPONDENCE_ID: req.params.correspondenceId })
		.then((sql_res: any) => res.send(sql_res))
		.catch(function (e: any) {
			res.status(400).send('Not found');
			console.log(e);
		});
};

export function postCorresBatchParam(req: Request, res: Response) {
	console.log(req.body);
	db
		.raw(
			'SELECT max(CORRESPONDENCE_ID) as CORRESPONDENCE_ID FROM SFAADMIN.CORRES_BATCH_PARAM'
		)
		.then((sql_res: any) => {
			console.log(sql_res);
			req.body.CORRESPONDENCE_ID = sql_res[0].CORRESPONDENCE_ID + 1;
			console.log(req.body);
			db('SFAADMIN.CORRES_BATCH_PARAM')
				.insert(req.body)
				.then(() => res.send('entry updated'))
				.catch(function (e: any) {
					res.status(400).send('Not found');
					console.log(e);
				});
		})
		.catch(function (e: any) {
			res.status(400).send('Not Found');
			console.log(e);
		});
};

export function putCorresBatchParam(req: Request, res: Response) {
	db('SFAADMIN.CORRES_BATCH_PARAM')
		.where({ CORRESPONDENCE_ID: req.params.correspondenceId })
		.update(req.body)
		.then(() => res.send('entry updated'))
		.catch(function (e: any) {
			res.status(404).send('Not found');
			console.log(e);
		});
};

export function deleteCorresBatchParam(req: Request, res: Response) {
	db
		.delete()
		.from('SFAADMIN.CORRES_BATCH_PARAM')
		.where({ CORRESPONDENCE_ID: req.params.correspondenceId })
		.then(() => res.send('entry deleted'))
		.catch(function (e: any) {
			res.status(404).send('Not found');
			console.log(e);
		});
};

// CORRESPONDENCE
export function getAllCorrespondence(req: Request, res: Response) {
	db
		.select('*')
		.from('SFAADMIN.CORRESPONDENCE')
		.then((sql_res: any) => res.send(sql_res))
		.catch(function (e: any) {
			res.status(400).send('Not found');
			console.log(e);
		});
};

export function getCorrespondence(req: Request, res: Response) {
	db
		.select('*')
		.from('SFAADMIN.CORRESPONDENCE')
		.where({ CORRESPONDENCE_ID: req.params.correspondenceId })
		.then((sql_res: any) => res.send(sql_res))
		.catch(function (e: any) {
			res.status(400).send('Not found');
			console.log(e);
		});
};

export function postCorrespondence(req: Request, res: Response) {
	console.log(req.body);
	db
		.raw(
			'SELECT max(CORRESPONDENCE_ID) as CORRESPONDENCE_ID FROM SFAADMIN.CORRESPONDENCE'
		)
		.then((sql_res: any) => {
			console.log(sql_res);
			req.body.CORRESPONDENCE_ID = sql_res[0].CORRESPONDENCE_ID + 1;
			console.log(req.body);
			db('SFAADMIN.CORRESPONDENCE')
				.insert(req.body)
				.then(() => res.send('entry updated'))
				.catch(function (e: any) {
					res.status(400).send('Not found');
					console.log(e);
				});
		})
		.catch(function (e: any) {
			res.status(400).send('Not Found');
			console.log(e);
		});
};

export function putCorrespondence(req: Request, res: Response) {
	db('SFAADMIN.CORRESPONDENCE')
		.where({ CORRESPONDENCE_ID: req.params.correspondenceId })
		.update(req.body)
		.then(() => res.send('entry updated'))
		.catch(function (e: any) {
			res.status(404).send('Not found');
			console.log(e);
		});
};

export function deleteCorrespondence(req: Request, res: Response) {
	db
		.delete()
		.from('SFAADMIN.CORRESPONDENCE')
		.where({ CORRESPONDENCE_ID: req.params.correspondenceId })
		.then(() => res.send('entry deleted'))
		.catch(function (e: any) {
			res.status(404).send('Not found');
			console.log(e);
		});
};

// CORRESPONDENCE_TYPE
export function getAllCorrespondenceType(req: Request, res: Response) {
	db
		.select('*')
		.from('SFAADMIN.CORRESPONDENCE_TYPE')
		.then((sql_res: any) => res.send(sql_res))
		.catch(function (e: any) {
			res.status(400).send('Not found');
			console.log(e);
		});
};

export function getCorrespondenceType(req: Request, res: Response) {
	db
		.select('*')
		.from('SFAADMIN.CORRESPONDENCE_TYPE')
		.where({ CORRESPONDENCE_TYPE_ID: req.params.correspondenceTypeId })
		.then((sql_res: any) => res.send(sql_res))
		.catch(function (e: any) {
			res.status(400).send('Not found');
			console.log(e);
		});
};

export function postCorrespondenceType(req: Request, res: Response) {
	console.log(req.body);
	db
		.raw(
			'SELECT max(CORRESPONDENCE_TYPE_ID) as CORRESPONDENCE_TYPE_ID FROM SFAADMIN.CORRESPONDENCE_TYPE'
		)
		.then((sql_res: any) => {
			console.log(sql_res);
			req.body.CORRESPONDENCE_TYPE_ID = sql_res[0].CORRESPONDENCE_TYPE_ID + 1;
			console.log(req.body);
			db('SFAADMIN.CORRESPONDENCE_TYPE')
				.insert(req.body)
				.then(() => res.send('entry updated'))
				.catch(function (e: any) {
					res.status(400).send('Not found');
					console.log(e);
				});
		})
		.catch(function (e: any) {
			res.status(400).send('Not Found');
			console.log(e);
		});
};

export function putCorrespondenceType(req: Request, res: Response) {
	db('SFAADMIN.CORRESPONDENCE_TYPE')
		.where({ CORRESPONDENCE_TYPE_ID: req.params.correspondenceTypeId })
		.update(req.body)
		.then(() => res.send('entry updated'))
		.catch(function (e: any) {
			res.status(404).send('Not found');
			console.log(e);
		});
};

export function deleteCorrespondenceType(req: Request, res: Response) {
	db
		.delete()
		.from('SFAADMIN.CORRESPONDENCE_TYPE')
		.where({ CORRESPONDENCE_TYPE_ID: req.params.correspondenceTypeId })
		.then(() => res.send('entry deleted'))
		.catch(function (e: any) {
			res.status(404).send('Not found');
			console.log(e);
		});
};

// COUNTRY
export function getAllCountry(req: Request, res: Response) {
	db
		.select('*')
		.from('SFAADMIN.COUNTRY')
		.then((sql_res: any) => res.send(sql_res))
		.catch(function (e: any) {
			res.status(400).send('Not found');
			console.log(e);
		});
};

export function getCountry(req: Request, res: Response) {
	db
		.select('*')
		.from('SFAADMIN.COUNTRY')
		.where({ COUNTRY_ID: req.params.countryId })
		.then((sql_res: any) => res.send(sql_res))
		.catch(function (e: any) {
			res.status(400).send('Not found');
			console.log(e);
		});
};

export function postCountry(req: Request, res: Response) {
	console.log(req.body);
	db
		.raw('SELECT max(COUNTRY_ID) as COUNTRY_ID FROM SFAADMIN.COUNTRY')
		.then((sql_res: any) => {
			console.log(sql_res);
			req.body.COUNTRY_ID = sql_res[0].COUNTRY_ID + 1;
			console.log(req.body);
			db('SFAADMIN.COUNTRY')
				.insert(req.body)
				.then(() => res.send('entry updated'))
				.catch(function (e: any) {
					res.status(400).send('Not found');
					console.log(e);
				});
		})
		.catch(function (e: any) {
			res.status(400).send('Not Found');
			console.log(e);
		});
};

export function putCountry(req: Request, res: Response) {
	db('SFAADMIN.COUNTRY')
		.where({ COUNTRY_ID: req.params.countryId })
		.update(req.body)
		.then(() => res.send('entry updated'))
		.catch(function (e: any) {
			res.status(404).send('Not found');
			console.log(e);
		});
};

export function deleteCountry(req: Request, res: Response) {
	db
		.delete()
		.from('SFAADMIN.COUNTRY')
		.where({ COUNTRY_ID: req.params.countryId })
		.then(() => res.send('entry deleted'))
		.catch(function (e: any) {
			res.status(404).send('Not found');
			console.log(e);
		});
};

// COURSE_ENROLLED
export function getAllCourseEnrolled(req: Request, res: Response) {
	db
		.select('*')
		.from('SFAADMIN.COURSE_ENROLLED')
		.then((sql_res: any) => res.send(sql_res))
		.catch(function (e: any) {
			res.status(400).send('Not found');
			console.log(e);
		});
};

export function getCourseEnrolled(req: Request, res: Response) {
	db
		.select('*')
		.from('SFAADMIN.COURSE_ENROLLED')
		.where({ COURSE_ENROLLED_ID: req.params.courseEnrolledId })
		.then((sql_res: any) => res.send(sql_res))
		.catch(function (e: any) {
			res.status(400).send('Not found');
			console.log(e);
		});
};

export function postCourseEnrolled(req: Request, res: Response) {
	console.log(req.body);
	db
		.raw(
			'SELECT max(COURSE_ENROLLED_ID) as COURSE_ENROLLED_ID FROM SFAADMIN.COURSE_ENROLLED'
		)
		.then((sql_res: any) => {
			console.log(sql_res);
			req.body.COURSE_ENROLLED_ID = sql_res[0].COURSE_ENROLLED_ID + 1;
			console.log(req.body);
			db('SFAADMIN.COURSE_ENROLLED')
				.insert(req.body)
				.then(() => res.send('entry updated'))
				.catch(function (e: any) {
					res.status(400).send('Not found');
					console.log(e);
				});
		})
		.catch(function (e: any) {
			res.status(400).send('Not Found');
			console.log(e);
		});
};

export function putCourseEnrolled(req: Request, res: Response) {
	db('SFAADMIN.COURSE_ENROLLED')
		.where({ COURSE_ENROLLED_ID: req.params.courseEnrolledId })
		.update(req.body)
		.then(() => res.send('entry updated'))
		.catch(function (e: any) {
			res.status(404).send('Not found');
			console.log(e);
		});
};

export function deleteCourseEnrolled(req: Request, res: Response) {
	db
		.delete()
		.from('SFAADMIN.COURSE_ENROLLED')
		.where({ COURSE_ENROLLED_ID: req.params.courseEnrolledId })
		.then(() => res.send('entry deleted'))
		.catch(function (e: any) {
			res.status(404).send('Not found');
			console.log(e);
		});
};

// CSG_LOOKUP
export function getAllCsgLookup(req: Request, res: Response) {
	db
		.select('*')
		.from('SFAADMIN.CSG_LOOKUP')
		.then((sql_res: any) => res.send(sql_res))
		.catch(function (e: any) {
			res.status(400).send('Not found');
			console.log(e);
		});
};

export function getCsgLookup(req: Request, res: Response) {
	db
		.select('*')
		.from('SFAADMIN.CSG_LOOKUP')
		.where({ ACADEMIC_YEAR: req.params.academicYear })
		.then((sql_res: any) => res.send(sql_res))
		.catch(function (e: any) {
			res.status(400).send('Not found');
			console.log(e);
		});
};

export function postCsgLookup(req: Request, res: Response) {
	console.log(req.body);
	db
		.raw('SELECT max(ACADEMIC_YEAR) as ACADEMIC_YEAR FROM SFAADMIN.CSG_LOOKUP')
		.then((sql_res: any) => {
			console.log(sql_res);
			req.body.ACADEMIC_YEAR = sql_res[0].ACADEMIC_YEAR + 1;
			console.log(req.body);
			db('SFAADMIN.CSG_LOOKUP')
				.insert(req.body)
				.then(() => res.send('entry updated'))
				.catch(function (e: any) {
					res.status(400).send('Not found');
					console.log(e);
				});
		})
		.catch(function (e: any) {
			res.status(400).send('Not Found');
			console.log(e);
		});
};

export function putCsgLookup(req: Request, res: Response) {
	db('SFAADMIN.CSG_LOOKUP')
		.where({ ACADEMIC_YEAR: req.params.academicYear })
		.update(req.body)
		.then(() => res.send('entry updated'))
		.catch(function (e: any) {
			res.status(404).send('Not found');
			console.log(e);
		});
};

export function deleteCsgLookup(req: Request, res: Response) {
	db
		.delete()
		.from('SFAADMIN.CSG_LOOKUP')
		.where({ ACADEMIC_YEAR: req.params.academicYear })
		.then(() => res.send('entry deleted'))
		.catch(function (e: any) {
			res.status(404).send('Not found');
			console.log(e);
		});
};

// CSG_THRESHOLD
export function getAllCsgThreshold(req: Request, res: Response) {
	db
		.select('*')
		.from('SFAADMIN.CSG_THRESHOLD')
		.then((sql_res: any) => res.send(sql_res))
		.catch(function (e: any) {
			res.status(400).send('Not found');
			console.log(e);
		});
};

export function getCsgThreshold(req: Request, res: Response) {
	db
		.select('*')
		.from('SFAADMIN.CSG_THRESHOLD')
		.where({ ACADEMIC_YEAR: req.params.academicYear })
		.then((sql_res: any) => res.send(sql_res))
		.catch(function (e: any) {
			res.status(400).send('Not found');
			console.log(e);
		});
};

export function postCsgThreshold(req: Request, res: Response) {
	console.log(req.body);
	db
		.raw(
			'SELECT max(ACADEMIC_YEAR) as ACADEMIC_YEAR FROM SFAADMIN.CSG_THRESHOLD'
		)
		.then((sql_res: any) => {
			console.log(sql_res);
			req.body.ACADEMIC_YEAR = sql_res[0].ACADEMIC_YEAR + 1;
			console.log(req.body);
			db('SFAADMIN.CSG_THRESHOLD')
				.insert(req.body)
				.then(() => res.send('entry updated'))
				.catch(function (e: any) {
					res.status(400).send('Not found');
					console.log(e);
				});
		})
		.catch(function (e: any) {
			res.status(400).send('Not Found');
			console.log(e);
		});
};

export function putCsgThreshold(req: Request, res: Response) {
	db('SFAADMIN.CSG_THRESHOLD')
		.where({ ACADEMIC_YEAR: req.params.academicYear })
		.update(req.body)
		.then(() => res.send('entry updated'))
		.catch(function (e: any) {
			res.status(404).send('Not found');
			console.log(e);
		});
};

export function deleteCsgThreshold(req: Request, res: Response) {
	db
		.delete()
		.from('SFAADMIN.CSG_THRESHOLD')
		.where({ ACADEMIC_YEAR: req.params.academicYear })
		.then(() => res.send('entry deleted'))
		.catch(function (e: any) {
			res.status(404).send('Not found');
			console.log(e);
		});
};

// CSL_CODE
export function getAllCslCode(req: Request, res: Response) {
	db
		.select('*')
		.from('SFAADMIN.CSL_CODE')
		.then((sql_res: any) => res.send(sql_res))
		.catch(function (e: any) {
			res.status(400).send('Not found');
			console.log(e);
		});
};

export function getCslCode(req: Request, res: Response) {
	db
		.select('*')
		.from('SFAADMIN.CSL_CODE')
		.where({ CSL_CODE_ID: req.params.cslCodeId })
		.then((sql_res: any) => res.send(sql_res))
		.catch(function (e: any) {
			res.status(400).send('Not found');
			console.log(e);
		});
};

export function postCslCode(req: Request, res: Response) {
	console.log(req.body);
	db
		.raw('SELECT max(CSL_CODE_ID) as CSL_CODE_ID FROM SFAADMIN.CSL_CODE')
		.then((sql_res: any) => {
			console.log(sql_res);
			req.body.CSL_CODE_ID = sql_res[0].CSL_CODE_ID + 1;
			console.log(req.body);
			db('SFAADMIN.CSL_CODE')
				.insert(req.body)
				.then(() => res.send('entry updated'))
				.catch(function (e: any) {
					res.status(400).send('Not found');
					console.log(e);
				});
		})
		.catch(function (e: any) {
			res.status(400).send('Not Found');
			console.log(e);
		});
};

export function putCslCode(req: Request, res: Response) {
	db('SFAADMIN.CSL_CODE')
		.where({ CSL_CODE_ID: req.params.cslCodeId })
		.update(req.body)
		.then(() => res.send('entry updated'))
		.catch(function (e: any) {
			res.status(404).send('Not found');
			console.log(e);
		});
};

export function deleteCslCode(req: Request, res: Response) {
	db
		.delete()
		.from('SFAADMIN.CSL_CODE')
		.where({ CSL_CODE_ID: req.params.cslCodeId })
		.then(() => res.send('entry deleted'))
		.catch(function (e: any) {
			res.status(404).send('Not found');
			console.log(e);
		});
};

// CSL_CODE_OLD
export function getAllCslCodeOld(req: Request, res: Response) {
	db
		.select('*')
		.from('SFAADMIN.CSL_CODE_OLD')
		.then((sql_res: any) => res.send(sql_res))
		.catch(function (e: any) {
			res.status(400).send('Not found');
			console.log(e);
		});
};

export function getCslCodeOld(req: Request, res: Response) {
	db
		.select('*')
		.from('SFAADMIN.CSL_CODE_OLD')
		.where({ CSL_CODE: req.params.cslCode })
		.then((sql_res: any) => res.send(sql_res))
		.catch(function (e: any) {
			res.status(400).send('Not found');
			console.log(e);
		});
};

export function postCslCodeOld(req: Request, res: Response) {
	console.log(req.body);
	db
		.raw('SELECT max(CSL_CODE) as CSL_CODE FROM SFAADMIN.CSL_CODE_OLD')
		.then((sql_res: any) => {
			console.log(sql_res);
			req.body.CSL_CODE = sql_res[0].CSL_CODE + 1;
			console.log(req.body);
			db('SFAADMIN.CSL_CODE_OLD')
				.insert(req.body)
				.then(() => res.send('entry updated'))
				.catch(function (e: any) {
					res.status(400).send('Not found');
					console.log(e);
				});
		})
		.catch(function (e: any) {
			res.status(400).send('Not Found');
			console.log(e);
		});
};

export function putCslCodeOld(req: Request, res: Response) {
	db('SFAADMIN.CSL_CODE_OLD')
		.where({ CSL_CODE: req.params.cslCode })
		.update(req.body)
		.then(() => res.send('entry updated'))
		.catch(function (e: any) {
			res.status(404).send('Not found');
			console.log(e);
		});
};

export function deleteCslCodeOld(req: Request, res: Response) {
	db
		.delete()
		.from('SFAADMIN.CSL_CODE_OLD')
		.where({ CSL_CODE: req.params.cslCode })
		.then(() => res.send('entry deleted'))
		.catch(function (e: any) {
			res.status(404).send('Not found');
			console.log(e);
		});
};

// CSL_LOOKUP
export function getAllCslLookup(req: Request, res: Response) {
	db
		.select('*')
		.from('SFAADMIN.CSL_LOOKUP')
		.then((sql_res: any) => res.send(sql_res))
		.catch(function (e: any) {
			res.status(400).send('Not found');
			console.log(e);
		});
};

export function getCslLookup(req: Request, res: Response) {
	db
		.select('*')
		.from('SFAADMIN.CSL_LOOKUP')
		.where({ ACADEMIC_YEAR: req.params.academicYear })
		.then((sql_res: any) => res.send(sql_res))
		.catch(function (e: any) {
			res.status(400).send('Not found');
			console.log(e);
		});
};

export function postCslLookup(req: Request, res: Response) {
	console.log(req.body);
	db
		.raw('SELECT max(ACADEMIC_YEAR) as ACADEMIC_YEAR FROM SFAADMIN.CSL_LOOKUP')
		.then((sql_res: any) => {
			console.log(sql_res);
			req.body.ACADEMIC_YEAR = sql_res[0].ACADEMIC_YEAR + 1;
			console.log(req.body);
			db('SFAADMIN.CSL_LOOKUP')
				.insert(req.body)
				.then(() => res.send('entry updated'))
				.catch(function (e: any) {
					res.status(400).send('Not found');
					console.log(e);
				});
		})
		.catch(function (e: any) {
			res.status(400).send('Not Found');
			console.log(e);
		});
};

export function putCslLookup(req: Request, res: Response) {
	db('SFAADMIN.CSL_LOOKUP')
		.where({ ACADEMIC_YEAR: req.params.academicYear })
		.update(req.body)
		.then(() => res.send('entry updated'))
		.catch(function (e: any) {
			res.status(404).send('Not found');
			console.log(e);
		});
};

export function deleteCslLookup(req: Request, res: Response) {
	db
		.delete()
		.from('SFAADMIN.CSL_LOOKUP')
		.where({ ACADEMIC_YEAR: req.params.academicYear })
		.then(() => res.send('entry deleted'))
		.catch(function (e: any) {
			res.status(404).send('Not found');
			console.log(e);
		});
};

// CSL_NARS_HISTORY
export function getAllCslNarsHistory(req: Request, res: Response) {
	db
		.select('*')
		.from('SFAADMIN.CSL_NARS_HISTORY')
		.then((sql_res: any) => res.send(sql_res))
		.catch(function (e: any) {
			res.status(400).send('Not found');
			console.log(e);
		});
};

export function getCslNarsHistory(req: Request, res: Response) {
	db
		.select('*')
		.from('SFAADMIN.CSL_NARS_HISTORY')
		.where({ CSL_NARS_HISTORY_ID: req.params.cslNarsHistoryId })
		.then((sql_res: any) => res.send(sql_res))
		.catch(function (e: any) {
			res.status(400).send('Not found');
			console.log(e);
		});
};

export function postCslNarsHistory(req: Request, res: Response) {
	console.log(req.body);
	db
		.raw(
			'SELECT max(CSL_NARS_HISTORY_ID) as CSL_NARS_HISTORY_ID FROM SFAADMIN.CSL_NARS_HISTORY'
		)
		.then((sql_res: any) => {
			console.log(sql_res);
			req.body.CSL_NARS_HISTORY_ID = sql_res[0].CSL_NARS_HISTORY_ID + 1;
			console.log(req.body);
			db('SFAADMIN.CSL_NARS_HISTORY')
				.insert(req.body)
				.then(() => res.send('entry updated'))
				.catch(function (e: any) {
					res.status(400).send('Not found');
					console.log(e);
				});
		})
		.catch(function (e: any) {
			res.status(400).send('Not Found');
			console.log(e);
		});
};

export function putCslNarsHistory(req: Request, res: Response) {
	db('SFAADMIN.CSL_NARS_HISTORY')
		.where({ CSL_NARS_HISTORY_ID: req.params.cslNarsHistoryId })
		.update(req.body)
		.then(() => res.send('entry updated'))
		.catch(function (e: any) {
			res.status(404).send('Not found');
			console.log(e);
		});
};

export function deleteCslNarsHistory(req: Request, res: Response) {
	db
		.delete()
		.from('SFAADMIN.CSL_NARS_HISTORY')
		.where({ CSL_NARS_HISTORY_ID: req.params.cslNarsHistoryId })
		.then(() => res.send('entry deleted'))
		.catch(function (e: any) {
			res.status(404).send('Not found');
			console.log(e);
		});
};

// CSL_NARS_HISTORY_2010JUL29
export function getAllCslNarsHistory2010jul29(req: Request, res: Response) {
	db
		.select('*')
		.from('SFAADMIN.CSL_NARS_HISTORY_2010JUL29')
		.then((sql_res: any) => res.send(sql_res))
		.catch(function (e: any) {
			res.status(400).send('Not found');
			console.log(e);
		});
};

export function getCslNarsHistory2010jul29(req: Request, res: Response) {
	db
		.select('*')
		.from('SFAADMIN.CSL_NARS_HISTORY_2010JUL29')
		.where({ CSL_NARS_HISTORY_ID: req.params.cslNarsHistoryId })
		.then((sql_res: any) => res.send(sql_res))
		.catch(function (e: any) {
			res.status(400).send('Not found');
			console.log(e);
		});
};

export function postCslNarsHistory2010jul29(req: Request, res: Response) {
	console.log(req.body);
	db
		.raw(
			'SELECT max(CSL_NARS_HISTORY_ID) as CSL_NARS_HISTORY_ID FROM SFAADMIN.CSL_NARS_HISTORY_2010JUL29'
		)
		.then((sql_res: any) => {
			console.log(sql_res);
			req.body.CSL_NARS_HISTORY_ID = sql_res[0].CSL_NARS_HISTORY_ID + 1;
			console.log(req.body);
			db('SFAADMIN.CSL_NARS_HISTORY_2010JUL29')
				.insert(req.body)
				.then(() => res.send('entry updated'))
				.catch(function (e: any) {
					res.status(400).send('Not found');
					console.log(e);
				});
		})
		.catch(function (e: any) {
			res.status(400).send('Not Found');
			console.log(e);
		});
};

export function putCslNarsHistory2010jul29(req: Request, res: Response) {
	db('SFAADMIN.CSL_NARS_HISTORY_2010JUL29')
		.where({ CSL_NARS_HISTORY_ID: req.params.cslNarsHistoryId })
		.update(req.body)
		.then(() => res.send('entry updated'))
		.catch(function (e: any) {
			res.status(404).send('Not found');
			console.log(e);
		});
};

export function deleteCslNarsHistory2010jul29(req: Request, res: Response) {
	db
		.delete()
		.from('SFAADMIN.CSL_NARS_HISTORY_2010JUL29')
		.where({ CSL_NARS_HISTORY_ID: req.params.cslNarsHistoryId })
		.then(() => res.send('entry deleted'))
		.catch(function (e: any) {
			res.status(404).send('Not found');
			console.log(e);
		});
};

// CSL_NARS_HISTORY_2010MAY
export function getAllCslNarsHistory2010may(req: Request, res: Response) {
	db
		.select('*')
		.from('SFAADMIN.CSL_NARS_HISTORY_2010MAY')
		.then((sql_res: any) => res.send(sql_res))
		.catch(function (e: any) {
			res.status(400).send('Not found');
			console.log(e);
		});
};

export function getCslNarsHistory2010may(req: Request, res: Response) {
	db
		.select('*')
		.from('SFAADMIN.CSL_NARS_HISTORY_2010MAY')
		.where({ CSL_NARS_HISTORY_ID: req.params.cslNarsHistoryId })
		.then((sql_res: any) => res.send(sql_res))
		.catch(function (e: any) {
			res.status(400).send('Not found');
			console.log(e);
		});
};

export function postCslNarsHistory2010may(req: Request, res: Response) {
	console.log(req.body);
	db
		.raw(
			'SELECT max(CSL_NARS_HISTORY_ID) as CSL_NARS_HISTORY_ID FROM SFAADMIN.CSL_NARS_HISTORY_2010MAY'
		)
		.then((sql_res: any) => {
			console.log(sql_res);
			req.body.CSL_NARS_HISTORY_ID = sql_res[0].CSL_NARS_HISTORY_ID + 1;
			console.log(req.body);
			db('SFAADMIN.CSL_NARS_HISTORY_2010MAY')
				.insert(req.body)
				.then(() => res.send('entry updated'))
				.catch(function (e: any) {
					res.status(400).send('Not found');
					console.log(e);
				});
		})
		.catch(function (e: any) {
			res.status(400).send('Not Found');
			console.log(e);
		});
};

export function putCslNarsHistory2010may(req: Request, res: Response) {
	db('SFAADMIN.CSL_NARS_HISTORY_2010MAY')
		.where({ CSL_NARS_HISTORY_ID: req.params.cslNarsHistoryId })
		.update(req.body)
		.then(() => res.send('entry updated'))
		.catch(function (e: any) {
			res.status(404).send('Not found');
			console.log(e);
		});
};

export function deleteCslNarsHistory2010may(req: Request, res: Response) {
	db
		.delete()
		.from('SFAADMIN.CSL_NARS_HISTORY_2010MAY')
		.where({ CSL_NARS_HISTORY_ID: req.params.cslNarsHistoryId })
		.then(() => res.send('entry deleted'))
		.catch(function (e: any) {
			res.status(404).send('Not found');
			console.log(e);
		});
};

// CSL_NARS_HISTORY_2011JAN27
export function getAllCslNarsHistory2011jan27(req: Request, res: Response) {
	db
		.select('*')
		.from('SFAADMIN.CSL_NARS_HISTORY_2011JAN27')
		.then((sql_res: any) => res.send(sql_res))
		.catch(function (e: any) {
			res.status(400).send('Not found');
			console.log(e);
		});
};

export function getCslNarsHistory2011jan27(req: Request, res: Response) {
	db
		.select('*')
		.from('SFAADMIN.CSL_NARS_HISTORY_2011JAN27')
		.where({ CSL_NARS_HISTORY_ID: req.params.cslNarsHistoryId })
		.then((sql_res: any) => res.send(sql_res))
		.catch(function (e: any) {
			res.status(400).send('Not found');
			console.log(e);
		});
};

export function postCslNarsHistory2011jan27(req: Request, res: Response) {
	console.log(req.body);
	db
		.raw(
			'SELECT max(CSL_NARS_HISTORY_ID) as CSL_NARS_HISTORY_ID FROM SFAADMIN.CSL_NARS_HISTORY_2011JAN27'
		)
		.then((sql_res: any) => {
			console.log(sql_res);
			req.body.CSL_NARS_HISTORY_ID = sql_res[0].CSL_NARS_HISTORY_ID + 1;
			console.log(req.body);
			db('SFAADMIN.CSL_NARS_HISTORY_2011JAN27')
				.insert(req.body)
				.then(() => res.send('entry updated'))
				.catch(function (e: any) {
					res.status(400).send('Not found');
					console.log(e);
				});
		})
		.catch(function (e: any) {
			res.status(400).send('Not Found');
			console.log(e);
		});
};

export function putCslNarsHistory2011jan27(req: Request, res: Response) {
	db('SFAADMIN.CSL_NARS_HISTORY_2011JAN27')
		.where({ CSL_NARS_HISTORY_ID: req.params.cslNarsHistoryId })
		.update(req.body)
		.then(() => res.send('entry updated'))
		.catch(function (e: any) {
			res.status(404).send('Not found');
			console.log(e);
		});
};

export function deleteCslNarsHistory2011jan27(req: Request, res: Response) {
	db
		.delete()
		.from('SFAADMIN.CSL_NARS_HISTORY_2011JAN27')
		.where({ CSL_NARS_HISTORY_ID: req.params.cslNarsHistoryId })
		.then(() => res.send('entry deleted'))
		.catch(function (e: any) {
			res.status(404).send('Not found');
			console.log(e);
		});
};

// CSL_NSLSC_ADDRESS
export function getAllCslNslscAddress(req: Request, res: Response) {
	db
		.select('*')
		.from('SFAADMIN.CSL_NSLSC_ADDRESS')
		.then((sql_res: any) => res.send(sql_res))
		.catch(function (e: any) {
			res.status(400).send('Not found');
			console.log(e);
		});
};

export function getCslNslscAddress(req: Request, res: Response) {
	db
		.select('*')
		.from('SFAADMIN.CSL_NSLSC_ADDRESS')
		.where({ CSL_NSLSC_ADDRESS_ID: req.params.cslNslscAddressId })
		.then((sql_res: any) => res.send(sql_res))
		.catch(function (e: any) {
			res.status(400).send('Not found');
			console.log(e);
		});
};

export function postCslNslscAddress(req: Request, res: Response) {
	console.log(req.body);
	db
		.raw(
			'SELECT max(CSL_NSLSC_ADDRESS_ID) as CSL_NSLSC_ADDRESS_ID FROM SFAADMIN.CSL_NSLSC_ADDRESS'
		)
		.then((sql_res: any) => {
			console.log(sql_res);
			req.body.CSL_NSLSC_ADDRESS_ID = sql_res[0].CSL_NSLSC_ADDRESS_ID + 1;
			console.log(req.body);
			db('SFAADMIN.CSL_NSLSC_ADDRESS')
				.insert(req.body)
				.then(() => res.send('entry updated'))
				.catch(function (e: any) {
					res.status(400).send('Not found');
					console.log(e);
				});
		})
		.catch(function (e: any) {
			res.status(400).send('Not Found');
			console.log(e);
		});
};

export function putCslNslscAddress(req: Request, res: Response) {
	db('SFAADMIN.CSL_NSLSC_ADDRESS')
		.where({ CSL_NSLSC_ADDRESS_ID: req.params.cslNslscAddressId })
		.update(req.body)
		.then(() => res.send('entry updated'))
		.catch(function (e: any) {
			res.status(404).send('Not found');
			console.log(e);
		});
};

export function deleteCslNslscAddress(req: Request, res: Response) {
	db
		.delete()
		.from('SFAADMIN.CSL_NSLSC_ADDRESS')
		.where({ CSL_NSLSC_ADDRESS_ID: req.params.cslNslscAddressId })
		.then(() => res.send('entry deleted'))
		.catch(function (e: any) {
			res.status(404).send('Not found');
			console.log(e);
		});
};

// CSL_REASON
export function getAllCslReason(req: Request, res: Response) {
	db
		.select('*')
		.from('SFAADMIN.CSL_REASON')
		.then((sql_res: any) => res.send(sql_res))
		.catch(function (e: any) {
			res.status(400).send('Not found');
			console.log(e);
		});
};

export function getCslReason(req: Request, res: Response) {
	db
		.select('*')
		.from('SFAADMIN.CSL_REASON')
		.where({ CSL_REASON_ID: req.params.cslReasonId })
		.then((sql_res: any) => res.send(sql_res))
		.catch(function (e: any) {
			res.status(400).send('Not found');
			console.log(e);
		});
};

export function postCslReason(req: Request, res: Response) {
	console.log(req.body);
	db
		.raw('SELECT max(CSL_REASON_ID) as CSL_REASON_ID FROM SFAADMIN.CSL_REASON')
		.then((sql_res: any) => {
			console.log(sql_res);
			req.body.CSL_REASON_ID = sql_res[0].CSL_REASON_ID + 1;
			console.log(req.body);
			db('SFAADMIN.CSL_REASON')
				.insert(req.body)
				.then(() => res.send('entry updated'))
				.catch(function (e: any) {
					res.status(400).send('Not found');
					console.log(e);
				});
		})
		.catch(function (e: any) {
			res.status(400).send('Not Found');
			console.log(e);
		});
};

export function putCslReason(req: Request, res: Response) {
	db('SFAADMIN.CSL_REASON')
		.where({ CSL_REASON_ID: req.params.cslReasonId })
		.update(req.body)
		.then(() => res.send('entry updated'))
		.catch(function (e: any) {
			res.status(404).send('Not found');
			console.log(e);
		});
};

export function deleteCslReason(req: Request, res: Response) {
	db
		.delete()
		.from('SFAADMIN.CSL_REASON')
		.where({ CSL_REASON_ID: req.params.cslReasonId })
		.then(() => res.send('entry deleted'))
		.catch(function (e: any) {
			res.status(404).send('Not found');
			console.log(e);
		});
};

// CSL_RESTRICTED
export function getAllCslRestricted(req: Request, res: Response) {
	db
		.select('*')
		.from('SFAADMIN.CSL_RESTRICTED')
		.then((sql_res: any) => res.send(sql_res))
		.catch(function (e: any) {
			res.status(400).send('Not found');
			console.log(e);
		});
};

export function getCslRestricted(req: Request, res: Response) {
	db
		.select('*')
		.from('SFAADMIN.CSL_RESTRICTED')
		.where({ CSL_RESTRICTED_ID: req.params.cslRestrictedId })
		.then((sql_res: any) => res.send(sql_res))
		.catch(function (e: any) {
			res.status(400).send('Not found');
			console.log(e);
		});
};

export function postCslRestricted(req: Request, res: Response) {
	console.log(req.body);
	db
		.raw(
			'SELECT max(CSL_RESTRICTED_ID) as CSL_RESTRICTED_ID FROM SFAADMIN.CSL_RESTRICTED'
		)
		.then((sql_res: any) => {
			console.log(sql_res);
			req.body.CSL_RESTRICTED_ID = sql_res[0].CSL_RESTRICTED_ID + 1;
			console.log(req.body);
			db('SFAADMIN.CSL_RESTRICTED')
				.insert(req.body)
				.then(() => res.send('entry updated'))
				.catch(function (e: any) {
					res.status(400).send('Not found');
					console.log(e);
				});
		})
		.catch(function (e: any) {
			res.status(400).send('Not Found');
			console.log(e);
		});
};

export function putCslRestricted(req: Request, res: Response) {
	db('SFAADMIN.CSL_RESTRICTED')
		.where({ CSL_RESTRICTED_ID: req.params.cslRestrictedId })
		.update(req.body)
		.then(() => res.send('entry updated'))
		.catch(function (e: any) {
			res.status(404).send('Not found');
			console.log(e);
		});
};

export function deleteCslRestricted(req: Request, res: Response) {
	db
		.delete()
		.from('SFAADMIN.CSL_RESTRICTED')
		.where({ CSL_RESTRICTED_ID: req.params.cslRestrictedId })
		.then(() => res.send('entry deleted'))
		.catch(function (e: any) {
			res.status(404).send('Not found');
			console.log(e);
		});
};

// CSL_RESTRICTED_BACKUP
export function getAllCslRestrictedBackup(req: Request, res: Response) {
	db
		.select('*')
		.from('SFAADMIN.CSL_RESTRICTED_BACKUP')
		.then((sql_res: any) => res.send(sql_res))
		.catch(function (e: any) {
			res.status(400).send('Not found');
			console.log(e);
		});
};

export function getCslRestrictedBackup(req: Request, res: Response) {
	db
		.select('*')
		.from('SFAADMIN.CSL_RESTRICTED_BACKUP')
		.where({ CSL_RESTRICTED_ID: req.params.cslRestrictedId })
		.then((sql_res: any) => res.send(sql_res))
		.catch(function (e: any) {
			res.status(400).send('Not found');
			console.log(e);
		});
};

export function postCslRestrictedBackup(req: Request, res: Response) {
	console.log(req.body);
	db
		.raw(
			'SELECT max(CSL_RESTRICTED_ID) as CSL_RESTRICTED_ID FROM SFAADMIN.CSL_RESTRICTED_BACKUP'
		)
		.then((sql_res: any) => {
			console.log(sql_res);
			req.body.CSL_RESTRICTED_ID = sql_res[0].CSL_RESTRICTED_ID + 1;
			console.log(req.body);
			db('SFAADMIN.CSL_RESTRICTED_BACKUP')
				.insert(req.body)
				.then(() => res.send('entry updated'))
				.catch(function (e: any) {
					res.status(400).send('Not found');
					console.log(e);
				});
		})
		.catch(function (e: any) {
			res.status(400).send('Not Found');
			console.log(e);
		});
};

export function putCslRestrictedBackup(req: Request, res: Response) {
	db('SFAADMIN.CSL_RESTRICTED_BACKUP')
		.where({ CSL_RESTRICTED_ID: req.params.cslRestrictedId })
		.update(req.body)
		.then(() => res.send('entry updated'))
		.catch(function (e: any) {
			res.status(404).send('Not found');
			console.log(e);
		});
};

export function deleteCslRestrictedBackup(req: Request, res: Response) {
	db
		.delete()
		.from('SFAADMIN.CSL_RESTRICTED_BACKUP')
		.where({ CSL_RESTRICTED_ID: req.params.cslRestrictedId })
		.then(() => res.send('entry deleted'))
		.catch(function (e: any) {
			res.status(404).send('Not found');
			console.log(e);
		});
};

// DATA_CORRECTION
export function getAllDataCorrection(req: Request, res: Response) {
	db
		.select('*')
		.from('SFAADMIN.DATA_CORRECTION')
		.then((sql_res: any) => res.send(sql_res))
		.catch(function (e: any) {
			res.status(400).send('Not found');
			console.log(e);
		});
};

export function getDataCorrection(req: Request, res: Response) {
	db
		.select('*')
		.from('SFAADMIN.DATA_CORRECTION')
		.where({ DATA_CORRECTION_ID: req.params.dataCorrectionId })
		.then((sql_res: any) => res.send(sql_res))
		.catch(function (e: any) {
			res.status(400).send('Not found');
			console.log(e);
		});
};

export function postDataCorrection(req: Request, res: Response) {
	console.log(req.body);
	db
		.raw(
			'SELECT max(DATA_CORRECTION_ID) as DATA_CORRECTION_ID FROM SFAADMIN.DATA_CORRECTION'
		)
		.then((sql_res: any) => {
			console.log(sql_res);
			req.body.DATA_CORRECTION_ID = sql_res[0].DATA_CORRECTION_ID + 1;
			console.log(req.body);
			db('SFAADMIN.DATA_CORRECTION')
				.insert(req.body)
				.then(() => res.send('entry updated'))
				.catch(function (e: any) {
					res.status(400).send('Not found');
					console.log(e);
				});
		})
		.catch(function (e: any) {
			res.status(400).send('Not Found');
			console.log(e);
		});
};

export function putDataCorrection(req: Request, res: Response) {
	db('SFAADMIN.DATA_CORRECTION')
		.where({ DATA_CORRECTION_ID: req.params.dataCorrectionId })
		.update(req.body)
		.then(() => res.send('entry updated'))
		.catch(function (e: any) {
			res.status(404).send('Not found');
			console.log(e);
		});
};

export function deleteDataCorrection(req: Request, res: Response) {
	db
		.delete()
		.from('SFAADMIN.DATA_CORRECTION')
		.where({ DATA_CORRECTION_ID: req.params.dataCorrectionId })
		.then(() => res.send('entry deleted'))
		.catch(function (e: any) {
			res.status(404).send('Not found');
			console.log(e);
		});
};

// DEPENDENT
export function getAllDependent(req: Request, res: Response) {
	db
		.select('*')
		.from('SFAADMIN.DEPENDENT')
		.then((sql_res: any) => res.send(sql_res))
		.catch(function (e: any) {
			res.status(400).send('Not found');
			console.log(e);
		});
};

export function getDependent(req: Request, res: Response) {
	db
		.select('*')
		.from('SFAADMIN.DEPENDENT')
		.where({ DEPENDENT_ID: req.params.dependentId })
		.then((sql_res: any) => res.send(sql_res))
		.catch(function (e: any) {
			res.status(400).send('Not found');
			console.log(e);
		});
};

export function postDependent(req: Request, res: Response) {
	console.log(req.body);
	db
		.raw('SELECT max(DEPENDENT_ID) as DEPENDENT_ID FROM SFAADMIN.DEPENDENT')
		.then((sql_res: any) => {
			console.log(sql_res);
			req.body.DEPENDENT_ID = sql_res[0].DEPENDENT_ID + 1;
			console.log(req.body);
			db('SFAADMIN.DEPENDENT')
				.insert(req.body)
				.then(() => res.send('entry updated'))
				.catch(function (e: any) {
					res.status(400).send('Not found');
					console.log(e);
				});
		})
		.catch(function (e: any) {
			res.status(400).send('Not Found');
			console.log(e);
		});
};

export function putDependent(req: Request, res: Response) {
	db('SFAADMIN.DEPENDENT')
		.where({ DEPENDENT_ID: req.params.dependentId })
		.update(req.body)
		.then(() => res.send('entry updated'))
		.catch(function (e: any) {
			res.status(404).send('Not found');
			console.log(e);
		});
};

export function deleteDependent(req: Request, res: Response) {
	db
		.delete()
		.from('SFAADMIN.DEPENDENT')
		.where({ DEPENDENT_ID: req.params.dependentId })
		.then(() => res.send('entry deleted'))
		.catch(function (e: any) {
			res.status(404).send('Not found');
			console.log(e);
		});
};

// DEPENDENT_ELIGIBILITY
export function getAllDependentEligibility(req: Request, res: Response) {
	db
		.select('*')
		.from('SFAADMIN.DEPENDENT_ELIGIBILITY')
		.then((sql_res: any) => res.send(sql_res))
		.catch(function (e: any) {
			res.status(400).send('Not found');
			console.log(e);
		});
};

export function getDependentEligibility(req: Request, res: Response) {
	db
		.select('*')
		.from('SFAADMIN.DEPENDENT_ELIGIBILITY')
		.where({ DEPENDENT_ELIGIBILITY_ID: req.params.dependentEligibilityId })
		.then((sql_res: any) => res.send(sql_res))
		.catch(function (e: any) {
			res.status(400).send('Not found');
			console.log(e);
		});
};

export function postDependentEligibility(req: Request, res: Response) {
	console.log(req.body);
	db
		.raw(
			'SELECT max(DEPENDENT_ELIGIBILITY_ID) as DEPENDENT_ELIGIBILITY_ID FROM SFAADMIN.DEPENDENT_ELIGIBILITY'
		)
		.then((sql_res: any) => {
			console.log(sql_res);
			req.body.DEPENDENT_ELIGIBILITY_ID =
				sql_res[0].DEPENDENT_ELIGIBILITY_ID + 1;
			console.log(req.body);
			db('SFAADMIN.DEPENDENT_ELIGIBILITY')
				.insert(req.body)
				.then(() => res.send('entry updated'))
				.catch(function (e: any) {
					res.status(400).send('Not found');
					console.log(e);
				});
		})
		.catch(function (e: any) {
			res.status(400).send('Not Found');
			console.log(e);
		});
};

export function putDependentEligibility(req: Request, res: Response) {
	db('SFAADMIN.DEPENDENT_ELIGIBILITY')
		.where({ DEPENDENT_ELIGIBILITY_ID: req.params.dependentEligibilityId })
		.update(req.body)
		.then(() => res.send('entry updated'))
		.catch(function (e: any) {
			res.status(404).send('Not found');
			console.log(e);
		});
};

export function deleteDependentEligibility(req: Request, res: Response) {
	db
		.delete()
		.from('SFAADMIN.DEPENDENT_ELIGIBILITY')
		.where({ DEPENDENT_ELIGIBILITY_ID: req.params.dependentEligibilityId })
		.then(() => res.send('entry deleted'))
		.catch(function (e: any) {
			res.status(404).send('Not found');
			console.log(e);
		});
};

// DISAB_SERVICE_TYPE
export function getAllDisabServiceType(req: Request, res: Response) {
	db
		.select('*')
		.from('SFAADMIN.DISAB_SERVICE_TYPE')
		.then((sql_res: any) => res.send(sql_res))
		.catch(function (e: any) {
			res.status(400).send('Not found');
			console.log(e);
		});
};

export function getDisabServiceType(req: Request, res: Response) {
	db
		.select('*')
		.from('SFAADMIN.DISAB_SERVICE_TYPE')
		.where({ DISAB_SERVICE_TYPE_ID: req.params.disabServiceTypeId })
		.then((sql_res: any) => res.send(sql_res))
		.catch(function (e: any) {
			res.status(400).send('Not found');
			console.log(e);
		});
};

export function postDisabServiceType(req: Request, res: Response) {
	console.log(req.body);
	db
		.raw(
			'SELECT max(DISAB_SERVICE_TYPE_ID) as DISAB_SERVICE_TYPE_ID FROM SFAADMIN.DISAB_SERVICE_TYPE'
		)
		.then((sql_res: any) => {
			console.log(sql_res);
			req.body.DISAB_SERVICE_TYPE_ID = sql_res[0].DISAB_SERVICE_TYPE_ID + 1;
			console.log(req.body);
			db('SFAADMIN.DISAB_SERVICE_TYPE')
				.insert(req.body)
				.then(() => res.send('entry updated'))
				.catch(function (e: any) {
					res.status(400).send('Not found');
					console.log(e);
				});
		})
		.catch(function (e: any) {
			res.status(400).send('Not Found');
			console.log(e);
		});
};

export function putDisabServiceType(req: Request, res: Response) {
	db('SFAADMIN.DISAB_SERVICE_TYPE')
		.where({ DISAB_SERVICE_TYPE_ID: req.params.disabServiceTypeId })
		.update(req.body)
		.then(() => res.send('entry updated'))
		.catch(function (e: any) {
			res.status(404).send('Not found');
			console.log(e);
		});
};

export function deleteDisabServiceType(req: Request, res: Response) {
	db
		.delete()
		.from('SFAADMIN.DISAB_SERVICE_TYPE')
		.where({ DISAB_SERVICE_TYPE_ID: req.params.disabServiceTypeId })
		.then(() => res.send('entry deleted'))
		.catch(function (e: any) {
			res.status(404).send('Not found');
			console.log(e);
		});
};

// DISABILITY
export function getAllDisability(req: Request, res: Response) {
	db
		.select('*')
		.from('SFAADMIN.DISABILITY')
		.then((sql_res: any) => res.send(sql_res))
		.catch(function (e: any) {
			res.status(400).send('Not found');
			console.log(e);
		});
};

export function getDisability(req: Request, res: Response) {
	db
		.select('*')
		.from('SFAADMIN.DISABILITY')
		.where({ DISABILITY_ID: req.params.disabilityId })
		.then((sql_res: any) => res.send(sql_res))
		.catch(function (e: any) {
			res.status(400).send('Not found');
			console.log(e);
		});
};

export function postDisability(req: Request, res: Response) {
	console.log(req.body);
	db
		.raw('SELECT max(DISABILITY_ID) as DISABILITY_ID FROM SFAADMIN.DISABILITY')
		.then((sql_res: any) => {
			console.log(sql_res);
			req.body.DISABILITY_ID = sql_res[0].DISABILITY_ID + 1;
			console.log(req.body);
			db('SFAADMIN.DISABILITY')
				.insert(req.body)
				.then(() => res.send('entry updated'))
				.catch(function (e: any) {
					res.status(400).send('Not found');
					console.log(e);
				});
		})
		.catch(function (e: any) {
			res.status(400).send('Not Found');
			console.log(e);
		});
};

export function putDisability(req: Request, res: Response) {
	db('SFAADMIN.DISABILITY')
		.where({ DISABILITY_ID: req.params.disabilityId })
		.update(req.body)
		.then(() => res.send('entry updated'))
		.catch(function (e: any) {
			res.status(404).send('Not found');
			console.log(e);
		});
};

export function deleteDisability(req: Request, res: Response) {
	db
		.delete()
		.from('SFAADMIN.DISABILITY')
		.where({ DISABILITY_ID: req.params.disabilityId })
		.then(() => res.send('entry deleted'))
		.catch(function (e: any) {
			res.status(404).send('Not found');
			console.log(e);
		});
};

// DISABILITY_REQUIREMENT
export function getAllDisabilityRequirement(req: Request, res: Response) {
	db
		.select('*')
		.from('SFAADMIN.DISABILITY_REQUIREMENT')
		.then((sql_res: any) => res.send(sql_res))
		.catch(function (e: any) {
			res.status(400).send('Not found');
			console.log(e);
		});
};

export function getDisabilityRequirement(req: Request, res: Response) {
	db
		.select('*')
		.from('SFAADMIN.DISABILITY_REQUIREMENT')
		.where({ DISABILITY_REQUIREMENT_ID: req.params.disabilityRequirementId })
		.then((sql_res: any) => res.send(sql_res))
		.catch(function (e: any) {
			res.status(400).send('Not found');
			console.log(e);
		});
};

export function postDisabilityRequirement(req: Request, res: Response) {
	console.log(req.body);
	db
		.raw(
			'SELECT max(DISABILITY_REQUIREMENT_ID) as DISABILITY_REQUIREMENT_ID FROM SFAADMIN.DISABILITY_REQUIREMENT'
		)
		.then((sql_res: any) => {
			console.log(sql_res);
			req.body.DISABILITY_REQUIREMENT_ID =
				sql_res[0].DISABILITY_REQUIREMENT_ID + 1;
			console.log(req.body);
			db('SFAADMIN.DISABILITY_REQUIREMENT')
				.insert(req.body)
				.then(() => res.send('entry updated'))
				.catch(function (e: any) {
					res.status(400).send('Not found');
					console.log(e);
				});
		})
		.catch(function (e: any) {
			res.status(400).send('Not Found');
			console.log(e);
		});
};

export function putDisabilityRequirement(req: Request, res: Response) {
	db('SFAADMIN.DISABILITY_REQUIREMENT')
		.where({ DISABILITY_REQUIREMENT_ID: req.params.disabilityRequirementId })
		.update(req.body)
		.then(() => res.send('entry updated'))
		.catch(function (e: any) {
			res.status(404).send('Not found');
			console.log(e);
		});
};

export function deleteDisabilityRequirement(req: Request, res: Response) {
	db
		.delete()
		.from('SFAADMIN.DISABILITY_REQUIREMENT')
		.where({ DISABILITY_REQUIREMENT_ID: req.params.disabilityRequirementId })
		.then(() => res.send('entry deleted'))
		.catch(function (e: any) {
			res.status(404).send('Not found');
			console.log(e);
		});
};

// DISABILITY_TYPE
export function getAllDisabilityType(req: Request, res: Response) {
	db
		.select('*')
		.from('SFAADMIN.DISABILITY_TYPE')
		.then((sql_res: any) => res.send(sql_res))
		.catch(function (e: any) {
			res.status(400).send('Not found');
			console.log(e);
		});
};

export function getDisabilityType(req: Request, res: Response) {
	db
		.select('*')
		.from('SFAADMIN.DISABILITY_TYPE')
		.where({ DISABILITY_TYPE_ID: req.params.disabilityTypeId })
		.then((sql_res: any) => res.send(sql_res))
		.catch(function (e: any) {
			res.status(400).send('Not found');
			console.log(e);
		});
};

export function postDisabilityType(req: Request, res: Response) {
	console.log(req.body);
	db
		.raw(
			'SELECT max(DISABILITY_TYPE_ID) as DISABILITY_TYPE_ID FROM SFAADMIN.DISABILITY_TYPE'
		)
		.then((sql_res: any) => {
			console.log(sql_res);
			req.body.DISABILITY_TYPE_ID = sql_res[0].DISABILITY_TYPE_ID + 1;
			console.log(req.body);
			db('SFAADMIN.DISABILITY_TYPE')
				.insert(req.body)
				.then(() => res.send('entry updated'))
				.catch(function (e: any) {
					res.status(400).send('Not found');
					console.log(e);
				});
		})
		.catch(function (e: any) {
			res.status(400).send('Not Found');
			console.log(e);
		});
};

export function putDisabilityType(req: Request, res: Response) {
	db('SFAADMIN.DISABILITY_TYPE')
		.where({ DISABILITY_TYPE_ID: req.params.disabilityTypeId })
		.update(req.body)
		.then(() => res.send('entry updated'))
		.catch(function (e: any) {
			res.status(404).send('Not found');
			console.log(e);
		});
};

export function deleteDisabilityType(req: Request, res: Response) {
	db
		.delete()
		.from('SFAADMIN.DISABILITY_TYPE')
		.where({ DISABILITY_TYPE_ID: req.params.disabilityTypeId })
		.then(() => res.send('entry deleted'))
		.catch(function (e: any) {
			res.status(404).send('Not found');
			console.log(e);
		});
};

// DISBURSEMENT
export function getAllDisbursement(req: Request, res: Response) {
	db
		.select('*')
		.from('SFAADMIN.DISBURSEMENT')
		.then((sql_res: any) => res.send(sql_res))
		.catch(function (e: any) {
			res.status(400).send('Not found');
			console.log(e);
		});
};

export function getDisbursement(req: Request, res: Response) {
	db
		.select('*')
		.from('SFAADMIN.DISBURSEMENT')
		.where({ DISBURSEMENT_ID: req.params.disbursementId })
		.then((sql_res: any) => res.send(sql_res))
		.catch(function (e: any) {
			res.status(400).send('Not found');
			console.log(e);
		});
};

export function postDisbursement(req: Request, res: Response) {
	console.log(req.body);
	db
		.raw(
			'SELECT max(DISBURSEMENT_ID) as DISBURSEMENT_ID FROM SFAADMIN.DISBURSEMENT'
		)
		.then((sql_res: any) => {
			console.log(sql_res);
			req.body.DISBURSEMENT_ID = sql_res[0].DISBURSEMENT_ID + 1;
			console.log(req.body);
			db('SFAADMIN.DISBURSEMENT')
				.insert(req.body)
				.then(() => res.send('entry updated'))
				.catch(function (e: any) {
					res.status(400).send('Not found');
					console.log(e);
				});
		})
		.catch(function (e: any) {
			res.status(400).send('Not Found');
			console.log(e);
		});
};

export function putDisbursement(req: Request, res: Response) {
	db('SFAADMIN.DISBURSEMENT')
		.where({ DISBURSEMENT_ID: req.params.disbursementId })
		.update(req.body)
		.then(() => res.send('entry updated'))
		.catch(function (e: any) {
			res.status(404).send('Not found');
			console.log(e);
		});
};

export function deleteDisbursement(req: Request, res: Response) {
	db
		.delete()
		.from('SFAADMIN.DISBURSEMENT')
		.where({ DISBURSEMENT_ID: req.params.disbursementId })
		.then(() => res.send('entry deleted'))
		.catch(function (e: any) {
			res.status(404).send('Not found');
			console.log(e);
		});
};

// DISBURSEMENT_TYPE
export function getAllDisbursementType(req: Request, res: Response) {
	db
		.select('*')
		.from('SFAADMIN.DISBURSEMENT_TYPE')
		.then((sql_res: any) => res.send(sql_res))
		.catch(function (e: any) {
			res.status(400).send('Not found');
			console.log(e);
		});
};

export function getDisbursementType(req: Request, res: Response) {
	db
		.select('*')
		.from('SFAADMIN.DISBURSEMENT_TYPE')
		.where({ DISBURSEMENT_TYPE_ID: req.params.disbursementTypeId })
		.then((sql_res: any) => res.send(sql_res))
		.catch(function (e: any) {
			res.status(400).send('Not found');
			console.log(e);
		});
};

export function postDisbursementType(req: Request, res: Response) {
	console.log(req.body);
	db
		.raw(
			'SELECT max(DISBURSEMENT_TYPE_ID) as DISBURSEMENT_TYPE_ID FROM SFAADMIN.DISBURSEMENT_TYPE'
		)
		.then((sql_res: any) => {
			console.log(sql_res);
			req.body.DISBURSEMENT_TYPE_ID = sql_res[0].DISBURSEMENT_TYPE_ID + 1;
			console.log(req.body);
			db('SFAADMIN.DISBURSEMENT_TYPE')
				.insert(req.body)
				.then(() => res.send('entry updated'))
				.catch(function (e: any) {
					res.status(400).send('Not found');
					console.log(e);
				});
		})
		.catch(function (e: any) {
			res.status(400).send('Not Found');
			console.log(e);
		});
};

export function putDisbursementType(req: Request, res: Response) {
	db('SFAADMIN.DISBURSEMENT_TYPE')
		.where({ DISBURSEMENT_TYPE_ID: req.params.disbursementTypeId })
		.update(req.body)
		.then(() => res.send('entry updated'))
		.catch(function (e: any) {
			res.status(404).send('Not found');
			console.log(e);
		});
};

export function deleteDisbursementType(req: Request, res: Response) {
	db
		.delete()
		.from('SFAADMIN.DISBURSEMENT_TYPE')
		.where({ DISBURSEMENT_TYPE_ID: req.params.disbursementTypeId })
		.then(() => res.send('entry deleted'))
		.catch(function (e: any) {
			res.status(404).send('Not found');
			console.log(e);
		});
};

// ECERT_IMPORT
export function getAllEcertImport(req: Request, res: Response) {
	db
		.select('*')
		.from('SFAADMIN.ECERT_IMPORT')
		.then((sql_res: any) => res.send(sql_res))
		.catch(function (e: any) {
			res.status(400).send('Not found');
			console.log(e);
		});
};

export function getEcertImport(req: Request, res: Response) {
	db
		.select('*')
		.from('SFAADMIN.ECERT_IMPORT')
		.where({ SEQUENCE_NUMBER: req.params.sequenceNumber })
		.then((sql_res: any) => res.send(sql_res))
		.catch(function (e: any) {
			res.status(400).send('Not found');
			console.log(e);
		});
};

export function postEcertImport(req: Request, res: Response) {
	console.log(req.body);
	db
		.raw(
			'SELECT max(SEQUENCE_NUMBER) as SEQUENCE_NUMBER FROM SFAADMIN.ECERT_IMPORT'
		)
		.then((sql_res: any) => {
			console.log(sql_res);
			req.body.SEQUENCE_NUMBER = sql_res[0].SEQUENCE_NUMBER + 1;
			console.log(req.body);
			db('SFAADMIN.ECERT_IMPORT')
				.insert(req.body)
				.then(() => res.send('entry updated'))
				.catch(function (e: any) {
					res.status(400).send('Not found');
					console.log(e);
				});
		})
		.catch(function (e: any) {
			res.status(400).send('Not Found');
			console.log(e);
		});
};

export function putEcertImport(req: Request, res: Response) {
	db('SFAADMIN.ECERT_IMPORT')
		.where({ SEQUENCE_NUMBER: req.params.sequenceNumber })
		.update(req.body)
		.then(() => res.send('entry updated'))
		.catch(function (e: any) {
			res.status(404).send('Not found');
			console.log(e);
		});
};

export function deleteEcertImport(req: Request, res: Response) {
	db
		.delete()
		.from('SFAADMIN.ECERT_IMPORT')
		.where({ SEQUENCE_NUMBER: req.params.sequenceNumber })
		.then(() => res.send('entry deleted'))
		.catch(function (e: any) {
			res.status(404).send('Not found');
			console.log(e);
		});
};

// EDUCATION
export function getAllEducation(req: Request, res: Response) {
	db
		.select('*')
		.from('SFAADMIN.EDUCATION')
		.then((sql_res: any) => res.send(sql_res))
		.catch(function (e: any) {
			res.status(400).send('Not found');
			console.log(e);
		});
};

export function getEducation(req: Request, res: Response) {
	db
		.select('*')
		.from('SFAADMIN.EDUCATION')
		.where({ EDUCATION_ID: req.params.educationId })
		.then((sql_res: any) => res.send(sql_res))
		.catch(function (e: any) {
			res.status(400).send('Not found');
			console.log(e);
		});
};

export function postEducation(req: Request, res: Response) {
	console.log(req.body);
	db
		.raw('SELECT max(EDUCATION_ID) as EDUCATION_ID FROM SFAADMIN.EDUCATION')
		.then((sql_res: any) => {
			console.log(sql_res);
			req.body.EDUCATION_ID = sql_res[0].EDUCATION_ID + 1;
			console.log(req.body);
			db('SFAADMIN.EDUCATION')
				.insert(req.body)
				.then(() => res.send('entry updated'))
				.catch(function (e: any) {
					res.status(400).send('Not found');
					console.log(e);
				});
		})
		.catch(function (e: any) {
			res.status(400).send('Not Found');
			console.log(e);
		});
};

export function putEducation(req: Request, res: Response) {
	db('SFAADMIN.EDUCATION')
		.where({ EDUCATION_ID: req.params.educationId })
		.update(req.body)
		.then(() => res.send('entry updated'))
		.catch(function (e: any) {
			res.status(404).send('Not found');
			console.log(e);
		});
};

export function deleteEducation(req: Request, res: Response) {
	db
		.delete()
		.from('SFAADMIN.EDUCATION')
		.where({ EDUCATION_ID: req.params.educationId })
		.then(() => res.send('entry deleted'))
		.catch(function (e: any) {
			res.status(404).send('Not found');
			console.log(e);
		});
};

// EDUCATION_LEVEL
export function getAllEducationLevel(req: Request, res: Response) {
	db
		.select('*')
		.from('SFAADMIN.EDUCATION_LEVEL')
		.then((sql_res: any) => res.send(sql_res))
		.catch(function (e: any) {
			res.status(400).send('Not found');
			console.log(e);
		});
};

export function getEducationLevel(req: Request, res: Response) {
	db
		.select('*')
		.from('SFAADMIN.EDUCATION_LEVEL')
		.where({ EDUCATION_LEVEL_ID: req.params.educationLevelId })
		.then((sql_res: any) => res.send(sql_res))
		.catch(function (e: any) {
			res.status(400).send('Not found');
			console.log(e);
		});
};

export function postEducationLevel(req: Request, res: Response) {
	console.log(req.body);
	db
		.raw(
			'SELECT max(EDUCATION_LEVEL_ID) as EDUCATION_LEVEL_ID FROM SFAADMIN.EDUCATION_LEVEL'
		)
		.then((sql_res: any) => {
			console.log(sql_res);
			req.body.EDUCATION_LEVEL_ID = sql_res[0].EDUCATION_LEVEL_ID + 1;
			console.log(req.body);
			db('SFAADMIN.EDUCATION_LEVEL')
				.insert(req.body)
				.then(() => res.send('entry updated'))
				.catch(function (e: any) {
					res.status(400).send('Not found');
					console.log(e);
				});
		})
		.catch(function (e: any) {
			res.status(400).send('Not Found');
			console.log(e);
		});
};

export function putEducationLevel(req: Request, res: Response) {
	db('SFAADMIN.EDUCATION_LEVEL')
		.where({ EDUCATION_LEVEL_ID: req.params.educationLevelId })
		.update(req.body)
		.then(() => res.send('entry updated'))
		.catch(function (e: any) {
			res.status(404).send('Not found');
			console.log(e);
		});
};

export function deleteEducationLevel(req: Request, res: Response) {
	db
		.delete()
		.from('SFAADMIN.EDUCATION_LEVEL')
		.where({ EDUCATION_LEVEL_ID: req.params.educationLevelId })
		.then(() => res.send('entry deleted'))
		.catch(function (e: any) {
			res.status(404).send('Not found');
			console.log(e);
		});
};

// ENTITLEMENT_ERROR
export function getAllEntitlementError(req: Request, res: Response) {
	db
		.select('*')
		.from('SFAADMIN.ENTITLEMENT_ERROR')
		.then((sql_res: any) => res.send(sql_res))
		.catch(function (e: any) {
			res.status(400).send('Not found');
			console.log(e);
		});
};

export function getEntitlementError(req: Request, res: Response) {
	db
		.select('*')
		.from('SFAADMIN.ENTITLEMENT_ERROR')
		.where({ ENTITLEMENT_ERROR_ID: req.params.entitlementErrorId })
		.then((sql_res: any) => res.send(sql_res))
		.catch(function (e: any) {
			res.status(400).send('Not found');
			console.log(e);
		});
};

export function postEntitlementError(req: Request, res: Response) {
	console.log(req.body);
	db
		.raw(
			'SELECT max(ENTITLEMENT_ERROR_ID) as ENTITLEMENT_ERROR_ID FROM SFAADMIN.ENTITLEMENT_ERROR'
		)
		.then((sql_res: any) => {
			console.log(sql_res);
			req.body.ENTITLEMENT_ERROR_ID = sql_res[0].ENTITLEMENT_ERROR_ID + 1;
			console.log(req.body);
			db('SFAADMIN.ENTITLEMENT_ERROR')
				.insert(req.body)
				.then(() => res.send('entry updated'))
				.catch(function (e: any) {
					res.status(400).send('Not found');
					console.log(e);
				});
		})
		.catch(function (e: any) {
			res.status(400).send('Not Found');
			console.log(e);
		});
};

export function putEntitlementError(req: Request, res: Response) {
	db('SFAADMIN.ENTITLEMENT_ERROR')
		.where({ ENTITLEMENT_ERROR_ID: req.params.entitlementErrorId })
		.update(req.body)
		.then(() => res.send('entry updated'))
		.catch(function (e: any) {
			res.status(404).send('Not found');
			console.log(e);
		});
};

export function deleteEntitlementError(req: Request, res: Response) {
	db
		.delete()
		.from('SFAADMIN.ENTITLEMENT_ERROR')
		.where({ ENTITLEMENT_ERROR_ID: req.params.entitlementErrorId })
		.then(() => res.send('entry deleted'))
		.catch(function (e: any) {
			res.status(404).send('Not found');
			console.log(e);
		});
};

// ENTITLEMENT_ERROR_CODES
export function getAllEntitlementErrorCodes(req: Request, res: Response) {
	db
		.select('*')
		.from('SFAADMIN.ENTITLEMENT_ERROR_CODES')
		.then((sql_res: any) => res.send(sql_res))
		.catch(function (e: any) {
			res.status(400).send('Not found');
			console.log(e);
		});
};

export function getEntitlementErrorCodes(req: Request, res: Response) {
	db
		.select('*')
		.from('SFAADMIN.ENTITLEMENT_ERROR_CODES')
		.where({ ERROR_CODE: req.params.errorCode })
		.then((sql_res: any) => res.send(sql_res))
		.catch(function (e: any) {
			res.status(400).send('Not found');
			console.log(e);
		});
};

export function postEntitlementErrorCodes(req: Request, res: Response) {
	console.log(req.body);
	db
		.raw(
			'SELECT max(ERROR_CODE) as ERROR_CODE FROM SFAADMIN.ENTITLEMENT_ERROR_CODES'
		)
		.then((sql_res: any) => {
			console.log(sql_res);
			req.body.ERROR_CODE = sql_res[0].ERROR_CODE + 1;
			console.log(req.body);
			db('SFAADMIN.ENTITLEMENT_ERROR_CODES')
				.insert(req.body)
				.then(() => res.send('entry updated'))
				.catch(function (e: any) {
					res.status(400).send('Not found');
					console.log(e);
				});
		})
		.catch(function (e: any) {
			res.status(400).send('Not Found');
			console.log(e);
		});
};

export function putEntitlementErrorCodes(req: Request, res: Response) {
	db('SFAADMIN.ENTITLEMENT_ERROR_CODES')
		.where({ ERROR_CODE: req.params.errorCode })
		.update(req.body)
		.then(() => res.send('entry updated'))
		.catch(function (e: any) {
			res.status(404).send('Not found');
			console.log(e);
		});
};

export function deleteEntitlementErrorCodes(req: Request, res: Response) {
	db
		.delete()
		.from('SFAADMIN.ENTITLEMENT_ERROR_CODES')
		.where({ ERROR_CODE: req.params.errorCode })
		.then(() => res.send('entry deleted'))
		.catch(function (e: any) {
			res.status(404).send('Not found');
			console.log(e);
		});
};

// EXPENSE
export function getAllExpense(req: Request, res: Response) {
	db
		.select('*')
		.from('SFAADMIN.EXPENSE')
		.then((sql_res: any) => res.send(sql_res))
		.catch(function (e: any) {
			res.status(400).send('Not found');
			console.log(e);
		});
};

export function getExpense(req: Request, res: Response) {
	db
		.select('*')
		.from('SFAADMIN.EXPENSE')
		.where({ EXPENSE_ID: req.params.expenseId })
		.then((sql_res: any) => res.send(sql_res))
		.catch(function (e: any) {
			res.status(400).send('Not found');
			console.log(e);
		});
};

export function postExpense(req: Request, res: Response) {
	console.log(req.body);
	db
		.raw('SELECT max(EXPENSE_ID) as EXPENSE_ID FROM SFAADMIN.EXPENSE')
		.then((sql_res: any) => {
			console.log(sql_res);
			req.body.EXPENSE_ID = sql_res[0].EXPENSE_ID + 1;
			console.log(req.body);
			db('SFAADMIN.EXPENSE')
				.insert(req.body)
				.then(() => res.send('entry updated'))
				.catch(function (e: any) {
					res.status(400).send('Not found');
					console.log(e);
				});
		})
		.catch(function (e: any) {
			res.status(400).send('Not Found');
			console.log(e);
		});
};

export function putExpense(req: Request, res: Response) {
	db('SFAADMIN.EXPENSE')
		.where({ EXPENSE_ID: req.params.expenseId })
		.update(req.body)
		.then(() => res.send('entry updated'))
		.catch(function (e: any) {
			res.status(404).send('Not found');
			console.log(e);
		});
};

export function deleteExpense(req: Request, res: Response) {
	db
		.delete()
		.from('SFAADMIN.EXPENSE')
		.where({ EXPENSE_ID: req.params.expenseId })
		.then(() => res.send('entry deleted'))
		.catch(function (e: any) {
			res.status(404).send('Not found');
			console.log(e);
		});
};

// EXPENSE_CATEGORY
export function getAllExpenseCategory(req: Request, res: Response) {
	db
		.select('*')
		.from('SFAADMIN.EXPENSE_CATEGORY')
		.then((sql_res: any) => res.send(sql_res))
		.catch(function (e: any) {
			res.status(400).send('Not found');
			console.log(e);
		});
};

export function getExpenseCategory(req: Request, res: Response) {
	db
		.select('*')
		.from('SFAADMIN.EXPENSE_CATEGORY')
		.where({ EXPENSE_CATEGORY_ID: req.params.expenseCategoryId })
		.then((sql_res: any) => res.send(sql_res))
		.catch(function (e: any) {
			res.status(400).send('Not found');
			console.log(e);
		});
};

export function postExpenseCategory(req: Request, res: Response) {
	console.log(req.body);
	db
		.raw(
			'SELECT max(EXPENSE_CATEGORY_ID) as EXPENSE_CATEGORY_ID FROM SFAADMIN.EXPENSE_CATEGORY'
		)
		.then((sql_res: any) => {
			console.log(sql_res);
			req.body.EXPENSE_CATEGORY_ID = sql_res[0].EXPENSE_CATEGORY_ID + 1;
			console.log(req.body);
			db('SFAADMIN.EXPENSE_CATEGORY')
				.insert(req.body)
				.then(() => res.send('entry updated'))
				.catch(function (e: any) {
					res.status(400).send('Not found');
					console.log(e);
				});
		})
		.catch(function (e: any) {
			res.status(400).send('Not Found');
			console.log(e);
		});
};

export function putExpenseCategory(req: Request, res: Response) {
	db('SFAADMIN.EXPENSE_CATEGORY')
		.where({ EXPENSE_CATEGORY_ID: req.params.expenseCategoryId })
		.update(req.body)
		.then(() => res.send('entry updated'))
		.catch(function (e: any) {
			res.status(404).send('Not found');
			console.log(e);
		});
};

export function deleteExpenseCategory(req: Request, res: Response) {
	db
		.delete()
		.from('SFAADMIN.EXPENSE_CATEGORY')
		.where({ EXPENSE_CATEGORY_ID: req.params.expenseCategoryId })
		.then(() => res.send('entry deleted'))
		.catch(function (e: any) {
			res.status(404).send('Not found');
			console.log(e);
		});
};

// EXTERNAL_YEA
export function getAllExternalYea(req: Request, res: Response) {
	db
		.select('*')
		.from('SFAADMIN.EXTERNAL_YEA')
		.then((sql_res: any) => res.send(sql_res))
		.catch(function (e: any) {
			res.status(400).send('Not found');
			console.log(e);
		});
};

export function getExternalYea(req: Request, res: Response) {
	db
		.select('*')
		.from('SFAADMIN.EXTERNAL_YEA')
		.where({ FNAME: req.params.fname })
		.then((sql_res: any) => res.send(sql_res))
		.catch(function (e: any) {
			res.status(400).send('Not found');
			console.log(e);
		});
};

export function postExternalYea(req: Request, res: Response) {
	console.log(req.body);
	db
		.raw('SELECT max(FNAME) as FNAME FROM SFAADMIN.EXTERNAL_YEA')
		.then((sql_res: any) => {
			console.log(sql_res);
			req.body.FNAME = sql_res[0].FNAME + 1;
			console.log(req.body);
			db('SFAADMIN.EXTERNAL_YEA')
				.insert(req.body)
				.then(() => res.send('entry updated'))
				.catch(function (e: any) {
					res.status(400).send('Not found');
					console.log(e);
				});
		})
		.catch(function (e: any) {
			res.status(400).send('Not Found');
			console.log(e);
		});
};

export function putExternalYea(req: Request, res: Response) {
	db('SFAADMIN.EXTERNAL_YEA')
		.where({ FNAME: req.params.fname })
		.update(req.body)
		.then(() => res.send('entry updated'))
		.catch(function (e: any) {
			res.status(404).send('Not found');
			console.log(e);
		});
};

export function deleteExternalYea(req: Request, res: Response) {
	db
		.delete()
		.from('SFAADMIN.EXTERNAL_YEA')
		.where({ FNAME: req.params.fname })
		.then(() => res.send('entry deleted'))
		.catch(function (e: any) {
			res.status(404).send('Not found');
			console.log(e);
		});
};

// FIELD_PROGRAM
export function getAllFieldProgram(req: Request, res: Response) {
	db
		.select('*')
		.from('SFAADMIN.FIELD_PROGRAM')
		.then((sql_res: any) => res.send(sql_res))
		.catch(function (e: any) {
			res.status(400).send('Not found');
			console.log(e);
		});
};

export function getFieldProgram(req: Request, res: Response) {
	db
		.select('*')
		.from('SFAADMIN.FIELD_PROGRAM')
		.where({ STUDY_FIELD_ID: req.params.studyFieldId })
		.then((sql_res: any) => res.send(sql_res))
		.catch(function (e: any) {
			res.status(400).send('Not found');
			console.log(e);
		});
};

export function postFieldProgram(req: Request, res: Response) {
	console.log(req.body);
	db
		.raw(
			'SELECT max(STUDY_FIELD_ID) as STUDY_FIELD_ID FROM SFAADMIN.FIELD_PROGRAM'
		)
		.then((sql_res: any) => {
			console.log(sql_res);
			req.body.STUDY_FIELD_ID = sql_res[0].STUDY_FIELD_ID + 1;
			console.log(req.body);
			db('SFAADMIN.FIELD_PROGRAM')
				.insert(req.body)
				.then(() => res.send('entry updated'))
				.catch(function (e: any) {
					res.status(400).send('Not found');
					console.log(e);
				});
		})
		.catch(function (e: any) {
			res.status(400).send('Not Found');
			console.log(e);
		});
};

export function putFieldProgram(req: Request, res: Response) {
	db('SFAADMIN.FIELD_PROGRAM')
		.where({ STUDY_FIELD_ID: req.params.studyFieldId })
		.update(req.body)
		.then(() => res.send('entry updated'))
		.catch(function (e: any) {
			res.status(404).send('Not found');
			console.log(e);
		});
};

export function deleteFieldProgram(req: Request, res: Response) {
	db
		.delete()
		.from('SFAADMIN.FIELD_PROGRAM')
		.where({ STUDY_FIELD_ID: req.params.studyFieldId })
		.then(() => res.send('entry deleted'))
		.catch(function (e: any) {
			res.status(404).send('Not found');
			console.log(e);
		});
};

// FIRST_NATION
export function getAllFirstNation(req: Request, res: Response) {
	db
		.select('*')
		.from('SFAADMIN.FIRST_NATION')
		.then((sql_res: any) => res.send(sql_res))
		.catch(function (e: any) {
			res.status(400).send('Not found');
			console.log(e);
		});
};

export function getFirstNation(req: Request, res: Response) {
	db
		.select('*')
		.from('SFAADMIN.FIRST_NATION')
		.where({ FIRST_NATION_ID: req.params.firstNationId })
		.then((sql_res: any) => res.send(sql_res))
		.catch(function (e: any) {
			res.status(400).send('Not found');
			console.log(e);
		});
};

export function postFirstNation(req: Request, res: Response) {
	console.log(req.body);
	db
		.raw(
			'SELECT max(FIRST_NATION_ID) as FIRST_NATION_ID FROM SFAADMIN.FIRST_NATION'
		)
		.then((sql_res: any) => {
			console.log(sql_res);
			req.body.FIRST_NATION_ID = sql_res[0].FIRST_NATION_ID + 1;
			console.log(req.body);
			db('SFAADMIN.FIRST_NATION')
				.insert(req.body)
				.then(() => res.send('entry updated'))
				.catch(function (e: any) {
					res.status(400).send('Not found');
					console.log(e);
				});
		})
		.catch(function (e: any) {
			res.status(400).send('Not Found');
			console.log(e);
		});
};

export function putFirstNation(req: Request, res: Response) {
	db('SFAADMIN.FIRST_NATION')
		.where({ FIRST_NATION_ID: req.params.firstNationId })
		.update(req.body)
		.then(() => res.send('entry updated'))
		.catch(function (e: any) {
			res.status(404).send('Not found');
			console.log(e);
		});
};

export function deleteFirstNation(req: Request, res: Response) {
	db
		.delete()
		.from('SFAADMIN.FIRST_NATION')
		.where({ FIRST_NATION_ID: req.params.firstNationId })
		.then(() => res.send('entry deleted'))
		.catch(function (e: any) {
			res.status(404).send('Not found');
			console.log(e);
		});
};

// FUNDING_GROUP
export function getAllFundingGroup(req: Request, res: Response) {
	db
		.select('*')
		.from('SFAADMIN.FUNDING_GROUP')
		.then((sql_res: any) => res.send(sql_res))
		.catch(function (e: any) {
			res.status(400).send('Not found');
			console.log(e);
		});
};

export function getFundingGroup(req: Request, res: Response) {
	db
		.select('*')
		.from('SFAADMIN.FUNDING_GROUP')
		.where({ FUNDING_GROUP_ID: req.params.fundingGroupId })
		.then((sql_res: any) => res.send(sql_res))
		.catch(function (e: any) {
			res.status(400).send('Not found');
			console.log(e);
		});
};

export function postFundingGroup(req: Request, res: Response) {
	console.log(req.body);
	db
		.raw(
			'SELECT max(FUNDING_GROUP_ID) as FUNDING_GROUP_ID FROM SFAADMIN.FUNDING_GROUP'
		)
		.then((sql_res: any) => {
			console.log(sql_res);
			req.body.FUNDING_GROUP_ID = sql_res[0].FUNDING_GROUP_ID + 1;
			console.log(req.body);
			db('SFAADMIN.FUNDING_GROUP')
				.insert(req.body)
				.then(() => res.send('entry updated'))
				.catch(function (e: any) {
					res.status(400).send('Not found');
					console.log(e);
				});
		})
		.catch(function (e: any) {
			res.status(400).send('Not Found');
			console.log(e);
		});
};

export function putFundingGroup(req: Request, res: Response) {
	db('SFAADMIN.FUNDING_GROUP')
		.where({ FUNDING_GROUP_ID: req.params.fundingGroupId })
		.update(req.body)
		.then(() => res.send('entry updated'))
		.catch(function (e: any) {
			res.status(404).send('Not found');
			console.log(e);
		});
};

export function deleteFundingGroup(req: Request, res: Response) {
	db
		.delete()
		.from('SFAADMIN.FUNDING_GROUP')
		.where({ FUNDING_GROUP_ID: req.params.fundingGroupId })
		.then(() => res.send('entry deleted'))
		.catch(function (e: any) {
			res.status(404).send('Not found');
			console.log(e);
		});
};

// FUNDING_REQUEST
export function getAllFundingRequest(req: Request, res: Response) {
	db
		.select('*')
		.from('SFAADMIN.FUNDING_REQUEST')
		.then((sql_res: any) => res.send(sql_res))
		.catch(function (e: any) {
			res.status(400).send('Not found');
			console.log(e);
		});
};

export function getFundingRequest(req: Request, res: Response) {
	db
		.select('*')
		.from('SFAADMIN.FUNDING_REQUEST')
		.where({ FUNDING_REQUEST_ID: req.params.fundingRequestId })
		.then((sql_res: any) => res.send(sql_res))
		.catch(function (e: any) {
			res.status(400).send('Not found');
			console.log(e);
		});
};

export function postFundingRequest(req: Request, res: Response) {
	console.log(req.body);
	db
		.raw(
			'SELECT max(FUNDING_REQUEST_ID) as FUNDING_REQUEST_ID FROM SFAADMIN.FUNDING_REQUEST'
		)
		.then((sql_res: any) => {
			console.log(sql_res);
			req.body.FUNDING_REQUEST_ID = sql_res[0].FUNDING_REQUEST_ID + 1;
			console.log(req.body);
			db('SFAADMIN.FUNDING_REQUEST')
				.insert(req.body)
				.then(() => res.send('entry updated'))
				.catch(function (e: any) {
					res.status(400).send('Not found');
					console.log(e);
				});
		})
		.catch(function (e: any) {
			res.status(400).send('Not Found');
			console.log(e);
		});
};

export function putFundingRequest(req: Request, res: Response) {
	db('SFAADMIN.FUNDING_REQUEST')
		.where({ FUNDING_REQUEST_ID: req.params.fundingRequestId })
		.update(req.body)
		.then(() => res.send('entry updated'))
		.catch(function (e: any) {
			res.status(404).send('Not found');
			console.log(e);
		});
};

export function deleteFundingRequest(req: Request, res: Response) {
	db
		.delete()
		.from('SFAADMIN.FUNDING_REQUEST')
		.where({ FUNDING_REQUEST_ID: req.params.fundingRequestId })
		.then(() => res.send('entry deleted'))
		.catch(function (e: any) {
			res.status(404).send('Not found');
			console.log(e);
		});
};

// HIDE_PART_TIME_REASON
export function getAllHidePartTimeReason(req: Request, res: Response) {
	db
		.select('*')
		.from('SFAADMIN.HIDE_PART_TIME_REASON')
		.then((sql_res: any) => res.send(sql_res))
		.catch(function (e: any) {
			res.status(400).send('Not found');
			console.log(e);
		});
};

export function getHidePartTimeReason(req: Request, res: Response) {
	db
		.select('*')
		.from('SFAADMIN.HIDE_PART_TIME_REASON')
		.where({ HISTORY_DETAIL_ID: req.params.historyDetailId })
		.then((sql_res: any) => res.send(sql_res))
		.catch(function (e: any) {
			res.status(400).send('Not found');
			console.log(e);
		});
};

export function postHidePartTimeReason(req: Request, res: Response) {
	console.log(req.body);
	db
		.raw(
			'SELECT max(HISTORY_DETAIL_ID) as HISTORY_DETAIL_ID FROM SFAADMIN.HIDE_PART_TIME_REASON'
		)
		.then((sql_res: any) => {
			console.log(sql_res);
			req.body.HISTORY_DETAIL_ID = sql_res[0].HISTORY_DETAIL_ID + 1;
			console.log(req.body);
			db('SFAADMIN.HIDE_PART_TIME_REASON')
				.insert(req.body)
				.then(() => res.send('entry updated'))
				.catch(function (e: any) {
					res.status(400).send('Not found');
					console.log(e);
				});
		})
		.catch(function (e: any) {
			res.status(400).send('Not Found');
			console.log(e);
		});
};

export function putHidePartTimeReason(req: Request, res: Response) {
	db('SFAADMIN.HIDE_PART_TIME_REASON')
		.where({ HISTORY_DETAIL_ID: req.params.historyDetailId })
		.update(req.body)
		.then(() => res.send('entry updated'))
		.catch(function (e: any) {
			res.status(404).send('Not found');
			console.log(e);
		});
};

export function deleteHidePartTimeReason(req: Request, res: Response) {
	db
		.delete()
		.from('SFAADMIN.HIDE_PART_TIME_REASON')
		.where({ HISTORY_DETAIL_ID: req.params.historyDetailId })
		.then(() => res.send('entry deleted'))
		.catch(function (e: any) {
			res.status(404).send('Not found');
			console.log(e);
		});
};

// HIGH_SCHOOL
export function getAllHighSchool(req: Request, res: Response) {
	db
		.select('*')
		.from('SFAADMIN.HIGH_SCHOOL')
		.then((sql_res: any) => res.send(sql_res))
		.catch(function (e: any) {
			res.status(400).send('Not found');
			console.log(e);
		});
};

export function getHighSchool(req: Request, res: Response) {
	db
		.select('*')
		.from('SFAADMIN.HIGH_SCHOOL')
		.where({ HIGH_SCHOOL_ID: req.params.highSchoolId })
		.then((sql_res: any) => res.send(sql_res))
		.catch(function (e: any) {
			res.status(400).send('Not found');
			console.log(e);
		});
};

export function postHighSchool(req: Request, res: Response) {
	console.log(req.body);
	db
		.raw(
			'SELECT max(HIGH_SCHOOL_ID) as HIGH_SCHOOL_ID FROM SFAADMIN.HIGH_SCHOOL'
		)
		.then((sql_res: any) => {
			console.log(sql_res);
			req.body.HIGH_SCHOOL_ID = sql_res[0].HIGH_SCHOOL_ID + 1;
			console.log(req.body);
			db('SFAADMIN.HIGH_SCHOOL')
				.insert(req.body)
				.then(() => res.send('entry updated'))
				.catch(function (e: any) {
					res.status(400).send('Not found');
					console.log(e);
				});
		})
		.catch(function (e: any) {
			res.status(400).send('Not Found');
			console.log(e);
		});
};

export function putHighSchool(req: Request, res: Response) {
	db('SFAADMIN.HIGH_SCHOOL')
		.where({ HIGH_SCHOOL_ID: req.params.highSchoolId })
		.update(req.body)
		.then(() => res.send('entry updated'))
		.catch(function (e: any) {
			res.status(404).send('Not found');
			console.log(e);
		});
};

export function deleteHighSchool(req: Request, res: Response) {
	db
		.delete()
		.from('SFAADMIN.HIGH_SCHOOL')
		.where({ HIGH_SCHOOL_ID: req.params.highSchoolId })
		.then(() => res.send('entry deleted'))
		.catch(function (e: any) {
			res.status(404).send('Not found');
			console.log(e);
		});
};

// HISTORY_DETAIL
export function getAllHistoryDetail(req: Request, res: Response) {
	db
		.select('*')
		.from('SFAADMIN.HISTORY_DETAIL')
		.then((sql_res: any) => res.send(sql_res))
		.catch(function (e: any) {
			res.status(400).send('Not found');
			console.log(e);
		});
};

export function getHistoryDetail(req: Request, res: Response) {
	db
		.select('*')
		.from('SFAADMIN.HISTORY_DETAIL')
		.where({ HISTORY_DETAIL_ID: req.params.historyDetailId })
		.then((sql_res: any) => res.send(sql_res))
		.catch(function (e: any) {
			res.status(400).send('Not found');
			console.log(e);
		});
};

export function postHistoryDetail(req: Request, res: Response) {
	console.log(req.body);
	db
		.raw(
			'SELECT max(HISTORY_DETAIL_ID) as HISTORY_DETAIL_ID FROM SFAADMIN.HISTORY_DETAIL'
		)
		.then((sql_res: any) => {
			console.log(sql_res);
			req.body.HISTORY_DETAIL_ID = sql_res[0].HISTORY_DETAIL_ID + 1;
			console.log(req.body);
			db('SFAADMIN.HISTORY_DETAIL')
				.insert(req.body)
				.then(() => res.send('entry updated'))
				.catch(function (e: any) {
					res.status(400).send('Not found');
					console.log(e);
				});
		})
		.catch(function (e: any) {
			res.status(400).send('Not Found');
			console.log(e);
		});
};

export function putHistoryDetail(req: Request, res: Response) {
	db('SFAADMIN.HISTORY_DETAIL')
		.where({ HISTORY_DETAIL_ID: req.params.historyDetailId })
		.update(req.body)
		.then(() => res.send('entry updated'))
		.catch(function (e: any) {
			res.status(404).send('Not found');
			console.log(e);
		});
};

export function deleteHistoryDetail(req: Request, res: Response) {
	db
		.delete()
		.from('SFAADMIN.HISTORY_DETAIL')
		.where({ HISTORY_DETAIL_ID: req.params.historyDetailId })
		.then(() => res.send('entry deleted'))
		.catch(function (e: any) {
			res.status(404).send('Not found');
			console.log(e);
		});
};

// INFO_CATEGORY
export function getAllInfoCategory(req: Request, res: Response) {
	db
		.select('*')
		.from('SFAADMIN.INFO_CATEGORY')
		.then((sql_res: any) => res.send(sql_res))
		.catch(function (e: any) {
			res.status(400).send('Not found');
			console.log(e);
		});
};

export function getInfoCategory(req: Request, res: Response) {
	db
		.select('*')
		.from('SFAADMIN.INFO_CATEGORY')
		.where({ INFO_CATEGORY_ID: req.params.infoCategoryId })
		.then((sql_res: any) => res.send(sql_res))
		.catch(function (e: any) {
			res.status(400).send('Not found');
			console.log(e);
		});
};

export function postInfoCategory(req: Request, res: Response) {
	console.log(req.body);
	db
		.raw(
			'SELECT max(INFO_CATEGORY_ID) as INFO_CATEGORY_ID FROM SFAADMIN.INFO_CATEGORY'
		)
		.then((sql_res: any) => {
			console.log(sql_res);
			req.body.INFO_CATEGORY_ID = sql_res[0].INFO_CATEGORY_ID + 1;
			console.log(req.body);
			db('SFAADMIN.INFO_CATEGORY')
				.insert(req.body)
				.then(() => res.send('entry updated'))
				.catch(function (e: any) {
					res.status(400).send('Not found');
					console.log(e);
				});
		})
		.catch(function (e: any) {
			res.status(400).send('Not Found');
			console.log(e);
		});
};

export function putInfoCategory(req: Request, res: Response) {
	db('SFAADMIN.INFO_CATEGORY')
		.where({ INFO_CATEGORY_ID: req.params.infoCategoryId })
		.update(req.body)
		.then(() => res.send('entry updated'))
		.catch(function (e: any) {
			res.status(404).send('Not found');
			console.log(e);
		});
};

export function deleteInfoCategory(req: Request, res: Response) {
	db
		.delete()
		.from('SFAADMIN.INFO_CATEGORY')
		.where({ INFO_CATEGORY_ID: req.params.infoCategoryId })
		.then(() => res.send('entry deleted'))
		.catch(function (e: any) {
			res.status(404).send('Not found');
			console.log(e);
		});
};

// INSTITUTION
export function getAllInstitution(req: Request, res: Response) {
	db
		.select('*')
		.from('SFAADMIN.INSTITUTION')
		.then((sql_res: any) => res.send(sql_res))
		.catch(function (e: any) {
			res.status(400).send('Not found');
			console.log(e);
		});
};

export function getInstitution(req: Request, res: Response) {
	db
		.select('*')
		.from('SFAADMIN.INSTITUTION')
		.where({ INSTITUTION_ID: req.params.institutionId })
		.then((sql_res: any) => res.send(sql_res))
		.catch(function (e: any) {
			res.status(400).send('Not found');
			console.log(e);
		});
};

export function postInstitution(req: Request, res: Response) {
	console.log(req.body);
	db
		.raw(
			'SELECT max(INSTITUTION_ID) as INSTITUTION_ID FROM SFAADMIN.INSTITUTION'
		)
		.then((sql_res: any) => {
			console.log(sql_res);
			req.body.INSTITUTION_ID = sql_res[0].INSTITUTION_ID + 1;
			console.log(req.body);
			db('SFAADMIN.INSTITUTION')
				.insert(req.body)
				.then(() => res.send('entry updated'))
				.catch(function (e: any) {
					res.status(400).send('Not found');
					console.log(e);
				});
		})
		.catch(function (e: any) {
			res.status(400).send('Not Found');
			console.log(e);
		});
};

export function putInstitution(req: Request, res: Response) {
	db('SFAADMIN.INSTITUTION')
		.where({ INSTITUTION_ID: req.params.institutionId })
		.update(req.body)
		.then(() => res.send('entry updated'))
		.catch(function (e: any) {
			res.status(404).send('Not found');
			console.log(e);
		});
};

export function deleteInstitution(req: Request, res: Response) {
	db
		.delete()
		.from('SFAADMIN.INSTITUTION')
		.where({ INSTITUTION_ID: req.params.institutionId })
		.then(() => res.send('entry deleted'))
		.catch(function (e: any) {
			res.status(404).send('Not found');
			console.log(e);
		});
};

// INSTITUTION_LEVEL
export function getAllInstitutionLevel(req: Request, res: Response) {
	db
		.select('*')
		.from('SFAADMIN.INSTITUTION_LEVEL')
		.then((sql_res: any) => res.send(sql_res))
		.catch(function (e: any) {
			res.status(400).send('Not found');
			console.log(e);
		});
};

export function getInstitutionLevel(req: Request, res: Response) {
	db
		.select('*')
		.from('SFAADMIN.INSTITUTION_LEVEL')
		.where({ INSTITUTION_LEVEL_ID: req.params.institutionLevelId })
		.then((sql_res: any) => res.send(sql_res))
		.catch(function (e: any) {
			res.status(400).send('Not found');
			console.log(e);
		});
};

export function postInstitutionLevel(req: Request, res: Response) {
	console.log(req.body);
	db
		.raw(
			'SELECT max(INSTITUTION_LEVEL_ID) as INSTITUTION_LEVEL_ID FROM SFAADMIN.INSTITUTION_LEVEL'
		)
		.then((sql_res: any) => {
			console.log(sql_res);
			req.body.INSTITUTION_LEVEL_ID = sql_res[0].INSTITUTION_LEVEL_ID + 1;
			console.log(req.body);
			db('SFAADMIN.INSTITUTION_LEVEL')
				.insert(req.body)
				.then(() => res.send('entry updated'))
				.catch(function (e: any) {
					res.status(400).send('Not found');
					console.log(e);
				});
		})
		.catch(function (e: any) {
			res.status(400).send('Not Found');
			console.log(e);
		});
};

export function putInstitutionLevel(req: Request, res: Response) {
	db('SFAADMIN.INSTITUTION_LEVEL')
		.where({ INSTITUTION_LEVEL_ID: req.params.institutionLevelId })
		.update(req.body)
		.then(() => res.send('entry updated'))
		.catch(function (e: any) {
			res.status(404).send('Not found');
			console.log(e);
		});
};

export function deleteInstitutionLevel(req: Request, res: Response) {
	db
		.delete()
		.from('SFAADMIN.INSTITUTION_LEVEL')
		.where({ INSTITUTION_LEVEL_ID: req.params.institutionLevelId })
		.then(() => res.send('entry deleted'))
		.catch(function (e: any) {
			res.status(404).send('Not found');
			console.log(e);
		});
};

// INSTITUTION_REQUEST_TYPE
export function getAllInstitutionRequestType(req: Request, res: Response) {
	db
		.select('*')
		.from('SFAADMIN.INSTITUTION_REQUEST_TYPE')
		.then((sql_res: any) => res.send(sql_res))
		.catch(function (e: any) {
			res.status(400).send('Not found');
			console.log(e);
		});
};

export function getInstitutionRequestType(req: Request, res: Response) {
	db
		.select('*')
		.from('SFAADMIN.INSTITUTION_REQUEST_TYPE')
		.where({ INSTITUTION_ID: req.params.institutionId })
		.then((sql_res: any) => res.send(sql_res))
		.catch(function (e: any) {
			res.status(400).send('Not found');
			console.log(e);
		});
};

export function postInstitutionRequestType(req: Request, res: Response) {
	console.log(req.body);
	db
		.raw(
			'SELECT max(INSTITUTION_ID) as INSTITUTION_ID FROM SFAADMIN.INSTITUTION_REQUEST_TYPE'
		)
		.then((sql_res: any) => {
			console.log(sql_res);
			req.body.INSTITUTION_ID = sql_res[0].INSTITUTION_ID + 1;
			console.log(req.body);
			db('SFAADMIN.INSTITUTION_REQUEST_TYPE')
				.insert(req.body)
				.then(() => res.send('entry updated'))
				.catch(function (e: any) {
					res.status(400).send('Not found');
					console.log(e);
				});
		})
		.catch(function (e: any) {
			res.status(400).send('Not Found');
			console.log(e);
		});
};

export function putInstitutionRequestType(req: Request, res: Response) {
	db('SFAADMIN.INSTITUTION_REQUEST_TYPE')
		.where({ INSTITUTION_ID: req.params.institutionId })
		.update(req.body)
		.then(() => res.send('entry updated'))
		.catch(function (e: any) {
			res.status(404).send('Not found');
			console.log(e);
		});
};

export function deleteInstitutionRequestType(req: Request, res: Response) {
	db
		.delete()
		.from('SFAADMIN.INSTITUTION_REQUEST_TYPE')
		.where({ INSTITUTION_ID: req.params.institutionId })
		.then(() => res.send('entry deleted'))
		.catch(function (e: any) {
			res.status(404).send('Not found');
			console.log(e);
		});
};

// INSTITUTION_TYPE
export function getAllInstitutionType(req: Request, res: Response) {
	db
		.select('*')
		.from('SFAADMIN.INSTITUTION_TYPE')
		.then((sql_res: any) => res.send(sql_res))
		.catch(function (e: any) {
			res.status(400).send('Not found');
			console.log(e);
		});
};

export function getInstitutionType(req: Request, res: Response) {
	db
		.select('*')
		.from('SFAADMIN.INSTITUTION_TYPE')
		.where({ INSTITUTION_TYPE_ID: req.params.institutionTypeId })
		.then((sql_res: any) => res.send(sql_res))
		.catch(function (e: any) {
			res.status(400).send('Not found');
			console.log(e);
		});
};

export function postInstitutionType(req: Request, res: Response) {
	console.log(req.body);
	db
		.raw(
			'SELECT max(INSTITUTION_TYPE_ID) as INSTITUTION_TYPE_ID FROM SFAADMIN.INSTITUTION_TYPE'
		)
		.then((sql_res: any) => {
			console.log(sql_res);
			req.body.INSTITUTION_TYPE_ID = sql_res[0].INSTITUTION_TYPE_ID + 1;
			console.log(req.body);
			db('SFAADMIN.INSTITUTION_TYPE')
				.insert(req.body)
				.then(() => res.send('entry updated'))
				.catch(function (e: any) {
					res.status(400).send('Not found');
					console.log(e);
				});
		})
		.catch(function (e: any) {
			res.status(400).send('Not Found');
			console.log(e);
		});
};

export function putInstitutionType(req: Request, res: Response) {
	db('SFAADMIN.INSTITUTION_TYPE')
		.where({ INSTITUTION_TYPE_ID: req.params.institutionTypeId })
		.update(req.body)
		.then(() => res.send('entry updated'))
		.catch(function (e: any) {
			res.status(404).send('Not found');
			console.log(e);
		});
};

export function deleteInstitutionType(req: Request, res: Response) {
	db
		.delete()
		.from('SFAADMIN.INSTITUTION_TYPE')
		.where({ INSTITUTION_TYPE_ID: req.params.institutionTypeId })
		.then(() => res.send('entry deleted'))
		.catch(function (e: any) {
			res.status(404).send('Not found');
			console.log(e);
		});
};

// INSTRUCTION_TYPE
export function getAllInstructionType(req: Request, res: Response) {
	db
		.select('*')
		.from('SFAADMIN.INSTRUCTION_TYPE')
		.then((sql_res: any) => res.send(sql_res))
		.catch(function (e: any) {
			res.status(400).send('Not found');
			console.log(e);
		});
};

export function getInstructionType(req: Request, res: Response) {
	db
		.select('*')
		.from('SFAADMIN.INSTRUCTION_TYPE')
		.where({ INSTRUCTION_TYPE_ID: req.params.instructionTypeId })
		.then((sql_res: any) => res.send(sql_res))
		.catch(function (e: any) {
			res.status(400).send('Not found');
			console.log(e);
		});
};

export function postInstructionType(req: Request, res: Response) {
	console.log(req.body);
	db
		.raw(
			'SELECT max(INSTRUCTION_TYPE_ID) as INSTRUCTION_TYPE_ID FROM SFAADMIN.INSTRUCTION_TYPE'
		)
		.then((sql_res: any) => {
			console.log(sql_res);
			req.body.INSTRUCTION_TYPE_ID = sql_res[0].INSTRUCTION_TYPE_ID + 1;
			console.log(req.body);
			db('SFAADMIN.INSTRUCTION_TYPE')
				.insert(req.body)
				.then(() => res.send('entry updated'))
				.catch(function (e: any) {
					res.status(400).send('Not found');
					console.log(e);
				});
		})
		.catch(function (e: any) {
			res.status(400).send('Not Found');
			console.log(e);
		});
};

export function putInstructionType(req: Request, res: Response) {
	db('SFAADMIN.INSTRUCTION_TYPE')
		.where({ INSTRUCTION_TYPE_ID: req.params.instructionTypeId })
		.update(req.body)
		.then(() => res.send('entry updated'))
		.catch(function (e: any) {
			res.status(404).send('Not found');
			console.log(e);
		});
};

export function deleteInstructionType(req: Request, res: Response) {
	db
		.delete()
		.from('SFAADMIN.INSTRUCTION_TYPE')
		.where({ INSTRUCTION_TYPE_ID: req.params.instructionTypeId })
		.then(() => res.send('entry deleted'))
		.catch(function (e: any) {
			res.status(404).send('Not found');
			console.log(e);
		});
};

// INVESTMENT
export function getAllInvestment(req: Request, res: Response) {
	db
		.select('*')
		.from('SFAADMIN.INVESTMENT')
		.then((sql_res: any) => res.send(sql_res))
		.catch(function (e: any) {
			res.status(400).send('Not found');
			console.log(e);
		});
};

export function getInvestment(req: Request, res: Response) {
	db
		.select('*')
		.from('SFAADMIN.INVESTMENT')
		.where({ INVESTMENT_ID: req.params.investmentId })
		.then((sql_res: any) => res.send(sql_res))
		.catch(function (e: any) {
			res.status(400).send('Not found');
			console.log(e);
		});
};

export function postInvestment(req: Request, res: Response) {
	console.log(req.body);
	db
		.raw('SELECT max(INVESTMENT_ID) as INVESTMENT_ID FROM SFAADMIN.INVESTMENT')
		.then((sql_res: any) => {
			console.log(sql_res);
			req.body.INVESTMENT_ID = sql_res[0].INVESTMENT_ID + 1;
			console.log(req.body);
			db('SFAADMIN.INVESTMENT')
				.insert(req.body)
				.then(() => res.send('entry updated'))
				.catch(function (e: any) {
					res.status(400).send('Not found');
					console.log(e);
				});
		})
		.catch(function (e: any) {
			res.status(400).send('Not Found');
			console.log(e);
		});
};

export function putInvestment(req: Request, res: Response) {
	db('SFAADMIN.INVESTMENT')
		.where({ INVESTMENT_ID: req.params.investmentId })
		.update(req.body)
		.then(() => res.send('entry updated'))
		.catch(function (e: any) {
			res.status(404).send('Not found');
			console.log(e);
		});
};

export function deleteInvestment(req: Request, res: Response) {
	db
		.delete()
		.from('SFAADMIN.INVESTMENT')
		.where({ INVESTMENT_ID: req.params.investmentId })
		.then(() => res.send('entry deleted'))
		.catch(function (e: any) {
			res.status(404).send('Not found');
			console.log(e);
		});
};

// INVESTMENT_TYPE
export function getAllInvestmentType(req: Request, res: Response) {
	db
		.select('*')
		.from('SFAADMIN.INVESTMENT_TYPE')
		.then((sql_res: any) => res.send(sql_res))
		.catch(function (e: any) {
			res.status(400).send('Not found');
			console.log(e);
		});
};

export function getInvestmentType(req: Request, res: Response) {
	db
		.select('*')
		.from('SFAADMIN.INVESTMENT_TYPE')
		.where({ INVESTMENT_TYPE_ID: req.params.investmentTypeId })
		.then((sql_res: any) => res.send(sql_res))
		.catch(function (e: any) {
			res.status(400).send('Not found');
			console.log(e);
		});
};

export function postInvestmentType(req: Request, res: Response) {
	console.log(req.body);
	db
		.raw(
			'SELECT max(INVESTMENT_TYPE_ID) as INVESTMENT_TYPE_ID FROM SFAADMIN.INVESTMENT_TYPE'
		)
		.then((sql_res: any) => {
			console.log(sql_res);
			req.body.INVESTMENT_TYPE_ID = sql_res[0].INVESTMENT_TYPE_ID + 1;
			console.log(req.body);
			db('SFAADMIN.INVESTMENT_TYPE')
				.insert(req.body)
				.then(() => res.send('entry updated'))
				.catch(function (e: any) {
					res.status(400).send('Not found');
					console.log(e);
				});
		})
		.catch(function (e: any) {
			res.status(400).send('Not Found');
			console.log(e);
		});
};

export function putInvestmentType(req: Request, res: Response) {
	db('SFAADMIN.INVESTMENT_TYPE')
		.where({ INVESTMENT_TYPE_ID: req.params.investmentTypeId })
		.update(req.body)
		.then(() => res.send('entry updated'))
		.catch(function (e: any) {
			res.status(404).send('Not found');
			console.log(e);
		});
};

export function deleteInvestmentType(req: Request, res: Response) {
	db
		.delete()
		.from('SFAADMIN.INVESTMENT_TYPE')
		.where({ INVESTMENT_TYPE_ID: req.params.investmentTypeId })
		.then(() => res.send('entry deleted'))
		.catch(function (e: any) {
			res.status(404).send('Not found');
			console.log(e);
		});
};

// LANGUAGE
export function getAllLanguage(req: Request, res: Response) {
	db
		.select('*')
		.from('SFAADMIN.LANGUAGE')
		.then((sql_res: any) => res.send(sql_res))
		.catch(function (e: any) {
			res.status(400).send('Not found');
			console.log(e);
		});
};

export function getLanguage(req: Request, res: Response) {
	db
		.select('*')
		.from('SFAADMIN.LANGUAGE')
		.where({ LANGUAGE_ID: req.params.languageId })
		.then((sql_res: any) => res.send(sql_res))
		.catch(function (e: any) {
			res.status(400).send('Not found');
			console.log(e);
		});
};

export function postLanguage(req: Request, res: Response) {
	console.log(req.body);
	db
		.raw('SELECT max(LANGUAGE_ID) as LANGUAGE_ID FROM SFAADMIN.LANGUAGE')
		.then((sql_res: any) => {
			console.log(sql_res);
			req.body.LANGUAGE_ID = sql_res[0].LANGUAGE_ID + 1;
			console.log(req.body);
			db('SFAADMIN.LANGUAGE')
				.insert(req.body)
				.then(() => res.send('entry updated'))
				.catch(function (e: any) {
					res.status(400).send('Not found');
					console.log(e);
				});
		})
		.catch(function (e: any) {
			res.status(400).send('Not Found');
			console.log(e);
		});
};

export function putLanguage(req: Request, res: Response) {
	db('SFAADMIN.LANGUAGE')
		.where({ LANGUAGE_ID: req.params.languageId })
		.update(req.body)
		.then(() => res.send('entry updated'))
		.catch(function (e: any) {
			res.status(404).send('Not found');
			console.log(e);
		});
};

export function deleteLanguage(req: Request, res: Response) {
	db
		.delete()
		.from('SFAADMIN.LANGUAGE')
		.where({ LANGUAGE_ID: req.params.languageId })
		.then(() => res.send('entry deleted'))
		.catch(function (e: any) {
			res.status(404).send('Not found');
			console.log(e);
		});
};

// LOOKUP_TABLE
export function getAllLookupTable(req: Request, res: Response) {
	db
		.select('*')
		.from('SFAADMIN.LOOKUP_TABLE')
		.then((sql_res: any) => res.send(sql_res))
		.catch(function (e: any) {
			res.status(400).send('Not found');
			console.log(e);
		});
};

export function getLookupTable(req: Request, res: Response) {
	db
		.select('*')
		.from('SFAADMIN.LOOKUP_TABLE')
		.where({ TABLE_NAME: req.params.tableName })
		.then((sql_res: any) => res.send(sql_res))
		.catch(function (e: any) {
			res.status(400).send('Not found');
			console.log(e);
		});
};

export function postLookupTable(req: Request, res: Response) {
	console.log(req.body);
	db
		.raw('SELECT max(TABLE_NAME) as TABLE_NAME FROM SFAADMIN.LOOKUP_TABLE')
		.then((sql_res: any) => {
			console.log(sql_res);
			req.body.TABLE_NAME = sql_res[0].TABLE_NAME + 1;
			console.log(req.body);
			db('SFAADMIN.LOOKUP_TABLE')
				.insert(req.body)
				.then(() => res.send('entry updated'))
				.catch(function (e: any) {
					res.status(400).send('Not found');
					console.log(e);
				});
		})
		.catch(function (e: any) {
			res.status(400).send('Not Found');
			console.log(e);
		});
};

export function putLookupTable(req: Request, res: Response) {
	db('SFAADMIN.LOOKUP_TABLE')
		.where({ TABLE_NAME: req.params.tableName })
		.update(req.body)
		.then(() => res.send('entry updated'))
		.catch(function (e: any) {
			res.status(404).send('Not found');
			console.log(e);
		});
};

export function deleteLookupTable(req: Request, res: Response) {
	db
		.delete()
		.from('SFAADMIN.LOOKUP_TABLE')
		.where({ TABLE_NAME: req.params.tableName })
		.then(() => res.send('entry deleted'))
		.catch(function (e: any) {
			res.status(404).send('Not found');
			console.log(e);
		});
};

// MARITAL_STATUS
export function getAllMaritalStatus(req: Request, res: Response) {
	db
		.select('*')
		.from('SFAADMIN.MARITAL_STATUS')
		.then((sql_res: any) => res.send(sql_res))
		.catch(function (e: any) {
			res.status(400).send('Not found');
			console.log(e);
		});
};

export function getMaritalStatus(req: Request, res: Response) {
	db
		.select('*')
		.from('SFAADMIN.MARITAL_STATUS')
		.where({ MARITAL_STATUS_ID: req.params.maritalStatusId })
		.then((sql_res: any) => res.send(sql_res))
		.catch(function (e: any) {
			res.status(400).send('Not found');
			console.log(e);
		});
};

export function postMaritalStatus(req: Request, res: Response) {
	console.log(req.body);
	db
		.raw(
			'SELECT max(MARITAL_STATUS_ID) as MARITAL_STATUS_ID FROM SFAADMIN.MARITAL_STATUS'
		)
		.then((sql_res: any) => {
			console.log(sql_res);
			req.body.MARITAL_STATUS_ID = sql_res[0].MARITAL_STATUS_ID + 1;
			console.log(req.body);
			db('SFAADMIN.MARITAL_STATUS')
				.insert(req.body)
				.then(() => res.send('entry updated'))
				.catch(function (e: any) {
					res.status(400).send('Not found');
					console.log(e);
				});
		})
		.catch(function (e: any) {
			res.status(400).send('Not Found');
			console.log(e);
		});
};

export function putMaritalStatus(req: Request, res: Response) {
	db('SFAADMIN.MARITAL_STATUS')
		.where({ MARITAL_STATUS_ID: req.params.maritalStatusId })
		.update(req.body)
		.then(() => res.send('entry updated'))
		.catch(function (e: any) {
			res.status(404).send('Not found');
			console.log(e);
		});
};

export function deleteMaritalStatus(req: Request, res: Response) {
	db
		.delete()
		.from('SFAADMIN.MARITAL_STATUS')
		.where({ MARITAL_STATUS_ID: req.params.maritalStatusId })
		.then(() => res.send('entry deleted'))
		.catch(function (e: any) {
			res.status(404).send('Not found');
			console.log(e);
		});
};

// MENU_STATE
export function getAllMenuState(req: Request, res: Response) {
	db
		.select('*')
		.from('SFAADMIN.MENU_STATE')
		.then((sql_res: any) => res.send(sql_res))
		.catch(function (e: any) {
			res.status(400).send('Not found');
			console.log(e);
		});
};

export function getMenuState(req: Request, res: Response) {
	db
		.select('*')
		.from('SFAADMIN.MENU_STATE')
		.where({ MENU_STATE_ID: req.params.menuStateId })
		.then((sql_res: any) => res.send(sql_res))
		.catch(function (e: any) {
			res.status(400).send('Not found');
			console.log(e);
		});
};

export function postMenuState(req: Request, res: Response) {
	console.log(req.body);
	db
		.raw('SELECT max(MENU_STATE_ID) as MENU_STATE_ID FROM SFAADMIN.MENU_STATE')
		.then((sql_res: any) => {
			console.log(sql_res);
			req.body.MENU_STATE_ID = sql_res[0].MENU_STATE_ID + 1;
			console.log(req.body);
			db('SFAADMIN.MENU_STATE')
				.insert(req.body)
				.then(() => res.send('entry updated'))
				.catch(function (e: any) {
					res.status(400).send('Not found');
					console.log(e);
				});
		})
		.catch(function (e: any) {
			res.status(400).send('Not Found');
			console.log(e);
		});
};

export function putMenuState(req: Request, res: Response) {
	db('SFAADMIN.MENU_STATE')
		.where({ MENU_STATE_ID: req.params.menuStateId })
		.update(req.body)
		.then(() => res.send('entry updated'))
		.catch(function (e: any) {
			res.status(404).send('Not found');
			console.log(e);
		});
};

export function deleteMenuState(req: Request, res: Response) {
	db
		.delete()
		.from('SFAADMIN.MENU_STATE')
		.where({ MENU_STATE_ID: req.params.menuStateId })
		.then(() => res.send('entry deleted'))
		.catch(function (e: any) {
			res.status(404).send('Not found');
			console.log(e);
		});
};

// MESSAGE
export function getAllMessage(req: Request, res: Response) {
	db
		.select('*')
		.from('SFAADMIN.MESSAGE')
		.then((sql_res: any) => res.send(sql_res))
		.catch(function (e: any) {
			res.status(400).send('Not found');
			console.log(e);
		});
};

export function getMessage(req: Request, res: Response) {
	db
		.select('*')
		.from('SFAADMIN.MESSAGE')
		.where({ MESG_ID: req.params.mesgId })
		.then((sql_res: any) => res.send(sql_res))
		.catch(function (e: any) {
			res.status(400).send('Not found');
			console.log(e);
		});
};

export function postMessage(req: Request, res: Response) {
	console.log(req.body);
	db
		.raw('SELECT max(MESG_ID) as MESG_ID FROM SFAADMIN.MESSAGE')
		.then((sql_res: any) => {
			console.log(sql_res);
			req.body.MESG_ID = sql_res[0].MESG_ID + 1;
			console.log(req.body);
			db('SFAADMIN.MESSAGE')
				.insert(req.body)
				.then(() => res.send('entry updated'))
				.catch(function (e: any) {
					res.status(400).send('Not found');
					console.log(e);
				});
		})
		.catch(function (e: any) {
			res.status(400).send('Not Found');
			console.log(e);
		});
};

export function putMessage(req: Request, res: Response) {
	db('SFAADMIN.MESSAGE')
		.where({ MESG_ID: req.params.mesgId })
		.update(req.body)
		.then(() => res.send('entry updated'))
		.catch(function (e: any) {
			res.status(404).send('Not found');
			console.log(e);
		});
};

export function deleteMessage(req: Request, res: Response) {
	db
		.delete()
		.from('SFAADMIN.MESSAGE')
		.where({ MESG_ID: req.params.mesgId })
		.then(() => res.send('entry deleted'))
		.catch(function (e: any) {
			res.status(404).send('Not found');
			console.log(e);
		});
};

// CURRENT_DEPENDENT_ELIGIBILITY
export function getAllCurrentDependentEligibility(req: Request, res: Response) {
	db
		.select('*')
		.from('SFAADMIN.CURRENT_DEPENDENT_ELIGIBILITY')
		.then((sql_res: any) => res.send(sql_res))
		.catch(function (e: any) {
			res.status(400).send('Not found');
			console.log(e);
		});
};

export function getCurrentDependentEligibility(req: Request, res: Response) {
	db
		.select('*')
		.from('SFAADMIN.CURRENT_DEPENDENT_ELIGIBILITY')
		.where({ HISTORY_DETAIL_ID: req.params.historyDetailId })
		.then((sql_res: any) => res.send(sql_res))
		.catch(function (e: any) {
			res.status(400).send('Not found');
			console.log(e);
		});
};

export function postCurrentDependentEligibility(req: Request, res: Response) {
	console.log(req.body);
	db
		.raw(
			'SELECT max(HISTORY_DETAIL_ID) as HISTORY_DETAIL_ID FROM SFAADMIN.CURRENT_DEPENDENT_ELIGIBILITY'
		)
		.then((sql_res: any) => {
			console.log(sql_res);
			req.body.HISTORY_DETAIL_ID = sql_res[0].HISTORY_DETAIL_ID + 1;
			console.log(req.body);
			db('SFAADMIN.CURRENT_DEPENDENT_ELIGIBILITY')
				.insert(req.body)
				.then(() => res.send('entry updated'))
				.catch(function (e: any) {
					res.status(400).send('Not found');
					console.log(e);
				});
		})
		.catch(function (e: any) {
			res.status(400).send('Not Found');
			console.log(e);
		});
};

export function putCurrentDependentEligibility(req: Request, res: Response) {
	db('SFAADMIN.CURRENT_DEPENDENT_ELIGIBILITY')
		.where({ HISTORY_DETAIL_ID: req.params.historyDetailId })
		.update(req.body)
		.then(() => res.send('entry updated'))
		.catch(function (e: any) {
			res.status(404).send('Not found');
			console.log(e);
		});
};

export function deleteCurrentDependentEligibility(req: Request, res: Response) {
	db
		.delete()
		.from('SFAADMIN.CURRENT_DEPENDENT_ELIGIBILITY')
		.where({ HISTORY_DETAIL_ID: req.params.historyDetailId })
		.then(() => res.send('entry deleted'))
		.catch(function (e: any) {
			res.status(404).send('Not found');
			console.log(e);
		});
};

// MSFAA
export function getAllMsfaa(req: Request, res: Response) {
	db
		.select('*')
		.from('SFAADMIN.MSFAA')
		.then((sql_res: any) => res.send(sql_res))
		.catch(function (e: any) {
			res.status(400).send('Not found');
			console.log(e);
		});
};

export function getMsfaa(req: Request, res: Response) {
	db
		.select('*')
		.from('SFAADMIN.MSFAA')
		.where({ MSFAA_ID: req.params.msfaaId })
		.then((sql_res: any) => res.send(sql_res))
		.catch(function (e: any) {
			res.status(400).send('Not found');
			console.log(e);
		});
};

export function postMsfaa(req: Request, res: Response) {
	console.log(req.body);
	db
		.raw('SELECT max(MSFAA_ID) as MSFAA_ID FROM SFAADMIN.MSFAA')
		.then((sql_res: any) => {
			console.log(sql_res);
			req.body.MSFAA_ID = sql_res[0].MSFAA_ID + 1;
			console.log(req.body);
			db('SFAADMIN.MSFAA')
				.insert(req.body)
				.then(() => res.send('entry updated'))
				.catch(function (e: any) {
					res.status(400).send('Not found');
					console.log(e);
				});
		})
		.catch(function (e: any) {
			res.status(400).send('Not Found');
			console.log(e);
		});
};

export function putMsfaa(req: Request, res: Response) {
	db('SFAADMIN.MSFAA')
		.where({ MSFAA_ID: req.params.msfaaId })
		.update(req.body)
		.then(() => res.send('entry updated'))
		.catch(function (e: any) {
			res.status(404).send('Not found');
			console.log(e);
		});
};

export function deleteMsfaa(req: Request, res: Response) {
	db
		.delete()
		.from('SFAADMIN.MSFAA')
		.where({ MSFAA_ID: req.params.msfaaId })
		.then(() => res.send('entry deleted'))
		.catch(function (e: any) {
			res.status(404).send('Not found');
			console.log(e);
		});
};

// FUNDING_HISTORY
export function getAllFundingHistory(req: Request, res: Response) {
	db
		.select('*')
		.from('SFAADMIN.FUNDING_HISTORY')
		.then((sql_res: any) => res.send(sql_res))
		.catch(function (e: any) {
			res.status(400).send('Not found');
			console.log(e);
		});
};

export function getFundingHistory(req: Request, res: Response) {
	db
		.select('*')
		.from('SFAADMIN.FUNDING_HISTORY')
		.where({ STUDENT_ID: req.params.studentId })
		.then((sql_res: any) => res.send(sql_res))
		.catch(function (e: any) {
			res.status(400).send('Not found');
			console.log(e);
		});
};

export function postFundingHistory(req: Request, res: Response) {
	console.log(req.body);
	db
		.raw('SELECT max(STUDENT_ID) as STUDENT_ID FROM SFAADMIN.FUNDING_HISTORY')
		.then((sql_res: any) => {
			console.log(sql_res);
			req.body.STUDENT_ID = sql_res[0].STUDENT_ID + 1;
			console.log(req.body);
			db('SFAADMIN.FUNDING_HISTORY')
				.insert(req.body)
				.then(() => res.send('entry updated'))
				.catch(function (e: any) {
					res.status(400).send('Not found');
					console.log(e);
				});
		})
		.catch(function (e: any) {
			res.status(400).send('Not Found');
			console.log(e);
		});
};

export function putFundingHistory(req: Request, res: Response) {
	db('SFAADMIN.FUNDING_HISTORY')
		.where({ STUDENT_ID: req.params.studentId })
		.update(req.body)
		.then(() => res.send('entry updated'))
		.catch(function (e: any) {
			res.status(404).send('Not found');
			console.log(e);
		});
};

export function deleteFundingHistory(req: Request, res: Response) {
	db
		.delete()
		.from('SFAADMIN.FUNDING_HISTORY')
		.where({ STUDENT_ID: req.params.studentId })
		.then(() => res.send('entry deleted'))
		.catch(function (e: any) {
			res.status(404).send('Not found');
			console.log(e);
		});
};

// MSFAA_EMAIL_LOG
export function getAllMsfaaEmailLog(req: Request, res: Response) {
	db
		.select('*')
		.from('SFAADMIN.MSFAA_EMAIL_LOG')
		.then((sql_res: any) => res.send(sql_res))
		.catch(function (e: any) {
			res.status(400).send('Not found');
			console.log(e);
		});
};

export function getMsfaaEmailLog(req: Request, res: Response) {
	db
		.select('*')
		.from('SFAADMIN.MSFAA_EMAIL_LOG')
		.where({ MSFAA_EMAIL_LOG_ID: req.params.msfaaEmailLogId })
		.then((sql_res: any) => res.send(sql_res))
		.catch(function (e: any) {
			res.status(400).send('Not found');
			console.log(e);
		});
};

export function postMsfaaEmailLog(req: Request, res: Response) {
	console.log(req.body);
	db
		.raw(
			'SELECT max(MSFAA_EMAIL_LOG_ID) as MSFAA_EMAIL_LOG_ID FROM SFAADMIN.MSFAA_EMAIL_LOG'
		)
		.then((sql_res: any) => {
			console.log(sql_res);
			req.body.MSFAA_EMAIL_LOG_ID = sql_res[0].MSFAA_EMAIL_LOG_ID + 1;
			console.log(req.body);
			db('SFAADMIN.MSFAA_EMAIL_LOG')
				.insert(req.body)
				.then(() => res.send('entry updated'))
				.catch(function (e: any) {
					res.status(400).send('Not found');
					console.log(e);
				});
		})
		.catch(function (e: any) {
			res.status(400).send('Not Found');
			console.log(e);
		});
};

export function putMsfaaEmailLog(req: Request, res: Response) {
	db('SFAADMIN.MSFAA_EMAIL_LOG')
		.where({ MSFAA_EMAIL_LOG_ID: req.params.msfaaEmailLogId })
		.update(req.body)
		.then(() => res.send('entry updated'))
		.catch(function (e: any) {
			res.status(404).send('Not found');
			console.log(e);
		});
};

export function deleteMsfaaEmailLog(req: Request, res: Response) {
	db
		.delete()
		.from('SFAADMIN.MSFAA_EMAIL_LOG')
		.where({ MSFAA_EMAIL_LOG_ID: req.params.msfaaEmailLogId })
		.then(() => res.send('entry deleted'))
		.catch(function (e: any) {
			res.status(404).send('Not found');
			console.log(e);
		});
};

// FUNDING_REQUEST_REQUIREMENT
export function getAllFundingRequestRequirement(req: Request, res: Response) {
	db
		.select('*')
		.from('SFAADMIN.FUNDING_REQUEST_REQUIREMENT')
		.then((sql_res: any) => res.send(sql_res))
		.catch(function (e: any) {
			res.status(400).send('Not found');
			console.log(e);
		});
};

export function getFundingRequestRequirement(req: Request, res: Response) {
	db
		.select('*')
		.from('SFAADMIN.FUNDING_REQUEST_REQUIREMENT')
		.where({ REQUEST_TYPE_ID: req.params.requestTypeId })
		.then((sql_res: any) => res.send(sql_res))
		.catch(function (e: any) {
			res.status(400).send('Not found');
			console.log(e);
		});
};

export function postFundingRequestRequirement(req: Request, res: Response) {
	console.log(req.body);
	db
		.raw(
			'SELECT max(REQUEST_TYPE_ID) as REQUEST_TYPE_ID FROM SFAADMIN.FUNDING_REQUEST_REQUIREMENT'
		)
		.then((sql_res: any) => {
			console.log(sql_res);
			req.body.REQUEST_TYPE_ID = sql_res[0].REQUEST_TYPE_ID + 1;
			console.log(req.body);
			db('SFAADMIN.FUNDING_REQUEST_REQUIREMENT')
				.insert(req.body)
				.then(() => res.send('entry updated'))
				.catch(function (e: any) {
					res.status(400).send('Not found');
					console.log(e);
				});
		})
		.catch(function (e: any) {
			res.status(400).send('Not Found');
			console.log(e);
		});
};

export function putFundingRequestRequirement(req: Request, res: Response) {
	db('SFAADMIN.FUNDING_REQUEST_REQUIREMENT')
		.where({ REQUEST_TYPE_ID: req.params.requestTypeId })
		.update(req.body)
		.then(() => res.send('entry updated'))
		.catch(function (e: any) {
			res.status(404).send('Not found');
			console.log(e);
		});
};

export function deleteFundingRequestRequirement(req: Request, res: Response) {
	db
		.delete()
		.from('SFAADMIN.FUNDING_REQUEST_REQUIREMENT')
		.where({ REQUEST_TYPE_ID: req.params.requestTypeId })
		.then(() => res.send('entry deleted'))
		.catch(function (e: any) {
			res.status(404).send('Not found');
			console.log(e);
		});
};

// MSFAA_IMPORT
export function getAllMsfaaImport(req: Request, res: Response) {
	db
		.select('*')
		.from('SFAADMIN.MSFAA_IMPORT')
		.then((sql_res: any) => res.send(sql_res))
		.catch(function (e: any) {
			res.status(400).send('Not found');
			console.log(e);
		});
};

export function getMsfaaImport(req: Request, res: Response) {
	db
		.select('*')
		.from('SFAADMIN.MSFAA_IMPORT')
		.where({ AGREEMENT_NUMBER: req.params.agreementNumber })
		.then((sql_res: any) => res.send(sql_res))
		.catch(function (e: any) {
			res.status(400).send('Not found');
			console.log(e);
		});
};

export function postMsfaaImport(req: Request, res: Response) {
	console.log(req.body);
	db
		.raw(
			'SELECT max(AGREEMENT_NUMBER) as AGREEMENT_NUMBER FROM SFAADMIN.MSFAA_IMPORT'
		)
		.then((sql_res: any) => {
			console.log(sql_res);
			req.body.AGREEMENT_NUMBER = sql_res[0].AGREEMENT_NUMBER + 1;
			console.log(req.body);
			db('SFAADMIN.MSFAA_IMPORT')
				.insert(req.body)
				.then(() => res.send('entry updated'))
				.catch(function (e: any) {
					res.status(400).send('Not found');
					console.log(e);
				});
		})
		.catch(function (e: any) {
			res.status(400).send('Not Found');
			console.log(e);
		});
};

export function putMsfaaImport(req: Request, res: Response) {
	db('SFAADMIN.MSFAA_IMPORT')
		.where({ AGREEMENT_NUMBER: req.params.agreementNumber })
		.update(req.body)
		.then(() => res.send('entry updated'))
		.catch(function (e: any) {
			res.status(404).send('Not found');
			console.log(e);
		});
};

export function deleteMsfaaImport(req: Request, res: Response) {
	db
		.delete()
		.from('SFAADMIN.MSFAA_IMPORT')
		.where({ AGREEMENT_NUMBER: req.params.agreementNumber })
		.then(() => res.send('entry deleted'))
		.catch(function (e: any) {
			res.status(404).send('Not found');
			console.log(e);
		});
};

// INQ_STATUS
export function getAllInqStatus(req: Request, res: Response) {
	db
		.select('*')
		.from('SFAADMIN.INQ_STATUS')
		.then((sql_res: any) => res.send(sql_res))
		.catch(function (e: any) {
			res.status(400).send('Not found');
			console.log(e);
		});
};

export function getInqStatus(req: Request, res: Response) {
	db
		.select('*')
		.from('SFAADMIN.INQ_STATUS')
		.where({ REQUEST_TYPE: req.params.requestType })
		.then((sql_res: any) => res.send(sql_res))
		.catch(function (e: any) {
			res.status(400).send('Not found');
			console.log(e);
		});
};

export function postInqStatus(req: Request, res: Response) {
	console.log(req.body);
	db
		.raw('SELECT max(REQUEST_TYPE) as REQUEST_TYPE FROM SFAADMIN.INQ_STATUS')
		.then((sql_res: any) => {
			console.log(sql_res);
			req.body.REQUEST_TYPE = sql_res[0].REQUEST_TYPE + 1;
			console.log(req.body);
			db('SFAADMIN.INQ_STATUS')
				.insert(req.body)
				.then(() => res.send('entry updated'))
				.catch(function (e: any) {
					res.status(400).send('Not found');
					console.log(e);
				});
		})
		.catch(function (e: any) {
			res.status(400).send('Not Found');
			console.log(e);
		});
};

export function putInqStatus(req: Request, res: Response) {
	db('SFAADMIN.INQ_STATUS')
		.where({ REQUEST_TYPE: req.params.requestType })
		.update(req.body)
		.then(() => res.send('entry updated'))
		.catch(function (e: any) {
			res.status(404).send('Not found');
			console.log(e);
		});
};

export function deleteInqStatus(req: Request, res: Response) {
	db
		.delete()
		.from('SFAADMIN.INQ_STATUS')
		.where({ REQUEST_TYPE: req.params.requestType })
		.then(() => res.send('entry deleted'))
		.catch(function (e: any) {
			res.status(404).send('Not found');
			console.log(e);
		});
};

// OFFICER
export function getAllOfficer(req: Request, res: Response) {
	db
		.select('*')
		.from('SFAADMIN.OFFICER')
		.then((sql_res: any) => res.send(sql_res))
		.catch(function (e: any) {
			res.status(400).send('Not found');
			console.log(e);
		});
};

export function getOfficer(req: Request, res: Response) {
	db
		.select('*')
		.from('SFAADMIN.OFFICER')
		.where({ OFFICER_ID: req.params.officerId })
		.then((sql_res: any) => res.send(sql_res))
		.catch(function (e: any) {
			res.status(400).send('Not found');
			console.log(e);
		});
};

export function postOfficer(req: Request, res: Response) {
	console.log(req.body);
	db
		.raw('SELECT max(OFFICER_ID) as OFFICER_ID FROM SFAADMIN.OFFICER')
		.then((sql_res: any) => {
			console.log(sql_res);
			req.body.OFFICER_ID = sql_res[0].OFFICER_ID + 1;
			console.log(req.body);
			db('SFAADMIN.OFFICER')
				.insert(req.body)
				.then(() => res.send('entry updated'))
				.catch(function (e: any) {
					res.status(400).send('Not found');
					console.log(e);
				});
		})
		.catch(function (e: any) {
			res.status(400).send('Not Found');
			console.log(e);
		});
};

export function putOfficer(req: Request, res: Response) {
	db('SFAADMIN.OFFICER')
		.where({ OFFICER_ID: req.params.officerId })
		.update(req.body)
		.then(() => res.send('entry updated'))
		.catch(function (e: any) {
			res.status(404).send('Not found');
			console.log(e);
		});
};

export function deleteOfficer(req: Request, res: Response) {
	db
		.delete()
		.from('SFAADMIN.OFFICER')
		.where({ OFFICER_ID: req.params.officerId })
		.then(() => res.send('entry deleted'))
		.catch(function (e: any) {
			res.status(404).send('Not found');
			console.log(e);
		});
};

// REQUEST_REQUIREMENT_MET
export function getAllRequestRequirementMet(req: Request, res: Response) {
	db
		.select('*')
		.from('SFAADMIN.REQUEST_REQUIREMENT_MET')
		.then((sql_res: any) => res.send(sql_res))
		.catch(function (e: any) {
			res.status(400).send('Not found');
			console.log(e);
		});
};

export function getRequestRequirementMet(req: Request, res: Response) {
	db
		.select('*')
		.from('SFAADMIN.REQUEST_REQUIREMENT_MET')
		.where({ REQUEST_TYPE_ID: req.params.requestTypeId })
		.then((sql_res: any) => res.send(sql_res))
		.catch(function (e: any) {
			res.status(400).send('Not found');
			console.log(e);
		});
};

export function postRequestRequirementMet(req: Request, res: Response) {
	console.log(req.body);
	db
		.raw(
			'SELECT max(REQUEST_TYPE_ID) as REQUEST_TYPE_ID FROM SFAADMIN.REQUEST_REQUIREMENT_MET'
		)
		.then((sql_res: any) => {
			console.log(sql_res);
			req.body.REQUEST_TYPE_ID = sql_res[0].REQUEST_TYPE_ID + 1;
			console.log(req.body);
			db('SFAADMIN.REQUEST_REQUIREMENT_MET')
				.insert(req.body)
				.then(() => res.send('entry updated'))
				.catch(function (e: any) {
					res.status(400).send('Not found');
					console.log(e);
				});
		})
		.catch(function (e: any) {
			res.status(400).send('Not Found');
			console.log(e);
		});
};

export function putRequestRequirementMet(req: Request, res: Response) {
	db('SFAADMIN.REQUEST_REQUIREMENT_MET')
		.where({ REQUEST_TYPE_ID: req.params.requestTypeId })
		.update(req.body)
		.then(() => res.send('entry updated'))
		.catch(function (e: any) {
			res.status(404).send('Not found');
			console.log(e);
		});
};

export function deleteRequestRequirementMet(req: Request, res: Response) {
	db
		.delete()
		.from('SFAADMIN.REQUEST_REQUIREMENT_MET')
		.where({ REQUEST_TYPE_ID: req.params.requestTypeId })
		.then(() => res.send('entry deleted'))
		.catch(function (e: any) {
			res.status(404).send('Not found');
			console.log(e);
		});
};

// OWNERSHIP
export function getAllOwnership(req: Request, res: Response) {
	db
		.select('*')
		.from('SFAADMIN.OWNERSHIP')
		.then((sql_res: any) => res.send(sql_res))
		.catch(function (e: any) {
			res.status(400).send('Not found');
			console.log(e);
		});
};

export function getOwnership(req: Request, res: Response) {
	db
		.select('*')
		.from('SFAADMIN.OWNERSHIP')
		.where({ OWNERSHIP_ID: req.params.ownershipId })
		.then((sql_res: any) => res.send(sql_res))
		.catch(function (e: any) {
			res.status(400).send('Not found');
			console.log(e);
		});
};

export function postOwnership(req: Request, res: Response) {
	console.log(req.body);
	db
		.raw('SELECT max(OWNERSHIP_ID) as OWNERSHIP_ID FROM SFAADMIN.OWNERSHIP')
		.then((sql_res: any) => {
			console.log(sql_res);
			req.body.OWNERSHIP_ID = sql_res[0].OWNERSHIP_ID + 1;
			console.log(req.body);
			db('SFAADMIN.OWNERSHIP')
				.insert(req.body)
				.then(() => res.send('entry updated'))
				.catch(function (e: any) {
					res.status(400).send('Not found');
					console.log(e);
				});
		})
		.catch(function (e: any) {
			res.status(400).send('Not Found');
			console.log(e);
		});
};

export function putOwnership(req: Request, res: Response) {
	db('SFAADMIN.OWNERSHIP')
		.where({ OWNERSHIP_ID: req.params.ownershipId })
		.update(req.body)
		.then(() => res.send('entry updated'))
		.catch(function (e: any) {
			res.status(404).send('Not found');
			console.log(e);
		});
};

export function deleteOwnership(req: Request, res: Response) {
	db
		.delete()
		.from('SFAADMIN.OWNERSHIP')
		.where({ OWNERSHIP_ID: req.params.ownershipId })
		.then(() => res.send('entry deleted'))
		.catch(function (e: any) {
			res.status(404).send('Not found');
			console.log(e);
		});
};

// REQUIREMENT_MET_VIEW
export function getAllRequirementMetView(req: Request, res: Response) {
	db
		.select('*')
		.from('SFAADMIN.REQUIREMENT_MET_VIEW')
		.then((sql_res: any) => res.send(sql_res))
		.catch(function (e: any) {
			res.status(400).send('Not found');
			console.log(e);
		});
};

export function getRequirementMetView(req: Request, res: Response) {
	db
		.select('*')
		.from('SFAADMIN.REQUIREMENT_MET_VIEW')
		.where({ REQUIREMENT_MET_ID: req.params.requirementMetId })
		.then((sql_res: any) => res.send(sql_res))
		.catch(function (e: any) {
			res.status(400).send('Not found');
			console.log(e);
		});
};

export function postRequirementMetView(req: Request, res: Response) {
	console.log(req.body);
	db
		.raw(
			'SELECT max(REQUIREMENT_MET_ID) as REQUIREMENT_MET_ID FROM SFAADMIN.REQUIREMENT_MET_VIEW'
		)
		.then((sql_res: any) => {
			console.log(sql_res);
			req.body.REQUIREMENT_MET_ID = sql_res[0].REQUIREMENT_MET_ID + 1;
			console.log(req.body);
			db('SFAADMIN.REQUIREMENT_MET_VIEW')
				.insert(req.body)
				.then(() => res.send('entry updated'))
				.catch(function (e: any) {
					res.status(400).send('Not found');
					console.log(e);
				});
		})
		.catch(function (e: any) {
			res.status(400).send('Not Found');
			console.log(e);
		});
};

export function putRequirementMetView(req: Request, res: Response) {
	db('SFAADMIN.REQUIREMENT_MET_VIEW')
		.where({ REQUIREMENT_MET_ID: req.params.requirementMetId })
		.update(req.body)
		.then(() => res.send('entry updated'))
		.catch(function (e: any) {
			res.status(404).send('Not found');
			console.log(e);
		});
};

export function deleteRequirementMetView(req: Request, res: Response) {
	db
		.delete()
		.from('SFAADMIN.REQUIREMENT_MET_VIEW')
		.where({ REQUIREMENT_MET_ID: req.params.requirementMetId })
		.then(() => res.send('entry deleted'))
		.catch(function (e: any) {
			res.status(404).send('Not found');
			console.log(e);
		});
};

// PARENT_CONTRIBUTION_FORMULA
export function getAllParentContributionFormula(req: Request, res: Response) {
	db
		.select('*')
		.from('SFAADMIN.PARENT_CONTRIBUTION_FORMULA')
		.then((sql_res: any) => res.send(sql_res))
		.catch(function (e: any) {
			res.status(400).send('Not found');
			console.log(e);
		});
};

export function getParentContributionFormula(req: Request, res: Response) {
	db
		.select('*')
		.from('SFAADMIN.PARENT_CONTRIBUTION_FORMULA')
		.where({ ACADEMIC_YEAR: req.params.academicYear })
		.then((sql_res: any) => res.send(sql_res))
		.catch(function (e: any) {
			res.status(400).send('Not found');
			console.log(e);
		});
};

export function postParentContributionFormula(req: Request, res: Response) {
	console.log(req.body);
	db
		.raw(
			'SELECT max(ACADEMIC_YEAR) as ACADEMIC_YEAR FROM SFAADMIN.PARENT_CONTRIBUTION_FORMULA'
		)
		.then((sql_res: any) => {
			console.log(sql_res);
			req.body.ACADEMIC_YEAR = sql_res[0].ACADEMIC_YEAR + 1;
			console.log(req.body);
			db('SFAADMIN.PARENT_CONTRIBUTION_FORMULA')
				.insert(req.body)
				.then(() => res.send('entry updated'))
				.catch(function (e: any) {
					res.status(400).send('Not found');
					console.log(e);
				});
		})
		.catch(function (e: any) {
			res.status(400).send('Not Found');
			console.log(e);
		});
};

export function putParentContributionFormula(req: Request, res: Response) {
	db('SFAADMIN.PARENT_CONTRIBUTION_FORMULA')
		.where({ ACADEMIC_YEAR: req.params.academicYear })
		.update(req.body)
		.then(() => res.send('entry updated'))
		.catch(function (e: any) {
			res.status(404).send('Not found');
			console.log(e);
		});
};

export function deleteParentContributionFormula(req: Request, res: Response) {
	db
		.delete()
		.from('SFAADMIN.PARENT_CONTRIBUTION_FORMULA')
		.where({ ACADEMIC_YEAR: req.params.academicYear })
		.then(() => res.send('entry deleted'))
		.catch(function (e: any) {
			res.status(404).send('Not found');
			console.log(e);
		});
};

// SFAI_FUNDING_HISTORY
export function getAllSfaiFundingHistory(req: Request, res: Response) {
	db
		.select('*')
		.from('SFAADMIN.SFAI_FUNDING_HISTORY')
		.then((sql_res: any) => res.send(sql_res))
		.catch(function (e: any) {
			res.status(400).send('Not found');
			console.log(e);
		});
};

export function getSfaiFundingHistory(req: Request, res: Response) {
	db
		.select('*')
		.from('SFAADMIN.SFAI_FUNDING_HISTORY')
		.where({ STUDENT_ID: req.params.studentId })
		.then((sql_res: any) => res.send(sql_res))
		.catch(function (e: any) {
			res.status(400).send('Not found');
			console.log(e);
		});
};

export function postSfaiFundingHistory(req: Request, res: Response) {
	console.log(req.body);
	db
		.raw(
			'SELECT max(STUDENT_ID) as STUDENT_ID FROM SFAADMIN.SFAI_FUNDING_HISTORY'
		)
		.then((sql_res: any) => {
			console.log(sql_res);
			req.body.STUDENT_ID = sql_res[0].STUDENT_ID + 1;
			console.log(req.body);
			db('SFAADMIN.SFAI_FUNDING_HISTORY')
				.insert(req.body)
				.then(() => res.send('entry updated'))
				.catch(function (e: any) {
					res.status(400).send('Not found');
					console.log(e);
				});
		})
		.catch(function (e: any) {
			res.status(400).send('Not Found');
			console.log(e);
		});
};

export function putSfaiFundingHistory(req: Request, res: Response) {
	db('SFAADMIN.SFAI_FUNDING_HISTORY')
		.where({ STUDENT_ID: req.params.studentId })
		.update(req.body)
		.then(() => res.send('entry updated'))
		.catch(function (e: any) {
			res.status(404).send('Not found');
			console.log(e);
		});
};

export function deleteSfaiFundingHistory(req: Request, res: Response) {
	db
		.delete()
		.from('SFAADMIN.SFAI_FUNDING_HISTORY')
		.where({ STUDENT_ID: req.params.studentId })
		.then(() => res.send('entry deleted'))
		.catch(function (e: any) {
			res.status(404).send('Not found');
			console.log(e);
		});
};

// PARENT_DEPENDENT
export function getAllParentDependent(req: Request, res: Response) {
	db
		.select('*')
		.from('SFAADMIN.PARENT_DEPENDENT')
		.then((sql_res: any) => res.send(sql_res))
		.catch(function (e: any) {
			res.status(400).send('Not found');
			console.log(e);
		});
};

export function getParentDependent(req: Request, res: Response) {
	db
		.select('*')
		.from('SFAADMIN.PARENT_DEPENDENT')
		.where({ PARENT_DEPENDENT_ID: req.params.parentDependentId })
		.then((sql_res: any) => res.send(sql_res))
		.catch(function (e: any) {
			res.status(400).send('Not found');
			console.log(e);
		});
};

export function postParentDependent(req: Request, res: Response) {
	console.log(req.body);
	db
		.raw(
			'SELECT max(PARENT_DEPENDENT_ID) as PARENT_DEPENDENT_ID FROM SFAADMIN.PARENT_DEPENDENT'
		)
		.then((sql_res: any) => {
			console.log(sql_res);
			req.body.PARENT_DEPENDENT_ID = sql_res[0].PARENT_DEPENDENT_ID + 1;
			console.log(req.body);
			db('SFAADMIN.PARENT_DEPENDENT')
				.insert(req.body)
				.then(() => res.send('entry updated'))
				.catch(function (e: any) {
					res.status(400).send('Not found');
					console.log(e);
				});
		})
		.catch(function (e: any) {
			res.status(400).send('Not Found');
			console.log(e);
		});
};

export function putParentDependent(req: Request, res: Response) {
	db('SFAADMIN.PARENT_DEPENDENT')
		.where({ PARENT_DEPENDENT_ID: req.params.parentDependentId })
		.update(req.body)
		.then(() => res.send('entry updated'))
		.catch(function (e: any) {
			res.status(404).send('Not found');
			console.log(e);
		});
};

export function deleteParentDependent(req: Request, res: Response) {
	db
		.delete()
		.from('SFAADMIN.PARENT_DEPENDENT')
		.where({ PARENT_DEPENDENT_ID: req.params.parentDependentId })
		.then(() => res.send('entry deleted'))
		.catch(function (e: any) {
			res.status(404).send('Not found');
			console.log(e);
		});
};

// STEP_CHANGE_REASONS
export function getAllStepChangeReasons(req: Request, res: Response) {
	db
		.select('*')
		.from('SFAADMIN.STEP_CHANGE_REASONS')
		.then((sql_res: any) => res.send(sql_res))
		.catch(function (e: any) {
			res.status(400).send('Not found');
			console.log(e);
		});
};

export function getStepChangeReasons(req: Request, res: Response) {
	db
		.select('*')
		.from('SFAADMIN.STEP_CHANGE_REASONS')
		.where({ STUDENT_ID: req.params.studentId })
		.then((sql_res: any) => res.send(sql_res))
		.catch(function (e: any) {
			res.status(400).send('Not found');
			console.log(e);
		});
};

export function postStepChangeReasons(req: Request, res: Response) {
	console.log(req.body);
	db
		.raw(
			'SELECT max(STUDENT_ID) as STUDENT_ID FROM SFAADMIN.STEP_CHANGE_REASONS'
		)
		.then((sql_res: any) => {
			console.log(sql_res);
			req.body.STUDENT_ID = sql_res[0].STUDENT_ID + 1;
			console.log(req.body);
			db('SFAADMIN.STEP_CHANGE_REASONS')
				.insert(req.body)
				.then(() => res.send('entry updated'))
				.catch(function (e: any) {
					res.status(400).send('Not found');
					console.log(e);
				});
		})
		.catch(function (e: any) {
			res.status(400).send('Not Found');
			console.log(e);
		});
};

export function putStepChangeReasons(req: Request, res: Response) {
	db('SFAADMIN.STEP_CHANGE_REASONS')
		.where({ STUDENT_ID: req.params.studentId })
		.update(req.body)
		.then(() => res.send('entry updated'))
		.catch(function (e: any) {
			res.status(404).send('Not found');
			console.log(e);
		});
};

export function deleteStepChangeReasons(req: Request, res: Response) {
	db
		.delete()
		.from('SFAADMIN.STEP_CHANGE_REASONS')
		.where({ STUDENT_ID: req.params.studentId })
		.then(() => res.send('entry deleted'))
		.catch(function (e: any) {
			res.status(404).send('Not found');
			console.log(e);
		});
};

// sysdiagrams
export function getAllSysdiagrams(req: Request, res: Response) {
	db
		.select('*')
		.from('dbo.sysdiagrams')
		.then((sql_res: any) => res.send(sql_res))
		.catch(function (e: any) {
			res.status(400).send('Not found');
			console.log(e);
		});
};

export function getSysdiagrams(req: Request, res: Response) {
	db
		.select('*')
		.from('dbo.sysdiagrams')
		.where({ name: req.params.name })
		.then((sql_res: any) => res.send(sql_res))
		.catch(function (e: any) {
			res.status(400).send('Not found');
			console.log(e);
		});
};

export function postSysdiagrams(req: Request, res: Response) {
	console.log(req.body);
	db
		.raw('SELECT max(name) as name FROM dbo.sysdiagrams')
		.then((sql_res: any) => {
			console.log(sql_res);
			req.body.name = sql_res[0].name + 1;
			console.log(req.body);
			db('dbo.sysdiagrams')
				.insert(req.body)
				.then(() => res.send('entry updated'))
				.catch(function (e: any) {
					res.status(400).send('Not found');
					console.log(e);
				});
		})
		.catch(function (e: any) {
			res.status(400).send('Not Found');
			console.log(e);
		});
};

export function putSysdiagrams(req: Request, res: Response) {
	db('dbo.sysdiagrams')
		.where({ name: req.params.name })
		.update(req.body)
		.then(() => res.send('entry updated'))
		.catch(function (e: any) {
			res.status(404).send('Not found');
			console.log(e);
		});
};

export function deleteSysdiagrams(req: Request, res: Response) {
	db
		.delete()
		.from('dbo.sysdiagrams')
		.where({ name: req.params.name })
		.then(() => res.send('entry deleted'))
		.catch(function (e: any) {
			res.status(404).send('Not found');
			console.log(e);
		});
};

// PARENT_RESIDENT
export function getAllParentResident(req: Request, res: Response) {
	db
		.select('*')
		.from('SFAADMIN.PARENT_RESIDENT')
		.then((sql_res: any) => res.send(sql_res))
		.catch(function (e: any) {
			res.status(400).send('Not found');
			console.log(e);
		});
};

export function getParentResident(req: Request, res: Response) {
	db
		.select('*')
		.from('SFAADMIN.PARENT_RESIDENT')
		.where({ PARENT_RESIDENT_ID: req.params.parentResidentId })
		.then((sql_res: any) => res.send(sql_res))
		.catch(function (e: any) {
			res.status(400).send('Not found');
			console.log(e);
		});
};

export function postParentResident(req: Request, res: Response) {
	console.log(req.body);
	db
		.raw(
			'SELECT max(PARENT_RESIDENT_ID) as PARENT_RESIDENT_ID FROM SFAADMIN.PARENT_RESIDENT'
		)
		.then((sql_res: any) => {
			console.log(sql_res);
			req.body.PARENT_RESIDENT_ID = sql_res[0].PARENT_RESIDENT_ID + 1;
			console.log(req.body);
			db('SFAADMIN.PARENT_RESIDENT')
				.insert(req.body)
				.then(() => res.send('entry updated'))
				.catch(function (e: any) {
					res.status(400).send('Not found');
					console.log(e);
				});
		})
		.catch(function (e: any) {
			res.status(400).send('Not Found');
			console.log(e);
		});
};

export function putParentResident(req: Request, res: Response) {
	db('SFAADMIN.PARENT_RESIDENT')
		.where({ PARENT_RESIDENT_ID: req.params.parentResidentId })
		.update(req.body)
		.then(() => res.send('entry updated'))
		.catch(function (e: any) {
			res.status(404).send('Not found');
			console.log(e);
		});
};

export function deleteParentResident(req: Request, res: Response) {
	db
		.delete()
		.from('SFAADMIN.PARENT_RESIDENT')
		.where({ PARENT_RESIDENT_ID: req.params.parentResidentId })
		.then(() => res.send('entry deleted'))
		.catch(function (e: any) {
			res.status(404).send('Not found');
			console.log(e);
		});
};

// VW_APPLICATION_REQUIREMENTS
export function getAllVwApplicationRequirements(req: Request, res: Response) {
	db
		.select('*')
		.from('SFAADMIN.VW_APPLICATION_REQUIREMENTS')
		.then((sql_res: any) => res.send(sql_res))
		.catch(function (e: any) {
			res.status(400).send('Not found');
			console.log(e);
		});
};

export function getVwApplicationRequirements(req: Request, res: Response) {
	db
		.select('*')
		.from('SFAADMIN.VW_APPLICATION_REQUIREMENTS')
		.where({ HISTORY_DETAIL_ID: req.params.historyDetailId })
		.then((sql_res: any) => res.send(sql_res))
		.catch(function (e: any) {
			res.status(400).send('Not found');
			console.log(e);
		});
};

export function postVwApplicationRequirements(req: Request, res: Response) {
	console.log(req.body);
	db
		.raw(
			'SELECT max(HISTORY_DETAIL_ID) as HISTORY_DETAIL_ID FROM SFAADMIN.VW_APPLICATION_REQUIREMENTS'
		)
		.then((sql_res: any) => {
			console.log(sql_res);
			req.body.HISTORY_DETAIL_ID = sql_res[0].HISTORY_DETAIL_ID + 1;
			console.log(req.body);
			db('SFAADMIN.VW_APPLICATION_REQUIREMENTS')
				.insert(req.body)
				.then(() => res.send('entry updated'))
				.catch(function (e: any) {
					res.status(400).send('Not found');
					console.log(e);
				});
		})
		.catch(function (e: any) {
			res.status(400).send('Not Found');
			console.log(e);
		});
};

export function putVwApplicationRequirements(req: Request, res: Response) {
	db('SFAADMIN.VW_APPLICATION_REQUIREMENTS')
		.where({ HISTORY_DETAIL_ID: req.params.historyDetailId })
		.update(req.body)
		.then(() => res.send('entry updated'))
		.catch(function (e: any) {
			res.status(404).send('Not found');
			console.log(e);
		});
};

export function deleteVwApplicationRequirements(req: Request, res: Response) {
	db
		.delete()
		.from('SFAADMIN.VW_APPLICATION_REQUIREMENTS')
		.where({ HISTORY_DETAIL_ID: req.params.historyDetailId })
		.then(() => res.send('entry deleted'))
		.catch(function (e: any) {
			res.status(404).send('Not found');
			console.log(e);
		});
};

// PART_TIME_REASON
export function getAllPartTimeReason(req: Request, res: Response) {
	db
		.select('*')
		.from('SFAADMIN.PART_TIME_REASON')
		.then((sql_res: any) => res.send(sql_res))
		.catch(function (e: any) {
			res.status(400).send('Not found');
			console.log(e);
		});
};

export function getPartTimeReason(req: Request, res: Response) {
	db
		.select('*')
		.from('SFAADMIN.PART_TIME_REASON')
		.where({ PART_TIME_REASON_ID: req.params.partTimeReasonId })
		.then((sql_res: any) => res.send(sql_res))
		.catch(function (e: any) {
			res.status(400).send('Not found');
			console.log(e);
		});
};

export function postPartTimeReason(req: Request, res: Response) {
	console.log(req.body);
	db
		.raw(
			'SELECT max(PART_TIME_REASON_ID) as PART_TIME_REASON_ID FROM SFAADMIN.PART_TIME_REASON'
		)
		.then((sql_res: any) => {
			console.log(sql_res);
			req.body.PART_TIME_REASON_ID = sql_res[0].PART_TIME_REASON_ID + 1;
			console.log(req.body);
			db('SFAADMIN.PART_TIME_REASON')
				.insert(req.body)
				.then(() => res.send('entry updated'))
				.catch(function (e: any) {
					res.status(400).send('Not found');
					console.log(e);
				});
		})
		.catch(function (e: any) {
			res.status(400).send('Not Found');
			console.log(e);
		});
};

export function putPartTimeReason(req: Request, res: Response) {
	db('SFAADMIN.PART_TIME_REASON')
		.where({ PART_TIME_REASON_ID: req.params.partTimeReasonId })
		.update(req.body)
		.then(() => res.send('entry updated'))
		.catch(function (e: any) {
			res.status(404).send('Not found');
			console.log(e);
		});
};

export function deletePartTimeReason(req: Request, res: Response) {
	db
		.delete()
		.from('SFAADMIN.PART_TIME_REASON')
		.where({ PART_TIME_REASON_ID: req.params.partTimeReasonId })
		.then(() => res.send('entry deleted'))
		.catch(function (e: any) {
			res.status(404).send('Not found');
			console.log(e);
		});
};

// YEA_DISTINCT
export function getAllYeaDistinct(req: Request, res: Response) {
	db
		.select('*')
		.from('SFAADMIN.YEA_DISTINCT')
		.then((sql_res: any) => res.send(sql_res))
		.catch(function (e: any) {
			res.status(400).send('Not found');
			console.log(e);
		});
};

export function getYeaDistinct(req: Request, res: Response) {
	db
		.select('*')
		.from('SFAADMIN.YEA_DISTINCT')
		.where({ YTID: req.params.ytid })
		.then((sql_res: any) => res.send(sql_res))
		.catch(function (e: any) {
			res.status(400).send('Not found');
			console.log(e);
		});
};

export function postYeaDistinct(req: Request, res: Response) {
	console.log(req.body);
	db
		.raw('SELECT max(YTID) as YTID FROM SFAADMIN.YEA_DISTINCT')
		.then((sql_res: any) => {
			console.log(sql_res);
			req.body.YTID = sql_res[0].YTID + 1;
			console.log(req.body);
			db('SFAADMIN.YEA_DISTINCT')
				.insert(req.body)
				.then(() => res.send('entry updated'))
				.catch(function (e: any) {
					res.status(400).send('Not found');
					console.log(e);
				});
		})
		.catch(function (e: any) {
			res.status(400).send('Not Found');
			console.log(e);
		});
};

export function putYeaDistinct(req: Request, res: Response) {
	db('SFAADMIN.YEA_DISTINCT')
		.where({ YTID: req.params.ytid })
		.update(req.body)
		.then(() => res.send('entry updated'))
		.catch(function (e: any) {
			res.status(404).send('Not found');
			console.log(e);
		});
};

export function deleteYeaDistinct(req: Request, res: Response) {
	db
		.delete()
		.from('SFAADMIN.YEA_DISTINCT')
		.where({ YTID: req.params.ytid })
		.then(() => res.send('entry deleted'))
		.catch(function (e: any) {
			res.status(404).send('Not found');
			console.log(e);
		});
};

// PERIOD
export function getAllPeriod(req: Request, res: Response) {
	db
		.select('*')
		.from('SFAADMIN.PERIOD')
		.then((sql_res: any) => res.send(sql_res))
		.catch(function (e: any) {
			res.status(400).send('Not found');
			console.log(e);
		});
};

export function getPeriod(req: Request, res: Response) {
	db
		.select('*')
		.from('SFAADMIN.PERIOD')
		.where({ PERIOD_ID: req.params.periodId })
		.then((sql_res: any) => res.send(sql_res))
		.catch(function (e: any) {
			res.status(400).send('Not found');
			console.log(e);
		});
};

export function postPeriod(req: Request, res: Response) {
	console.log(req.body);
	db
		.raw('SELECT max(PERIOD_ID) as PERIOD_ID FROM SFAADMIN.PERIOD')
		.then((sql_res: any) => {
			console.log(sql_res);
			req.body.PERIOD_ID = sql_res[0].PERIOD_ID + 1;
			console.log(req.body);
			db('SFAADMIN.PERIOD')
				.insert(req.body)
				.then(() => res.send('entry updated'))
				.catch(function (e: any) {
					res.status(400).send('Not found');
					console.log(e);
				});
		})
		.catch(function (e: any) {
			res.status(400).send('Not Found');
			console.log(e);
		});
};

export function putPeriod(req: Request, res: Response) {
	db('SFAADMIN.PERIOD')
		.where({ PERIOD_ID: req.params.periodId })
		.update(req.body)
		.then(() => res.send('entry updated'))
		.catch(function (e: any) {
			res.status(404).send('Not found');
			console.log(e);
		});
};

export function deletePeriod(req: Request, res: Response) {
	db
		.delete()
		.from('SFAADMIN.PERIOD')
		.where({ PERIOD_ID: req.params.periodId })
		.then(() => res.send('entry deleted'))
		.catch(function (e: any) {
			res.status(404).send('Not found');
			console.log(e);
		});
};

// YG_STATS_EXPORT
export function getAllYgStatsExport(req: Request, res: Response) {
	db
		.select('*')
		.from('SFAADMIN.YG_STATS_EXPORT')
		.then((sql_res: any) => res.send(sql_res))
		.catch(function (e: any) {
			res.status(400).send('Not found');
			console.log(e);
		});
};

export function getYgStatsExport(req: Request, res: Response) {
	db
		.select('*')
		.from('SFAADMIN.YG_STATS_EXPORT')
		.where({ STUDENT_ID: req.params.studentId })
		.then((sql_res: any) => res.send(sql_res))
		.catch(function (e: any) {
			res.status(400).send('Not found');
			console.log(e);
		});
};

export function postYgStatsExport(req: Request, res: Response) {
	console.log(req.body);
	db
		.raw('SELECT max(STUDENT_ID) as STUDENT_ID FROM SFAADMIN.YG_STATS_EXPORT')
		.then((sql_res: any) => {
			console.log(sql_res);
			req.body.STUDENT_ID = sql_res[0].STUDENT_ID + 1;
			console.log(req.body);
			db('SFAADMIN.YG_STATS_EXPORT')
				.insert(req.body)
				.then(() => res.send('entry updated'))
				.catch(function (e: any) {
					res.status(400).send('Not found');
					console.log(e);
				});
		})
		.catch(function (e: any) {
			res.status(400).send('Not Found');
			console.log(e);
		});
};

export function putYgStatsExport(req: Request, res: Response) {
	db('SFAADMIN.YG_STATS_EXPORT')
		.where({ STUDENT_ID: req.params.studentId })
		.update(req.body)
		.then(() => res.send('entry updated'))
		.catch(function (e: any) {
			res.status(404).send('Not found');
			console.log(e);
		});
};

export function deleteYgStatsExport(req: Request, res: Response) {
	db
		.delete()
		.from('SFAADMIN.YG_STATS_EXPORT')
		.where({ STUDENT_ID: req.params.studentId })
		.then(() => res.send('entry deleted'))
		.catch(function (e: any) {
			res.status(404).send('Not found');
			console.log(e);
		});
};

// PORTAL_STATUS
export function getAllPortalStatus(req: Request, res: Response) {
	db
		.select('*')
		.from('SFAADMIN.PORTAL_STATUS')
		.then((sql_res: any) => res.send(sql_res))
		.catch(function (e: any) {
			res.status(400).send('Not found');
			console.log(e);
		});
};

export function getPortalStatus(req: Request, res: Response) {
	db
		.select('*')
		.from('SFAADMIN.PORTAL_STATUS')
		.where({ PORTAL_STATUS_ID: req.params.portalStatusId })
		.then((sql_res: any) => res.send(sql_res))
		.catch(function (e: any) {
			res.status(400).send('Not found');
			console.log(e);
		});
};

export function postPortalStatus(req: Request, res: Response) {
	console.log(req.body);
	db
		.raw(
			'SELECT max(PORTAL_STATUS_ID) as PORTAL_STATUS_ID FROM SFAADMIN.PORTAL_STATUS'
		)
		.then((sql_res: any) => {
			console.log(sql_res);
			req.body.PORTAL_STATUS_ID = sql_res[0].PORTAL_STATUS_ID + 1;
			console.log(req.body);
			db('SFAADMIN.PORTAL_STATUS')
				.insert(req.body)
				.then(() => res.send('entry updated'))
				.catch(function (e: any) {
					res.status(400).send('Not found');
					console.log(e);
				});
		})
		.catch(function (e: any) {
			res.status(400).send('Not Found');
			console.log(e);
		});
};

export function putPortalStatus(req: Request, res: Response) {
	db('SFAADMIN.PORTAL_STATUS')
		.where({ PORTAL_STATUS_ID: req.params.portalStatusId })
		.update(req.body)
		.then(() => res.send('entry updated'))
		.catch(function (e: any) {
			res.status(404).send('Not found');
			console.log(e);
		});
};

export function deletePortalStatus(req: Request, res: Response) {
	db
		.delete()
		.from('SFAADMIN.PORTAL_STATUS')
		.where({ PORTAL_STATUS_ID: req.params.portalStatusId })
		.then(() => res.send('entry deleted'))
		.catch(function (e: any) {
			res.status(404).send('Not found');
			console.log(e);
		});
};

// PRESTUDY_EMPLOY_STATUS
export function getAllPrestudyEmployStatus(req: Request, res: Response) {
	db
		.select('*')
		.from('SFAADMIN.PRESTUDY_EMPLOY_STATUS')
		.then((sql_res: any) => res.send(sql_res))
		.catch(function (e: any) {
			res.status(400).send('Not found');
			console.log(e);
		});
};

export function getPrestudyEmployStatus(req: Request, res: Response) {
	db
		.select('*')
		.from('SFAADMIN.PRESTUDY_EMPLOY_STATUS')
		.where({ PRESTUDY_EMPLOY_STATUS_ID: req.params.prestudyEmployStatusId })
		.then((sql_res: any) => res.send(sql_res))
		.catch(function (e: any) {
			res.status(400).send('Not found');
			console.log(e);
		});
};

export function postPrestudyEmployStatus(req: Request, res: Response) {
	console.log(req.body);
	db
		.raw(
			'SELECT max(PRESTUDY_EMPLOY_STATUS_ID) as PRESTUDY_EMPLOY_STATUS_ID FROM SFAADMIN.PRESTUDY_EMPLOY_STATUS'
		)
		.then((sql_res: any) => {
			console.log(sql_res);
			req.body.PRESTUDY_EMPLOY_STATUS_ID =
				sql_res[0].PRESTUDY_EMPLOY_STATUS_ID + 1;
			console.log(req.body);
			db('SFAADMIN.PRESTUDY_EMPLOY_STATUS')
				.insert(req.body)
				.then(() => res.send('entry updated'))
				.catch(function (e: any) {
					res.status(400).send('Not found');
					console.log(e);
				});
		})
		.catch(function (e: any) {
			res.status(400).send('Not Found');
			console.log(e);
		});
};

export function putPrestudyEmployStatus(req: Request, res: Response) {
	db('SFAADMIN.PRESTUDY_EMPLOY_STATUS')
		.where({ PRESTUDY_EMPLOY_STATUS_ID: req.params.prestudyEmployStatusId })
		.update(req.body)
		.then(() => res.send('entry updated'))
		.catch(function (e: any) {
			res.status(404).send('Not found');
			console.log(e);
		});
};

export function deletePrestudyEmployStatus(req: Request, res: Response) {
	db
		.delete()
		.from('SFAADMIN.PRESTUDY_EMPLOY_STATUS')
		.where({ PRESTUDY_EMPLOY_STATUS_ID: req.params.prestudyEmployStatusId })
		.then(() => res.send('entry deleted'))
		.catch(function (e: any) {
			res.status(404).send('Not found');
			console.log(e);
		});
};

// PRESTUDY_TAX_RATE
export function getAllPrestudyTaxRate(req: Request, res: Response) {
	db
		.select('*')
		.from('SFAADMIN.PRESTUDY_TAX_RATE')
		.then((sql_res: any) => res.send(sql_res))
		.catch(function (e: any) {
			res.status(400).send('Not found');
			console.log(e);
		});
};

export function getPrestudyTaxRate(req: Request, res: Response) {
	db
		.select('*')
		.from('SFAADMIN.PRESTUDY_TAX_RATE')
		.where({ ACADEMIC_YEAR: req.params.academicYear })
		.then((sql_res: any) => res.send(sql_res))
		.catch(function (e: any) {
			res.status(400).send('Not found');
			console.log(e);
		});
};

export function postPrestudyTaxRate(req: Request, res: Response) {
	console.log(req.body);
	db
		.raw(
			'SELECT max(ACADEMIC_YEAR) as ACADEMIC_YEAR FROM SFAADMIN.PRESTUDY_TAX_RATE'
		)
		.then((sql_res: any) => {
			console.log(sql_res);
			req.body.ACADEMIC_YEAR = sql_res[0].ACADEMIC_YEAR + 1;
			console.log(req.body);
			db('SFAADMIN.PRESTUDY_TAX_RATE')
				.insert(req.body)
				.then(() => res.send('entry updated'))
				.catch(function (e: any) {
					res.status(400).send('Not found');
					console.log(e);
				});
		})
		.catch(function (e: any) {
			res.status(400).send('Not Found');
			console.log(e);
		});
};

export function putPrestudyTaxRate(req: Request, res: Response) {
	db('SFAADMIN.PRESTUDY_TAX_RATE')
		.where({ ACADEMIC_YEAR: req.params.academicYear })
		.update(req.body)
		.then(() => res.send('entry updated'))
		.catch(function (e: any) {
			res.status(404).send('Not found');
			console.log(e);
		});
};

export function deletePrestudyTaxRate(req: Request, res: Response) {
	db
		.delete()
		.from('SFAADMIN.PRESTUDY_TAX_RATE')
		.where({ ACADEMIC_YEAR: req.params.academicYear })
		.then(() => res.send('entry deleted'))
		.catch(function (e: any) {
			res.status(404).send('Not found');
			console.log(e);
		});
};

// PROGRAM
export function getAllProgram(req: Request, res: Response) {
	db
		.select('*')
		.from('SFAADMIN.PROGRAM')
		.then((sql_res: any) => res.send(sql_res))
		.catch(function (e: any) {
			res.status(400).send('Not found');
			console.log(e);
		});
};

export function getProgram(req: Request, res: Response) {
	db
		.select('*')
		.from('SFAADMIN.PROGRAM')
		.where({ PROGRAM_ID: req.params.programId })
		.then((sql_res: any) => res.send(sql_res))
		.catch(function (e: any) {
			res.status(400).send('Not found');
			console.log(e);
		});
};

export function postProgram(req: Request, res: Response) {
	console.log(req.body);
	db
		.raw('SELECT max(PROGRAM_ID) as PROGRAM_ID FROM SFAADMIN.PROGRAM')
		.then((sql_res: any) => {
			console.log(sql_res);
			req.body.PROGRAM_ID = sql_res[0].PROGRAM_ID + 1;
			console.log(req.body);
			db('SFAADMIN.PROGRAM')
				.insert(req.body)
				.then(() => res.send('entry updated'))
				.catch(function (e: any) {
					res.status(400).send('Not found');
					console.log(e);
				});
		})
		.catch(function (e: any) {
			res.status(400).send('Not Found');
			console.log(e);
		});
};

export function putProgram(req: Request, res: Response) {
	db('SFAADMIN.PROGRAM')
		.where({ PROGRAM_ID: req.params.programId })
		.update(req.body)
		.then(() => res.send('entry updated'))
		.catch(function (e: any) {
			res.status(404).send('Not found');
			console.log(e);
		});
};

export function deleteProgram(req: Request, res: Response) {
	db
		.delete()
		.from('SFAADMIN.PROGRAM')
		.where({ PROGRAM_ID: req.params.programId })
		.then(() => res.send('entry deleted'))
		.catch(function (e: any) {
			res.status(404).send('Not found');
			console.log(e);
		});
};

// PROVINCE
export function getAllProvince(req: Request, res: Response) {
	db
		.select('*')
		.from('SFAADMIN.PROVINCE')
		.then((sql_res: any) => res.send(sql_res))
		.catch(function (e: any) {
			res.status(400).send('Not found');
			console.log(e);
		});
};

export function getProvince(req: Request, res: Response) {
	db
		.select('*')
		.from('SFAADMIN.PROVINCE')
		.where({ PROVINCE_ID: req.params.provinceId })
		.then((sql_res: any) => res.send(sql_res))
		.catch(function (e: any) {
			res.status(400).send('Not found');
			console.log(e);
		});
};

export function postProvince(req: Request, res: Response) {
	console.log(req.body);
	db
		.raw('SELECT max(PROVINCE_ID) as PROVINCE_ID FROM SFAADMIN.PROVINCE')
		.then((sql_res: any) => {
			console.log(sql_res);
			req.body.PROVINCE_ID = sql_res[0].PROVINCE_ID + 1;
			console.log(req.body);
			db('SFAADMIN.PROVINCE')
				.insert(req.body)
				.then(() => res.send('entry updated'))
				.catch(function (e: any) {
					res.status(400).send('Not found');
					console.log(e);
				});
		})
		.catch(function (e: any) {
			res.status(400).send('Not Found');
			console.log(e);
		});
};

export function putProvince(req: Request, res: Response) {
	db('SFAADMIN.PROVINCE')
		.where({ PROVINCE_ID: req.params.provinceId })
		.update(req.body)
		.then(() => res.send('entry updated'))
		.catch(function (e: any) {
			res.status(404).send('Not found');
			console.log(e);
		});
};

export function deleteProvince(req: Request, res: Response) {
	db
		.delete()
		.from('SFAADMIN.PROVINCE')
		.where({ PROVINCE_ID: req.params.provinceId })
		.then(() => res.send('entry deleted'))
		.catch(function (e: any) {
			res.status(404).send('Not found');
			console.log(e);
		});
};

// RELATIONSHIP
export function getAllRelationship(req: Request, res: Response) {
	db
		.select('*')
		.from('SFAADMIN.RELATIONSHIP')
		.then((sql_res: any) => res.send(sql_res))
		.catch(function (e: any) {
			res.status(400).send('Not found');
			console.log(e);
		});
};

export function getRelationship(req: Request, res: Response) {
	db
		.select('*')
		.from('SFAADMIN.RELATIONSHIP')
		.where({ RELATIONSHIP_ID: req.params.relationshipId })
		.then((sql_res: any) => res.send(sql_res))
		.catch(function (e: any) {
			res.status(400).send('Not found');
			console.log(e);
		});
};

export function postRelationship(req: Request, res: Response) {
	console.log(req.body);
	db
		.raw(
			'SELECT max(RELATIONSHIP_ID) as RELATIONSHIP_ID FROM SFAADMIN.RELATIONSHIP'
		)
		.then((sql_res: any) => {
			console.log(sql_res);
			req.body.RELATIONSHIP_ID = sql_res[0].RELATIONSHIP_ID + 1;
			console.log(req.body);
			db('SFAADMIN.RELATIONSHIP')
				.insert(req.body)
				.then(() => res.send('entry updated'))
				.catch(function (e: any) {
					res.status(400).send('Not found');
					console.log(e);
				});
		})
		.catch(function (e: any) {
			res.status(400).send('Not Found');
			console.log(e);
		});
};

export function putRelationship(req: Request, res: Response) {
	db('SFAADMIN.RELATIONSHIP')
		.where({ RELATIONSHIP_ID: req.params.relationshipId })
		.update(req.body)
		.then(() => res.send('entry updated'))
		.catch(function (e: any) {
			res.status(404).send('Not found');
			console.log(e);
		});
};

export function deleteRelationship(req: Request, res: Response) {
	db
		.delete()
		.from('SFAADMIN.RELATIONSHIP')
		.where({ RELATIONSHIP_ID: req.params.relationshipId })
		.then(() => res.send('entry deleted'))
		.catch(function (e: any) {
			res.status(404).send('Not found');
			console.log(e);
		});
};

// REPORT_EXPENSE_CATEGORY
export function getAllReportExpenseCategory(req: Request, res: Response) {
	db
		.select('*')
		.from('SFAADMIN.REPORT_EXPENSE_CATEGORY')
		.then((sql_res: any) => res.send(sql_res))
		.catch(function (e: any) {
			res.status(400).send('Not found');
			console.log(e);
		});
};

export function getReportExpenseCategory(req: Request, res: Response) {
	db
		.select('*')
		.from('SFAADMIN.REPORT_EXPENSE_CATEGORY')
		.where({ REPORT_EXPENSE_CATEGORY_ID: req.params.reportExpenseCategoryId })
		.then((sql_res: any) => res.send(sql_res))
		.catch(function (e: any) {
			res.status(400).send('Not found');
			console.log(e);
		});
};

export function postReportExpenseCategory(req: Request, res: Response) {
	console.log(req.body);
	db
		.raw(
			'SELECT max(REPORT_EXPENSE_CATEGORY_ID) as REPORT_EXPENSE_CATEGORY_ID FROM SFAADMIN.REPORT_EXPENSE_CATEGORY'
		)
		.then((sql_res: any) => {
			console.log(sql_res);
			req.body.REPORT_EXPENSE_CATEGORY_ID =
				sql_res[0].REPORT_EXPENSE_CATEGORY_ID + 1;
			console.log(req.body);
			db('SFAADMIN.REPORT_EXPENSE_CATEGORY')
				.insert(req.body)
				.then(() => res.send('entry updated'))
				.catch(function (e: any) {
					res.status(400).send('Not found');
					console.log(e);
				});
		})
		.catch(function (e: any) {
			res.status(400).send('Not Found');
			console.log(e);
		});
};

export function putReportExpenseCategory(req: Request, res: Response) {
	db('SFAADMIN.REPORT_EXPENSE_CATEGORY')
		.where({ REPORT_EXPENSE_CATEGORY_ID: req.params.reportExpenseCategoryId })
		.update(req.body)
		.then(() => res.send('entry updated'))
		.catch(function (e: any) {
			res.status(404).send('Not found');
			console.log(e);
		});
};

export function deleteReportExpenseCategory(req: Request, res: Response) {
	db
		.delete()
		.from('SFAADMIN.REPORT_EXPENSE_CATEGORY')
		.where({ REPORT_EXPENSE_CATEGORY_ID: req.params.reportExpenseCategoryId })
		.then(() => res.send('entry deleted'))
		.catch(function (e: any) {
			res.status(404).send('Not found');
			console.log(e);
		});
};

// REQUEST_REQUIREMENT
export function getAllRequestRequirement(req: Request, res: Response) {
	db
		.select('*')
		.from('SFAADMIN.REQUEST_REQUIREMENT')
		.then((sql_res: any) => res.send(sql_res))
		.catch(function (e: any) {
			res.status(400).send('Not found');
			console.log(e);
		});
};

export function getRequestRequirement(req: Request, res: Response) {
	db
		.select('*')
		.from('SFAADMIN.REQUEST_REQUIREMENT')
		.where({ REQUEST_TYPE_ID: req.params.requestTypeId })
		.then((sql_res: any) => res.send(sql_res))
		.catch(function (e: any) {
			res.status(400).send('Not found');
			console.log(e);
		});
};

export function postRequestRequirement(req: Request, res: Response) {
	console.log(req.body);
	db
		.raw(
			'SELECT max(REQUEST_TYPE_ID) as REQUEST_TYPE_ID FROM SFAADMIN.REQUEST_REQUIREMENT'
		)
		.then((sql_res: any) => {
			console.log(sql_res);
			req.body.REQUEST_TYPE_ID = sql_res[0].REQUEST_TYPE_ID + 1;
			console.log(req.body);
			db('SFAADMIN.REQUEST_REQUIREMENT')
				.insert(req.body)
				.then(() => res.send('entry updated'))
				.catch(function (e: any) {
					res.status(400).send('Not found');
					console.log(e);
				});
		})
		.catch(function (e: any) {
			res.status(400).send('Not Found');
			console.log(e);
		});
};

export function putRequestRequirement(req: Request, res: Response) {
	db('SFAADMIN.REQUEST_REQUIREMENT')
		.where({ REQUEST_TYPE_ID: req.params.requestTypeId })
		.update(req.body)
		.then(() => res.send('entry updated'))
		.catch(function (e: any) {
			res.status(404).send('Not found');
			console.log(e);
		});
};

export function deleteRequestRequirement(req: Request, res: Response) {
	db
		.delete()
		.from('SFAADMIN.REQUEST_REQUIREMENT')
		.where({ REQUEST_TYPE_ID: req.params.requestTypeId })
		.then(() => res.send('entry deleted'))
		.catch(function (e: any) {
			res.status(404).send('Not found');
			console.log(e);
		});
};

// REQUEST_REQUIREMENT
export function getAllProgramDivision(req: Request, res: Response) {
	res.send([
		{ value: 1, text: 'Unknown: 1' },
		{ value: 2, text: 'Unknown: 2' },
		{ value: 0, text: 'Unknown: 0' },
		{ value: null, text: 'Unknown: NULL' },
	]);
};
