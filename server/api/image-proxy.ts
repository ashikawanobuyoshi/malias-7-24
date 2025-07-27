// server/api/image-proxy.ts
import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3'
import { sendStream } from 'h3'
import { Readable } from 'stream'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const key = getQuery(event).key as string

  if (!key) {
    throw createError({ statusCode: 400, statusMessage: 'Missing key' })
  }

  const s3 = new S3Client({
    region: config.awsRegion,
    credentials: {
      accessKeyId: config.awsAccessKeyId,
      secretAccessKey: config.awsSecretAccessKey
    }
  })

  try {
    const command = new GetObjectCommand({
      Bucket: config.s3BucketName,
      Key: key
    })

    const s3Response = await s3.send(command)

    // ContentType を設定して画像として返す
    event.node.res.setHeader('Content-Type', s3Response.ContentType || 'image/jpeg')

    const stream = s3Response.Body as Readable
    return sendStream(event, stream)
  } catch (error) {
    console.error('画像取得エラー:', error)
    throw createError({ statusCode: 404, statusMessage: '画像が見つかりません' })
  }
})
