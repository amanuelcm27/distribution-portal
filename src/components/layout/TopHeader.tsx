'use client'

import React, { useState } from 'react'
import { Bell, AlertCircle, ChevronDown, LogOut } from 'lucide-react'
import { useOmcStore } from '@/store/useOmcStore'

export function TopHeader() {
  const { user, omcProfile, stationAlerts, pendingActions, language, setLanguage } = useOmcStore()
  const [showUserMenu, setShowUserMenu] = useState(false)

  if (!user) return null

  const alertCount = stationAlerts.length
  const actionCount = pendingActions.length

  return (
    <header className="fixed top-0 left-0 right-0 h-14 bg-[var(--sidebar)] text-white border-b border-border flex items-center justify-between px-6 z-40 ml-64">
      {/* Left and center stats removed per request */}
      <div className="flex-1" />

      {/* Right: Actions */}
      <div className="flex items-center gap-4">
        {/* Station Alerts */}
        {alertCount > 0 && (
          <button className="relative text-gray-300 hover:text-white transition">
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
          <button className="relative text-gray-300 hover:text-white transition">
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
          className="px-2 py-1 text-xs font-medium rounded border border-border hover:bg-surface transition text-gray-200"
        >
          {language === 'en' ? 'EN' : 'AM'}
        </button>

        {/* User Menu */}
        <div className="relative">
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="flex items-center gap-2 px-3 py-1.5 rounded hover:bg-surface transition text-gray-100"
          >
            <div className="flex flex-col items-end">
              <div className="text-sm font-medium">{user.name}</div>
              <div className="text-xs text-gray-300">{user.role}</div>
            </div>
            <ChevronDown size={16} className={`transition ${showUserMenu ? 'rotate-180' : ''}`} />
          </button>

          {showUserMenu && (
            <div className="absolute right-0 mt-2 w-48 bg-card border border-border rounded-lg shadow-lg py-1 z-50 text-foreground">
              <button className="w-full text-left px-4 py-2 text-sm hover:bg-surface flex items-center gap-2 text-foreground">
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
