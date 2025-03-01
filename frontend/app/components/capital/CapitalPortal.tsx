'use client';

import { useState } from 'react';
import { PoolList } from './PoolList';
import { PoolStats } from './PoolStats';
import { StakingHistory } from './StakingHistory';
import { MOCK_POOL_DATA } from '../../constants/capital';
import type { InsurancePool } from '../../types/capital';
import { StakingForm } from './StakingForm';
import { MousePointerClick } from 'lucide-react';

function EmptyPoolSelection() {
  return (
    <div className="bg-white rounded-xl p-8 shadow-sm h-full flex flex-col items-center justify-center text-center space-y-4 border-2 border-dashed border-gray-200">
      <div className="bg-gray-50 p-4 rounded-full">
        <MousePointerClick className="h-8 w-8 text-gray-400" />
      </div>
      <div>
        <h3 className="text-lg font-semibold text-gray-900">No Pool Selected</h3>
        <p className="text-gray-600 mt-1">
          Click on an insurance pool to explore its details and start staking
        </p>
      </div>
    </div>
  );
}

export function CapitalPortal() {
  const [selectedPool, setSelectedPool] = useState<InsurancePool | null>(null);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <PoolStats 
          totalStaked={156.45}
          totalEarnings={12.34}
          activeStakes={3}
          averageAPY={8.5}
        />

        {/* Pool List and Details */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <PoolList 
              pools={MOCK_POOL_DATA}
              selectedPool={selectedPool}
              onSelectPool={setSelectedPool}
            />
          </div>
          <div className="lg:col-span-1">
            {selectedPool ? (
              <StakingForm pool={selectedPool} />
            ) : (
              <EmptyPoolSelection />
            )}
          </div>
        </div>

        <StakingHistory />
      </div>
    </div>
  );
} 