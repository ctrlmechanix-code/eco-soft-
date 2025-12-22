
import type { Category, LeaderboardUser, ImpactStats, CollectionPoint, UserActivity, BlogPost, UserRequest, Submission, ActivityLog, Reward, RedemptionTransaction, CreditTransaction } from '../types';

export const categories: Category[] = [
  {
    id: 1,
    name: "Mobile Phones",
    icon: "Smartphone",
    description: "Old phones, smartphones, and tablets.",
    image: "https://api.dicebear.com/8.x/icons/svg?seed=smartphone&backgroundColor=ecfdf5,d1fae5",
  },
  {
    id: 2,
    name: "Laptops",
    icon: "Laptop",
    description: "Laptops, notebooks, and peripherals.",
    image: "https://api.dicebear.com/8.x/icons/svg?seed=laptop&backgroundColor=ecfdf5,d1fae5",
  },
  {
    id: 3,
    name: "Batteries & Power Banks",
    icon: "BatteryCharging",
    description: "All types of batteries and portable chargers.",
    image: "https://api.dicebear.com/8.x/icons/svg?seed=battery-charging&backgroundColor=ecfdf5,d1fae5",
  },
  {
    id: 4,
    name: "Accessories",
    icon: "Cable",
    description: "Cables, chargers, headphones, and mice.",
    image: "https://api.dicebear.com/8.x/icons/svg?seed=cable&backgroundColor=ecfdf5,d1fae5",
  },
  {
    id: 5,
    name: "TVs & Appliances",
    icon: "Monitor",
    description: "Monitors, small TVs, and kitchen appliances.",
    image: "https://api.dicebear.com/8.x/icons/svg?seed=monitor&backgroundColor=ecfdf5,d1fae5",
  },
  {
    id: 6,
    name: "Lab/Hostel Devices",
    icon: "Beaker",
    description: "Specialized electronic equipment from labs or hostels.",
    image: "https://api.dicebear.com/8.x/icons/svg?seed=beaker&backgroundColor=ecfdf5,d1fae5",
  },
  {
    id: 7,
    name: "Other",
    icon: "MoreHorizontal",
    description: "Any other electronic device not listed above.",
    image: "https://api.dicebear.com/8.x/icons/svg?seed=other&backgroundColor=ecfdf5,d1fae5",
  },
];

export const leaderboard: LeaderboardUser[] = [
  { id: "USR-001", rank: 1, name: "Aarav Sharma", email: "aarav@university.edu", points: 450, avatar: "https://api.dicebear.com/8.x/avataaars/svg?seed=Aarav", role: "user", status: "Active", joinedDate: "2023-09-01" },
  { id: "USR-002", rank: 2, name: "Priya Patel", email: "priya@university.edu", points: 410, avatar: "https://api.dicebear.com/8.x/avataaars/svg?seed=Priya", role: "user", status: "Active", joinedDate: "2023-09-15" },
  { id: "USR-CURRENT", rank: 3, name: "Student User", email: "student@university.edu", points: 1550, avatar: "https://api.dicebear.com/8.x/avataaars/svg?seed=You", isUser: true, role: "admin", status: "Active", joinedDate: "2023-09-20" },
  { id: "USR-003", rank: 4, name: "David Kim", email: "david@university.edu", points: 350, avatar: "https://api.dicebear.com/8.x/avataaars/svg?seed=David", role: "user", status: "Active", joinedDate: "2023-10-01" },
  { id: "USR-004", rank: 5, name: "Sarah Jenkins", email: "sarah@university.edu", points: 320, avatar: "https://api.dicebear.com/8.x/avataaars/svg?seed=Sarah", role: "user", status: "Active", joinedDate: "2023-10-05" },
];

export const impactStats: ImpactStats = {
  totalDevices: 12450,
  devicesRepaired: 3420,
  devicesRecycled: 9030,
  co2Saved: 4500,
  treesEquivalent: 150,
};

