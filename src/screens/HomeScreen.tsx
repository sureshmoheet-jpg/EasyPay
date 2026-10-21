import React from 'react';
import { useWallet } from '../context/WalletContext';

export const HomeScreen: React.FC = () => {
  const {
    balance,
    isBalanceHidden,
    toggleBalanceVisibility,
    addFunds,
    setActiveTab,
    setIsQrScannerOpen,
    setActiveBillService,
    setSelectedReceipt,
    setSendPrefill,
    showToast,
    contacts,
    transactions
  } = useWallet();

  const formatCurrency = (amt: number) => {
    return '$' + amt.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  const copyId = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText('alex.pay@easypay').catch(() => {});
    }
    showToast('EasyPay ID copied to clipboard: alex.pay@easypay', 'content_copy');
  };

  const handleQuickSend = (contact: { name: string; handle: string; avatar?: string }) => {
    setSendPrefill({
      name: contact.name,
      handle: contact.handle,
      avatar: contact.avatar
    });
    setActiveTab('send');
    showToast(`Quick Transfer to ${contact.name}`, 'send');
  };

  // Recent 3 transactions for preview
  const recentActivities = transactions.slice(0, 3);

  return (
    <div className="flex-1 flex flex-col relative w-full pt-16 pb-20 bg-[#f8f9ff]">
      <div className="px-gutter max-w-lg mx-auto w-full pt-3 pb-8 flex flex-col gap-5">
        {/* Demo Mode Ribbon */}
        <div className="w-full bg-[#dce9ff] rounded-xl p-3 flex items-center gap-space-sm text-[#0b1c30] shadow-xs border border-[#eff4ff]">
          <div className="w-8 h-8 rounded-full bg-[#1a56db] text-[#ffffff] flex items-center justify-center flex-shrink-0">
            <span className="material-symbols-outlined text-[18px]">info</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-label-md text-[#003fb1] font-bold">Demo Wallet</p>
            <p className="text-body-sm text-[#434654] truncate">
              Simulated payments with virtual balance
            </p>
          </div>
          <span className="material-symbols-outlined text-[#737686] text-[18px]">lock</span>
        </div>

        {/* Balance Card */}
        <div className="relative w-full rounded-2xl bg-gradient-to-br from-[#1a56db] via-[#003fb1] to-[#0040ae] text-[#ffffff] p-5 shadow-xl overflow-hidden">
          {/* Decorative Glow Shape */}
          <div className="absolute -right-8 -top-8 w-44 h-44 rounded-full bg-[#6cf8bb]/20 blur-2xl pointer-events-none"></div>
          <div className="absolute -left-12 -bottom-12 w-36 h-36 rounded-full bg-[#0856de]/40 blur-xl pointer-events-none"></div>

          <div className="relative z-10 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-label-md text-[#d4dcff] tracking-wide uppercase font-semibold">
                  Available Balance
                </span>
                <button
                  aria-label="Toggle balance visibility"
                  onClick={toggleBalanceVisibility}
                  className="w-8 h-8 rounded-full flex items-center justify-center text-[#d4dcff] hover:text-[#ffffff] hover:bg-[#ffffff]/15 transition-colors cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[20px]">
                    {isBalanceHidden ? 'visibility_off' : 'visibility'}
                  </span>
                </button>
              </div>

              <span className="px-2.5 py-1 rounded-full bg-[#6cf8bb] text-[#00714d] text-label-sm font-bold flex items-center gap-1 shadow-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-[#006c49] animate-pulse"></span>
                ACTIVE
              </span>
            </div>

            <div className="flex flex-col">
              <div className="flex items-baseline gap-1">
                <span className="text-display-currency-mobile text-[36px] tracking-tight drop-shadow-sm font-extrabold">
                  {isBalanceHidden ? '••••••••' : formatCurrency(balance)}
                </span>
              </div>
              <div className="flex items-center gap-1.5 mt-1 text-[#d4dcff]">
                <span className="text-label-sm tracking-wide">ID:</span>
                <span className="text-label-md font-semibold select-all">alex.pay@easypay</span>
                <button
                  onClick={copyId}
                  className="w-6 h-6 flex items-center justify-center rounded-full hover:bg-[#ffffff]/20 transition-colors cursor-pointer"
                  title="Copy EasyPay ID"
                >
                  <span className="material-symbols-outlined text-[14px]">content_copy</span>
                </button>
              </div>
            </div>

            <div className="pt-2 flex items-center justify-between">
              <button
                onClick={() => addFunds(500)}
                className="px-4 py-2 rounded-full bg-[#ffffff] text-[#003fb1] text-label-md font-bold flex items-center gap-1.5 shadow-md active:scale-95 transition-transform cursor-pointer hover:bg-[#eff4ff]"
              >
                <span className="material-symbols-outlined text-[18px]">add_circle</span>
                Add Demo Funds
              </button>
              <span className="text-body-sm text-[#d4dcff] opacity-90 flex items-center gap-1">
                <span className="material-symbols-outlined text-[16px]">verified_user</span> Instant Safe
              </span>
            </div>
          </div>
        </div>

        {/* Primary Quick Actions (4 Large Action Bubbles) */}
        <div className="flex flex-col gap-2">
          <div className="grid grid-cols-4 gap-2">
            {/* 1. Send Money */}
            <button
              onClick={() => setActiveTab('send')}
              className="group flex flex-col items-center gap-2 active:scale-95 transition-all text-center cursor-pointer"
            >
              <div className="w-16 h-16 rounded-2xl bg-[#003fb1] text-[#ffffff] flex items-center justify-center shadow-lg group-hover:bg-[#1a56db] transition-colors">
                <span
                  className="material-symbols-outlined text-[28px]"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  send_money
                </span>
              </div>
              <span className="text-label-md text-[#0b1c30] font-semibold leading-tight">
                Send
                <br />
                Money
              </span>
            </button>

            {/* 2. Receive Money */}
            <button
              onClick={() => setActiveTab('receive')}
              className="group flex flex-col items-center gap-2 active:scale-95 transition-all text-center cursor-pointer"
            >
              <div className="w-16 h-16 rounded-2xl bg-[#dce9ff] text-[#003fb1] flex items-center justify-center shadow-xs group-hover:bg-[#d3e4fe] transition-colors">
                <span
                  className="material-symbols-outlined text-[28px]"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  qr_code_2
                </span>
              </div>
              <span className="text-label-md text-[#0b1c30] font-semibold leading-tight">
                Receive
                <br />
                Money
              </span>
            </button>

            {/* 3. Scan QR */}
            <button
              onClick={() => setIsQrScannerOpen(true)}
              className="group flex flex-col items-center gap-2 active:scale-95 transition-all text-center cursor-pointer"
            >
              <div className="w-16 h-16 rounded-2xl bg-[#006c49] text-[#ffffff] flex items-center justify-center shadow-md group-hover:opacity-90 transition-opacity">
                <span className="material-symbols-outlined text-[28px]">qr_code_scanner</span>
              </div>
              <span className="text-label-md text-[#0b1c30] font-semibold leading-tight">
                Scan
                <br />
                QR
              </span>
            </button>

            {/* 4. Ledger History */}
            <button
              onClick={() => setActiveTab('history')}
              className="group flex flex-col items-center gap-2 active:scale-95 transition-all text-center cursor-pointer"
            >
              <div className="w-16 h-16 rounded-2xl bg-[#e5eeff] text-[#0b1c30] flex items-center justify-center shadow-xs group-hover:bg-[#dce9ff] transition-colors">
                <span className="material-symbols-outlined text-[28px]">receipt_long</span>
              </div>
              <span className="text-label-md text-[#0b1c30] font-semibold leading-tight">
                Ledger
                <br />
                History
              </span>
            </button>
          </div>
        </div>

        {/* Recent People (Horizontal Carousel) */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <h2 className="text-headline-sm text-[#0b1c30] font-bold">Recent People</h2>
            <button
              onClick={() => setActiveTab('send')}
              className="text-label-md text-[#003fb1] font-semibold hover:underline cursor-pointer"
            >
              View All
            </button>
          </div>

          <div className="flex items-start gap-4 overflow-x-auto pb-1 scrollbar-none">
            {/* New Payee Add */}
            <button
              onClick={() => setActiveTab('send')}
              className="flex flex-col items-center gap-1.5 flex-shrink-0 group cursor-pointer"
            >
              <div className="w-14 h-14 rounded-full bg-[#dce9ff] flex items-center justify-center text-[#003fb1] group-hover:bg-[#003fb1] group-hover:text-[#ffffff] transition-all shadow-xs">
                <span className="material-symbols-outlined text-[26px]">person_add</span>
              </div>
              <span className="text-label-sm text-[#0b1c30] font-medium truncate max-w-[64px]">
                New Pay
              </span>
            </button>

            {/* People items */}
            {contacts.map((contact) => (
              <button
                key={contact.id}
                onClick={() => handleQuickSend(contact)}
                className="flex flex-col items-center gap-1.5 flex-shrink-0 group cursor-pointer active:scale-95 transition-transform"
              >
                <div className="relative w-14 h-14 rounded-full p-0.5 bg-gradient-to-tr from-[#003fb1] to-[#6cf8bb]">
                  {contact.avatar ? (
                    <img
                      className="w-full h-full object-cover rounded-full bg-[#e5eeff]"
                      src={contact.avatar}
                      alt={contact.name}
                    />
                  ) : (
                    <div className="w-full h-full rounded-full bg-[#dbe1ff] flex items-center justify-center text-[#00174d]">
                      <span className="material-symbols-outlined text-[24px]">coffee</span>
                    </div>
                  )}
                  {contact.isOnline && (
                    <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-[#006c49] rounded-full ring-2 ring-[#ffffff]"></span>
                  )}
                </div>
                <span className="text-label-sm text-[#0b1c30] font-semibold truncate max-w-[64px]">
                  {contact.name}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Quick Services & Bills */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <h2 className="text-headline-sm text-[#0b1c30] font-bold">Quick Services &amp; Bills</h2>
            <span className="text-label-sm text-[#006c49] bg-[#6ffbbe]/50 px-2.5 py-0.5 rounded-full font-bold">
              0% FEE
            </span>
          </div>

          <div className="grid grid-cols-4 gap-2.5">
            {/* Service 1: Mobile Recharge */}
            <button
              onClick={() => setActiveBillService('recharge')}
              className="p-3 rounded-2xl bg-[#eff4ff] hover:bg-[#e5eeff] flex flex-col items-center gap-2 transition-colors active:scale-95 text-center cursor-pointer border border-[#dce9ff]/40"
            >
              <div className="w-11 h-11 rounded-xl bg-[#d3e4fe] text-[#003fb1] flex items-center justify-center">
                <span className="material-symbols-outlined text-[22px]">phone_android</span>
              </div>
              <span className="text-label-sm text-[#0b1c30] font-medium leading-tight">
                Mobile
                <br />
                Recharge
              </span>
            </button>

            {/* Service 2: Electricity */}
            <button
              onClick={() => setActiveBillService('electricity')}
              className="p-3 rounded-2xl bg-[#eff4ff] hover:bg-[#e5eeff] flex flex-col items-center gap-2 transition-colors active:scale-95 text-center cursor-pointer border border-[#dce9ff]/40"
            >
              <div className="w-11 h-11 rounded-xl bg-[#d3e4fe] text-[#006c49] flex items-center justify-center">
                <span className="material-symbols-outlined text-[22px]">bolt</span>
              </div>
              <span className="text-label-sm text-[#0b1c30] font-medium leading-tight">
                Electricity
                <br />
                Bills
              </span>
            </button>

            {/* Service 3: Dining */}
            <button
              onClick={() => setActiveBillService('dining')}
              className="p-3 rounded-2xl bg-[#eff4ff] hover:bg-[#e5eeff] flex flex-col items-center gap-2 transition-colors active:scale-95 text-center cursor-pointer border border-[#dce9ff]/40"
            >
              <div className="w-11 h-11 rounded-xl bg-[#d3e4fe] text-[#0856de] flex items-center justify-center">
                <span className="material-symbols-outlined text-[22px]">fastfood</span>
              </div>
              <span className="text-label-sm text-[#0b1c30] font-medium leading-tight">
                Dining &amp;
                <br />
                Food
              </span>
            </button>

            {/* Service 4: Metro */}
            <button
              onClick={() => setActiveBillService('transit')}
              className="p-3 rounded-2xl bg-[#eff4ff] hover:bg-[#e5eeff] flex flex-col items-center gap-2 transition-colors active:scale-95 text-center cursor-pointer border border-[#dce9ff]/40"
            >
              <div className="w-11 h-11 rounded-xl bg-[#d3e4fe] text-[#003fb1] flex items-center justify-center">
                <span className="material-symbols-outlined text-[22px]">subway</span>
              </div>
              <span className="text-label-sm text-[#0b1c30] font-medium leading-tight">
                Transit
                <br />
                Metro
              </span>
            </button>
          </div>
        </div>

        {/* Recent Activity Section */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <h2 className="text-headline-sm text-[#0b1c30] font-bold">Recent Activity</h2>
            <button
              onClick={() => setActiveTab('history')}
              className="text-label-md text-[#003fb1] font-semibold hover:underline cursor-pointer"
            >
              Full Statement
            </button>
          </div>

          <div className="flex flex-col gap-2.5">
            {recentActivities.map((tx) => {
              const isReceived = tx.type === 'received';
              return (
                <div
                  key={tx.id}
                  onClick={() => setSelectedReceipt(tx)}
                  className="p-3.5 rounded-2xl bg-[#ffffff] shadow-xs flex items-center justify-between gap-3 hover:bg-[#eff4ff] transition-colors cursor-pointer border border-[#eff4ff] active:scale-[0.99]"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className={`w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0 ${
                        isReceived
                          ? 'bg-[#6cf8bb] text-[#00714d]'
                          : 'bg-[#dce9ff] text-[#0b1c30]'
                      }`}
                    >
                      <span className="material-symbols-outlined text-[22px]">
                        {isReceived ? 'call_received' : 'call_made'}
                      </span>
                    </div>

                    <div className="flex flex-col min-w-0">
                      <span className="text-label-lg text-[#0b1c30] font-bold truncate">
                        {tx.title}
                      </span>
                      <div className="flex items-center gap-1.5">
                        <span className="text-body-sm text-[#434654]">{tx.timestamp}</span>
                        <span
                          className={`inline-flex items-center px-1.5 py-0.2 rounded text-label-sm text-[10px] font-bold ${
                            tx.status === 'Success'
                              ? 'bg-[#6ffbbe]/40 text-[#005236]'
                              : 'bg-[#dce9ff] text-[#003fb1]'
                          }`}
                        >
                          {tx.status}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col items-end flex-shrink-0">
                    <span
                      className={`text-label-lg font-extrabold tabular-nums ${
                        isReceived ? 'text-[#006c49]' : 'text-[#0b1c30]'
                      }`}
                    >
                      {isReceived ? '+' : '-'}${tx.amount.toFixed(2)}
                    </span>
                    <span className="text-body-sm text-[#434654] text-[11px]">
                      {tx.paymentMethod}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
