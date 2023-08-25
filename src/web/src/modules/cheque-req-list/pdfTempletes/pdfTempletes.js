import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export const unsignedTemplete = (pdfData, sharedData, batchTotal, pdfName) => {
    const doc = new jsPDF('landscape', 'pt', 'a4', true);

    doc.setFontSize(12);
    const width = doc.internal.pageSize.getWidth();
    doc.text('GOVERMENT OF YUKON, DEPT. OF EDUCATION, STUDENT FINANCIAL ASSISTANCE', width / 2, 30, { align: 'center' });
    doc.text('Cheque Requisition List', width / 2, 50, { align: 'center' });

    doc.text(sharedData.funding_type, 45, 70, { align: 'left' });
    doc.text(`BATCH ID: ${sharedData.batch_id}`, 45, 85, { align: 'left' });
    doc.text(`ORIG ID: 03`, 245, 85, { align: 'left' });
    doc.text(`CODING: ${sharedData.financial_coding}`, 355, 85, { align: 'left' });
    doc.text(`ACTION: No`, 600, 85, { align: 'left' });

    autoTable(doc, { html: '#my-tableUnsigned' });
    autoTable(doc, { html: '#cheque-req-list' });

    const list = [];
    // Or use javascript directly:
    for (const data of pdfData) {
        list.push([
            data.vendor_id,
            data.name,
            data.vendor_address,
            data.disbursed_amount,
            data.invoice_date,
            data.invoice_id,
            data.due_date,
            data.SPEC_HAND,
            data.tax_year
        ])
    }

    autoTable(doc, {
        startY: 100,
        head: [[
            "Vendor ID",
            "Name",
            "Address",
            "Cdn Amount",
            "Invoice Date",
            "Invoice ID",
            "Due Date",
            "S/H",
            "Ref4",
        ]],
        body: [...list, ["BATCH TOTAL", "", "", batchTotal, "", "", "", "", "1"]],
        theme: 'plain',
    })

    doc.text(sharedData.invoice_date, 45, 567, { align: 'left' });

    doc.save(`${pdfName}_unsigned.pdf`)
};

export const signedTemplete = (pdfData, sharedData, batchTotal, pdfName) => {
    const doc = new jsPDF('landscape', 'pt', 'a4', true);

    doc.setFontSize(12);
    const width = doc.internal.pageSize.getWidth();
    doc.text('GOVERMENT OF YUKON, DEPT. OF EDUCATION, STUDENT FINANCIAL ASSISTANCE', width / 2, 30, { align: 'center' });
    doc.text('Cheque Requisition List', width / 2, 50, { align: 'center' });

    doc.text(sharedData.funding_type, 45, 70, { align: 'left' });
    doc.text(`BATCH ID: ${sharedData.batch_id}`, 45, 85, { align: 'left' });
    doc.text(`ORIG ID: 03`, 245, 85, { align: 'left' });
    doc.text(`CODING: ${sharedData.financial_coding}`, 355, 85, { align: 'left' });
    doc.text(`ACTION: No`, 600, 85, { align: 'left' });

    autoTable(doc, { html: '#my-tableSigned' });
    autoTable(doc, { html: '#cheque-req-list' });

    const list = [];
    // Or use javascript directly:
    for (const data of pdfData) {
        list.push([
            data.vendor_id,
            data.name,
            data.vendor_address,
            data.disbursed_amount,
            data.invoice_date,
            data.invoice_id,
            data.due_date,
            data.SPEC_HAND,
            data.tax_year
        ])
    }

    autoTable(doc, {
        startY: 100,
        head: [[
            "Vendor ID",
            "Name",
            "Address",
            "Cdn Amount",
            "Invoice Date",
            "Invoice ID",
            "Due Date",
            "S/H",
            "Ref4",
        ]],
        body: [...list, ["BATCH TOTAL", "", "", batchTotal, "", "", "", "", "1"]],
        theme: 'plain',
    })

    doc.text(sharedData.invoice_date, 45, 567, { align: 'left' });
    doc.text('Section 29 (Certification Authority) _____________________', 125, 567, { align: 'left' });
    doc.text('Section 30 (Payment Authority) _____________________', 455, 567, { align: 'left' });
    doc.text('Entered By _____________________', 250, 586, { align: 'left' });
    doc.text('Date _____________________', 595, 586, { align: 'left' });

    doc.save(`${pdfName}.pdf`)
};