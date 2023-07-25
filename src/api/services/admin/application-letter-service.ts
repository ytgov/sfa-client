
import { Application } from 'models';
import { renderViewAsPdf } from '../../utils/express-handlebars-pdf-client';
import db from '../../db/db-client'

export class ApplicationLetterService {
    private applicationId: number;

    constructor({ applicationId } : { applicationId: number; }) {
        this.applicationId = applicationId;
    }

    async generateApprovalLetter(): Promise<Buffer> {
        const application = await db<Application>('sfa.applications').where({id: this.applicationId}).first();
        if (!application) {
            Promise.reject(new Error('Application not found'));
        }

        return renderViewAsPdf(
            './templates/admin/application-letter/approval',
            { title: 'Application Approval Letter' }
        )
    }

    ////
    // See https://xkcd.com/1179/ -> https://en.wikipedia.org/wiki/ISO_8601 for date format
    buildApprovalLetterFileName() {
        const formattedData = new Date().toISOString().slice(0, 10); // YYYYY-MM-DD
        return `Approval Letter, USER_LAST_NAME, ${formattedData}.pdf`
    }
}
