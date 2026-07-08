'use client'

import React from 'react'
import { AlertTriangle, Clock, Zap, Truck, CheckCircle } from 'lucide-react'
import { useOmcStore } from '@/store/useOmcStore'
import { getTimeAgo } from '@/lib/utils'

const actionIcons = {
  confirm_delivery: CheckCircle,
  assign_tanker: Truck,
  critical_station: AlertTriangle,
  overdue_dispatch: Clock,
  expiring_quota: Zap,
}

const priorityColors = {
  critical: 'border-l-4 border-red-500 text-foreground',
  high: 'border-l-4 border-orange-500 text-foreground',
  medium: 'border-l-4 border-yellow-500 text-foreground',
  low: 'border-l-4 border-blue-500 text-foreground',
}

export function ActionQueue() {
  const { pendingActions, removePendingAction } = useOmcStore()

  const topActions = pendingActions.filter(a => a.action_type !== 'critical_station').slice(0, 5)

  return (
    <div className="card">
      <h3 className="font-semibold text-foreground mb-3">Action Queue</h3>
      <div className="space-y-2">
        {topActions.length === 0 ? (
          <p className="text-sm text-foreground-secondary text-center py-6">All caught up!</p>
        ) : (
          topActions.map(action => {
            const Icon = actionIcons[action.action_type] || AlertTriangle
            return (
              <div
                key={action.action_id}
                className={`p-3 rounded text-sm ${priorityColors[action.priority]}`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-start gap-2 flex-1 min-w-0">
                    <Icon size={18} className="flex-shrink-0 mt-0.5" />
                    <div className="min-w-0 flex-1">
                      <p className="font-medium text-foreground">{action.title}</p>
                      <p className="text-xs text-foreground-secondary">{action.description}</p>
                      <p className="text-xs text-foreground-secondary mt-1">{getTimeAgo(action.created_at)}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => removePendingAction(action.action_id)}
                    className="flex-shrink-0 text-foreground-secondary hover:text-foreground"
                  >
                    ✕
                  </button>
                </div>
              </div>
            )
          })
        )}
      </div>
      {pendingActions.length > 5 && (
        <button className="w-full mt-3 text-sm text-info hover:underline">
          View all {pendingActions.length} actions
        </button>
      )}
    </div>
  )
}
