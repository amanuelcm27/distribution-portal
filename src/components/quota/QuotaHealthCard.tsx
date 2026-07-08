'use client'

import React from 'react'
import { FuelQuota } from '@/types'
import { formatLiters, quotaHealthClass } from '@/lib/utils'
import { Zap } from 'lucide-react'

interface QuotaHealthCardProps {
  quota: FuelQuota
  period: { days_remaining: number }
}

export function QuotaHealthCard({ quota, period }: QuotaHealthCardProps) {
  const total = quota.allocated
  const deliveredPercent = (quota.delivered / total) * 100
  const inTransitPercent = (quota.in_transit / total) * 100
  const remainingPercent = (quota.remaining / total) * 100

  const fuelColors: Record<string, { bg: string; text: string }> = {
    DIESEL: { bg: '#2563EB', text: 'text-blue-700' },
    BENZINE: { bg: '#D97706', text: 'text-orange-700' },
    KEROSENE: { bg: '#0D9488', text: 'text-teal-700' },
  }

  const colors = fuelColors[quota.fuel_type] || fuelColors.DIESEL

  return (
    <div className="card p-4 border-l-4" style={{ borderLeftColor: colors.bg }}>
      <div className="flex items-start justify-between mb-3">
        <div>
          <div className="inline-block px-2 py-1 rounded text-xs font-medium mb-1" style={{
            backgroundColor: `${colors.bg}15`,
            color: colors.bg,
          }}>
            {quota.fuel_type}
          </div>
          <h3 className="font-semibold text-foreground">{quota.fuel_type}</h3>
        </div>
        <div className={`px-2 py-1 rounded-full text-xs font-medium ${quotaHealthClass(quota.health)}`}>
          {quota.health}
        </div>
      </div>

      {/* Stacked Bar */}
      <div className="mb-3">
        <div className="flex h-8 gap-1 rounded-lg overflow-hidden bg-surface">
          {quota.delivered > 0 && (
            <div
              style={{
                width: `${deliveredPercent}%`,
                backgroundColor: '#10B981',
              }}
              className="transition-all"
              title={`Delivered: ${formatLiters(quota.delivered)}`}
            />
          )}
          {quota.in_transit > 0 && (
            <div
              style={{
                width: `${inTransitPercent}%`,
                backgroundColor: '#F59E0B',
              }}
              className="transition-all"
              title={`In Transit: ${formatLiters(quota.in_transit)}`}
            />
          )}
          {quota.remaining > 0 && (
            <div
              style={{
                width: `${remainingPercent}%`,
                backgroundColor: '#E5E7EB',
              }}
              className="transition-all"
              title={`Remaining: ${formatLiters(quota.remaining)}`}
            />
          )}
        </div>
      </div>

      {/* Details */}
      <div className="grid grid-cols-2 gap-2 text-xs">
        <div>
          <p className="text-foreground-secondary">Allocated</p>
          <p className="font-semibold">{formatLiters(quota.allocated)}</p>
        </div>
        <div>
          <p className="text-foreground-secondary">Lifted</p>
          <p className="font-semibold">{formatLiters(quota.lifted)}</p>
        </div>
        <div>
          <p className="text-foreground-secondary">In Transit</p>
          <p className="font-semibold">{formatLiters(quota.in_transit)}</p>
        </div>
        <div>
          <p className="text-foreground-secondary">Delivered</p>
          <p className="font-semibold">{formatLiters(quota.delivered)}</p>
        </div>
      </div>

      <div className="mt-3 pt-3 border-t border-border">
        <div className="flex justify-between items-center text-xs">
          <span className="text-foreground-secondary">Remaining</span>
          <span className="font-semibold">{formatLiters(quota.remaining)}</span>
        </div>
      </div>
    </div>
  )
}
