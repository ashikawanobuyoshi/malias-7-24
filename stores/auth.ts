// stores/auth.ts
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as null | { username: string; folder: string }
  }),
  actions: {
    login(username: string, password: string) {
      // ここにログイン処理（例: バックエンドAPIと通信）を入れる
      // 成功したら user に情報をセット
      this.user = { username, folder: 'folderName' } // 例
    },
    logout() {
      this.user = null
    },
    checkAuth() {
      return this.user !== null
    }
  }
})
