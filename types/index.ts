
export interface Category {
  id: number;
  name: string;
  icon: string;
  description: string;
  image?: string;
}

export interface LeaderboardUser {
  rank: number;
  name: string;
  points: number;
  avatar: string;
  isUser?: boolean;
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
  hours: string;
  coordinates: { lat: number; lng: number };
  phone: string;
  email: string;
  mapUrl: string;
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
}

export interface UserRequest {
    id: string;
    type: 'Support' | 'Feedback' | 'Bug Report' | 'Feature Request';
    subject: string;
    message: string;
    date: string;
    status: 'Open' | 'In Progress' | 'Resolved' | 'Closed';
    response?: string;
}

export interface Submission {
  id: string;
  category: string;
  condition: string;
  intent: string;
  recommendation: string;
  status: 'PENDING' | 'DROPPED' | 'COMPLETED';
  creditsPending: number;
  creditsAwarded: number;
  dropOffCode: string;
  createdAt: string;
  droppedAt?: string;
}
