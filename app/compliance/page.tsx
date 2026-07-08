'use client'

import React from 'react'
import { useOmcStore } from '@/store/useOmcStore'
import { CheckCircle, AlertCircle } from 'lucide-react'

export default function CompliancePage() {
  const { omcProfile, quotaPeriod } = useOmcStore()

  const complianceItems = [
    {
      id: 1,
      category: 'Quota Adherence',
      status: 'compliant',
      message: 'Operating within allocated quotas',
      details: 'All fuel types within monthly limits'
    },
    {
      id: 2,
      category: 'Pricing',
      status: 'compliant',
      message: 'Following government-mandated prices',
      details: 'All stations reporting compliant pricing'
    },
    {
      id: 3,
      category: 'Delivery Documentation',
      status: 'compliant',
      message: 'All deliveries documented',
      details: '98 of 100 deliveries auto-submitted to FDCS ledger'
    },
    {
      id: 4,
      category: 'Station Compliance',
      status: 'warning',
      message: 'Minor documentation gaps',
      details: '2 stations pending delivery confirmations'
    },
    {
      id: 5,
      category: 'Fleet Maintenance',
      status: 'compliant',
      message: 'Maintenance schedule up to date',
      details: 'All inspections current'
    },
  ]

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Compliance & Regulatory</h1>
        <p className="text-foreground-secondary">Monitor your regulatory compliance status</p>
      </div>

      {/* Overall Status */}
      <div className={`card p-6 border-l-4 ${
        omcProfile?.compliance_status === 'compliant'
          ? 'border-green-500 bg-green-50'
          : 'border-yellow-500 bg-yellow-50'
      }`}>
        <div className="flex items-start gap-4">
          {omcProfile?.compliance_status === 'compliant' ? (
            <CheckCircle size={32} className="text-green-600 flex-shrink-0" />
          ) : (
            <AlertCircle size={32} className="text-yellow-600 flex-shrink-0" />
          )}
          <div>
            <h2 className={`text-2xl font-bold mb-1 ${
              omcProfile?.compliance_status === 'compliant'
                ? 'text-green-900'
                : 'text-yellow-900'
            }`}>
              {omcProfile?.compliance_status === 'compliant' ? 'Compliant' : 'Action Required'}
            </h2>
            <p className={`${
              omcProfile?.compliance_status === 'compliant'
                ? 'text-green-800'
                : 'text-yellow-800'
            }`}>
              {omcProfile?.compliance_status === 'compliant'
                ? 'Your OMC is fully compliant with EPEA regulations'
                : 'Review items below to maintain compliance'
              }
            </p>
          </div>
        </div>
      </div>

      {/* Compliance Items */}
      <div className="space-y-3">
        <h3 className="font-semibold text-foreground text-lg">Compliance Items</h3>
        {complianceItems.map(item => (
          <div
            key={item.id}
            className={`card p-4 border-l-4 ${
              item.status === 'compliant'
                ? 'border-green-500 bg-green-50'
                : 'border-yellow-500 bg-yellow-50'
            }`}
          >
            <div className="flex items-start gap-3">
              {item.status === 'compliant' ? (
                <CheckCircle size={20} className="text-green-600 flex-shrink-0 mt-0.5" />
              ) : (
                <AlertCircle size={20} className="text-yellow-600 flex-shrink-0 mt-0.5" />
              )}
              <div className="flex-1">
                <h4 className={`font-semibold mb-1 ${
                  item.status === 'compliant' ? 'text-green-900' : 'text-yellow-900'
                }`}>
                  {item.category}
                </h4>
                <p className={`text-sm mb-1 ${
                  item.status === 'compliant' ? 'text-green-800' : 'text-yellow-800'
                }`}>
                  {item.message}
                </p>
                <p className={`text-xs ${
                  item.status === 'compliant' ? 'text-green-700' : 'text-yellow-700'
                }`}>
                  {item.details}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Regulatory Info */}
      <div className="card space-y-4">
        <h3 className="font-semibold text-foreground text-lg">Regulatory Information</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-foreground-secondary mb-1">License Expiry</p>
            <p className="font-semibold text-foreground">
              {omcProfile?.license_expiry_date
                ? new Date(omcProfile.license_expiry_date).toLocaleDateString()
                : 'N/A'
              }
            </p>
          </div>
          <div>
            <p className="text-sm text-foreground-secondary mb-1">License Number</p>
            <p className="font-semibold text-foreground font-mono">{omcProfile?.license_number}</p>
          </div>
          <div>
            <p className="text-sm text-foreground-secondary mb-1">Licensed Regions</p>
            <p className="font-semibold text-foreground">{omcProfile?.regions.join(', ')}</p>
          </div>
          <div>
            <p className="text-sm text-foreground-secondary mb-1">Fuel Types Authorized</p>
            <p className="font-semibold text-foreground">{omcProfile?.fuel_types.join(', ')}</p>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="card space-y-3">
        <h3 className="font-semibold text-foreground">Quick Actions</h3>
        <button className="w-full px-4 py-2 border border-border rounded hover:bg-surface transition text-sm font-medium">
          Download Compliance Report
        </button>
        <button className="w-full px-4 py-2 border border-border rounded hover:bg-surface transition text-sm font-medium">
          View FDCS Ledger Entries
        </button>
        <button className="w-full px-4 py-2 border border-border rounded hover:bg-surface transition text-sm font-medium">
          Contact Regulatory Officer
        </button>
      </div>
    </div>
  )
}
