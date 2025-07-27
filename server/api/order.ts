// server/api/order.ts
export default defineEventHandler(async (event) => {
    const body = await readBody(event)
  
    // 例：SendGrid でメールを送信
    try {
      // ここでメール送信などの処理を行う
      // await sendEmail(body) など
      return { success: true }
    } catch (error) {
      return { success: false, error: error.message }
    }
  })
  