// src/app/api/checkout/route.ts
// Creates a Stripe checkout session and redirects to Stripe hosted page

import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2026-04-22.dahlia',
})

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://genwunner.vercel.app'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { priceId, productTitle, size } = body

    if (!priceId) {
      return NextResponse.json({ error: 'Missing price ID' }, { status: 400 })
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${SITE_URL}/merch/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${SITE_URL}/merch`,
      metadata: {
        product_title: productTitle,
        size: size || 'N/A',
      },
      shipping_address_collection: {
        allowed_countries: [
          'US', 'CA', 'GB', 'IE', 'DE', 'NL', 'FR', 'ES',
          'AU', 'NZ', 'JP', 'MX', 'BR',
        ],
      },
      custom_text: {
        submit: {
          message: 'Your order will be fulfilled and shipped by the Rocket Recruitment Regime. Giovanni is watching.',
        },
      },
    })

    return NextResponse.json({ url: session.url })
  } catch (err) {
    console.error('Stripe checkout error:', err)
    return NextResponse.json({ error: 'Checkout failed' }, { status: 500 })
  }
}
