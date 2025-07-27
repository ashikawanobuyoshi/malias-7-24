<template>
  <div v-if="product">
    <h1>{{ product.productName }}</h1>
    <p>{{ product.description }}</p>
  </div>
  <div v-else>
    <p>商品情報を読み込み中です...</p>
  </div>
  <main class="pb-24">
    <div class="p-4 space-y-6">
      <!-- 戻るボタン -->
      <button @click="handleGoBack" class="px-4 py-2 bg-gray-200 rounded">
        ← 戻る
      </button>

      <!-- 商品詳細 -->
      <div v-if="plainProduct" class="space-y-4">
        <h2 class="text-2xl font-bold">{{ plainProduct.productName }}</h2>
        <img :src="plainProduct.src" alt="" class="w-full max-w-sm rounded" />
        <p class="whitespace-pre-line">{{ plainProduct.description }}</p>
      </div>

      <!-- お気に入り画像一覧 -->
      <div class="favorites-gallery">
        <h3 class="text-xl font-semibold mb-4 text-gray-800 border-b pb-2">
          📷 お気に入り画像一覧
        </h3>

        <div
          v-if="favoritesStore.favoriteImages.length === 0"
          class="text-gray-600"
        >
          お気に入り画像はありません
        </div>

        <!-- 画像があるとき -->
        <div v-else class="favorites-list flex flex-wrap gap-4">
          <div
            v-for="(favImg, index) in favoritesStore.favoriteImages"
            :key="index"
            class="favorite-item border p-4 rounded shadow-sm w-60 flex flex-col items-center bg-white"
          >
            <!-- 画像表示 -->
            <div
              class="w-40 h-40 flex items-center justify-center bg-gray-50 rounded mb-3 border"
            >
              <img
                :src="favImg.url"
                alt="お気に入り画像"
                class="max-w-full h-auto object-contain rounded border"
              />
            </div>

            <!-- ファイル名 -->
            <p
              class="font-medium mb-2 text-center break-words w-full text-gray-700"
            >
              ファイル名: {{ favImg.fileName }}
            </p>

            <!-- 商品IDが1のときのみ表示される注文フォーム -->
            <div v-if="productId === '1'" class="w-full">
              <!-- プリント種類セレクター -->
              <label class="block mb-2 w-full text-sm text-gray-700">
                <span class="block mb-1 font-semibold">プリント種類:</span>
                <select
                  v-model="favImg.selectedType"
                  class="border rounded px-2 py-1 w-full"
                >
                  <option disabled value="">選択してください</option>
                  <option value="四つ切">四つ切</option>
                  <option value="六切り">六切り</option>
                  <option value="キャビネ">キャビネ</option>
                  <option value="手札">手札</option>
                </select>
              </label>

              <!-- 枚数入力 -->
              <label class="block mb-2 w-full text-sm text-gray-700">
                <span class="block mb-1 font-semibold">枚数:</span>
                <input
                  type="number"
                  v-model.number="favImg.quantity"
                  min="1"
                  class="border rounded px-2 py-1 w-full"
                />
              </label>

              <!-- 小計 -->
              <p class="mt-2 font-semibold text-gray-800 text-center w-full">
                小計: ¥{{
                  calculatePrice(
                    favImg.selectedType,
                    favImg.quantity
                  ).toLocaleString()
                }}
              </p>

              <!-- 注文ボタン -->
              <button
                class="mt-3 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 w-full"
                @click="orderImage(favImg)"
              >
                注文する
              </button>
            </div>

            <!-- 削除ボタン -->
            <button
              @click="removeFavorite(index)"
              class="text-red-600 font-bold text-xl mt-4"
              title="削除"
            >
              ×
            </button>
          </div>
        </div>
      </div>

      <!-- 追加オプション -->
      <div>
        <h3 class="text-lg font-semibold mt-6">オプション選択</h3>

        <!-- 2列のグリッド -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div
            v-for="(item, index) in additionalItems"
            :key="index"
            class="flex items-center border p-2 rounded shadow-sm bg-white"
          >
            <!-- 左: 画像 -->
            <img
              v-if="item.image"
              :src="item.image"
              alt="オプション画像"
              class="w-20 h-20 object-contain mr-4"
            />

            <!-- 右: チェックボックスと説明 -->
            <div class="flex-1">
              <label class="flex items-start">
                <input
                  type="checkbox"
                  v-model="item.selected"
                  class="mr-2 mt-1"
                  @change="onSelectChange(item)"
                />
                <span class="font-medium text-gray-800">
                  {{ item.name }}（+¥{{ item.price.toLocaleString() }}）
                </span>
              </label>

              <!-- 説明文 -->
              <p
                v-if="item.description"
                class="text-sm text-gray-600 mt-1"
                v-html="item.description"
              ></p>

              <!-- ✅ 数量入力（選択された場合のみ表示） -->
              <div
                v-if="item.selected"
                class="mt-2 flex items-center space-x-2"
              >
                <button
                  class="px-2 py-1 bg-gray-200 rounded"
                  @click="decreaseQuantity(item)"
                >
                  －
                </button>

                <input
                  type="number"
                  v-model.number="item.quantity"
                  min="1"
                  class="w-16 text-center border rounded"
                />

                <button
                  class="px-2 py-1 bg-gray-200 rounded"
                  @click="increaseQuantity(item)"
                >
                  ＋
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- カスタムアイテム入力欄 -->
        <div class="space-y-4 border p-4 rounded bg-gray-50">
          <div>
            <label class="block text-sm font-medium mb-1">上記メニューに無い商品をご希望の場合に、ご記入下さい。</label>
            <input
              v-model="newCustomItem.fileName"
              placeholder="例: custom.jpg"
              class="border p-2 w-full rounded"
            />
          </div>

          <div>
            <label class="block text-sm font-medium mb-1">仕上げ方</label>
            <input
              v-model="newCustomItem.name"
              placeholder="例: 特注アルバム"
              class="border p-2 w-full rounded"
            />
          </div>

          <div>
            <label class="block text-sm font-medium mb-1">商品価格（円）</label>
            <input
              type="number"
              v-model.number="newCustomItem.price"
              placeholder="例: 12000"
              class="border p-2 w-full rounded"
            />
          </div>

          <div>
            <label class="block text-sm font-medium mb-1">数量</label>
            <input
              type="number"
              v-model.number="newCustomItem.quantity"
              placeholder="1"
              min="1"
              class="border p-2 w-full rounded"
            />
          </div>

          <button
            @click="addCustomItem"
            class="px-4 py-2 bg-blue-600 text-white rounded"
          >
            カスタムアイテムを追加
          </button>
        </div>

        <!-- ✅ 追加済みオプション表示 -->
        <div v-if="selectedAdditionalItems.length > 0" class="mt-4 space-y-2">
          <h4 class="text-lg font-semibold">追加済みオプション</h4>
          <div
            v-for="(item, index) in selectedAdditionalItems"
            :key="index"
            class="border p-2 rounded flex justify-between items-center"
          >
            <div>
              {{ item.name }} - ¥{{ item.price.toLocaleString() }} ×
              {{ item.quantity }}
            </div>
            <button
              @click="
                () => {
                  item.selected = false;
                  item.quantity = 0;
                }
              "
              class="text-red-600 underline"
            >
              削除
            </button>
          </div>
        </div>

        <!-- 登録済みカスタムアイテム一覧 -->
        <div v-if="customItems.length > 0" class="mt-4 space-y-2">
          <h4 class="text-lg font-semibold">追加済みアイテム</h4>
          <div
            v-for="(item, index) in customItems"
            :key="index"
            class="border p-2 rounded flex justify-between items-center"
          >
            <div>
              {{ item.fileName || item.name }} - ¥{{
                item.price.toLocaleString()
              }}
              × {{ item.quantity }}
            </div>
            <button
              @click="customItems.splice(index, 1)"
              class="text-red-600 underline"
            >
              削除
            </button>
          </div>
        </div>
      </div>

      <!-- 合計金額 -->
      <div>
        <p>合計金額（税抜）：¥{{ totalPrice.toLocaleString() }}</p>
        <p class="font-bold">
          合計金額（税込）：¥{{ totalPriceWithTax.toLocaleString() }}
        </p>
      </div>
    </div>

    <!-- 注文フォーム -->
    <div class="space-y-2 pb-32">
      <h3 class="text-xl font-semibold">お客様情報</h3>

      <input
        v-model="form.customerName"
        placeholder="お名前（必須）"
        class="w-full border p-2 rounded"
        :class="{ 'border-red-500': !form.customerName && formTouched }"
      />

      <input
        v-model="form.email"
        placeholder="メールアドレス（必須）"
        class="w-full border p-2 rounded"
        :class="{
          'border-red-500':
            (!form.email || !emailRegex.test(form.email)) && formTouched,
        }"
      />

      <textarea
        v-model="form.comment"
        placeholder="備考（例：お写真の貼る順番 1:左 2:中央 3:右）"
        class="w-full border p-2 rounded h-24"
      ></textarea>

      <p v-if="success" class="text-green-600 font-semibold">
        ご注文ありがとうございました！確認メールを送信しました。
      </p>
      <p v-if="error" class="text-red-600 font-semibold">
        {{ error }}
      </p>
    </div>
  </main>

  <!-- 注文ボタンを画面下に固定 -->
  <div
    class="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 z-50"
  >
    <button
      @click="submitOrder"
      :disabled="isSubmitting"
      class="w-full px-4 py-3 bg-green-500 text-white rounded-lg font-semibold text-lg hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {{ isSubmitting ? "送信中..." : "注文を確定する" }}
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useAsyncData } from "#app";
import { useFavoritesStore } from "~/stores/favorites";
import type { OptionItem } from "~/types/OptionItem";
import type { CustomItem } from "~/types/CustomItem";

