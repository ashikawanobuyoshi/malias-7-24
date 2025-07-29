// server/api/images.ts
import { S3Client, ListObjectsV2Command } from '@aws-sdk/client-s3'
import { defineEventHandler, getQuery, createError } from 'h3'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const folder = getQuery(event).folder as string

  if (!folder) {
    throw createError({ statusCode: 400, statusMessage: 'Missing folder name' })
  }

  const s3 = new S3Client({
    region: config.awsRegion,
    credentials: {
      accessKeyId: config.awsAccessKeyId,
      secretAccessKey: config.awsSecretAccessKey,
    },
  })

  try {
    const command = new ListObjectsV2Command({
      Bucket: config.s3BucketName,
      Prefix: folder + '/', // フォルダ名＋スラッシュで指定
    })

    const response = await s3.send(command)

    const images = (response.Contents || [])
      .filter((item) => item.Key && !item.Key.endsWith('/'))
      .map((item) => ({
        name: item.Key!.split('/').pop()!,
        url: `/api/image-proxy?key=${encodeURIComponent(item.Key!)}`,
      }))

    return images
  } catch (error) {
    console.error('S3から画像一覧取得エラー:', error)
    throw createError({ statusCode: 500, statusMessage: '画像一覧の取得に失敗しました' })
  }
})
