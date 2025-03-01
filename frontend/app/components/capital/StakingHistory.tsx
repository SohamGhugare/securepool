import { Clock } from 'lucide-react';
import type { StakingPosition } from '../../types/capital';

const MOCK_STAKING_HISTORY: StakingPosition[] = [
  {
    id: 1,
    poolId: 1,
    poolName: "Exchange Hack Protection Pool",
    amount: 2.5,
    apy: 8.5,
    startDate: '2024-02-01',
    endDate: '2024-03-01',
    earned: 0.018,
    status: 'active'
  },
  {
    id: 2,
    poolId: 3,
    poolName: "Exchange Hack Protection Pool",
    amount: 1.0,
    apy: 5.8,
    startDate: '2024-01-15',
    endDate: '2024-01-30',
    earned: 0.004,
    status: 'completed'
  }
];

export function StakingHistory() {
  const getStatusColor = (status: string) => {
    switch(status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'locked': return 'bg-orange-100 text-orange-800';
      case 'completed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900">Staking History</h2>
      </div>
      
      <div className="divide-y divide-gray-200">
        {MOCK_STAKING_HISTORY.map(position => (
          <div key={position.id} className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-medium text-gray-900">Pool #{position.poolId}</h3>
                  <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${getStatusColor(position.status)}`}>
                    {position.status.charAt(0).toUpperCase() + position.status.slice(1)}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mt-1">
                  {position.amount} ETH at {position.apy}% APY
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">
                  Earned: {position.earned} ETH
                </p>
                <div className="flex items-center gap-1 text-xs text-gray-500 mt-1">
                  <Clock className="h-3 w-3" />
                  <span>{new Date(position.startDate).toLocaleDateString()} - {new Date(position.endDate).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 