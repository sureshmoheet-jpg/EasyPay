/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { WalletProvider, useWallet } from './context/WalletContext';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { Toast } from './components/Toast';
import { ReceiptModal } from './components/ReceiptModal';
import { QrScannerModal } from './components/QrScannerModal';
import { NotificationsModal } from './components/NotificationsModal';
import { BillPayModal } from './components/BillPayModal';

import { LoginScreen } from './screens/LoginScreen';
import { HomeScreen } from './screens/HomeScreen';
import { SendScreen } from './screens/SendScreen';
import { ReceiveScreen } from './screens/ReceiveScreen';
import { HistoryScreen } from './screens/HistoryScreen';
import { ProfileScreen } from './screens/ProfileScreen';

const MainApp: React.FC = () => {
  const { isAuthenticated, activeTab } = useWallet();

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#f8f9ff] flex flex-col justify-center">
        <LoginScreen />
        <Toast />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8f9ff] text-[#0b1c30] flex flex-col">
      <Header />

      <main className="flex-1 flex flex-col w-full">
        {activeTab === 'home' && <HomeScreen />}
        {activeTab === 'send' && <SendScreen />}
        {activeTab === 'receive' && <ReceiveScreen />}
        {activeTab === 'history' && <HistoryScreen />}
        {activeTab === 'profile' && <ProfileScreen />}
      </main>

      <BottomNav />

      {/* Global Modals & Overlays */}
      <ReceiptModal />
      <QrScannerModal />
      <NotificationsModal />
      <BillPayModal />
      <Toast />
    </div>
  );
};

export default function App() {
  return (
    <WalletProvider>
      <MainApp />
    </WalletProvider>
  );
}
