import { create } from 'express-handlebars';

import { Application } from 'models';
import { generatePDF } from "utils/pdf-generator";
import db from '../../db/db-client'

const hbs = create({
    layoutsDir: "templates/layouts",
    partialsDir: "templates/partials"
})

console.log("hbs", hbs)

export class ApplicationLetterService {
    private applicationId: number;

    constructor({ applicationId } : { applicationId: number; }) {
        this.applicationId = applicationId;
    }

    async generateApprovalLetter(): Promise<Buffer> {
        const application = await db<Application>('applications').where({id: this.applicationId}).first();
        if (!application) {
            Promise.reject(new Error('Application not found'));
        }

        const htmlToRenderAsPDF = await hbs.render(
            'admin/application-letter/approval',
            { title: 'Application Approval Letter' }
        );
        return generatePDF(htmlToRenderAsPDF)
    }

    ////
    // See https://xkcd.com/1179/ -> https://en.wikipedia.org/wiki/ISO_8601 for date format
    buildApprovalLetterFileName() {
        const formattedData = new Date().toISOString().slice(0, 10); // YYYYY-MM-DD
        return `Approval Letter, USER_LAST_NAME, ${formattedData}.pdf`
    }
}
