interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function Sidebar({ activeTab, onTabChange }: SidebarProps) {
  return (
    <div className="w-64 bg-gray-100 text-gray-900 py-8 px-4 hidden md:block">
      <nav className="space-y-2">
        <button 
          className={`flex items-center w-full px-4 py-3 rounded-lg ${activeTab === 'dashboard' ? 'text-bitcoin bg-white' : ''}`}
          onClick={() => onTabChange('dashboard')}
        >
          Dashboard
        </button>
        {/* Add other navigation items */}
      </nav>
    </div>
  );
} 