// -------------------- ルート＆ルーター --------------------
const route = useRoute();
const router = useRouter();
const isSubmitting = ref(false);
const productId = computed(() => route.params.id?.toString() ?? "");

watchEffect(() => {
  console.log("🧪 typeof productId:", typeof productId);         // → object（computedの型）
  console.log("🧪 typeof productId.value:", typeof productId.value); // → string または undefined
  console.log("🧪 productId.value:", productId.value);
  if (!productId.value || productId.value === "undefined") {
    console.warn("Invalid product ID:", productId.value);
    router.replace("/");
  }
});
// -------------------- 商品ID --------------------

console.log("Product ID:", productId.value);

// -------------------- 商品情報 --------------------
const { data: product } = await useAsyncData("product", () => {
  const id = String(route.params.id ?? "");
  return $fetch(`/api/products/${id}`);
});

// -------------------- 戻るボタン --------------------
const handleGoBack = () => {
  if (window.history.length > 1) {
    router.back();
  } else {
    router.push("/"); // or a fallback route
  }
};

// -------------------- ストアとカスタム項目 --------------------
const favoritesStore = useFavoritesStore();
const additionalItems = ref<OptionItem[]>([]);
const customItems = ref<CustomItem[]>([]);

// -------------------- プレーン商品（初期値） --------------------
const plainProduct = ref({ name: "商品名", price: 0 });

