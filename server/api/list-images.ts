// server/api/list-images.ts
import { S3Client, ListObjectsV2Command } from '@aws-sdk/client-s3'
import { defineEventHandler, getQuery } from 'h3'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const query = getQuery(event)

  const folder = query.folder as string
  if (!folder) {
    console.warn('omiyamairi_2025')
    return { images: [] }
  }

  const s3 = new S3Client({
    region: config.awsRegion,
    credentials: {
      accessKeyId: config.awsAccessKeyId,
      secretAccessKey: config.awsSecretAccessKey
    }
  })

  try {
    const command = new ListObjectsV2Command({
      Bucket: config.s3BucketName,
      Prefix: `${folder}/`
    })

    const result = await s3.send(command)

    const contents = result.Contents || []

    if (contents.length === 0) {
      console.warn(`"${folder}/" に画像が見つかりません`)
    }

    const images = contents
      .filter(item => item.Key && item.Key.match(/\.(jpg|jpeg|png|gif)$/i))
      .map(item => ({
        key: item.Key,
        url: `/api/image-proxy?key=${encodeURIComponent(item.Key!)}`
      }))

console.log('取得した画像一覧:', images)

    return { images }

  } catch (error) {
    console.error('S3からの画像一覧取得エラー:', error)
    return { images: [], error: 'S3 error' }
  }
})
