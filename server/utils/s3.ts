// server/utils/s3.ts
import { S3Client, ListObjectsV2Command } from '@aws-sdk/client-s3'

export const s3 = new S3Client({
  region: 'ap-northeast-1',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!
  }
})

/**
 * 指定フォルダの画像一覧を取得
 */
export async function listImagesFromS3(folder: string, bucket: string) {
  try {
    const command = new ListObjectsV2Command({
      Bucket: bucket,
      Prefix: `${folder}/`
    })

    const result = await s3.send(command)
    const contents = result.Contents || []

    const images = contents
      .filter(item => item.Key && item.Key.match(/\.(jpg|jpeg|png|gif)$/i))
      .map(item => ({
        key: item.Key,
        url: `/api/image-proxy?key=${encodeURIComponent(item.Key!)}`
      }))

    return images
  } catch (error) {
    console.error('❌ S3取得エラー:', error)
    return []
  }
}
