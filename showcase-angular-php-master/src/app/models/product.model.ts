export interface Product {
  id: number;
  title: string;
  description: string;
  image: string;
  category: string;
  priceCents?: number;
  featured: boolean;
  specialOffer: boolean;
}

export function isProduct(value: unknown): value is Product {
  if (typeof value !== 'object' || value === null) return false;
  const product = value as Record<string, unknown>;
  return Number.isSafeInteger(product['id']) &&
    typeof product['title'] === 'string' && product['title'].trim().length > 0 &&
    typeof product['description'] === 'string' &&
    typeof product['image'] === 'string' && product['image'].trim().length > 0 &&
    typeof product['category'] === 'string' && product['category'].trim().length > 0 &&
    (product['priceCents'] === undefined ||
      (typeof product['priceCents'] === 'number' && Number.isSafeInteger(product['priceCents']) &&
        product['priceCents'] >= 0 && product['priceCents'] <= 100000000)) &&
    typeof product['featured'] === 'boolean' &&
    typeof product['specialOffer'] === 'boolean';
}
