// src/data/productOptions/options-4.ts
import type { PrintOption } from "../types";

const options: PrintOption[] = [
  {
    id: 3,
    label: "キャンバスプリント",
    productId: 4,
    description: "アートのようなキャンバスプリント",
    image: "/option-images/print/option4.jpg",
    sizes: [
      { label: "Sサイズ", size: "200×300mm", price: 4000, taxIncluded: 4400 },
      { label: "Mサイズ", size: "300×450mm", price: 6000, taxIncluded: 6600 },
    ],
  },
];

export default options;
