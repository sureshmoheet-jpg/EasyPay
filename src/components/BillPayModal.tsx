import React, { useState } from 'react';
import { useWallet } from '../context/WalletContext';

interface ServiceConfig {
  title: string;
  icon: string;
  category: string;
  fieldLabel: string;
  defaultIdentifier: string;
  amounts: number[];
}

const SERVICE_CONFIGS: Record<string, ServiceConfig> = {
  recharge: {
    title: 'Mobile Recharge',
    icon: 'phone_android',
    category: 'Mobile Prepaid',
    fieldLabel: 'Mobile Number',
    defaultIdentifier: '+1 (555) 019-2834',
    amounts: [15, 25, 50, 75]
  },
  electricity: {
    title: 'Electricity Bills',
    icon: 'bolt',
    category: 'City Power & Grid',
    fieldLabel: 'Consumer Account ID',
    defaultIdentifier: 'PG-E-8839210',
    amounts: [45.50, 72.80, 110.00]
  },
  dining: {
    title: 'Dining & Food Pay',
    icon: 'fastfood',
    category: 'Food Merchant Relay',
    fieldLabel: 'Order / Table Tag',
    defaultIdentifier: 'Table #14 @ Bistro Central',
    amounts: [18.50, 32.00, 64.50]
  },
  transit: {
    title: 'Transit Metro Pass',
    icon: 'subway',
    category: 'Metro Smart Card',
    fieldLabel: 'Smart Card Number',
    defaultIdentifier: 'METRO-CARD-7739',
    amounts: [10, 20, 40, 60]
  }
};

export const BillPayModal: React.FC = () => {
  const { activeBillService, setActiveBillService, payBill, balance } = useWallet();
  const [selectedAmount, setSelectedAmount] = useState<number>(25);
  const [isProcessing, setIsProcessing] = useState(false);

  if (!activeBillService || !SERVICE_CONFIGS[activeBillService]) return null;

  const config = SERVICE_CONFIGS[activeBillService];

  const handlePay = () => {
    setIsProcessing(true);
    setTimeout(() => {
      payBill(config.title, selectedAmount, config.category);
      setIsProcessing(false);
      setActiveBillService(null);
    }, 900);
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-[#213145]/50 backdrop-blur-sm flex items-end sm:items-center sm:justify-center p-0 sm:p-4 animate-in fade-in duration-200"
      onClick={() => setActiveBillService(null)}
    >
      <div
        className="w-full sm:max-w-md bg-[#ffffff] rounded-t-3xl sm:rounded-2xl max-h-[85vh] overflow-y-auto shadow-2xl flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drag handle */}
        <div className="w-full flex justify-center pt-3 pb-1 sm:hidden">
          <div className="w-10 h-1 rounded-full bg-[#c3c5d7]"></div>
        </div>

        {/* Header */}
        <div className="px-gutter pt-2 pb-3 flex items-center justify-between border-b border-[#eff4ff]">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-[#e5eeff] text-[#003fb1] flex items-center justify-center">
              <span className="material-symbols-outlined text-[20px]">{config.icon}</span>
            </div>
            <div>
              <span className="text-headline-sm text-[#0b1c30] font-bold">{config.title}</span>
              <p className="text-[11px] text-[#006c49] font-semibold">0% Demo Processing Fee</p>
            </div>
          </div>
          <button
            onClick={() => setActiveBillService(null)}
            className="w-8 h-8 rounded-full bg-[#e5eeff] flex items-center justify-center text-[#434654] hover:text-[#0b1c30]"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* Content */}
        <div className="p-gutter space-y-4">
          <div>
            <label className="text-label-md text-[#434654] block mb-1 font-semibold">
              {config.fieldLabel}
            </label>
            <div className="w-full bg-[#eff4ff] rounded-xl px-4 py-3 text-body-md text-[#0b1c30] font-medium flex items-center justify-between">
              <span>{config.defaultIdentifier}</span>
              <span className="material-symbols-outlined text-[18px] text-[#006c49]">verified</span>
            </div>
          </div>

          <div>
            <label className="text-label-md text-[#434654] block mb-2 font-semibold">
              Select Demo Amount
            </label>
            <div className="grid grid-cols-2 gap-2">
              {config.amounts.map((amt) => {
                const isSelected = selectedAmount === amt;
                return (
                  <button
                    key={amt}
                    type="button"
                    onClick={() => setSelectedAmount(amt)}
                    className={`py-3 px-4 rounded-xl font-bold text-center transition-all active:scale-95 border ${
                      isSelected
                        ? 'bg-[#1a56db] text-[#ffffff] border-[#1a56db] shadow-md'
                        : 'bg-[#f8f9ff] text-[#0b1c30] border-[#dce9ff] hover:bg-[#e5eeff]'
                    }`}
                  >
                    ${amt.toFixed(2)}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="bg-[#eff4ff] rounded-xl p-3 text-body-sm flex items-center justify-between">
            <span className="text-[#434654]">EasyPay Demo Balance</span>
            <span className="text-[#0b1c30] font-bold">${balance.toFixed(2)}</span>
          </div>

          <button
            onClick={handlePay}
            disabled={isProcessing}
            className="w-full h-14 bg-[#1a56db] hover:bg-[#003fb1] text-[#ffffff] text-label-lg font-bold rounded-xl shadow-md active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75"
          >
            {isProcessing ? (
              <>
                <span className="material-symbols-outlined animate-spin text-[20px]">
                  progress_activity
                </span>
                <span>Authorizing Instant Ledger...</span>
              </>
            ) : (
              <>
                <span className="material-symbols-outlined text-[20px]">bolt</span>
                <span>Pay ${selectedAmount.toFixed(2)} with EasyPay</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
