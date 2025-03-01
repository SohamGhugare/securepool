import { Shield, TrendingUp, Clock, AlertTriangle } from 'lucide-react';
import type { InsurancePool } from '../../types/capital';

interface PoolListProps {
  pools: InsurancePool[];
  selectedPool: InsurancePool | null;
  onSelectPool: (pool: InsurancePool) => void;
}

export function PoolList({ pools, selectedPool, onSelectPool }: PoolListProps) {
  const getRiskColor = (risk: string) => {
    switch(risk) {
      case 'Low': return 'bg-green-50 text-green-700 border-green-200';
      case 'Medium': return 'bg-yellow-50 text-yellow-700 border-yellow-200';
      case 'High': return 'bg-red-50 text-red-700 border-red-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const getUtilizationColor = (rate: number) => {
    if (rate < 50) return 'bg-green-500';
    if (rate < 75) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-gray-900">Insurance Pools</h2>
      <div className="space-y-4">
        {pools.map(pool => (
          <div 
            key={pool.id}
            onClick={() => onSelectPool(pool)}
            className={`bg-white rounded-xl p-6 border-2 transition-all cursor-pointer hover:shadow-lg
              ${selectedPool?.id === pool.id ? 'border-green-600 ring-4 ring-green-600/10' : 'border-gray-100 hover:border-gray-200'}`}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="space-y-1">
                <h3 className="text-lg font-semibold text-gray-900">{pool.name}</h3>
                <p className="text-gray-600">{pool.description}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getRiskColor(pool.riskLevel)}`}>
                {pool.riskLevel} Risk
              </span>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-gray-600">
                  <Shield className="h-5 w-5 text-bitcoin" />
                  <span className="text-sm">Total Staked</span>
                </div>
                <p className="text-lg font-semibold text-gray-900">{pool.totalStaked} ETH</p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-gray-600">
                  <TrendingUp className="h-5 w-5 text-bitcoin" />
                  <span className="text-sm">Current APY</span>
                </div>
                <p className="text-lg font-semibold text-green-600">{pool.currentAPY}%</p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-gray-600">
                  <Clock className="h-5 w-5 text-bitcoin" />
                  <span className="text-sm">Lock Period</span>
                </div>
                <p className="text-lg font-semibold text-gray-900">{pool.lockupPeriod} days</p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-gray-600">
                  <AlertTriangle className="h-5 w-5 text-green-600" />
                  <span className="text-sm">Utilization</span>
                </div>
                <div className="flex items-center gap-2">
                  <p className="text-lg font-semibold text-gray-900">{pool.utilizationRate}%</p>
                  <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${getUtilizationColor(pool.utilizationRate)} transition-all`}
                      style={{ width: `${pool.utilizationRate}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 