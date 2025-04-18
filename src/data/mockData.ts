
import { Startup, Investor, Message, Conversation, User, WishlistItem } from '@/types';

export const mockUsers: User[] = [
  {
    id: '1',
    name: 'John Investor',
    email: 'john@invest.com',
    role: 'investor',
    createdAt: new Date('2023-01-15')
  },
  {
    id: '2',
    name: 'Sarah Founder',
    email: 'sarah@techstart.com',
    role: 'startup',
    createdAt: new Date('2023-02-10')
  },
  {
    id: '3',
    name: 'Venture Capital LLC',
    email: 'contact@venturecap.com',
    role: 'investor',
    createdAt: new Date('2023-01-05')
  },
  {
    id: '4',
    name: 'EcoSolutions Inc',
    email: 'hello@ecosolutions.com',
    role: 'startup',
    createdAt: new Date('2023-03-20')
  }
];

export const mockStartups: Startup[] = [
  {
    id: '1',
    name: 'TechNova',
    logo: '/placeholder.svg',
    description: 'Revolutionary AI-powered solution for small businesses',
    industry: 'Technology',
    foundedYear: 2022,
    location: 'San Francisco, CA',
    website: 'https://technova.example.com',
    valuation: 5000000,
    fundingRequired: 1000000,
    equityOffered: 15,
    founder: 'Sarah Smith',
    founderEmail: 'sarah@technova.example.com',
    founderPhone: '+1234567890',
    status: 'seeking',
    financialHistory: [
      { year: 2022, revenue: 50000, expenses: 120000 },
      { year: 2023, revenue: 250000, expenses: 200000 }
    ]
  },
  {
    id: '2',
    name: 'EcoSolutions',
    logo: '/placeholder.svg',
    description: 'Sustainable packaging solutions for e-commerce businesses',
    industry: 'Green Technology',
    foundedYear: 2021,
    location: 'Portland, OR',
    website: 'https://ecosolutions.example.com',
    valuation: 3000000,
    fundingRequired: 800000,
    equityOffered: 20,
    founder: 'Michael Green',
    founderEmail: 'michael@ecosolutions.example.com',
    founderPhone: '+1987654321',
    status: 'seeking',
    financialHistory: [
      { year: 2021, revenue: 20000, expenses: 100000 },
      { year: 2022, revenue: 150000, expenses: 160000 },
      { year: 2023, revenue: 320000, expenses: 280000 }
    ]
  },
  {
    id: '3',
    name: 'HealthTrack',
    logo: '/placeholder.svg',
    description: 'Mobile platform for personalized health tracking and recommendations',
    industry: 'Healthcare',
    foundedYear: 2020,
    location: 'Boston, MA',
    website: 'https://healthtrack.example.com',
    valuation: 8000000,
    fundingRequired: 1500000,
    equityOffered: 12,
    founder: 'Jessica Chen',
    founderEmail: 'jessica@healthtrack.example.com',
    founderPhone: '+1122334455',
    status: 'seeking',
    financialHistory: [
      { year: 2020, revenue: 10000, expenses: 80000 },
      { year: 2021, revenue: 120000, expenses: 150000 },
      { year: 2022, revenue: 350000, expenses: 300000 },
      { year: 2023, revenue: 750000, expenses: 600000 }
    ]
  },
  {
    id: '4',
    name: 'FinEdge',
    logo: '/placeholder.svg',
    description: 'Democratizing investment opportunities for the unbanked population',
    industry: 'Fintech',
    foundedYear: 2021,
    location: 'New York, NY',
    website: 'https://finedge.example.com',
    valuation: 10000000,
    fundingRequired: 2000000,
    equityOffered: 10,
    founder: 'Robert Johnson',
    founderEmail: 'robert@finedge.example.com',
    founderPhone: '+1567891234',
    status: 'seeking',
    financialHistory: [
      { year: 2021, revenue: 50000, expenses: 200000 },
      { year: 2022, revenue: 450000, expenses: 400000 },
      { year: 2023, revenue: 1200000, expenses: 900000 }
    ]
  },
  {
    id: '5',
    name: 'DeliveryDash',
    logo: '/placeholder.svg',
    description: 'Hyperlocal delivery platform connecting local stores with customers',
    industry: 'Logistics',
    foundedYear: 2022,
    location: 'Chicago, IL',
    website: 'https://deliverydash.example.com',
    valuation: 4000000,
    fundingRequired: 1200000,
    equityOffered: 18,
    founder: 'David Martinez',
    founderEmail: 'david@deliverydash.example.com',
    founderPhone: '+1321654987',
    status: 'seeking',
    financialHistory: [
      { year: 2022, revenue: 80000, expenses: 180000 },
      { year: 2023, revenue: 420000, expenses: 380000 }
    ]
  },
  {
    id: '6',
    name: 'EduTech',
    logo: '/placeholder.svg',
    description: 'Interactive learning platform for K-12 students',
    industry: 'Education',
    foundedYear: 2020,
    location: 'Austin, TX',
    website: 'https://edutech.example.com',
    valuation: 7000000,
    fundingRequired: 1800000,
    equityOffered: 15,
    founder: 'Emma Wilson',
    founderEmail: 'emma@edutech.example.com',
    founderPhone: '+1456789123',
    status: 'seeking',
    financialHistory: [
      { year: 2020, revenue: 5000, expenses: 60000 },
      { year: 2021, revenue: 100000, expenses: 150000 },
      { year: 2022, revenue: 350000, expenses: 300000 },
      { year: 2023, revenue: 800000, expenses: 650000 }
    ]
  }
];

