import { isNil } from "lodash"
import mime from "mime-types"
import snakecaseKeys from "snakecase-keys"

import FileReference from "@/models/file-reference"
import FundingRequest from "@/models/funding-request"
import User from "@/models/user"

import {
  DocumentService,
  DocumentSource,
  DocumentStatus,
  bufferToUploadedFileStub,
} from "@/services/shared/document-service"

export default class Uploader {
  #documentService: DocumentService
  #currentUser: User
  #fundingRequest: FundingRequest

  constructor({
    currentUser,
    fundingRequest,
  }: {
    currentUser: User
    fundingRequest: FundingRequest
  }) {
    this.#documentService = new DocumentService()
    this.#currentUser = currentUser
    this.#fundingRequest = fundingRequest
  }

  async upload(buffer: Buffer, filename: string): Promise<FileReference> {
    const application = this.#fundingRequest.application
    if (isNil(application)) throw new Error("Could not retrieve application for funding request")

    const mimeType = mime.lookup(filename)
    if (mimeType === false) throw new Error("Could not determine mime type for file")

    const file = bufferToUploadedFileStub(buffer, filename, mimeType)
    const uploadMetadata = {
      email: this.#currentUser.email,
      studentId: application.studentId,
      applicationId: application.id,
      file,
      source: DocumentSource.ADMIN,
      status: DocumentStatus.APPROVED,
      fundingRequestId: this.#fundingRequest.id,
      visibleInPortal: false,
    }
    const snakifieduploadMetadata = snakecaseKeys(uploadMetadata, { deep: false })
    return this.#documentService.uploadApplicationDocument(snakifieduploadMetadata)
  }
}
