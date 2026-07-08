'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard, Zap, Truck, Boxes, MapPin, ClipboardList,
  AlertTriangle, BarChart3, Settings, AlertCircle
} from 'lucide-react'
import { useOmcStore } from '@/store/useOmcStore'
import { cn } from '@/lib/utils'

const navigationItems = [
  {
    group: 'OVERVIEW',
    items: [
      { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
      { href: '/quotas', label: 'Quota Management', icon: Zap },
    ]
  },
  {
    group: 'PROCUREMENT',
    items: [
      { href: '/lifting', label: 'Lifting Schedule', icon: Truck },
    ]
  },
  {
    group: 'FLEET & DISPATCH',
    items: [
      { href: '/dispatch', label: 'Dispatch Operations', icon: Boxes },
      { href: '/fleet', label: 'Tanker Fleet', icon: Truck },
    ]
  },
  {
    group: 'RETAIL NETWORK',
    items: [
      { href: '/stations', label: 'My Stations', icon: MapPin },
    ]
  },
  {
    group: 'COMPLIANCE & REPORTS',
    items: [
      { href: '/compliance', label: 'Compliance', icon: AlertTriangle },
      { href: '/reports', label: 'Reports', icon: BarChart3 },
    ]
  },
  {
    group: 'ADMINISTRATION',
    items: [
      { href: '/company/profile', label: 'Company Profile', icon: Settings },
    ]
  },
]

export function Sidebar() {
  const pathname = usePathname()
  const { omcProfile } = useOmcStore()

  return (
    <aside className="layout-sidebar">
      {/* Company Card */}
      <div className="border-b border-white border-opacity-20 p-4">
        <div className="mb-2 flex items-center gap-3">
          <div className="w-10 h-10 rounded bg-white/10 flex items-center justify-center text-white font-bold">FDS</div>
          <div>
            <h1 className="text-lg font-bold text-white">Distribution portal</h1>
            <p className="text-xs text-gray-300">Fuel Distribution System</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="p-4 space-y-6">
        {navigationItems.map((group) => (
          <div key={group.group}>
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 px-2">
              {group.group}
            </h3>
            <div className="space-y-1">
              {group.items.map((item) => {
                const Icon = item.icon
                const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      'flex items-center gap-3 px-3 py-2 rounded text-sm transition',
                      isActive
                        ? 'bg-white bg-opacity-20 text-white font-medium'
                        : 'text-gray-300 hover:text-white hover:bg-white hover:bg-opacity-10'
                    )}
                  >
                    <Icon size={18} />
                    <span>{item.label}</span>
                  </Link>
                )
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div className="hidden"></div>
    </aside>
  )
}
