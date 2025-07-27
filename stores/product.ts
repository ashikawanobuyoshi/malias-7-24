import { defineStore } from 'pinia'

export const useProductStore = defineStore('product', {
  state: () => ({
    selectedAdditionalItems: [] as any[], // 必要に応じて型を定義
  }),

  actions: {
    setSelectedAdditionalItems(items: any[]) {
      this.selectedAdditionalItems = items
    },
    clearSelectedAdditionalItems() {
      this.selectedAdditionalItems = []
    }
  }
})
