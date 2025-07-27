// src/data/productOptions/options-2.ts
import type { PrintOption } from "../types";

const options: PrintOption[] = [
  {
    id: 2,
    label: "フォトブック",
    productId: 2,
    description: "思い出を美しくまとめるフォトブック",
    image: "/option-images/print/option2.jpg",
    sizes: [
      { label: "A5", size: "148×210mm", price: 3000, taxIncluded: 3300 },
      { label: "A4", size: "210×297mm", price: 5000, taxIncluded: 5500 },
    ],
  },
];

export default options;
