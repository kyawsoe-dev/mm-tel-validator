/**
 * Operator brand information with visual styling
 */
export interface OperatorBrand {
  name: string;
  label: string;
  color: string;
  gradient: string;
  icon: string;
}

/**
 * Network type enumeration
 */
export type NetworkType = 
  | 'GSM'
  | 'WCDMA'
  | 'CDMA 450 MHz'
  | 'CDMA 800 MHz'
  | 'Unknown';

/**
 * Operator name enumeration
 */
export type OperatorName =
  | 'Ooredoo'
  | 'Telenor'
  | 'MPT'
  | 'MEC'
  | 'MyTel'
  | 'Unknown';

/**
 * Validation result for a phone number
 */
export interface ValidationResult {
  isValid: boolean;
  phoneNumber: string;
  operator?: OperatorName;
  operatorLabel?: string;
  operatorColor?: string;
  operatorIcon?: string;
  networkType?: NetworkType;
}

/**
 * Constants for all operators
 */
export const OPERATORS: Record<string, OperatorBrand> = {
  OOREDOO: {
    name: 'Ooredoo',
    label: 'U9',
    color: '#e11d48',
    gradient: 'linear-gradient(135deg, #e11d48 0%, #be123c 100%)',
    icon: '🔴'
  },
  TELENOR: {
    name: 'Telenor',
    label: 'Telenor',
    color: '#0ea5e9',
    gradient: 'linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)',
    icon: '🔵'
  },
  MPT: {
    name: 'MPT',
    label: 'MPT',
    color: '#f59e0b',
    gradient: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
    icon: '🟡'
  },
  MEC: {
    name: 'MEC',
    label: 'MEC',
    color: '#22c55e',
    gradient: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
    icon: '🟢'
  },
  MYTEL: {
    name: 'MyTel',
    label: 'MyTel',
    color: '#7c3aed',
    gradient: 'linear-gradient(135deg, #7c3aed 0%, #6d28d9 100%)',
    icon: '🟣'
  },
  UNKNOWN: {
    name: 'Unknown',
    label: 'Unknown',
    color: '#6b7280',
    gradient: 'linear-gradient(135deg, #9ca3af 0%, #6b7280 100%)',
    icon: '⚪'
  }
};

/**
 * Network type constants
 */
export const NETWORK_TYPE: Record<string, NetworkType> = {
  GSM: 'GSM',
  WCDMA: 'WCDMA',
  CDMA_450: 'CDMA 450 MHz',
  CDMA_800: 'CDMA 800 MHz',
  UNKNOWN: 'Unknown'
};
