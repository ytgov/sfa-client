import { DB_CONFIG } from "../config";
import express, { Request, Response } from "express";
import knex from "knex";

const db = knex(DB_CONFIG)

export const sfaDomainRouter = express.Router();

sfaDomainRouter.get('/profile', function (req: Request, res: Response) {
	db
		.select('*')
		.from('SFAADMIN.STUDENT')
		.where({ SCHOOL_EMAIL: req.user.email })
		.then((sql_res: any) => res.status(200).json(sql_res))
		.catch(function (e: any) {
			res.status(400).json('Not found');
			console.log(e);
		});
});

sfaDomainRouter.get('/profile/:id', async function (req: Request, res: Response) {
	try {
		let result = await db('SFAADMIN.STUDENT')
			.select('*')
			.where('STUDENT_ID', '=', req.params.id);
		res.status(200).json(result);
	} catch (error: any) {
		console.log(error);
		res.status(500).json('Internal Server Error');
	}
});

sfaDomainRouter.put('/profile/:id', async function (req: Request, res: Response) {
	try {
		await db('SFAADMIN.STUDENT')
			.where('STUDENT_ID', '=', req.params.id)
			.update(req.body);
		console.log('Entry updated', req.body);
		res.status(200).json('Updated successful');
	} catch (error: any) {
		console.log(error.name, error.detail);
		res.status(500).json(error);
	}
});

sfaDomainRouter.put('/profile', async function (req: Request, res: Response) {
	try {
		await db('SFAADMIN.STUDENT')
			.where('SCHOOL_EMAIL', '=', req.user.email)
			.update(req.body);
		console.log('Entry updated', req.body);
		res.status(200).json('Updated successful');
	} catch (error: any) {
		console.log(error.name, error.detail);
		res.status(500).json(error);
	}
});

sfaDomainRouter.post('/grantEligibility', function (req: Request, res: Response) {
	const data = flatten(req.body);
	data.student_id = req.body.student_id;
	db('SFAADMIN.ELIGIBILITY_CHECKER')
		.insert(data)
		.then((sql_res: any) => {
			res.status(200).json('Insert Successful');
		})
		.catch(function (e: any) {
			res.json('Insert Failed');
			console.log(e);
		});
});

sfaDomainRouter.put('/grantEligibility', async function (req: Request, res: Response) {
	const data = flatten(req.body);
	data.student_id = req.body.student_id;
	console.log(data);
	db
		.from('SFAADMIN.ELIGIBILITY_CHECKER')
		.where({ student_id: req.body.student_id })
		.update(flatten(req.body))
		.returning('*')
		.then((sql_res: any) => {
			if (sql_res.length > 0) res.status(200).json('Update Successful');
			else res.status(400).json('Update Failed');
		})
		.catch(function (e: any) {
			res.status(400).json('Update Failed');
			console.log(e);
		});
});

sfaDomainRouter.get('/grantEligibility', async function (req: Request, res: Response) {
	db
		.from('SFAADMIN.ELIGIBILITY_CHECKER')
		.where({ student_id: req.query.student_id })
		.then((sql_res: any) => res.status(200).json(unflatten(sql_res[0])))
		.catch(function (e: any) {
			res.status(400).json('Get Failed');
			console.log(e);
		});
});

sfaDomainRouter.delete('/grantEligibility', async function (req: Request, res: Response) {
	db
		.from('SFAADMIN.ELIGIBILITY_CHECKER')
		.where({ student_id: req.query.student_id })
		.then((sql_res: any) => res.status(200).json('Entry Deleted'))
		.catch(function (e: any) {
			res.status(400).json('Delete Failed');
			console.log(e);
		});
});

const eligiblityPrefixes = [
	'citizenship',
	'scholarship',
	'studies',
	'residence',
	'designated_institution',
	'program',
	'marital',
	'parent',
	'independentstudent',
	'dependant_student_juristiction',
	'singleparentjuristiction',
	'parttimeeligibility',
	'fulltimeeligibility',
	'disabilities',
	'yukon_excellence_award',
];

function flatten(data: any): any {
	const result: ElChk = {}

	for (const i of Object.keys(data)) {
		if (typeof data[i] === 'object') {
			for (const [ki, kj] of Object.entries(data[i])) {
				result[`${i}_${ki}`] = kj;
			}
		}
	}
	return result;
};

interface ElChk {
	[key: string]: any;
}

function unflatten(data: any): any {
	const result: ElChk = {}

	for (let entry in data) {
		for (const prefix of eligiblityPrefixes) {
			if (entry.startsWith(prefix)) {
				const sufix = entry.substr(prefix.length + 1);
				if (!result[prefix]) {
					result[prefix] = {};
				}
				result[prefix][sufix] = data[entry];
			}
		}
	}

	return result;
};
