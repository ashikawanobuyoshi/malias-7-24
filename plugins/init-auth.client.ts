// plugins/init-auth.client.ts
import { defineNuxtPlugin } from '#app'
import { useAuthStore } from '~/stores/auth'

export default defineNuxtPlugin((nuxtApp) => {
  // クライアントサイド限定なのでlocalStorageが使える
  if (process.client) {
    const authStore = useAuthStore()

    // 例：localStorageから保存したユーザー情報を復元
    const savedUser = localStorage.getItem('authUser')
    if (savedUser) {
      try {
        authStore.user = JSON.parse(savedUser)
        console.log('認証情報を復元しました:', authStore.user)
      } catch {
        console.warn('認証情報の復元に失敗しました')
        authStore.user = null
      }
    }
  }
})