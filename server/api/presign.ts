// server/api/presign.ts

import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const { fileName } = getQuery(event)

  if (!fileName) {
    return { statusCode: 400, message: 'fileName is required' }
  }

  const s3 = new S3Client({
    region: config.awsRegion,
    credentials: {
      accessKeyId: config.awsAccessKeyId,
      secretAccessKey: config.awsSecretAccessKey
    }
  })

  const command = new PutObjectCommand({
    Bucket: config.s3BucketName,
    Key: fileName,
    ContentType: 'image/jpeg'
  })

  const url = await getSignedUrl(s3, command, { expiresIn: 60 }) // 60秒有効

  return { url }
})
