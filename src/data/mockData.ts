import { Contact, Transaction, NotificationItem, UserProfile } from '../types';

export const APP_LOGO = 'https://lh3.googleusercontent.com/aida/AEtjO1WNDVfMC6945AsJWNewJWYWtEGh_-xcXIMgQQajNoAu91pgzMuuvyS55BL4PNx-ZZU2kJcPnicT93PyndDBWVGVIT0HQu4xkV8i5wRE5TN5-o4JLpdqFI3YCoWQLmoIi0s1_4FvrLAqbF2hfvlNGOlYmWRVxSFG-KonegxIxw8UA3NlRxKhmNRqis_IyWUxQBG68VI5w_7vhSzTvSLfRiwtl8fklf-1s5QdVEx5ZmHbWLeArajjxDn-g0w';

export const CURRENT_USER: UserProfile = {
  name: 'Alex Morgan',
  handle: 'alex.pay@easypay',
  email: 'alex.pay@easypay.demo',
  phone: '+1 (555) 019-2834',
  avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAZqJ6GyMb2ESTD6yNduc4hW1WYGP05H2151IzhCFGqmRzbnflXF2tV7BD1e7hecvAIVTF7RW2cdg4H4Bp-0O88cBEJSYzxAy7GOUXbfRC3KJiP4ZcnCmfAj5TfcyXvCQRAZeMy98qjFcNbfsKeU8i7sixbP8kSjrmuMX_X8n1RlxaIBwERqchR_XyB3YXzLGydg4XDF_YGv1-q-x0W7DmBxhOlmlWlc4lUnBwAsoctrRsiYRrMoGwt',
  isVerified: true,
  tier: 'Tier 3 Verified',
  monthlyLimit: 50000,
  monthlySpent: 12450
};

export const INITIAL_CONTACTS: Contact[] = [
  {
    id: 'c1',
    name: 'Sarah M.',
    handle: 'sarah.m@easypay',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDaNm9NznohJqVEoVtvXGoXe5X0WLtWu8V1dYKXWgovq9cBB1ZzR_pBSeMArd02Wu7oA_wDSQTbPA39ftMPlql5xTEjRO4sP7mfDujPb2FJ6hyNLMSCAMGPMl6eQj7FsxMiUW74UQ5TfXD3BEYPiygm60w3HBaa38hzZ4NWDCVPInWFOBBsp-nelyNYjcqCFdz2pNgIRlQKIZpM5eYq4qa-ru7v1QwcENg9TpoX_Wd7L1TZCCB2XQtS',
    isOnline: true,
    isVerified: true,
    category: 'person'
  },
  {
    id: 'c2',
    name: 'Liam K.',
    handle: 'liam.king@easypay.demo',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCufA204J-OzUIezAzBJuZXwj-YDSwLLh_SIeJItfU-Go7tGDtcUNb3sDuQqbrWd1HtWvd5xdputbctJA1rxy5TzGlMqegntjKwieRjoMnXkHpYuK8BFJdBFZaI0WuPjEIeYMvnlgvpqCdOeKdkYVGRczCCGEhRXM1l-0IlgP1xw7rBIFJsJiunT0juMt4x5fep0cDuFwSo2f90ZUevDiD1CCxvl1I8ESAVO9cfMsJETldYqxbDjfRn',
    isOnline: true,
    isVerified: true,
    category: 'person'
  },
  {
    id: 'c3',
    name: 'Priya R.',
    handle: 'priya@easypay',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBQoa7ZGK_D_1viKu9f0_pb1KxWBXU8LI2zvq3kLgk-9KKH70jEbTsI_57ZnsKQo87GSwnHi_EuHwULIps8-4O81gfjNCyjp5q5x8TbsdryYyXmVt8c0Aya8MJZl8dsPxtJ83VxNr5r0QPFBxeo7je30lCS4ZtqJSg2MLjE9E8QkgHEP0RRySJ-TkDPveZwEbH6xvWD2123od1JMIBTQkN7LoscPaGMjqfv4awYysRkzKUP_zymlF2_',
    isOnline: false,
    isVerified: true,
    category: 'person'
  },
  {
    id: 'c4',
    name: 'TechCafe',
    handle: 'merchant.techcafe@easypay.demo',
    avatar: '',
    isOnline: true,
    isVerified: true,
    category: 'merchant'
  },
  {
    id: 'c5',
    name: 'Alex Chen',
    handle: '+1 555-0192',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDM3kuulm3SNY56IqtxHttK2LQrxF_lH34-2iu0FkCCTHco--QxJpuO6WZubEdhqrib1FAmdWqgis7KphfFoUSb4fqXQXOGxjYS68gYUoyjC4Kq_Zrs_eC3moom_Z5RS5JqudOvvEAq_7Fte8M8uqi65By8tJeRIJRz7QLOwAle1KKtemehY-KG_-puvCvDVNmWwNEKSRFLtO8oLNby3KFF5asvJMfRttaNCH9RQDSWhAAoXH--tqyx',
    isOnline: false,
    isVerified: true,
    category: 'person'
  },
  {
    id: 'c6',
    name: 'Coffee Club',
    handle: 'split.coffee@easypay',
    avatar: '',
    isOnline: true,
    isVerified: true,
    category: 'merchant'
  }
];

