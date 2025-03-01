import type { InsurancePool } from '../types/capital';

export const MOCK_POOL_DATA: InsurancePool[] = [
  {
    id: 1,
    name: "Exchange Hack Protection Pool",
    description: "Provide liquidity for exchange hack coverage policies",
    coverageType: "Exchange Security",
    totalStaked: 245.75,
    minStake: 0.1,
    maxStake: 50,
    currentAPY: 8.5,
    utilizationRate: 65,
    lockupPeriod: 30,
    riskLevel: "Medium",
    stakersCount: 156,
    totalClaims: 12,
    successfulClaims: 3
  },
  {
    id: 2,
    name: "Smart Contract Coverage Pool",
    description: "Secure smart contract vulnerability insurance",
    coverageType: "Smart Contract Risk",
    totalStaked: 567.23,
    minStake: 0.5,
    maxStake: 100,
    currentAPY: 12.3,
    utilizationRate: 78,
    lockupPeriod: 60,
    riskLevel: "High",
    stakersCount: 89,
    totalClaims: 8,
    successfulClaims: 1
  },
  {
    id: 3,
    name: "Wallet Recovery Pool",
    description: "Coverage for wallet and private key recovery",
    coverageType: "Wallet Security",
    totalStaked: 123.45,
    minStake: 0.05,
    maxStake: 25,
    currentAPY: 5.8,
    utilizationRate: 45,
    lockupPeriod: 15,
    riskLevel: "Low",
    stakersCount: 234,
    totalClaims: 45,
    successfulClaims: 42
  }
]; 