// -------------------- ルート変更時や初期表示時のフェッチ --------------------
watch(
  () => productId.value,
  async (newId) => {
    if (!newId) {
      console.warn("productId is undefined or empty. Fetch skipped.");
      return;
    }

 console.log("🧪 Fetch対象の productId:", newId); // ← 追加


    try {
      const res = await $fetch(`/api/print-options?productId=${newId}`);
       console.log("📦 print-options APIレスポンス:", res); // ← レスポンス確認

      additionalItems.value = res.map((item: any) => ({
        ...item,
        selected: false,
        quantity: 0,
      }));
    } catch (error) {
      console.error("❌ print-options の取得に失敗:", error);
    }
  },
  { immediate: true }
);

// -------------------- 型定義 --------------------
interface Product {
  id: number;
  src: string;
  productName: string;
  description: string;
  price: string;
}
interface CustomItem {
  name: string;
  price: number;
  quantity: number;
}
interface PrintOption {
  id: number;
  label: string;
  value: string;
}
interface FavoriteImage {
  fileName: string;
  url: string;
  selectedType?: string;
  selectedSize?: string;
  quantity?: number;
}
interface OptionItem {
  id: number;
  label: string;
  value: string;
  price: number;
  selected?: boolean; // ✅ ← これが必要
}
// -------------------- データ --------------------
const products: Product[] = [
  {
    src: "/option-images/print/printo_nomi.jpg",
    productName: "プリント",
    description: `サイズ
四切りプリント 254㎜×305㎜
六切りプリント 205㎜×254㎜
キャビネプリント 180㎜×127㎜
手札プリント 127㎜×89㎜

四切りプリント 5,800 円（6,380 円 税込）
六切りプリント 4,800 円（5,280 円 税込）
キャビネプリント 3,800 円（4,180 円 税込）
手札プリント 3,500 円（3,850 円 税込）`,
    productId: 1,
  },
  {
    src: "/option-images/print/cd_puran.jpg",
    description: `CDプラン

CD三万プラン
32,780 円（36,080 円 税込）

CD五万プラン
49,800 円（54,780 円 税込）

CD七万プラン
69,800 円（76,780 円 税込）`,
    productId: 2,
  },
  {
    src: "/option-images/print/photo_collection.jpg",
    description: `＊デザインアルバム
6P(24カット)＋CD原本＝49,800円（54,780円 税込）
＊絵本BOOK
4P（6カット）＋CD原本＝34,800円（38,280円 税込）
＊プレミアムデザインアルバム
6P(24カット)＋CD原本＝49,800円（54,780円 税込）`,
    productId: 3,
  },
  {
    src: "/option-images/print/6tsugiri_3.jpg",
    description: `お宮参りプラン
＊お宮参りプラン：A
49,800円（54,780円 税込）
＊お宮参りプラン：B
65,000円（71,500円 税込）
＊お宮参りプラン：C
32,100円（35,310円 税込）
＊お宮参りプラン：D
50,000円（55,000円 税込）
＊お宮参りプラン：E
54,800円（60,280円 税込）
＊お宮参りプラン：F
60,000円（66,000円 税込）
＊お宮参りプラン：スペシャルセット
80,000円（88,000円 税込）`,
    productId: 4,
  },
  {
    src: "/option-images/print/4tsugiri_3.jpg",
    description: `七五三ＣＤセットプラン
＊七五三ＣＤプラン：A
32,800 円（36,080円）
＊七五三ＣＤプラン：B
49,800 円（54,780円）
＊七五三ＣＤプラン：C
69,800 円（76,780円））`,
    productId: 5,
  },
  {
    src: "/option-images/print/6tsugiri_3.jpg",
    description: `六つ切りプリント
＊プリント料金 4,800 円（5,280 円 税込）
＊紙台紙付プリント料金 6,800 円（7,480 円 税込）`,
    style: { width: "170px", height: "auto" },
    productId: 6,
  },
  {
    src: "/option-images/print/4tsugiri_3.jpg",
    description: `四つ切りプリント
＊プリント料金 5,800 円（6,380 円 税込）
＊紙台紙付プリント料金 7,800 円（8,580 円 税込）
＊額付プリント料金 8,550 円（9,405 円 税込）`,
    productId: 7,
  },
  {
    src: "/option-images/print/6tsugiri_3.jpg",
    description: `六つ切りプリント
＊プリント料金 4,800 円（5,280 円 税込）
＊紙台紙付プリント料金 6,800 円（7,480 円 税込）`,
    style: { width: "170px", height: "auto" },
    productId: 8,
  },
  {
    src: "/option-images/print/4tsugiri_3.jpg",
    description: `四つ切りプリント
＊プリント料金 5,800 円（6,380 円 税込）
＊紙台紙付プリント料金 7,800 円（8,580 円 税込）
＊額付プリント料金 8,550 円（9,405 円 税込）`,
    productId: 9,
  },
  {
    src: "/option-images/print/6tsugiri_3.jpg",
    description: `六つ切りプリント
＊プリント料金 4,800 円（5,280 円 税込）
＊紙台紙付プリント料金 6,800 円（7,480 円 税込）`,
    style: { width: "170px", height: "auto" },
    productId: 10,
  },
];

