'use client'

import React, { useState } from 'react'
import { useOmcStore } from '@/store/useOmcStore'
import { formatDate, formatPercent } from '@/lib/utils'
import { MapPin, AlertTriangle } from 'lucide-react'

export default function FleetPage() {
  const { tankers } = useOmcStore()
  const [filterStatus, setFilterStatus] = useState('ALL')

  const filteredTankers = filterStatus === 'ALL'
    ? tankers
    : tankers.filter(t => t.status === filterStatus)

  const statusColors: Record<string, string> = {
    AVAILABLE: 'bg-green-100 text-green-700',
    IN_TRANSIT: 'bg-yellow-100 text-yellow-700',
    LOADING: 'bg-blue-100 text-blue-700',
    MAINTENANCE: 'bg-red-100 text-red-700',
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Tanker Fleet</h1>
        <p className="text-foreground-secondary">Manage and monitor your fleet vehicles</p>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { status: 'ALL', label: 'Total Tankers', count: tankers.length, color: 'bg-blue-100 text-blue-700' },
          { status: 'AVAILABLE', label: 'Available', count: tankers.filter(t => t.status === 'AVAILABLE').length, color: 'bg-green-100 text-green-700' },
          { status: 'IN_TRANSIT', label: 'In Transit', count: tankers.filter(t => t.status === 'IN_TRANSIT').length, color: 'bg-yellow-100 text-yellow-700' },
          { status: 'MAINTENANCE', label: 'Maintenance', count: tankers.filter(t => t.status === 'MAINTENANCE').length, color: 'bg-red-100 text-red-700' },
        ].map(stat => (
          <button
            key={stat.status}
            onClick={() => setFilterStatus(stat.status)}
            className={`card p-4 text-center hover:shadow-md transition ${
              filterStatus === stat.status ? 'ring-2 ring-primary' : ''
            }`}
          >
            <p className="text-3xl font-bold text-foreground mb-1">{stat.count}</p>
            <p className="text-sm text-foreground-secondary">{stat.label}</p>
          </button>
        ))}
      </div>

      {/* Filter */}
      <div className="flex gap-2">
        {['ALL', 'AVAILABLE', 'IN_TRANSIT', 'LOADING', 'MAINTENANCE'].map(status => (
          <button
            key={status}
            onClick={() => setFilterStatus(status)}
            className={`px-3 py-1.5 rounded text-sm font-medium transition ${
              filterStatus === status
                ? 'bg-primary text-primary-foreground'
                : 'bg-surface text-foreground hover:bg-surface-secondary'
            }`}
          >
            {status}
          </button>
        ))}
      </div>

      {/* Fleet Table */}
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-surface">
                <th className="text-left px-4 py-2 font-semibold">Plate</th>
                <th className="text-left px-4 py-2 font-semibold">Status</th>
                <th className="text-left px-4 py-2 font-semibold">Capacity</th>
                <th className="text-left px-4 py-2 font-semibold">Current Load</th>
                <th className="text-left px-4 py-2 font-semibold">Driver</th>
                <th className="text-left px-4 py-2 font-semibold">Last Update</th>
                <th className="text-left px-4 py-2 font-semibold">Location</th>
              </tr>
            </thead>
            <tbody>
              {filteredTankers.map(tanker => (
                <tr key={tanker.tanker_id} className="border-b border-border hover:bg-surface transition">
                  <td className="px-4 py-2 font-mono font-semibold">{tanker.plate}</td>
                  <td className="px-4 py-2">
                    <span className={`inline-block px-2 py-0.5 rounded text-xs font-medium ${statusColors[tanker.status]}`}>
                      {tanker.status}
                    </span>
                  </td>
                  <td className="px-4 py-2">{(tanker.capacity_liters / 1000).toFixed(0)}K L</td>
                  <td className="px-4 py-2">
                    {tanker.current_load ? (
                      <div>
                        <p className="font-medium">{(tanker.current_load / 1000).toFixed(1)}K L</p>
                        <p className="text-xs text-foreground-secondary">
                          {formatPercent(tanker.current_load, tanker.capacity_liters)}
                        </p>
                      </div>
                    ) : (
                      <span className="text-foreground-secondary">—</span>
                    )}
                  </td>
                  <td className="px-4 py-2">
                    {tanker.driver_name ? (
                      <div>
                        <p className="font-medium">{tanker.driver_name}</p>
                      </div>
                    ) : (
                      <span className="text-foreground-secondary">Unassigned</span>
                    )}
                  </td>
                  <td className="px-4 py-2 text-xs text-foreground-secondary">
                    {tanker.last_update ? new Date(tanker.last_update).toLocaleTimeString() : 'N/A'}
                  </td>
                  <td className="px-4 py-2">
                    {tanker.current_location ? (
                      <div className="flex items-center gap-1 text-xs">
                        <MapPin size={14} />
                        {tanker.current_location.latitude.toFixed(2)}, {tanker.current_location.longitude.toFixed(2)}
                      </div>
                    ) : (
                      <span className="text-foreground-secondary">—</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Maintenance Warnings */}
      {tankers.some(t => t.maintenance_due) && (
        <div className="card border-l-4 border-yellow-500 bg-yellow-50">
          <div className="flex items-start gap-3">
            <AlertTriangle size={20} className="text-yellow-600 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-yellow-900">Maintenance Due</h3>
              <p className="text-sm text-yellow-800 mt-1">
                {tankers.filter(t => t.maintenance_due).map(t => (
                  <span key={t.tanker_id} className="block">
                    {t.plate} due {formatDate(t.maintenance_due!)}
                  </span>
                ))}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
