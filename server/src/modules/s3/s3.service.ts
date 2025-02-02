import { Injectable } from '@nestjs/common'
import {
  GetObjectCommand,
  PutObjectCommand,
  PutObjectCommandInput,
  S3Client,
} from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'

import cfg from 'src/cfg'

@Injectable()
export class S3Service {
  private readonly s3 = new S3Client({
    region: cfg.S3_REGION,
    credentials: {
      accessKeyId: cfg.S3_ACCESS_KEY,
      secretAccessKey: cfg.S3_SECRET_KEY,
    },
  })

  upload(input: Omit<PutObjectCommandInput, 'Bucket'>) {
    return this.s3.send(
      new PutObjectCommand({ ...input, Bucket: cfg.S3_BUCKET }),
    )
  }

  getUrl(key: string) {
    return getSignedUrl(
      this.s3,
      new GetObjectCommand({
        Bucket: cfg.S3_BUCKET,
        Key: key,
      }),
      { expiresIn: 3_600 }, // 1 hora
    )
  }

  getResourceKey(
    organizationId: string,
    projectId: string,
    resourceId: string,
  ): string {
    return (
      this._getBaseResourceKey(organizationId, projectId, resourceId) +
      `/res-${resourceId}`
    )
  }

  getCropKey(
    organizationId: string,
    projectId: string,
    resourceId: string,
    cropId: string,
  ) {
    return (
      this._getBaseResourceKey(organizationId, projectId, resourceId) +
      `/crop-${cropId}`
    )
  }

  private _getBaseResourceKey(
    organizationId: string,
    projectId: string,
    resourceId: string,
  ): string {
    return `org-${organizationId}/proj-${projectId}/res-${resourceId}`
  }
}
