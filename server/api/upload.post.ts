import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { useRuntimeConfig } from "#imports";

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();

  const s3 = new S3Client({
    region: config.awsRegion,
    credentials: {
      accessKeyId: config.awsAccessKeyId,
      secretAccessKey: config.awsSecretAccessKey,
    },
  });

  // POSTボディ(JSON)を受け取る
  const body = await readBody(event);
  const { fileName, fileDataBase64 } = body;

  if (!fileName || !fileDataBase64) {
    return sendError(event, createError({ statusCode: 400, statusMessage: 'fileName and fileDataBase64 are required' }));
  }

  // base64文字列をBufferに変換
  const buffer = Buffer.from(fileDataBase64, "base64");

  try {
    await s3.send(new PutObjectCommand({
      Bucket: config.awsS3Bucket,
      Key: fileName,
      Body: buffer,
      ContentType: "image/jpeg",  // 適宜変えてください
      ACL: "public-read",
    }));

    return {
      message: "Upload successful",
      url: `https://${config.awsS3Bucket}.s3.${config.awsRegion}.amazonaws.com/${fileName}`,
    };

  } catch (error) {
    return sendError(event, createError({ statusCode: 500, statusMessage: 'Upload failed', data: error }));
  }
});
