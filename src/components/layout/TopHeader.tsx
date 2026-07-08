'use client'

import React, { useState } from 'react'
import { Bell, AlertCircle, ChevronDown, LogOut } from 'lucide-react'
import { useOmcStore } from '@/store/useOmcStore'
import { formatLiters, formatPercent } from '@/lib/utils'

export function TopHeader() {
  const { user, omcProfile, quotaPeriod, stationAlerts, pendingActions, language, setLanguage } = useOmcStore()
  const [showUserMenu, setShowUserMenu] = useState(false)

  if (!user || !quotaPeriod) return null

  const alertCount = stationAlerts.length
  const actionCount = pendingActions.length

  return (
    <header className="fixed top-0 left-0 right-0 h-14 bg-white border-b border-border flex items-center justify-between px-6 z-40 ml-64">
      {/* Left: Breadcrumbs/Info */}
      <div className="flex items-center gap-4">
        <div className="text-sm text-foreground-secondary">
          {omcProfile?.name} • License: {omcProfile?.license_number}
        </div>
      </div>

      {/* Center: Quota Period Indicators */}
      <div className="flex items-center gap-2 flex-1 justify-center px-4">
        {Object.entries(quotaPeriod.quotas_by_fuel).map(([fuelType, quota]) => (
          <div key={fuelType} className="flex items-center gap-1.5 px-3 py-1.5 bg-surface rounded-full text-xs">
            <div className="font-medium">{fuelType.slice(0, 3)}</div>
            <div className="text-foreground-secondary">
              {formatLiters(quota.remaining)}
            </div>
            <div className={`
              px-2 py-0.5 rounded font-medium
              ${quota.health === 'healthy' ? 'bg-green-100 text-green-700' : ''}
              ${quota.health === 'moderate' ? 'bg-yellow-100 text-yellow-700' : ''}
              ${quota.health === 'low' ? 'bg-red-100 text-red-700' : ''}
              ${quota.health === 'exhausted' ? 'bg-gray-100 text-gray-700' : ''}
            `}>
              {quota.health}
            </div>
          </div>
        ))}
        <div className="text-xs text-foreground-secondary px-3">
          {quotaPeriod.days_remaining} days left
        </div>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-4">
        {/* Station Alerts */}
        {alertCount > 0 && (
          <button className="relative text-foreground-secondary hover:text-foreground transition">
            <AlertCircle size={20} />
            {alertCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {alertCount}
              </span>
            )}
          </button>
        )}

        {/* Notifications */}
        {actionCount > 0 && (
          <button className="relative text-foreground-secondary hover:text-foreground transition">
            <Bell size={20} />
            {actionCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-amber-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {actionCount}
              </span>
            )}
          </button>
        )}

        {/* Language Toggle */}
        <button
          onClick={() => setLanguage(language === 'en' ? 'am' : 'en')}
          className="px-2 py-1 text-xs font-medium rounded border border-border hover:bg-surface transition"
        >
          {language === 'en' ? 'EN' : 'AM'}
        </button>

        {/* User Menu */}
        <div className="relative">
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="flex items-center gap-2 px-3 py-1.5 rounded hover:bg-surface transition"
          >
            <div className="flex flex-col items-end">
              <div className="text-sm font-medium">{user.name}</div>
              <div className="text-xs text-foreground-secondary">{user.role}</div>
            </div>
            <ChevronDown size={16} className={`transition ${showUserMenu ? 'rotate-180' : ''}`} />
          </button>

          {showUserMenu && (
            <div className="absolute right-0 mt-2 w-48 bg-white border border-border rounded-lg shadow-lg py-1 z-50">
              <button className="w-full text-left px-4 py-2 text-sm hover:bg-surface flex items-center gap-2">
                <LogOut size={16} />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
