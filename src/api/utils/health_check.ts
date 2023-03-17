import { DB_CONFIG } from "../config";
import { Response } from "express";
import knex from "knex";
import { DocumentService, EmailService } from "../services/shared";

export async function doHealthCheck(res: Response) {
  let database = await testDatabaseConnection();
  let schema = await testSchemaExists();
  let document_storage = await testDocumentStorage();
  let email = await testEmailServer();
  let health_good =
    database.connection &&
    schema.connection &&
    document_storage.connection &&
    document_storage.bucket_exists &&
    email.connection;

  return res.json({
    application_date: new Date(),
    health_good,
    database,
    schema,
    document_storage,
    email,
  });
}

async function testDatabaseConnection() {
  try {
    const db = knex(DB_CONFIG);
    let t = await db.raw("select CURRENT_TIMESTAMP database_time");
    return Object.assign(t[0], { connection: true });
  } catch (e: any) {
    console.log("DB ERROR: ", e.message);
    return { connection: false, message: e.message };
  }
}

async function testSchemaExists() {
  try {
    const db = knex(DB_CONFIG);
    let t = await db.raw(
      "select count(t.name) as table_count from sys.tables t inner join sys.schemas s on t.schema_id = s.schema_id  where s.name = 'sfa'"
    );
    return Object.assign(t[0], { connection: true });
  } catch (e: any) {
    console.log("DB ERROR: ", e.message);
    return { connection: false, message: e.message };
  }
}

async function testDocumentStorage() {
  const documentService = new DocumentService();
  let t = await documentService.verify();
  return t;
}

async function testEmailServer() {
  const emailer = new EmailService();
  let t = await emailer.verify();
  return t;
}
