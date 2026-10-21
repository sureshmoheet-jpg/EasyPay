import React, { useState } from 'react';
import { useWallet } from '../context/WalletContext';
import { APP_LOGO } from '../data/mockData';

export const LoginScreen: React.FC = () => {
  const { login, showToast } = useWallet();
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('alex.pay@easypay.demo');
  const [password, setPassword] = useState('••••••••');
  const [name, setName] = useState('Alex Morgan');
  const [phone, setPhone] = useState('(555) 019-2834');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFillDemo = () => {
    setEmail('alex.pay@easypay.demo');
    setPassword('demo12345');
    if (authMode === 'register') {
      setName('Alex Morgan');
      setPhone('(555) 019-2834');
    }
    showToast('Demo test credentials injected ✨', 'magic_button');
  };

  const handleBiometric = (type: 'Face ID' | 'Touch ID') => {
    showToast(`${type} Verified! Unlocking EasyPay...`, type === 'Face ID' ? 'face' : 'fingerprint');
    setTimeout(() => {
      login();
      showToast('Welcome back, Alex! Wallet unlocked 🚀', 'check_circle');
    }, 900);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      login();
      showToast(
        authMode === 'login'
          ? 'Signed in! Redirecting to Dashboard...'
          : 'Account Created! Welcome to EasyPay 🎉',
        'check_circle'
      );
    }, 800);
  };

  return (
    <div className="flex-1 flex flex-col relative w-full bg-[#f8f9ff] min-h-screen pt-safe pb-safe px-gutter max-w-lg mx-auto">
      {/* Brand & Welcoming Intro */}
      <div className="flex flex-col items-center text-center mt-3 mb-5">
        <div className="relative mb-3">
          <div className="w-16 h-16 rounded-full bg-[#dce9ff] flex items-center justify-center shadow-sm">
            <img
              alt="EasyPay Logo"
              className="w-12 h-12 object-contain rounded-lg"
              src={APP_LOGO}
            />
          </div>
          <span className="absolute -top-1 -right-1 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#4edea3] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-4 w-4 bg-[#006c49]"></span>
          </span>
        </div>

        <h1 className="text-headline-lg-mobile text-[#0b1c30] tracking-tight font-bold">
          EasyPay
        </h1>
        <p className="text-body-md text-[#434654] mt-0.5">
          Simple, Secure Digital Payments
        </p>

        {/* Micro Security Reassurance Ribbon */}
        <div className="mt-3 w-full bg-[#eff4ff] px-4 py-1.5 rounded-full flex items-center justify-center gap-1.5 border border-[#dce9ff]/60">
          <span
            className="material-symbols-outlined text-[#006c49] text-[18px]"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            verified_user
          </span>
          <span className="text-label-sm text-[#434654] text-center font-medium">
            Demo Mode Active • No real credentials or OTP required
          </span>
        </div>
      </div>

      {/* Interactive Auth Card */}
      <div className="w-full bg-[#ffffff] rounded-2xl p-4 sm:p-5 shadow-sm border border-[#eff4ff] flex flex-col">
        {/* Segmented Pill Switcher */}
        <div className="w-full bg-[#eff4ff] p-1 rounded-full flex items-center relative mb-4">
          <button
            type="button"
            onClick={() => setAuthMode('login')}
            className={`flex-1 py-2 text-center text-label-lg rounded-full transition-all duration-200 flex items-center justify-center gap-1.5 cursor-pointer ${
              authMode === 'login'
                ? 'bg-[#1a56db] text-[#ffffff] shadow-sm font-bold'
                : 'text-[#434654] hover:text-[#0b1c30]'
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">lock_open</span>
            <span>Login</span>
          </button>
          <button
            type="button"
            onClick={() => setAuthMode('register')}
            className={`flex-1 py-2 text-center text-label-lg rounded-full transition-all duration-200 flex items-center justify-center gap-1.5 cursor-pointer ${
              authMode === 'register'
                ? 'bg-[#1a56db] text-[#ffffff] shadow-sm font-bold'
                : 'text-[#434654] hover:text-[#0b1c30]'
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">person_add</span>
            <span>Register</span>
          </button>
        </div>

        {/* Quick Demo Auto-Fill Pill */}
        <div className="mb-4 bg-[#e5eeff] px-3.5 py-2.5 rounded-xl flex items-center justify-between border border-[#dce9ff]">
          <div className="flex items-center gap-2 min-w-0 pr-2">
            <span
              className="material-symbols-outlined text-[#1a56db] text-[20px] shrink-0"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              magic_button
            </span>
            <div className="min-w-0 flex flex-col">
              <span className="text-label-sm text-[#003fb1] uppercase tracking-wider font-bold">
                Speed Test
              </span>
              <span className="text-body-sm text-[#0b1c30] truncate font-medium">
                alex.pay@easypay.demo
              </span>
            </div>
          </div>
          <button
            type="button"
            onClick={handleFillDemo}
            className="shrink-0 bg-[#dbe1ff] hover:bg-[#b5c4ff] text-[#00174d] text-label-md px-3 py-1.5 rounded-full active:scale-95 transition-transform flex items-center gap-1 font-bold cursor-pointer"
          >
            <span>Fill Demo</span>
            <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
          </button>
        </div>

        {/* Auth Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          {/* Full Name (Register Only) */}
          {authMode === 'register' && (
            <div className="flex flex-col gap-1 animate-in fade-in duration-200">
              <label className="text-label-md text-[#434654] ml-1 font-semibold">
                Full Legal Name
              </label>
              <div className="w-full bg-[#eff4ff] rounded-xl px-3.5 py-3 flex items-center gap-2 focus-within:bg-[#ffffff] focus-within:ring-2 focus-within:ring-[#1a56db] transition-all">
                <span className="material-symbols-outlined text-[#737686] text-[20px]">
                  badge
                </span>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Alex Morgan"
                  className="w-full bg-transparent border-0 outline-none text-body-md text-[#0b1c30] placeholder:text-[#737686]"
                  required
                />
              </div>
            </div>
          )}

          {/* Email / EasyTag */}
          <div className="flex flex-col gap-1">
            <label className="text-label-md text-[#434654] ml-1 font-semibold">
              Email or EasyTag
            </label>
            <div className="w-full bg-[#eff4ff] rounded-xl px-3.5 py-3 flex items-center gap-2 focus-within:bg-[#ffffff] focus-within:ring-2 focus-within:ring-[#1a56db] transition-all">
              <span className="material-symbols-outlined text-[#737686] text-[20px]">
                alternate_email
              </span>
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="alex.pay@easypay.demo"
                required
                className="w-full bg-transparent border-0 outline-none text-body-md text-[#0b1c30] placeholder:text-[#737686]"
              />
              {email && (
                <button
                  type="button"
                  onClick={() => setEmail('')}
                  className="text-[#737686] hover:text-[#0b1c30] shrink-0"
                >
                  <span className="material-symbols-outlined text-[18px]">cancel</span>
                </button>
              )}
            </div>
          </div>

          {/* Phone (Register Only) */}
          {authMode === 'register' && (
            <div className="flex flex-col gap-1 animate-in fade-in duration-200">
              <label className="text-label-md text-[#434654] ml-1 font-semibold">
                Mobile Contact
              </label>
              <div className="w-full bg-[#eff4ff] rounded-xl px-3.5 py-3 flex items-center gap-2 focus-within:bg-[#ffffff] focus-within:ring-2 focus-within:ring-[#1a56db] transition-all">
                <span className="material-symbols-outlined text-[#737686] text-[20px]">
                  smartphone
                </span>
                <span className="text-label-md text-[#434654] font-bold">+1</span>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="(555) 019-2834"
                  className="w-full bg-transparent border-0 outline-none text-body-md text-[#0b1c30] placeholder:text-[#737686]"
                />
              </div>
            </div>
          )}

          {/* Password / Passcode */}
          <div className="flex flex-col gap-1">
            <div className="flex items-center justify-between ml-1">
              <label className="text-label-md text-[#434654] font-semibold">
                Security Passcode
              </label>
              {authMode === 'login' && (
                <button
                  type="button"
                  onClick={() =>
                    showToast('Demo reset passcode link sent to alex.pay@easypay.demo ✉️', 'mark_email_read')
                  }
                  className="text-label-sm text-[#003fb1] hover:underline font-bold"
                >
                  Forgot Code?
                </button>
              )}
            </div>

            <div className="w-full bg-[#eff4ff] rounded-xl px-3.5 py-3 flex items-center gap-2 focus-within:bg-[#ffffff] focus-within:ring-2 focus-within:ring-[#1a56db] transition-all">
              <span className="material-symbols-outlined text-[#737686] text-[20px]">
                key
              </span>
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full bg-transparent border-0 outline-none text-body-md text-[#0b1c30] placeholder:text-[#737686] tracking-wider"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-[#737686] hover:text-[#0b1c30] shrink-0"
              >
                <span className="material-symbols-outlined text-[20px]">
                  {showPassword ? 'visibility_off' : 'visibility'}
                </span>
              </button>
            </div>
            <p className="text-body-sm text-[#737686] ml-1 mt-0.5">
              6-digit payment PIN or alphanumeric password
            </p>
          </div>

          {/* Primary Submit CTA */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full h-14 bg-[#1a56db] hover:bg-[#003fb1] text-[#ffffff] text-label-lg font-bold rounded-xl shadow-md active:scale-98 transition-all flex items-center justify-center gap-2 mt-2 cursor-pointer disabled:opacity-80"
          >
            {isSubmitting ? (
              <>
                <span className="material-symbols-outlined animate-spin text-[20px]">
                  progress_activity
                </span>
                <span>Connecting Secure Rails...</span>
              </>
            ) : (
              <>
                <span>
                  {authMode === 'login' ? 'Sign In Securely' : 'Create EasyPay Account'}
                </span>
                <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
              </>
            )}
          </button>
        </form>

        {/* Biometric Separator */}
        <div className="flex items-center my-4 gap-2">
          <div className="flex-1 h-[1px] bg-[#dce9ff]"></div>
          <span className="text-label-sm text-[#737686] uppercase tracking-wider font-semibold">
            Fast-Pass Access
          </span>
          <div className="flex-1 h-[1px] bg-[#dce9ff]"></div>
        </div>

        {/* Biometric Quick Access */}
        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => handleBiometric('Face ID')}
            className="bg-[#eff4ff] hover:bg-[#e5eeff] text-[#0b1c30] py-3 px-2 rounded-xl flex items-center justify-center gap-2 active:scale-95 transition-all cursor-pointer border border-[#dce9ff]/40"
          >
            <span className="material-symbols-outlined text-[#1a56db] text-[22px]">face</span>
            <span className="text-label-md font-bold">Face ID</span>
          </button>
          <button
            type="button"
            onClick={() => handleBiometric('Touch ID')}
            className="bg-[#eff4ff] hover:bg-[#e5eeff] text-[#0b1c30] py-3 px-2 rounded-xl flex items-center justify-center gap-2 active:scale-95 transition-all cursor-pointer border border-[#dce9ff]/40"
          >
            <span className="material-symbols-outlined text-[#1a56db] text-[22px]">
              fingerprint
            </span>
            <span className="text-label-md font-bold">Touch ID</span>
          </button>
        </div>
      </div>

      {/* Trust & Micro Features Grid */}
      <div className="grid grid-cols-3 gap-2 mt-5 mb-6">
        <div className="bg-[#ffffff] p-3 rounded-xl text-center flex flex-col items-center shadow-xs border border-[#eff4ff]">
          <div className="w-8 h-8 rounded-full bg-[#6cf8bb] flex items-center justify-center text-[#00714d] mb-1">
            <span className="material-symbols-outlined text-[18px]">bolt</span>
          </div>
          <span className="text-label-sm text-[#0b1c30] font-bold">Zero Wait</span>
          <span className="text-body-sm text-[#737686] scale-90">Instant ledger</span>
        </div>

        <div className="bg-[#ffffff] p-3 rounded-xl text-center flex flex-col items-center shadow-xs border border-[#eff4ff]">
          <div className="w-8 h-8 rounded-full bg-[#dbe1ff] flex items-center justify-center text-[#003fb1] mb-1">
            <span className="material-symbols-outlined text-[18px]">security</span>
          </div>
          <span className="text-label-sm text-[#0b1c30] font-bold">256-bit</span>
          <span className="text-body-sm text-[#737686] scale-90">Encrypted</span>
        </div>

        <div className="bg-[#ffffff] p-3 rounded-xl text-center flex flex-col items-center shadow-xs border border-[#eff4ff]">
          <div className="w-8 h-8 rounded-full bg-[#d3e4fe] flex items-center justify-center text-[#434654] mb-1">
            <span className="material-symbols-outlined text-[18px]">qr_code_2</span>
          </div>
          <span className="text-label-sm text-[#0b1c30] font-bold">Scan &amp; Pay</span>
          <span className="text-body-sm text-[#737686] scale-90">Any Merchant</span>
        </div>
      </div>
    </div>
  );
};
