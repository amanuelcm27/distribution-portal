import {
  User, OmcProfile, QuotaPeriod, FuelQuota, Tanker, Driver, Dispatch,
  Station, LiftingSlot, PendingAction, StationAlert, FuelType, TankerStatus,
  DispatchStatus, QuotaHealthStatus, StockHealthStatus
} from '@/types';

const now = new Date();
const daysInMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
const daysRemaining = daysInMonth - now.getDate();

export const mockUser: User = {
  id: 'user-001',
  name: 'Abebe Kebede',
  email: 'abebe@addisspetroleum.et',
  role: 'FLEET_MANAGER',
  omc_id: 'omc-001',
  omc_name: 'Addis Petroleum Ltd',
};

export const mockOmcProfile: OmcProfile = {
  omc_id: 'omc-001',
  name: 'Addis Petroleum Ltd',
  license_number: 'APL-2024-001',
  license_expiry_date: '2026-12-31',
  regions: ['Addis Ababa', 'Amhara', 'Oromia'],
  fuel_types: ['DIESEL', 'BENZINE', 'KEROSENE'],
  assigned_depots: ['Addis Depot', 'Adama Depot', 'Bahirdar Depot'],
  station_count: 85,
  active_tanker_count: 12,
  compliance_status: 'compliant',
};

// Helper to determine quota health
function getQuotaHealth(remaining: number, allocated: number): QuotaHealthStatus {
  const percent = (remaining / allocated) * 100;
  if (percent > 50) return 'healthy';
  if (percent > 25) return 'moderate';
  if (percent > 0) return 'low';
  return 'exhausted';
}

function getStockHealth(current: number, capacity: number): StockHealthStatus {
  const percent = (current / capacity) * 100;
  if (percent > 50) return 'healthy';
  if (percent > 25) return 'low';
  return 'critical';
}

// Quotas
export const mockQuotaPeriod: QuotaPeriod = {
  period_id: 'period-2024-07',
  label: 'July 2024',
  start_date: '2024-07-01',
  end_date: '2024-07-31',
  days_remaining: daysRemaining,
  quotas_by_fuel: {
    DIESEL: {
      fuel_type: 'DIESEL',
      allocated: 500000,
      lifted: 280000,
      in_transit: 120000,
      delivered: 180000,
      remaining: 40000,
      health: 'low',
    },
    BENZINE: {
      fuel_type: 'BENZINE',
      allocated: 200000,
      lifted: 120000,
      in_transit: 50000,
      delivered: 80000,
      remaining: 30000,
      health: 'low',
    },
    KEROSENE: {
      fuel_type: 'KEROSENE',
      allocated: 100000,
      lifted: 60000,
      in_transit: 30000,
      delivered: 50000,
      remaining: 10000,
      health: 'exhausted',
    },
  },
};

