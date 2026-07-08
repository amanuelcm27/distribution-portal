// Auth & User
export type UserRole = 'OMC_ADMIN' | 'FLEET_MANAGER' | 'LOGISTICS_COORDINATOR' | 'STATION_SUPERVISOR' | 'FINANCE_OFFICER';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  omc_id: string;
  omc_name: string;
  avatar_url?: string;
}

// Fuel Types
export type FuelType = 'DIESEL' | 'BENZINE' | 'KEROSENE';

// Quotas
export type QuotaHealthStatus = 'healthy' | 'moderate' | 'low' | 'exhausted';

export interface FuelQuota {
  fuel_type: FuelType;
  allocated: number;
  lifted: number;
  in_transit: number;
  delivered: number;
  remaining: number;
  health: QuotaHealthStatus;
}

export interface QuotaPeriod {
  period_id: string;
  label: string;
  start_date: string;
  end_date: string;
  days_remaining: number;
  quotas_by_fuel: Record<FuelType, FuelQuota>;
}

// Fleet
export type TankerStatus = 'AVAILABLE' | 'IN_TRANSIT' | 'LOADING' | 'MAINTENANCE';

export interface Tanker {
  tanker_id: string;
  plate: string;
  capacity_liters: number;
  status: TankerStatus;
  current_location?: { latitude: number; longitude: number };
  driver_id?: string;
  driver_name?: string;
  fuel_type?: FuelType;
  current_load?: number;
  last_update: string;
  maintenance_due?: string;
}

export interface Driver {
  driver_id: string;
  name: string;
  license_number: string;
  license_expiry: string;
  phone: string;
  assigned_tanker?: string;
  status: 'active' | 'suspended';
}

// Dispatch
export type DispatchStatus = 'CREATED' | 'APPROVED' | 'LOADED' | 'IN_TRANSIT' | 'ARRIVED' | 'VERIFIED' | 'CLOSED' | 'CANCELLED';

export interface Dispatch {
  dispatch_id: string;
  dispatch_number: string;
  tanker_id: string;
  tanker_plate: string;
  driver_id: string;
  driver_name: string;
  source_station_id: string;
  source_station_name: string;
  destination_station_id: string;
  destination_station_name: string;
  fuel_type: FuelType;
  quantity_liters: number;
  status: DispatchStatus;
  created_at: string;
  expected_delivery_at: string;
  actual_delivery_at?: string;
  is_overdue: boolean;
  latitude?: number;
  longitude?: number;
}

// Stations
export type StockHealthStatus = 'healthy' | 'low' | 'critical';

export interface StationStock {
  fuel_type: FuelType;
  current_liters: number;
  capacity_liters: number;
  health: StockHealthStatus;
}

export interface Station {
  station_id: string;
  name: string;
  region: string;
  address: string;
  latitude: number;
  longitude: number;
  stocks: Record<FuelType, StationStock>;
  last_replenish_at: string;
  manager_name?: string;
  phone?: string;
}

// Lifting Slots
export type LiftingSlotStatus = 'SCHEDULED' | 'ASSIGNED' | 'COMPLETED' | 'CANCELLED';

export interface LiftingSlot {
  slot_id: string;
  depot_name: string;
  depot_id: string;
  fuel_type: FuelType;
  volume_liters: number;
  scheduled_date: string;
  time_window_start: string;
  time_window_end: string;
  status: LiftingSlotStatus;
  assigned_tanker_id?: string;
  assigned_driver_id?: string;
  actual_liters_lifted?: number;
  completed_at?: string;
}

// OMC Profile
export interface OmcProfile {
  omc_id: string;
  name: string;
  license_number: string;
  license_expiry_date: string;
  regions: string[];
  fuel_types: FuelType[];
  assigned_depots: string[];
  station_count: number;
  active_tanker_count: number;
  compliance_status: 'compliant' | 'warning' | 'violation';
}

// Action Queue
export type PendingActionType = 'confirm_delivery' | 'assign_tanker' | 'critical_station' | 'overdue_dispatch' | 'expiring_quota';

export interface PendingAction {
  action_id: string;
  action_type: PendingActionType;
  title: string;
  description: string;
  priority: 'critical' | 'high' | 'medium' | 'low';
  related_id?: string;
  created_at: string;
  expires_at?: string;
}

// Station Alert
export interface StationAlert {
  alert_id: string;
  station_id: string;
  station_name: string;
  severity: 'critical' | 'warning';
  fuel_type: FuelType;
  current_liters: number;
  capacity_liters: number;
  message: string;
  created_at: string;
}

// Regional Stats
export interface RegionalQuotaStats {
  region: string;
  fuel_type: FuelType;
  allocated: number;
  delivered: number;
  remaining: number;
  station_count: number;
  utilization_percent: number;
}

// Compliance Report
export interface ComplianceReport {
  report_id: string;
  period_label: string;
  total_allocated: number;
  total_lifted: number;
  total_delivered: number;
  unused: number;
  utilization_percent: number;
  violations: string[];
  created_at: string;
}
