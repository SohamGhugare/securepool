import { InsurancePolicy } from '../types/insurance';
import { ActivePolicy } from '../types/insurance';

export const INSURANCE_POLICIES: InsurancePolicy[] = [
  {
    id: '1',
    name: "Exchange Hack Protection",
    description: "Coverage against loss of funds due to exchange security breaches",
    minAmount: 1,
    maxAmount: 50,
    premiumRate: 0.3,
    icon: "🛡️"
  },
  {
    id: '2',
    name: "Smart Contract Failure",
    description: "Coverage against loss of funds due to smart contract security breaches",
    minAmount: 1,
    maxAmount: 50,
    premiumRate: 0.3,
    icon: "📝"
  },
  // ... other policies
];

export const MOCK_ACTIVE_POLICIES: ActivePolicy[] = [
  {
    id: '1',
    title: "Exchange Hack Protection",
    icon: "🛡️",
    currentCoverage: "5.00",
    monthlyPremium: "0.005",
    expiresIn: 89
  },
  // Add other mock policies...
];

export const MOCK_ACTIVITY_LOGS = [
  // ... your activity logs data
]; 