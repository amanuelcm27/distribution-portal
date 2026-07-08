'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function Page() {
  const router = useRouter()

  useEffect(() => {
    router.replace('/dashboard')
  }, [router])

  return (
    <main className="relative flex min-h-screen items-center justify-center">
      <p className="text-sm font-medium text-muted-foreground">Loading FDCS Portal...</p>
    </main>
  )
}
