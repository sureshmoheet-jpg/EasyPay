import React from 'react';
import { useWallet } from '../context/WalletContext';

export const ReceiptModal: React.FC = () => {
  const { selectedReceipt, setSelectedReceipt, showToast, setSendPrefill, setActiveTab } = useWallet();

  if (!selectedReceipt) return null;

  const isSuccess = selectedReceipt.status === 'Success';
  const isReceived = selectedReceipt.type === 'received';

  const copyRefId = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(selectedReceipt.refId).catch(() => {});
    }
    showToast(`Copied Reference ID: ${selectedReceipt.refId}`, 'content_copy');
  };

  const handleRepeatPayment = () => {
    setSendPrefill({
      name: selectedReceipt.recipient,
      handle: selectedReceipt.recipientHandle,
      avatar: selectedReceipt.avatar
    });
    setSelectedReceipt(null);
    setActiveTab('send');
    showToast(`Prefilled transfer for ${selectedReceipt.recipient}`, 'send');
  };

  const handleDownloadPdf = () => {
    showToast('Generating & downloading PDF receipt...', 'download');
    setTimeout(() => {
      showToast('PDF Receipt saved to device', 'check_circle');
    }, 1200);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: `EasyPay Receipt: $${selectedReceipt.amount.toFixed(2)}`,
          text: `Payment of $${selectedReceipt.amount.toFixed(2)} (${selectedReceipt.refId}) on EasyPay Demo Wallet.`,
          url: window.location.href
        })
        .catch(() => {});
    } else {
      copyRefId();
      showToast('Receipt details copied to clipboard', 'share');
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-[#213145]/50 backdrop-blur-sm transition-opacity duration-300 flex items-end sm:items-center sm:justify-center p-0 sm:p-4"
      onClick={() => setSelectedReceipt(null)}
    >
      <div
        className="w-full sm:max-w-md bg-[#ffffff] rounded-t-3xl sm:rounded-2xl max-h-[90vh] overflow-y-auto shadow-2xl flex flex-col animate-in slide-in-from-bottom duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drag handle */}
        <div className="w-full flex justify-center pt-3 pb-1 sm:hidden">
          <div className="w-10 h-1 rounded-full bg-[#c3c5d7]"></div>
        </div>

        {/* Header */}
        <div className="px-gutter pt-2 pb-2 flex items-center justify-between border-b border-[#eff4ff]">
          <span className="text-label-md text-[#434654] uppercase tracking-wider font-bold">
            Transaction Receipt
          </span>
          <button
            aria-label="Close"
            onClick={() => setSelectedReceipt(null)}
            className="w-8 h-8 rounded-full bg-[#e5eeff] flex items-center justify-center text-[#434654] hover:text-[#0b1c30] transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* Content */}
        <div className="p-space-md space-y-space-md">
          {/* Status Hero */}
          <div className="flex flex-col items-center text-center space-y-2">
            <div
              className={`w-16 h-16 rounded-full flex items-center justify-center shadow-sm ${
                isSuccess
                  ? 'bg-[#6cf8bb] text-[#006c49]'
                  : 'bg-[#dbe1ff] text-[#003fb1]'
              }`}
            >
              <span
                className="material-symbols-outlined text-[36px]"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                {isSuccess ? 'check_circle' : 'pending'}
              </span>
            </div>
            <div>
              <div className="text-headline-sm text-[#0b1c30] font-bold">
                {isSuccess
                  ? isReceived
                    ? 'Payment Received'
                    : 'Payment Successful'
                  : 'Payment Pending'}
              </div>
              <div className="text-body-sm text-[#434654] mt-0.5">
                {selectedReceipt.timestamp}
              </div>
            </div>

            {/* Amount */}
            <div className="text-display-currency-mobile text-[#0b1c30] tracking-tight font-extrabold pt-1">
              ${selectedReceipt.amount.toFixed(2)}
            </div>
          </div>

          {/* Ledger Details Box */}
          <div className="bg-[#eff4ff] rounded-xl p-space-sm space-y-2.5">
            <div className="flex items-center justify-between text-body-sm">
              <span className="text-[#434654]">Reference ID</span>
              <div className="flex items-center gap-1 text-label-md text-[#0b1c30]">
                <span className="font-mono text-[12px]">{selectedReceipt.refId}</span>
                <button
                  onClick={copyRefId}
                  className="text-[#003fb1] hover:text-[#0040ae] p-0.5"
                  title="Copy ID"
                >
                  <span className="material-symbols-outlined text-[14px]">content_copy</span>
                </button>
              </div>
            </div>

            <div className="flex flex-col gap-0.5 text-body-sm pt-1 border-t border-[#dce9ff]/50">
              <span className="text-[#434654]">Recipient</span>
              <span className="text-label-md text-[#0b1c30] font-semibold break-words">
                {selectedReceipt.recipient}{' '}
                <span className="text-xs text-[#737686] font-normal">
                  ({selectedReceipt.recipientHandle})
                </span>
              </span>
            </div>

            <div className="flex flex-col gap-0.5 text-body-sm pt-1 border-t border-[#dce9ff]/50">
              <span className="text-[#434654]">Sender</span>
              <span className="text-label-md text-[#0b1c30] font-semibold break-words">
                {selectedReceipt.sender}{' '}
                <span className="text-xs text-[#737686] font-normal">
                  ({selectedReceipt.senderHandle})
                </span>
              </span>
            </div>

            <div className="flex items-center justify-between text-body-sm pt-1 border-t border-[#dce9ff]/50">
              <span className="text-[#434654]">Payment Method</span>
              <div className="flex items-center gap-1.5 text-label-md text-[#0b1c30] font-semibold">
                <span className="material-symbols-outlined text-[16px] text-[#003fb1]">
                  account_balance_wallet
                </span>
                <span>{selectedReceipt.paymentMethod}</span>
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="space-y-space-xs pt-1">
            <div className="grid grid-cols-2 gap-space-xs">
              <button
                onClick={handleShare}
                className="h-11 rounded-xl bg-[#dce9ff] hover:bg-[#e5eeff] text-[#003fb1] text-label-md font-bold flex items-center justify-center gap-1.5 transition-all active:scale-95"
              >
                <span className="material-symbols-outlined text-[18px]">share</span>
                <span>Share</span>
              </button>
              <button
                onClick={handleDownloadPdf}
                className="h-11 rounded-xl bg-[#003fb1] text-[#ffffff] text-label-md font-bold flex items-center justify-center gap-1.5 shadow-sm hover:bg-[#1a56db] transition-all active:scale-95"
              >
                <span className="material-symbols-outlined text-[18px]">download</span>
                <span>PDF Receipt</span>
              </button>
            </div>

            <button
              onClick={handleRepeatPayment}
              className="w-full h-11 rounded-xl bg-[#eff4ff] hover:bg-[#dce9ff] text-[#0b1c30] text-label-md font-semibold flex items-center justify-center gap-2 transition-all active:scale-95"
            >
              <span className="material-symbols-outlined text-[18px] text-[#003fb1]">replay</span>
              <span>Repeat Payment</span>
            </button>

            <button
              onClick={() => showToast('Support ticket draft initialized #EP-HELP-892', 'flag')}
              className="w-full py-2 text-center text-[#ba1a1a] text-label-sm font-semibold flex items-center justify-center gap-1 hover:underline"
            >
              <span className="material-symbols-outlined text-[14px]">flag</span>
              <span>Report an Issue</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
