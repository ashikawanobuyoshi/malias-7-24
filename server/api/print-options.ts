// server/print-options.ts
export default defineEventHandler((event) => {
  const query = getQuery(event);
  const id = Number(query.productId || query.id);

  type PrintOption = {
    name: string;
    price: number;
    selected?: boolean;
    image?: string;
    description?: string; // ← 追加
  };

  const optionsMap: Record<number, PrintOption[]> = {
      1: [
        {
          name: "CD原本",
          price: 29800,
          selected: false,
          image: "/option-images/print/sd1.jpg", // 画像パス
          description: "CDの原本です",
        },
        {
          name: "モバイルストレージ",
          price: 3500,
        selected: false,
        image: "/option-images/print/sd41.jpg",
        description: "モバイルストレージの説明",
      },
      {
        name: "オリジナルレザー台紙 六切り 2面",
        price: 4950,
        selected: false,
        image: "/option-images/print/sd2.jpg",
        description: "オリジナルレザー台紙 六切り 2面の説明",
      },
      {
        name: "オリジナルレザー台紙 六切り 3面",
        price: 6600,
        selected: false,
        image: "/option-images/print/sd2.jpg",
        description: "オリジナルレザー台紙 六切り 3面の説明",
      },
      {
        name: "洋風レザー台紙 四切り 2面「ブラウン」",
        price: 4460,
        selected: false,
        image: "/option-images/print/sd3.jpg",
        description: "洋風レザー台紙 四切り 2面「ブラウン」の説明",
      },
      {
        name: "洋風レザー台紙 四切り 3面「ブラウン」",
        price: 5780,
        selected: false,
        image: "/option-images/print/sd3.jpg",
        description: "洋風レザー台紙 四切り 3面「ブラウン」の説明",
      },
      {
        name: "洋風レザー台紙 四切り 6面「ブラウン」",
        price: 12930,
        selected: false,
        image: "/option-images/print/sd3.jpg",
        description: "洋風レザー台紙 四切り 6面「ブラウン」の説明",
      },
      {
        name: "洋風レザー台紙 六切り 2面「ブラウン」",
        price: 3300,
        selected: false,
        image: "/option-images/print/sd3.jpg",
        description: "洋風レザー台紙 六切り 2面「ブラウン」の説明",
      },
      {
        name: "洋風レザー台紙 六切り 3面「ブラウン」",
        price: 4900,
        selected: false,
        image: "/option-images/print/sd3.jpg",
        description: "洋風レザー台紙 六切り 3面「ブラウン」の説明",
      },
      {
        name: "洋風レザー台紙 六切り 6面「ブラウン」",
        price: 12540,
        selected: false,
        image: "/option-images/print/sd3.jpg",
        description: "洋風レザー台紙 六切り 6面「ブラウン」の説明",
      },
      {
        name: "洋風レザー台紙 キャビネ・手札 2面「ブラウン」",
        price: 3190,
        selected: false,
        image: "/option-images/print/sd3.jpg",
        description: "洋風レザー台紙 キャビネ・手札 2面「ブラウン」の説明",
      },
      {
        name: "洋風レザー台紙 キャビネ・手札 3面「ブラウン」",
        price: 4205,
        selected: false,
        image: "/option-images/print/sd3.jpg",
        description: "洋風レザー台紙 キャビネ・手札 3面「ブラウン」の説明",
      },
      {
        name: "洋風レザー台紙 四切り 2面「ブラック」",
        price: 4460,
        selected: false,
        image: "/option-images/print/sd4.jpg",
        description: "洋風レザー台紙 四切り 2面「ブラック」の説明",
      },
      {
        name: "洋風レザー台紙 四切り 3面「ブラック」",
        price: 5780,
        selected: false,
        image: "/option-images/print/sd4.jpg",
        description: "洋風レザー台紙 四切り 3面「ブラック」の説明",
      },
      {
        name: "洋風レザー台紙 四切り 6面「ブラック」",
        price: 12930,
        selected: false,
        image: "/option-images/print/sd4.jpg",
        description: "洋風レザー台紙 四切り 6面「ブラック」の説明",
      },
      {
        name: "洋風レザー台紙 六切り 2面「ブラック」",
        price: 3300,
        selected: false,
        image: "/option-images/print/sd4.jpg",
        description: "洋風レザー台紙 六切り 2面「ブラック」の説明",
      },
      {
        name: "洋風レザー台紙 六切り 3面「ブラック」",
        price: 4900,
        selected: false,
        image: "/option-images/print/sd4.jpg",
        description: "洋風レザー台紙 六切り 3面「ブラック」の説明",
      },
      {
        name: "洋風レザー台紙 六切り 6面「ブラック」",
        price: 12540,
        selected: false,
        image: "/option-images/print/sd4.jpg",
        description: "洋風レザー台紙 六切り 6面「ブラック」の説明",
      },
      {
        name: "洋風レザー台紙 キャビネ・手札 2面「ブラック」",
        price: 3190,
        selected: false,
        image: "/option-images/print/sd4.jpg",
        description: "洋風レザー台紙 キャビネ・手札 2面「ブラック」の説明",
      },
      {
        name: "洋風レザー台紙 キャビネ・手札 3面「ブラック」",
        price: 4205,
        selected: false,
        image: "/option-images/print/sd4.jpg",
        description: "洋風レザー台紙 キャビネ・手札 3面「ブラック」の説明",
      },
      {
        name: "和風台紙 六切り 2面「赤・黒」",
        price: 7990,
        selected: false,
        image: "/option-images/print/sd5.jpg",
        description: "和風台紙 六切り 2面「赤・黒」の説明",
      },
      {
        name: "和風台紙 六切り 3面「赤・黒」",
        price: 10260,
        selected: false,
        image: "/option-images/print/sd5.jpg",
        description: "和風台紙 六切り 3面「赤・黒」の説明",
      },
      {
        name: "和風台紙 六切り 6面「赤・黒」",
        price: 16740,
        selected: false,
        image: "/option-images/print/sd5.jpg",
        description: "和風台紙 六切り 6面「赤・黒」の説明",
      },
      {
        name: "和風台紙 六切り 2面「ブルー」",
        price: 7990,
        selected: false,
        image: "/option-images/print/sd6.jpg",
        description: "和風台紙 六切り 2面「ブルー」の説明",
      },
      {
        name: "和風台紙 六切り 3面「ブルー」",
        price: 10260,
        selected: false,
        image: "/option-images/print/sd6.jpg",
        description: "和風台紙 六切り 3面「ブルー」の説明",
      },
      {
        name: "和風台紙 六切り 6面「ブルー」",
        price: 16740,
        selected: false,
        image: "/option-images/print/sd6.jpg",
        description: "和風台紙 六切り 6面「ブルー」の説明",
      },
      {
        name: "和風台紙 六切り 2面「黒・紫」",
        price: 7990,
        selected: false,
        image: "/option-images/print/sd7.jpg",
        description: "和風台紙 六切り 2面「黒・紫」の説明",
      },
      {
        name: "和風台紙 六切り 3面「黒・紫」",
        price: 10260,
        selected: false,
        image: "/option-images/print/sd7.jpg",
        description: "和風台紙 六切り 3面「黒・紫」の説明",
      },
      {
        name: "和風台紙 六切り 6面「黒・紫」",
        price: 16740,
        selected: false,
        image: "/option-images/print/sd7.jpg",
        description: "和風台紙 六切り 6面「黒・紫」の説明",
      },
      {
        name: "和風台紙 六切り 2面「ピンク」",
        price: 7990,
        selected: false,
        image: "/option-images/print/sd8.jpg",
        description: "和風台紙 六切り 2面「ピンク」の説明",
      },
      {
        name: "和風台紙 六切り 3面「ピンク」",
        price: 10260,
        selected: false,
        image: "/option-images/print/sd8.jpg",
        description: "和風台紙 六切り 3面「ピンク」の説明",
      },
      {
        name: "和風台紙 六切り 6面「ピンク」",
        price: 16740,
        selected: false,
        image: "/option-images/print/sd8.jpg",
        description: "和風台紙 六切り 6面「ピンク」の説明",
      },
      {
        name: "最高級和風台紙 六切り 2面「青」",
        price: 13610,
        selected: false,
        image: "/option-images/print/sd9.jpg",
        description: "最高級和風台紙 六切り 2面「青」の説明",
      },
      {
        name: "最高級和風台紙 六切り 3面「青」",
        price: 16900,
        selected: false,
        image: "/option-images/print/sd9.jpg",
        description: "最高級和風台紙 六切り 3面「青」の説明",
      },
      {
        name: "最高級和風台紙 六切り 2面「赤」",
        price: 13610,
        selected: false,
        image: "/option-images/print/sd40.jpg",
        description: "最高級和風台紙 六切り 2面「赤」の説明",
      },
      {
        name: "最高級和風台紙 六切り 3面「赤」",
        price: 16900,
        selected: false,
        image: "/option-images/print/sd40.jpg",
        description: "最高級和風台紙 六切り 3面「赤」の説明",
      },
      {
        name: "フラワー台紙 キャビネ・手札 2面",
        price: 2310,
        selected: false,
        image: "/option-images/print/sd10.jpg",
        description: "フラワー台紙 キャビネ・手札 2面の説明",
      },
      {
        name: "フラワー台紙 キャビネ・手札 3面",
        price: 3140,
        selected: false,
        image: "/option-images/print/sd10.jpg",
        description: "フラワー台紙 キャビネ・手札 3面の説明",
      },
      {
        name: "増えるアルバム 六切り 8面",
        price: 19800,
        selected: false,
        image: "/option-images/print/sd11.jpg",
        description: "増えるアルバム 六切り 8面の説明",
      },
      {
        name: "七五三台紙 六切り 3面「白」",
        price: 14500,
        selected: false,
        image: "/option-images/print/sd12.jpg",
        description: "七五三台紙 六切り 3面「白」の説明",
      },
      {
        name: "七五三台紙 六切り 6面「白」",
        price: 18300,
        selected: false,
        image: "/option-images/print/sd12.jpg",
        description: "七五三台紙 六切り 6面「白」の説明",
      },
      {
        name: "七五三台紙 六切り 3面「ブルー」",
        price: 14500,
        selected: false,
        image: "/option-images/print/sd13.jpg",
        description: "七五三台紙 六切り 3面「ブルー」の説明",
      },
      {
        name: "七五三台紙 六切り 6面「ブルー」",
        price: 18300,
        selected: false,
        image: "/option-images/print/sd13.jpg",
        description: "七五三台紙 六切り 6面「ブルー」の説明",
      },
      {
        name: "はなごころ台紙 四切り 2面",
        price: 22150,
        selected: false,
        image: "/option-images/print/sd14.jpg",
        description: "はなごころ台紙 四切り 2面の説明",
      },
      {
        name: "はなごころ台紙 四切り 3面",
        price: 26575,
        selected: false,
        image: "/option-images/print/sd14.jpg",
        description: "はなごころ台紙 四切り 3面の説明",
      },
      {
        name: "はなごころ台紙 四切り 6面",
        price: 41700,
        selected: false,
        image: "/option-images/print/sd14.jpg",
        description: "はなごころ台紙 四切り 6面の説明",
      },
      {
        name: "はなごころ台紙 四切り 8面",
        price: 44185,
        selected: false,
        image: "/option-images/print/sd14.jpg",
        description: "はなごころ台紙 四切り 8面の説明",
      },
      {
        name: "はなごころ台紙 四切り 12面",
        price: 54987,
        selected: false,
        image: "/option-images/print/sd14.jpg",
        description: "はなごころ台紙 四切り 12面の説明",
      },
      {
        name: "成人式台紙 六切り 3面",
        price: 13500,
        selected: false,
        image: "/option-images/print/sd16.jpg",
        description: "成人式台紙 六切り 3面の説明",
      },
      {
        name: "華雅台紙 六切り 4面「白」",
        price: 11990,
        selected: false,
        image: "/option-images/print/sd17.jpg",
        description: "華雅台紙 六切り 4面「白」の説明",
      },
      {
        name: "華雅台紙 六切り 4面「赤」",
        price: 11990,
        selected: false,
        image: "/option-images/print/sd18.jpg",
        description: "華雅台紙 六切り 4面「赤」の説明",
      },
      {
        name: "紙台紙 四切り 2面",
        price: 2000,
        selected: false,
        image: "/option-images/print/sd19.jpg",
        description: "紙台紙 四切り 2面の説明",
      },
      {
        name: "紙台紙 六切り 2面",
        price: 1740,
        selected: false,
        image: "/option-images/print/sd20.jpg",
        description: "紙台紙 六切り 2面の説明",
      },
      {
        name: "紙台紙 キャビネ 1面",
        price: 940,
        selected: false,
        image: "/option-images/print/sd21.jpg",
        description: "紙台紙 キャビネ 1面の説明",
      },
      {
        name: "紙台紙 手札 1面",
        price: 730,
        selected: false,
        image: "/option-images/print/sd22.jpg",
        description: "紙台紙 手札 1面の説明",
      },
      {
        name: "キャンバスフォトフレーム",
        price: 15176,
        selected: false,
        image: "/option-images/print/sd23.jpg",
        description: "キャンバスフォトフレームの説明",
      },
      {
        name: "スクエアフォトフレーム 六切り 1p",
        price: 6980,
        selected: false,
        image: "/option-images/print/sd24.jpg",
        description: "スクエアフォトフレーム 六切り 2pの説明",
      },
      {
        name: "スクエアフォトフレーム キャビネ 2p",
        price: 6980,
        selected: false,
        image: "/option-images/print/sd25.jpg",
        description: "スクエアフォトフレーム キャビネ 2pの説明",
      },
      {
        name: "スクエアフォトフレーム 手札 3p",
        price: 6980,
        selected: false,
        image: "/option-images/print/sd26.jpg",
        description: "スクエアフォトフレーム 手札 3pの説明",
      },
      {
        name: "スクエアフォトフレーム 手札 4p",
        price: 6980,
        selected: false,
        image: "/option-images/print/sd27.jpg",
        description: "スクエアフォトフレーム 手札 4pの説明",
      },
      {
        name: "スクエアフォトフレーム 手札 9p",
        price: 6980,
        selected: false,
        image: "/option-images/print/sd28.jpg",
        description: "スクエアフォトフレーム 手札 9pの説明",
      },
      {
        name: "木製フォトフレーム 四切り「ブラウン」",
        price: 2750,
        selected: false,
        image: "/option-images/print/sd29.jpg",
        description: "木製フォトフレーム 四切り「ブラウン」の説明",
      },
      {
        name: "木製フォトフレーム 四切り「ベージュ」",
        price: 2750,
        selected: false,
        image: "/option-images/print/sd30.jpg",
        description: "木製フォトフレーム 四切り「ベージュ」の説明",
      },
      {
        name: "木製フォトフレーム 六切り「ブラウン」",
        price: 1400,
        selected: false,
        image: "/option-images/print/sd29.jpg",
        description: "木製フォトフレーム 六切り「ブラウン」の説明",
      },
      {
        name: "木製フォトフレーム 六切り「ベージュ」",
        price: 1400,
        selected: false,
        image: "/option-images/print/sd30.jpg",
        description: "木製フォトフレーム 六切り「ベージュ」の説明",
      },
      {
        name: "木製フォトフレーム キャビネ「キャメル」",
        price: 1250,
        selected: false,
        image: "/option-images/print/sd36.jpg",
        description: "木製フォトフレーム キャビネ「キャメル」の説明",
      },
      {
        name: "木製フォトフレーム キャビネ「ホワイト」",
        price: 1250,
        selected: false,
        image: "/option-images/print/sd37.jpg",
        description: "木製フォトフレーム キャビネ「ホワイト」の説明",
      },
      {
        name: "2面額 キャビネ「ブラウン」",
        price: 10400,
        selected: false,
        image: "/option-images/print/sd38.jpg",
        description: "2面額 キャビネ「ブラウン」の説明",
      },
      {
        name: "2面額 手札「ブラウン」",
        price: 8000,
        selected: false,
        image: "/option-images/print/sd38.jpg",
        description: "2面額 手札「ブラウン」の説明",
      },
      {
        name: "パール額セット「ブラック」",
        price: 11750,
        selected: false,
        image: "/option-images/print/sd33.jpg",
        description: "パール額セット「ブラック」の説明",
      },
      {
        name: "パール額セット「パープル」",
        price: 11750,
        selected: false,
        image: "/option-images/print/sd34.jpg",
        description: "パール額セット「パープル」の説明",
      },
      {
        name: "クリスタルグラフィー 1面",
        price: 13150,
        selected: false,
        image: "/option-images/print/sd35.jpg",
        description: "クリスタルグラフィー 1面の説明",
      },
      {
        name: "マグネットフォトフレーム",
        price: 950,
        selected: false,
        image: "/option-images/print/sd31.jpg",
        description: "マグネットフォトフレームの説明",
      },
      {
        name: "キーホルダー 1面",
        price: 1500,
        selected: false,
        image: "/option-images/print/sd32.jpg",
        description: "キーホルダー 1面の説明",
      },
      {
        name: "キーホルダー 2面",
        price: 2500,
        selected: false,
        image: "/option-images/print/sd32.jpg",
        description: "キーホルダー 2面の説明",
      },
      {
        name: "ネームプレート",
        price: 2710,
        selected: false,
        image: "/option-images/print/sd39.jpg",
        description: "ネームプレートの説明",
      },{
        name: "1p",
        price: 4800,
        selected: false,
        image: "/option-images/print/maternity/maternity-1.jpg",
        description: "六切り1枚"
      },
      {
        name: "2p",
        price: 7600,
        selected: false,
        image: "/option-images/print/maternity/maternity-5.jpg",
        description: "キャビネ2枚"
      },
      {
        name: "3p",
        price: 10500,
        selected: false,
        image: "/option-images/print/maternity/maternity-4.jpg",
        description: "手札3枚"
      },
      {
        name: "4p",
        price: 1400,
        selected: false,
        image: "/option-images/print/maternity/maternity-3.jpg",
        description: "手札4枚"
      },
      {
        name: "9p",
        price: 31500,
        selected: false,
        image: "/option-images/print/maternity/maternity-2.jpg",
        description: "手札9枚"
      },
    ],
    2: [
      {
        name: "C D 3万セット",
        price: 32800,
        selected: false,
        image: "/option-images/print/new_3man_pran.jpg",
        description: `C Dデータ＋六つ切りプリント1枚,　台紙付　
  ＊オリジナルレザー台紙又洋風レザー台紙からお選び下さい`,
      },
      {
        name: "C D 5万セット",
        price: 49800,
        selected: false,
        image: "/option-images/print/new_5man_pran.jpg",
        description: `C Dデータ＋六つ切りプリント5枚,　台紙付　
  ＊オリジナルレザー台紙又洋風レザー台紙からお選び下さい`,
      },
      {
        name: "C D 7万セット",
        price: 69800,
        selected: false,
        image: "/option-images/print/new_7man_pran.jpg",
        description: `C Dデータ＋六つ切りプリント9枚,　台紙付　
  ＊オリジナルレザー台紙又洋風レザー台紙からお選び下さい`,
      },
      {
        name: "洋風レザー台紙 六切り 2面「ブラウン」",
        price: 0,
        selected: false,
        image: "/option-images/print/sd3.jpg",
        description: `お写真の貼り順を備考欄にご記入下さい`,
      },
      {
        name: "洋風レザー台紙 六切り 3面「ブラウン」",
        price: 0,
        selected: false,
        image: "/option-images/print/sd3.jpg",
        description: `お写真の貼り順を備考欄にご記入下さい`,
      },
      {
        name: "洋風レザー台紙 六切り 6面「ブラウン」",
        price: 0,
        selected: false,
        image: "/option-images/print/sd3.jpg",
        description: `お写真の貼り順を備考欄にご記入下さい`,
      },
      {
        name: "オリジナルレザー台紙 六切り 2面",
        price: 0,
        selected: false,
        image: "/option-images/print/sd2.jpg",
        description: `お写真の貼り順を備考欄にご記入下さい`,
      },
      {
        name: "オリジナルレザー台紙 六切り 3面",
        price: 0,
        selected: false,
        image: "/option-images/print/sd2.jpg",
        description: `お写真の貼り順を備考欄にご記入下さい`,
      },
    ],
    3: [
      {
        name: "デザインアルバムちりめん",
        price: 54780,
        selected: false,
        image: "/option-images/print/chirimen.jpg",
        description: "6P(24カット)"
      },
      {
        name: "デザインアルバムキャンバス",
        price: 54780,
        selected: false,
        image: "/option-images/print/cyanbasu.jpg",
        description: "6P(24カット)"
      },
      {
        name: "デザインアルバムちりめん",
        price: 62480,
        selected: false,
        image: "/option-images/print/chirimen.jpg",
        description: "10P(30カット)"
      },
      {
        name: "デザインアルバムキャンバス",
        price: 62480,
        selected: false,
        image: "/option-images/print/cyanbasu.jpg",
        description: "10P(30カット)"
      },
      {
        name: "デザインアルバムちりめん",
        price: 69080,
        selected: false,
        image: "/option-images/print/chirimen.jpg",
        description: "10P(36カット)"
      },
      {
        name: "デザインアルバムキャンバス",
        price: 69080,
        selected: false,
        image: "/option-images/print/cyanbasu.jpg",
        description: "10P(36カット)"
      },
      {
        name: "デザインアルバムちりめん【増刷】",
        price: 27390,
        selected: false,
        image: "/option-images/print/chirimen.jpg",
        description: "6P(24カット)"
      },
      {
        name: "デザインアルバムちりめん【増刷】",
        price: 36080,
        selected: false,
        image: "/option-images/print/chirimen.jpg",
        description: "10P(30カット)"
      },
      {
        name: "デザインアルバムキャンバス【増刷】",
        price: 27390,
        selected: false,
        image: "/option-images/print/cyanbasu.jpg",
        description: "6P(24カット)"
      },
      {
        name: "デザインアルバムキャンバス【増刷】",
        price: 36080,
        selected: false,
        image: "/option-images/print/cyanbasu.jpg",
        description: "10P(30カット)"
      },
      {
        name: "絵本BOOK",
        price: 38280,
        selected: false,
        image: "/option-images/print/ehon.jpg",
        description: "4P ( 6カット)"
      },
      {
        name: "絵本BOOK",
        price: 40480,
        selected: false,
        image: "/option-images/print/ehon-b.jpg",
        description: "6P ( 8カット) "
      },
      {
        name: "絵本BOOK",
        price: 43780,
        selected: false,
        image: "/option-images/print/ehon-c.jpg",
        description: "8P ( 10カット)"
      },
      {
        name: "絵本BOOK",
        price: 51480,
        selected: false,
        image: "/option-images/print/ehon.jpg",
        description: "10P ( 12カット) "
      },
      {
        name: "絵本BOOK",
        price: 54780,
        selected: false,
        image: "/option-images/print/ehon-b.jpg",
        description: "12P ( 14カット) "
      },
      {
        name: "絵本BOOK【増刷】",
        price: 8778,
        selected: false,
        image: "/option-images/print/ehon-c.jpg",
        description: "4P ( 6カット)"
      },
      {
        name: "絵本BOOK【増刷】",
        price: 9504,
        selected: false,
        image: "/option-images/print/ehon.jpg",
        description: "6P ( 8カット) "
      },
      {
        name: "プレミアムデザインアルバム",
        price: 54780,
        selected: false,
        image: "/option-images/print/puremiamu3.jpg",
        description: "6P (24カット)"
      },
      {
        name: "プレミアムデザインアルバム",
        price: 62480,
        selected: false,
        image: "/option-images/print/puremiamu.jpg",
        description: "10P ( 30カット) "
      },
      {
        name: "プレミアムデザインアルバム",
        price: 69080,
        selected: false,
        image: "/option-images/print/puremiamu2.jpg",
        description: "10P (36カット) "
      },
      {
        name: "プレミアムデザインアルバム【増刷】",
        price: 27390,
        selected: false,
        image: "/option-images/print/puremiamu4.jpg",
        description: "6P (18カット)"
      },
      {
        name: "プレミアムデザインアルバム【増刷】",
        price: 36080,
        selected: false,
        image: "/option-images/print/puremiamu.jpg",
        description: "30P (36カット) "
      },
    ],
    4: [
      {
        name: "お宮参りプラン：A",
        price: 54780,
        selected: false,
        image: "/option-images/print/photo_collection_a.jpg",
        description: "3面アルバム 1冊 ＋2面台紙 2冊 "
      },
      {
        name: "お宮参りプラン：B",
        price: 71500,
        selected: false,
        image: "/option-images/print/photo_collection_b.jpg",
        description: "CDデータ（全データ)＋3面アルバム 1冊＋2面台紙 2冊 "
      },
      {
        name: "お宮参りプラン：C",
        price: 35310,
        selected: false,
        image: "/option-images/print/photo_collection_c.jpg",
        description: "2面台紙　2冊"
      },
      {
        name: "お宮参りプラン：D",
        price: 55000,
        selected: false,
        image: "/option-images/print/photo_collection_d.jpg",
        description: "CDデータ(全データ)＋2面台紙　2冊"
      },
      {
        name: "お宮参りプラン：E",
        price: 60280,
        selected: false,
        image: "/option-images/print/photo_collection_e.jpg",
        description: "CDデータ(全データ)＋ヒンジアルバム 1冊＋2面額 1枚"
      },
      {
        name: "お宮参りプラン：F",
        price: 66000,
        selected: false,
        image: "/option-images/print/photo_collection_f.jpg",
        description: "CDデータ(全データ)＋3面アルバム 1冊＋2面額 2枚"
      },
      {
        name: "お宮参りプラン：スペシャルセット",
        price: 88000,
        selected: false,
        image: "/option-images/print/photo_collection_g.jpg",
        description: "CDデータ(全データ)＋ヒンジアルバム1冊＋2面額 2枚＋クリスタルグラフィー 1枚＋キーホルダー 1ヶ"
      },
      {
        name: "モバイルストレージ",
        price: 3500,
      selected: false,
      image: "/option-images/print/sd41.jpg",
      description: "モバイルストレージの説明",
    },
    {
      name: "最高級和風台紙 六切り 2面「青」",
      price: 0,
      selected: false,
      image: "/option-images/print/sd9.jpg",
      description: "最高級和風台紙 六切り 2面「青」の説明",
    },
    {
      name: "最高級和風台紙 六切り 3面「青」",
      price: 0,
      selected: false,
      image: "/option-images/print/sd9.jpg",
      description: "最高級和風台紙 六切り 3面「青」の説明",
    },
    {
      name: "最高級和風台紙 六切り 2面「赤」",
      price: 0,
      selected: false,
      image: "/option-images/print/sd40.jpg",
      description: "最高級和風台紙 六切り 2面「赤」の説明",
    },
    {
      name: "最高級和風台紙 六切り 3面「赤」",
      price: 0,
      selected: false,
      image: "/option-images/print/sd40.jpg",
      description: "最高級和風台紙 六切り 3面「赤」の説明",
    },
    ],
    5: [
      {
        name: "七五三CDプラン：A",
        price: 36080,
        selected: false,
        image: "/option-images/print/photo_collection_a.jpg",
        description: "CDデーター＋六切プリント1枚(台紙付)＊和風台紙又オリジナルレザー台紙又洋風ﾚｻﾞｰ台紙からお選び下さい"
      },
      {
        name: "七五三CDプラン：B",
        price: 54780,
        selected: false,
        image: "/option-images/print/photo_collection_b.jpg",
        description: "CDデーター＋六切プリント5枚(台紙付)＊和風台紙又オリジナルレザー台紙又洋風ﾚｻﾞｰ台紙からお選び下さい。＊台紙のページ数は、ご自由にお決め頂けます。"
      },
      {
        name: "七五三CDプラン：C",
        price: 76780,
        selected: false,
        image: "/option-images/print/photo_collection_c.jpg",
        description: "CDデーター＋六切プリント9枚(台紙付)＊和風台紙又オリジナルレザー台紙又洋風ﾚｻﾞｰ台紙からお選び下さい＊台紙のページ数は、ご自由にお決め頂けます。"
      },
      {
        name: "モバイルストレージ",
        price: 3500,
      selected: false,
      image: "/option-images/print/sd41.jpg",
        description: "モバイルストレージの説明",
      },
      {
        name: "和風台紙 六切り 2面「赤・黒」",
        price: 0,
        selected: false,
        image: "/option-images/print/sd5.jpg",
        description: "和風台紙 六切り 2面「赤・黒」の説明",
      },
      {
        name: "和風台紙 六切り 3面「赤・黒」",
        price: 0,
        selected: false,
        image: "/option-images/print/sd5.jpg",
        description: "和風台紙 六切り 3面「赤・黒」の説明",
      },
      {
        name: "和風台紙 六切り 6面「赤・黒」",
        price: 0,
        selected: false,
        image: "/option-images/print/sd5.jpg",
        description: "和風台紙 六切り 6面「赤・黒」の説明",
      },
      {
        name: "和風台紙 六切り 2面「ブルー」",
        price: 0,
        selected: false,
        image: "/option-images/print/sd6.jpg",
        description: "和風台紙 六切り 2面「ブルー」の説明",
      },
      {
        name: "和風台紙 六切り 3面「ブルー」",
        price: 0,
        selected: false,
        image: "/option-images/print/sd6.jpg",
        description: "和風台紙 六切り 3面「ブルー」の説明",
      },
      {
        name: "和風台紙 六切り 6面「ブルー」",
        price: 0,
        selected: false,
        image: "/option-images/print/sd6.jpg",
        description: "和風台紙 六切り 6面「ブルー」の説明",
      },
      {
        name: "和風台紙 六切り 2面「黒・紫」",
        price: 0,
        selected: false,
        image: "/option-images/print/sd7.jpg",
        description: "和風台紙 六切り 2面「黒・紫」の説明",
      },
      {
        name: "和風台紙 六切り 3面「黒・紫」",
        price: 0,
        selected: false,
        image: "/option-images/print/sd7.jpg",
        description: "和風台紙 六切り 3面「黒・紫」の説明",
      },
      {
        name: "和風台紙 六切り 6面「黒・紫」",
        price: 0,
        selected: false,
        image: "/option-images/print/sd7.jpg",
        description: "和風台紙 六切り 6面「黒・紫」の説明",
      },
      {
        name: "和風台紙 六切り 2面「ピンク」",
        price: 0,
        selected: false,
        image: "/option-images/print/sd8.jpg",
        description: "和風台紙 六切り 2面「ピンク」の説明",
      },
      {
        name: "和風台紙 六切り 3面「ピンク」",
        price: 0,
        selected: false,
        image: "/option-images/print/sd8.jpg",
        description: "和風台紙 六切り 3面「ピンク」の説明",
      },
      {
        name: "和風台紙 六切り 6面「ピンク」",
        price: 0,
        selected: false,
        image: "/option-images/print/sd8.jpg",
        description: "和風台紙 六切り 6面「ピンク」の説明",
      },
    ],
    6: [
      {
        name: "1p",
        price: 0,
        selected: false,
        image: "/option-images/print/maternity/maternity-1.jpg",
        description: "六切り1枚"
      },
      {
        name: "2p",
        price: 600,
        selected: false,
        image: "/option-images/print/maternity/maternity-5.jpg",
        description: "キャビネ2枚"
      },
      {
        name: "3p",
        price: 0,
        selected: false,
        image: "/option-images/print/maternity/maternity-4.jpg",
        description: "手札3枚"
      },
      {
        name: "4p",
        price: 0,
        selected: false,
        image: "/option-images/print/maternity/maternity-3.jpg",
        description: "手札4枚"
      },
      {
        name: "9p",
        price: 0,
        selected: false,
        image: "/option-images/print/maternity/maternity-2.jpg",
        description: "手札9枚"
      },
    ],
    7: [
      {
        name: "初節句プランA",
        price: 29800,
        selected: false,
        image: "/option-images/print/hatsusextuku/hatsusextuku_b.jpg",
        description: "初節句プランAの説明"
      },
      {
        name: "初節句プランB",
        price: 38800,
        selected: false,
        image: "/option-images/print/hatsusextuku/hatsusextuku_c.jpg",
        description: "初節句プランBの説明"
      },
      {
        name: "初節句プランC",
        price: 39800,
        selected: false,
        image: "/option-images/print/hatsusextuku/hatsusextuku_d.jpg",
        description: "初節句プランCの説明"
      },
      {
        name: "モバイルストレージ",
        price: 3500,
      selected: false,
      image: "/option-images/print/sd41.jpg",
        description: "モバイルストレージの説明",
      },
    ],
    8: [
      {
        name: "バースデープランA",
        price: 15800,
        selected: false,
        image: "/option-images/print/birthday/birthday_plan_a_ok.jpg",
        description: "バースデープランAの説明"
      },
      {
        name: "バースデープランB",
        price: 27800,
        selected: false,
        image: "/option-images/print/birthday/birthday_plan_b_ok.jpg",
        description: "バースデープランBの説明"
      },
      {
        name: "バースデープランC",
        price: 35800,
        selected: false,
        image: "/option-images/print/birthday/birthday_plan_c_ok.jpg",
        description: "バースデープランCの説明"
      },
      {
        name: "バースデープランd",
        price: 49800,
        selected: false,
        image: "/option-images/print/birthday/birthday_plan_d_ok.jpg",
        description: "バースデープランdの説明"
      },
      {
        name: "テンプレートA",
        price: 0,
      selected: false,
      image: "/option-images/print/birthday/4P_a_ok.jpg",
        description: "テンプレートAの説明",
      },
      {
        name: "テンプレートB",
        price: 0,
      selected: false,
      image: "/option-images/print/birthday/4P_b_ok.jpg",
        description: "テンプレートBの説明",
      },
      {
        name: "テンプレートC",
        price: 0,
      selected: false,
      image: "/option-images/print/birthday/4P_c_ok.jpg",
        description: "テンプレートCの説明",
      },
      {
        name: "テンプレートd",
        price: 0,
      selected: false,
      image: "/option-images/print/birthday/4P_d_ok.jpg",
        description: "テンプレートdの説明",
      },
      {
        name: "モバイルストレージ",
        price: 3500,
      selected: false,
      image: "/option-images/print/sd41.jpg",
        description: "モバイルストレージの説明",
      },
    ],
    9: [
      {
        name: "入園・入学&卒業式プランA",
        price: 23600,
        selected: false,
        image: "/option-images/print/nyuugaku/nyuugaku_a.jpg",
        description: "入園・入学&卒業式プランAの説明"
      },
      {
        name: "入園・入学&卒業式プランB",
        price: 29800,
        selected: false,
        image: "/option-images/print/nyuugaku/nyuugaku_b.jpg",
        description: "入園・入学&卒業式プランBの説明"
      },
      {
        name: "入園・入学&卒業式プランC",
        price: 39800,
        selected: false,
        image: "/option-images/print/nyuugaku/nyuugaku_c.jpg",
        description: "入園・入学&卒業式プランcの説明"
      },
      {
        name: "モバイルストレージ",
        price: 3500,
      selected: false,
      image: "/option-images/print/sd41.jpg",
        description: "モバイルストレージの説明",
      },
    ],
    10: [
      {
        name: "成人式プランA",
        price: 23100,
        selected: false,
        image: "/option-images/print/seijin-shiki/seijinshiki_a_ok.jpg",
        description: "成人式プランAの説明"
      },
      {
        name: "成人式プランB",
        price: 34600,
        selected: false,
        image: "/option-images/print/seijin-shiki/seijinshiki_b_ok.jpg",
        description: "成人式プランBの説明"
      },
      {
        name: "成人式プランC",
        price: 48600,
        selected: false,
        image: "/option-images/print/seijin-shiki/seijinshiki_c_ok.jpg",
        description: "成人式プランCの説明"
      },
      {
        name: "成人式プランD",
        price: 49800,
        selected: false,
        image: "/option-images/print/seijin-shiki/seijinshiki_d_ok.jpg",
        description: "成人式プランDの説明"
      },
      {
        name: "成人式プランE",
        price: 67200,
        selected: false,
        image: "/option-images/print/seijin-shiki/seijinshiki_e_ok.jpg",
        description: "成人式プランEの説明"
      },
      {
        name: "成人式プランF ",
        price: 85900,
        selected: false,
        image: "/option-images/print/seijin-shiki/seijinshiki_f_ok.jpg",
        description: "成人式プランF の説明"
      },
      {
        name: "成人式プランスペシャルセット",
        price: 104700,
        selected: false,
        image: "/option-images/print/seijin-shiki/seijinshiki_g_ok.jpg",
        description: "成人式プランスペシャルセットの説明"
      },
      {
        name: "モバイルストレージ",
        price: 3500,
      selected: false,
      image: "/option-images/print/sd41.jpg",
        description: "モバイルストレージの説明",
      },
    ],
  };

  const options = optionsMap[id] || [];

  return options;
});