export const collectionPoints: CollectionPoint[] = [
  { 
    id: 1, 
    name: "Student Center Hub", 
    location: "Building A, Ground Floor", 
    address: "123 Campus Drive, Building A",
    hours: "9 AM - 6 PM", 
    coordinates: { lat: 12.9716, lng: 77.5946 },
    phone: "+91 80-2211-3344",
    email: "studenthub@ecosort.edu",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Student+Center+Hub",
    status: 'Active',
    totalCollected: 1240
  },
  { 
    id: 2, 
    name: "Engineering Lab Drop-off", 
    location: "Tech Block B, Room 102", 
    address: "Tech Block B, 2nd Floor",
    hours: "8 AM - 8 PM", 
    coordinates: { lat: 12.9720, lng: 77.5950 },
    phone: "+91 80-2211-5566",
    email: "engglab@ecosort.edu",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Engineering+Lab",
    status: 'Active',
    totalCollected: 850
  },
  { 
    id: 3, 
    name: "Hostel 4 Recycling Zone", 
    location: "North Campus Hostel Area", 
    address: "Hostel Block 4, Common Area",
    hours: "24/7", 
    coordinates: { lat: 12.9730, lng: 77.5960 },
    phone: "+91 80-2211-7788",
    email: "hostel4@ecosort.edu",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=North+Campus+Hostel",
    status: 'Active',
    totalCollected: 420
  },
  { 
    id: 4, 
    name: "Library E-Waste Bin", 
    location: "Main Library Entrance", 
    address: "Central Library, Foyer",
    hours: "8 AM - 10 PM", 
    coordinates: { lat: 12.9700, lng: 77.5930 },
    phone: "+91 80-2211-9900",
    email: "library@ecosort.edu",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Main+Library",
    status: 'Maintenance',
    totalCollected: 310
  },
];

export const dashboardStats = [
    { label: "Total Recycled", value: 124, icon: "https://api.dicebear.com/8.x/icons/svg?seed=recycle", gradientLight: "bg-emerald-100" },
    { label: "Green Credits", value: 1550, icon: "https://api.dicebear.com/8.x/icons/svg?seed=coin", gradientLight: "bg-amber-100" },
    { label: "CO₂ Saved (kg)", value: 45, icon: "https://api.dicebear.com/8.x/icons/svg?seed=cloud", gradientLight: "bg-blue-100" },
    { label: "Pending Items", value: 2, icon: "https://api.dicebear.com/8.x/icons/svg?seed=clock", gradientLight: "bg-purple-100" },
];

export const questionFlowData = [
    {
        id: 1,
        question: "Is the device currently working?",
        options: ["Yes, perfectly", "Yes, but has issues", "No, won't turn on", "Not sure"],
        key: "deviceCondition"
    },
    {
        id: 2,
        question: "What would you like to do with it?",
        options: ["Recycle it safely", "Donate it", "Repair it", "Get advice"],
        key: "intent"
    },
    {
        id: 3,
        question: "Are you a student or staff member?",
        options: ["Student", "Faculty/Staff", "Visitor", "Alumni"],
        key: "userType"
    }
];

export const achievements = [
    { title: "Early Adopter", description: "First recycling submission", icon: "Award" },
    { title: "Power Saver", description: "Saved 10kg of CO₂", icon: "Zap" },
    { title: "Campus Hero", description: "Referred 5 friends", icon: "Users" },
];

export const userActivity: UserActivity[] = [
    { id: 1, date: '2023-11-20', item: 'MacBook Pro 2015', category: 'Laptops', action: 'Recycled', credits: 150, status: 'Verified' },
    { id: 2, date: '2023-11-15', item: 'Samsung Monitor 24"', category: 'TVs & Appliances', action: 'Donated', credits: 200, status: 'Completed' },
    { id: 3, date: '2023-11-02', item: 'AA Batteries (Box)', category: 'Batteries', action: 'Recycled', credits: 30, status: 'Verified' },
    { id: 4, date: '2023-10-28', item: 'iPhone 11', category: 'Mobile Phones', action: 'Repaired', credits: 0, status: 'Completed' },
];

export const mockRequests: UserRequest[] = [
    {
        id: "REQ-2023-001",
        userId: "USR-001",
        userName: "Aarav Sharma",
        type: "Support",
        subject: "Credits not credited for old phone",
        message: "I dropped off my iPhone 8 at the Student Center Hub last Tuesday but I haven't received my green credits yet.",
        date: "2023-11-18",
        status: "Resolved",
        response: "Credits have been added manually. Apologies for the delay."
    },
    {
        id: "REQ-2023-002",
        userId: "USR-CURRENT",
        userName: "Student User",
        type: "Bug Report",
        subject: "Map not loading on mobile",
        message: "When I try to open the locations page on my Android phone, the map shows a gray box.",
        date: "2023-11-25",
        status: "In Progress"
    }
];

