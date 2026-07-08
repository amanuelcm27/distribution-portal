'use client'

import React from 'react'
import { useOmcStore } from '@/store/useOmcStore'
import { formatDate, fuelTypeBadgeClass } from '@/lib/utils'
import { CheckCircle, AlertTriangle } from 'lucide-react'

export default function CompanyProfilePage() {
  const { omcProfile } = useOmcStore()

  if (!omcProfile) {
    return <div className="p-6">Loading...</div>
  }

  const isLicenseExpiringSoon = new Date(omcProfile.license_expiry_date) < new Date(Date.now() + 90 * 24 * 60 * 60 * 1000)

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Company Profile</h1>
        <p className="text-foreground-secondary">View and manage your OMC information</p>
      </div>

      {/* Company Card */}
      <div className="card p-6 border-l-4 border-blue-500">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold text-foreground">{omcProfile.name}</h2>
            <p className="text-foreground-secondary font-mono">{omcProfile.license_number}</p>
          </div>
          <div className="flex items-center gap-2">
            {omcProfile.compliance_status === 'compliant' ? (
              <div className="flex items-center gap-2 px-3 py-1.5 bg-green-100 text-green-700 rounded">
                <CheckCircle size={16} />
                <span className="text-sm font-medium">Compliant</span>
              </div>
            ) : (
              <div className="flex items-center gap-2 px-3 py-1.5 bg-yellow-100 text-yellow-700 rounded">
                <AlertTriangle size={16} />
                <span className="text-sm font-medium">Action Required</span>
              </div>
            )}
          </div>
        </div>

        {isLicenseExpiringSoon && (
          <div className="p-3 bg-orange-50 border border-orange-200 rounded mb-4 flex items-start gap-2">
            <AlertTriangle size={18} className="text-orange-600 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-orange-800">
              License expiring soon ({formatDate(omcProfile.license_expiry_date)})
            </div>
          </div>
        )}
      </div>

      {/* License Information */}
      <div className="card p-4">
        <h3 className="font-semibold text-foreground mb-4">License Information</h3>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <p className="text-sm text-foreground-secondary mb-1">License Number</p>
            <p className="font-mono font-semibold text-foreground">{omcProfile.license_number}</p>
          </div>
          <div>
            <p className="text-sm text-foreground-secondary mb-1">Expiry Date</p>
            <p className={`font-semibold ${
              isLicenseExpiringSoon ? 'text-orange-600' : 'text-foreground'
            }`}>
              {formatDate(omcProfile.license_expiry_date)}
            </p>
          </div>
        </div>
      </div>

      {/* Operational Information */}
      <div className="card p-4">
        <h3 className="font-semibold text-foreground mb-4">Operational Information</h3>
        <div className="grid grid-cols-3 gap-6">
          <div>
            <p className="text-sm text-foreground-secondary mb-1">Active Tankers</p>
            <p className="text-3xl font-bold text-foreground">{omcProfile.active_tanker_count}</p>
          </div>
          <div>
            <p className="text-sm text-foreground-secondary mb-1">Retail Stations</p>
            <p className="text-3xl font-bold text-foreground">{omcProfile.station_count}</p>
          </div>
          <div>
            <p className="text-sm text-foreground-secondary mb-1">Licensed Regions</p>
            <p className="text-xl font-bold text-foreground">{omcProfile.regions.length}</p>
          </div>
        </div>
      </div>

      {/* Geographic Regions */}
      <div className="card p-4">
        <h3 className="font-semibold text-foreground mb-4">Licensed Regions</h3>
        <div className="grid grid-cols-2 gap-4">
          {omcProfile.regions.map(region => (
            <div key={region} className="p-3 bg-surface rounded">
              <p className="text-sm font-medium text-foreground">{region}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Fuel Types */}
      <div className="card p-4">
        <h3 className="font-semibold text-foreground mb-4">Authorized Fuel Types</h3>
        <div className="flex gap-3">
          {omcProfile.fuel_types.map(fuel => (
            <span key={fuel} className={`px-3 py-1.5 rounded text-sm font-medium ${fuelTypeBadgeClass(fuel)}`}>
              {fuel}
            </span>
          ))}
        </div>
      </div>

      {/* Assigned Depots */}
      <div className="card p-4">
        <h3 className="font-semibold text-foreground mb-4">Assigned Depots</h3>
        <div className="space-y-2">
          {omcProfile.assigned_depots.map(depot => (
            <div key={depot} className="flex items-center gap-2 p-2 bg-surface rounded">
              <span className="w-2 h-2 rounded-full bg-primary flex-shrink-0"></span>
              <span className="text-sm text-foreground">{depot}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="card space-y-3">
        <h3 className="font-semibold text-foreground mb-3">Company Management</h3>
        <button className="w-full px-4 py-2 border border-border rounded hover:bg-surface transition text-sm font-medium">
          Edit Company Information
        </button>
        <button className="w-full px-4 py-2 border border-border rounded hover:bg-surface transition text-sm font-medium">
          Manage Users & Permissions
        </button>
        <button className="w-full px-4 py-2 border border-border rounded hover:bg-surface transition text-sm font-medium">
          Contact Support
        </button>
      </div>
    </div>
  )
}
