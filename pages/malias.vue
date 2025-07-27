<template>
  <div class="p-4">
    <h1>✅ トップページに来ました</h1>
    <h1 class="text-xl font-bold mb-2">ようこそ、{{ userName }} さん。</h1>

    <h1 class="text-2xl font-bold mb-4">フォルダ内の画像ギャラリー</h1>

    <input
      v-model="folder"
      type="text"
      placeholder="例: 5_11koyama sama"
      class="border border-gray-300 p-2 rounded mb-4 w-full"
    />

    <div v-if="loading" class="mt-4 text-gray-500">読み込み中...</div>
    <div v-if="!loading && images.length === 0" class="mt-4 text-gray-500">画像が見つかりません。</div>

    <!-- 画像比較とサムネイル表示部 -->
    <div class="image-selector mt-10">
      <div class="monitor-container">
        <div class="monitor monitor-left">
          <div class="image-wrapper">
           <img
  v-if="images && images.length > leftIndex && images[leftIndex]?.url"
  :src="images[leftIndex].url"
  class="zoomable"
/>
           
          </div>
          <div class="image-name">{{ leftImage.name }}</div>
        </div>
        <div class="monitor monitor-right">
          <div class="image-wrapper">
          <img
  v-if="images && images.length > rightIndex && images[rightIndex]?.url"
  :src="images[rightIndex].url"
  class="zoomable"
/>
             
          </div>
          <div class="image-name">{{ rightImage.name }}</div>
        </div>
      </div>

      <div class="toggle-scroll-link">
        <label>
          <input type="checkbox" v-model="isScrollLinked" />
          サムネイルのスクロールを連動させる
        </label>
      </div>

      <div class="thumbnail-container flex gap-4">
        <div ref="leftThumbnail" class="thumbnail overflow-x-auto whitespace-nowrap w-full">
          <div class="flex gap-2">
            <div
              v-for="(img, index) in images"
              :key="'left-' + index"
              class="thumbnail-item flex-shrink-0 w-32"
              :class="{ active: index === leftIndex }"
              @click="selectLeftImage(index)"
            >
              <img :src="img.url" :alt="img.name" class="w-full h-auto object-contain rounded" />
              <span class="thumb-name block text-center text-sm mt-1">{{ img.name }}</span>
            </div>
          </div>
        </div>

        <div ref="rightThumbnail" class="thumbnail overflow-x-auto whitespace-nowrap w-full">
          <div class="flex gap-2">
            <div
              v-for="(img, index) in images"
              :key="'right-' + index"
              class="thumbnail-item flex-shrink-0 w-32"
              :class="{ active: index === rightIndex.value }"
              @click="selectRightImage(index)"
            >
              <img :src="img.url" :alt="img.name" class="w-full h-auto object-contain rounded" />
              <span class="thumb-name block text-center text-sm mt-1">{{ img.name }}</span>
            </div>
          </div>
        </div>
      </div>

      <div class="controls text-center my-6">
        <button @click="addLeftToFavorites" class="mr-2 bg-green-600 text-white px-4 py-2 rounded">左をお気に入り</button>
        <button @click="addRightToFavorites" class="bg-green-600 text-white px-4 py-2 rounded">右をお気に入り</button>
      </div>

      <div class="favorites-nav text-center mb-6">
        <NuxtLink to="/favorites">
          <button class="bg-purple-600 text-white px-4 py-2 rounded">お気に入りページへ</button>
        </NuxtLink>
      </div>

      <div class="favorites">
        <h3 class="font-semibold text-lg mb-2">お気に入り画像</h3>
        <div class="favorites-gallery flex flex-wrap gap-2">
          <div
            v-for="(favImg, index) in favoritesStore.favoriteImages"
            :key="index"
            class="favorite-item w-32 cursor-pointer"
            @click="favoritesStore.removeFavorite(favImg)"
          >
            <img :src="favImg.url" :alt="favImg.name" class="rounded" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script setup lang="ts">
import { ref, computed, onMounted, watchEffect, nextTick  } from 'vue'
import { useRoute } from 'vue-router'
import { useFavoritesStore } from '@/stores/favorites'
import mediumZoom from 'medium-zoom'

// 仮に固定文字列で
const userName = ref('ゲスト')

const favoritesStore = useFavoritesStore()
const route = useRoute()

const leftThumbnail = ref<HTMLElement | null>(null)
const rightThumbnail = ref<HTMLElement | null>(null)
const isScrollLinked = ref(true)

const leftImage = computed(() => images.value[leftIndex.value] || { name: '', url: '' })
const rightImage = computed(() => images.value[rightIndex.value] || { name: '', url: '' })

let leftScrollHandler: (() => void) | null = null
let rightScrollHandler: (() => void) | null = null

const leftIndex = ref(0)
const rightIndex = ref(1)

const folder = (route.query.folder as string) || 'default-folder'
const images = ref<{ name: string; url: string }[]>([])
const loading = ref(false)

