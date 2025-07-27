export const useSendEmail = () => {
  const sendEmail = async (payload: {
    to: string
    subject: string
    html: string
    images?: { filename: string; url: string }[] // ✅ これを追加！
  }) => {
    try {
      const response = await $fetch('/api/send-email', {
        method: 'POST',
        body: payload, // ✅ 不要なapiKeyやfromは送らない
      })

      return response
    } catch (error) {
      console.error('メール送信エラー:', error)
      throw error
    }
  }

  return { sendEmail }
}