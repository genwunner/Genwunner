export interface ShopifyProduct {
  handle: string
  title: string
  tag: string
  price: string
  image: string
}

function deriveTag(title: string): string {
  const t = title.toUpperCase()
  if (t.includes('HOODIE')) return 'APPAREL · Hoodie'
  if (t.includes('T-SHIRT') || t.includes('TEE')) return 'APPAREL · Tee'
  if (t.includes('HAT') || t.includes('CAP')) return 'APPAREL · Hat'
  if (t.includes('POSTER')) return 'POSTER · Print'
  return 'GEAR'
}

export async function getShopifyProducts(): Promise<ShopifyProduct[] | null> {
  try {
    const res = await fetch(
      'https://genwunnr.myshopify.com/products.json?limit=250',
      { next: { revalidate: 3600 } }
    )
    if (!res.ok) return null
    const data = await res.json()

    return data.products?.map((p: any) => ({
      handle: p.handle,
      title: p.title,
      tag: p.product_type || deriveTag(p.title),
      price: `$${parseFloat(p.variants[0].price).toFixed(2)}`,
      image: p.images[0]?.src ?? '',
    })) ?? null
  } catch {
    return null
  }
}
