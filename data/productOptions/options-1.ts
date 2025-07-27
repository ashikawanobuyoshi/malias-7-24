// data/productOptions/options-1.ts
import { reactive, ref, watch } from "vue";
export const additionalItems = [
    {
      name: "CD原本",
      price: 29800,
      selected: false,
      image: "/option-images/print/sd1.jpg", // 画像パス
    },
    {
      name: "モバイルストレージ",
      price: 3500,
      selected: false,
      image: "/option-images/print/sd41.jpg",
    },
    {
      name: "オリジナルレザー台紙 六切り 2面",
      price: 4950,
      selected: false,
      image: "/option-images/print/sd2.jpg",
    },
    {
      name: "オリジナルレザー台紙 六切り 3面",
      price: 6600,
      selected: false,
      image: "/option-images/print/sd2.jpg",
    },
    {
      name: "洋風レザー台紙 四切り 2面「ブラウン」",
      price: 4460,
      selected: false,
      image: "/option-images/print/sd3.jpg",
    },
    {
      name: "洋風レザー台紙 四切り 3面「ブラウン」",
      price: 5780,
      selected: false,
      image: "/option-images/print/sd3.jpg",
    },
    {
      name: "洋風レザー台紙 四切り 6面「ブラウン」",
      price: 12930,
      selected: false,
      image: "/option-images/print/sd3.jpg",
    },
    {
      name: "洋風レザー台紙 六切り 2面「ブラウン」",
      price: 3300,
      selected: false,
      image: "/option-images/print/sd3.jpg",
    },
    {
      name: "洋風レザー台紙 六切り 3面「ブラウン」",
      price: 4900,
      selected: false,
      image: "/option-images/print/sd3.jpg",
    },
    {
      name: "洋風レザー台紙 六切り 6面「ブラウン」",
      price: 12540,
      selected: false,
      image: "/option-images/print/sd3.jpg",
    },
    {
      name: "洋風レザー台紙 キャビネ・手札 2面「ブラウン」",
      price: 3190,
      selected: false,
      image: "/option-images/print/sd3.jpg",
    },
    {
      name: "洋風レザー台紙 キャビネ・手札 3面「ブラウン」",
      price: 4205,
      selected: false,
      image: "/option-images/print/sd3.jpg",
    },
    {
      name: "洋風レザー台紙 四切り 2面「ブラック」",
      price: 4460,
      selected: false,
      image: "/option-images/print/sd4.jpg",
    },
    {
      name: "洋風レザー台紙 四切り 3面「ブラック」",
      price: 5780,
      selected: false,
      image: "/option-images/print/sd4.jpg",
    },
    {
      name: "洋風レザー台紙 四切り 6面「ブラック」",
      price: 12930,
      selected: false,
      image: "/option-images/print/sd4.jpg",
    },
    {
      name: "洋風レザー台紙 六切り 2面「ブラック」",
      price: 3300,
      selected: false,
      image: "/option-images/print/sd4.jpg",
    },
    {
      name: "洋風レザー台紙 六切り 3面「ブラック」",
      price: 4900,
      selected: false,
      image: "/option-images/print/sd4.jpg",
    },
    {
      name: "洋風レザー台紙 六切り 6面「ブラック」",
      price: 12540,
      selected: false,
      image: "/option-images/print/sd4.jpg",
    },
    {
      name: "洋風レザー台紙 キャビネ・手札 2面「ブラック」",
      price: 3190,
      selected: false,
      image: "/option-images/print/sd4.jpg",
    },
    {
      name: "洋風レザー台紙 キャビネ・手札 3面「ブラック」",
      price: 4205,
      selected: false,
      image: "/option-images/print/sd4.jpg",
    },
    {
      name: "和風台紙 六切り 2面「赤・黒」",
      price: 7990,
      selected: false,
      image: "/option-images/print/sd5.jpg",
    },
    {
      name: "和風台紙 六切り 3面「赤・黒」",
      price: 10260,
      selected: false,
      image: "/option-images/print/sd5.jpg",
    },
    {
      name: "和風台紙 六切り 6面「赤・黒」",
      price: 16740,
      selected: false,
      image: "/option-images/print/sd5.jpg",
    },
    {
      name: "和風台紙 六切り 2面「ブルー」",
      price: 7990,
      selected: false,
      image: "/option-images/print/sd6.jpg",
    },
    {
      name: "和風台紙 六切り 3面「ブルー」",
      price: 10260,
      selected: false,
      image: "/option-images/print/sd6.jpg",
    },
    {
      name: "和風台紙 六切り 6面「ブルー」",
      price: 16740,
      selected: false,
      image: "/option-images/print/sd6.jpg",
    },
    {
      name: "和風台紙 六切り 2面「黒・紫」",
      price: 7990,
      selected: false,
      image: "/option-images/print/sd7.jpg",
    },
    {
      name: "和風台紙 六切り 3面「黒・紫」",
      price: 10260,
      selected: false,
      image: "/option-images/print/sd7.jpg",
    },
    {
      name: "和風台紙 六切り 6面「黒・紫」",
      price: 16740,
      selected: false,
      image: "/option-images/print/sd7.jpg",
    },
    {
      name: "和風台紙 六切り 2面「ピンク」",
      price: 7990,
      selected: false,
      image: "/option-images/print/sd8.jpg",
    },
    {
      name: "和風台紙 六切り 3面「ピンク」",
      price: 10260,
      selected: false,
      image: "/option-images/print/sd8.jpg",
    },
    {
      name: "和風台紙 六切り 6面「ピンク」",
      price: 16740,
      selected: false,
      image: "/option-images/print/sd8.jpg",
    },
    {
      name: "最高級和風台紙 六切り 2面「青」",
      price: 13610,
      selected: false,
      image: "/option-images/print/sd9.jpg",
    },
    {
      name: "最高級和風台紙 六切り 3面「青」",
      price: 16900,
      selected: false,
      image: "/option-images/print/sd9.jpg",
    },
    {
      name: "最高級和風台紙 六切り 2面「赤」",
      price: 13610,
      selected: false,
      image: "/option-images/print/sd40.jpg",
    },
    {
      name: "最高級和風台紙 六切り 3面「赤」",
      price: 16900,
      selected: false,
      image: "/option-images/print/sd40.jpg",
    },
    {
      name: "フラワー台紙 キャビネ・手札 2面",
      price: 2310,
      selected: false,
      image: "/option-images/print/sd10.jpg",
    },
    {
      name: "フラワー台紙 キャビネ・手札 3面",
      price: 3140,
      selected: false,
      image: "/option-images/print/sd10.jpg",
    },
    {
      name: "増えるアルバム 六切り 8面",
      price: 19800,
      selected: false,
      image: "/option-images/print/sd11.jpg",
    },
    {
      name: "七五三台紙 六切り 3面「白」",
      price: 14500,
      selected: false,
      image: "/option-images/print/sd12.jpg",
    },
    {
      name: "七五三台紙 六切り 6面「白」",
      price: 18300,
      selected: false,
      image: "/option-images/print/sd12.jpg",
    },
    {
      name: "七五三台紙 六切り 3面「ブルー」",
      price: 14500,
      selected: false,
      image: "/option-images/print/sd13.jpg",
    },
    {
      name: "七五三台紙 六切り 6面「ブルー」",
      price: 18300,
      selected: false,
      image: "/option-images/print/sd13.jpg",
    },
    {
      name: "はなごころ台紙 四切り 2面",
      price: 22150,
      selected: false,
      image: "/option-images/print/sd14.jpg",
    },
    {
      name: "はなごころ台紙 四切り 3面",
      price: 26575,
      selected: false,
      image: "/option-images/print/sd14.jpg",
    },
    {
      name: "はなごころ台紙 四切り 6面",
      price: 41700,
      selected: false,
      image: "/option-images/print/sd14.jpg",
    },
    {
      name: "はなごころ台紙 四切り 8面",
      price: 44185,
      selected: false,
      image: "/option-images/print/sd14.jpg",
    },
    {
      name: "はなごころ台紙 四切り 12面",
      price: 54987,
      selected: false,
      image: "/option-images/print/sd14.jpg",
    },
    {
      name: "成人式台紙 六切り 3面",
      price: 13500,
      selected: false,
      image: "/option-images/print/sd16.jpg",
    },
    {
      name: "華雅台紙 六切り 4面「白」",
      price: 11990,
      selected: false,
      image: "/option-images/print/sd17.jpg",
    },
    {
      name: "華雅台紙 六切り 4面「赤」",
      price: 11990,
      selected: false,
      image: "/option-images/print/sd18.jpg",
    },
    {
      name: "紙台紙 四切り 2面",
      price: 2000,
      selected: false,
      image: "/option-images/print/sd19.jpg",
    },
    {
      name: "紙台紙 六切り 2面",
      price: 1740,
      selected: false,
      image: "/option-images/print/sd20.jpg",
    },
    {
      name: "紙台紙 キャビネ 1面",
      price: 940,
      selected: false,
      image: "/option-images/print/sd21.jpg",
    },
    {
      name: "紙台紙 手札 1面",
      price: 730,
      selected: false,
      image: "/option-images/print/sd22.jpg",
    },
    {
      name: "キャンバスフォトフレーム",
      price: 15176,
      selected: false,
      image: "/option-images/print/sd23.jpg",
    },
    {
      name: "スクエアフォトフレーム 六切り 1p",
      price: 6980,
      selected: false,
      image: "/option-images/print/sd24.jpg",
    },
    {
      name: "スクエアフォトフレーム キャビネ 2p",
      price: 6980,
      selected: false,
      image: "/option-images/print/sd25.jpg",
    },
    {
      name: "スクエアフォトフレーム 手札 3p",
      price: 6980,
      selected: false,
      image: "/option-images/print/sd26.jpg",
    },
    {
      name: "スクエアフォトフレーム 手札 4p",
      price: 6980,
      selected: false,
      image: "/option-images/print/sd27.jpg",
    },
    {
      name: "スクエアフォトフレーム 手札 9p",
      price: 6980,
      selected: false,
      image: "/option-images/print/sd28.jpg",
    },
    {
      name: "木製フォトフレーム 四切り「ブラウン」",
      price: 2750,
      selected: false,
      image: "/option-images/print/sd29.jpg",
    },
    {
      name: "木製フォトフレーム 四切り「ベージュ」",
      price: 2750,
      selected: false,
      image: "/option-images/print/sd30.jpg",
    },
    {
      name: "木製フォトフレーム 六切り「ブラウン」",
      price: 1400,
      selected: false,
      image: "/option-images/print/sd29.jpg",
    },
    {
      name: "木製フォトフレーム 六切り「ベージュ」",
      price: 1400,
      selected: false,
      image: "/option-images/print/sd30.jpg",
    },
    {
      name: "木製フォトフレーム キャビネ「キャメル」",
      price: 1250,
      selected: false,
      image: "/option-images/print/sd36.jpg",
    },
    {
      name: "木製フォトフレーム キャビネ「ホワイト」",
      price: 1250,
      selected: false,
      image: "/option-images/print/sd37.jpg",
    },
    {
      name: "2面額 キャビネ「ブラウン」",
      price: 10400,
      selected: false,
      image: "/option-images/print/sd38.jpg",
    },
    {
      name: "2面額 手札「ブラウン」",
      price: 8000,
      selected: false,
      image: "/option-images/print/sd38.jpg",
    },
    {
      name: "パール額セット「ブラック」",
      price: 11750,
      selected: false,
      image: "/option-images/print/sd33.jpg",
    },
    {
      name: "パール額セット「パープル」",
      price: 11750,
      selected: false,
      image: "/option-images/print/sd34.jpg",
    },
    {
      name: "クリスタルグラフィー 1面",
      price: 13150,
      selected: false,
      image: "/option-images/print/sd35.jpg",
    },
    {
      name: "マグネットフォトフレーム",
      price: 950,
      selected: false,
      image: "/option-images/print/sd31.jpg",
    },
    {
      name: "キーホルダー 1面",
      price: 1500,
      selected: false,
      image: "/option-images/print/sd32.jpg",
    },
    {
      name: "キーホルダー 2面",
      price: 2500,
      selected: false,
      image: "/option-images/print/sd32.jpg",
    },
    {
      name: "ネームプレート",
      price: 2710,
      selected: false,
      image: "/option-images/print/sd39.jpg",
    },
  ] as Array<{
  name: string;
  price: number;
  selected: boolean;
  image?: string;
}> = [...];

export type CustomItem = {
  name: string;
  price: number;
  quantity: number;
};

export const selectedAdditionalItems = ref<CustomItem[]>([]);

watch(
  additionalItems,
  () => {
    selectedAdditionalItems.value = additionalItems
      .filter((item) => item.selected)
      .map((item) => ({
        name: item.name,
        price: item.price,
        quantity: 1,
      }));
  },
  { deep: true }
);
