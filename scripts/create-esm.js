const fs = require('fs');
const path = require('path');

const distEsmDir = path.join(__dirname, '..', 'dist-esm');
const distDir = path.join(__dirname, '..', 'dist');

const esmWrapper = `import mod from './index.js';
export const validatePhoneNumber = mod.validatePhoneNumber;
export const isValidMMPhoneNumber = mod.isValidMMPhoneNumber;
export const getTelecomName = mod.getTelecomName;
export const getPhoneNetworkType = mod.getPhoneNetworkType;
export const normalizeInput = mod.normalizeInput;
export const sanitizeInput = mod.sanitizeInput;
export const getOperatorConfig = mod.getOperatorConfig;
export const OPERATORS = mod.OPERATORS;
export const NETWORK_TYPE = mod.NETWORK_TYPE;
`;

fs.writeFileSync(path.join(distDir, 'index.mjs'), esmWrapper);

console.log('ESM wrapper created successfully');
