'use client'

import React, { useState } from 'react'
import { useOmcStore } from '@/store/useOmcStore'
import { DispatchTable } from '@/components/dispatch/DispatchTable'
import { Plus, Layout } from 'lucide-react'
import Link from 'next/link'

export default function DispatchPage() {
  const { dispatches, setSelectedDispatchId } = useOmcStore()
  const [filter, setFilter] = useState('all')

  const filteredDispatches = filter === 'all'
    ? dispatches
    : filter === 'active'
    ? dispatches.filter(d => ['CREATED', 'APPROVED', 'LOADED', 'IN_TRANSIT', 'ARRIVED'].includes(d.status))
    : dispatches.filter(d => d.status === filter)

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Dispatch Operations</h1>
          <p className="text-foreground-secondary">Create and track fuel dispatches to retail stations</p>
        </div>
        <div className="flex gap-2">
          <Link href="/dispatch/board" className="flex items-center gap-2 px-4 py-2 border border-border rounded hover:bg-surface transition">
            <Layout size={20} />
            Kanban Board
          </Link>
          <Link href="/dispatch/new" className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded hover:opacity-90 transition">
            <Plus size={20} />
            New Dispatch
          </Link>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {[
          { id: 'all', label: 'All', count: dispatches.length },
          { id: 'active', label: 'Active', count: dispatches.filter(d => ['CREATED', 'APPROVED', 'LOADED', 'IN_TRANSIT', 'ARRIVED'].includes(d.status)).length },
          { id: 'CREATED', label: 'Created', count: dispatches.filter(d => d.status === 'CREATED').length },
          { id: 'IN_TRANSIT', label: 'In Transit', count: dispatches.filter(d => d.status === 'IN_TRANSIT').length },
          { id: 'ARRIVED', label: 'Arrived', count: dispatches.filter(d => d.status === 'ARRIVED').length },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setFilter(tab.id)}
            className={`px-4 py-2 rounded whitespace-nowrap text-sm font-medium transition ${
              filter === tab.id
                ? 'bg-primary text-primary-foreground'
                : 'bg-surface text-foreground hover:bg-surface-secondary'
            }`}
          >
            {tab.label}
            <span className={`ml-2 ${
              filter === tab.id ? 'text-primary-foreground' : 'text-foreground-secondary'
            }`}>
              ({tab.count})
            </span>
          </button>
        ))}
      </div>

      {/* Dispatches Table */}
      <DispatchTable
        dispatches={filteredDispatches}
        onRowClick={(dispatch) => setSelectedDispatchId(dispatch.dispatch_id)}
      />
    </div>
  )
}
