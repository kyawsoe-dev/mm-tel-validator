import { OPERATORS, NETWORK_TYPE, OperatorName, NetworkType, ValidationResult } from './types';

// Myanmar digits Unicode: U+1040 to U+1049 (၀ to ၉)
const myanmarNumbers: Record<string, number> = {};
for (let i = 0; i <= 9; i++) {
  myanmarNumbers[String.fromCharCode(0x1040 + i)] = i;
}

const OPERATOR_REGEX: Record<string, RegExp> = {
  ooredoo: /^(09|\+?959)9([4-9])\d{7}$/,
  telenor: /^(09|\+?959)7([4-9])\d{7}$/,
  mytel: /^(09|\+?959)6([5-9])\d{7}$/,
  mpt: /^(09|\+?959)(5\d{6}|4\d{7,8}|2\d{6,8}|6\d{6}|8\d{6}|7\d{7}|9(0|1|9)\d{5,6}|2[0-4]\d{5}|5[0-6]\d{5}|8[13-7]\d{5}|4[1379]\d{6}|73\d{6}|91\d{6}|25\d{7}|26[0-5]\d{6}|40[0-4]\d{6}|42\d{7}|45\d{7}|89[6789]\d{6}|)$/,
  mec: /^(09|\+?959)(3\d{7,8}|3[0-369]\d{6}|34\d{7})/
};

/**
 * Get operator configuration by operator name
 * @param operatorName - Name of the operator
 * @returns Operator brand configuration
 */
export function getOperatorConfig(operatorName: string): typeof OPERATORS[keyof typeof OPERATORS] {
  switch (operatorName) {
    case 'Ooredoo': return OPERATORS.OOREDOO;
    case 'Telenor': return OPERATORS.TELENOR;
    case 'MPT': return OPERATORS.MPT;
    case 'MEC': return OPERATORS.MEC;
    case 'MyTel': return OPERATORS.MYTEL;
    default: return OPERATORS.UNKNOWN;
  }
}

/**
 * Sanitize phone number by removing spaces, dashes, and fixing double country codes
 * @param phoneNumber - Raw phone number input
 * @returns Sanitized phone number
 * @throws Error if phone number is empty or not provided
 */
export function sanitizeInput(phoneNumber: string): string {
  if (!phoneNumber) {
    throw new Error('Please include phoneNumber parameter.');
  }

  phoneNumber = phoneNumber.trim();

  if (phoneNumber.length === 0) {
    throw new Error('Phone number is empty.');
  }

  phoneNumber = phoneNumber.replace(/[- )(]/g, '');

  const countryCodeRe = /^\+?950?9[\d\u1040-\u1049]+$/;

  if (countryCodeRe.test(phoneNumber)) {
    const doubleCountryCodeRe = /^\+?95950?9[\d\u1040-\u1049]{7,9}$/;
    if (doubleCountryCodeRe.test(phoneNumber)) {
      phoneNumber = phoneNumber.replace(/9595/, '95');
    }
    const zeroBeforeAreaCodeRe = /^\+?9509[\d\u1040-\u1049]{7,9}$/;
    if (zeroBeforeAreaCodeRe.test(phoneNumber)) {
      phoneNumber = phoneNumber.replace(/9509/, '959');
    }
  }
  return phoneNumber;
}

/**
 * Normalize phone number by converting Myanmar numerals and standardizing format
 * @param phoneNumber - Raw phone number input
 * @returns Normalized phone number
 */
export function normalizeInput(phoneNumber: string): string {
  const sanitizedNumber = sanitizeInput(phoneNumber);
  const possibleCases = /^((09-)|(\+959)|(09\s)|(959)|(09\.))/;
  const possibleCasesGlobal = /((09-)|(\+959)|(09\s)|(959)|(09\.))/g;

  let convertedNumber = sanitizedNumber;
  if (/[၀-၉]/.test(sanitizedNumber)) {
    convertedNumber = sanitizedNumber
      .split('')
      .map((num) => {
        return myanmarNumbers[num] !== undefined ? myanmarNumbers[num] : num;
      })
      .join('');
  }

  if (possibleCases.test(convertedNumber)) {
    return convertedNumber.replace(possibleCasesGlobal, '09');
  }

  return convertedNumber;
}

/**
 * Validate Myanmar phone number format
 * @param phoneNumber - Phone number to validate
 * @returns true if valid Myanmar phone number format
 */
export function isValidMMPhoneNumber(phoneNumber: string): boolean {
  phoneNumber = normalizeInput(phoneNumber);
  const myanmarPhoneRe = /^(09|\+?950?9|\+?95950?9)\d{7,9}$/;
  return myanmarPhoneRe.test(phoneNumber);
}

