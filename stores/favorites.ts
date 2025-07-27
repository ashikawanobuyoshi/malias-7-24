// stores/favorites.ts
import { defineStore } from 'pinia'
import { useFavoritesStore } from '@/stores/favorites'


export const useFavoritesStore = defineStore('favorites', {
  state: () => ({
    favoriteImages: [] as { url: string; name: string }[], // ← fileName → name に統一
  }),

  actions: {
    addFavorite(image: { url: string; name: string }) {
      const exists = this.favoriteImages.some((img) => img.url === image.url)
      if (!exists) {
        this.favoriteImages.push(image)
      }
    },

    removeFavorite(image: { url: string; name: string }) {
      this.favoriteImages = this.favoriteImages.filter((img) => img.url !== image.url)
    },

    toggleFavorite(image: { url: string; name: string }) {
      const exists = this.favoriteImages.some((img) => img.url === image.url)
      if (exists) {
        this.removeFavorite(image)
      } else {
        this.addFavorite(image)
      }
    },

    clearFavorites() {
      this.favoriteImages = []
    },
  },
})

