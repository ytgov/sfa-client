import knex, { Knex } from "knex";


export class InstitutionRules {
    readonly db: Knex;

    constructor(config: Knex.Config) {
        this.db = knex(config);
    }

    async applyApplicableRules(body: any, id: number = -1) {
        if (body.name) {
            let error = await this.validateName(body.name, id);

            if (error)
                return error
        }

        if (body.federal_institution_code) {
            body.federal_institution_code = body.federal_institution_code.toUpperCase();
            let error = await this.validateCode(body.federal_institution_code, id);

            if (error)
                return error
        }

        if (body.is_active) {
            let active = body.is_active == "true";
            let error = await this.validateIsActive(active, id);

            if (error)
                return error
        }
    }

    // institution name must be unique
    async validateName(newName: string, existingId = -1) {
        let results = await this.db("sfa.institution").where({ name: newName }).whereNot({ id: existingId });

        if (results.length > 0)
            return "This name is already in use";
    }

    // code must be unique per institution
    async validateCode(newCode: string, institutionId = -1) {
        let campusMatches = (await this.db("sfa.institution_campus")
            .where({ federal_institution_code: newCode })
            .whereNot({ institution_id: institutionId })
            .distinct("institution_id"))
            .map(i => i.institution_id);

        let instMatches = (await this.db("sfa.institution")
            .where({ federal_institution_code: newCode })
            .whereNot({ id: institutionId })
            .distinct("id"))
            .map(i => i.id);

        instMatches = instMatches.concat(campusMatches);

        if (instMatches.length > 0) {
            return "This Federal code already exists";
        }
    }

    // must have an active campus for institution to be active
    async validateIsActive(newValue: boolean, institutionId = -1) {
        let activeCampuses = await this.db("sfa.institution_campus").where({ institution_id: institutionId, is_active: true });

        if (newValue && activeCampuses.length == 0) {
            return "An institution can only be active if it has an active campus"
        }
    }

    async applyApplicableCampusRules(body: any, institutionId: number, campusId: number) {
        if (body.name) {
            let error = await this.validateCampusName(body.name, institutionId, campusId);

            if (error)
                return error
        }

        if (body.federal_institution_code) {
            body.federal_institution_code = body.federal_institution_code.toUpperCase();
            let error = await this.validateCampusCode(body.federal_institution_code, institutionId, campusId);

            if (error)
                return error
        }

        if (body.is_active) {
            let active = body.is_active == "true";
            let error = await this.validateCampusIsActive(active, institutionId, campusId);

            if (error)
                return error
        }
    }

    // institution name must be unique
    async validateCampusName(newName: string, institutionId: number, campusId = -1) {
        let results = await this.db("sfa.institution_campus")
            .where({ name: newName, institution_id: institutionId })
            .whereNot({ id: campusId });

        if (results.length > 0)
            return "A campus with this name already exists";
    }

    // code must be unique per institution
    async validateCampusCode(newCode: string, institutionId: number, campusId = -1) {
        let campusMatches = (await this.db("sfa.institution_campus")
            .where({ federal_institution_code: newCode })
            .whereNot({ institution_id: institutionId })
            .distinct("institution_id"))
            .map(i => i.institution_id);

        let instMatches = (await this.db("sfa.institution")
            .where({ federal_institution_code: newCode })
            .whereNot({ id: institutionId })
            .distinct("id"))
            .map(i => i.id);

        instMatches = instMatches.concat(campusMatches);

        if (instMatches.length > 0) {
            return "This Federal code already exists";
        }
    }

    // must have an active campus for institution to be active
    async validateCampusIsActive(newValue: boolean, institutionId: number, campusId = -1) {
        let activeCampuses = await this.db("sfa.institution_campus")
            .where({ institution_id: institutionId, is_active: true })
            .whereNot({ id: campusId });

        if (newValue == false && activeCampuses.length == 0) {
            await this.db("sfa.institution").where({ id: institutionId }).update({ is_active: false });
        }

        return true;
    }
}
