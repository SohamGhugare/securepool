'use client';

import { useState } from 'react';
import { DashboardStats } from './DashboardStats';
import { PolicyCard } from './PolicyCard';
import { ActivityFeed } from './ActivityFeed';
import { InsuranceConfigurator } from './InsuranceConfigurator';
import { InsuranceSidebar } from './InsuranceSidebar';
import { INSURANCE_POLICIES, MOCK_ACTIVE_POLICIES, MOCK_ACTIVITY_LOGS } from '../../constants/insurance';
import type { InsurancePolicy } from '../../types/insurance';
import { ClaimsPage } from './pages/ClaimsPage';

export function InsurancePortal() {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'marketplace' | 'claims'>('dashboard');
  const [selectedPolicy, setSelectedPolicy] = useState<InsurancePolicy | null>(null);

  const handlePurchaseInsurance = (amount: number, duration: number) => {
    console.log('Purchasing insurance:', {
      policy: selectedPolicy?.name,
      amount,
      duration
    });
    // Add your purchase logic here
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <div className="p-6 space-y-6">
            <DashboardStats
              totalCoverage={12.45}
              activePolicies={3}
              monthlyPremium={0.0145}
              claimsCount={0}
            />
            <div className="space-y-4">
              {MOCK_ACTIVE_POLICIES.map(policy => (
                <PolicyCard key={policy.id} policy={policy} />
              ))}
            </div>
            <ActivityFeed activities={MOCK_ACTIVITY_LOGS} />
          </div>
        );
      case 'marketplace':
        return (
          <div className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                {INSURANCE_POLICIES.map(policy => (
                  <div key={policy.id} onClick={() => setSelectedPolicy(policy)}>
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
          </div>
        );
      case 'claims':
        return <ClaimsPage />;
      default:
        return null;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <InsuranceSidebar activeTab={activeTab} onTabChange={setActiveTab} />
      <div className="flex-1">
        {/* Header and content */}
        {renderContent()}
      </div>
    </div>
  );
} 