'use client';

import { useState } from 'react';
import { AlertCircle, Shield } from 'lucide-react';
import type { InsurancePolicy } from '../../types/insurance';
import { SuccessDialog } from '../ui/SuccessDialog';
import { IdentityVerificationDialog } from '../ui/IdentityVerificationDialog';

interface InsuranceConfiguratorProps {
  selectedPolicy: InsurancePolicy | null;
  onPurchase: (amount: number, duration: number) => void;
}

export function InsuranceConfigurator({ selectedPolicy, onPurchase }: InsuranceConfiguratorProps) {
  const [amount, setAmount] = useState<string>('');
  const [duration, setDuration] = useState<number>(30);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showVerification, setShowVerification] = useState(false);

  if (!selectedPolicy) return null;
  
  const handleSubmit = () => {
    setIsSubmitting(true);
    try {
      onPurchase(parseFloat(amount), duration);
      setShowSuccess(true);
      setAmount('');
      setDuration(30);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePurchase = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || !duration) return;
    setIsSubmitting(false);
    setShowVerification(true);
  };

  const handleVerified = () => {
    handleSubmit();
  };

  const premium = parseFloat(amount || '0') * (selectedPolicy.premiumRate / 100) * (duration / 365);

  return (
    <>
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <h3 className="text-xl font-semibold text-gray-900 mb-6">Configure Coverage</h3>
        
        <form id="insurance-form" onSubmit={handlePurchase} className="space-y-6">
          <div className="space-y-4">
            <div>
              <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-2">
                Coverage Amount (ETH)
              </label>
              <input
                id="amount"
                type="number"
                min={selectedPolicy.minAmount}
                max={selectedPolicy.maxAmount}
                step="0.001"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-600/20 focus:border-green-600 text-gray-900 bg-white"
                placeholder="Enter amount..."
                required
              />
              <p className="text-sm text-gray-600 mt-2">
                Min: {selectedPolicy.minAmount} ETH | Max: {selectedPolicy.maxAmount} ETH
              </p>
            </div>

            <div>
              <label htmlFor="duration" className="block text-sm font-medium text-gray-700 mb-2">
                Coverage Duration (Days)
              </label>
              <input
                id="duration"
                type="number"
                min={30}
                max={365}
                step={30}
                value={duration}
                onChange={(e) => setDuration(parseInt(e.target.value))}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-600/20 focus:border-green-600 text-gray-900 bg-white"
                placeholder="Enter duration..."
                required
              />
              <p className="text-sm text-gray-600 mt-2">
                Min: 30 days | Max: 365 days
              </p>
            </div>
          </div>

          <div className="bg-green-50/50 rounded-xl p-6 border border-green-100">
            <div className="flex items-start gap-4">
              <AlertCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-medium text-gray-900">Premium Estimate</h4>
                <p className="text-sm text-gray-600 mt-1.5">
                  {premium.toFixed(8)} ETH ({selectedPolicy.premiumRate}% annual rate)
                </p>
              </div>
            </div>
          </div>
        </form>

        <button
          type="submit"
          form="insurance-form"
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
              Purchase Coverage
            </>
          )}
        </button>
      </div>

      <IdentityVerificationDialog
        isOpen={showVerification}
        onClose={() => setShowVerification(false)}
        onVerified={handleVerified}
        action="insurance"
      />

      <SuccessDialog
        isOpen={showSuccess}
        onClose={() => setShowSuccess(false)}
        title="Coverage Purchased!"
        message={`Successfully purchased ${amount} ETH coverage for ${duration} days in ${selectedPolicy.name}`}
      />
    </>
  );
} 