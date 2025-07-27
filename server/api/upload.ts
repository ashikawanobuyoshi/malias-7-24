import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'
import { Buffer } from 'buffer'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const body = await readBody(event)

  const { fileName, fileBase64, customerId } = body || {}

  if (!fileName || !fileBase64 || !customerId) {
    console.error('Missing required fields:', { fileName, fileBase64, customerId })
    return {
      statusCode: 400,
      statusMessage: 'fileName, fileBase64, and customerId are required'
    }
  }

  try {
    const s3 = new S3Client({
      region: config.awsRegion,
      credentials: {
        accessKeyId: config.awsAccessKeyId,
        secretAccessKey: config.awsSecretAccessKey
      }
    })

    const buffer = Buffer.from(fileBase64, 'base64')
    const key = `${customerId}/${fileName}`

    const command = new PutObjectCommand({
      Bucket: config.s3BucketName,
      Key: key,
      Body: buffer,
      ContentType: 'image/jpeg',
      ACL: 'public-read'
    })

    await s3.send(command)

    return {
      statusCode: 200,
      statusMessage: 'Upload successful',
      url: `https://${config.s3BucketName}.s3.${config.awsRegion}.amazonaws.com/${key}`
    }
  } catch (err) {
    console.error('Upload error:', err)
    return {
      statusCode: 500,
      statusMessage: 'Upload failed'
    }
  }
})
