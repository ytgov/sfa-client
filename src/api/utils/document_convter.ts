import { FileReference } from "models";

import { convert } from "libreoffice-convert";

const convertAsync = require("util").promisify(convert);

export async function convertToPDF(input: FileReference) {
  let pdfBuf = await convertAsync(input.file_contents as Buffer, ".pdf", undefined);
  return pdfBuf;
}
