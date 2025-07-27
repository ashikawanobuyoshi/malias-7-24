<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import { useRoute } from 'vue-router'

const route = useRoute()
const folder = route.params.customerId as string
const images = ref([])

onMounted(async () => {
  const res = await $fetch('/api/list-images', {
    params: { folder }
  })
  images.value = res.images
})
</script>

<template>
  <div class="p-6">
    <h2 class="text-lg font-bold mb-4">ようこそ {{ folder }} さん</h2>
    <div class="grid grid-cols-3 gap-4">
      <img v-for="img in images" :key="img.url" :src="img.url" class="rounded shadow" />
    </div>
  </div>
</template>
