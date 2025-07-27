// server/api/login.post.ts
export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { email, password } = body

  // 🔍 受信したリクエスト内容をログ出力
  console.log('📥 受信したログインリクエスト:')
  console.log('📧 email:', email)
  console.log('🔐 password:', password)

  // 簡易的なログイン判定
  if (email === 'admin@example.com' && password === 'password123') {
    return {
      success: true,
      user: {
        id: 1,
        name: 'Admin User',
        email: 'admin@example.com'
      }
    }
  }

  // 認証失敗時のレスポンス
  return {
    success: false
  }
})

