import { defineStore } from 'pinia'

export const useSessionStore = defineStore('session', {
  state: () => ({
    user: null,
    token: null,
  }),
   persist: true,

  getters: {
    isLoggedIn: (state) => !!state.token,
  },
  actions: {
    login(userData) {
      this.user = userData.user
      this.token = userData.token
    },
    logout() {
      this.user = null
      this.token = null
    },
  },
})