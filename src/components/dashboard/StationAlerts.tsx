'use client'

import React from 'react'
import { AlertCircle } from 'lucide-react'
import { useOmcStore } from '@/store/useOmcStore'
import { formatPercent } from '@/lib/utils'

export function StationAlerts() {
  const { stationAlerts } = useOmcStore()

  const criticalAlerts = stationAlerts.filter(a => a.severity === 'critical')

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold text-foreground">Station Alerts</h3>
        {criticalAlerts.length > 0 && (
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700">
            {criticalAlerts.length} Critical
          </span>
        )}
      </div>
      <div className="space-y-2">
        {stationAlerts.length === 0 ? (
          <p className="text-sm text-foreground-secondary text-center py-6">No alerts</p>
        ) : (
          stationAlerts.map(alert => (
            <div
              key={alert.alert_id}
              className={`p-3 rounded text-sm border-l-4 ${
                alert.severity === 'critical'
                  ? 'border-red-500 bg-red-50 text-red-900'
                  : 'border-yellow-500 bg-yellow-50 text-yellow-900'
              }`}
            >
              <div className="flex items-start gap-2">
                <AlertCircle size={18} className="flex-shrink-0 mt-0.5" />
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-foreground">{alert.station_name}</p>
                  <p className="text-xs text-foreground-secondary">{alert.message}</p>
                  <p className="text-xs text-foreground-secondary mt-1">
                    {alert.fuel_type}: {formatPercent(alert.current_liters, alert.capacity_liters)} remaining
                  </p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
