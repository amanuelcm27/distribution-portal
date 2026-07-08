'use client'

import React from 'react'
import { useOmcStore } from '@/store/useOmcStore'
import { dispatchStatusClass, dispatchStatusBorderClass } from '@/lib/utils'

export default function DispatchBoardPage() {
  const { dispatches } = useOmcStore()

  const statuses = ['CREATED', 'APPROVED', 'LOADED', 'IN_TRANSIT', 'ARRIVED', 'VERIFIED', 'CLOSED', 'CANCELLED']

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Dispatch Board</h1>
        <p className="text-foreground-secondary">Kanban view of all dispatch operations</p>
      </div>

      {/* Kanban Board */}
      <div className="overflow-x-auto -mx-6 px-6 pb-4">
        <div className="grid gap-4" style={{ gridTemplateColumns: `repeat(${statuses.length}, minmax(300px, 1fr))`, minWidth: 'fit-content' }}>
          {statuses.map(status => {
            const statusDispatches = dispatches.filter(d => d.status === status)
            return (
              <div key={status} className="flex flex-col h-full">
                <div className="card p-4 flex flex-col flex-1 min-h-[600px]">
                  <div className="flex items-center justify-between mb-4 pb-3 border-b border-border">
                    <h3 className="font-semibold text-foreground text-sm">{status}</h3>
                    <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-primary text-white text-xs font-bold">
                      {statusDispatches.length}
                    </span>
                  </div>

                  <div className="space-y-3 flex-1 overflow-y-auto">
                    {statusDispatches.length === 0 ? (
                      <p className="text-sm text-foreground-secondary text-center py-12">No dispatches</p>
                    ) : (
                      statusDispatches.map(dispatch => (
                          <div
                            key={dispatch.dispatch_id}
                            className={`p-3 rounded-md cursor-pointer hover:shadow-md transition bg-card text-foreground ${dispatchStatusBorderClass(dispatch.status)}`}
                          >
                            <p className="font-mono text-xs font-medium mb-2 text-foreground">{dispatch.dispatch_number}</p>
                          <div className="space-y-1.5 text-xs">
                            <p className="font-medium text-foreground truncate">{dispatch.tanker_plate}</p>
                            <p className="text-foreground-secondary truncate">{dispatch.destination_station_name}</p>
                            <p className="text-foreground-secondary truncate">{dispatch.driver_name}</p>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
