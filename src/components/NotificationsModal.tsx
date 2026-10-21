import React from 'react';
import { useWallet } from '../context/WalletContext';

export const NotificationsModal: React.FC = () => {
  const { isNotificationsOpen, setIsNotificationsOpen, notifications, markAllNotificationsRead } = useWallet();

  if (!isNotificationsOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-[#213145]/50 backdrop-blur-sm flex items-end sm:items-center sm:justify-center p-0 sm:p-4 animate-in fade-in duration-200"
      onClick={() => setIsNotificationsOpen(false)}
    >
      <div
        className="w-full sm:max-w-md bg-[#ffffff] rounded-t-3xl sm:rounded-2xl max-h-[85vh] overflow-y-auto shadow-2xl flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drag handle */}
        <div className="w-full flex justify-center pt-3 pb-1 sm:hidden">
          <div className="w-10 h-1 rounded-full bg-[#c3c5d7]"></div>
        </div>

        {/* Top bar */}
        <div className="px-gutter pt-2 pb-3 flex items-center justify-between border-b border-[#eff4ff]">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#003fb1] text-[22px]">notifications</span>
            <span className="text-headline-sm text-[#0b1c30] font-bold">Notifications</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={markAllNotificationsRead}
              className="text-label-sm text-[#003fb1] hover:underline font-semibold"
            >
              Mark read
            </button>
            <button
              onClick={() => setIsNotificationsOpen(false)}
              className="w-8 h-8 rounded-full bg-[#e5eeff] flex items-center justify-center text-[#434654] hover:text-[#0b1c30]"
            >
              <span className="material-symbols-outlined text-[18px]">close</span>
            </button>
          </div>
        </div>

        {/* Notification items */}
        <div className="p-gutter space-y-2.5">
          {notifications.map((item) => (
            <div
              key={item.id}
              className={`p-3.5 rounded-2xl flex items-start gap-3 transition-colors ${
                item.read ? 'bg-[#f8f9ff]' : 'bg-[#e5eeff]/70 border border-[#b5c4ff]/40'
              }`}
            >
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                  item.type === 'payment'
                    ? 'bg-[#6cf8bb] text-[#006c49]'
                    : item.type === 'security'
                    ? 'bg-[#dbe1ff] text-[#003fb1]'
                    : 'bg-[#dce9ff] text-[#003fb1]'
                }`}
              >
                <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-1">
                  <span className="text-label-md text-[#0b1c30] font-bold truncate">
                    {item.title}
                  </span>
                  <span className="text-[11px] text-[#737686] flex-shrink-0">
                    {item.timestamp}
                  </span>
                </div>
                <p className="text-body-sm text-[#434654] mt-0.5 leading-snug">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
