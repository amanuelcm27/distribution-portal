'use client'

import React from 'react'
import { Dispatch } from '@/types'
import { dispatchStatusClass, formatDate, formatTime, fuelTypeBadgeClass, getTimeAgo } from '@/lib/utils'
import { MapPin, Clock } from 'lucide-react'

interface DispatchTableProps {
  dispatches: Dispatch[]
  onRowClick?: (dispatch: Dispatch) => void
  compact?: boolean
}

export function DispatchTable({ dispatches, onRowClick, compact = false }: DispatchTableProps) {
  if (dispatches.length === 0) {
    return (
      <div className="card text-center py-8">
        <p className="text-foreground-secondary">No dispatches found</p>
      </div>
    )
  }

  return (
    <div className="card overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-surface">
              <th className="text-left px-4 py-2 font-semibold">Dispatch ID</th>
              <th className="text-left px-4 py-2 font-semibold">Tanker</th>
              <th className="text-left px-4 py-2 font-semibold">Driver</th>
              <th className="text-left px-4 py-2 font-semibold">Route</th>
              <th className="text-left px-4 py-2 font-semibold">Fuel Type</th>
              <th className="text-left px-4 py-2 font-semibold">Qty</th>
              <th className="text-left px-4 py-2 font-semibold">Status</th>
              <th className="text-left px-4 py-2 font-semibold">ETA</th>
            </tr>
          </thead>
          <tbody>
            {dispatches.map((dispatch) => (
              <tr
                key={dispatch.dispatch_id}
                onClick={() => onRowClick?.(dispatch)}
                className="border-b border-border hover:bg-surface transition cursor-pointer"
              >
                <td className="px-4 py-2 font-mono text-xs">{dispatch.dispatch_number}</td>
                <td className="px-4 py-2 font-medium">{dispatch.tanker_plate}</td>
                <td className="px-4 py-2">{dispatch.driver_name}</td>
                <td className="px-4 py-2 text-xs">
                  <div className="flex items-center gap-1">
                    <MapPin size={14} />
                    {dispatch.destination_station_name}
                  </div>
                </td>
                <td className="px-4 py-2">
                  <span className={`inline-block px-2 py-0.5 rounded text-xs font-medium ${fuelTypeBadgeClass(dispatch.fuel_type)}`}>
                    {dispatch.fuel_type.slice(0, 3)}
                  </span>
                </td>
                <td className="px-4 py-2">{(dispatch.quantity_liters / 1000).toFixed(1)}K L</td>
                <td className="px-4 py-2">
                  <span className={`inline-block px-2 py-0.5 rounded text-xs font-medium ${dispatchStatusClass(dispatch.status)}`}>
                    {dispatch.status}
                  </span>
                </td>
                <td className="px-4 py-2">
                  <div className="flex items-center gap-1 text-xs">
                    <Clock size={14} />
                    {dispatch.is_overdue ? (
                      <span className="text-red-600 font-medium">OVERDUE</span>
                    ) : (
                      formatTime(dispatch.expected_delivery_at)
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
