import React, { createContext, useContext, useState, useEffect } from 'react';
import { ScreenTab, Transaction, Contact, NotificationItem, UserProfile } from '../types';
import { CURRENT_USER, INITIAL_CONTACTS, INITIAL_TRANSACTIONS, INITIAL_NOTIFICATIONS } from '../data/mockData';

interface WalletContextType {
  isAuthenticated: boolean;
  currentUser: UserProfile;
  balance: number;
  isBalanceHidden: boolean;
  toggleBalanceVisibility: () => void;
  addFunds: (amount?: number) => void;
  activeTab: ScreenTab;
  setActiveTab: (tab: ScreenTab) => void;
  transactions: Transaction[];
  contacts: Contact[];
  sendMoney: (recipientName: string, recipientHandle: string, amount: number, note?: string, avatar?: string) => Transaction;
  payBill: (title: string, amount: number, category: string) => void;
  selectedReceipt: Transaction | null;
  setSelectedReceipt: (tx: Transaction | null) => void;
  sendPrefill: { name: string; handle: string; avatar?: string } | null;
  setSendPrefill: (data: { name: string; handle: string; avatar?: string } | null) => void;
  toast: { message: string; visible: boolean; icon?: string } | null;
  showToast: (msg: string, icon?: string) => void;
  hideToast: () => void;
  isQrScannerOpen: boolean;
  setIsQrScannerOpen: (open: boolean) => void;
  isNotificationsOpen: boolean;
  setIsNotificationsOpen: (open: boolean) => void;
  notifications: NotificationItem[];
  markAllNotificationsRead: () => void;
  activeBillService: string | null;
  setActiveBillService: (service: string | null) => void;
  login: () => void;
  logout: () => void;
  resetDemoState: () => void;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export const WalletProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [currentUser] = useState<UserProfile>(CURRENT_USER);
  const [balance, setBalance] = useState<number>(2450.00);
  const [isBalanceHidden, setIsBalanceHidden] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<ScreenTab>('home');
  const [transactions, setTransactions] = useState<Transaction[]>(INITIAL_TRANSACTIONS);
  const [contacts] = useState<Contact[]>(INITIAL_CONTACTS);
  const [selectedReceipt, setSelectedReceipt] = useState<Transaction | null>(null);
  const [sendPrefill, setSendPrefill] = useState<{ name: string; handle: string; avatar?: string } | null>(null);
  const [toast, setToast] = useState<{ message: string; visible: boolean; icon?: string } | null>(null);
  const [isQrScannerOpen, setIsQrScannerOpen] = useState<boolean>(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState<boolean>(false);
  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);
  const [activeBillService, setActiveBillService] = useState<string | null>(null);

  // Toast auto-hide
  useEffect(() => {
    if (toast?.visible) {
      const timer = setTimeout(() => {
        setToast((prev) => (prev ? { ...prev, visible: false } : null));
      }, 2600);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const showToast = (message: string, icon: string = 'check_circle') => {
    setToast({ message, visible: true, icon });
  };

  const hideToast = () => {
    setToast(null);
  };

  const toggleBalanceVisibility = () => {
    setIsBalanceHidden((prev) => !prev);
  };

  const addFunds = (amount: number = 500) => {
    setBalance((prev) => prev + amount);
    const newTx: Transaction = {
      id: 'tx-' + Date.now(),
      refId: 'EP-TOPUP-' + Math.floor(100000 + Math.random() * 900000),
      title: 'Demo Wallet Top-Up',
      subtitle: 'Simulated Sandbox Deposit',
      amount: amount,
      type: 'received',
      status: 'Success',
      timestamp: 'Today, Just now',
      dateGroup: 'Today',
      recipient: currentUser.name,
      recipientHandle: currentUser.handle,
      sender: 'EasyPay Sandbox Gateway',
      senderHandle: 'gateway@easypay.sandbox',
      paymentMethod: 'Instant Sandbox Card',
      category: 'deposit'
    };
    setTransactions((prev) => [newTx, ...prev]);
    showToast(`Added +$${amount.toFixed(2)} simulated demo funds!`, 'add_circle');
  };

  const sendMoney = (
    recipientName: string,
    recipientHandle: string,
    amount: number,
    note?: string,
    avatar?: string
  ): Transaction => {
    setBalance((prev) => Math.max(0, prev - amount));
    const newTx: Transaction = {
      id: 'tx-' + Date.now(),
      refId: 'EP-DEMO-' + Math.floor(100000 + Math.random() * 900000),
      title: recipientName,
      subtitle: (note || 'Instant Transfer') + ' • Just now',
      amount: amount,
      type: 'sent',
      status: 'Success',
      timestamp: 'Today, Just now',
      dateGroup: 'Today',
      recipient: recipientName,
      recipientHandle: recipientHandle,
      sender: currentUser.name,
      senderHandle: currentUser.handle,
      paymentMethod: 'EasyPay Demo Wallet',
      category: 'transfer',
      note: note,
      avatar: avatar
    };
    setTransactions((prev) => [newTx, ...prev]);
    return newTx;
  };

  const payBill = (title: string, amount: number, category: string) => {
    setBalance((prev) => Math.max(0, prev - amount));
    const newTx: Transaction = {
      id: 'tx-' + Date.now(),
      refId: 'EP-BILL-' + Math.floor(100000 + Math.random() * 900000),
      title: title,
      subtitle: `${category} • Just now`,
      amount: amount,
      type: 'sent',
      status: 'Success',
      timestamp: 'Today, Just now',
      dateGroup: 'Today',
      recipient: title,
      recipientHandle: `merchant.${title.toLowerCase().replace(/\s+/g, '')}@easypay`,
      sender: currentUser.name,
      senderHandle: currentUser.handle,
      paymentMethod: 'EasyPay Demo Wallet',
      category: 'utility'
    };
    setTransactions((prev) => [newTx, ...prev]);
    showToast(`Paid $${amount.toFixed(2)} to ${title}!`, 'receipt_long');
  };

  const markAllNotificationsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    showToast('Notifications marked as read');
  };

  const login = () => {
    setIsAuthenticated(true);
    setActiveTab('home');
  };

  const logout = () => {
    setIsAuthenticated(false);
    showToast('Logged out of EasyPay session');
  };

  const resetDemoState = () => {
    setBalance(2450.00);
    setTransactions(INITIAL_TRANSACTIONS);
    setIsBalanceHidden(false);
    showToast('Demo wallet reset to default $2,450.00');
  };

  return (
    <WalletContext.Provider
      value={{
        isAuthenticated,
        currentUser,
        balance,
        isBalanceHidden,
        toggleBalanceVisibility,
        addFunds,
        activeTab,
        setActiveTab,
        transactions,
        contacts,
        sendMoney,
        payBill,
        selectedReceipt,
        setSelectedReceipt,
        sendPrefill,
        setSendPrefill,
        toast,
        showToast,
        hideToast,
        isQrScannerOpen,
        setIsQrScannerOpen,
        isNotificationsOpen,
        setIsNotificationsOpen,
        notifications,
        markAllNotificationsRead,
        activeBillService,
        setActiveBillService,
        login,
        logout,
        resetDemoState
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = (): WalletContextType => {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
};
