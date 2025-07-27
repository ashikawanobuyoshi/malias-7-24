// src/data/productOptions/options-9.ts
import type { PrintOption } from "../types";

const options: PrintOption[] = [
  {
    id: 9,
    label: "キャンバスプリント",
    productId: 9,
    description: "アートのようなキャンバスプリント",
    image: "/option-images/print/option9.jpg",
    sizes: [
      { label: "Sサイズ", size: "200×300mm", price: 4000, taxIncluded: 4400 },
      { label: "Mサイズ", size: "300×450mm", price: 6000, taxIncluded: 6600 },
    ],
  },
];

export default options;
