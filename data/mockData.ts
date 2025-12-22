
import type { Category, LeaderboardUser, ImpactStats, CollectionPoint, UserActivity, BlogPost, UserRequest } from '../types';

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
  { rank: 1, name: "Aarav Sharma", points: 450, avatar: "https://api.dicebear.com/8.x/avataaars/svg?seed=Aarav" },
  { rank: 2, name: "Priya Patel", points: 410, avatar: "https://api.dicebear.com/8.x/avataaars/svg?seed=Priya" },
  { rank: 3, name: "You", points: 380, avatar: "https://api.dicebear.com/8.x/avataaars/svg?seed=You", isUser: true },
  { rank: 4, name: "David Kim", points: 350, avatar: "https://api.dicebear.com/8.x/avataaars/svg?seed=David" },
  { rank: 5, name: "Sarah Jenkins", points: 320, avatar: "https://api.dicebear.com/8.x/avataaars/svg?seed=Sarah" },
];

export const impactStats: ImpactStats = {
  totalDevices: 12450,
  devicesRepaired: 3420,
  devicesRecycled: 9030,
  co2Saved: 4500,
  treesEquivalent: 150,
};

export const collectionPoints: CollectionPoint[] = [
  { id: 1, name: "Student Center Hub", location: "Building A, Ground Floor", hours: "9 AM - 6 PM", coordinates: { lat: 0, lng: 0 } },
  { id: 2, name: "Engineering Lab Drop-off", location: "Tech Block B, Room 102", hours: "8 AM - 8 PM", coordinates: { lat: 0, lng: 0 } },
  { id: 3, name: "Hostel 4 Recycling Zone", location: "North Campus Hostel Area", hours: "24/7", coordinates: { lat: 0, lng: 0 } },
  { id: 4, name: "Library E-Waste Bin", location: "Main Library Entrance", hours: "8 AM - 10 PM", coordinates: { lat: 0, lng: 0 } },
];

export const dashboardStats = [
    { label: "Total Recycled", value: 124, icon: "https://api.dicebear.com/8.x/icons/svg?seed=recycle", gradientLight: "bg-emerald-100" },
    { label: "Green Credits", value: 380, icon: "https://api.dicebear.com/8.x/icons/svg?seed=coin", gradientLight: "bg-amber-100" },
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
        type: "Support",
        subject: "Credits not credited for old phone",
        message: "I dropped off my iPhone 8 at the Student Center Hub last Tuesday but I haven't received my green credits yet.",
        date: "2023-11-18",
        status: "Resolved",
        response: "Credits have been added manually. Apologies for the delay."
    },
    {
        id: "REQ-2023-002",
        type: "Bug Report",
        subject: "Map not loading on mobile",
        message: "When I try to open the locations page on my Android phone, the map shows a gray box.",
        date: "2023-11-25",
        status: "In Progress"
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
        content: `
            <p class="mb-4">Electronic waste (e-waste) is the fastest-growing waste stream in the world. On university campuses, the problem is magnified by the high density of technology users, frequent device upgrades, and a lack of specialized disposal infrastructure.</p>
            
            <h3 class="text-xl font-bold text-slate-900 mt-8 mb-4">The Campus Challenge</h3>
            <p class="mb-4">Students and faculty rely heavily on laptops, tablets, and smartphones. With academic cycles often dictating hardware upgrades, thousands of devices become obsolete every semester. Unlike traditional waste, e-waste contains toxic components like lead, mercury, and cadmium, which can leach into the soil if improperly disposed of.</p>
            
            <h3 class="text-xl font-bold text-slate-900 mt-8 mb-4">A Circular Solution</h3>
            <p class="mb-4">The concept of a circular economy offers a promising path forward. Instead of the linear "take-make-dispose" model, a circular approach emphasizes repair, reuse, and recycling. At ECO-SORT, we are facilitating this transition by connecting campus communities with verified local recyclers and repair shops.</p>
            
            <p class="mb-4">By extending the lifespan of devices through repair or ensuring they are recycled to recover valuable materials like gold and copper, campuses can significantly reduce their environmental footprint.</p>
            
            <h3 class="text-xl font-bold text-slate-900 mt-8 mb-4">What You Can Do</h3>
            <ul class="list-disc pl-6 space-y-2 mb-6">
                <li>Check if your device can be repaired before discarding it.</li>
                <li>Donate working electronics to local charities or student support programs.</li>
                <li>Use designated e-waste bins for non-functional items—never throw batteries in the trash.</li>
            </ul>
        `
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
            <p class="mb-4">Lithium-ion batteries power everything from our phones to electric scooters. While they are efficient energy sources, they pose significant fire risks if damaged or disposed of incorrectly.</p>
            
            <h3 class="text-xl font-bold text-slate-900 mt-8 mb-4">Why Not the Trash?</h3>
            <p class="mb-4">When a lithium battery is crushed in a garbage truck or landfill compactor, it can puncture and ignite, causing difficult-to-extinguish fires. This puts sanitation workers at risk and releases toxic fumes.</p>
            
            <h3 class="text-xl font-bold text-slate-900 mt-8 mb-4">Preparation for Disposal</h3>
            <p class="mb-4">Before heading to a collection point, follow these steps:</p>
            <ol class="list-decimal pl-6 space-y-2 mb-6">
                <li><strong>Tape the Terminals:</strong> Use electrical tape or clear packing tape to cover the contact points. This prevents short-circuiting.</li>
                <li><strong>Don't Remove if Swollen:</strong> If a device has a swollen battery, do not attempt to remove it yourself. Take the entire device to a professional e-waste facility immediately.</li>
                <li><strong>Bag It:</strong> Place individual batteries in clear plastic bags if required by your local collection center.</li>
            </ol>
            
            <p>Our interactive map on the Locations page highlights specific drop-off points that accept hazardous battery waste.</p>
        `
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
            <p class="mb-4">We are thrilled to announce that the ECO-SORT community has collectively diverted over 10,000 electronic devices from landfills this year!</p>
            
            <h3 class="text-xl font-bold text-slate-900 mt-8 mb-4">By the Numbers</h3>
            <div class="grid grid-cols-2 gap-4 my-6">
                <div class="bg-slate-50 p-4 rounded-lg">
                    <p class="text-2xl font-bold text-emerald-600">10,420</p>
                    <p class="text-xs text-slate-500">Total Items</p>
                </div>
                <div class="bg-slate-50 p-4 rounded-lg">
                    <p class="text-2xl font-bold text-blue-600">4,500 kg</p>
                    <p class="text-xs text-slate-500">CO₂ Prevented</p>
                </div>
            </div>

            <p class="mb-4">This achievement wouldn't be possible without the students, faculty, and facilities management staff who have embraced the ECO-SORT platform. From organizing dorm recycling drives to advocating for more collection bins, your grassroots efforts are driving real change.</p>
            
            <h3 class="text-xl font-bold text-slate-900 mt-8 mb-4">Looking Ahead</h3>
            <p class="mb-4">Our next goal is to expand to 5 partner universities by 2025. We are also launching a "Repair Café" initiative next semester to teach students how to fix common hardware issues themselves.</p>
            
            <p>Thank you for being part of the solution. Keep sorting!</p>
        `
    }
];