// Fleet
export const mockTankers: Tanker[] = [
  {
    tanker_id: 'tanker-001',
    plate: 'APL-001',
    capacity_liters: 30000,
    status: 'AVAILABLE',
    current_location: { latitude: 9.0320, longitude: 38.7469 },
    last_update: new Date(now.getTime() - 5 * 60000).toISOString(),
  },
  {
    tanker_id: 'tanker-002',
    plate: 'APL-002',
    capacity_liters: 30000,
    status: 'IN_TRANSIT',
    driver_id: 'driver-001',
    driver_name: 'Kebede Tekle',
    fuel_type: 'DIESEL',
    current_load: 28000,
    current_location: { latitude: 9.1234, longitude: 38.8123 },
    last_update: new Date(now.getTime() - 2 * 60000).toISOString(),
  },
  {
    tanker_id: 'tanker-003',
    plate: 'APL-003',
    capacity_liters: 28000,
    status: 'AVAILABLE',
    last_update: new Date(now.getTime() - 10 * 60000).toISOString(),
  },
  {
    tanker_id: 'tanker-004',
    plate: 'APL-004',
    capacity_liters: 30000,
    status: 'LOADING',
    driver_id: 'driver-002',
    driver_name: 'Girma Hailu',
    fuel_type: 'BENZINE',
    current_load: 15000,
    last_update: new Date(now.getTime() - 1 * 60000).toISOString(),
  },
  {
    tanker_id: 'tanker-005',
    plate: 'APL-005',
    capacity_liters: 30000,
    status: 'AVAILABLE',
    last_update: new Date(now.getTime() - 15 * 60000).toISOString(),
  },
  {
    tanker_id: 'tanker-006',
    plate: 'APL-006',
    capacity_liters: 32000,
    status: 'IN_TRANSIT',
    driver_id: 'driver-003',
    driver_name: 'Solomon Abebe',
    fuel_type: 'KEROSENE',
    current_load: 30000,
    current_location: { latitude: 8.9876, longitude: 39.1234 },
    last_update: new Date(now.getTime() - 3 * 60000).toISOString(),
  },
  {
    tanker_id: 'tanker-007',
    plate: 'APL-007',
    capacity_liters: 30000,
    status: 'AVAILABLE',
    last_update: new Date(now.getTime() - 20 * 60000).toISOString(),
  },
  {
    tanker_id: 'tanker-008',
    plate: 'APL-008',
    capacity_liters: 28000,
    status: 'MAINTENANCE',
    maintenance_due: '2024-08-05',
    last_update: new Date(now.getTime() - 60 * 60000).toISOString(),
  },
  {
    tanker_id: 'tanker-009',
    plate: 'APL-009',
    capacity_liters: 30000,
    status: 'AVAILABLE',
    last_update: new Date(now.getTime() - 25 * 60000).toISOString(),
  },
  {
    tanker_id: 'tanker-010',
    plate: 'APL-010',
    capacity_liters: 30000,
    status: 'IN_TRANSIT',
    driver_id: 'driver-004',
    driver_name: 'Muleta Kassa',
    fuel_type: 'DIESEL',
    current_load: 29000,
    current_location: { latitude: 9.2345, longitude: 38.6543 },
    last_update: new Date(now.getTime() - 8 * 60000).toISOString(),
  },
  {
    tanker_id: 'tanker-011',
    plate: 'APL-011',
    capacity_liters: 30000,
    status: 'AVAILABLE',
    last_update: new Date(now.getTime() - 30 * 60000).toISOString(),
  },
  {
    tanker_id: 'tanker-012',
    plate: 'APL-012',
    capacity_liters: 30000,
    status: 'LOADING',
    driver_id: 'driver-005',
    driver_name: 'Tadesse Mengistu',
    fuel_type: 'DIESEL',
    current_load: 12000,
    last_update: new Date(now.getTime() - 4 * 60000).toISOString(),
  },
];

// Drivers
export const mockDrivers: Driver[] = [
  { driver_id: 'driver-001', name: 'Kebede Tekle', license_number: 'DL-2024-001', license_expiry: '2026-03-15', phone: '+251-911-234567', status: 'active' },
  { driver_id: 'driver-002', name: 'Girma Hailu', license_number: 'DL-2024-002', license_expiry: '2025-09-20', phone: '+251-911-234568', status: 'active' },
  { driver_id: 'driver-003', name: 'Solomon Abebe', license_number: 'DL-2024-003', license_expiry: '2026-07-10', phone: '+251-911-234569', status: 'active' },
  { driver_id: 'driver-004', name: 'Muleta Kassa', license_number: 'DL-2024-004', license_expiry: '2025-12-05', phone: '+251-911-234570', status: 'active' },
  { driver_id: 'driver-005', name: 'Tadesse Mengistu', license_number: 'DL-2024-005', license_expiry: '2026-05-30', phone: '+251-911-234571', status: 'active' },
  { driver_id: 'driver-006', name: 'Yohannes Tebebe', license_number: 'DL-2024-006', license_expiry: '2024-08-15', phone: '+251-911-234572', status: 'suspended' },
];

