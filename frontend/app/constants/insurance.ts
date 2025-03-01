import { InsurancePolicy } from '../types/insurance';
import { ActivePolicy } from '../types/insurance';

export const INSURANCE_POLICIES: InsurancePolicy[] = [
  {
    id: 1,
    name: "Exchange Hack Protection",
    title: "Exchange Hack Protection",
    description: "Coverage against loss of funds due to exchange security breaches",
    coverageAmount: [1, 5, 10, 25, 50],
    minAmount: 1,
    maxAmount: 50,
    riskLevel: "Medium-High",
    premiumRate: 0.3, // 0.3% annual rate
    popularity: 93,
    icon: "🛡️"
  },
  // ... other policies
];

export const MOCK_ACTIVE_POLICIES: ActivePolicy[] = [
  {
    id: 1,
    name: "Exchange Hack Protection",
    title: "Exchange Hack Protection",
    description: "Coverage against loss of funds due to exchange security breaches",
    coverageAmount: [1, 5, 10, 25, 50],
    minAmount: 1,
    maxAmount: 50,
    riskLevel: "Medium-High",
    premiumRate: 0.003,
    popularity: 93,
    icon: "🛡️",
    currentCoverage: 5.00,
    monthlyPremium: 0.005,
    expiresIn: 89
  },
  // Add other mock policies...
];

export const MOCK_ACTIVITY_LOGS = [
  // ... your activity logs data
]; 