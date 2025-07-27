<template>
  <div class="p-4">
    <h1 class="text-xl font-bold">ダッシュボード</h1>
    <p v-if="user?.role === 'admin'">ようこそ、<strong>管理者様</strong>。</p>
    <p v-else>ようこそ、{{ user?.name || 'ユーザー' }}さん。</p>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'

const auth = useAuthStore()
const user = auth.user
</script>