// -------------------- お気に入り画像 --------------------
onMounted(() => {
  const stored = localStorage.getItem("favoriteImages");
  if (stored) {
    try {
      favoritesStore.favoriteImages = deserializeJson(stored);
    } catch (e) {
      console.error("復元失敗:", e);
    }
  }
});
watch(
  () => favoritesStore.favoriteImages,
  (val) => {
    localStorage.setItem("favoriteImages", serializeJson(val));
  },
  { deep: true }
);

// -------------------- 単価と金額計算 --------------------
function calculatePrice(type?: string, quantity?: number): number {
  const prices: Record<string, number> = {
    四つ切: 5800,
    六切り: 4800,
    キャビネ: 3800,
    手札: 3500,
  };
  if (!type || !quantity) return 0;
  return prices[type] * quantity;
}

// ✅ ここに貼り付け
function orderImage(img: FavoriteImage) {
  if (!img.selectedType || !img.quantity || img.quantity < 1) {
    alert("プリント種類と枚数を正しく入力してください。");
    return;
  }

  // 注文処理（今回はログ出力）
  console.log("注文された画像:", img);
}

// -------------------- お気に入り削除処理 --------------------
const removeFavorite = (index: number) => {
  favoritesStore.favoriteImages.splice(index, 1);
};

// -------------------- 追加オプション --------------------
// server/print-options.tsへ----------

