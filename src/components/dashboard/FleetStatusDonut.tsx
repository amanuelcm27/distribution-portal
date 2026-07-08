'use client'

import React from 'react'
import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from 'recharts'
import { useOmcStore } from '@/store/useOmcStore'

export function FleetStatusDonut() {
  const { tankers } = useOmcStore()
  
  const statusCounts = {
    available: tankers.filter(t => t.status === 'AVAILABLE').length,
    in_transit: tankers.filter(t => t.status === 'IN_TRANSIT').length,
    loading: tankers.filter(t => t.status === 'LOADING').length,
    maintenance: tankers.filter(t => t.status === 'MAINTENANCE').length,
  }

  const data = [
    { name: 'Available', value: statusCounts.available, color: '#10B981' },
    { name: 'In Transit', value: statusCounts.in_transit, color: '#F59E0B' },
    { name: 'Loading', value: statusCounts.loading, color: '#3B82F6' },
    { name: 'Maintenance', value: statusCounts.maintenance, color: '#EF4444' },
  ].filter(d => d.value > 0)

  return (
    <div className="card h-full">
      <h3 className="font-semibold text-foreground mb-4">Fleet Status</h3>
      <ResponsiveContainer width="100%" height={200}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={50}
            outerRadius={80}
            paddingAngle={2}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip formatter={(value) => `${value} tankers`} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}
