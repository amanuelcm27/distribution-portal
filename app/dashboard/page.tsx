'use client'

import React from 'react'
import { useOmcStore } from '@/store/useOmcStore'
import { QuotaHealthCard } from '@/components/quota/QuotaHealthCard'
import { FleetStatusDonut } from '@/components/dashboard/FleetStatusDonut'
import { ActionQueue } from '@/components/dashboard/ActionQueue'
import { StationAlerts } from '@/components/dashboard/StationAlerts'
import { DispatchTable } from '@/components/dispatch/DispatchTable'
import { AlertCircle } from 'lucide-react'

export default function DashboardPage() {
  const { quotaPeriod, stationAlerts, dispatches } = useOmcStore()
  const activeDispatches = dispatches.filter(d => ['CREATED', 'APPROVED', 'LOADED', 'IN_TRANSIT', 'ARRIVED'].includes(d.status))

  if (!quotaPeriod) {
    return <div className="p-6">Loading...</div>
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Dashboard</h1>
        <p className="text-foreground-secondary">
          {quotaPeriod.label} • {quotaPeriod.days_remaining} days remaining
        </p>
      </div>

      {/* Critical Alerts Banner removed per UI update */}

      {/* Row 1: Quota Health Cards */}
      <div>
        <h2 className="text-lg font-semibold text-foreground mb-3">Quota Status</h2>
        <div className="grid grid-cols-3 gap-4">
          {Object.values(quotaPeriod.quotas_by_fuel).map(quota => (
            <QuotaHealthCard key={quota.fuel_type} quota={quota} period={quotaPeriod} />
          ))}
        </div>
      </div>

      {/* Row 2: Fleet Status + Action Queue + Station Alerts */}
      <div className="grid grid-cols-3 gap-6">
        <FleetStatusDonut />
        <ActionQueue />
        <StationAlerts />
      </div>

      {/* Row 3: Active Dispatches */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-semibold text-foreground">Active Dispatches</h2>
          <span className="text-sm text-foreground-secondary">{activeDispatches.length} active</span>
        </div>
        <DispatchTable dispatches={activeDispatches.slice(0, 5)} />
      </div>
    </div>
  )
}
