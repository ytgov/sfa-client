import knex from "knex";
import { DB_CONFIG } from "../config";
import { Document } from "../models";

const db = knex(DB_CONFIG);

export class DocumentService {
  constructor() {}

  //return the Document metadata and file
  async getDocument(id: number): Promise<Document | undefined> {
    // pull the
    let docMeta = await db<Document>("docs").where({ id }).first();

    if (docMeta) {
      //pull the file from storage
      //docMeta.file_content = await

      return docMeta;
    }

    return undefined;
  }

  // returns the number of documents removed (0 or 1)
  async removeDocument(id: number): Promise<number> {
    let docMeta = await db<Document>("docs").where({ id }).first();

    if (docMeta) {
      // await storage.delete(docMeta.key)

      let deleteMeta = await db<Document>("docs").where({ id }).delete();

      return deleteMeta;
    }

    return 0;
  }

  // writes a document to storage and the database
  async setDocument(document: Document): Promise<Document> {
    document.bucket = "";
    document.key = "";

    //await Storage.set(docuemnt.bucket, document.key, document.file_content)

    let docMeta = await db<Document>("docs").insert(document);

    return document;
  }
}