type AdditionalItem = {
  name: string;
  price: number;
  image?: string;
  description?: string;
  selected: boolean;
  quantity: number;
};

// ✅ チェック状態と数量制御
const onSelectChange = (item: AdditionalItem) => {
  if (item.selected && item.quantity === 0) {
    item.quantity = 1;
  } else if (!item.selected) {
    item.quantity = 0;
  }
};

const increaseQuantity = (item: AdditionalItem) => {
  item.quantity++;
};

const decreaseQuantity = (item: AdditionalItem) => {
  if (item.quantity > 1) {
    item.quantity--;
  }
};

// ✅ 選択されたアイテムのみにフィルター
const selectedAdditionalItems = computed(() =>
  additionalItems.value.filter((item) => item.selected && item.quantity > 0)
);

// ✅ オプション合計（任意）
const additionalTotal = computed(() =>
  selectedAdditionalItems.value.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  )
);

// -------------------- カスタムアイテム --------------------
const newCustomItem = ref<CustomItem>({
  name: "",
  price: 0,
  quantity: 1,
  fileName: "",
});

const addCustomItem = () => {
  const item = newCustomItem.value;
  if (
    item.fileName &&
    item.name.trim() !== "" &&
    item.price > 0 &&
    item.quantity > 0
  ) {
    customItems.value.push({ ...item });
    newCustomItem.value = { name: "", price: 0, quantity: 1, fileName: "" };
  } else {
    alert("ファイル名、名前、価格、数量をすべて入力してください。");
  }
};

// -------------------- 印刷オプション取得 --------------------
const printOptions = ref<PrintOption[]>([]);

// ページ読み込み時にAPIから取得
onMounted(async () => {
  try {
    const data = await $fetch<OptionItem[]>("/api/print-options", {
      params: { productId },
    });

    // quantity を明示的に追加（初期化）
    additionalItems.value = data.map((item) => ({
      ...item,
      quantity: 1,
    }));
  } catch (err) {
    console.error("追加オプションの取得に失敗しました:", err);
  }
});

// -------------------- 合計金額計算 --------------------
const TAX_RATE = 0.1;