export const mockSubmissions: Submission[] = [
  {
    id: "SUB-001",
    userId: "USR-CURRENT",
    userName: "Student User",
    category: "Mobile Phones",
    condition: "Yes, perfectly",
    intent: "Donate",
    recommendation: "Donate",
    status: "PENDING",
    creditsPending: 50,
    creditsAwarded: 0,
    dropOffCode: "DRP-45678",
    createdAt: new Date(Date.now() - 86400000).toISOString()
  },
  {
    id: "SUB-002",
    userId: "USR-CURRENT",
    userName: "Student User",
    category: "Laptops",
    condition: "No, won't turn on",
    intent: "Recycle it safely",
    recommendation: "Recycle",
    status: "DROPPED",
    creditsPending: 100,
    creditsAwarded: 0,
    dropOffCode: "DRP-12345",
    createdAt: new Date(Date.now() - 172800000).toISOString(),
    droppedAt: new Date(Date.now() - 86400000).toISOString()
  },
  {
    id: "SUB-003",
    userId: "USR-CURRENT",
    userName: "Student User",
    category: "Batteries",
    condition: "Not sure",
    intent: "Recycle it safely",
    recommendation: "Recycle",
    status: "COMPLETED",
    creditsPending: 0,
    creditsAwarded: 30,
    dropOffCode: "DRP-99999",
    createdAt: new Date(Date.now() - 259200000).toISOString(),
    droppedAt: new Date(Date.now() - 172800000).toISOString(),
    verifiedAt: new Date(Date.now() - 86400000).toISOString()
  },
  {
    id: "SUB-004",
    userId: "USR-001",
    userName: "Aarav Sharma",
    category: "Laptops",
    condition: "Yes, perfectly",
    intent: "Donate",
    recommendation: "Donate",
    status: "DROPPED",
    creditsPending: 150,
    creditsAwarded: 0,
    dropOffCode: "DRP-55555",
    createdAt: new Date(Date.now() - 400000000).toISOString(),
    droppedAt: new Date(Date.now() - 100000000).toISOString(),
  }
];

export const activityLogs: ActivityLog[] = [
    {
        id: "ACT-001",
        action: "SUBMISSION_VERIFIED",
        adminId: "USR-CURRENT",
        adminName: "Student User",
        targetId: "SUB-003",
        details: "Verified batch of batteries from Student Center.",
        timestamp: new Date(Date.now() - 86400000).toISOString()
    },
    {
        id: "ACT-002",
        action: "USER_ROLE_UPDATED",
        adminId: "SYSTEM",
        adminName: "System",
        targetId: "USR-CURRENT",
        details: "Promoted to Admin role.",
        timestamp: new Date(Date.now() - 900000000).toISOString()
    }
];

export const blogPosts: BlogPost[] = [
    {
        id: "e-waste-crisis",
        title: "The Silent Crisis: E-Waste on Campuses",
        excerpt: "Why universities are becoming major hotspots for electronic waste and how we can stop it.",
        date: "Oct 24, 2023",
        author: "Sarah Jenkins",
        category: "Awareness",
        image: "https://images.unsplash.com/photo-1550989460-0adf9ea622e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        content: `...`,
        status: 'Published'
    },
    {
        id: "lithium-batteries-guide",
        title: "How to Properly Dispose of Lithium Batteries",
        excerpt: "A guide to handling one of the most dangerous components in modern electronics.",
        date: "Nov 02, 2023",
        author: "Mike Chen",
        category: "Guide",
        image: "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        content: `...`,
        status: 'Published'
    },
    {
        id: "eco-sort-milestone",
        title: "ECO-SORT Hits 10,000 Devices Recycled",
        excerpt: "Celebrating a major milestone in our journey towards zero-waste campuses.",
        date: "Nov 15, 2023",
        author: "ECO-SORT Team",
        category: "Company News",
        image: "https://images.unsplash.com/photo-1605600659908-0ef719419d41?q=80&w=800&auto=format&fit=crop",
        content: `...`,
        status: 'Published'
    }
];

// --- NEW DATA FOR REWARDS ---

