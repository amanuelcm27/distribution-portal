import { create } from 'zustand'
import { User, OmcProfile, QuotaPeriod, Tanker, Station, Dispatch, PendingAction, StationAlert } from '@/types'
import {
  mockUser, mockOmcProfile, mockQuotaPeriod, mockTankers, mockStations,
  mockDispatches, mockPendingActions, mockStationAlerts, getFleetSummary, getActiveDispatches
} from '@/lib/mockData'

export interface OmcStore {
  // Auth
  user: User | null
  setUser: (user: User) => void
  
  // OMC Profile
  omcProfile: OmcProfile | null
  setOmcProfile: (profile: OmcProfile) => void
  
  // Quotas
  quotaPeriod: QuotaPeriod | null
  setQuotaPeriod: (period: QuotaPeriod) => void
  
  // Fleet
  tankers: Tanker[]
  setTankers: (tankers: Tanker[]) => void
  updateTanker: (tanker: Tanker) => void
  
  // Stations
  stations: Station[]
  setStations: (stations: Station[]) => void
  updateStation: (station: Station) => void
  
  // Dispatches
  dispatches: Dispatch[]
  setDispatches: (dispatches: Dispatch[]) => void
  addDispatch: (dispatch: Dispatch) => void
  updateDispatch: (dispatch: Dispatch) => void
  
  // Pending Actions
  pendingActions: PendingAction[]
  setPendingActions: (actions: PendingAction[]) => void
  removePendingAction: (actionId: string) => void
  
  // Station Alerts
  stationAlerts: StationAlert[]
  setStationAlerts: (alerts: StationAlert[]) => void
  
  // UI State
  sidebarOpen: boolean
  setSidebarOpen: (open: boolean) => void
  
  selectedDispatchId: string | null
  setSelectedDispatchId: (id: string | null) => void
  
  selectedStationId: string | null
  setSelectedStationId: (id: string | null) => void
  
  language: 'en' | 'am'
  setLanguage: (lang: 'en' | 'am') => void
  
  // Summary methods
  getFleetSummary: () => any
  getActiveDispatches: () => Dispatch[]
}

export const useOmcStore = create<OmcStore>((set, get) => ({
  // Auth
  user: mockUser,
  setUser: (user) => set({ user }),
  
  // OMC Profile
  omcProfile: mockOmcProfile,
  setOmcProfile: (profile) => set({ omcProfile: profile }),
  
  // Quotas
  quotaPeriod: mockQuotaPeriod,
  setQuotaPeriod: (period) => set({ quotaPeriod: period }),
  
  // Fleet
  tankers: mockTankers,
  setTankers: (tankers) => set({ tankers }),
  updateTanker: (tanker) => {
    const current = get().tankers
    set({ tankers: current.map(t => t.tanker_id === tanker.tanker_id ? tanker : t) })
  },
  
  // Stations
  stations: mockStations,
  setStations: (stations) => set({ stations }),
  updateStation: (station) => {
    const current = get().stations
    set({ stations: current.map(s => s.station_id === station.station_id ? station : s) })
  },
  
  // Dispatches
  dispatches: mockDispatches,
  setDispatches: (dispatches) => set({ dispatches }),
  addDispatch: (dispatch) => {
    const current = get().dispatches
    set({ dispatches: [dispatch, ...current] })
  },
  updateDispatch: (dispatch) => {
    const current = get().dispatches
    set({ dispatches: current.map(d => d.dispatch_id === dispatch.dispatch_id ? dispatch : d) })
  },
  
  // Pending Actions
  pendingActions: mockPendingActions,
  setPendingActions: (actions) => set({ pendingActions: actions }),
  removePendingAction: (actionId) => {
    const current = get().pendingActions
    set({ pendingActions: current.filter(a => a.action_id !== actionId) })
  },
  
  // Station Alerts
  stationAlerts: mockStationAlerts,
  setStationAlerts: (alerts) => set({ stationAlerts: alerts }),
  
  // UI State
  sidebarOpen: true,
  setSidebarOpen: (open) => set({ sidebarOpen: open }),
  
  selectedDispatchId: null,
  setSelectedDispatchId: (id) => set({ selectedDispatchId: id }),
  
  selectedStationId: null,
  setSelectedStationId: (id) => set({ selectedStationId: id }),
  
  language: 'en',
  setLanguage: (lang) => set({ language: lang }),
  
  // Summary methods
  getFleetSummary: () => getFleetSummary(),
  getActiveDispatches: () => getActiveDispatches(),
}))
