export interface InsurancePool {
  id: number;
  name: string;
  description: string;
  coverageType: string;
  totalStaked: number;
  minStake: number;
  maxStake: number;
  currentAPY: number;
  utilizationRate: number;
  lockupPeriod: number;
  riskLevel: 'Low' | 'Medium' | 'High';
  stakersCount: number;
  totalClaims: number;
  successfulClaims: number;
}

export interface StakingPosition {
  id: number;
  poolId: number;
  poolName: string;
  amount: number;
  apy: number;
  startDate: string;
  endDate: string;
  earned: number;
  status: 'active' | 'locked' | 'completed';
} 