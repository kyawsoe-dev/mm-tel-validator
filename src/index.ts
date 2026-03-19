/**
 * mm-tel-validator
 * Myanmar phone number validator with operator detection and network type identification
 */

export {
  validatePhoneNumber,
  isValidMMPhoneNumber,
  getTelecomName,
  getPhoneNetworkType,
  normalizeInput,
  sanitizeInput,
  getOperatorConfig,
  validateMultiple
} from './validator';

export {
  OPERATORS,
  NETWORK_TYPE
} from './types';

export type {
  ValidationResult,
  OperatorBrand,
  OperatorName,
  NetworkType,
  BatchValidationResult
} from './types';
