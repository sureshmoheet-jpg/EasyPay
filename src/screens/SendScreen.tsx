import React, { useState, useEffect } from 'react';
import { useWallet } from '../context/WalletContext';

export const SendScreen: React.FC = () => {
  const {
    balance,
    sendMoney,
    sendPrefill,
    setSendPrefill,
    setActiveTab,
    showToast
  } = useWallet();

  const [recipient, setRecipient] = useState('priya@easypay');
  const [recipientName, setRecipientName] = useState('Priya Sharma');
  const [recipientAvatar, setRecipientAvatar] = useState(
    'https://lh3.googleusercontent.com/aida-public/AB6AXuBQoa7ZGK_D_1viKu9f0_pb1KxWBXU8LI2zvq3kLgk-9KKH70jEbTsI_57ZnsKQo87GSwnHi_EuHwULIps8-4O81gfjNCyjp5q5x8TbsdryYyXmVt8c0Aya8MJZl8dsPxtJ83VxNr5r0QPFBxeo7je30lCS4ZtqJSg2MLjE9E8QkgHEP0RRySJ-TkDPveZwEbH6xvWD2123od1JMIBTQkN7LoscPaGMjqfv4awYysRkzKUP_zymlF2_'
  );
  const [amount, setAmount] = useState('75.00');
  const [note, setNote] = useState('Dinner split 🍕');
  const [isSending, setIsSending] = useState(false);
  const [successTx, setSuccessTx] = useState<{
    amount: number;
    recipientName: string;
    refId: string;
  } | null>(null);

  // If navigated here with a prefill from Home or History
  useEffect(() => {
    if (sendPrefill) {
      setRecipient(sendPrefill.handle);
      setRecipientName(sendPrefill.name);
      if (sendPrefill.avatar) {
        setRecipientAvatar(sendPrefill.avatar);
      }
      setSendPrefill(null);
    }
  }, [sendPrefill, setSendPrefill]);

  const numAmount = parseFloat(amount) || 0;

  const handleAddAmount = (delta: number) => {
    const current = parseFloat(amount) || 0;
    setAmount((current + delta).toFixed(2));
  };

  const handleClearAmount = () => {
    setAmount('0.00');
  };

  const handleSelectQuickFavorite = (name: string, handle: string, avatarUrl?: string) => {
    setRecipient(handle);
    setRecipientName(name);
    if (avatarUrl) {
      setRecipientAvatar(avatarUrl);
    }
    showToast(`Recipient selected: ${name}`, 'person');
  };

  const handleConfirmSend = () => {
    if (numAmount <= 0) {
      showToast('Please enter an amount greater than $0.00', 'error');
      return;
    }
    if (numAmount > balance) {
      showToast('Amount exceeds available demo wallet balance!', 'error');
      return;
    }

    setIsSending(true);

    setTimeout(() => {
      const tx = sendMoney(
        recipientName || recipient,
        recipient,
        numAmount,
        note,
        recipientAvatar
      );
      setIsSending(false);
      setSuccessTx({
        amount: numAmount,
        recipientName: recipientName || recipient,
        refId: tx.refId
      });
    }, 1100);
  };

  const handleDoneReturnHome = () => {
    setSuccessTx(null);
    setActiveTab('home');
    showToast('Payment confirmed and recorded in ledger!', 'check_circle');
  };

  const handleSendAnother = () => {
    setSuccessTx(null);
    setAmount('50.00');
    setNote('');
  };

  return (
    <div className="flex-1 flex flex-col relative w-full pt-16 pb-20 bg-[#f8f9ff]">
      <div className="px-gutter max-w-lg mx-auto w-full pt-4 pb-8 flex flex-col gap-4">
        {/* Top Header */}
        <div className="flex items-center justify-between">
          <div>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#dce9ff] text-[#003fb1] text-label-sm font-bold mb-1">
              <span className="material-symbols-outlined text-[14px]">bolt</span> Instant Transfer
            </span>
            <h1 className="text-headline-lg-mobile text-[#0b1c30] font-bold">Send Money</h1>
          </div>
          <div className="flex items-center gap-1.5 bg-[#6cf8bb]/40 px-3 py-1.5 rounded-full border border-[#6cf8bb]">
            <span className="w-2 h-2 rounded-full bg-[#006c49] animate-pulse"></span>
            <span className="text-label-sm text-[#00714d] font-bold">0% Demo Fee</span>
          </div>
        </div>

        {/* Recipient Search & Input */}
        <div className="flex flex-col gap-1">
          <label className="text-label-md text-[#434654] flex items-center justify-between font-semibold">
            <span>To Recipient</span>
            <span className="text-[#003fb1] text-label-sm font-bold">Demo Contact</span>
          </label>
          <div className="relative flex items-center">
            <div className="absolute left-3.5 flex items-center pointer-events-none text-[#003fb1]">
              <span className="material-symbols-outlined text-[20px]">alternate_email</span>
            </div>
            <input
              type="text"
              value={recipient}
              onChange={(e) => {
                const val = e.target.value;
                setRecipient(val);
                if (val.includes('@')) {
                  const prefix = val.split('@')[0];
                  setRecipientName(prefix.charAt(0).toUpperCase() + prefix.slice(1));
                } else {
                  setRecipientName(val || 'Recipient');
                }
              }}
              placeholder="Name, mobile or @easypay ID"
              className="w-full h-[52px] pl-10 pr-12 rounded-xl bg-[#ffffff] text-[#0b1c30] text-body-md placeholder:text-[#737686] shadow-xs focus:outline-none focus:ring-2 focus:ring-[#003fb1] transition-all border border-[#eff4ff]"
            />
            <button
              type="button"
              onClick={() => showToast('Demo directory loaded with 6 contacts', 'contacts')}
              className="absolute right-2 w-9 h-9 rounded-lg bg-[#e5eeff] flex items-center justify-center text-[#003fb1] hover:bg-[#dce9ff] active:scale-95 transition-all cursor-pointer"
              title="Select from contacts"
            >
              <span className="material-symbols-outlined text-[20px]">contacts</span>
            </button>
          </div>
        </div>

        {/* Quick Favorites */}
        <div className="flex flex-col gap-1">
          <span className="text-label-sm text-[#434654] uppercase tracking-wider font-bold">
            Quick Favorites
          </span>
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {/* Sarah Miller */}
            <button
              type="button"
              onClick={() =>
                handleSelectQuickFavorite(
                  'Sarah Miller',
                  'sarah.m@easypay',
                  'https://lh3.googleusercontent.com/aida-public/AB6AXuDaNm9NznohJqVEoVtvXGoXe5X0WLtWu8V1dYKXWgovq9cBB1ZzR_pBSeMArd02Wu7oA_wDSQTbPA39ftMPlql5xTEjRO4sP7mfDujPb2FJ6hyNLMSCAMGPMl6eQj7FsxMiUW74UQ5TfXD3BEYPiygm60w3HBaa38hzZ4NWDCVPInWFOBBsp-nelyNYjcqCFdz2pNgIRlQKIZpM5eYq4qa-ru7v1QwcENg9TpoX_Wd7L1TZCCB2XQtS'
                )
              }
              className="group flex items-center gap-2 px-3 py-2 rounded-full bg-[#ffffff] hover:bg-[#eff4ff] shadow-xs flex-shrink-0 active:scale-95 transition-all text-left cursor-pointer border border-[#eff4ff]"
            >
              <img
                className="w-7 h-7 rounded-full object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDaNm9NznohJqVEoVtvXGoXe5X0WLtWu8V1dYKXWgovq9cBB1ZzR_pBSeMArd02Wu7oA_wDSQTbPA39ftMPlql5xTEjRO4sP7mfDujPb2FJ6hyNLMSCAMGPMl6eQj7FsxMiUW74UQ5TfXD3BEYPiygm60w3HBaa38hzZ4NWDCVPInWFOBBsp-nelyNYjcqCFdz2pNgIRlQKIZpM5eYq4qa-ru7v1QwcENg9TpoX_Wd7L1TZCCB2XQtS"
                alt="Sarah M."
              />
              <span className="text-label-md text-[#0b1c30] group-hover:text-[#003fb1] font-semibold">
                Sarah M.
              </span>
            </button>

            {/* Alex Chen */}
            <button
              type="button"
              onClick={() =>
                handleSelectQuickFavorite(
                  'Alex Chen',
                  '+1 555-0192',
                  'https://lh3.googleusercontent.com/aida-public/AB6AXuDM3kuulm3SNY56IqtxHttK2LQrxF_lH34-2iu0FkCCTHco--QxJpuO6WZubEdhqrib1FAmdWqgis7KphfFoUSb4fqXQXOGxjYS68gYUoyjC4Kq_Zrs_eC3moom_Z5RS5JqudOvvEAq_7Fte8M8uqi65By8tJeRIJRz7QLOwAle1KKtemehY-KG_-puvCvDVNmWwNEKSRFLtO8oLNby3KFF5asvJMfRttaNCH9RQDSWhAAoXH--tqyx'
                )
              }
              className="group flex items-center gap-2 px-3 py-2 rounded-full bg-[#ffffff] hover:bg-[#eff4ff] shadow-xs flex-shrink-0 active:scale-95 transition-all text-left cursor-pointer border border-[#eff4ff]"
            >
              <img
                className="w-7 h-7 rounded-full object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDM3kuulm3SNY56IqtxHttK2LQrxF_lH34-2iu0FkCCTHco--QxJpuO6WZubEdhqrib1FAmdWqgis7KphfFoUSb4fqXQXOGxjYS68gYUoyjC4Kq_Zrs_eC3moom_Z5RS5JqudOvvEAq_7Fte8M8uqi65By8tJeRIJRz7QLOwAle1KKtemehY-KG_-puvCvDVNmWwNEKSRFLtO8oLNby3KFF5asvJMfRttaNCH9RQDSWhAAoXH--tqyx"
                alt="Alex Chen"
              />
              <span className="text-label-md text-[#0b1c30] group-hover:text-[#003fb1] font-semibold">
                Alex Chen
              </span>
            </button>

            {/* Coffee Club */}
            <button
              type="button"
              onClick={() =>
                handleSelectQuickFavorite('Coffee Club Crew', 'split.coffee@easypay')
              }
              className="group flex items-center gap-2 px-3 py-2 rounded-full bg-[#ffffff] hover:bg-[#eff4ff] shadow-xs flex-shrink-0 active:scale-95 transition-all text-left cursor-pointer border border-[#eff4ff]"
            >
              <div className="w-7 h-7 rounded-full bg-[#dbe1ff] flex items-center justify-center text-[#003fb1]">
                <span className="material-symbols-outlined text-[16px]">local_cafe</span>
              </div>
              <span className="text-label-md text-[#0b1c30] group-hover:text-[#003fb1] font-semibold">
                Coffee Club
              </span>
            </button>
          </div>
        </div>

        {/* Amount Entry Section (Elevated Tactile Card) */}
        <div className="relative rounded-2xl bg-[#ffffff] p-4 sm:p-5 shadow-xs flex flex-col items-center justify-center gap-2 overflow-hidden border border-[#eff4ff]">
          <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-[#dbe1ff]/30 blur-2xl pointer-events-none"></div>
          <div className="absolute -bottom-10 -left-10 w-32 h-32 rounded-full bg-[#6ffbbe]/20 blur-2xl pointer-events-none"></div>

          <div className="flex items-center justify-between w-full">
            <span className="text-label-sm text-[#434654] uppercase tracking-wider font-bold">
              Amount to Transfer
            </span>
            <button
              type="button"
              onClick={handleClearAmount}
              className="text-label-sm text-[#003fb1] hover:underline font-bold cursor-pointer"
            >
              Reset
            </button>
          </div>

          {/* Large Editable Number */}
          <div className="flex items-baseline justify-center py-2 relative">
            <span className="text-display-currency-mobile text-[#737686] select-none mr-1 font-extrabold">
              $
            </span>
            <input
              type="number"
              step="any"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-48 text-center text-display-currency-mobile text-[#0b1c30] bg-transparent focus:outline-none tracking-tight font-extrabold"
            />
          </div>

          {/* Quick Amount Presets */}
          <div className="grid grid-cols-4 gap-2 w-full pt-1">
            {[10, 25, 50, 100].map((val) => (
              <button
                key={val}
                type="button"
                onClick={() => handleAddAmount(val)}
                className="h-9 rounded-full bg-[#e5eeff] hover:bg-[#dbe1ff] text-[#003fb1] text-label-md font-bold flex items-center justify-center active:scale-95 transition-all cursor-pointer"
              >
                +${val}
              </button>
            ))}
          </div>
        </div>

        {/* Note / Reason Input */}
        <div className="flex flex-col gap-1">
          <label className="text-label-md text-[#434654] flex items-center justify-between font-semibold">
            <span>Payment Note</span>
            <span className="text-body-sm text-[#737686]">Optional</span>
          </label>
          <div className="relative flex items-center">
            <div className="absolute left-3.5 flex items-center pointer-events-none text-[#434654]">
              <span className="material-symbols-outlined text-[18px]">edit_note</span>
            </div>
            <input
              type="text"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="What is this for? (e.g. Dinner split 🍕)"
              className="w-full h-12 pl-10 pr-10 rounded-xl bg-[#ffffff] text-[#0b1c30] text-body-md placeholder:text-[#737686] shadow-xs focus:outline-none focus:ring-2 focus:ring-[#003fb1] transition-all border border-[#eff4ff]"
            />
            <button
              type="button"
              onClick={() => setNote((prev) => prev + ' 🎉')}
              className="absolute right-2 px-2 py-1 rounded-lg text-body-lg text-label-sm hover:bg-[#e5eeff] transition-colors cursor-pointer"
              title="Add Emoji"
            >
              🍕
            </button>
          </div>
        </div>

        {/* Funding Source Selector */}
        <div className="flex flex-col gap-1">
          <span className="text-label-sm text-[#434654] uppercase tracking-wider font-bold">
            Pay From
          </span>
          <div className="w-full rounded-2xl bg-[#ffffff] p-4 shadow-xs flex items-center justify-between gap-3 border border-[#eff4ff]">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-11 h-11 rounded-xl bg-[#1a56db] text-[#ffffff] flex items-center justify-center flex-shrink-0 shadow-xs">
                <span className="material-symbols-outlined text-[24px]">
                  account_balance_wallet
                </span>
              </div>
              <div className="flex flex-col min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="text-headline-sm text-[#0b1c30] truncate font-bold">
                    EasyPay Demo Wallet
                  </span>
                  <span className="material-symbols-outlined text-[#006c49] text-[18px]">
                    verified
                  </span>
                </div>
                <span className="text-body-sm text-[#434654]">
                  Available Balance:{' '}
                  <strong className="text-[#0b1c30] font-semibold">${balance.toFixed(2)}</strong>
                </span>
              </div>
            </div>
            <div className="w-6 h-6 rounded-full bg-[#006c49] text-[#ffffff] flex items-center justify-center flex-shrink-0">
              <span className="material-symbols-outlined text-[16px] font-bold">check</span>
            </div>
          </div>
        </div>

        {/* Two-Step Confirmation Summary Drawer / Card */}
        <div className="w-full rounded-2xl bg-[#eff4ff] p-4 flex flex-col gap-2 shadow-xs border border-[#dce9ff]/60">
          <div className="flex items-center justify-between pb-1">
            <span className="text-label-md text-[#0b1c30] font-bold flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[#003fb1] text-[18px]">receipt</span>{' '}
              Transfer Overview
            </span>
            <span className="text-label-sm px-2 py-0.5 rounded-full bg-[#6cf8bb] text-[#00714d] font-bold">
              Ready
            </span>
          </div>

          {/* Recipient Snapshot inside Card */}
          <div className="flex items-center justify-between p-3 rounded-xl bg-[#ffffff] border border-[#eff4ff]">
            <div className="flex items-center gap-3">
              <div className="relative">
                {recipientAvatar ? (
                  <img
                    className="w-10 h-10 rounded-full object-cover"
                    src={recipientAvatar}
                    alt={recipientName}
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-[#dbe1ff] flex items-center justify-center text-[#00174d] font-bold">
                    {recipientName.charAt(0)}
                  </div>
                )}
                <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-[#006c49] ring-2 ring-[#ffffff] flex items-center justify-center">
                  <span className="material-symbols-outlined text-[9px] text-[#ffffff] font-bold">
                    check
                  </span>
                </span>
              </div>

              <div className="flex flex-col">
                <span className="text-label-lg text-[#0b1c30] font-bold">
                  {recipientName}
                </span>
                <span className="text-body-sm text-[#737686]">{recipient}</span>
              </div>
            </div>

            <span className="inline-flex items-center px-2 py-1 rounded-md bg-[#e5eeff] text-label-sm text-[#003fb1] font-bold">
              Verified Recipient
            </span>
          </div>

          {/* Fee & Total Calculation */}
          <div className="flex flex-col gap-2 pt-1 text-body-sm">
            <div className="flex justify-between text-[#434654]">
              <span>Transfer Subtotal</span>
              <span className="font-semibold text-[#0b1c30]">${numAmount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-[#434654]">
              <span className="flex items-center gap-1">
                EasyPay Network Fee
                <span
                  className="material-symbols-outlined text-[14px] text-[#737686]"
                  title="Free demo environment"
                >
                  info
                </span>
              </span>
              <span className="text-[#006c49] font-bold">$0.00 (Waived)</span>
            </div>

            <div className="w-full h-[1px] bg-[#c3c5d7]/30 my-0.5"></div>

            <div className="flex justify-between items-baseline pt-1">
              <span className="text-headline-sm text-[#0b1c30] font-bold">Total Deduction</span>
              <span className="text-headline-sm text-[#003fb1] font-extrabold">
                ${numAmount.toFixed(2)}
              </span>
            </div>
          </div>
        </div>

        {/* CTA & Security Note */}
        <div className="flex flex-col gap-2 pt-1">
          <button
            type="button"
            disabled={isSending}
            onClick={handleConfirmSend}
            className="w-full h-14 rounded-2xl bg-[#1a56db] text-[#ffffff] text-label-lg font-bold flex items-center justify-center gap-2 shadow-[0_8px_16px_-2px_rgba(37,99,235,0.35)] hover:bg-[#003fb1] active:scale-[0.98] transition-all cursor-pointer disabled:opacity-80"
          >
            {isSending ? (
              <>
                <span className="material-symbols-outlined animate-spin text-[22px]">
                  progress_activity
                </span>
                <span>Processing Transfer...</span>
              </>
            ) : (
              <>
                <span className="material-symbols-outlined text-[20px]">send</span>
                <span>Confirm &amp; Send Demo Payment</span>
              </>
            )}
          </button>

          <div className="flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-[#eff4ff] text-center">
            <span className="material-symbols-outlined text-[#737686] text-[16px]">
              verified_user
            </span>
            <p className="text-body-sm text-[#434654]">
              Simulated payment in Demo Mode. Instant virtual settlement.
            </p>
          </div>
        </div>
      </div>

      {/* Interactive Success Modal Bottom Sheet */}
      {successTx && (
        <div className="fixed inset-0 z-50 bg-[#213145]/50 backdrop-blur-sm flex items-end justify-center p-0 animate-in fade-in duration-300">
          <div className="w-full max-w-lg bg-[#ffffff] rounded-t-3xl p-6 flex flex-col items-center text-center shadow-2xl animate-in slide-in-from-bottom duration-300">
            {/* Celebration Icon */}
            <div className="w-16 h-16 rounded-full bg-[#6cf8bb] text-[#00714d] flex items-center justify-center mb-3">
              <span
                className="material-symbols-outlined text-[36px]"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                check_circle
              </span>
            </div>

            <span className="text-label-sm uppercase tracking-wider text-[#006c49] font-bold">
              Transfer Succeeded
            </span>
            <h2 className="text-headline-lg-mobile text-[#0b1c30] font-bold mt-1">Payment Sent!</h2>
            <p className="text-body-md text-[#434654] mt-1">
              You successfully transferred{' '}
              <span className="font-bold text-[#0b1c30]">${successTx.amount.toFixed(2)}</span> to{' '}
              <span className="font-bold text-[#0b1c30]">{successTx.recipientName}</span>.
            </p>

            {/* Mini Transaction Receipt Card */}
            <div className="w-full bg-[#eff4ff] rounded-xl p-3 my-4 flex flex-col gap-2 text-body-sm text-left border border-[#dce9ff]/60">
              <div className="flex justify-between">
                <span className="text-[#737686]">Transaction Ref</span>
                <span className="font-mono text-[#0b1c30] font-semibold">{successTx.refId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#737686]">Payment Method</span>
                <span className="text-[#0b1c30] font-medium">EasyPay Demo Wallet</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#737686]">Status</span>
                <span className="text-[#006c49] font-bold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#006c49]"></span> Instant Settlement
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="w-full flex flex-col gap-2">
              <button
                type="button"
                onClick={handleDoneReturnHome}
                className="w-full h-12 rounded-xl bg-[#1a56db] hover:bg-[#003fb1] text-[#ffffff] text-label-md font-bold transition-all active:scale-95 cursor-pointer"
              >
                Done &amp; Return Home
              </button>
              <button
                type="button"
                onClick={handleSendAnother}
                className="w-full h-11 rounded-xl bg-[#e5eeff] hover:bg-[#dce9ff] text-[#003fb1] text-label-md font-bold transition-all active:scale-95 cursor-pointer"
              >
                Send Another Transfer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
