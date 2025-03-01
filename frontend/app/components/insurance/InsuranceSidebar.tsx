import { Activity, Briefcase, AlertCircle } from 'lucide-react';

interface InsuranceSidebarProps {
  activeTab: 'dashboard' | 'marketplace' | 'claims';
  onTabChange: (tab: 'dashboard' | 'marketplace' | 'claims') => void;
}

export function InsuranceSidebar({ activeTab, onTabChange }: InsuranceSidebarProps) {
  return (
    <div className="w-64 bg-gray-100 text-gray-900 py-8 px-4 hidden md:block">
      <nav className="space-y-2">
        <button 
          className={`flex items-center w-full px-4 py-3 rounded-lg ${activeTab === 'dashboard' ? 'text-bitcoin bg-white' : ''}`}
          onClick={() => onTabChange('dashboard')}
        >
          <Activity className="h-5 w-5 mr-2" />
          Dashboard
        </button>
        <button onClick={() => onTabChange('marketplace')}>
          <Briefcase className="h-5 w-5" />
          Marketplace
        </button>
        <button onClick={() => onTabChange('claims')}>
          <AlertCircle className="h-5 w-5" />
          Claims
        </button>
      </nav>
    </div>
  );
} 