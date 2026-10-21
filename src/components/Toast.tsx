import React from 'react';
import { useWallet } from '../context/WalletContext';

export const Toast: React.FC = () => {
  const { toast } = useWallet();

  if (!toast) return null;

  return (
    <div
      className={`fixed top-20 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 ease-out px-4 py-2.5 rounded-full bg-[#213145] text-[#eaf1ff] shadow-xl flex items-center gap-2 text-label-md font-medium max-w-[90vw] ${
        toast.visible
          ? 'opacity-100 translate-y-0 pointer-events-auto'
          : 'opacity-0 -translate-y-4 pointer-events-none'
      }`}
    >
      <span
        className="material-symbols-outlined text-[#6cf8bb] text-[18px] flex-shrink-0"
        style={{ fontVariationSettings: "'FILL' 1" }}
      >
        {toast.icon || 'check_circle'}
      </span>
      <span className="truncate">{toast.message}</span>
    </div>
  );
};
