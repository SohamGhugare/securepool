import { DollarSign, Shield, Activity, AlertCircle } from 'lucide-react';

interface DashboardStatsProps {
  totalCoverage: number;
  activePolicies: number;
  monthlyPremium: number;
  claimsCount: number;
}

export function DashboardStats({ totalCoverage, activePolicies, monthlyPremium, claimsCount }: DashboardStatsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <h3 className="text-gray-500 text-sm">Total Coverage</h3>
          <DollarSign className="h-5 w-5 text-bitcoin opacity-50" />
        </div>
        <p className="text-2xl font-bold text-gray-900 mt-2">{totalCoverage} ETH</p>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <h3 className="text-gray-500 text-sm">Active Policies</h3>
          <Shield className="h-5 w-5 text-bitcoin opacity-50" />
        </div>
        <p className="text-2xl font-bold text-gray-900 mt-2">{activePolicies}</p>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <h3 className="text-gray-500 text-sm">Monthly Premium</h3>
          <Activity className="h-5 w-5 text-bitcoin opacity-50" />
        </div>
        <p className="text-2xl font-bold text-gray-900 mt-2">{monthlyPremium} ETH</p>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <h3 className="text-gray-500 text-sm">Claims History</h3>
          <AlertCircle className="h-5 w-5 text-bitcoin opacity-50" />
        </div>
        <p className="text-2xl font-bold text-gray-900 mt-2">{claimsCount}</p>
      </div>
    </div>
  );
} 