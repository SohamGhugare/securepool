'use client';

import { useState } from 'react';
import { AlertCircle, History, Shield } from 'lucide-react';
import type { InsurancePool } from '../../types/capital';
import { SuccessDialog } from '../ui/SuccessDialog';
import { MyStakingsModal } from './MyStakingsModal';
import { IdentityVerificationDialog } from '../ui/IdentityVerificationDialog';

interface StakingFormProps {
  pool: InsurancePool;
}

export function StakingForm({ pool }: StakingFormProps) {
  const [amount, setAmount] = useState<string>('');
  const [duration, setDuration] = useState<number>(pool.lockupPeriod);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showStakings, setShowStakings] = useState(false);
  const [showVerification, setShowVerification] = useState(false);

  const handleSubmit = () => {
    setIsSubmitting(true);
    
    try {
      console.log('Staking:', { amount, duration, poolId: pool.id });
      setTimeout(() => {
        setShowSuccess(true);
        setAmount('');
        setDuration(pool.lockupPeriod);
        setIsSubmitting(false);
      }, 1000);
    } catch (error) {
      console.error('Staking failed:', error);
      setIsSubmitting(false);
    }
  };

  const handleStake = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || !duration) return;
    setShowVerification(true);
  };

  const handleVerified = () => {
    handleSubmit();
  };

  const estimatedReturns = parseFloat(amount || '0') * (pool.currentAPY / 100) * (duration / 365);

  return (
    <>
      <div className="bg-white rounded-xl shadow-sm sticky top-6 pb-[120px]">
        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Stake in Pool</h3>
            <p className="text-sm text-gray-600 mt-1">Provide liquidity and earn rewards</p>
          </div>
          <button
            onClick={() => setShowStakings(true)}
            className="flex items-center gap-2 px-4 py-2 text-green-700 hover:bg-green-50 rounded-lg transition-colors"
          >
            <History className="h-4 w-4" />
            <span className="font-medium">My Stakings</span>
          </button>
        </div>

        <div className="p-6 space-y-6 overflow-y-auto max-h-[calc(100vh-240px)]">
          <form id="staking-form" onSubmit={handleStake} className="space-y-6">
            <div>
              <label htmlFor="amount" className="block text-sm font-medium text-gray-900 mb-2">
                Stake Amount (ETH)
              </label>
              <input
                id="amount"
                type="number"
                min={pool.minStake}
                max={pool.maxStake}
                step="0.001"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-600/20 focus:border-green-600 text-gray-900"
                placeholder="Enter amount..."
                required
              />
              <p className="text-sm text-gray-600 mt-2">
                Min: {pool.minStake} ETH | Max: {pool.maxStake} ETH
              </p>
            </div>

            <div>
              <label htmlFor="duration" className="block text-sm font-medium text-gray-900 mb-2">
                Lock Duration (Days)
              </label>
              <input
                id="duration"
                type="number"
                min={pool.lockupPeriod}
                step={15}
                value={duration}
                onChange={(e) => setDuration(parseInt(e.target.value))}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-600/20 focus:border-green-600 text-gray-900"
                placeholder="Enter duration..."
                required
              />
              <p className="text-sm text-gray-600 mt-2">
                Minimum lock period: {pool.lockupPeriod} days
              </p>
            </div>

            <div className="bg-green-50 rounded-xl p-6 border border-green-100">
              <div className="flex items-start gap-4">
                <AlertCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-medium text-gray-900">Estimated Returns</h4>
                  <p className="text-sm text-gray-600 mt-1.5">
                    {estimatedReturns.toFixed(8)} ETH ({pool.currentAPY}% APY)
                  </p>
                </div>
              </div>
            </div>
          </form>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-6 bg-white border-t border-gray-100">
          <button
            type="submit"
            form="staking-form"
            disabled={isSubmitting}
            className="w-full px-6 py-4 bg-green-600 hover:bg-green-700 text-white rounded-xl 
              transition-all transform hover:scale-[1.02] active:scale-[0.98] 
              font-bold text-lg shadow-md hover:shadow-lg
              disabled:opacity-50 disabled:cursor-not-allowed
              flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <span className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
                Processing...
              </>
            ) : (
              <>
                <Shield className="h-5 w-5" />
                Stake Now
              </>
            )}
          </button>
          <p className="text-center text-sm text-gray-600 mt-3">
            Stake ETH to earn passive rewards from insurance premiums
          </p>
        </div>
      </div>

      <SuccessDialog
        isOpen={showSuccess}
        onClose={() => setShowSuccess(false)}
        title="Staking Successful!"
        message={`Successfully staked ${amount} ETH for ${duration} days in ${pool.name}`}
      />

      <MyStakingsModal 
        isOpen={showStakings}
        onClose={() => setShowStakings(false)}
      />

      <IdentityVerificationDialog
        isOpen={showVerification}
        onClose={() => setShowVerification(false)}
        onVerified={handleVerified}
        action="staking"
      />
    </>
  );
} 