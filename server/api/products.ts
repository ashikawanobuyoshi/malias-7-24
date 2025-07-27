// server/api/products.ts
export default defineEventHandler(async () => {
    const data = await $fetch<Product[]>("/api/products");
    return data || [];
  });