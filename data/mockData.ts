
import type { Category, LeaderboardUser, ImpactStats, CollectionPoint } from '../types';

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
];

export const leaderboard: LeaderboardUser[] = [
  { rank: 1, name: "Aarav Sharma", points: 450, avatar: "https://api.dicebear.com/8.x/avataaars/svg?seed=Aarav" },
  { rank: 2, name: "Priya Patel", points: 410, avatar: "https://api.dicebear.com/8.x/avataaars/svg?seed=Priya" },
  { rank: 3, name: "You", points: 380, avatar: "https://api.dicebear.com/8.x/avataaars/svg?seed=You", isUser: true },
  { rank: 4, name: "Rohan Das", points: 320, avatar: "https://api.dicebear.com/8.x/avataaars/svg?seed=Rohan" },
  { rank: 5, name: "Sneha Gupta", points: 290, avatar: "https://api.dicebear.com/8.x/avataaars/svg?seed=Sneha" },
  { rank: 6, name: "Vikram Singh", points: 250, avatar: "https://api.dicebear.com/8.x/avataaars/svg?seed=Vikram" },
  { rank: 7, name: "Anjali Rao", points: 210, avatar: "https://api.dicebear.com/8.x/avataaars/svg?seed=Anjali" },
  { rank: 8, name: "Karan Verma", points: 180, avatar: "https://api.dicebear.com/8.x/avataaars/svg?seed=Karan" },
  { rank: 9, name: "Diya Mehta", points: 150, avatar: "https://api.dicebear.com/8.x/avataaars/svg?seed=Diya" },
  { rank: 10, name: "Aditya Joshi", points: 120, avatar: "https://api.dicebear.com/8.x/avataaars/svg?seed=Aditya" },
];

export const achievements = [
    { title: "First Recycle", description: "Recycled your first item.", icon: "Recycle" },
    { title: "Eco-Streaker", description: "Reported e-waste 3 times in a month.", icon: "Zap" },
    { title: "Donation Hero", description: "Donated a working device.", icon: "Gift" },
    { title: "Repair Champion", description: "Chose to repair an item.", icon: "Wrench" },
    { title: "Community Leader", description: "Reached the top 10 on the leaderboard.", icon: "Users" },
    { title: "Green Starter", description: "Earned your first 100 points.", icon: "Leaf" },
];

export const impactStats: ImpactStats = {
  totalDevices: 1247,
  devicesRepaired: 342,
  devicesRecycled: 789,
  co2Saved: 1450,
  treesEquivalent: 65,
};

// New data structure for the redesigned dashboard
export const dashboardStats = [
  {
    value: impactStats.totalDevices,
    label: "Total Devices Logged",
    icon: "https://api.dicebear.com/8.x/icons/svg?seed=electronics&backgroundColor=e0f2fe,bae6fd",
    gradient: "from-blue-500 to-cyan-500",
    gradientLight: "from-blue-50 to-cyan-50"
  },
  {
    value: impactStats.devicesRepaired,
    label: "Devices Repaired",
    icon: "https://api.dicebear.com/8.x/icons/svg?seed=wrench&backgroundColor=fefce8,fef9c3",
    gradient: "from-yellow-500 to-amber-500",
    gradientLight: "from-yellow-50 to-amber-50"
  },
  {
    value: impactStats.devicesRecycled,
    label: "Devices Recycled",
    icon: "https://api.dicebear.com/8.x/icons/svg?seed=recycle&backgroundColor=f0fdf4,dcfce7",
    gradient: "from-green-500 to-emerald-500",
    gradientLight: "from-green-50 to-emerald-50"
  },
  {
    value: impactStats.co2Saved,
    label: "CO₂ Saved (kg)",
    icon: "https://api.dicebear.com/8.x/icons/svg?seed=leaf&backgroundColor=f0fdfa,ccfbf1",
    gradient: "from-teal-500 to-emerald-500",
    gradientLight: "from-teal-50 to-emerald-50"
  },
];

export const collectionPoints: CollectionPoint[] = [
  {
    id: 1,
    name: "Campus E-Waste Center",
    location: "Building A, Ground Floor",
    hours: "Mon-Fri 9AM-5PM",
    coordinates: { lat: 12.9716, lng: 77.5946 },
  },
  {
    id: 2,
    name: "Hostel Collection Point (Block C)",
    location: "Common Room, Hostel Block C",
    hours: "Everyday 10AM-8PM",
    coordinates: { lat: 12.9720, lng: 77.5950 },
  },
  {
    id: 3,
    name: "City Recycling Hub",
    location: "123 Green Way, Near City Market",
    hours: "Tue-Sat 10AM-4PM",
    coordinates: { lat: 12.9700, lng: 77.6000 },
  },
];

export const questionFlowData = [
    {
        question: "Who are you?",
        key: "userType",
        options: ["Student", "Staff", "Local Resident"]
    },
    {
        question: "What is the device's condition?",
        key: "deviceCondition",
        options: ["Working", "Minor Issues", "Not Working"]
    },
    {
        question: "What is your primary goal?",
        key: "intent",
        options: ["Repair", "Donate", "Safe Disposal"]
    },
    {
        question: "Where is the item located?",
        key: "location",
        options: ["On-Campus", "Nearby Household"]
    }
];
