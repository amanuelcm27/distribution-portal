'use client'

import React from 'react'
import { useOmcStore } from '@/store/useOmcStore'
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

export default function ReportsPage() {
  const { quotaPeriod, tankers, stations } = useOmcStore()

  const fleetUtilization = [
    { name: 'Available', value: tankers.filter(t => t.status === 'AVAILABLE').length, fill: '#10B981' },
    { name: 'In Transit', value: tankers.filter(t => t.status === 'IN_TRANSIT').length, fill: '#F59E0B' },
    { name: 'Loading', value: tankers.filter(t => t.status === 'LOADING').length, fill: '#3B82F6' },
    { name: 'Maintenance', value: tankers.filter(t => t.status === 'MAINTENANCE').length, fill: '#EF4444' },
  ]

  const quotaData = quotaPeriod ? Object.entries(quotaPeriod.quotas_by_fuel).map(([fuelType, quota]) => ({
    fuel: fuelType,
    allocated: quota.allocated / 1000,
    delivered: quota.delivered / 1000,
    remaining: quota.remaining / 1000,
  })) : []

  const stationHealth = [
    { status: 'Healthy', count: stations.filter(s =>
      Object.values(s.stocks).every(st => st.health === 'healthy')
    ).length },
    { status: 'Low Stock', count: stations.filter(s =>
      Object.values(s.stocks).some(st => st.health === 'low')
    ).length },
    { status: 'Critical', count: stations.filter(s =>
      Object.values(s.stocks).some(st => st.health === 'critical')
    ).length },
  ]

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Reports & Analytics</h1>
        <p className="text-foreground-secondary">Monitor key performance indicators and trends</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-4 gap-4">
        <div className="card p-4">
          <p className="text-sm text-foreground-secondary mb-1">Fleet Utilization</p>
          <p className="text-3xl font-bold text-foreground mb-1">
            {Math.round((tankers.filter(t => t.status !== 'AVAILABLE').length / tankers.length) * 100)}%
          </p>
          <p className="text-xs text-foreground-secondary">{tankers.filter(t => t.status !== 'AVAILABLE').length} active</p>
        </div>
        <div className="card p-4">
          <p className="text-sm text-foreground-secondary mb-1">Station Health</p>
          <p className="text-3xl font-bold text-green-600 mb-1">
            {stations.filter(s => Object.values(s.stocks).every(st => st.health === 'healthy')).length}
          </p>
          <p className="text-xs text-foreground-secondary">out of {stations.length} healthy</p>
        </div>
        <div className="card p-4">
          <p className="text-sm text-foreground-secondary mb-1">Quota Utilization</p>
          <p className="text-3xl font-bold text-foreground mb-1">
            {quotaPeriod ? Math.round(
              ((quotaPeriod.quotas_by_fuel.DIESEL.allocated - quotaPeriod.quotas_by_fuel.DIESEL.remaining) /
                quotaPeriod.quotas_by_fuel.DIESEL.allocated) * 100
            ) : 0}%
          </p>
          <p className="text-xs text-foreground-secondary">DIESEL burn rate</p>
        </div>
        <div className="card p-4">
          <p className="text-sm text-foreground-secondary mb-1">Days Remaining</p>
          <p className="text-3xl font-bold text-foreground mb-1">
            {quotaPeriod?.days_remaining}
          </p>
          <p className="text-xs text-foreground-secondary">in {quotaPeriod?.label}</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-2 gap-6">
        {/* Quota Breakdown */}
        <div className="card p-4">
          <h3 className="font-semibold text-foreground mb-4">Quota Status by Fuel Type</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={quotaData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="fuel" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="allocated" fill="#E5E7EB" name="Allocated" />
              <Bar dataKey="delivered" fill="#10B981" name="Delivered" />
              <Bar dataKey="remaining" fill="#EF4444" name="Remaining" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Fleet Status */}
        <div className="card p-4">
          <h3 className="font-semibold text-foreground mb-4">Fleet Status Distribution</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={fleetUtilization}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#3B82F6" name="Tankers" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Station Health Summary */}
      <div className="card p-4">
        <h3 className="font-semibold text-foreground mb-4">Station Network Health</h3>
        <div className="grid grid-cols-3 gap-4">
          {stationHealth.map(item => (
            <div key={item.status} className="p-4 bg-surface rounded-lg text-center">
              <p className="text-2xl font-bold text-foreground mb-1">{item.count}</p>
              <p className="text-sm text-foreground-secondary">{item.status}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Export Options */}
      <div className="card space-y-3">
        <h3 className="font-semibold text-foreground">Generate Reports</h3>
        <div className="grid grid-cols-2 gap-3">
          <button className="px-4 py-2 border border-border rounded hover:bg-surface transition text-sm font-medium">
            Monthly Performance Report
          </button>
          <button className="px-4 py-2 border border-border rounded hover:bg-surface transition text-sm font-medium">
            Quota Utilization Report
          </button>
          <button className="px-4 py-2 border border-border rounded hover:bg-surface transition text-sm font-medium">
            Fleet Efficiency Report
          </button>
          <button className="px-4 py-2 border border-border rounded hover:bg-surface transition text-sm font-medium">
            Station Network Report
          </button>
        </div>
      </div>
    </div>
  )
}
