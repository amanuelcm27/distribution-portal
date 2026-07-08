'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useOmcStore } from '@/store/useOmcStore'
import { Calendar, Plus, Truck } from 'lucide-react'
import { formatDate, fuelTypeBadgeClass, formatLiters } from '@/lib/utils'

export default function LiftingPage() {
  const { quotaPeriod } = useOmcStore()
  const [activeTab, setActiveTab] = useState('upcoming')

  const mockLiftingSlots = [
    {
      slot_id: 'slot-001',
      depot_name: 'Addis Depot',
      fuel_type: 'DIESEL',
      volume_liters: 30000,
      scheduled_date: '2024-07-10',
      time_window_start: '08:00',
      time_window_end: '12:00',
      status: 'SCHEDULED',
      assigned_tanker_id: null,
    },
    {
      slot_id: 'slot-002',
      depot_name: 'Addis Depot',
      fuel_type: 'BENZINE',
      volume_liters: 20000,
      scheduled_date: '2024-07-11',
      time_window_start: '13:00',
      time_window_end: '17:00',
      status: 'ASSIGNED',
      assigned_tanker_id: 'tanker-004',
    },
    {
      slot_id: 'slot-003',
      depot_name: 'Adama Depot',
      fuel_type: 'KEROSENE',
      volume_liters: 25000,
      scheduled_date: '2024-07-12',
      time_window_start: '08:00',
      time_window_end: '14:00',
      status: 'SCHEDULED',
      assigned_tanker_id: null,
    },
  ]

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Lifting Schedule</h1>
          <p className="text-foreground-secondary">Manage depot lifting slots and tanker assignments</p>
        </div>
        <Link href="/dispatch/new" className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded hover:opacity-90 transition">
          <Plus size={20} />
          Request Slot
        </Link>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-border">
        <button
          onClick={() => setActiveTab('upcoming')}
          className={`px-4 py-2 font-medium border-b-2 transition ${
            activeTab === 'upcoming'
              ? 'border-primary text-primary'
              : 'border-transparent text-foreground-secondary hover:text-foreground'
          }`}
        >
          Upcoming Slots
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
      </div>

      {/* Tab Content */}
      {activeTab === 'upcoming' && (
        <div className="space-y-4">
          {/* Calendar View */}
          <div className="card">
            <div className="flex items-center gap-2 mb-4">
              <Calendar size={20} />
              <h3 className="font-semibold text-foreground">2-Week View</h3>
            </div>
            <p className="text-sm text-foreground-secondary text-center py-8">Calendar view would be displayed here</p>
          </div>

          {/* Slots Table */}
          <div className="card">
            <h3 className="font-semibold text-foreground mb-4">Available & Assigned Slots</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-surface">
                    <th className="text-left px-4 py-2 font-semibold">Depot</th>
                    <th className="text-left px-4 py-2 font-semibold">Fuel Type</th>
                    <th className="text-left px-4 py-2 font-semibold">Volume</th>
                    <th className="text-left px-4 py-2 font-semibold">Date</th>
                    <th className="text-left px-4 py-2 font-semibold">Time Window</th>
                    <th className="text-left px-4 py-2 font-semibold">Status</th>
                    <th className="text-left px-4 py-2 font-semibold">Tanker</th>
                    <th className="text-left px-4 py-2 font-semibold">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {mockLiftingSlots.map(slot => (
                    <tr
                      key={slot.slot_id}
                      className={`border-b border-border hover:bg-surface transition text-foreground`}
                    >
                      <td className="px-4 py-2 font-medium">{slot.depot_name}</td>
                      <td className="px-4 py-2">
                        <span className={`inline-block px-2 py-0.5 rounded text-xs font-medium ${fuelTypeBadgeClass(slot.fuel_type)}`}>
                          {slot.fuel_type.slice(0, 3)}
                        </span>
                      </td>
                      <td className="px-4 py-2">{formatLiters(slot.volume_liters)}</td>
                      <td className="px-4 py-2">{formatDate(slot.scheduled_date)}</td>
                      <td className="px-4 py-2 text-xs">
                        {slot.time_window_start} - {slot.time_window_end}
                      </td>
                      <td className="px-4 py-2">
                        <span className={`inline-block px-2 py-0.5 rounded text-xs font-medium ${
                          slot.status === 'ASSIGNED'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-yellow-100 text-yellow-700'
                        }`}>
                          {slot.status}
                        </span>
                      </td>
                      <td className="px-4 py-2 text-sm">
                        {slot.assigned_tanker_id ? (
                          <span className="font-mono">APL-004</span>
                        ) : (
                          <span className="text-foreground-secondary">—</span>
                        )}
                      </td>
                      <td className="px-4 py-2">
                        <button className="flex items-center gap-1 px-2 py-1 bg-primary text-white text-xs rounded hover:opacity-90 transition">
                          <Truck size={14} />
                          {slot.assigned_tanker_id ? 'Edit' : 'Assign'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'history' && (
        <div className="card">
          <h3 className="font-semibold text-foreground mb-4">Past Liftings</h3>
          <p className="text-sm text-foreground-secondary text-center py-8">Historical lifting data would be displayed here</p>
        </div>
      )}
    </div>
  )
}
