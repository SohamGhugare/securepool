import { MOCK_ACTIVE_POLICIES } from '../../../constants/insurance';
import { PolicyCard } from './PolicyCard';

export function ActivePolicies() {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-gray-900">Active Policies</h2>
      {MOCK_ACTIVE_POLICIES.map(policy => (
        <PolicyCard key={policy.id} policy={policy} />
      ))}
    </div>
  );
} 