export const rewardCatalog: Reward[] = [
  {
    id: 'reward-001',
    name: 'Bronze Badge',
    description: 'Official digital recognition for your first contributions.',
    category: 'recognition',
    creditCost: 0,
    minTier: 'bronze',
    stock: 'unlimited',
    imageUrl: 'https://api.dicebear.com/8.x/icons/svg?seed=bronze&backgroundColor=b45309',
    redemptionType: 'instant',
    termsAndConditions: 'Digital badge added to your profile immediately.'
  },
  {
    id: 'reward-002',
    name: 'Plant 1 Tree',
    description: 'We will plant a sapling in the campus garden on your behalf.',
    category: 'impact',
    creditCost: 100,
    minTier: 'bronze',
    stock: 'unlimited',
    imageUrl: 'https://api.dicebear.com/8.x/icons/svg?seed=tree&backgroundColor=166534',
    redemptionType: 'instant',
    termsAndConditions: 'Trees are planted quarterly during campus drives.'
  },
  {
    id: 'reward-003',
    name: 'Cafeteria Coffee Coupon',
    description: 'Get a free coffee at the Main Block Cafeteria.',
    category: 'campus_perk',
    creditCost: 150,
    minTier: 'bronze',
    stock: 50,
    imageUrl: 'https://api.dicebear.com/8.x/icons/svg?seed=coffee&backgroundColor=78350f',
    redemptionType: 'instant',
    termsAndConditions: 'One time use only. Valid for 7 days.'
  },
  {
    id: 'reward-004',
    name: 'Library Late Fee Waiver',
    description: 'Waive up to ₹50 in library late fees.',
    category: 'campus_perk',
    creditCost: 200,
    minTier: 'silver',
    stock: 200,
    imageUrl: 'https://api.dicebear.com/8.x/icons/svg?seed=book&backgroundColor=1e40af',
    redemptionType: 'instant',
    termsAndConditions: 'Show code at library desk. Valid for current fines only.'
  },
  {
    id: 'reward-005',
    name: 'Eco-Friendly Notebook',
    description: 'Recycled paper notebook with ECO-SORT branding.',
    category: 'physical_item',
    creditCost: 300,
    minTier: 'silver',
    stock: 25,
    imageUrl: 'https://api.dicebear.com/8.x/icons/svg?seed=notebook&backgroundColor=f59e0b',
    redemptionType: 'requires_approval',
    termsAndConditions: 'Collect from Admin Block Room 102.'
  },
  {
    id: 'reward-006',
    name: 'Silver Badge',
    description: 'Recognition for consistent recyclers.',
    category: 'recognition',
    creditCost: 0,
    minTier: 'silver',
    stock: 'unlimited',
    imageUrl: 'https://api.dicebear.com/8.x/icons/svg?seed=silver&backgroundColor=94a3b8',
    redemptionType: 'instant'
  },
  {
    id: 'reward-007',
    name: 'Priority Parking (1 Week)',
    description: 'Reserved parking spot near the Tech Park.',
    category: 'campus_perk',
    creditCost: 600,
    minTier: 'gold',
    stock: 5,
    imageUrl: 'https://api.dicebear.com/8.x/icons/svg?seed=car&backgroundColor=dc2626',
    redemptionType: 'requires_approval',
    termsAndConditions: 'Subject to availability. Must book 2 days in advance.'
  },
  {
    id: 'reward-008',
    name: 'Reusable Tote Bag',
    description: 'High-quality canvas tote for daily use.',
    category: 'physical_item',
    creditCost: 400,
    minTier: 'gold',
    stock: 40,
    imageUrl: 'https://api.dicebear.com/8.x/icons/svg?seed=bag&backgroundColor=059669',
    redemptionType: 'requires_approval',
    termsAndConditions: 'Collect from Student Hub.'
  },
  {
    id: 'reward-009',
    name: 'Sponsor Device Repair',
    description: 'Fund the repair of a student laptop.',
    category: 'impact',
    creditCost: 1200,
    minTier: 'gold',
    stock: 'unlimited',
    imageUrl: 'https://api.dicebear.com/8.x/icons/svg?seed=repair&backgroundColor=4f46e5',
    redemptionType: 'instant',
    termsAndConditions: 'Credits go directly to the Campus Repair Fund.'
  },
  {
    id: 'reward-010',
    name: 'Gold Badge',
    description: 'Elite status for top contributors.',
    category: 'recognition',
    creditCost: 0,
    minTier: 'gold',
    stock: 'unlimited',
    imageUrl: 'https://api.dicebear.com/8.x/icons/svg?seed=gold&backgroundColor=fbbf24',
    redemptionType: 'instant'
  },
  {
    id: 'reward-011',
    name: 'Premium Tech Kit',
    description: 'Includes cable organizer, cleaning kit, and stand.',
    category: 'physical_item',
    creditCost: 2000,
    minTier: 'platinum',
    stock: 10,
    imageUrl: 'https://api.dicebear.com/8.x/icons/svg?seed=tech&backgroundColor=111827',
    redemptionType: 'requires_approval',
    termsAndConditions: 'One per academic year.'
  },
  {
    id: 'reward-012',
    name: 'Semester Parking Pass',
    description: 'Guaranteed parking for the full semester.',
    category: 'campus_perk',
    creditCost: 2500,
    minTier: 'platinum',
    stock: 2,
    imageUrl: 'https://api.dicebear.com/8.x/icons/svg?seed=parking&backgroundColor=7f1d1d',
    redemptionType: 'requires_approval',
    termsAndConditions: 'Non-transferable.'
  },
  {
    id: 'reward-013',
    name: 'Platinum Ambassador',
    description: 'Official title and feature on campus board.',
    category: 'recognition',
    creditCost: 0,
    minTier: 'platinum',
    stock: 'unlimited',
    imageUrl: 'https://api.dicebear.com/8.x/icons/svg?seed=crown&backgroundColor=e2e8f0',
    redemptionType: 'instant'
  },
  {
    id: 'reward-014',
    name: 'Campus Store Voucher (₹500)',
    description: 'Valid for books, stationery, or apparel.',
    category: 'campus_perk',
    creditCost: 800,
    minTier: 'gold',
    stock: 20,
    imageUrl: 'https://api.dicebear.com/8.x/icons/svg?seed=voucher&backgroundColor=db2777',
    redemptionType: 'instant',
    termsAndConditions: 'Digital code sent instantly.'
  },
  {
    id: 'reward-015',
    name: 'E-Waste Drive Sponsor',
    description: 'Your name listed as a sponsor for the next drive.',
    category: 'impact',
    creditCost: 500,
    minTier: 'silver',
    stock: 'unlimited',
    imageUrl: 'https://api.dicebear.com/8.x/icons/svg?seed=speaker&backgroundColor=8b5cf6',
    redemptionType: 'instant'
  }
];

