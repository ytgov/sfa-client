const AWS = require("aws-sdk");

export interface S3GetResponse {
  ContentType: string;
  Body: any;
}

export interface S3UploadResponse {
  Location: string;
  Bucket: string;
  Key: string;
}

export class S3Worker {
  readonly s3: any;
  bucket: string;

  constructor(endpointUrl: string, accessKey: string, accessSecret: string, bucket: string, region: string) {
    AWS.config.update({
      accessKeyId: accessKey,
      secretAccessKey: accessSecret,
      //   s3BucketEndpoint: true,
      sslEnabled: false,
      region: region,
      s3ForcePathStyle: true // required for localstack
    });

    this.bucket = bucket;
    this.s3 = new AWS.S3({ endpoint: endpointUrl });
  }

  download(key: string): Promise<S3GetResponse> {
    return new Promise((resolve, reject) => {
      this.s3.getObject(
        {
          Bucket: this.bucket,
          Key: key
        },
        (err: any, data: S3GetResponse) => {
          if (err) {
            reject(err);
          } else {
            resolve(data);
          }
        }
      );
    });
  }

  upload(key: string, value: any): Promise<S3UploadResponse> {
    return new Promise((resolve, reject) => {
      this.s3.upload(
        {
          Bucket: this.bucket,
          Key: key,
          Body: value
        },
        (err: any, data: S3UploadResponse) => {
          if (err) {
            reject(err);
          } else {
            resolve(data);
          }
        }
      );
    });
  }

  delete(key: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.s3.deleteObject(
        {
          Bucket: this.bucket,
          Key: key
        },
        (err: any, data: any) => {
          if (err) {
            reject();
          } else {
            resolve(data);
          }
        }
      );
    });
  }

  listFiles(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.s3.listObjects(
        {
          Bucket: this.bucket,
        },
        (err: any, data: S3UploadResponse) => {
          if (err) {
            reject(err);
          } else {
            resolve(data);
          }
        }
      );
    });
  }
}