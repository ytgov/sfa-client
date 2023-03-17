import knex from "knex";
import { S3Client, ListBucketsCommand, GetObjectCommand, ListObjectsV2Command } from "@aws-sdk/client-s3";
import { DB_CONFIG, AWS_S3_CONFIG, AWS_S3_BUCKET } from "../../config";
import { Document } from "../../models";

const db = knex(DB_CONFIG);

export class DocumentService {
  readonly client: S3Client;

  constructor() {
    this.client = new S3Client(AWS_S3_CONFIG);
  }

  async verify(): Promise<any> {
    try {
      const command = new ListBucketsCommand({});
      const bucketList = await this.client.send(command);

      if (bucketList.Buckets && bucketList.Buckets.length > 0) {
        let docBucket = bucketList.Buckets?.filter((b) => b.Name == AWS_S3_BUCKET);

        if (docBucket && docBucket.length > 0) {
          const countCommand = new ListObjectsV2Command({ Bucket: AWS_S3_BUCKET, MaxKeys: 10 });

          console.log(countCommand)

          const count = await this.client.send(countCommand);

          console.log(count);

          return { connection: true, bucket_exists: docBucket?.length > 0 };
        }
      } else {
        return { connection: true, bucket_exists: false };
      }
    } catch (e) {
      return { connection: false, e };
    }
  }

  //return the Document metadata and file
  async getDocument(id: number): Promise<Document | undefined> {
    // pull the
    let docMeta = await db<Document>("docs").where({ id }).first();

    const command = new GetObjectCommand({ Bucket: docMeta?.bucket, Key: docMeta?.key });
    const response = await this.client.send(command);

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
