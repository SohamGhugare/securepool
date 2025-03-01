import React, { useState } from 'react';
import { InsurancePolicy } from '../../types/insurance';
import { InsuranceConfigurator } from './InsuranceConfigurator';
import { INSURANCE_POLICIES } from '../../constants/insurance';

export function InsurancePortal() {
  const [selectedPolicy, setSelectedPolicy] = useState<InsurancePolicy | null>(null);

  const handlePurchaseInsurance = async (amount: number, duration: number) => {
    if (!selectedPolicy) return;
    
    try {
      console.log('Processing purchase:', {
        policyName: selectedPolicy.name,
        amount,
        duration,
        premium: amount * (selectedPolicy.premiumRate / 100) * (duration / 365)
      });
      
      // TODO: Add actual purchase transaction here
      
      // Reset selection after successful purchase
      setSelectedPolicy(null);
    } catch (error) {
      console.error('Purchase failed:', error);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2">
        {INSURANCE_POLICIES.map(policy => (
          <div 
            key={policy.id} 
            className={`cursor-pointer p-4 rounded-lg ${selectedPolicy?.id === policy.id ? 'bg-orange-50' : ''}`}
            onClick={() => setSelectedPolicy(policy)}
          >
            {policy.name}
          </div>
        ))}
      </div>
      <div className="lg:col-span-1">
        <InsuranceConfigurator 
          selectedPolicy={selectedPolicy}
          onPurchase={handlePurchaseInsurance}
        />
      </div>
    </div>
  );
} 