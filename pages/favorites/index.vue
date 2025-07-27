<template>
  <div class="container mx-auto px-4 py-6">
    <!-- タイトル -->
    <h2 class="text-2xl font-semibold mb-6 text-gray-800 border-b pb-2">
      お気に入り画像一覧
    </h2>

    <!-- もどるボタン -->
    <div class="mb-6">
      <NuxtLink to="/">
        <button
          class="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-md shadow"
        >
          もどる
        </button>
      </NuxtLink>
    </div>

    <!-- お気に入り画像ギャラリー -->
    <div class="mb-10">
      <div v-if="favoriteImages.length === 0" class="text-gray-500">
        お気に入り画像はありません
      </div>
      <div v-else class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        <div
          v-for="(favImg, index) in favoriteImages"
          :key="index"
          class="bg-white border border-gray-200 rounded-lg p-4 text-center cursor-pointer hover:shadow-lg transition"
          @click="removeFavorite(index)"
        >
          <!-- 画像とファイル名 -->
          <img
            :src="favImg.url"
            alt="Favorite Image"
            class="rounded shadow-md mx-auto"
          />
          <div class="mt-3 text-sm font-medium text-gray-700">
            {{ favImg.fileName }}
          </div>
        </div>
      </div>
    </div>

    <!-- 画像ギャラリー -->
    <h2 class="text-2xl font-semibold mb-6 text-gray-800 border-b pb-2">
      お気に入り画像の仕上げ方
    </h2>

    <div
      class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 p-6 bg-gray-50 border border-gray-200 rounded-xl shadow-sm"
    >
      <div
        v-for="(img, index) in printImages"
        :key="index"
        class="bg-white border border-gray-300 rounded-lg p-4 text-center transition transform hover:-translate-y-1 hover:shadow-lg"
      >
        <!-- 商品詳細リンク（画像＋文字） -->
        <NuxtLink :to="getDetailUrl(img.productId)" class="block">
          <img
            :src="img.src"
            :alt="img.description"
            class="rounded shadow-md mx-auto mb-2"
          />
          <div class="text-blue-600 hover:underline text-sm mt-2">
            商品ページを見る
          </div>
        </NuxtLink>

        <!-- 説明文の下に罫線 -->
        <div
          class="mt-4 text-left text-gray-700 leading-relaxed tracking-wide text-sm font-light whitespace-pre-line border-t pt-3"
        >
          {{ img.description }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useFavoritesStore } from "@/stores/favorites";
import { printImages } from "@/data/printImages";
import { onMounted, watch } from 'vue';
import { storeToRefs } from "pinia";

const favoritesStore = useFavoritesStore();
const { favoriteImages } = storeToRefs(favoritesStore);

onMounted(() => {
  console.log('printImages:', printImages);
  console.log('onMounted favoriteImages:', favoritesStore.favoriteImages);
});

watch(
  () => favoritesStore.favoriteImages,
  (newVal) => {
    console.log('favoriteImages changed:', newVal);
  },
  { deep: true }
);

const removeFavorite = (index: number) => {
  favoritesStore.removeFavorite(index);
};

const getDetailUrl = (productId: number) => {
  return `/product-details/${productId}`;
};
</script>


<style scoped>
/* コンテナー全体 */
.container {
  padding: 20px;
  width: 100%; /* または必要に応じて固定値 */
}

/* お気に入りギャラリーのラッパー（背景や余白は必要に応じて調整） */
.favorites-gallery {
  margin-bottom: 3%;
  display: grid;
  /* 自動フィット: 最小幅200px、余裕があれば1fr（均等割り）に */
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 10px; /* ※ gap を 10px に変更 */
}

/* 各お気に入り画像アイテム */
.favorite-item {
  cursor: pointer;
  /* grid を利用するため、width 指定は不要となります */
}

/* 画像自体のスタイル：コンテナー内で横幅100%、最大150px */
.favorite-item img {
  width: 100%;
  max-width: 150px;
  border: 1px solid #ccc;
  display: block;
  margin: 0 auto; /* 中央寄せになるよう設定 */
}

/* 画像タイトルなどの補助テキスト */
.fav-image-name {
  text-align: center;
  font-size: 14px;
  margin-top: 5px;
  background: rgba(255, 255, 255, 0.9);
  padding: 4px;
  border-radius: 4px;
  overflow-wrap: break-word;
}

/* もどるボタンなどの追加スタイル */
.back-button {
  margin-bottom: 20px;
}

.back-btn {
  padding: 6px 12px;
  background-color: #007bff;
  border: none;
  color: #fff;
  border-radius: 4px;
  cursor: pointer;
}
.print-gallery {
  display: grid;
  grid-template-columns: repeat(5, 1fr); /* 5列 */
  gap: 24px;
  padding: 24px;
  background-color: #f8f8f8;
  border: 1px solid #ddd;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.print-item {
  background-color: #fff;
  border: 1px solid #e0e0e0;
  border-radius: 10px;
  padding: 1 2px;
  text-align: center;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.print-item:hover {
  transform: translateY(-4px);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1);
  border-color: #ccc;
}

.print-item img {
  max-width: 100%;
  height: auto;
  border-radius: 6px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
}

.print-description {
  margin-top: 10px;
  font-size: 0.9rem;
  font-weight: 500;
  color: #333;
  line-height: 1.4;
}
</style>
