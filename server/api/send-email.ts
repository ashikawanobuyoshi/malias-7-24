import nodemailer from 'nodemailer'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const body = await readBody(event)

  console.log("📨 メール送信リクエスト受信:", {
    to: body.to,
    subject: body.subject,
    htmlLength: body.html?.length,
    imagesCount: body.images?.length,
  });

  const transporter = nodemailer.createTransport({
    host: config.onamaeSmtpHost,
    port: Number(config.onamaeSmtpPort),
    secure: true,
    auth: {
      user: config.onamaeSmtpUser,
      pass: config.onamaeSmtpPass,
    },
  });

  const attachments = Array.isArray(body.images)
    ? body.images.map((img: any) => ({
        filename: img.filename || 'image.jpg',
        path: img.url,
      }))
    : [];

  try {
    await transporter.sendMail({
      from: `"Webセレクト受付" <${config.onamaeSmtpUser}>`,
      to: body.to,
      subject: body.subject,
      html: body.html,
      attachments,
    });

    return { message: 'メール送信完了' };

  } catch (err) {
    console.error("📛 メール送信エラー:", err);
    return {
      statusCode: 500,
      statusMessage: 'メール送信に失敗しました',
      body: String(err.message || err),
    };
  }
});
