export type ScreenTab = 'home' | 'send' | 'receive' | 'history' | 'profile';

export interface Contact {
  id: string;
  name: string;
  handle: string;
  avatar: string;
  isOnline?: boolean;
  isVerified?: boolean;
  category?: 'person' | 'merchant';
  note?: string;
}

export interface Transaction {
  id: string;
  refId: string;
  title: string;
  subtitle: string;
  amount: number;
  type: 'sent' | 'received';
  status: 'Success' | 'Pending' | 'Failed';
  timestamp: string;
  dateGroup: 'Today' | 'Yesterday' | 'May 2025' | 'Earlier';
  recipient: string;
  recipientHandle: string;
  sender: string;
  senderHandle: string;
  paymentMethod: string;
  category?: 'transfer' | 'food' | 'freelance' | 'shopping' | 'utility' | 'deposit';
  note?: string;
  avatar?: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  read: boolean;
  type: 'payment' | 'security' | 'promo' | 'system';
  icon: string;
}

export interface UserProfile {
  name: string;
  handle: string;
  email: string;
  avatar: string;
  phone: string;
  isVerified: boolean;
  tier: string;
  monthlyLimit: number;
  monthlySpent: number;
}
