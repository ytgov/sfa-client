import knex from "knex";
import {
  S3Client,
  ListBucketsCommand,
  GetObjectCommand,
  ListObjectsV2Command,
  PutObjectCommand,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";
import { nanoid } from "nanoid";
import { UploadedFile } from "express-fileupload";
import { Readable } from "stream";
import { DB_CONFIG, AWS_S3_CONFIG, AWS_S3_BUCKET } from "../../config";
import { FileReference, FileReferenceBase, FileStatus } from "../../models";

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
          const countCommand = new ListObjectsV2Command({ Bucket: AWS_S3_BUCKET, MaxKeys: 1 });
          const count = await this.client.send(countCommand);

          return {
            connection: true,
            bucket_exists: docBucket?.length > 0,
            contains_objects: (count.Contents || []).length > 0,
          };
        }
      } else {
        return { connection: true, bucket_exists: false };
      }
    } catch (e) {
      return { connection: false, e };
    }
  }

  //return the Document metadata
  async getDocument(object_key: string): Promise<FileReferenceBase | undefined> {
    return await db<FileReferenceBase>("sfa.file_reference").where({ object_key }).first();
  }

  //return the Document metadata
  async getDocumentsForStudent(student_id: number): Promise<FileReferenceBase[]> {
    return await db<FileReferenceBase>("sfa.file_reference").where({ student_id });
  }

  //return the Document metadata
  async getDocumentsForApplication(application_id: number): Promise<FileReferenceBase[]> {
    return await db<FileReferenceBase>("sfa.file_reference").where({ application_id });
  }

  //return the Document metadata and file
  async getDocumentWithFile(object_key: string): Promise<FileReference | undefined> {
    // pull the
    let docRef = await db<FileReference>("sfa.file_reference").where({ object_key }).first();

    if (docRef) {
      const command = new GetObjectCommand({ Bucket: docRef.bucket, Key: docRef.object_key });
      const response = await this.client.send(command);

      if (response.Body) {
        docRef.file_contents = await streamToBuffer(response.Body as Readable);
        return docRef;
      }
    }

    return undefined;
  }

  // returns the number of documents removed (0 or 1)
  async removeDocument(object_key: string): Promise<number> {
    let docRef = await db<FileReferenceBase>("sfa.file_reference").where({ object_key }).first();

    if (docRef) {
      let command1 = new DeleteObjectCommand({
        Bucket: docRef.bucket,
        Key: docRef.object_key,
      });

      await this.client.send(command1);

      if (docRef.object_key_pdf) {
        let command2 = new DeleteObjectCommand({
          Bucket: docRef.bucket,
          Key: docRef.object_key_pdf || "",
        });

        await this.client.send(command2);
      }

      await db("sfa.file_reference").where({ object_key }).delete();
      return 1;
    }

    return 0;
  }

  async uploadDraftDocument(
    email: string,
    student_id: string | number,
    application_id: string | number,
    file: UploadedFile,
    requirement_type_id: number,
    disability_requirement_id: string | number,
    person_id: string | number,
    dependent_id: string | number
  ) {
    let fRef = {
      object_key: nanoid(),
      object_key_pdf: nanoid(),
      bucket: AWS_S3_BUCKET,
      upload_date: new Date(),
      upload_user: email,
      upload_source: "Portal",
      file_name: file.name,
      file_contents: file.data,
      student_id: parseInt(student_id.toString()),
      application_id: undefined,
      application_draft_id: parseInt(application_id.toString()),
      requirement_type_id,
      mime_type: file.mimetype,
      file_size: file.size,
      comment: "This is fake",
      status: FileStatus.UNREVIEWED,
      status_date: new Date(),
      disability_requirement_id,
      person_id,
      dependent_id,
    } as FileReference;

    await this.uploadFile(fRef);
  }

  async uploadApplicationDocument(
    email: string,
    student_id: string | number,
    application_id: string | number,
    file: UploadedFile,
    requirement_type_id: number,
    disability_requirement_id: string | number,
    person_id: string | number,
    dependent_id: string | number
  ) {
    let fRef = {
      object_key: nanoid(),
      object_key_pdf: nanoid(),
      bucket: AWS_S3_BUCKET,
      upload_date: new Date(),
      upload_user: email,
      upload_source: "Portal",
      file_name: file.name,
      file_contents: file.data,
      student_id: parseInt(student_id.toString()),
      application_id: parseInt(application_id.toString()),
      application_draft_id: undefined,
      requirement_type_id,
      mime_type: file.mimetype,
      file_size: file.size,
      comment: "This is fake",
      status: FileStatus.UNREVIEWED,
      status_date: new Date(),
      disability_requirement_id,
      person_id,
      dependent_id,
    } as FileReference;

    await this.uploadFile(fRef);
  }

  async updateDocument(object_key: string, input: FileReferenceBase) {
    return await db("sfa.file_reference").where({ object_key }).update(forUpdate(input));
  }

  // writes a document to storage and the database
  async uploadFile(input: FileReference): Promise<FileReference> {
    await db("sfa.file_reference").insert(forInsert(input));

    let upload1Command = new PutObjectCommand({
      Bucket: input.bucket,
      Key: input.object_key,
      Body: input.file_contents,
      ContentType: input.mime_type,
    });

    await this.client.send(upload1Command);

    // this feature is awaiting some sort of universal PDF conversion
    /* if (input.object_key_pdf) {
      let pdf = await convertToPDF(input);
      console.log("THING", pdf);

      let upload2Command = new PutObjectCommand({
        Bucket: input.bucket,
        Key: input.object_key_pdf,
        Body: pdf,
        ContentType: input.mime_type,
      });

      await this.client.send(upload2Command);
    } */

    return input;
  }
}

function forInsert(input: FileReference | FileReferenceBase) {
  return {
    object_key: input.object_key,
    object_key_pdf: input.object_key_pdf,
    student_id: input.student_id,
    application_id: input.application_id,
    application_draft_id: input.application_draft_id,
    comment: input.comment,
    status: input.status,
    status_date: input.status_date,
    bucket: input.bucket,
    file_name: input.file_name,
    mime_type: input.mime_type,
    file_size: input.file_size,
    upload_user: input.upload_user,
    upload_date: input.upload_date,
    upload_source: input.upload_source,
    requirement_type_id: input.requirement_type_id,
  };
}

function forUpdate(input: FileReference | FileReferenceBase) {
  return { status: input.status, status_date: input.status_date };
}

const streamToBuffer = (stream: Readable) =>
  new Promise<Buffer>((resolve, reject) => {
    const chunks: Buffer[] = [];
    stream.on("data", (chunk) => chunks.push(chunk));
    stream.once("end", () => resolve(Buffer.concat(chunks)));
    stream.once("error", reject);
  });