const totalPrice = computed(() => {
  const favTotal = Array.isArray(favoritesStore.favoriteImages)
    ? favoritesStore.favoriteImages.reduce(
        (sum, img) => sum + calculatePrice(img.selectedType, img.quantity),
        0
      )
    : 0;

  const customTotal = (customItems.value ?? []).reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const optionTotal = (additionalItems.value ?? []).reduce(
    (sum, item) =>
      item.selected && item.quantity && item.price
        ? sum + item.price * item.quantity
        : sum,
    0
  );

  return favTotal + customTotal + optionTotal;
});
const totalPriceWithTax = computed(() =>
  Math.round(totalPrice.value * (1 + TAX_RATE))
);

// -------------------- メール送信 --------------------

const { sendEmail: sendRealEmail } = useSendEmail();
const ADMIN_EMAILS = ["info@syashin8.com"];

const form = ref({
  customerName: "",
  email: "",
  address: "",
  comment: "",
});

const success = ref(false);
const error = ref("");

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const sendEmailWrapper = async (orderDetails: any) => {

   console.log("🧪 orderDetails.images:", orderDetails?.images);

  const recipients = [
    ...(orderDetails.address ? [orderDetails.address] : []),
    ...ADMIN_EMAILS,
  ];

  const subject = "【注文確定】ご注文ありがとうございます";

  // ✅ 注文商品一覧
const hasItems = Array.isArray(orderDetails.items) && orderDetails.items.length > 0;
const hasImages = Array.isArray(orderDetails.images) && orderDetails.images.length > 0;

let itemsHtml = "";

if (hasItems) {
  itemsHtml = `
    <ul>
      ${orderDetails.items.map((item: any) => {
        return `
          <li>
            ${item.fileName ? `ファイル名: ${item.fileName}<br>` : ""}
            ${item.name || ""} × ${item.quantity || 1}：¥${(item.price || 0).toLocaleString()}
          </li>
        `;
      }).join("")}
    </ul>
  `;
} else if (!hasImages) {
  // items も images もないときだけ出す
  itemsHtml = "<p>画像の注文はありません。</p>";
}

  // ✅ 追加オプション
  const additionalHtml = Array.isArray(orderDetails.additionalItems) && orderDetails.additionalItems.length
    ? `
    <p><strong>【追加オプション】</strong></p>
    <ul>
      ${orderDetails.additionalItems.map((opt: any) => {
        return `
          <li>${opt.label} × ${opt.quantity}：¥${(opt.price * opt.quantity).toLocaleString()}</li>
        `;
      }).join("")}
    </ul>
  `
    : "";

  // ✅ カスタムアイテム
  const customHtml = Array.isArray(orderDetails.customItems) && orderDetails.customItems.length
    ? `
    <p><strong>【カスタムアイテム】</strong></p>
    <ul>
      ${orderDetails.customItems.map((item: any) => {
        return `
          <li>
            ファイル名: ${item.fileName || "（ファイル名不明）"}<br>
            ${item.name || "（名称未設定）"} × ${item.quantity || 1}：¥${((item.price || 0) * (item.quantity || 1)).toLocaleString()}
          </li>
        `;
      }).join("")}
    </ul>
  `
    : "";

  // ✅ お気に入り画像（画像URLの一覧を表示）
  const imageListHtml = Array.isArray(orderDetails.images) && orderDetails.images.length
    ? `
    <p><strong>【お気に入り画像】</strong></p>
    <ul>
      ${orderDetails.images.map((img: any, index: number) => {
        return `<li>画像 ${index + 1}: <a href="${img.url}" target="_blank">${img.filename || img.url}</a></li>`;
      }).join("")}
    </ul>
  `
    : "";

  // ✅ 備考
  const commentHtml = orderDetails.comment
    ? `<p>備考　お写真の貼り順等:<br>${orderDetails.comment.replace(/\n/g, "<br>")}</p>`
    : "";

  // ✅ 合計金額
  const totalHtml = `<p>合計（税込）: ¥${orderDetails.totalWithTax.toLocaleString()}</p>`;

  // ✅ 全体 HTML 組み立て
  const html = `
    <p>${orderDetails.customerName} 様、</p>
    <p>以下の内容でご注文を承りました：</p>
    ${itemsHtml}
    ${additionalHtml}
    ${customHtml}
    ${imageListHtml}
    ${totalHtml}
    ${commentHtml}
    <p>ご利用ありがとうございました。</p>
  `;

  // ✅ メール送信
  try {
    await Promise.all(
      recipients.map((to: string) =>
        sendRealEmail({ to, subject, html })
      )
    );
    return { success: true };
  } catch (err: any) {
    console.error("メール送信エラー:", err);
    if (err.response) {
      console.error("Response data:", err.response.data);
      console.error("Response status:", err.response.status);
    }
    return {
      success: false,
      message: "メール送信に失敗しました。",
    };
  }
};


