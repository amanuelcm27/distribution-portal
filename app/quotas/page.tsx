'use client'

import React, { useState } from 'react'
import { useOmcStore } from '@/store/useOmcStore'
import { QuotaHealthCard } from '@/components/quota/QuotaHealthCard'
import { formatLiters, formatPercent, fuelTypeBadgeClass } from '@/lib/utils'
import { AlertCircle, Info } from 'lucide-react'

export default function QuotasPage() {
  const { quotaPeriod, omcProfile } = useOmcStore()
  const [activeTab, setActiveTab] = useState('current')

  if (!quotaPeriod || !omcProfile) {
    return <div className="p-6">Loading...</div>
  }

  const regionalStats = [
    { region: 'Addis Ababa', diesel: 150000, benzine: 60000, kerosene: 30000 },
    { region: 'Amhara', diesel: 120000, benzine: 40000, kerosene: 20000 },
    { region: 'Oromia', diesel: 100000, benzine: 35000, kerosene: 15000 },
  ]

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Quota Management</h1>
        <p className="text-foreground-secondary">Manage your fuel allocation and track utilization</p>
      </div>

      {/* Info Banner */}
      <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg flex items-start gap-3">
        <Info className="text-blue-600 flex-shrink-0 mt-0.5" size={20} />
        <div className="text-sm text-blue-900">
          <p className="font-medium">Quotas are set by EPEA</p>
          <p className="mt-1">Your fuel quotas are determined by the government and cannot be modified. Contact your regional office to request quota adjustments.</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-border">
        <button
          onClick={() => setActiveTab('current')}
          className={`px-4 py-2 font-medium border-b-2 transition ${
            activeTab === 'current'
              ? 'border-primary text-primary'
              : 'border-transparent text-foreground-secondary hover:text-foreground'
          }`}
        >
          Current Period
        </button>
        <button
          onClick={() => setActiveTab('history')}
          className={`px-4 py-2 font-medium border-b-2 transition ${
            activeTab === 'history'
              ? 'border-primary text-primary'
              : 'border-transparent text-foreground-secondary hover:text-foreground'
          }`}
        >
          History
        </button>
        <button
          onClick={() => setActiveTab('regional')}
          className={`px-4 py-2 font-medium border-b-2 transition ${
            activeTab === 'regional'
              ? 'border-primary text-primary'
              : 'border-transparent text-foreground-secondary hover:text-foreground'
          }`}
        >
          By Region
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === 'current' && (
        <div className="space-y-6">
          {/* Period Info Card */}
          <div className="card">
            <div className="grid grid-cols-4 gap-4">
              <div>
                <p className="text-sm text-foreground-secondary">Period</p>
                <p className="text-lg font-semibold text-foreground">{quotaPeriod.label}</p>
              </div>
              <div>
                <p className="text-sm text-foreground-secondary">Start Date</p>
                <p className="text-lg font-semibold text-foreground">{new Date(quotaPeriod.start_date).toLocaleDateString()}</p>
              </div>
              <div>
                <p className="text-sm text-foreground-secondary">End Date</p>
                <p className="text-lg font-semibold text-foreground">{new Date(quotaPeriod.end_date).toLocaleDateString()}</p>
              </div>
              <div>
                <p className="text-sm text-foreground-secondary">Days Remaining</p>
                <p className="text-lg font-semibold text-foreground">{quotaPeriod.days_remaining} days</p>
              </div>
            </div>
          </div>

          {/* Quota Cards */}
          <div className="grid grid-cols-3 gap-4">
            {Object.values(quotaPeriod.quotas_by_fuel).map(quota => (
              <QuotaHealthCard key={quota.fuel_type} quota={quota} period={quotaPeriod} />
            ))}
          </div>

          {/* Detailed Breakdown */}
          <div className="card">
            <h3 className="text-lg font-semibold text-foreground mb-4">Detailed Breakdown</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-surface">
                    <th className="text-left px-4 py-2 font-semibold">Fuel Type</th>
                    <th className="text-right px-4 py-2 font-semibold">Allocated</th>
                    <th className="text-right px-4 py-2 font-semibold">Lifted</th>
                    <th className="text-right px-4 py-2 font-semibold">In Transit</th>
                    <th className="text-right px-4 py-2 font-semibold">Delivered</th>
                    <th className="text-right px-4 py-2 font-semibold">Remaining</th>
                    <th className="text-right px-4 py-2 font-semibold">Utilization</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.values(quotaPeriod.quotas_by_fuel).map(quota => {
                    const utilized = quota.allocated - quota.remaining
                    const utilizationPercent = Math.round((utilized / quota.allocated) * 100)
                    return (
                      <tr key={quota.fuel_type} className="border-b border-border hover:bg-surface">
                        <td className="px-4 py-2">
                          <span className={`inline-block px-2 py-0.5 rounded text-xs font-medium ${fuelTypeBadgeClass(quota.fuel_type)}`}>
                            {quota.fuel_type}
                          </span>
                        </td>
                        <td className="text-right px-4 py-2">{formatLiters(quota.allocated)}</td>
                        <td className="text-right px-4 py-2">{formatLiters(quota.lifted)}</td>
                        <td className="text-right px-4 py-2">{formatLiters(quota.in_transit)}</td>
                        <td className="text-right px-4 py-2">{formatLiters(quota.delivered)}</td>
                        <td className="text-right px-4 py-2 font-semibold">{formatLiters(quota.remaining)}</td>
                        <td className="text-right px-4 py-2">
                          <span className={`inline-block px-2 py-0.5 rounded text-xs font-medium ${
                            utilizationPercent > 80 ? 'bg-green-100 text-green-700' :
                            utilizationPercent > 50 ? 'bg-yellow-100 text-yellow-700' :
                            'bg-blue-100 text-blue-700'
                          }`}>
                            {utilizationPercent}%
                          </span>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'history' && (
        <div className="card">
          <h3 className="font-semibold text-foreground mb-4">Historical Quotas</h3>
          <p className="text-sm text-foreground-secondary text-center py-8">Historical quota data would be displayed here</p>
        </div>
      )}

      {activeTab === 'regional' && (
        <div className="card">
          <h3 className="font-semibold text-foreground mb-4">Regional Quota Distribution</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-surface">
                  <th className="text-left px-4 py-2 font-semibold">Region</th>
                  <th className="text-right px-4 py-2 font-semibold">DIESEL</th>
                  <th className="text-right px-4 py-2 font-semibold">BENZINE</th>
                  <th className="text-right px-4 py-2 font-semibold">KEROSENE</th>
                  <th className="text-right px-4 py-2 font-semibold">Total</th>
                </tr>
              </thead>
              <tbody>
                {regionalStats.map(region => (
                  <tr key={region.region} className="border-b border-border hover:bg-surface">
                    <td className="px-4 py-2 font-medium">{region.region}</td>
                    <td className="text-right px-4 py-2">{formatLiters(region.diesel)}</td>
                    <td className="text-right px-4 py-2">{formatLiters(region.benzine)}</td>
                    <td className="text-right px-4 py-2">{formatLiters(region.kerosene)}</td>
                    <td className="text-right px-4 py-2 font-semibold">
                      {formatLiters(region.diesel + region.benzine + region.kerosene)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}
