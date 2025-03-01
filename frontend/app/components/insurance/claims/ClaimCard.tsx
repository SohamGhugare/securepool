interface ClaimCardProps {
  status: 'processing' | 'completed';
  icon: string;
  title: string;
  amount: string;
  progress: number;
  completedDate?: string;
}

export function ClaimCard({ status, icon, title, amount, progress, completedDate }: ClaimCardProps) {
  const isProcessing = status === 'processing';
  const statusColor = isProcessing ? 'orange' : 'green';

  return (
    <div className={`border border-${statusColor}-200 bg-${statusColor}-50 rounded-lg p-4`}>
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="text-3xl">{icon}</div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-medium text-gray-900">{title}</h3>
              <span className={`px-2.5 py-1 bg-${statusColor}-100 text-${statusColor}-800 text-xs font-medium rounded-full`}>
                {status === 'processing' ? 'Processing' : 'Completed'}
              </span>
            </div>
            <p className="text-sm text-gray-600 mt-1">Claim Amount: {amount} ETH</p>
          </div>
        </div>
      </div>
      <div className="mt-4">
        <div className={`w-full bg-${statusColor}-100 rounded-full h-2`}>
          <div className={`bg-${statusColor}-500 h-2 rounded-full`} style={{ width: `${progress}%` }}></div>
        </div>
        {completedDate && (
          <div className="mt-4 p-3 bg-green-100 rounded-lg text-sm text-green-800">
            <p className="font-medium">Claim successfully processed</p>
            <p className="mt-1">Payout of {amount} ETH was processed on {completedDate}</p>
          </div>
        )}
      </div>
    </div>
  );
} 