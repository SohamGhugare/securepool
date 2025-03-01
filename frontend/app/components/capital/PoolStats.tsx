import { DollarSign, TrendingUp, Users, Percent } from 'lucide-react';

interface PoolStatsProps {
  totalStaked: number;
  totalEarnings: number;
  activeStakes: number;
  averageAPY: number;
}

export function PoolStats({ totalStaked, totalEarnings, activeStakes, averageAPY }: PoolStatsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <h3 className="text-gray-600 text-sm">Total Staked</h3>
          <DollarSign className="h-5 w-5 text-bitcoin opacity-50" />
        </div>
        <p className="text-2xl font-bold text-gray-900 mt-2">{totalStaked} ETH</p>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <h3 className="text-gray-600 text-sm">Total Earnings</h3>
          <TrendingUp className="h-5 w-5 text-bitcoin opacity-50" />
        </div>
        <p className="text-2xl font-bold text-gray-900 mt-2">{totalEarnings} ETH</p>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <h3 className="text-gray-600 text-sm">Active Stakes</h3>
          <Users className="h-5 w-5 text-bitcoin opacity-50" />
        </div>
        <p className="text-2xl font-bold text-gray-900 mt-2">{activeStakes}</p>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <h3 className="text-gray-600 text-sm">Average APY</h3>
          <Percent className="h-5 w-5 text-bitcoin opacity-50" />
        </div>
        <p className="text-2xl font-bold text-gray-900 mt-2">{averageAPY}%</p>
      </div>
    </div>
  );
} 