onMounted(async () => {
  await fetchImages(folder)
  await nextTick()

  const zoomables = document.querySelectorAll('.zoomable')
  if (zoomables.length > 0) {
    mediumZoom(zoomables, {
      margin: 24,
      background: '#000',
    })
  }
})

watchEffect(() => {
  if (!leftThumbnail.value || !rightThumbnail.value) return

  if (leftScrollHandler) leftThumbnail.value.removeEventListener('scroll', leftScrollHandler)
  if (rightScrollHandler) rightThumbnail.value.removeEventListener('scroll', rightScrollHandler)

  if (isScrollLinked.value) {
    leftScrollHandler = () => {
      if (rightThumbnail.value && leftThumbnail.value) {
        rightThumbnail.value.scrollLeft = leftThumbnail.value.scrollLeft
      }
    }
    rightScrollHandler = () => {
      if (rightThumbnail.value && leftThumbnail.value) {
        leftThumbnail.value.scrollLeft = rightThumbnail.value.scrollLeft
      }
    }

    leftThumbnail.value.addEventListener('scroll', leftScrollHandler)
    rightThumbnail.value.addEventListener('scroll', rightScrollHandler)
  }
})

// 📦 S3画像取得
async function fetchImages(folderName: string) {
  loading.value = true
  try {
    const res = await $fetch('/api/list-images', {
      params: { folder: folderName }
    })
    images.value = (res.images || []).map((i: any) => ({
      url: i.url,
      name: i.key?.split('/').pop() || '不明'
    }))
    leftIndex.value = 0
    rightIndex.value = images.value.length > 1 ? 1 : 0
  } catch (err) {
    console.error('画像取得失敗', err)
    images.value = []
  } finally {
    loading.value = false
  }
}

//左右の画像が正常に切り替
function selectLeftImage(index: number) {
  leftIndex.value = index
}

function selectRightImage(index: number) {
  rightIndex.value = index
}

// ⭐️ お気に入り登録
function addLeftToFavorites() {
  favoritesStore.addFavorite(leftImage.value)
}
function addRightToFavorites() {
  favoritesStore.addFavorite(rightImage.value)
}

// ▶️ 次へ
function nextImage(side: 'left' | 'right') {
  if (images.value.length === 0) return
  if (side === 'left') {
    leftIndex.value = (leftIndex.value + 1) % images.value.length
  } else {
    rightIndex.value = (rightIndex.value + 1) % images.value.length
  }
}

</script>

<style scoped>
/* 必要に応じてスタイル追加 */
.zoomable {
  max-width: 100%;
  cursor: zoom-in;
}

.toggle-scroll-link {
  margin: 1em;
}

.image-selector {
  max-width: 1200px;
  margin: 0 auto;
}

.monitor-container {
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
}
.monitor {
  flex: 1;
  border: 1px solid #ccc;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: visible;
  position: relative;
}
.image-wrapper {
  height: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.monitor img {
  max-width: 100%;
  max-height: 100%;
}
.image-name {
  width: 100%;
  text-align: center;
  background: rgba(255, 255, 255, 0.9);
  padding: 8px;
  box-sizing: border-box;
  font-weight: bold;
  overflow-wrap: break-word;
}

.thumbnail-container {
  display: flex;
  justify-content: space-between;
  gap: 20px;
  margin-bottom: 20px;
}
.thumbnail {
  flex: 1;
  height: 180px;
  overflow-x: auto;
  border: 1px solid #ccc;
  display: flex;
  gap: 10px;
  padding: 5px;
}
.thumbnail-item {
  position: relative;
}
.thumbnail-item.active {
  background-color: #e0e0e0; /* 追加 */
}
.thumbnail-item img {
  display: block;
  height: 100%;
}
.thumb-name {
  display: block;
  text-align: center;
  margin-top: 5px;
  font-size: 14px;
  color: #333;
  background: rgba(255, 255, 255, 0.9);
  padding: 4px 6px;
  border-radius: 4px;
  overflow-wrap: break-word;
}

.controls,
.favorites-nav {
  text-align: center;
  margin-bottom: 20px;
}
.favorites-button {
  background-color: #007bff;
  border: none;
  color: white;
  padding: 8px 16px;
  font-size: 16px;
  cursor: pointer;
  border-radius: 4px;
}

.favorites {
  border-top: 1px solid #ccc;
  padding-top: 20px;
}
.favorites-gallery {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}
.favorite-item {
  cursor: pointer;
}
.favorite-item img {
  width: 100px;
  border: 1px solid #ccc;
}
.favorite-button {
  display: inline-flex;
  align-items: center;
  gap: 8px; /* アイコンとテキストの隙間 */
  padding: 8px 12px;
  font-size: 16px;
  cursor: pointer;
}

/* 右用ボタンはアイコンを右側に */
.right-favorite {
  flex-direction: row-reverse;
}
</style>