// Dispatches
export const mockDispatches: Dispatch[] = [
  {
    dispatch_id: 'disp-001',
    dispatch_number: 'DSP-2024-001',
    tanker_id: 'tanker-002',
    tanker_plate: 'APL-002',
    driver_id: 'driver-001',
    driver_name: 'Kebede Tekle',
    source_station_id: 'station-central',
    source_station_name: 'Central Depot',
    destination_station_id: 'station-001',
    destination_station_name: 'Bole Station',
    fuel_type: 'DIESEL',
    quantity_liters: 28000,
    status: 'IN_TRANSIT',
    created_at: new Date(now.getTime() - 2 * 3600000).toISOString(),
    expected_delivery_at: new Date(now.getTime() + 1 * 3600000).toISOString(),
    is_overdue: false,
    latitude: 9.1234,
    longitude: 38.8123,
  },
  {
    dispatch_id: 'disp-002',
    dispatch_number: 'DSP-2024-002',
    tanker_id: 'tanker-006',
    tanker_plate: 'APL-006',
    driver_id: 'driver-003',
    driver_name: 'Solomon Abebe',
    source_station_id: 'station-central',
    source_station_name: 'Central Depot',
    destination_station_id: 'station-015',
    destination_station_name: 'Pante Station',
    fuel_type: 'KEROSENE',
    quantity_liters: 30000,
    status: 'IN_TRANSIT',
    created_at: new Date(now.getTime() - 4 * 3600000).toISOString(),
    expected_delivery_at: new Date(now.getTime() + 2 * 3600000).toISOString(),
    is_overdue: false,
    latitude: 8.9876,
    longitude: 39.1234,
  },
  {
    dispatch_id: 'disp-003',
    dispatch_number: 'DSP-2024-003',
    tanker_id: 'tanker-010',
    tanker_plate: 'APL-010',
    driver_id: 'driver-004',
    driver_name: 'Muleta Kassa',
    source_station_id: 'station-central',
    source_station_name: 'Central Depot',
    destination_station_id: 'station-025',
    destination_station_name: 'Nefas Silk Station',
    fuel_type: 'DIESEL',
    quantity_liters: 29000,
    status: 'ARRIVED',
    created_at: new Date(now.getTime() - 6 * 3600000).toISOString(),
    expected_delivery_at: new Date(now.getTime() - 30 * 60000).toISOString(),
    actual_delivery_at: new Date(now.getTime() - 20 * 60000).toISOString(),
    is_overdue: false,
  },
  {
    dispatch_id: 'disp-004',
    dispatch_number: 'DSP-2024-004',
    tanker_id: 'tanker-001',
    tanker_plate: 'APL-001',
    driver_id: 'driver-005',
    driver_name: 'Tadesse Mengistu',
    source_station_id: 'station-central',
    source_station_name: 'Central Depot',
    destination_station_id: 'station-030',
    destination_station_name: 'Megenagna Station',
    fuel_type: 'BENZINE',
    quantity_liters: 25000,
    status: 'CREATED',
    created_at: new Date(now.getTime() - 1 * 3600000).toISOString(),
    expected_delivery_at: new Date(now.getTime() + 4 * 3600000).toISOString(),
    is_overdue: false,
  },
  {
    dispatch_id: 'disp-005',
    dispatch_number: 'DSP-2024-005',
    tanker_id: 'tanker-003',
    tanker_plate: 'APL-003',
    driver_id: 'driver-002',
    driver_name: 'Girma Hailu',
    source_station_id: 'station-central',
    source_station_name: 'Central Depot',
    destination_station_id: 'station-040',
    destination_station_name: 'Addis Ketema Station',
    fuel_type: 'KEROSENE',
    quantity_liters: 18000,
    status: 'OVERDUE',
    created_at: new Date(now.getTime() - 24 * 3600000).toISOString(),
    expected_delivery_at: new Date(now.getTime() - 5 * 3600000).toISOString(),
    is_overdue: true,
  },
];

