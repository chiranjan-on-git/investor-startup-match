
export type UserRole = 'investor' | 'startup';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  createdAt: Date;
}

export interface Startup {
  id: string;
  name: string;
  logo: string;
  description: string;
  industry: string;
  foundedYear: number;
  location: string;
  website: string;
  valuation: number;
  fundingRequired: number;
  equityOffered: number;
  founder: string;
  founderEmail: string;
  founderPhone: string;
  status: 'seeking' | 'funded' | 'acquired';
  financialHistory: {
    year: number;
    revenue: number;
    expenses: number;
  }[];
}

export interface Investor {
  id: string;
  name: string;
  logo: string;
  description: string;
  investmentFocus: string[];
  minInvestment: number;
  maxInvestment: number;
  portfolioSize: number;
  location: string;
  website: string;
}

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: Date;
  read: boolean;
}

export interface Conversation {
  id: string;
  participantIds: string[];
  lastMessageId: string;
  lastMessageTimestamp: Date;
  unreadCount: number;
}

export interface WishlistItem {
  investorId: string;
  startupId: string;
  addedAt: Date;
}
