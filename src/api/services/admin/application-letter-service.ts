import { generatePDF } from "utils/pdf-generator";

export class ApplicationLetterService {
    private applicationId: number;

    constructor({ applicationId } : { applicationId: number; }) {
        this.applicationId = applicationId;
    }

    generateApprovalLetter(): Promise<Buffer> {
        // let item = await loadSingleAuthority(req, id);

        // if (item) {
        //   const PDF_TEMPLATE = fs.readFileSync(__dirname + "/../templates/pdf/FormBTemplate.html");

        //   (item as any).API_PORT = API_PORT;

        //   if (item.authority_type == "temporary") item.authority_type = "TEMPORARY";
        //   else if (item.authority_type == "acting") item.authority_type = "ACTING";
        //   else item.authority_type = "SUBSTANTIVE";

        //   let t = new ExpressHandlebars();

        //   const template = t.handlebars.compile(PDF_TEMPLATE.toString(), {});
        //   let data = template(item, {
        //     helpers: {
        //       eq: function (a1: string, a2: string) {
        //         return a1 == a2;
        //       },
        //     },
        //   });

        //   let name = CleanFilename(`${item.department_code}`);
        //   if (item.employee.name) name = `${name}-${CleanFilename(`${item.employee.name}`)}`;
        const htmlToRenderAsPDF = `
            <!DOCTYPE html>
            <html>
            <head>
                <title>Example Domain</title>
                <meta charset="utf-8">
                <meta http-equiv="Content-type" content="text/html; charset=UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1">
                <style type="text/css"></style>
            </head>
            <body>
            <div>
                <h1>Example Domain</h1>
                <p>This domain is for use in illustrative examples in documents. You may use this
                domain in literature without prior coordination or asking for permission.</p>
                <p><a href="https://www.iana.org/domains/example">More information...</a></p>
            </div>
            </body>
            </html>
        `
        return generatePDF(htmlToRenderAsPDF)
    }

    ////
    // See https://xkcd.com/1179/ -> https://en.wikipedia.org/wiki/ISO_8601 for date format
    buildApprovalLetterFileName() {
        const formattedData = new Date().toISOString().slice(0, 10); // YYYYY-MM-DD
        return `Approval Letter, USER_LAST_NAME, ${formattedData}.pdf`
    }
}
