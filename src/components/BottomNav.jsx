import React from 'react';
import {
  DropletIcon,
  CalendarDaysIcon,
  CompassIcon,
  ChartBarIncreasingIcon
} from 'lucide-animated';

const BottomNav = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'vault', label: 'Collection', icon: DropletIcon },
    { id: 'sotd', label: 'Journal', icon: CalendarDaysIcon },
    { id: 'notes', label: 'Notes', icon: CompassIcon },
    { id: 'stats', label: 'Stats', icon: ChartBarIncreasingIcon }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-[#0a0a0a]/95 backdrop-blur-md border-t border-white/[0.08] px-4 py-2 pb-[max(0.6rem,env(safe-area-inset-bottom))]">
      <div className="max-w-md mx-auto grid grid-cols-4 gap-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`relative flex flex-col items-center justify-center py-1.5 px-1 rounded-lg transition-all duration-150 active:scale-95 ${
                isActive
                  ? 'text-white'
                  : 'text-neutral-500 hover:text-neutral-300'
              }`}
            >
              <div
                className={`p-1 rounded-md transition-colors ${
                  isActive ? 'text-white' : 'text-neutral-500'
                }`}
              >
                <Icon size={20} animateOnHover={true} />
              </div>

              <span className={`text-[10px] tracking-wider uppercase font-mono mt-1 ${
                isActive ? 'text-white font-medium' : 'text-neutral-500'
              }`}>
                {tab.label}
              </span>

              {isActive && (
                <span className="w-1 h-1 rounded-full bg-white mt-1" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;
