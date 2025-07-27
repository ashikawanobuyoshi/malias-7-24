<!-- pages/index.vue -->
<template>
  <div>
    <p>{{ count }}</p>
    <button @click="count++">+</button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const count = ref(0)
</script>