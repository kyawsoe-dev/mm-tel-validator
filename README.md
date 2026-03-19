# mm-tel-validator

Myanmar phone number validator with operator detection, network type identification, and brand information. Supports both JavaScript and TypeScript.

## Live Demo

Try it online: [https://mm-phone-number-check.vercel.app](https://mm-phone-number-check.vercel.app)

## Features

- **Real-time Validation** - Validate Myanmar phone numbers instantly
- **Operator Detection** - Identify telecom operators (Ooredoo, Telenor, MPT, MyTel, MEC)
- **Network Type Detection** - Determine network type (GSM, WCDMA, CDMA 450 MHz, CDMA 800 MHz)
- **Myanmar Numeral Support** - Accepts both Arabic (0-9) and Myanmar (၀-၉) numerals
- **Multiple Format Support** - Handles local (09...), international (+959...), and various formats
- **Operator Brand Info** - Get operator colors, labels, and icons for UI styling
- **TypeScript Support** - Full TypeScript types included
- **Dual Module Format** - Supports both CommonJS and ESM

## Installation

```bash
npm install mm-tel-validator
```

## Usage

### JavaScript (CommonJS)

```javascript
const {
  validatePhoneNumber,
  isValidMMPhoneNumber,
  getTelecomName,
  getPhoneNetworkType,
  OPERATORS
} = require('mm-tel-validator');

// Validate a phone number
const result = validatePhoneNumber('09977889900');
console.log(result);
// {
//   isValid: true,
//   phoneNumber: '09977889900',
//   operator: 'Ooredoo',
//   operatorLabel: 'U9',
//   operatorColor: '#e11d48',
//   operatorIcon: '🔴',
//   networkType: 'GSM'
// }

// Check if valid
const isValid = isValidMMPhoneNumber('0977889900');
console.log(isValid); // true

// Get operator name
const operator = getTelecomName('0977889900');
console.log(operator); // 'Telenor'

// Get network type
const networkType = getPhoneNetworkType('0977889900');
console.log(networkType); // 'GSM'
```

### TypeScript / ESM

```typescript
import {
  validatePhoneNumber,
  isValidMMPhoneNumber,
  getTelecomName,
  getPhoneNetworkType,
  OPERATORS,
  type ValidationResult,
  type OperatorName,
  type NetworkType
} from 'mm-tel-validator';

// Validate a phone number
const result: ValidationResult = validatePhoneNumber('09977889900');

// Get operator name
const operator: OperatorName = getTelecomName('0977889900');

// Get network type
const networkType: NetworkType = getPhoneNetworkType('0977889900');

// Access operator constants
console.log(OPERATORS.OOREDOO);
// { name: 'Ooredoo', label: 'U9', color: '#e11d48', icon: '🔴', ... }
```

### React Example

```tsx
import { validatePhoneNumber, OPERATORS } from 'mm-tel-validator';

function PhoneInput({ phoneNumber }: { phoneNumber: string }) {
  const result = validatePhoneNumber(phoneNumber);
  
  if (!result.isValid) {
    return <div>Invalid phone number</div>;
  }
  
  return (
    <div style={{ color: result.operatorColor }}>
      {result.operatorIcon} {result.operator} - {result.networkType}
    </div>
  );
}
```

## Supported Operators

| Operator | Code | Prefix | Color | Icon |
|----------|------|--------|-------|------|
| Ooredoo | U9 | 099xxxxxxx | 🔴 #e11d48 | 🔴 |
| Telenor | Telenor | 097xxxxxxx | 🔴 #0ea5e9 | 🔴 |
| MPT | MPT | Multiple prefixes | 🟡 #f59e0b | 🟡 |
| MyTel | MyTel | 096xxxxxxx | 🟣 #7c3aed | 🟣 |
| MEC | MEC | 093xxxxxxx | 🟢 #22c55e | 🟢 |

## Supported Formats

```
09XXXXXXXX
+959XXXXXXXX
959XXXXXXXX
09-XXX-XXXX
09 XXX XXXX
၀၉XXXXXXXX (Myanmar numerals)
```

## API Reference

### `validatePhoneNumber(phoneNumber: string): ValidationResult`

Complete phone number validation with all details.

**Returns:**
- `isValid` - Whether the phone number is valid
- `phoneNumber` - Normalized phone number
- `operator` - Operator name (Ooredoo, Telenor, MPT, MEC, MyTel, Unknown)
- `operatorLabel` - Operator label for display
- `operatorColor` - Operator brand color (hex)
- `operatorIcon` - Operator icon emoji
- `networkType` - Network type (GSM, WCDMA, CDMA 450 MHz, CDMA 800 MHz, Unknown)

### `isValidMMPhoneNumber(phoneNumber: string): boolean`

Check if phone number is valid Myanmar format.

### `getTelecomName(phoneNumber: string): OperatorName`

Get operator name for a phone number.

### `getPhoneNetworkType(phoneNumber: string): NetworkType`

Get network type for a phone number.

### `normalizeInput(phoneNumber: string): string`

Normalize phone number (convert Myanmar numerals, standardize format).

### `sanitizeInput(phoneNumber: string): string`

Sanitize phone number (remove spaces, dashes, fix country codes).

### `getOperatorConfig(operatorName: string): OperatorBrand`

Get operator brand configuration.

### Constants

- `OPERATORS` - All operator brand configurations
- `NETWORK_TYPE` - All network type constants

## Type Definitions

```typescript
interface ValidationResult {
  isValid: boolean;
  phoneNumber: string;
  operator?: OperatorName;
  operatorLabel?: string;
  operatorColor?: string;
  operatorIcon?: string;
  networkType?: NetworkType;
}

type OperatorName = 'Ooredoo' | 'Telenor' | 'MPT' | 'MEC' | 'MyTel' | 'Unknown';

type NetworkType = 'GSM' | 'WCDMA' | 'CDMA 450 MHz' | 'CDMA 800 MHz' | 'Unknown';

interface OperatorBrand {
  name: string;
  label: string;
  color: string;
  gradient: string;
  icon: string;
}
```

## License

MIT License - Feel free to use this tool for personal or commercial projects.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Acknowledgments

- Built for the Myanmar community
- Supports all major telecom operators in Myanmar
- Free and open-source

---