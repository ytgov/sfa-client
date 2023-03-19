export interface FileReferenceBase {
  object_key: string;
  object_key_pdf?: string;
  student_id: number;
  application_id: number;
  upload_date: Date;
  upload_user: string;
  upload_source: string;
  status: FileStatus;
  status_date: Date;
  bucket: string;
  file_name: string;
  mime_type: string;
  file_size: number;
}

export interface FileReference extends FileReferenceBase {
  file_contents: Buffer;
}

export enum FileStatus {
  UNREVIEWED = "Unreviewed",
  REVIEWED = "Reviewed",
  ACCEPTED = "Accepted",
  REJECTED = "Rejected",
}
