import { ActivityFeed } from "../ActivityFeed";
import { DashboardStats } from "../dashboard/DashboardStats";
import { ActivePolicies } from "../dashboard/ActivePolicies";

export function DashboardPage() {
  return (
    <div className="p-6 space-y-6">
      <DashboardStats totalCoverage={0} activePolicies={0} monthlyPremium={0} claimsCount={0} />
      <ActivePolicies />
      <ActivityFeed activities={[]} />
    </div>
  );
} 