// Stations (first 10)
export const mockStations: Station[] = [
  {
    station_id: 'station-001',
    name: 'Bole Station',
    region: 'Addis Ababa',
    address: 'Bole Road',
    latitude: 9.0567,
    longitude: 38.7890,
    stocks: {
      DIESEL: { fuel_type: 'DIESEL', current_liters: 15000, capacity_liters: 50000, health: 'low' },
      BENZINE: { fuel_type: 'BENZINE', current_liters: 8000, capacity_liters: 30000, health: 'critical' },
      KEROSENE: { fuel_type: 'KEROSENE', current_liters: 5000, capacity_liters: 20000, health: 'critical' },
    },
    last_replenish_at: new Date(now.getTime() - 5 * 3600000).toISOString(),
    manager_name: 'Almaz Deressa',
    phone: '+251-911-111111',
  },
  {
    station_id: 'station-015',
    name: 'Pante Station',
    region: 'Addis Ababa',
    address: 'Pante Giorgis',
    latitude: 9.0234,
    longitude: 38.8901,
    stocks: {
      DIESEL: { fuel_type: 'DIESEL', current_liters: 35000, capacity_liters: 50000, health: 'healthy' },
      BENZINE: { fuel_type: 'BENZINE', current_liters: 18000, capacity_liters: 30000, health: 'healthy' },
      KEROSENE: { fuel_type: 'KEROSENE', current_liters: 12000, capacity_liters: 20000, health: 'healthy' },
    },
    last_replenish_at: new Date(now.getTime() - 2 * 3600000).toISOString(),
  },
  {
    station_id: 'station-025',
    name: 'Nefas Silk Station',
    region: 'Addis Ababa',
    address: 'Nefas Silk Area',
    latitude: 9.0890,
    longitude: 38.7654,
    stocks: {
      DIESEL: { fuel_type: 'DIESEL', current_liters: 3000, capacity_liters: 50000, health: 'critical' },
      BENZINE: { fuel_type: 'BENZINE', current_liters: 2000, capacity_liters: 30000, health: 'critical' },
      KEROSENE: { fuel_type: 'KEROSENE', current_liters: 1500, capacity_liters: 20000, health: 'critical' },
    },
    last_replenish_at: new Date(now.getTime() - 48 * 3600000).toISOString(),
  },
  {
    station_id: 'station-030',
    name: 'Megenagna Station',
    region: 'Addis Ababa',
    address: 'Megenagna Road',
    latitude: 9.0345,
    longitude: 38.8234,
    stocks: {
      DIESEL: { fuel_type: 'DIESEL', current_liters: 28000, capacity_liters: 50000, health: 'moderate' },
      BENZINE: { fuel_type: 'BENZINE', current_liters: 12000, capacity_liters: 30000, health: 'moderate' },
      KEROSENE: { fuel_type: 'KEROSENE', current_liters: 8000, capacity_liters: 20000, health: 'moderate' },
    },
    last_replenish_at: new Date(now.getTime() - 8 * 3600000).toISOString(),
  },
  {
    station_id: 'station-040',
    name: 'Addis Ketema Station',
    region: 'Addis Ababa',
    address: 'Addis Ketema Square',
    latitude: 9.0456,
    longitude: 38.7890,
    stocks: {
      DIESEL: { fuel_type: 'DIESEL', current_liters: 42000, capacity_liters: 50000, health: 'healthy' },
      BENZINE: { fuel_type: 'BENZINE', current_liters: 24000, capacity_liters: 30000, health: 'healthy' },
      KEROSENE: { fuel_type: 'KEROSENE', current_liters: 16000, capacity_liters: 20000, health: 'healthy' },
    },
    last_replenish_at: new Date(now.getTime() - 3 * 3600000).toISOString(),
  },
];

