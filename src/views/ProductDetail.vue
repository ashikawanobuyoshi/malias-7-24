<!-- src/views/ProductDetail.vue -->
<script setup>
import { useRoute } from "vue-router";
const route = useRoute();
</script>

<template>
  <h1>Product ID: {{ route.params.id }}</h1>
</template>
