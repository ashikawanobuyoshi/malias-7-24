//data/productOptions/getProductOptions.ts
export async function getProductOptions(productId: number) {
  switch (productId) {
    case 1:
      return (await import('./options-1')).default;
    case 2:
      return (await import('./options-2')).default;
    case 3:
      return (await import('./options-3')).default;
    case 4:
      return (await import('./options-4')).default;
    case 5:
      return (await import('./options-5')).default;
    case 6:
      return (await import('./options-6')).default;
    case 7:
      return (await import('./options-7')).default;
    case 8:
      return (await import('./options-8')).default;
    case 9:
      return (await import('./options-9')).default;
    case 10:
      return (await import('./options-10')).default;
    default:
      console.warn(`No options for productId: ${productId}`);
      return [];
  }
}
  