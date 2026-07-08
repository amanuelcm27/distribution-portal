import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { FuelType, QuotaHealthStatus, StockHealthStatus, DispatchStatus } from "@/types"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Color mapping functions
export function fuelTypeColor(fuel: FuelType): string {
  const colors: Record<FuelType, string> = {
    DIESEL: '#2563EB',
    BENZINE: '#D97706',
    KEROSENE: '#0D9488',
  }
  return colors[fuel]
}

export function fuelTypeBgColor(fuel: FuelType): string {
  const colors: Record<FuelType, string> = {
    DIESEL: 'bg-blue-50',
    BENZINE: 'bg-orange-50',
    KEROSENE: 'bg-teal-50',
  }
  return colors[fuel]
}

export function fuelTypeBadgeClass(fuel: FuelType): string {
  const classes: Record<FuelType, string> = {
    DIESEL: 'badge-diesel',
    BENZINE: 'badge-benzine',
    KEROSENE: 'badge-kerosene',
  }
  return classes[fuel]
}

export function quotaHealthColor(health: QuotaHealthStatus): string {
  const colors: Record<QuotaHealthStatus, string> = {
    healthy: '#10B981',
    moderate: '#F59E0B',
    low: '#EF4444',
    exhausted: '#9CA3AF',
  }
  return colors[health]
}

export function quotaHealthClass(health: QuotaHealthStatus): string {
  const classes: Record<QuotaHealthStatus, string> = {
    healthy: 'status-healthy',
    moderate: 'status-moderate',
    low: 'status-low',
    exhausted: 'status-exhausted',
  }
  return classes[health]
}

export function stockHealthClass(health: StockHealthStatus): string {
  const colors: Record<StockHealthStatus, string> = {
    healthy: 'status-healthy',
    low: 'status-low',
    critical: 'status-critical',
  }
  return colors[health]
}

export function dispatchStatusColor(status: DispatchStatus): string {
  const colors: Record<DispatchStatus, string> = {
    CREATED: '#8B5CF6',
    APPROVED: '#3B82F6',
    LOADED: '#06B6D4',
    IN_TRANSIT: '#F59E0B',
    ARRIVED: '#6366F1',
    VERIFIED: '#10B981',
    CLOSED: '#6B7280',
    CANCELLED: '#DC2626',
  }
  return colors[status]
}

export function dispatchStatusClass(status: DispatchStatus): string {
  const classes: Record<DispatchStatus, string> = {
    CREATED: 'dispatch-created',
    APPROVED: 'dispatch-approved',
    LOADED: 'dispatch-loaded',
    IN_TRANSIT: 'dispatch-in-transit',
    ARRIVED: 'dispatch-arrived',
    VERIFIED: 'dispatch-verified',
    CLOSED: 'dispatch-closed',
    CANCELLED: 'dispatch-cancelled',
  }
  return classes[status]
}

export function dispatchStatusBorderClass(status: DispatchStatus): string {
  const classes: Record<DispatchStatus, string> = {
    CREATED: 'border-l-4 border-purple-500',
    APPROVED: 'border-l-4 border-blue-500',
    LOADED: 'border-l-4 border-cyan-500',
    IN_TRANSIT: 'border-l-4 border-amber-500',
    ARRIVED: 'border-l-4 border-indigo-500',
    VERIFIED: 'border-l-4 border-green-500',
    CLOSED: 'border-l-4 border-gray-400',
    CANCELLED: 'border-l-4 border-red-500',
  }
  return classes[status]
}

// Formatting functions
export function formatNumber(value: number): string {
  return new Intl.NumberFormat('en-US').format(value)
}

export function formatLiters(liters: number): string {
  if (liters >= 1000) {
    return `${(liters / 1000).toFixed(1)}K L`
  }
  return `${liters} L`
}

export function formatPercent(value: number, max: number): string {
  const percent = Math.round((value / max) * 100)
  return `${percent}%`
}

export function formatDate(date: string | Date): string {
  const d = new Date(date)
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
}

export function formatDateTime(date: string | Date): string {
  const d = new Date(date)
  return d.toLocaleString('en-US', { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })
}

export function formatTime(date: string | Date): string {
  const d = new Date(date)
  return d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
}

export function getTimeAgo(date: string | Date): string {
  const d = new Date(date)
  const now = new Date()
  const seconds = Math.floor((now.getTime() - d.getTime()) / 1000)
  
  let interval = Math.floor(seconds / 31536000)
  if (interval >= 1) return `${interval}y ago`
  
  interval = Math.floor(seconds / 2592000)
  if (interval >= 1) return `${interval}mo ago`
  
  interval = Math.floor(seconds / 86400)
  if (interval >= 1) return `${interval}d ago`
  
  interval = Math.floor(seconds / 3600)
  if (interval >= 1) return `${interval}h ago`
  
  interval = Math.floor(seconds / 60)
  if (interval >= 1) return `${interval}m ago`
  
  return 'just now'
}

// Quota calculations
export function getQuotaPercentage(used: number, allocated: number): number {
  return Math.round((used / allocated) * 100)
}

export function getQuotaRemaining(allocated: number, lifted: number, inTransit: number, delivered: number): number {
  return allocated - lifted - inTransit - delivered
}

// Station calculations
export function getStockPercentage(current: number, capacity: number): number {
  return Math.round((current / capacity) * 100)
}

// Distance calculation (Haversine formula)
export function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371 // Earth's radius in km
  const dLat = (lat2 - lat1) * (Math.PI / 180)
  const dLon = (lon2 - lon1) * (Math.PI / 180)
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  return R * c
}
