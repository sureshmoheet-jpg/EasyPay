import React from 'react';
import { useWallet } from '../context/WalletContext';
import { APP_LOGO } from '../data/mockData';

export const Header: React.FC = () => {
  const { currentUser, setActiveTab, setIsNotificationsOpen, notifications } = useWallet();
  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <header className="fixed top-0 w-full z-40 pt-safe bg-[#ffffff]/90 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)] border-b border-[#eff4ff]">
      <div className="h-16 px-gutter max-w-lg mx-auto flex items-center justify-between gap-space-sm">
        {/* Brand & Demo Pill */}
        <div
          className="flex items-center gap-space-sm min-w-0 flex-1 cursor-pointer select-none"
          onClick={() => setActiveTab('home')}
        >
          <div className="relative flex-shrink-0">
            <img
              src={APP_LOGO}
              alt="EasyPay Logo"
              className="h-8 w-8 object-contain rounded-lg shadow-xs"
              onError={(e) => {
                // Fallback SVG if image fails to load
                (e.target as HTMLElement).style.display = 'none';
              }}
            />
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#6ffbbe] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-[#006c49]"></span>
            </span>
          </div>
          <span className="text-headline-sm text-[#0b1c30] tracking-tight truncate font-bold">
            EasyPay
          </span>
          <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-[#dce9ff] text-[#003fb1] text-label-sm uppercase tracking-wider flex-shrink-0 font-bold">
            DEMO MODE
          </span>
        </div>

        {/* Action icons */}
        <div className="flex items-center gap-1 flex-shrink-0">
          {/* Notifications Button */}
          <button
            aria-label="Notifications"
            onClick={() => setIsNotificationsOpen(true)}
            className="relative w-10 h-10 flex items-center justify-center rounded-full text-[#434654] hover:text-[#0b1c30] hover:bg-[#e5eeff] active:scale-95 transition-all"
          >
            <span className="material-symbols-outlined text-[22px]">notifications</span>
            {unreadCount > 0 && (
              <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#ba1a1a] ring-2 ring-[#ffffff]"></span>
            )}
          </button>

          {/* Profile Avatar */}
          <button
            onClick={() => setActiveTab('profile')}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:ring-2 hover:ring-[#1a56db] transition-all active:scale-95"
            title="Alex Morgan Profile"
          >
            <img
              alt="Profile"
              className="w-8 h-8 rounded-full object-cover ring-2 ring-[#dbe1ff]"
              src={currentUser.avatar}
            />
          </button>
        </div>
      </div>
    </header>
  );
};
