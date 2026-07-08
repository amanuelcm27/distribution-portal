'use client'

import React from 'react'
import { TopHeader } from './TopHeader'
import { Sidebar } from './Sidebar'

export function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <TopHeader />
      <main className="layout-main">
        {children}
      </main>
    </div>
  )
}
