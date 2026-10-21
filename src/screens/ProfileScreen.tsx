import React, { useState } from 'react';
import { useWallet } from '../context/WalletContext';

export const ProfileScreen: React.FC = () => {
  const { currentUser, balance, addFunds, logout, resetDemoState, showToast } = useWallet();
  const [biometricsEnabled, setBiometricsEnabled] = useState(true);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true);
  const [soundsEnabled, setSoundsEnabled] = useState(true);

  return (
    <div className="flex-1 flex flex-col relative w-full pt-16 pb-20 bg-[#f8f9ff]">
      <div className="px-gutter max-w-lg mx-auto w-full pt-4 pb-8 space-y-4">
        {/* User Profile Card */}
        <div className="bg-[#ffffff] rounded-2xl p-5 shadow-xs flex flex-col items-center text-center relative border border-[#eff4ff]">
          <div className="relative mb-3">
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="w-20 h-20 rounded-full object-cover ring-4 ring-[#dbe1ff]"
            />
            <div className="absolute bottom-0 right-0 w-6 h-6 rounded-full bg-[#006c49] text-[#ffffff] flex items-center justify-center ring-2 ring-[#ffffff]">
              <span
                className="material-symbols-outlined text-[14px]"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                verified
              </span>
            </div>
          </div>

          <h2 className="text-headline-md text-[#0b1c30] font-bold">{currentUser.name}</h2>
          <span className="text-body-sm text-[#434654] font-medium mt-0.5">{currentUser.email}</span>

          <div className="mt-3 flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-[#dbe1ff] text-[#00174d] text-label-sm font-bold flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px]">shield</span>
              {currentUser.tier}
            </span>
            <span className="px-3 py-1 rounded-full bg-[#6cf8bb] text-[#00714d] text-label-sm font-bold">
              ID: {currentUser.handle}
            </span>
          </div>
        </div>

        {/* Balance & Limits Overview */}
        <div className="bg-[#eff4ff] rounded-2xl p-4 border border-[#dce9ff]/60 space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-label-sm text-[#434654] uppercase tracking-wider font-bold">
                Demo Wallet Balance
              </span>
              <div className="text-headline-md text-[#0b1c30] font-extrabold mt-0.5">
                ${balance.toFixed(2)}
              </div>
            </div>
            <button
              onClick={() => addFunds(500)}
              className="px-3.5 py-1.5 rounded-full bg-[#003fb1] hover:bg-[#1a56db] text-[#ffffff] text-label-sm font-bold flex items-center gap-1 shadow-xs active:scale-95 transition-all cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">add</span>
              <span>+ $500</span>
            </button>
          </div>

          <div className="pt-2 border-t border-[#dce9ff]">
            <div className="flex items-center justify-between text-body-sm mb-1.5">
              <span className="text-[#434654]">Monthly Sandbox Limit</span>
              <span className="text-[#0b1c30] font-bold">
                ${currentUser.monthlySpent.toLocaleString()} / $
                {currentUser.monthlyLimit.toLocaleString()}
              </span>
            </div>
            <div className="w-full bg-[#d3e4fe] rounded-full h-2 overflow-hidden">
              <div
                className="bg-[#003fb1] h-full rounded-full"
                style={{
                  width: `${(currentUser.monthlySpent / currentUser.monthlyLimit) * 100}%`
                }}
              ></div>
            </div>
          </div>
        </div>

        {/* Linked Sandbox Payment Methods */}
        <div className="bg-[#ffffff] rounded-2xl p-4 shadow-xs border border-[#eff4ff] space-y-3">
          <span className="text-label-md text-[#434654] uppercase tracking-wider font-bold block">
            Linked Instruments
          </span>

          <div className="space-y-2">
            <div className="p-3 rounded-xl bg-[#eff4ff] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-[#dbe1ff] text-[#003fb1] flex items-center justify-center font-bold">
                  <span className="material-symbols-outlined text-[20px]">account_balance</span>
                </div>
                <div>
                  <div className="text-label-md text-[#0b1c30] font-bold">EasyPay Sandbox Checking</div>
                  <div className="text-body-sm text-[#434654]">•••• 8901 • Default Rail</div>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-[#6cf8bb] text-[#00714d] text-[10px] font-bold">
                DEFAULT
              </span>
            </div>

            <div className="p-3 rounded-xl bg-[#ffffff] border border-[#eff4ff] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-[#e5eeff] text-[#003fb1] flex items-center justify-center font-bold">
                  <span className="material-symbols-outlined text-[20px]">credit_card</span>
                </div>
                <div>
                  <div className="text-label-md text-[#0b1c30] font-bold">Demo Visa Platinum</div>
                  <div className="text-body-sm text-[#434654]">•••• 4242 • Exp 12/28</div>
                </div>
              </div>
              <button
                onClick={() => showToast('Primary instrument updated', 'check')}
                className="text-label-sm text-[#003fb1] hover:underline font-semibold cursor-pointer"
              >
                Set Primary
              </button>
            </div>
          </div>
        </div>

        {/* Security & Authentication */}
        <div className="bg-[#ffffff] rounded-2xl p-4 shadow-xs border border-[#eff4ff] space-y-3">
          <span className="text-label-md text-[#434654] uppercase tracking-wider font-bold block">
            Security &amp; Fast-Pass
          </span>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-[#003fb1] text-[22px]">face</span>
                <div>
                  <div className="text-label-md text-[#0b1c30] font-bold">Face ID / Touch ID</div>
                  <div className="text-body-sm text-[#434654]">One-tap instant checkout</div>
                </div>
              </div>
              <button
                type="button"
                role="switch"
                aria-checked={biometricsEnabled}
                onClick={() => {
                  setBiometricsEnabled(!biometricsEnabled);
                  showToast(
                    biometricsEnabled ? 'Biometrics disabled' : 'Biometrics enabled',
                    'fingerprint'
                  );
                }}
                className={`w-11 h-6 rounded-full p-0.5 transition-colors cursor-pointer ${
                  biometricsEnabled ? 'bg-[#003fb1]' : 'bg-[#dce9ff]'
                }`}
              >
                <div
                  className={`w-5 h-5 bg-[#ffffff] rounded-full shadow-md transform transition-transform ${
                    biometricsEnabled ? 'translate-x-5' : 'translate-x-0'
                  }`}
                ></div>
              </button>
            </div>

            <div className="flex items-center justify-between border-t border-[#eff4ff] pt-3">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-[#003fb1] text-[22px]">lock</span>
                <div>
                  <div className="text-label-md text-[#0b1c30] font-bold">2-Step Verification</div>
                  <div className="text-body-sm text-[#434654]">Additional transaction protection</div>
                </div>
              </div>
              <button
                type="button"
                role="switch"
                aria-checked={twoFactorEnabled}
                onClick={() => {
                  setTwoFactorEnabled(!twoFactorEnabled);
                  showToast(
                    twoFactorEnabled ? '2-Step Auth disabled' : '2-Step Auth enabled',
                    'security'
                  );
                }}
                className={`w-11 h-6 rounded-full p-0.5 transition-colors cursor-pointer ${
                  twoFactorEnabled ? 'bg-[#003fb1]' : 'bg-[#dce9ff]'
                }`}
              >
                <div
                  className={`w-5 h-5 bg-[#ffffff] rounded-full shadow-md transform transition-transform ${
                    twoFactorEnabled ? 'translate-x-5' : 'translate-x-0'
                  }`}
                ></div>
              </button>
            </div>

            <div className="flex items-center justify-between border-t border-[#eff4ff] pt-3">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-[#003fb1] text-[22px]">volume_up</span>
                <div>
                  <div className="text-label-md text-[#0b1c30] font-bold">Sound Feedback</div>
                  <div className="text-body-sm text-[#434654]">Play audio chime on payment</div>
                </div>
              </div>
              <button
                type="button"
                role="switch"
                aria-checked={soundsEnabled}
                onClick={() => {
                  setSoundsEnabled(!soundsEnabled);
                  showToast(soundsEnabled ? 'Audio chimes off' : 'Audio chimes on', 'volume_up');
                }}
                className={`w-11 h-6 rounded-full p-0.5 transition-colors cursor-pointer ${
                  soundsEnabled ? 'bg-[#003fb1]' : 'bg-[#dce9ff]'
                }`}
              >
                <div
                  className={`w-5 h-5 bg-[#ffffff] rounded-full shadow-md transform transition-transform ${
                    soundsEnabled ? 'translate-x-5' : 'translate-x-0'
                  }`}
                ></div>
              </button>
            </div>
          </div>
        </div>

        {/* Demo State & Session Actions */}
        <div className="space-y-2 pt-2">
          <button
            onClick={resetDemoState}
            className="w-full py-3.5 px-4 rounded-xl bg-[#eff4ff] hover:bg-[#dce9ff] text-[#003fb1] text-label-md font-bold flex items-center justify-center gap-2 transition-all active:scale-95 cursor-pointer border border-[#dce9ff]"
          >
            <span className="material-symbols-outlined text-[18px]">restart_alt</span>
            <span>Reset Demo Wallet State</span>
          </button>

          <button
            onClick={logout}
            className="w-full py-3.5 px-4 rounded-xl bg-[#ffffff] hover:bg-[#ffdad6]/40 text-[#ba1a1a] text-label-md font-bold flex items-center justify-center gap-2 transition-all active:scale-95 cursor-pointer border border-[#ffdad6]"
          >
            <span className="material-symbols-outlined text-[18px]">logout</span>
            <span>Log Out of EasyPay</span>
          </button>
        </div>
      </div>
    </div>
  );
};
