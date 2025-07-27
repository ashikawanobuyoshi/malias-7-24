<template>
  <NuxtLayout>  <!-- ✅ ここが重要 -->
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
const auth = useAuthStore()

onMounted(() => {
  auth.checkAuth()
})
</script>
