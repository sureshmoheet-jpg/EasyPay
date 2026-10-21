import React, { useState } from 'react';
import { useWallet } from '../context/WalletContext';

export const ReceiveScreen: React.FC = () => {
  const { currentUser, showToast } = useWallet();
  const [isSoundOn, setIsSoundOn] = useState(true);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [customAmount, setCustomAmount] = useState('25.00');
  const [customNote, setCustomNote] = useState('Lunch');
  const [activeAmountPreset, setActiveAmountPreset] = useState<string | null>(null);
  const [isWiggling, setIsWiggling] = useState(false);

  const paymentId = currentUser.handle;

  const triggerQrWiggle = () => {
    setIsWiggling(true);
    setTimeout(() => setIsWiggling(false), 200);
  };

  const handleCopyId = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(paymentId).catch(() => {});
    }
    showToast(`Payment ID copied: ${paymentId}`, 'content_copy');
    triggerQrWiggle();
  };

  const handlePresetSelect = (amt: string, note: string) => {
    setCustomAmount(amt);
    setCustomNote(note);
  };

  const handleApplyCustomAmount = () => {
    const val = parseFloat(customAmount) || 0;
    const formatted = '$' + val.toFixed(2);
    setActiveAmountPreset(`${formatted} • ${customNote || 'Payment'}`);
    showToast(`QR Code configured for ${formatted}!`, 'sell');
    triggerQrWiggle();
  };

  const handleClearAmount = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveAmountPreset(null);
    showToast('Reset to open amount QR', 'refresh');
    triggerQrWiggle();
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: `Pay ${currentUser.name} via EasyPay`,
          text: `Here is my demo QR code on EasyPay: ${paymentId}`,
          url: window.location.href
        })
        .catch(() => {});
    } else {
      handleCopyId();
      showToast('Share link ready on clipboard!', 'share');
    }
  };

  const handleSaveImage = () => {
    showToast('QR Code saved to photos / downloads!', 'file_download');
  };

  const handleSendLink = () => {
    showToast('Payment link generated for SMS / Messaging', 'forum');
  };

  const toggleSound = () => {
    setIsSoundOn(!isSoundOn);
    showToast(isSoundOn ? 'Audio chime muted' : 'Audio chime enabled 🔔', 'volume_up');
  };

  return (
    <div className="flex-1 flex flex-col relative w-full pt-16 pb-20 bg-[#f8f9ff]">
      <div className="flex flex-col w-full px-gutter max-w-lg mx-auto pb-8">
        {/* Ambient Decorative Accent */}
        <div className="relative w-full pt-2">
          <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-72 h-36 bg-gradient-to-b from-[#dbe1ff]/40 via-[#dce9ff]/20 to-transparent blur-2xl pointer-events-none -z-10"></div>

          {/* Receiver Identity Bar */}
          <div className="flex items-center justify-between bg-[#ffffff] rounded-2xl p-4 shadow-xs mb-3 border border-[#eff4ff]">
            <div className="flex items-center gap-3 min-w-0">
              <div className="relative flex-shrink-0">
                <img
                  alt={currentUser.name}
                  className="w-12 h-12 rounded-full object-cover ring-2 ring-[#eff4ff]"
                  src={currentUser.avatar}
                />
                <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full bg-[#006c49] flex items-center justify-center text-[#ffffff] shadow-xs">
                  <span
                    className="material-symbols-outlined text-[11px]"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    verified
                  </span>
                </div>
              </div>

              <div className="flex flex-col min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="text-headline-sm text-[#0b1c30] truncate font-bold">
                    {currentUser.name}
                  </span>
                  <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-full bg-[#6cf8bb] text-[#00714d] text-label-sm font-bold">
                    <span
                      className="material-symbols-outlined text-[10px]"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      check
                    </span>{' '}
                    Verified
                  </span>
                </div>
                <span className="text-body-sm text-[#434654] truncate">
                  Personal Demo Wallet
                </span>
              </div>
            </div>

            <button
              aria-label="Audio Feedback Toggle"
              onClick={toggleSound}
              className="w-9 h-9 flex items-center justify-center rounded-full bg-[#e5eeff] text-[#434654] hover:text-[#003fb1] transition-colors cursor-pointer active:scale-95"
            >
              <span className="material-symbols-outlined text-[18px]">
                {isSoundOn ? 'volume_up' : 'volume_off'}
              </span>
            </button>
          </div>

          {/* Demo Payment ID Bar */}
          <div className="flex items-center justify-between bg-[#eff4ff] rounded-xl px-4 py-2.5 mb-4 shadow-xs border border-[#dce9ff]/60">
            <div className="flex items-center gap-2 min-w-0">
              <div className="w-7 h-7 rounded-lg bg-[#dbe1ff] flex items-center justify-center text-[#00174d] flex-shrink-0">
                <span className="material-symbols-outlined text-[16px]">alternate_email</span>
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-[10px] text-[#434654] leading-none uppercase font-bold tracking-wider">
                  DEMO PAYMENT ID
                </span>
                <span className="text-label-lg text-[#0b1c30] font-semibold tracking-tight truncate select-all">
                  {paymentId}
                </span>
              </div>
            </div>

            <button
              onClick={handleCopyId}
              className="flex items-center gap-1 bg-[#ffffff] hover:bg-[#e5eeff] text-[#003fb1] text-label-md font-bold px-3 py-1.5 rounded-lg shadow-xs transition-all active:scale-95 flex-shrink-0 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">content_copy</span>
              <span>Copy ID</span>
            </button>
          </div>

          {/* Central QR Code Card Container */}
          <div className="relative bg-[#ffffff] rounded-2xl p-5 shadow-sm mb-4 flex flex-col items-center border border-[#eff4ff]">
            {/* Glow backdrop */}
            <div className="absolute inset-x-8 top-12 bottom-20 bg-[#003fb1]/10 rounded-2xl blur-xl -z-10 pointer-events-none"></div>

            {/* Active Amount Badge (if configured) */}
            {activeAmountPreset && (
              <div className="mb-3 inline-flex items-center gap-1.5 bg-[#003fb1] text-[#ffffff] px-3.5 py-1 rounded-full shadow-xs animate-pulse">
                <span className="material-symbols-outlined text-[14px]">sell</span>
                <span className="text-label-md font-bold">{activeAmountPreset}</span>
                <button
                  aria-label="Clear specific amount"
                  onClick={handleClearAmount}
                  className="ml-1 text-[#ffffff]/80 hover:text-[#ffffff] flex items-center cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[14px]">close</span>
                </button>
              </div>
            )}

            {/* Scannable Custom High-Fidelity SVG QR */}
            <div
              className={`relative p-3 bg-[#ffffff] rounded-2xl shadow-xs flex items-center justify-center transition-transform duration-200 cursor-pointer ${
                isWiggling ? 'scale-95' : 'scale-100'
              }`}
              onClick={() => {
                triggerQrWiggle();
                showToast('Refreshed security signature', 'sync');
              }}
              title="Tap to refresh security signature"
            >
              <svg
                className="w-56 h-56 transition-transform duration-300"
                viewBox="0 0 220 220"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Background */}
                <rect width="220" height="220" rx="16" fill="#FFFFFF" />

                {/* Outer Corner Position Markers (Top-Left) */}
                <rect x="16" y="16" width="56" height="56" rx="12" fill="#003FB1" />
                <rect x="24" y="24" width="40" height="40" rx="8" fill="#FFFFFF" />
                <rect x="32" y="32" width="24" height="24" rx="5" fill="#003FB1" />
                <circle cx="44" cy="44" r="5" fill="#6CF8BB" />

                {/* Outer Corner Position Markers (Top-Right) */}
                <rect x="148" y="16" width="56" height="56" rx="12" fill="#003FB1" />
                <rect x="156" y="24" width="40" height="40" rx="8" fill="#FFFFFF" />
                <rect x="164" y="32" width="24" height="24" rx="5" fill="#003FB1" />
                <circle cx="176" cy="44" r="5" fill="#6CF8BB" />

                {/* Outer Corner Position Markers (Bottom-Left) */}
                <rect x="16" y="148" width="56" height="56" rx="12" fill="#003FB1" />
                <rect x="24" y="156" width="40" height="40" rx="8" fill="#FFFFFF" />
                <rect x="32" y="164" width="24" height="24" rx="5" fill="#003FB1" />
                <circle cx="44" cy="176" r="5" fill="#6CF8BB" />

                {/* High Density QR Matrix Dots */}
                {/* Top Row Blocks */}
                <rect x="80" y="18" width="8" height="8" rx="2" fill="#0B1C30" />
                <rect x="96" y="18" width="8" height="8" rx="2" fill="#0B1C30" />
                <rect x="112" y="18" width="14" height="8" rx="2" fill="#1353D8" />
                <rect x="132" y="18" width="8" height="8" rx="2" fill="#0B1C30" />
                <rect x="80" y="32" width="14" height="8" rx="2" fill="#0B1C30" />
                <rect x="102" y="32" width="8" height="8" rx="2" fill="#0B1C30" />
                <rect x="118" y="32" width="8" height="8" rx="2" fill="#1353D8" />
                <rect x="132" y="32" width="8" height="8" rx="2" fill="#0B1C30" />
                <rect x="80" y="46" width="8" height="8" rx="2" fill="#0B1C30" />
                <rect x="94" y="46" width="14" height="8" rx="2" fill="#0B1C30" />
                <rect x="118" y="46" width="8" height="8" rx="2" fill="#0B1C30" />
                <rect x="132" y="46" width="8" height="8" rx="2" fill="#0B1C30" />
                <rect x="80" y="60" width="8" height="8" rx="2" fill="#1353D8" />
                <rect x="96" y="60" width="8" height="8" rx="2" fill="#0B1C30" />
                <rect x="110" y="60" width="8" height="8" rx="2" fill="#0B1C30" />
                <rect x="126" y="60" width="14" height="8" rx="2" fill="#0B1C30" />

                {/* Mid Section */}
                <rect x="18" y="80" width="8" height="8" rx="2" fill="#0B1C30" />
                <rect x="32" y="80" width="14" height="8" rx="2" fill="#0B1C30" />
                <rect x="52" y="80" width="8" height="8" rx="2" fill="#0B1C30" />
                <rect x="66" y="80" width="8" height="8" rx="2" fill="#1353D8" />
                <rect x="18" y="96" width="14" height="8" rx="2" fill="#0B1C30" />
                <rect x="40" y="96" width="8" height="8" rx="2" fill="#0B1C30" />
                <rect x="54" y="96" width="14" height="8" rx="2" fill="#0B1C30" />
                <rect x="18" y="112" width="8" height="8" rx="2" fill="#0B1C30" />
                <rect x="34" y="112" width="8" height="8" rx="2" fill="#1353D8" />
                <rect x="48" y="112" width="14" height="8" rx="2" fill="#0B1C30" />
                <rect x="18" y="128" width="14" height="8" rx="2" fill="#0B1C30" />
                <rect x="40" y="128" width="8" height="8" rx="2" fill="#0B1C30" />
                <rect x="56" y="128" width="8" height="8" rx="2" fill="#0B1C30" />

                {/* Mid-Right Dots */}
                <rect x="148" y="80" width="8" height="8" rx="2" fill="#0B1C30" />
                <rect x="162" y="80" width="14" height="8" rx="2" fill="#0B1C30" />
                <rect x="184" y="80" width="8" height="8" rx="2" fill="#0B1C30" />
                <rect x="198" y="80" width="8" height="8" rx="2" fill="#1353D8" />
                <rect x="148" y="96" width="14" height="8" rx="2" fill="#1353D8" />
                <rect x="170" y="96" width="8" height="8" rx="2" fill="#0B1C30" />
                <rect x="184" y="96" width="14" height="8" rx="2" fill="#0B1C30" />
                <rect x="156" y="112" width="8" height="8" rx="2" fill="#0B1C30" />
                <rect x="170" y="112" width="14" height="8" rx="2" fill="#0B1C30" />
                <rect x="192" y="112" width="8" height="8" rx="2" fill="#0B1C30" />
                <rect x="148" y="128" width="8" height="8" rx="2" fill="#0B1C30" />
                <rect x="164" y="128" width="8" height="8" rx="2" fill="#0B1C30" />
                <rect x="180" y="128" width="14" height="8" rx="2" fill="#0B1C30" />

                {/* Bottom Mid & Right */}
                <rect x="80" y="148" width="14" height="8" rx="2" fill="#0B1C30" />
                <rect x="102" y="148" width="8" height="8" rx="2" fill="#1353D8" />
                <rect x="118" y="148" width="14" height="8" rx="2" fill="#0B1C30" />
                <rect x="148" y="148" width="8" height="8" rx="2" fill="#0B1C30" />
                <rect x="164" y="148" width="14" height="8" rx="2" fill="#0B1C30" />
                <rect x="186" y="148" width="8" height="8" rx="2" fill="#0B1C30" />

                <rect x="80" y="164" width="8" height="8" rx="2" fill="#0B1C30" />
                <rect x="94" y="164" width="14" height="8" rx="2" fill="#0B1C30" />
                <rect x="114" y="164" width="8" height="8" rx="2" fill="#0B1C30" />
                <rect x="130" y="164" width="8" height="8" rx="2" fill="#1353D8" />
                <rect x="148" y="164" width="14" height="8" rx="2" fill="#0B1C30" />
                <rect x="170" y="164" width="8" height="8" rx="2" fill="#0B1C30" />
                <rect x="184" y="164" width="14" height="8" rx="2" fill="#0B1C30" />

                <rect x="80" y="180" width="14" height="8" rx="2" fill="#0B1C30" />
                <rect x="100" y="180" width="8" height="8" rx="2" fill="#0B1C30" />
                <rect x="116" y="180" width="14" height="8" rx="2" fill="#0B1C30" />
                <rect x="136" y="180" width="8" height="8" rx="2" fill="#0B1C30" />
                <rect x="156" y="180" width="8" height="8" rx="2" fill="#1353D8" />
                <rect x="172" y="180" width="14" height="8" rx="2" fill="#0B1C30" />
                <rect x="194" y="180" width="8" height="8" rx="2" fill="#0B1C30" />

                <rect x="80" y="196" width="8" height="8" rx="2" fill="#1353D8" />
                <rect x="94" y="196" width="14" height="8" rx="2" fill="#0B1C30" />
                <rect x="114" y="196" width="8" height="8" rx="2" fill="#0B1C30" />
                <rect x="130" y="196" width="14" height="8" rx="2" fill="#0B1C30" />
                <rect x="152" y="196" width="8" height="8" rx="2" fill="#0B1C30" />
                <rect x="168" y="196" width="8" height="8" rx="2" fill="#0B1C30" />
                <rect x="182" y="196" width="14" height="8" rx="2" fill="#0B1C30" />

                {/* Central EasyPay Badge */}
                <circle cx="110" cy="110" r="26" fill="#FFFFFF" filter="drop-shadow(0px 2px 4px rgba(11,28,48,0.12))" />
                <circle cx="110" cy="110" r="21" fill="#003FB1" />
                <path d="M103 103H117M103 110H114M103 117H117" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" />
              </svg>
            </div>

            {/* Scannability prompt text */}
            <div className="mt-4 text-center">
              <span className="inline-flex items-center gap-1 text-label-md text-[#003fb1] font-bold">
                <span className="material-symbols-outlined text-[16px]">qr_code_scanner</span>
                Instant Demo Settlement
              </span>
              <p className="text-body-sm text-[#434654] mt-0.5 max-w-[240px]">
                Point camera or scanner. Valid across all linked sandbox banks.
              </p>
            </div>
          </div>

          {/* Set Specific Amount Customized Option Tray */}
          <div className="bg-[#ffffff] rounded-2xl p-4 shadow-xs mb-4 border border-[#eff4ff]">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#e5eeff] flex items-center justify-center text-[#003fb1]">
                  <span className="material-symbols-outlined text-[20px]">tune</span>
                </div>
                <div>
                  <span className="text-headline-sm text-[#0b1c30] font-bold">
                    Set Specific Amount
                  </span>
                  <p className="text-body-sm text-[#434654]">
                    Lock a preset total and note into this QR
                  </p>
                </div>
              </div>

              {/* Toggle switch */}
              <button
                type="button"
                role="switch"
                aria-checked={isDrawerOpen}
                onClick={() => setIsDrawerOpen(!isDrawerOpen)}
                className={`w-11 h-6 rounded-full p-0.5 transition-colors duration-200 ease-in-out relative flex items-center cursor-pointer ${
                  isDrawerOpen ? 'bg-[#003fb1]' : 'bg-[#dce9ff]'
                }`}
              >
                <div
                  className={`w-5 h-5 bg-[#ffffff] rounded-full shadow-md transform transition-transform duration-200 ${
                    isDrawerOpen ? 'translate-x-5' : 'translate-x-0'
                  }`}
                ></div>
              </button>
            </div>

            {/* Collapsible Form */}
            {isDrawerOpen && (
              <div className="mt-3 pt-3 border-t border-[#eff4ff] flex flex-col gap-3 animate-in fade-in duration-200">
                {/* Preset chips */}
                <div className="flex items-center gap-2">
                  {[
                    { amount: '10.00', note: 'Coffee' },
                    { amount: '25.00', note: 'Lunch' },
                    { amount: '50.00', note: 'Dinner Split' },
                  ].map((preset) => {
                    const isSelected = customAmount === preset.amount;
                    return (
                      <button
                        key={preset.amount}
                        type="button"
                        onClick={() => handlePresetSelect(preset.amount, preset.note)}
                        className={`flex-1 py-1.5 rounded-lg text-label-md text-center transition-all cursor-pointer font-bold ${
                          isSelected
                            ? 'bg-[#003fb1] text-[#ffffff] shadow-xs'
                            : 'bg-[#eff4ff] hover:bg-[#dbe1ff] text-[#0b1c30]'
                        }`}
                      >
                        ${preset.amount}
                      </button>
                    );
                  })}
                </div>

                {/* Amount input */}
                <div className="flex items-center bg-[#eff4ff] rounded-xl px-4 py-2">
                  <span className="text-display-currency-mobile text-[#434654] mr-1">$</span>
                  <input
                    type="number"
                    step="0.5"
                    value={customAmount}
                    onChange={(e) => setCustomAmount(e.target.value)}
                    placeholder="0.00"
                    className="w-full bg-transparent text-display-currency-mobile text-[#0b1c30] focus:outline-none font-extrabold"
                  />
                </div>

                {/* Note input */}
                <div className="flex items-center bg-[#eff4ff] rounded-xl px-4 py-2.5">
                  <span className="material-symbols-outlined text-[18px] text-[#434654] mr-2">
                    edit_note
                  </span>
                  <input
                    type="text"
                    value={customNote}
                    onChange={(e) => setCustomNote(e.target.value)}
                    placeholder="What's this for? (Optional)"
                    className="w-full bg-transparent text-body-md text-[#0b1c30] placeholder:text-[#434654] focus:outline-none"
                  />
                </div>

                <button
                  type="button"
                  onClick={handleApplyCustomAmount}
                  className="w-full bg-[#003fb1] hover:bg-[#1a56db] text-[#ffffff] text-label-lg font-bold py-3 rounded-xl shadow-md transition-all active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[18px]">autorenew</span>
                  <span>Update QR with Amount</span>
                </button>
              </div>
            )}
          </div>

          {/* Quick Sharing Action Grid */}
          <div className="mb-5">
            <span className="text-label-md text-[#434654] uppercase tracking-wider block mb-2 px-1 font-bold">
              Quick Share Actions
            </span>

            <div className="grid grid-cols-3 gap-2">
              {/* Share QR */}
              <button
                type="button"
                onClick={handleShare}
                className="flex flex-col items-center justify-center bg-[#ffffff] hover:bg-[#eff4ff] py-3.5 px-2 rounded-2xl shadow-xs transition-all active:scale-95 group cursor-pointer border border-[#eff4ff]"
              >
                <div className="w-11 h-11 rounded-full bg-[#eff4ff] group-hover:bg-[#dbe1ff] flex items-center justify-center text-[#003fb1] transition-colors mb-1.5">
                  <span className="material-symbols-outlined text-[22px]">share</span>
                </div>
                <span className="text-label-md text-[#0b1c30] text-center font-semibold">
                  Share Code
                </span>
              </button>

              {/* Download Image */}
              <button
                type="button"
                onClick={handleSaveImage}
                className="flex flex-col items-center justify-center bg-[#ffffff] hover:bg-[#eff4ff] py-3.5 px-2 rounded-2xl shadow-xs transition-all active:scale-95 group cursor-pointer border border-[#eff4ff]"
              >
                <div className="w-11 h-11 rounded-full bg-[#eff4ff] group-hover:bg-[#dbe1ff] flex items-center justify-center text-[#003fb1] transition-colors mb-1.5">
                  <span className="material-symbols-outlined text-[22px]">file_download</span>
                </div>
                <span className="text-label-md text-[#0b1c30] text-center font-semibold">
                  Save Image
                </span>
              </button>

              {/* Send Link */}
              <button
                type="button"
                onClick={handleSendLink}
                className="flex flex-col items-center justify-center bg-[#ffffff] hover:bg-[#eff4ff] py-3.5 px-2 rounded-2xl shadow-xs transition-all active:scale-95 group cursor-pointer border border-[#eff4ff]"
              >
                <div className="w-11 h-11 rounded-full bg-[#eff4ff] group-hover:bg-[#6cf8bb] flex items-center justify-center text-[#006c49] transition-colors mb-1.5">
                  <span className="material-symbols-outlined text-[22px]">forum</span>
                </div>
                <span className="text-label-md text-[#0b1c30] text-center font-semibold">
                  Send Link
                </span>
              </button>
            </div>
          </div>

          {/* Instructions Card */}
          <div className="bg-[#eff4ff] rounded-2xl p-4 mb-4 flex gap-3 items-start border border-[#dce9ff]/50">
            <div className="w-8 h-8 rounded-full bg-[#dbe1ff] flex items-center justify-center text-[#00174d] flex-shrink-0 mt-0.5">
              <span className="material-symbols-outlined text-[18px]">lightbulb</span>
            </div>
            <div className="flex flex-col">
              <span className="text-headline-sm text-[#0b1c30] font-bold">
                How demo receiving works
              </span>
              <p className="text-body-md text-[#434654] mt-0.5">
                Anyone with EasyPay or any demo scanner can scan this QR code to send you payments
                instantly. Funds settle directly to your verified default ledger.
              </p>
            </div>
          </div>

          {/* Security reassurance badge */}
          <div className="flex items-center justify-center gap-2 py-2 text-center">
            <span className="material-symbols-outlined text-[#006c49] text-[16px]">security</span>
            <span className="text-body-sm text-[#434654] font-medium">
              Safe &amp; Encrypted Demo Receiving Endpoint
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