/**
 * Get telecom operator name for a phone number
 * @param phoneNumber - Phone number to check
 * @returns Operator name or 'Unknown'
 */
export function getTelecomName(phoneNumber: string): OperatorName {
  let operatorName: OperatorName = 'Unknown';

  if (phoneNumber && isValidMMPhoneNumber(phoneNumber)) {
    phoneNumber = normalizeInput(phoneNumber);
    if (OPERATOR_REGEX.ooredoo.test(phoneNumber)) {
      operatorName = 'Ooredoo';
    } else if (OPERATOR_REGEX.telenor.test(phoneNumber)) {
      operatorName = 'Telenor';
    } else if (OPERATOR_REGEX.mpt.test(phoneNumber)) {
      operatorName = 'MPT';
    } else if (OPERATOR_REGEX.mec.test(phoneNumber)) {
      operatorName = 'MEC';
    } else if (OPERATOR_REGEX.mytel.test(phoneNumber)) {
      operatorName = 'MyTel';
    }
  }
  return operatorName;
}

/**
 * Get network type for a phone number
 * @param phoneNumber - Phone number to check
 * @returns Network type
 */
export function getPhoneNetworkType(phoneNumber: string): NetworkType {
  let networkType: NetworkType = NETWORK_TYPE.UNKNOWN;

  if (phoneNumber && isValidMMPhoneNumber(phoneNumber)) {
    phoneNumber = normalizeInput(phoneNumber);
    if (
      OPERATOR_REGEX.ooredoo.test(phoneNumber) ||
      OPERATOR_REGEX.telenor.test(phoneNumber) ||
      OPERATOR_REGEX.mytel.test(phoneNumber)
    ) {
      networkType = NETWORK_TYPE.GSM;
    } else if (
      OPERATOR_REGEX.mpt.test(phoneNumber) ||
      OPERATOR_REGEX.mec.test(phoneNumber)
    ) {
      const wcdmaRe = /^(09|\+?959)(55\d{5}|25[2-4]\d{6}|26\d{7}|4(4|5|6)\d{7})$/;
      const cdma450Re = /^(09|\+?959)(8\d{6}|6\d{6}|49\d{6})$/;
      const cdma800Re = /^(09|\+?959)(3\d{7}|73\d{6}|91\d{6})$/;

      if (wcdmaRe.test(phoneNumber)) {
        networkType = NETWORK_TYPE.WCDMA;
      } else if (cdma450Re.test(phoneNumber)) {
        networkType = NETWORK_TYPE.CDMA_450;
      } else if (cdma800Re.test(phoneNumber)) {
        networkType = NETWORK_TYPE.CDMA_800;
      } else {
        networkType = NETWORK_TYPE.GSM;
      }
    }
  }
  return networkType;
}

/**
 * Complete phone number validation with all details
 * @param phoneNumber - Phone number to validate
 * @returns Validation result with operator, network type, and brand information
 */
export function validatePhoneNumber(phoneNumber: string): ValidationResult {
  const isValid = isValidMMPhoneNumber(phoneNumber);
  const normalizedNumber = isValid ? normalizeInput(phoneNumber) : phoneNumber;
  const operatorName = isValid ? getTelecomName(phoneNumber) : undefined;
  const operatorConfig = operatorName ? getOperatorConfig(operatorName) : OPERATORS.UNKNOWN;

  return {
    isValid,
    phoneNumber: normalizedNumber,
    operator: operatorName,
    operatorLabel: operatorConfig.label,
    operatorColor: operatorConfig.color,
    operatorIcon: operatorConfig.icon,
    networkType: isValid ? getPhoneNetworkType(phoneNumber) : undefined
  };
}

/**
 * Result of batch phone number validation
 */
export interface BatchValidationResult {
  total: number;
  valid: number;
  invalid: number;
  results: Array<ValidationResult & { original: string }>;
}

/**
 * Validate multiple phone numbers at once
 * @param phoneNumbers - Array of phone numbers to validate
 * @returns Batch validation result with summary and individual results
 */
export function validateMultiple(phoneNumbers: string[]): BatchValidationResult {
  if (!Array.isArray(phoneNumbers)) {
    throw new Error('Input must be an array of phone numbers.');
  }

  const results: Array<ValidationResult & { original: string }> = phoneNumbers.map((phone) => {
    const validation = validatePhoneNumber(phone);
    return {
      ...validation,
      original: phone
    };
  });

  const validCount = results.filter((r) => r.isValid).length;

  return {
    total: phoneNumbers.length,
    valid: validCount,
    invalid: phoneNumbers.length - validCount,
    results
  };
}
