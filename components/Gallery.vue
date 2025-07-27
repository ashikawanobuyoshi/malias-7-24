<!-- components/Gallery.vue -->
<template>
  <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
    <img
      v-for="image in images"
      :key="image"
      :src="image"
      class="rounded shadow"
      :alt="image"
    />
  </div>
</template>

<script setup lang="ts">
defineProps<{
  folder?: string
}>()

const images = ref<string[]>([])

onMounted(async () => {
  const folderName = props.folder || 'sample'
  const res = await $fetch(`/api/images?folder=${folderName}`)
  images.value = res
})
</script> 

