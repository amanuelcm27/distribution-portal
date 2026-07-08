'use client'

import React, { useState } from 'react'
import { useOmcStore } from '@/store/useOmcStore'
import { useRouter } from 'next/navigation'
import { Plus, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function NewDispatchPage() {
  const router = useRouter()
  const { stations, tankers, quotaPeriod, addDispatch } = useOmcStore()
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    destination_station_id: '',
    tanker_id: '',
    fuel_type: 'DIESEL',
    quantity_liters: '',
    driver_id: '',
    expected_delivery_at: '',
  })

  const totalSteps = 7

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (step === totalSteps) {
      // Create dispatch
      const newDispatch = {
        dispatch_id: `disp-${Date.now()}`,
        dispatch_number: `DSP-2024-${Math.floor(Math.random() * 10000)}`,
        tanker_id: formData.tanker_id,
        tanker_plate: tankers.find(t => t.tanker_id === formData.tanker_id)?.plate || 'N/A',
        driver_id: formData.driver_id,
        driver_name: 'Driver Name',
        source_station_id: 'station-central',
        source_station_name: 'Central Depot',
        destination_station_id: formData.destination_station_id,
        destination_station_name: stations.find(s => s.station_id === formData.destination_station_id)?.name || 'Unknown',
        fuel_type: formData.fuel_type as any,
        quantity_liters: parseInt(formData.quantity_liters),
        status: 'CREATED',
        created_at: new Date().toISOString(),
        expected_delivery_at: new Date(formData.expected_delivery_at).toISOString(),
        is_overdue: false,
      }

      addDispatch(newDispatch)
      router.push('/dispatch')
    } else {
      setStep(step + 1)
    }
  }

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1)
    }
  }

  const steps = [
    { number: 1, label: 'Select Station' },
    { number: 2, label: 'Select Tanker' },
    { number: 3, label: 'Fuel Type' },
    { number: 4, label: 'Quantity' },
    { number: 5, label: 'Driver' },
    { number: 6, label: 'Delivery Date' },
    { number: 7, label: 'Review' },
  ]

  return (
    <div className="p-6 space-y-6 flex flex-col items-center">
      {/* Header */}
      <div className="w-full max-w-2xl">
        <div className="flex items-center gap-3">
          <Link href="/dispatch" className="text-foreground-secondary hover:text-foreground">
            <ArrowLeft size={20} />
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-foreground">New Dispatch</h1>
            <p className="text-foreground-secondary">Create a new fuel dispatch</p>
          </div>
        </div>
      </div>

      {/* Progress Steps and Form Container */}
      <div className="w-full max-w-2xl space-y-6">
        <div className="card">
          <div className="flex items-center justify-between">
            {steps.map((s, idx) => (
              <div key={s.number} className="flex items-center flex-1">
                <div className={`
                  w-10 h-10 rounded-full flex items-center justify-center font-medium text-sm
                  ${step >= s.number
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-surface text-foreground-secondary'
                  }
                `}>
                  {s.number}
                </div>
                {idx < steps.length - 1 && (
                  <div className={`flex-1 h-1 mx-2 ${
                    step > s.number ? 'bg-primary' : 'bg-surface'
                  }`} />
                )}
              </div>
            ))}
          </div>
          <div className="mt-3 text-center">
            <p className="text-sm font-medium text-foreground">{steps[step - 1].label}</p>
            <p className="text-xs text-foreground-secondary">Step {step} of {totalSteps}</p>
          </div>
        </div>

        {/* Form Content */}
        <form onSubmit={handleSubmit} className="space-y-4">
        {step === 1 && (
          <div className="card space-y-3">
            <label className="block">
              <span className="text-sm font-medium text-foreground mb-2 block">Select Destination Station</span>
              <select
                value={formData.destination_station_id}
                onChange={(e) => setFormData({ ...formData, destination_station_id: e.target.value })}
                className="w-full px-3 py-2 border border-border rounded bg-background"
                required
              >
                <option value="">Choose a station...</option>
                {stations.map(s => (
                  <option key={s.station_id} value={s.station_id}>
                    {s.name} ({s.region})
                  </option>
                ))}
              </select>
            </label>
          </div>
        )}

        {step === 2 && (
          <div className="card space-y-3">
            <label className="block">
              <span className="text-sm font-medium text-foreground mb-2 block">Select Tanker</span>
              <select
                value={formData.tanker_id}
                onChange={(e) => setFormData({ ...formData, tanker_id: e.target.value })}
                className="w-full px-3 py-2 border border-border rounded bg-background"
                required
              >
                <option value="">Choose a tanker...</option>
                {tankers.filter(t => t.status === 'AVAILABLE').map(t => (
                  <option key={t.tanker_id} value={t.tanker_id}>
                    {t.plate} ({t.capacity_liters / 1000}K L capacity)
                  </option>
                ))}
              </select>
            </label>
          </div>
        )}

        {step === 3 && (
          <div className="card space-y-3">
            <label className="block">
              <span className="text-sm font-medium text-foreground mb-2 block">Fuel Type</span>
              <div className="space-y-2">
                {['DIESEL', 'BENZINE', 'KEROSENE'].map(fuel => (
                  <label key={fuel} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="fuel_type"
                      value={fuel}
                      checked={formData.fuel_type === fuel}
                      onChange={(e) => setFormData({ ...formData, fuel_type: e.target.value })}
                      className="w-4 h-4"
                    />
                    <span>{fuel}</span>
                  </label>
                ))}
              </div>
            </label>
          </div>
        )}

        {step === 4 && (
          <div className="card space-y-3">
            <label className="block">
              <span className="text-sm font-medium text-foreground mb-2 block">Quantity (Liters)</span>
              <input
                type="number"
                value={formData.quantity_liters}
                onChange={(e) => setFormData({ ...formData, quantity_liters: e.target.value })}
                className="w-full px-3 py-2 border border-border rounded bg-background"
                placeholder="e.g., 30000"
                required
              />
              <p className="text-xs text-foreground-secondary mt-1">
                Remaining quota: {quotaPeriod?.quotas_by_fuel[formData.fuel_type as any]?.remaining || 0} L
              </p>
            </label>
          </div>
        )}

        {step === 5 && (
          <div className="card space-y-3">
            <label className="block">
              <span className="text-sm font-medium text-foreground mb-2 block">Assign Driver</span>
              <select
                value={formData.driver_id}
                onChange={(e) => setFormData({ ...formData, driver_id: e.target.value })}
                className="w-full px-3 py-2 border border-border rounded bg-background"
                required
              >
                <option value="">Choose a driver...</option>
                <option value="driver-001">Kebede Tekle</option>
                <option value="driver-002">Girma Hailu</option>
                <option value="driver-003">Solomon Abebe</option>
              </select>
            </label>
          </div>
        )}

        {step === 6 && (
          <div className="card space-y-3">
            <label className="block">
              <span className="text-sm font-medium text-foreground mb-2 block">Expected Delivery Date & Time</span>
              <input
                type="datetime-local"
                value={formData.expected_delivery_at}
                onChange={(e) => setFormData({ ...formData, expected_delivery_at: e.target.value })}
                className="w-full px-3 py-2 border border-border rounded bg-background"
                required
              />
            </label>
          </div>
        )}

        {step === 7 && (
          <div className="card space-y-4">
            <h3 className="font-semibold text-foreground">Review Dispatch Details</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-foreground-secondary">Station:</span><span className="font-medium">{stations.find(s => s.station_id === formData.destination_station_id)?.name}</span></div>
              <div className="flex justify-between"><span className="text-foreground-secondary">Tanker:</span><span className="font-medium">{tankers.find(t => t.tanker_id === formData.tanker_id)?.plate}</span></div>
              <div className="flex justify-between"><span className="text-foreground-secondary">Fuel Type:</span><span className="font-medium">{formData.fuel_type}</span></div>
              <div className="flex justify-between"><span className="text-foreground-secondary">Quantity:</span><span className="font-medium">{formData.quantity_liters} L</span></div>
              <div className="flex justify-between"><span className="text-foreground-secondary">ETA:</span><span className="font-medium">{new Date(formData.expected_delivery_at).toLocaleString()}</span></div>
            </div>
          </div>
        )}

        {/* Buttons */}
        <div className="flex gap-3 justify-end">
          <button
            type="button"
            onClick={handleBack}
            disabled={step === 1}
            className="px-4 py-2 border border-border rounded hover:bg-surface disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            Back
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-primary text-primary-foreground rounded hover:opacity-90 transition"
          >
            {step === totalSteps ? 'Create Dispatch' : 'Next'}
          </button>
        </div>
        </form>
      </div>
    </div>
  )
}
