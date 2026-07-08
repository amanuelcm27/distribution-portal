'use client'

import React, { useState } from 'react'
import { useOmcStore } from '@/store/useOmcStore'
import { formatPercent, fuelTypeBadgeClass } from '@/lib/utils'
import { AlertTriangle } from 'lucide-react'

export default function StationsPage() {
  const { stations } = useOmcStore()
  const [filterHealth, setFilterHealth] = useState('ALL')
  const [filterRegion, setFilterRegion] = useState('ALL')

  const regions = ['Addis Ababa', 'Amhara', 'Oromia']

  const filteredStations = stations.filter(s => {
    const healthMatch = filterHealth === 'ALL' ||
      (filterHealth === 'CRITICAL' && Object.values(s.stocks).some(st => st.health === 'critical')) ||
      (filterHealth === 'LOW' && Object.values(s.stocks).some(st => st.health === 'low')) ||
      (filterHealth === 'HEALTHY' && Object.values(s.stocks).every(st => st.health === 'healthy'))

    const regionMatch = filterRegion === 'ALL' || s.region === filterRegion

    return healthMatch && regionMatch
  })

  const getStationHealth = (station: typeof stations[0]): 'critical' | 'low' | 'healthy' => {
    const healths = Object.values(station.stocks).map(s => s.health)
    if (healths.includes('critical')) return 'critical'
    if (healths.includes('low')) return 'low'
    return 'healthy'
  }

  const healthStats = {
    total: stations.length,
    critical: stations.filter(s => getStationHealth(s) === 'critical').length,
    low: stations.filter(s => getStationHealth(s) === 'low').length,
    healthy: stations.filter(s => getStationHealth(s) === 'healthy').length,
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">My Stations</h1>
        <p className="text-foreground-secondary">Manage retail station network and monitor stock levels</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        <div className="card p-4 text-center">
          <p className="text-3xl font-bold text-foreground mb-1">{healthStats.total}</p>
          <p className="text-sm text-foreground-secondary">Total Stations</p>
        </div>
        <button
          onClick={() => setFilterHealth('CRITICAL')}
          className={`card p-4 text-center hover:shadow-md transition ${filterHealth === 'CRITICAL' ? 'ring-2 ring-primary' : ''}`}
        >
          <p className="text-3xl font-bold text-red-600 mb-1">{healthStats.critical}</p>
          <p className="text-sm text-foreground-secondary">Critical</p>
        </button>
        <button
          onClick={() => setFilterHealth('LOW')}
          className={`card p-4 text-center hover:shadow-md transition ${filterHealth === 'LOW' ? 'ring-2 ring-primary' : ''}`}
        >
          <p className="text-3xl font-bold text-yellow-600 mb-1">{healthStats.low}</p>
          <p className="text-sm text-foreground-secondary">Low Stock</p>
        </button>
        <button
          onClick={() => setFilterHealth('HEALTHY')}
          className={`card p-4 text-center hover:shadow-md transition ${filterHealth === 'HEALTHY' ? 'ring-2 ring-primary' : ''}`}
        >
          <p className="text-3xl font-bold text-green-600 mb-1">{healthStats.healthy}</p>
          <p className="text-sm text-foreground-secondary">Healthy</p>
        </button>
      </div>

      {/* Filters */}
      <div className="flex gap-4">
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Health Status</label>
          <select
            value={filterHealth}
            onChange={(e) => setFilterHealth(e.target.value)}
            className="px-3 py-2 border border-border rounded bg-background text-sm"
          >
            <option value="ALL">All</option>
            <option value="HEALTHY">Healthy</option>
            <option value="LOW">Low Stock</option>
            <option value="CRITICAL">Critical</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Region</label>
          <select
            value={filterRegion}
            onChange={(e) => setFilterRegion(e.target.value)}
            className="px-3 py-2 border border-border rounded bg-background text-sm"
          >
            <option value="ALL">All Regions</option>
            {regions.map(r => (
              <option key={r} value={r}>{r}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Stations Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredStations.map(station => {
          const health = getStationHealth(station)
          const healthBg = health === 'critical' ? 'bg-red-50 border-l-4 border-red-500' :
                          health === 'low' ? 'bg-yellow-50 border-l-4 border-yellow-500' :
                          'bg-green-50 border-l-4 border-green-500'

          return (
            <div key={station.station_id} className={`card p-4 ${healthBg}`}>
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-semibold text-foreground">{station.name}</h3>
                  <p className="text-xs text-foreground-secondary">{station.region}</p>
                </div>
                <span className={`inline-block px-2 py-0.5 rounded text-xs font-medium ${
                  health === 'critical' ? 'bg-red-100 text-red-700' :
                  health === 'low' ? 'bg-yellow-100 text-yellow-700' :
                  'bg-green-100 text-green-700'
                }`}>
                  {health.toUpperCase()}
                </span>
              </div>

              {/* Stock Levels */}
              <div className="space-y-2 mb-3">
                {Object.entries(station.stocks).map(([fuelType, stock]) => (
                  <div key={fuelType}>
                    <div className="flex items-center justify-between mb-1">
                      <span className={`text-xs font-medium ${fuelTypeBadgeClass(fuelType)}`}>
                        {fuelType.slice(0, 3)}
                      </span>
                      <span className="text-xs text-foreground-secondary">
                        {formatPercent(stock.current_liters, stock.capacity_liters)}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${
                          stock.health === 'healthy' ? 'bg-green-500' :
                          stock.health === 'low' ? 'bg-yellow-500' :
                          'bg-red-500'
                        }`}
                        style={{ width: `${(stock.current_liters / stock.capacity_liters) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Action Button */}
              {health === 'critical' && (
                <button className="w-full px-3 py-2 bg-red-600 text-white rounded text-sm font-medium hover:bg-red-700 transition flex items-center justify-center gap-2">
                  <AlertTriangle size={16} />
                  Dispatch Fuel Now
                </button>
              )}
            </div>
          )
        })}
      </div>

      {filteredStations.length === 0 && (
        <div className="card text-center py-12">
          <p className="text-foreground-secondary">No stations match your filters</p>
        </div>
      )}
    </div>
  )
}
