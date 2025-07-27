// server/middleware/cors.ts
export default defineEventHandler((event) => {
  const res = event.node.res
  // 特定オリジンを許可する場合はここで動的に判定も可
  res.setHeader('Access-Control-Allow-Origin', 'https://studiomalias.jp')
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  res.setHeader('Access-Control-Allow-Credentials', 'true')
  res.setHeader('Vary', 'Origin')

  // OPTIONSメソッドへのレスポンスを早期に返す（プリフライト対応）
  if (event.node.req.method === 'OPTIONS') {
    res.statusCode = 204
    res.end()
    return
  }
})