// -------------------- 注文確定 --------------------
const submitOrder = async () => {
  if (isSubmitting.value) return;
  isSubmitting.value = true;

  if (
    !form.value.customerName ||
    !form.value.email ||
    !emailRegex.test(form.value.email)
  ) {
    alert("お名前と正しいメールアドレスを入力してください。");
    isSubmitting.value = false;
    return;
  }

  const favoriteItems = favoritesStore.favoriteImages
    .filter((item) => item.selectedType && item.quantity > 0)
    .map((item) => ({
      fileName: item.fileName,
      name: item.selectedType,
      quantity: item.quantity,
      price: calculatePrice(item.selectedType, item.quantity),
    }));

  const additional = selectedAdditionalItems.value.map((item) => ({
    id: item.id,
    label: item.name,
    quantity: item.quantity,
    price: item.price,
  }));

  const customs = customItems.value.map((item) => ({
    fileName: item.fileName || "(ファイル名不明)",
    name: item.name || "(名称未設定)",
    quantity: item.quantity,
    price: item.price,
  }));

  const allItems = [...favoriteItems, ...additional, ...customs];
  if (allItems.length === 0) {
    alert("注文内容が空です。");
    isSubmitting.value = false;
    return;
  }

const orderDetails = {
  customerName: form.value.customerName,
  address: form.value.email,
  comment: form.value.comment,
  images: favoritesStore.favoriteImages.map((img) => ({
    filename: img.fileName,
    url: img.url
  })), // ✅ 必要な情報のみ抽出して送る
  customItems: customs,
  additionalItems: additional,
  total: totalPrice.value,
  totalWithTax: totalPriceWithTax.value,
};

// ✅ このログを追加することで、送信直前の画像情報が正しく入っているか確認できます
console.log("🧪 favoriteImages（送信前）:", JSON.stringify(favoritesStore.favoriteImages, null, 2));
console.log("🧪 orderDetails.images:", JSON.stringify(orderDetails.images, null, 2));

  const result = await sendEmailWrapper(orderDetails);

  if (result.success) {
    success.value = true;
    error.value = "";
    alert("ご注文ありがとうございました。確認メールを送信しました。");

    // フォームリセット
    favoritesStore.favoriteImages = [];
    customItems.value = [];
    additionalItems.value.forEach((item) => (item.selected = false));
    form.value = {
      customerName: "",
      email: "",
      address: "",
      comment: "",
    };
  } else {
    success.value = false;
    error.value = result.message || "メール送信に失敗しました。";
    alert("ご注文は受け付けましたが、確認メールの送信に失敗しました。");
  }

  isSubmitting.value = false;
};


// -------------------- 管理者機能 --------------------
const isAdmin = ref(false);
const user = { email: "info@syashin8.com" };
if (ADMIN_EMAILS.includes(user.email)) {
  isAdmin.value = true;
  console.log("管理者モード");
}
const showAdminDashboard = () => {
  console.log("ダッシュボード表示");
};

// -------------------- 戻る --------------------
const goBack = () => router.go(-1);
</script>

<style scoped>
/* ページヘッダー */
.page-header {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-bottom: 20px;
}
.back-button {
  background-color: blue;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
}
.back-button:hover {
  background-color: darkblue;
}

/* お気に入りギャラリーのスタイル */

.favorites-gallery {
  padding: 20px;
  margin-bottom: 30px;
  background: #ffffff;
  border: 1px solid #ddd;
  border-radius: 4px;
}
.favorites-gallery h3 {
  margin-bottom: 10px;
}

