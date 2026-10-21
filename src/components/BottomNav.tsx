import React from 'react';
import { useWallet } from '../context/WalletContext';
import { ScreenTab } from '../types';

export const BottomNav: React.FC = () => {
  const { activeTab, setActiveTab } = useWallet();

  const tabs: { key: ScreenTab; label: string; icon: string; iconFill?: boolean }[] = [
    { key: 'home', label: 'Home', icon: 'home' },
    { key: 'send', label: 'Send', icon: 'send_money' },
    { key: 'receive', label: 'Receive', icon: 'qr_code_scanner' },
    { key: 'history', label: 'History', icon: 'receipt_long' },
    { key: 'profile', label: 'Profile', icon: 'person' },
  ];

  return (
    <nav className="fixed bottom-0 w-full z-40 pb-safe bg-[#ffffff]/90 backdrop-blur-xl shadow-[0_-2px_12px_rgba(0,0,0,0.04)] border-t border-[#eff4ff]">
      <div className="h-16 px-gutter max-w-lg mx-auto grid grid-cols-5 items-center">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.key;
          return (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex flex-col items-center justify-center h-full min-h-[44px] gap-0.5 transition-all select-none active:scale-95 ${
                isActive
                  ? 'text-[#003fb1] font-semibold'
                  : 'text-[#434654] hover:text-[#0b1c30]'
              }`}
            >
              <div className="relative flex items-center justify-center">
                <span
                  className="material-symbols-outlined text-[24px]"
                  style={isActive ? { fontVariationSettings: "'FILL' 1" } : {}}
                >
                  {tab.icon}
                </span>
                {isActive && (
                  <span className="absolute -bottom-1 w-1.5 h-1.5 rounded-full bg-[#003fb1]"></span>
                )}
              </div>
              <span className={`text-[11px] leading-tight ${isActive ? 'font-bold' : 'font-medium'}`}>
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
