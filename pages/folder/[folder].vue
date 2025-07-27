<!-- pages/folder/[folder].vue -->
<template>
  <div class="p-4">
    <h1 class="text-2xl font-bold mb-6">フォルダ：{{ folder }}</h1>

    <div v-if="images.length" class="grid grid-cols-2 md:grid-cols-4 gap-4">
      <img
        v-for="img in images"
        :key="img.key"
        :src="img.url"
        class="rounded shadow"
        :alt="img.key"
      />
    </div>
    <p v-else>画像が見つかりませんでした。</p>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const folder = route.params.folder as string

const { data } = await useFetch(`/api/list-images?folder=${encodeURIComponent(folder)}`)
const images = data.value?.images || []
</script>
