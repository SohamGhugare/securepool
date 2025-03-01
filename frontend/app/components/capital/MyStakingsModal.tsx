'use client';

import { X } from 'lucide-react';
import type { StakingPosition } from '../../types/capital';

const MOCK_USER_STAKINGS: StakingPosition[] = [
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
    poolName: "Smart Contract Coverage Pool",
    poolId: 2,
    amount: 5.0,
    apy: 12.3,
    startDate: '2024-01-15',
    endDate: '2024-03-15',
    earned: 0.045,
    status: 'active'
  },
  {
    id: 3,
    poolName: "Wallet Recovery Pool",
    poolId: 3,
    amount: 1.0,
    apy: 5.8,
    startDate: '2024-01-01',
    endDate: '2024-01-30',
    earned: 0.004,
    status: 'completed'
  }
];

interface MyStakingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MyStakingsModal({ isOpen, onClose }: MyStakingsModalProps) {
  if (!isOpen) return null;

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'active': return 'bg-green-100 text-green-700';
      case 'completed': return 'bg-gray-100 text-gray-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const totalEarned = MOCK_USER_STAKINGS.reduce((sum, pos) => sum + pos.earned, 0);
  const totalStaked = MOCK_USER_STAKINGS.reduce((sum, pos) => sum + pos.amount, 0);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[80vh] flex flex-col">
        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">My Stakings</h2>
            <p className="text-sm text-gray-600 mt-1">
              Total Staked: {totalStaked} ETH | Total Earned: {totalEarned.toFixed(8)} ETH
            </p>
          </div>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="overflow-y-auto flex-1">
          <div className="divide-y divide-gray-100">
            {MOCK_USER_STAKINGS.map(position => (
              <div key={position.id} className="p-6 hover:bg-gray-50">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-medium text-gray-900">{position.poolName}</h3>
                  <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${getStatusColor(position.status)}`}>
                    {position.status.charAt(0).toUpperCase() + position.status.slice(1)}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-600">Amount Staked</p>
                    <p className="font-medium text-gray-900">{position.amount} ETH</p>
                  </div>
                  <div>
                    <p className="text-gray-600">APY</p>
                    <p className="font-medium text-green-600">{position.apy}%</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Start Date</p>
                    <p className="font-medium text-gray-900">
                      {new Date(position.startDate).toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600">End Date</p>
                    <p className="font-medium text-gray-900">
                      {new Date(position.endDate).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-gray-600">Earned so far</p>
                    <p className="font-medium text-bitcoin">{position.earned} ETH</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 