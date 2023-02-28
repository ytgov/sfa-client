export interface Document {
  id: number;
  bucket: string;
  key: string;
  file_name: string;
  file_type: string;
  mime_type: string;
  file_size: number;
  file_content: Buffer;
}