/* ★ 縦並びに変更 ★ */
.favorites-list {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  justify-content: flex-start;
}

.favorite-item {
  width: 200px;
  padding: 10px;
  border: 1px solid #eee;
  border-radius: 4px;
  background-color: #fafafa;
  box-sizing: border-box;
  text-align: center;

  display: flex; /* 横並びのデフォルト */
  flex-direction: column; /* これで縦並びにします */
  align-items: center; /* 中央寄せ */
  font-size: 14px;
}

.favorite-item img {
  width: 100%;
  max-width: 150px; /* 最大幅150pxで制限 */
  height: auto; /* アスペクト比を維持して高さを自動調整 */
  object-fit: contain; /* 画像の全体を表示（トリミングしない） */
  border: 1px solid #ccc;
  margin-bottom: 8px;
}

.fav-image-name {
  font-weight: bold;
  margin-bottom: 6px;
  max-width: 180px;
  word-wrap: break-word;
}

.favorite-item select,
.favorite-item input[type="number"] {
  width: 180px;
  padding: 6px;
  font-size: 14px;
  margin-bottom: 6px;
  box-sizing: border-box;
}

.order-details {
  background-color: #f7f7f7;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 13px;
  max-width: 180px;
  word-wrap: break-word;
}

/* 商品詳細エリア：３カラムレイアウト */
.product-page {
  display: flex;
  gap: 20px;
  padding: 20px;
}
.left-column {
  flex: 1;
  max-width: 30%;
  display: flex;
  flex-direction: column; /* 縦方向に並べる */
  align-items: center;
  justify-content: center;
}
.left-column img {
  max-width: 100%;
  height: auto;
  border: 1px solid #ccc;
}
.center-column {
  flex: 1;
  max-width: 40%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.product-title {
  font-size: 2rem;
  margin-bottom: 10px;
}
.product-description {
  font-size: 1.2rem;
  margin-bottom: 15px;
}
.product-price {
  font-weight: bold;
  font-size: 1.5rem;
}

/* 右カラム：受注明細と受注フォーム */
.right-column {
  flex: 1;
  max-width: 30%;
  border-left: 1px solid #eee;
  padding-left: 20px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}
.right-column h2 {
  margin-bottom: 10px;
}
.order-summary table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 10px;
}
.order-summary table th,
.order-summary table td {
  border: 1px solid #ddd;
  padding: 6px;
  text-align: center;
}
.total {
  text-align: right;
  font-weight: bold;
  margin-bottom: 20px;
}
.order-form form > div {
  margin-bottom: 10px;
}
.order-form label {
  display: block;
  margin-bottom: 5px;
}
.order-form input,
.order-form textarea {
  width: 100%;
  padding: 4px;
  border: 1px solid #ccc;
  border-radius: 4px;
}
.order-form button {
  background-color: #f0c14b;
  border: 1px solid #a88734;
  padding: 8px 12px;
  cursor: pointer;
}
.order-form button:hover {
  background-color: #e2b33b;
}

/* 商品が見つからない場合 */
.not-found {
  padding: 20px;
  text-align: center;
  font-size: 1.5rem;
}
/* 商品説明 */
.desc-line {
  line-height: 0.9; /* 好みの行の高さに調整してください */
  margin: 0 0 8px; /* 行間を離したい場合の余白調整 */
}
/* 消費税 */
.total-with-tax {
  font-weight: bold;
  margin-top: 10px;
  color: #d35400; /* オレンジ系など強調色に */
}

/* メール送信テストフォーム */
.manual-mail-form {
  margin-top: 30px;
  padding: 20px;
  border-top: 1px solid #ddd;
}
.manual-mail-form form {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.manual-mail-form input,
.manual-mail-form textarea {
  width: 100%;
  padding: 8px;
}
.manual-mail-form button {
  background-color: #007bff33;
  color: white;
  padding: 8px 16px;
  border: none;
  cursor: pointer;
}
.manual-mail-form button[disabled] {
  background-color: #aaa;
  cursor: not-allowed;
}
/* tailwind.css */
html,
body,
#__nuxt {
  height: 100%;
}
</style>
