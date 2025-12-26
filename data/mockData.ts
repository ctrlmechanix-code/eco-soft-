
import type { Category, LeaderboardUser, ImpactStats, CollectionPoint, UserActivity, BlogPost, UserRequest, Submission, ActivityLog, Reward, RedemptionTransaction, CreditTransaction, AppNotification, Testimonial } from '../types';

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
  { 
      id: "ADMIN-SUPER", 
      rank: 0, 
      name: "Super Admin", 
      email: "ctrlmechanix@gmail.com", 
      points: 9999, 
      avatar: "https://api.dicebear.com/8.x/avataaars/svg?seed=AdminBoss", 
      isUser: false, 
      role: "admin", 
      status: "Active", 
      joinedDate: "2023-01-01" 
  },
  { id: "USR-001", rank: 1, name: "Aarav Sharma", email: "aarav@university.edu", points: 450, avatar: "https://api.dicebear.com/8.x/avataaars/svg?seed=Aarav", role: "user", status: "Active", joinedDate: "2023-09-01" },
  { id: "USR-002", rank: 2, name: "Priya Patel", email: "priya@university.edu", points: 410, avatar: "https://api.dicebear.com/8.x/avataaars/svg?seed=Priya", role: "user", status: "Active", joinedDate: "2023-09-15" },
  { id: "USR-CURRENT", rank: 3, name: "Student User", email: "student@university.edu", points: 1550, avatar: "https://api.dicebear.com/8.x/avataaars/svg?seed=You", isUser: true, role: "user", status: "Active", joinedDate: "2023-09-20" },
  { id: "USR-003", rank: 4, name: "David Kim", email: "david@university.edu", points: 350, avatar: "https://api.dicebear.com/8.x/avataaars/svg?seed=David", role: "user", status: "Active", joinedDate: "2023-10-01" },
  { id: "USR-004", rank: 5, name: "Raj", email: "raj@py.in", points: 320, avatar: "https://api.dicebear.com/8.x/avataaars/svg?seed=Sarah", role: "user", status: "Active", joinedDate: "2023-10-05" },
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
    name: "CWRS Building", 
    location: "Room t4, Ground Floor", 
    address: "Near Seminer Hall, NIT Patna",
    hours: "9 AM - 6 PM", 
    coordinates: { lat: 25.6207, lng: 85.1720 },
    phone: "+91 88-0984-0470",
    email: "ctrlmechanix@gmail.com",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=CWRS+Building+NIT+Patna",
    status: 'Active',
    totalCollected: 1240
  },
  { 
    id: 2, 
    name: "Main Building", 
    location: "Civil Department, Room 102", 
    address: "Civil Department, 1st Floor, NIT Patna",
    hours: "8 AM - 8 PM", 
    coordinates: { lat: 25.6195, lng: 85.1725 },
    phone: "+91 88-0984-0470",
    email: "ctrlmechanix@gmail.com",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Department+of+Civil+NITP",
    status: 'Active',
    totalCollected: 850
  },
  { 
    id: 3, 
    name: "SAC (Headquater)", 
    location: "Near Student Activity Office", 
    address: "Near Cafeteria 1, Ground Floor, NIT Patna",
    hours: "8 AM - 8 PM", 
    coordinates: { lat: 25.6210, lng: 85.1730 },
    phone: "+91 88-0984-0470",
    email: "ctrlmechanix@gmail.com",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Student+Activity+Centre+NIT+Patna",
    status: 'Active',
    totalCollected: 420
  },
  { 
    id: 4, 
    name: "Kosi Hostel Recycling Zone", 
    location: "Campus Second gate", 
    address: "Near Ganga River, NIT Patna",
    hours: "24/7", 
    coordinates: { lat: 25.6220, lng: 85.1710 },
    phone: "+91 88-0984-0470",
    email: "ctrlmechanix@gmail.com",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Kosi+Hostel+NITP",
    status: 'Active',
    totalCollected: 420
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
        options: ["Formally recycle it", "Donate it", "Repair it", "Get advice"],
        key: "intent"
    },
    {
        id: 3,
        question: "Are you a student or staff member?",
        options: ["Student", "Faculty/Staff", "Visitor"],
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
        image: "https://images.unsplash.com/photo-1591193686104-fddba4d0e4d8?q=80&w=800&auto=format&fit=crop",
        content: `
            <p>University campuses are hubs of innovation and technology. Every year, thousands of students arrive with new laptops, smartphones, and tablets. But what happens to the old ones? The reality is often hidden in dorm room drawers or, worse, general waste bins.</p>
            
            <h3>The Scale of the Problem</h3>
            <p>Recent studies suggest that university campuses generate e-waste at a rate 3x higher than residential areas. With the average lifespan of a smartphone dropping to just 18 months, the turnover of technology in academic environments is staggering. Cables, chargers, broken headphones, and old batteries accumulate rapidly.</p>
            
            <h3>Environmental Impact</h3>
            <p>When electronics end up in landfills, they leach toxic heavy metals like lead, mercury, and cadmium into the soil and groundwater. Moreover, we lose valuable resources. A ton of smartphones contains 300 times more gold than a ton of gold ore. By not recycling, we are literally throwing away value while poisoning our environment.</p>
            
            <h3>What Can Students Do?</h3>
            <p>The solution starts with awareness and convenient action. Programs like ECO-SORT are designed to bridge the gap between intent and action.</p>
            <ul>
                <li><strong>Audit your tech:</strong> Check your drawers for unused devices.</li>
                <li><strong>Repair first:</strong> Before discarding, see if a simple screen fix or battery swap can extend the life.</li>
                <li><strong>Recycle responsibly:</strong> Use designated campus e-waste bins rather than general trash.</li>
            </ul>
            <p>It's time for the academic community to lead by example. Sustainable technology use isn't just about what we buy, but how we say goodbye to our old gadgets.</p>
        `,
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
        content: `
            <p>Lithium-ion batteries power almost everything we use, from phones to laptops and e-scooters. However, they pose a significant fire risk if damaged or disposed of improperly. They are the leading cause of waste facility fires globally.</p>

            <h3>Why are they dangerous?</h3>
            <p>Inside a lithium battery is a pressurized cocktail of chemicals. If the casing is punctured or crushed—common in garbage trucks—the battery can short-circuit, leading to "thermal runaway." This creates an intense, self-sustaining fire that is difficult to extinguish.</p>

            <h3>Disposal Do's and Don'ts</h3>
            <p><strong>DO NOT:</strong></p>
            <ul>
                <li>Throw batteries in regular trash or recycling bins.</li>
                <li>Store swollen or damaged batteries in your home.</li>
                <li>Leave batteries in devices you are recycling (remove them if possible).</li>
            </ul>

            <p><strong>DO:</strong></p>
            <ul>
                <li><strong>Tape the terminals:</strong> Use clear tape or electrical tape over the contact points to prevent short circuits.</li>
                <li><strong>Use dedicated drop-off points:</strong> Look for the specific battery tubes in the library or student union.</li>
                <li><strong>Store safely:</strong> Keep old batteries in a cool, dry place away from flammable materials until you can drop them off.</li>
            </ul>
            <p>Safety is paramount. By taking a few extra seconds to tape and separate your batteries, you protect sanitation workers and our campus infrastructure.</p>
        `,
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
        content: `
            <p>We are incredibly proud to announce that as of this week, the ECO-SORT platform has facilitated the recovery of over <strong>10,000 electronic devices</strong> across partner campuses!</p>

            <h3>By the Numbers</h3>
            <p>This isn't just about the count of devices. The impact is measurable and significant:</p>
            <ul>
                <li><strong>4,500 kg</strong> of CO2 emissions prevented (equivalent to taking 1,000 cars off the road for a day).</li>
                <li><strong>$15,000</strong> worth of raw materials recovered (gold, silver, copper, and rare earth elements).</li>
                <li><strong>3,200</strong> devices refurbished and donated to local schools.</li>
            </ul>

            <h3>A Community Effort</h3>
            <p>"This milestone belongs to the students," says our founder. "Their willingness to walk an extra 5 minutes to a collection point, to verify their drops, and to engage with the credit system is what drives this engine."</p>

            <h3>What's Next?</h3>
            <p>We are expanding! In the coming semester, look out for our new "Repair Cafés"—pop-up events where engineering students help fix broken electronics for free. We are also increasing the Green Credit rewards for repairable items to incentivize longevity over disposal.</p>
            
            <p>Thank you for being part of the solution. Here's to the next 10,000!</p>
        `,
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

export const mockNotifications: AppNotification[] = [
    {
        id: "NOTIF-001",
        userId: "USR-CURRENT",
        type: "success",
        title: "Credits Awarded",
        message: "You received 50 credits for recycling your mobile phone.",
        date: new Date(Date.now() - 100000000).toISOString(),
        read: true
    },
    {
        id: "NOTIF-002",
        userId: "all",
        type: "info",
        title: "Campus E-Waste Drive",
        message: "Join us this Friday at the Student Center for a special collection event!",
        date: new Date(Date.now() - 200000).toISOString(),
        read: false
    }
];

export const mockTestimonials: Testimonial[] = [
    {
        id: "t1",
        name: "Senha Sharma",
        role: "Architecture Student",
        avatar: "https://api.dicebear.com/8.x/avataaars/svg?seed=Elena",
        content: "ECO-SORT made it incredibly easy to find a place for my old drafting tablet. The credits system is a huge bonus!"
    },
    {
        id: "t2",
        name: "Prof. Anil Kumar",
        role: "Computer Science Dept.",
        avatar: "https://api.dicebear.com/8.x/avataaars/svg?seed=James",
        content: "We've diverted over 200kg of e-waste from our labs thanks to this platform. It's essential for a modern campus."
    },
    {
        id: "t3",
        name: "Rohit Kumar",
        role: "Sustainability Club Lead",
        avatar: "https://api.dicebear.com/8.x/avataaars/svg?seed=SarahM",
        content: "Finally, a way to track our actual impact. Seeing the CO2 saved numbers go up motivates the whole team."
    }
];