export const INITIAL_TRANSACTIONS: Transaction[] = [
  {
    id: 't1',
    refId: 'EP-DEMO-88392019',
    title: 'Priya Sharma',
    subtitle: 'Split Bill • 2:45 PM',
    amount: 35.00,
    type: 'received',
    status: 'Success',
    timestamp: 'Today, 2:45 PM',
    dateGroup: 'Today',
    recipient: 'Alex Morgan',
    recipientHandle: 'alex.pay@easypay',
    sender: 'Priya Sharma',
    senderHandle: 'priya.sharma@easypay.demo',
    paymentMethod: 'EasyPay Demo Wallet',
    category: 'transfer',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBQoa7ZGK_D_1viKu9f0_pb1KxWBXU8LI2zvq3kLgk-9KKH70jEbTsI_57ZnsKQo87GSwnHi_EuHwULIps8-4O81gfjNCyjp5q5x8TbsdryYyXmVt8c0Aya8MJZl8dsPxtJ83VxNr5r0QPFBxeo7je30lCS4ZtqJSg2MLjE9E8QkgHEP0RRySJ-TkDPveZwEbH6xvWD2123od1JMIBTQkN7LoscPaGMjqfv4awYysRkzKUP_zymlF2_'
  },
  {
    id: 't2',
    refId: 'EP-DEMO-44910283',
    title: 'Tech Cafe',
    subtitle: 'Cold Brew & Muffin • 9:15 AM',
    amount: 8.50,
    type: 'sent',
    status: 'Success',
    timestamp: 'Yesterday, 9:15 AM',
    dateGroup: 'Yesterday',
    recipient: 'Tech Cafe Roasters',
    recipientHandle: 'merchant.techcafe@easypay.demo',
    sender: 'Alex Morgan',
    senderHandle: 'alex.pay@easypay',
    paymentMethod: 'EasyPay Demo Wallet',
    category: 'food'
  },
  {
    id: 't3',
    refId: 'EP-DEMO-99120485',
    title: 'Liam King',
    subtitle: 'Freelance Design • 4:20 PM',
    amount: 250.00,
    type: 'received',
    status: 'Success',
    timestamp: 'Yesterday, 4:20 PM',
    dateGroup: 'Yesterday',
    recipient: 'Alex Morgan',
    recipientHandle: 'alex.pay@easypay',
    sender: 'Liam King',
    senderHandle: 'liam.king@easypay.demo',
    paymentMethod: 'EasyPay Demo Wallet',
    category: 'freelance'
  },
  {
    id: 't4',
    refId: 'EP-DEMO-10398472',
    title: 'Online Marketplace',
    subtitle: 'Book Order • May 30',
    amount: 22.00,
    type: 'sent',
    status: 'Pending',
    timestamp: 'May 30, 11:10 AM',
    dateGroup: 'May 2025',
    recipient: 'Online Marketplace Global',
    recipientHandle: 'settlement@marketplace.demo',
    sender: 'Alex Morgan',
    senderHandle: 'alex.pay@easypay',
    paymentMethod: 'EasyPay Demo Wallet',
    category: 'shopping'
  },
  {
    id: 't5',
    refId: 'EP-DEMO-77291834',
    title: 'TechCafe Espresso Bar',
    subtitle: 'Yesterday, 9:15 AM',
    amount: 14.50,
    type: 'sent',
    status: 'Success',
    timestamp: 'Yesterday, 9:15 AM',
    dateGroup: 'Yesterday',
    recipient: 'TechCafe Espresso Bar',
    recipientHandle: 'merchant.techcafe@easypay.demo',
    sender: 'Alex Morgan',
    senderHandle: 'alex.pay@easypay',
    paymentMethod: 'EasyPay Demo Wallet',
    category: 'food'
  },
  {
    id: 't6',
    refId: 'EP-DEMO-66382910',
    title: 'Liam K.',
    subtitle: 'Oct 24, 6:02 PM',
    amount: 120.00,
    type: 'sent',
    status: 'Pending',
    timestamp: 'Oct 24, 6:02 PM',
    dateGroup: 'Earlier',
    recipient: 'Liam K.',
    recipientHandle: 'liam.k@easypay',
    sender: 'Alex Morgan',
    senderHandle: 'alex.pay@easypay',
    paymentMethod: 'EasyPay Demo Wallet',
    category: 'transfer'
  }
];

export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'n1',
    title: 'Payment Received',
    description: 'Priya Sharma sent you $35.00 with note "Split Bill"',
    timestamp: '2:45 PM',
    read: false,
    type: 'payment',
    icon: 'call_received'
  },
  {
    id: 'n2',
    title: 'Demo Wallet Activated',
    description: 'Virtual sandbox ledger ready with zero-wait instant settlement.',
    timestamp: 'Yesterday',
    read: true,
    type: 'system',
    icon: 'verified_user'
  },
  {
    id: 'n3',
    title: 'Biometric Access',
    description: 'Face ID & Touch ID configured for one-tap payments.',
    timestamp: '2 days ago',
    read: true,
    type: 'security',
    icon: 'fingerprint'
  }
];
