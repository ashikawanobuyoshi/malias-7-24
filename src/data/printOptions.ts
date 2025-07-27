// /src/data/printOptions.ts

export interface PrintSizeOption {
    label: string
    size: string
    price: number
    taxIncluded: number
  }
  
  export interface PrintOption {
    id: number
    label: string
    value: string
    description: string
    productId: number
    image: string
    sizes: PrintSizeOption[]
    style?: {
      width: string
      height: string
    }
  }
  
  export const printOptions: PrintOption[] = [
    {
      id: 1,
      label: "プリントのみ",
      value: "print_only",
      description: "一般的なプリント仕上げの選択肢です。",
      productId: 1,
      image: "/option-images/print/printo_nomi.jpg",
      sizes: [
        {
          label: "四切プリント",
          size: "254mm×305mm",
          price: 5800,
          taxIncluded: 6380,
        },
        {
          label: "六切プリント",
          size: "205mm×254mm",
          price: 4800,
          taxIncluded: 5280,
        },
        {
          label: "キャビネプリント",
          size: "180mm×127mm",
          price: 3800,
          taxIncluded: 4180,
        },
        {
          label: "手札プリント",
          size: "127mm×89mm",
          price: 3500,
          taxIncluded: 3850,
        },
      ],
    },
    {
      id: 2,
      label: "CDプラン",
      value: "cd_plan",
      description: "CDデータ付きのプランです。",
      productId: 2,
      image: "/option-images/print/cd_puran.jpg",
      sizes: [
        {
          label: "CD三万プラン",
          size: "-",
          price: 29800,
          taxIncluded: 32780,
        },
        {
          label: "CD五万プラン",
          size: "-",
          price: 49800,
          taxIncluded: 54780,
        },
        {
          label: "CD七万プラン",
          size: "-",
          price: 69800,
          taxIncluded: 76780,
        },
      ],
      style: { width: "170px", height: "auto" },
    },
    {
      id: 3,
      label: "写真集",
      value: "design album",
      description: "デザインアルバム",
      productId: 3,
      image: "/option-images/print/photo_collection.jpg",
      sizes: [
        {
          label: "デザインアルバム",
          size: "215mm×305mm",
          price: 49800,
          taxIncluded: 54780,
        },
        {
          label: "絵本BOOK",
          size: "215mm×215mm",
          price: 7800,
          taxIncluded: 8580,
        },
        {
          label: "プレミアムデザインアルバム",
          size: "214mm×305mm",
          price: 49800,
          taxIncluded: 54780,
        },
      ],
    },
    {
      id: 4,
      label: "六つ切り（紙台紙付き）",
      value: "6cut_paper",
      description: "紙台紙付き六つ切りプリント",
      productId: 4,
      image: "/option-images/print/6tsugiri_3.jpg",
      sizes: [
        {
          label: "プリントのみ",
          size: "205mm×254mm",
          price: 4800,
          taxIncluded: 5280,
        },
        {
          label: "紙台紙付き",
          size: "205mm×254mm",
          price: 6800,
          taxIncluded: 7480,
        },
      ],
      style: { width: "170px", height: "auto" },
    },
  ]
  