
export interface Category {
  id: number;
  name: string;
  icon: string;
  description: string;
  image?: string;
}

export interface LeaderboardUser {
  id?: string;
  rank: number;
  name: string;
  email?: string;
  points: number;
  avatar: string;
  isUser?: boolean;
  role?: 'user' | 'admin';
  status?: 'Active' | 'Suspended';
  joinedDate?: string;
}

export interface ImpactStats {
  totalDevices: number;
  devicesRepaired: number;
  devicesRecycled: number;
  co2Saved: number;
  treesEquivalent: number;
}

export interface CollectionPoint {
  id: number;
  name: string;
  location: string;
  address?: string; // Added for admin
  hours: string;
  coordinates: { lat: number; lng: number };
  phone: string;
  email: string;
  mapUrl: string;
  status?: 'Active' | 'Maintenance' | 'Closed';
  totalCollected?: number;
}

export interface CollectionPointMessage {
    id: string;
    pointId: number;
    pointName: string;
    text: string;
    date: string;
}

export interface QuestionFlowAnswers {
    category?: string;
    userType?: string;
    deviceCondition?: string;
    intent?: string;
    location?: string;
}

export interface UserActivity {
    id: number;
    date: string;
    item: string;
    category: string;
    action: string;
    credits: number;
    status: 'Verified' | 'Processing' | 'Completed';
}

export interface BlogPost {
    id: string;
    title: string;
    excerpt: string;
    content: string;
    date: string;
    author: string;
    category: string;
    image: string;
    status?: 'Published' | 'Draft';
}

export interface UserRequest {
    id: string;
    type: 'Support' | 'Feedback' | 'Bug Report' | 'Feature Request';
    subject: string;
    message: string;
    date: string;
    status: 'Open' | 'In Progress' | 'Resolved' | 'Closed';
    response?: string;
    userId?: string;
    userName?: string;
}

export interface Submission {
  id: string;
  userId?: string;
  userName?: string;
  category: string;
  condition: string;
  intent: string;
  recommendation: string;
  status: 'PENDING' | 'DROPPED' | 'COMPLETED' | 'REJECTED';
  creditsPending: number;
  creditsAwarded: number;
  dropOffCode: string;
  createdAt: string;
  droppedAt?: string;
  verifiedAt?: string;
  rejectedReason?: string;
  adminId?: string;
}

export interface ActivityLog {
    id: string;
    action: string;
    adminId: string;
    adminName: string;
    targetId?: string;
    details: string;
    timestamp: string;
}

// --- NEW REDEMPTION SYSTEM TYPES ---

export interface Reward {
  id: string;
  name: string;
  description: string;
  category: 'recognition' | 'campus_perk' | 'physical_item' | 'impact';
  creditCost: number;
  minTier: 'bronze' | 'silver' | 'gold' | 'platinum';
  stock: number | 'unlimited';
  imageUrl: string;
  redemptionType: 'instant' | 'requires_approval' | 'scheduled';
  availability?: {
    startDate?: string;
    endDate?: string;
    campusOnly: boolean;
  };
  termsAndConditions?: string;
}

export interface RedemptionTransaction {
  id: string;
  userId: string;
  rewardId: string;
  rewardName: string;
  creditsCost: number;
  status: 'pending' | 'approved' | 'fulfilled' | 'rejected' | 'cancelled';
  redemptionCode?: string;
  redeemedAt: string; // ISO Date
  fulfilledAt?: string;
  approvedBy?: string;
  notes?: string;
  expiresAt?: string;
}

export interface CreditTransaction {
  id: string;
  userId: string;
  type: 'earned' | 'spent' | 'refunded' | 'expired';
  amount: number;
  balance: number;
  source: 'submission' | 'redemption' | 'admin_award' | 'referral' | 'bonus';
  referenceId?: string;
  description: string;
  timestamp: string;
}