export const mockInvestors: Investor[] = [
  {
    id: '1',
    name: 'Blue Venture Capital',
    logo: '/placeholder.svg',
    description: 'Early-stage VC focusing on technology startups',
    investmentFocus: ['Technology', 'Fintech', 'AI'],
    minInvestment: 500000,
    maxInvestment: 5000000,
    portfolioSize: 24,
    location: 'San Francisco, CA',
    website: 'https://blueventure.example.com'
  },
  {
    id: '2',
    name: 'Green Growth Fund',
    logo: '/placeholder.svg',
    description: 'Impact investment fund focused on sustainable businesses',
    investmentFocus: ['Green Technology', 'Renewable Energy', 'Sustainable Agriculture'],
    minInvestment: 300000,
    maxInvestment: 3000000,
    portfolioSize: 15,
    location: 'Seattle, WA',
    website: 'https://greengrowth.example.com'
  },
  {
    id: '3',
    name: 'Health Innovations Partners',
    logo: '/placeholder.svg',
    description: 'Specialized fund for healthcare and biotech startups',
    investmentFocus: ['Healthcare', 'Biotech', 'Medtech'],
    minInvestment: 1000000,
    maxInvestment: 8000000,
    portfolioSize: 18,
    location: 'Boston, MA',
    website: 'https://healthinnovations.example.com'
  }
];

export const mockMessages: Message[] = [
  {
    id: '1',
    senderId: '1',
    receiverId: '2',
    content: "Hello, I'm interested in learning more about your startup.",
    timestamp: new Date('2023-05-15T14:30:00'),
    read: true
  },
  {
    id: '2',
    senderId: '2',
    receiverId: '1',
    content: 'Hi there! Thanks for your interest. What would you like to know?',
    timestamp: new Date('2023-05-15T15:45:00'),
    read: true
  },
  {
    id: '3',
    senderId: '1',
    receiverId: '2',
    content: 'Could you share some details about your traction so far?',
    timestamp: new Date('2023-05-16T09:20:00'),
    read: false
  }
];

export const mockConversations: Conversation[] = [
  {
    id: '1',
    participantIds: ['1', '2'],
    lastMessageId: '3',
    lastMessageTimestamp: new Date('2023-05-16T09:20:00'),
    unreadCount: 1
  }
];

export const mockWishlist: WishlistItem[] = [
  {
    investorId: '1',
    startupId: '3',
    addedAt: new Date('2023-05-10')
  },
  {
    investorId: '1',
    startupId: '5',
    addedAt: new Date('2023-05-12')
  }
];

// Current logged in user - will be replaced with auth system
export let currentUser: User | null = null;

// Auth utility functions
export const login = (email: string, password: string, role: UserRole): User | null => {
  // In a real app, this would verify credentials against a database
  const user = mockUsers.find(u => u.email === email && u.role === role);
  if (user) {
    currentUser = user;
    return user;
  }
  return null;
};

export const logout = () => {
  currentUser = null;
};

export const register = (name: string, email: string, role: UserRole): User => {
  // In a real app, this would create a new user in the database
  const newUser: User = {
    id: `${mockUsers.length + 1}`,
    name,
    email,
    role,
    createdAt: new Date()
  };
  
  mockUsers.push(newUser);
  currentUser = newUser;
  return newUser;
};

// Wishlist functions
export const addToWishlist = (investorId: string, startupId: string) => {
  const exists = mockWishlist.some(
    item => item.investorId === investorId && item.startupId === startupId
  );
  
  if (!exists) {
    mockWishlist.push({
      investorId,
      startupId,
      addedAt: new Date()
    });
  }
};

export const removeFromWishlist = (investorId: string, startupId: string) => {
  const index = mockWishlist.findIndex(
    item => item.investorId === investorId && item.startupId === startupId
  );
  
  if (index !== -1) {
    mockWishlist.splice(index, 1);
  }
};

export const getWishlistForInvestor = (investorId: string): Startup[] => {
  const wishlistIds = mockWishlist
    .filter(item => item.investorId === investorId)
    .map(item => item.startupId);
  
  return mockStartups.filter(startup => wishlistIds.includes(startup.id));
};
