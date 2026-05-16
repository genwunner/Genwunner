'use client'

import { useEffect } from 'react'

export function IntroGuard() {
  useEffect(() => {
    document.body.setAttribute('data-intro-done', '1')
  }, [])
  return null
}
