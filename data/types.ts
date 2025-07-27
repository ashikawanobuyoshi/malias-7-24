// src/data/types.ts
export interface PrintSize {
    label: string;
    size: string;
    price: number;
    taxIncluded: number;
  }
  
  export interface PrintOption {
    id: number;
    label: string;
    productId: number;
    description: string;
    image: string;
    sizes: PrintSize[];
  }
  