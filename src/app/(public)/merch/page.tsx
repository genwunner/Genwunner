export default function MerchPage() {
  const shopifyDomain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-6xl mx-auto px-6 py-20">
        <h1 className="text-4xl font-black tracking-tight mb-2">MERCH</h1>
        <p className="text-white/40 text-sm mb-10">Official Genwunner Store</p>

        {shopifyDomain ? (
          // Shopify Buy Button / Embedded Storefront
          // Replace this div with your Shopify embed code from:
          // Shopify Admin → Sales Channels → Buy Button → Create Buy Button
          <div
            id="shopify-store-embed"
            className="min-h-[600px]"
          >
            {/* Shopify embed script goes here */}
            <p className="text-white/30 text-sm">Loading store…</p>
          </div>
        ) : (
          <div className="border border-dashed border-white/20 rounded-xl p-12 text-center">
            <p className="text-white/40 text-sm mb-2">Shopify store not yet connected.</p>
            <p className="text-white/20 text-xs">Add NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN to your environment variables.</p>
          </div>
        )}
      </div>
    </div>
  )
}
