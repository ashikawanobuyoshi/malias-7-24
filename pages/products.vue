<!-- pages/products.vue -->
<template>
  <div>
    <h1>商品一覧</h1>
    <ul>
      <li v-for="product in products" :key="product.id">
        <NuxtLink :to="`/product-details/${product.id}`">
          {{ product.productName }}
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
const products = [
  {
    id: 1,
    productName: "プリント",
  },
  {
    id: 2,
    productName: "CDプラン",
  },
  {
    id: 3,
    productName: "CD2",
  },
];
</script>