// Lifting Slots
export const mockLiftingSlots: LiftingSlot[] = [
  {
    slot_id: 'slot-001',
    depot_name: 'Addis Depot',
    depot_id: 'depot-001',
    fuel_type: 'DIESEL',
    volume_liters: 30000,
    scheduled_date: new Date(now.getTime() + 1 * 24 * 3600000).toISOString().split('T')[0],
    time_window_start: '08:00',
    time_window_end: '12:00',
    status: 'SCHEDULED',
  },
  {
    slot_id: 'slot-002',
    depot_name: 'Addis Depot',
    depot_id: 'depot-001',
    fuel_type: 'BENZINE',
    volume_liters: 20000,
    scheduled_date: new Date(now.getTime() + 2 * 24 * 3600000).toISOString().split('T')[0],
    time_window_start: '13:00',
    time_window_end: '17:00',
    status: 'ASSIGNED',
    assigned_tanker_id: 'tanker-004',
    assigned_driver_id: 'driver-002',
  },
  {
    slot_id: 'slot-003',
    depot_name: 'Adama Depot',
    depot_id: 'depot-002',
    fuel_type: 'KEROSENE',
    volume_liters: 25000,
    scheduled_date: new Date(now.getTime() + 3 * 24 * 3600000).toISOString().split('T')[0],
    time_window_start: '08:00',
    time_window_end: '14:00',
    status: 'SCHEDULED',
  },
];

// Pending Actions
export const mockPendingActions: PendingAction[] = [
  {
    action_id: 'action-001',
    action_type: 'confirm_delivery',
    title: 'Confirm Delivery - Nefas Silk',
    description: 'DIESEL delivery arrived at 09:15. Confirm to complete transaction.',
    priority: 'high',
    related_id: 'disp-003',
    created_at: new Date(now.getTime() - 20 * 60000).toISOString(),
  },
  {
    action_id: 'action-002',
    action_type: 'critical_station',
    title: 'Critical Stock - Nefas Silk Station',
    description: 'DIESEL stock critical (3% remaining). Immediate dispatch needed.',
    priority: 'critical',
    related_id: 'station-025',
    created_at: new Date(now.getTime() - 45 * 60000).toISOString(),
  },
  {
    action_id: 'action-003',
    action_type: 'critical_station',
    title: 'Critical Stock - Bole Station',
    description: 'BENZINE stock critical (27% remaining). Dispatch recommended.',
    priority: 'critical',
    related_id: 'station-001',
    created_at: new Date(now.getTime() - 60 * 60000).toISOString(),
  },
  {
    action_id: 'action-004',
    action_type: 'overdue_dispatch',
    title: 'Overdue Dispatch',
    description: 'APL-003 was expected 5 hours ago. Check status.',
    priority: 'high',
    related_id: 'disp-005',
    created_at: new Date(now.getTime() - 5 * 3600000).toISOString(),
  },
  {
    action_id: 'action-005',
    action_type: 'expiring_quota',
    title: 'Low KEROSENE Quota',
    description: 'KEROSENE quota almost exhausted (10% remaining).',
    priority: 'high',
    created_at: new Date(now.getTime() - 12 * 3600000).toISOString(),
  },
];

// Station Alerts
export const mockStationAlerts: StationAlert[] = [
  {
    alert_id: 'alert-001',
    station_id: 'station-025',
    station_name: 'Nefas Silk Station',
    severity: 'critical',
    fuel_type: 'DIESEL',
    current_liters: 3000,
    capacity_liters: 50000,
    message: 'Critical DIESEL stock: 6% remaining. Dispatch immediately.',
    created_at: new Date(now.getTime() - 30 * 60000).toISOString(),
  },
  {
    alert_id: 'alert-002',
    station_id: 'station-001',
    station_name: 'Bole Station',
    severity: 'critical',
    fuel_type: 'BENZINE',
    current_liters: 8000,
    capacity_liters: 30000,
    message: 'Critical BENZINE stock: 27% remaining. Urgent dispatch needed.',
    created_at: new Date(now.getTime() - 45 * 60000).toISOString(),
  },
];

// Summary data
export function getFleetSummary() {
  return {
    total_tankers: mockTankers.length,
    available: mockTankers.filter(t => t.status === 'AVAILABLE').length,
    in_transit: mockTankers.filter(t => t.status === 'IN_TRANSIT').length,
    loading: mockTankers.filter(t => t.status === 'LOADING').length,
    maintenance: mockTankers.filter(t => t.status === 'MAINTENANCE').length,
  };
}

export function getActiveDispatches() {
  return mockDispatches.filter(d => ['CREATED', 'APPROVED', 'LOADED', 'IN_TRANSIT', 'ARRIVED'].includes(d.status));
}
