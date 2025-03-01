import type { ActivePolicy } from '../../../types/insurance';

interface PolicyCardProps {
  policy: ActivePolicy;
}

export function PolicyCard({ policy }: PolicyCardProps) {
  return (
    <div className="border border-gray-200 rounded-lg p-4">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="text-3xl">{policy.icon}</div>
          <div>
            <h3 className="font-medium text-gray-900">{policy.title}</h3>
            <p className="text-sm text-gray-600">Coverage: {policy.currentCoverage} ETH</p>
          </div>
        </div>
        <span className="px-2.5 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
          Active
        </span>
      </div>
      <div className="mt-4 flex items-center justify-between text-sm">
        <span className="text-gray-600">Premium: {policy.monthlyPremium} ETH/month</span>
        <span className="text-gray-600">Expires in {policy.expiresIn} days</span>
      </div>
    </div>
  );
} 