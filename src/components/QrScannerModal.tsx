import React, { useState } from 'react';
import { useWallet } from '../context/WalletContext';

export const QrScannerModal: React.FC = () => {
  const { isQrScannerOpen, setIsQrScannerOpen, showToast, setSendPrefill, setActiveTab } = useWallet();
  const [isTorchOn, setIsTorchOn] = useState(false);

  if (!isQrScannerOpen) return null;

  const handleScanSample = (name: string, handle: string, amount: number, avatar?: string) => {
    setIsQrScannerOpen(false);
    showToast(`Scanned QR: ${name} ($${amount.toFixed(2)})`, 'qr_code_scanner');
    setSendPrefill({
      name,
      handle,
      avatar
    });
    setActiveTab('send');
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#0b1c30]/90 backdrop-blur-md flex flex-col justify-between p-4 animate-in fade-in duration-200">
      {/* Top Controls */}
      <div className="w-full max-w-md mx-auto flex items-center justify-between pt-safe">
        <button
          onClick={() => setIsQrScannerOpen(false)}
          className="w-10 h-10 rounded-full bg-[#213145]/80 text-[#ffffff] flex items-center justify-center hover:bg-[#213145] active:scale-95 transition-all"
        >
          <span className="material-symbols-outlined text-[20px]">close</span>
        </button>

        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#213145]/80 text-[#eaf1ff] text-label-sm font-semibold">
          <span className="w-2 h-2 rounded-full bg-[#6cf8bb] animate-pulse"></span>
          <span>Camera Active</span>
        </div>

        <button
          onClick={() => {
            setIsTorchOn(!isTorchOn);
            showToast(isTorchOn ? 'Flashlight Off' : 'Flashlight On', 'flashlight_on');
          }}
          className={`w-10 h-10 rounded-full flex items-center justify-center active:scale-95 transition-all ${
            isTorchOn ? 'bg-[#ffdad6] text-[#ba1a1a]' : 'bg-[#213145]/80 text-[#ffffff]'
          }`}
        >
          <span className="material-symbols-outlined text-[20px]">
            {isTorchOn ? 'flashlight_on' : 'flashlight_off'}
          </span>
        </button>
      </div>

      {/* Center Viewfinder */}
      <div className="w-full max-w-sm mx-auto flex flex-col items-center justify-center my-auto">
        <div className="relative w-64 h-64 rounded-3xl overflow-hidden border-2 border-[#dbe1ff]/40 shadow-2xl bg-[#000000]/40 flex items-center justify-center">
          {/* Torch glow simulation */}
          {isTorchOn && (
            <div className="absolute inset-0 bg-[#ffffff]/15 pointer-events-none transition-opacity"></div>
          )}

          {/* Scanner laser beam */}
          <div className="absolute inset-x-2 h-0.5 bg-gradient-to-r from-transparent via-[#6cf8bb] to-transparent shadow-[0_0_12px_#6cf8bb] animate-bounce pointer-events-none"></div>

          {/* Reticle corners */}
          <div className="absolute top-3 left-3 w-8 h-8 border-t-4 border-l-4 border-[#1a56db] rounded-tl-xl pointer-events-none"></div>
          <div className="absolute top-3 right-3 w-8 h-8 border-t-4 border-r-4 border-[#1a56db] rounded-tr-xl pointer-events-none"></div>
          <div className="absolute bottom-3 left-3 w-8 h-8 border-b-4 border-l-4 border-[#1a56db] rounded-bl-xl pointer-events-none"></div>
          <div className="absolute bottom-3 right-3 w-8 h-8 border-b-4 border-r-4 border-[#1a56db] rounded-br-xl pointer-events-none"></div>

          <div className="text-center p-4">
            <span className="material-symbols-outlined text-[#dbe1ff] text-[40px] opacity-70">
              qr_code_scanner
            </span>
            <p className="text-body-sm text-[#eaf1ff]/80 mt-2 font-medium">
              Align QR code inside frame
            </p>
          </div>
        </div>

        <p className="text-body-sm text-[#c3c5d7] text-center mt-4">
          Point at any merchant terminal, restaurant counter, or peer QR code
        </p>
      </div>

      {/* Bottom Sample Simulation Triggers */}
      <div className="w-full max-w-md mx-auto pb-safe space-y-2">
        <div className="flex items-center justify-between text-xs text-[#c3c5d7] px-2 font-semibold uppercase tracking-wider">
          <span>Demo Scan Simulation</span>
          <span className="text-[#6cf8bb]">Instant Read</span>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() =>
              handleScanSample('TechCafe Espresso Bar', 'merchant.techcafe@easypay.demo', 14.50)
            }
            className="p-2.5 rounded-xl bg-[#213145] hover:bg-[#324560] text-left text-[#ffffff] flex items-center gap-2 active:scale-95 transition-all"
          >
            <div className="w-8 h-8 rounded-lg bg-[#dbe1ff] text-[#003fb1] flex items-center justify-center flex-shrink-0">
              <span className="material-symbols-outlined text-[18px]">coffee</span>
            </div>
            <div className="min-w-0">
              <div className="text-xs font-bold truncate">TechCafe Bar</div>
              <div className="text-[11px] text-[#6cf8bb]">$14.50</div>
            </div>
          </button>

          <button
            onClick={() =>
              handleScanSample(
                'Priya Sharma',
                'priya@easypay',
                35.00,
                'https://lh3.googleusercontent.com/aida-public/AB6AXuBQoa7ZGK_D_1viKu9f0_pb1KxWBXU8LI2zvq3kLgk-9KKH70jEbTsI_57ZnsKQo87GSwnHi_EuHwULIps8-4O81gfjNCyjp5q5x8TbsdryYyXmVt8c0Aya8MJZl8dsPxtJ83VxNr5r0QPFBxeo7je30lCS4ZtqJSg2MLjE9E8QkgHEP0RRySJ-TkDPveZwEbH6xvWD2123od1JMIBTQkN7LoscPaGMjqfv4awYysRkzKUP_zymlF2_'
              )
            }
            className="p-2.5 rounded-xl bg-[#213145] hover:bg-[#324560] text-left text-[#ffffff] flex items-center gap-2 active:scale-95 transition-all"
          >
            <div className="w-8 h-8 rounded-lg bg-[#6cf8bb] text-[#006c49] flex items-center justify-center flex-shrink-0">
              <span className="material-symbols-outlined text-[18px]">person</span>
            </div>
            <div className="min-w-0">
              <div className="text-xs font-bold truncate">Priya Sharma</div>
              <div className="text-[11px] text-[#6cf8bb]">$35.00</div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};
