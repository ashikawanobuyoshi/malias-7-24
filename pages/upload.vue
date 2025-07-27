<template>
  <div>
    <input type="file" @change="onFileChange" />
    <client-only>
      <button @click="uploadFile" :disabled="!selectedFile">アップロード</button>
      <p v-if="imageUrl">
        画像URL: <a :href="imageUrl" target="_blank">{{ imageUrl }}</a>
      </p>
    </client-only>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const selectedFile = ref(null)
const imageUrl = ref('')

function onFileChange(e) {
  selectedFile.value = e.target.files[0]
}

async function uploadFile() {
  if (!selectedFile.value) return

  const file = selectedFile.value
  const fileName = encodeURIComponent(file.name)

  try {
    // サーバーからPresigned URLを取得
    const res = await fetch(`/api/presign?fileName=${fileName}`)
    const { url } = await res.json()

    // 実際にS3へPUT（Content-Type設定）
    const uploadRes = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': file.type
      },
      body: file
    })

    if (uploadRes.ok) {
      const s3Url = url.split('?')[0]
      imageUrl.value = s3Url
      localStorage.setItem('image_url', s3Url) // ← 保存
      alert('アップロード成功: ' + s3Url)
    } else {
      alert('アップロード失敗')
    }
  } catch (error) {
    console.error('アップロード中にエラー:', error)
    alert('アップロードに失敗しました。')
  }
}

// クライアント側でのみlocalStorageから復元
onMounted(() => {
  const savedUrl = localStorage.getItem('image_url')
  if (savedUrl) {
    imageUrl.value = savedUrl
  }
})
</script>
