import React, { useState, useMemo } from 'react';
import { useWallet } from '../context/WalletContext';
import { Transaction } from '../types';

export const HistoryScreen: React.FC = () => {
  const { transactions, setSelectedReceipt, showToast } = useWallet();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<'all' | 'sent' | 'received' | 'pending' | 'month'>('all');

  const filterTabs = [
    { key: 'all', label: 'All' },
    { key: 'sent', label: 'Sent' },
    { key: 'received', label: 'Received' },
    { key: 'pending', label: 'Pending' },
    { key: 'month', label: 'This Month' },
  ] as const;

  // Filter logic
  const filteredTransactions = useMemo(() => {
    return transactions.filter((tx) => {
      // Category filter
      if (activeFilter === 'sent' && tx.type !== 'sent') return false;
      if (activeFilter === 'received' && tx.type !== 'received') return false;
      if (activeFilter === 'pending' && tx.status !== 'Pending') return false;
      if (activeFilter === 'month' && tx.dateGroup !== 'Today' && tx.dateGroup !== 'Yesterday') return false;

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchTitle = tx.title.toLowerCase().includes(q);
        const matchRef = tx.refId.toLowerCase().includes(q);
        const matchRecipient = tx.recipient.toLowerCase().includes(q);
        const matchSender = tx.sender.toLowerCase().includes(q);
        const matchAmount = tx.amount.toString().includes(q);
        const matchSubtitle = tx.subtitle.toLowerCase().includes(q);
        if (!matchTitle && !matchRef && !matchRecipient && !matchSender && !matchAmount && !matchSubtitle) {
          return false;
        }
      }

      return true;
    });
  }, [transactions, activeFilter, searchQuery]);

  // Group by dateGroup
  const grouped = useMemo(() => {
    const groups: { label: string; items: Transaction[] }[] = [];
    const order: ('Today' | 'Yesterday' | 'May 2025' | 'Earlier')[] = [
      'Today',
      'Yesterday',
      'May 2025',
      'Earlier'
    ];

    for (const grp of order) {
      const items = filteredTransactions.filter((tx) => tx.dateGroup === grp);
      if (items.length > 0) {
        groups.push({ label: grp, items });
      }
    }
    return groups;
  }, [filteredTransactions]);

  // Compute monthly totals
  const totalSent = useMemo(() => {
    return transactions
      .filter((t) => t.type === 'sent')
      .reduce((sum, t) => sum + t.amount, 0);
  }, [transactions]);

  const totalReceived = useMemo(() => {
    return transactions
      .filter((t) => t.type === 'received')
      .reduce((sum, t) => sum + t.amount, 0);
  }, [transactions]);

  const handleResetSearch = () => {
    setSearchQuery('');
    setActiveFilter('all');
  };

  return (
    <div className="flex-1 flex flex-col relative w-full pt-16 pb-20 bg-[#f8f9ff]">
      <div className="px-gutter max-w-lg mx-auto w-full pt-4 pb-8 space-y-4">
        {/* Search Bar */}
        <div className="relative flex items-center w-full">
          <span className="material-symbols-outlined absolute left-3.5 text-[20px] text-[#737686] pointer-events-none">
            search
          </span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by name, ID or amount..."
            className="w-full h-12 pl-11 pr-10 rounded-xl bg-[#ffffff] text-[#0b1c30] text-body-md placeholder:text-[#737686] shadow-xs focus:outline-none focus:ring-2 focus:ring-[#003fb1] transition-all border border-[#eff4ff]"
          />
          {searchQuery ? (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 text-[#737686] hover:text-[#0b1c30] p-1 flex items-center justify-center cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">close</span>
            </button>
          ) : (
            <button
              onClick={() => showToast('Filters and sorting active', 'tune')}
              className="absolute right-3 text-[#737686] hover:text-[#0b1c30] p-1 flex items-center justify-center rounded-lg cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">tune</span>
            </button>
          )}
        </div>

        {/* Filter Pills (Horizontal Scroll) */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-0.5">
          {filterTabs.map((tab) => {
            const isSelected = activeFilter === tab.key;
            return (
              <button
                key={tab.key}
                onClick={() => {
                  setActiveFilter(tab.key);
                  showToast(`Filtered by ${tab.label}`, 'filter_list');
                }}
                className={`px-4 py-1.5 rounded-full text-label-md transition-all whitespace-nowrap cursor-pointer font-bold ${
                  isSelected
                    ? 'bg-[#003fb1] text-[#ffffff] shadow-xs'
                    : 'bg-[#e5eeff] text-[#434654] hover:bg-[#dce9ff]'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Monthly Summary Bento Card */}
        <div className="bg-[#ffffff] rounded-2xl p-4 shadow-xs relative overflow-hidden border border-[#eff4ff]">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-1.5">
              <span
                className="material-symbols-outlined text-[20px] text-[#003fb1]"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                calendar_month
              </span>
              <span className="text-headline-sm text-[#0b1c30] font-bold">Current Cycle</span>
            </div>
            <span className="px-2.5 py-0.5 rounded-full bg-[#dce9ff] text-[#003fb1] text-label-sm font-bold">
              Active Period
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-1">
            {/* Sent Sub-block */}
            <div className="bg-[#eff4ff] rounded-xl p-3 flex flex-col justify-between border border-[#dce9ff]/40">
              <div className="flex items-center justify-between mb-1">
                <span className="text-label-sm text-[#434654] font-semibold">Total Sent</span>
                <span className="material-symbols-outlined text-[16px] text-[#ba1a1a]">
                  arrow_outward
                </span>
              </div>
              <span className="text-headline-sm text-[#0b1c30] tracking-tight font-extrabold">
                ${totalSent.toFixed(2)}
              </span>
              <div className="w-full bg-[#d3e4fe] rounded-full h-1 mt-2 overflow-hidden">
                <div
                  className="bg-[#003fb1] h-full rounded-full"
                  style={{ width: `${Math.min(100, (totalSent / 1000) * 100)}%` }}
                ></div>
              </div>
            </div>

            {/* Received Sub-block */}
            <div className="bg-[#eff4ff] rounded-xl p-3 flex flex-col justify-between border border-[#dce9ff]/40">
              <div className="flex items-center justify-between mb-1">
                <span className="text-label-sm text-[#006c49] font-bold">Total Received</span>
                <span className="material-symbols-outlined text-[16px] text-[#006c49]">
                  arrow_downward
                </span>
              </div>
              <span className="text-headline-sm text-[#006c49] tracking-tight font-extrabold">
                ${totalReceived.toFixed(2)}
              </span>
              <div className="w-full bg-[#d3e4fe] rounded-full h-1 mt-2 overflow-hidden">
                <div
                  className="bg-[#006c49] h-full rounded-full"
                  style={{ width: `${Math.min(100, (totalReceived / 1000) * 100)}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Transaction Groups */}
        {grouped.length > 0 ? (
          <div className="space-y-4 pt-1">
            {grouped.map((group) => (
              <div key={group.label} className="space-y-2">
                <div className="flex items-center justify-between px-1">
                  <span className="text-label-md text-[#434654] uppercase tracking-wider font-bold">
                    {group.label}
                  </span>
                  <span className="text-label-sm text-[#737686]">
                    {group.items.length} {group.items.length === 1 ? 'transaction' : 'transactions'}
                  </span>
                </div>

                <div className="space-y-2">
                  {group.items.map((tx) => {
                    const isReceived = tx.type === 'received';
                    const isSuccess = tx.status === 'Success';
                    return (
                      <div
                        key={tx.id}
                        onClick={() => setSelectedReceipt(tx)}
                        className="bg-[#ffffff] p-3 rounded-2xl flex items-center justify-between shadow-xs active:scale-[0.98] transition-transform cursor-pointer border border-[#eff4ff] hover:bg-[#eff4ff]"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <div
                            className={`relative w-11 h-11 rounded-full flex-shrink-0 flex items-center justify-center ${
                              isReceived
                                ? 'bg-[#6cf8bb]/40 text-[#00714d]'
                                : 'bg-[#e5eeff] text-[#0b1c30]'
                            }`}
                          >
                            <span className="material-symbols-outlined text-[22px]">
                              {isReceived
                                ? 'call_received'
                                : tx.category === 'food'
                                ? 'local_cafe'
                                : tx.category === 'shopping'
                                ? 'shopping_bag'
                                : 'call_made'}
                            </span>
                            <span
                              className={`absolute bottom-0 right-0 w-3 h-3 rounded-full ring-2 ring-[#ffffff] ${
                                isSuccess ? 'bg-[#006c49]' : 'bg-[#003fb1]'
                              }`}
                            ></span>
                          </div>

                          <div className="min-w-0">
                            <div className="text-[15px] leading-5 text-[#0b1c30] font-bold truncate">
                              {tx.title}
                            </div>
                            <div className="text-body-sm text-[#434654] truncate">
                              {tx.subtitle}
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-col items-end gap-1 flex-shrink-0 pl-2">
                          <span
                            className={`text-[15px] font-extrabold ${
                              isReceived ? 'text-[#006c49]' : 'text-[#0b1c30]'
                            }`}
                          >
                            {isReceived ? '+' : '-'}${tx.amount.toFixed(2)}
                          </span>

                          <span
                            className={`inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full text-label-sm text-[10px] font-bold ${
                              isSuccess
                                ? 'bg-[#6cf8bb] text-[#00714d]'
                                : 'bg-[#dbe1ff] text-[#003dab]'
                            }`}
                          >
                            {isSuccess ? (
                              <>
                                <span
                                  className="material-symbols-outlined text-[11px]"
                                  style={{ fontVariationSettings: "'FILL' 1" }}
                                >
                                  check_circle
                                </span>
                                <span>Success</span>
                              </>
                            ) : (
                              <>
                                <span className="material-symbols-outlined text-[11px] animate-spin">
                                  sync
                                </span>
                                <span>Pending</span>
                              </>
                            )}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="flex flex-col items-center justify-center py-12 text-center space-y-3">
            <div className="w-16 h-16 rounded-full bg-[#e5eeff] flex items-center justify-center text-[#737686]">
              <span className="material-symbols-outlined text-[32px]">receipt_long</span>
            </div>
            <div>
              <p className="text-headline-sm text-[#0b1c30] font-bold">No transactions found</p>
              <p className="text-body-sm text-[#434654] mt-1">
                Try tweaking your search keywords or clear current filters.
              </p>
            </div>
            <button
              onClick={handleResetSearch}
              className="px-4 py-2 rounded-xl bg-[#003fb1] text-[#ffffff] text-label-md font-bold shadow-xs cursor-pointer active:scale-95 transition-all"
            >
              Reset Search
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
