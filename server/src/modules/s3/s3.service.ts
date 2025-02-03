import { Injectable } from '@nestjs/common'
import {
  DeleteObjectCommand,
  DeleteObjectsCommand,
  GetObjectCommand,
  ListObjectsV2Command,
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

  deleteObject(key: string) {
    return this.s3.send(
      new DeleteObjectCommand({
        Bucket: cfg.S3_BUCKET,
        Key: key,
      }),
    )
  }

  async deleteFolder(prefix: string) {
    const bucket = cfg.S3_BUCKET
    let continuationToken: string | undefined

    do {
      // Listar objetos con el prefijo
      const listResponse = await this.s3.send(
        new ListObjectsV2Command({
          Bucket: bucket,
          Prefix: prefix,
          ContinuationToken: continuationToken,
        }),
      )

      if (!listResponse.Contents || listResponse.Contents.length === 0) {
        return
      }

      const objectsToDelete = listResponse.Contents.map((obj) => ({
        Key: obj.Key,
      }))

      await this.s3.send(
        new DeleteObjectsCommand({
          Bucket: bucket,
          Delete: { Objects: objectsToDelete },
        }),
      )

      // Continuar si hay más objetos
      continuationToken = listResponse.NextContinuationToken
    } while (continuationToken)
  }

  getPrefix(ids: GetPrefixArgs) {
    let key = `org-${ids.organizationId}`
    if (ids.projectId) {
      key += `/proj-${ids.projectId}`
      if (ids.resourceId) key += `/res-${ids.resourceId}`
    }
    return key
  }

  getResourceKey(ids: GetResourceKeyArgs) {
    return this.getPrefix(ids) + `/res-${ids.resourceId}`
  }

  getCropKey({ cropId, ...ids }: GetCropKeyArgs) {
    return this.getPrefix(ids) + `/crop-${cropId}`
  }
}

type GetPrefixArgs =
  // solo organización:
  | { organizationId: string; projectId?: undefined; resourceId?: undefined }
  // organización + proyecto:
  | { organizationId: string; projectId: string; resourceId?: undefined }
  // organización + proyecto + recurso:
  | { organizationId: string; projectId: string; resourceId: string }

type GetResourceKeyArgs = Required<GetPrefixArgs>

type GetCropKeyArgs = Required<GetPrefixArgs> & { cropId: string }
