export interface InsurancePolicy {
  id: string;
  name: string;
  description: string;
  icon: string;
  minAmount: number;
  maxAmount: number;
  premiumRate: number;
}

export interface ActivePolicy {
  id: string;
  title: string;
  icon: string;
  currentCoverage: string; // Now in ETH
  monthlyPremium: string; // Now in ETH
  expiresIn: number;
}

export interface ActivityLog {
  id: number;
  type: 'payment' | 'renewal' | 'coverage_change';
  title: string;
  description: string;
  timestamp: string;
  status: string;
  statusColor: 'green' | 'blue' | 'orange';
}

export interface CoverageOption {
  id: number;
  name: string;
  description: string;
  minAmount: number;
  maxAmount: number;
  premiumRate: number;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export const MOCK_POLICIES: InsurancePolicy[] = [
  {
    id: '1',
    name: 'Smart Contract Coverage',
    description: 'Protection against smart contract vulnerabilities',
    icon: '📝',
    minAmount: 0.1,
    maxAmount: 10,
    premiumRate: 2.5
  },
  {
    id: '2',
    name: 'Wallet Protection',
    description: 'Coverage for wallet compromises',
    icon: '🔐',
    minAmount: 0.1,
    maxAmount: 5,
    premiumRate: 1.8
  }
];

export const MOCK_ACTIVE_POLICIES: ActivePolicy[] = [
  {
    id: '1',
    title: 'Smart Contract Coverage',
    icon: '📝',
    currentCoverage: '2.45 ETH',
    monthlyPremium: '0.00735 ETH',
    expiresIn: 152
  },
  {
    id: '2',
    title: 'Wallet Protection',
    icon: '🔐',
    currentCoverage: '5.00 ETH',
    monthlyPremium: '0.0025 ETH',
    expiresIn: 243
  }
]; 