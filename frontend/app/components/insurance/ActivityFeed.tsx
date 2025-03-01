import type { ActivityLog } from '../../types/insurance';

interface ActivityFeedProps {
  activities: ActivityLog[];
}

export function ActivityFeed({ activities }: ActivityFeedProps) {
  return (
    <div className="space-y-4">
      {activities.map(activity => (
        <div key={activity.id} className="flex items-center gap-4">
          <div className={`w-2 h-2 rounded-full bg-${activity.statusColor}-500`}></div>
          <div className="flex-1">
            <p className="text-gray-900">{activity.title}</p>
            <p className="text-sm text-gray-600">{activity.description}</p>
          </div>
          <span className="text-sm text-gray-600">{activity.timestamp}</span>
        </div>
      ))}
    </div>
  );
} 