export const mockRedemptions: RedemptionTransaction[] = [
  {
    id: 'RED-2024-001',
    userId: 'USR-CURRENT',
    rewardId: 'reward-003',
    rewardName: 'Cafeteria Coffee Coupon',
    creditsCost: 150,
    status: 'approved',
    redemptionCode: 'CAFE-8HG4J2',
    redeemedAt: new Date(Date.now() - 172800000).toISOString(),
    fulfilledAt: new Date(Date.now() - 172800000).toISOString(),
    expiresAt: new Date(Date.now() + 2419200000).toISOString(), // +28 days
    notes: 'Show this code at the counter.'
  }
];

export const mockCreditTransactions: CreditTransaction[] = [
  {
    id: 'txn-001',
    userId: 'USR-CURRENT',
    type: 'earned',
    amount: 50,
    balance: 50,
    source: 'submission',
    referenceId: 'SUB-001',
    description: 'Recycled Mobile Phone',
    timestamp: new Date(Date.now() - 864000000).toISOString()
  },
  {
    id: 'txn-002',
    userId: 'USR-CURRENT',
    type: 'earned',
    amount: 1500,
    balance: 1550,
    source: 'bonus',
    description: 'Early Adopter Bonus',
    timestamp: new Date(Date.now() - 432000000).toISOString()
  },
  {
    id: 'txn-003',
    userId: 'USR-CURRENT',
    type: 'spent',
    amount: -150,
    balance: 1400,
    source: 'redemption',
    referenceId: 'RED-2024-001',
    description: 'Redeemed: Cafeteria Coffee Coupon',
    timestamp: new Date(Date.now() - 172800000).toISOString()
  }
];
