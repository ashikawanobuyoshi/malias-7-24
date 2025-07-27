// server/api/gallery/[folder].ts
import { defineEventHandler } from 'h3'
import { S3Client, ListObjectsV2Command } from '@aws-sdk/client-s3'

const s3 = new S3Client({
  region: 'ap-northeast-1',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  }
})

export default defineEventHandler(async (event) => {
  const folder = event.context.params?.folder
  if (!folder) return { images: [] }

  const bucket = process.env.S3_BUCKET_NAME!
  const prefix = `${folder}/`

  const cmd = new ListObjectsV2Command({
    Bucket: bucket,
    Prefix: prefix,
    Delimiter: '/',
  })

  try {
    const res = await s3.send(cmd)
    const files = res.Contents?.filter(obj => obj.Key && !obj.Key.endsWith('/')) || []
    const urls = files.map(obj => `https://${bucket}.s3.${s3.config.region}.amazonaws.com/${obj.Key}`)
    return { images: urls }
  } catch (err) {
    console.error(err)
    return { images: [] }
  }
})
