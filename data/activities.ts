import { Activity } from "@/types";
import { SAMPLE_USERS } from "./users";

export const SAMPLE_ACTIVITIES: Activity[] = [
  {
    id: "act-tech-1",
    title: "Build Something Together",
    category: "Technology",
    description: "An informal developer meetup where people bring laptops, build side projects, experiment with AI tools, and meet fellow hackers. No agenda, just pure building.",
    date: "Saturday, Oct 11",
    time: "10:00 AM - 2:00 PM",
    location: "Loft Coworking, Civil Lines",
    city: "Nagpur",
    distance: "2.4 km",
    host: "Aarav Sharma",
    hostAvatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=256&h=256&q=80",
    attendees: [
      SAMPLE_USERS[0], // Aarav
      SAMPLE_USERS[1], // Riya
      SAMPLE_USERS[2], // Kunal
      SAMPLE_USERS[8], // Dev
      SAMPLE_USERS[6], // Rahul
    ],
    interestedCount: 8,
    capacity: 12,
    image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1200&q=80",
    gradient: "from-blue-600/40 via-indigo-950/80 to-zinc-950",
    tags: ["Next.js", "AI Tools", "Side Projects", "Coworking"],
    vibes: ["Meet new people", "Find activity partners", "Weekend plans"],
    isWeekend: true,
    cost: "Free · Buy your own coffee",
  },
  {
    id: "act-sports-1",
    title: "Badminton After Work",
    category: "Sports",
    description: "Casual 2v2 doubles games. Need 2 more players of intermediate or beginner level. We have booked Court 3 with wooden flooring. Extra rackets available!",
    date: "Saturday, Oct 11",
    time: "6:00 PM - 8:00 PM",
    location: "Nagpur Sports Club, Civil Lines",
    city: "Nagpur",
    distance: "3.1 km",
    host: "Aditya Verma",
    hostAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=256&h=256&q=80",
    attendees: [
      SAMPLE_USERS[4], // Aditya
      SAMPLE_USERS[0], // Aarav
      SAMPLE_USERS[7], // Ishita
    ],
    interestedCount: 3,
    capacity: 4,
    image: "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?auto=format&fit=crop&w=1200&q=80",
    gradient: "from-emerald-600/40 via-teal-950/80 to-zinc-950",
    tags: ["Badminton", "Doubles", "Indoor Court", "Active"],
    vibes: ["Find activity partners", "Weekend plans", "Meet new people"],
    isWeekend: true,
    cost: "Split court fee (~₹120/hr)",
  },
  {
    id: "act-dance-1",
    title: "Garba Night Social",
    category: "Dance",
    description: "Looking for a fun crew to attend the grand Garba night together! Beginners totally welcome — we can teach basic 2-taali and 3-taali steps before jumping into the circle.",
    date: "Saturday, Oct 11",
    time: "8:00 PM - 11:30 PM",
    location: "Central Nagpur Ground, Wardha Rd",
    city: "Nagpur",
    distance: "4.2 km",
    host: "Riya Patel",
    hostAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&h=256&q=80",
    attendees: [
      SAMPLE_USERS[1], // Riya
      SAMPLE_USERS[7], // Ishita
      SAMPLE_USERS[3], // Meera
      SAMPLE_USERS[5], // Ananya
      SAMPLE_USERS[9], // Sneha
    ],
    interestedCount: 12,
    capacity: 15,
    image: "https://images.unsplash.com/photo-1545232979-8bf68ee9b1af?auto=format&fit=crop&w=1200&q=80",
    gradient: "from-amber-600/40 via-rose-950/80 to-zinc-950",
    tags: ["Garba", "Dandiya", "Traditional", "Festive"],
    vibes: ["Meet new people", "Attend events", "Weekend plans"],
    isWeekend: true,
    cost: "Passes at venue (~₹200)",
  },
  {
    id: "act-food-1",
    title: "Street Food Walk — Sitabuldi",
    category: "Food",
    description: "Exploring Nagpur's legendary food spots! Starting with classic Tarri Poha, moving on to spicy samosas, crispy kachoris, and ending with matka kulfi. Good conversations guaranteed.",
    date: "Sunday, Oct 12",
    time: "5:00 PM - 7:30 PM",
    location: "Sitabuldi Main Market",
    city: "Nagpur",
    distance: "1.8 km",
    host: "Ananya Joshi",
    hostAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=256&h=256&q=80",
    attendees: [
      SAMPLE_USERS[5], // Ananya
      SAMPLE_USERS[9], // Sneha
      SAMPLE_USERS[3], // Meera
      SAMPLE_USERS[1], // Riya
    ],
    interestedCount: 6,
    capacity: 8,
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&q=80",
    gradient: "from-orange-600/40 via-amber-950/80 to-zinc-950",
    tags: ["Street Food", "Tarri Poha", "Foodie", "Market"],
    vibes: ["Try something new", "Meet new people", "Weekend plans"],
    isWeekend: true,
    cost: "Pay for what you eat (~₹150)",
  },
  {
    id: "act-startups-1",
    title: "Startup Sunday & Pitch Feedback",
    category: "Startups",
    description: "A friendly, zero-pitch-deck session for Nagpur founders, indie hackers, and aspiring entrepreneurs. Roast ideas, review landing pages, and share raw growth tactics.",
    date: "Sunday, Oct 12",
    time: "11:00 AM - 1:30 PM",
    location: "Innovation Hub, VNIT Road",
    city: "Nagpur",
    distance: "3.5 km",
    host: "Kunal Deshmukh",
    hostAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=256&h=256&q=80",
    attendees: [
      SAMPLE_USERS[2], // Kunal
      SAMPLE_USERS[0], // Aarav
      SAMPLE_USERS[8], // Dev
      SAMPLE_USERS[6], // Rahul
    ],
    interestedCount: 15,
    capacity: 20,
    image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=1200&q=80",
    gradient: "from-indigo-600/40 via-violet-950/80 to-zinc-950",
    tags: ["Startups", "Indie Hackers", "Founders", "Growth"],
    vibes: ["Meet new people", "Attend events", "Just see what's happening"],
    isWeekend: true,
    cost: "Free",
  },
  {
    id: "act-fitness-1",
    title: "Sunrise Run & Lake Stretch",
    category: "Fitness",
    description: "5 km comfortable pace (6:30 min/km) run around Futala Lake, followed by light stretching on the promenade and fresh coconut water. All paces welcome!",
    date: "Sunday, Oct 12",
    time: "6:30 AM - 8:00 AM",
    location: "Futala Lake Promenade",
    city: "Nagpur",
    distance: "4.8 km",
    host: "Aditya Verma",
    hostAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=256&h=256&q=80",
    attendees: [
      SAMPLE_USERS[4], // Aditya
      SAMPLE_USERS[9], // Sneha
      SAMPLE_USERS[7], // Ishita
    ],
    interestedCount: 9,
    capacity: 15,
    image: "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?auto=format&fit=crop&w=1200&q=80",
    gradient: "from-lime-600/40 via-emerald-950/80 to-zinc-950",
    tags: ["Running", "Sunrise", "Futala Lake", "Morning"],
    vibes: ["Find activity partners", "Weekend plans", "Try something new"],
    isWeekend: true,
    cost: "Free",
  },
  {
    id: "act-music-1",
    title: "Acoustic Open Mic Night",
    category: "Music",
    description: "Intimate indie acoustic night! Performers get 7-minute slots (singers, guitarists, poets, beatboxers) or just come chill with a hot brew and support local artists.",
    date: "Friday, Oct 10",
    time: "8:00 PM - 10:30 PM",
    location: "The Chai Story Cafe, Dharampeth",
    city: "Nagpur",
    distance: "2.1 km",
    host: "Meera Sen",
    hostAvatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=256&h=256&q=80",
    attendees: [
      SAMPLE_USERS[3], // Meera
      SAMPLE_USERS[1], // Riya
      SAMPLE_USERS[5], // Ananya
      SAMPLE_USERS[7], // Ishita
    ],
    interestedCount: 11,
    capacity: 25,
    image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1200&q=80",
    gradient: "from-pink-600/40 via-purple-950/80 to-zinc-950",
    tags: ["Open Mic", "Indie Music", "Acoustic", "Poetry"],
    vibes: ["Attend events", "Meet new people", "Just see what's happening"],
    isWeekend: true,
    cost: "₹100 cover (includes iced tea)",
  },
  {
    id: "act-photo-1",
    title: "Heritage Photography Walk",
    category: "Photography",
    description: "Golden hour photo walk capturing colonial bungalows, heritage banyan trees, and vintage architecture of Civil Lines. DSLRs or phones both great!",
    date: "Sunday, Oct 12",
    time: "7:00 AM - 9:30 AM",
    location: "GPO Square, Civil Lines",
    city: "Nagpur",
    distance: "1.5 km",
    host: "Ananya Joshi",
    hostAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=256&h=256&q=80",
    attendees: [
      SAMPLE_USERS[5], // Ananya
      SAMPLE_USERS[9], // Sneha
      SAMPLE_USERS[2], // Kunal
    ],
    interestedCount: 5,
    capacity: 10,
    image: "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?auto=format&fit=crop&w=1200&q=80",
    gradient: "from-slate-600/40 via-zinc-900 to-zinc-950",
    tags: ["Heritage", "Golden Hour", "Street Photo", "Walk"],
    vibes: ["Try something new", "Weekend plans", "Find activity partners"],
    isWeekend: true,
    cost: "Free",
  },
  {
    id: "act-sports-2",
    title: "Pickleball Saturday Match",
    category: "Sports",
    description: "India's fastest growing paddle sport! Super easy to pick up even if you've never held a racket. Looking for 3 more enthusiasts for fun rally games.",
    date: "Saturday, Oct 11",
    time: "7:00 AM - 9:00 AM",
    location: "Smash Arena, Ramdaspeth",
    city: "Nagpur",
    distance: "2.9 km",
    host: "Rahul Nair",
    hostAvatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=256&h=256&q=80",
    attendees: [
      SAMPLE_USERS[6], // Rahul
      SAMPLE_USERS[4], // Aditya
      SAMPLE_USERS[0], // Aarav
    ],
    interestedCount: 4,
    capacity: 6,
    image: "https://images.unsplash.com/photo-1554068865-24cecd4e34b8?auto=format&fit=crop&w=1200&q=80",
    gradient: "from-teal-600/40 via-emerald-950/80 to-zinc-950",
    tags: ["Pickleball", "Morning Sport", "Cardio", "Fun"],
    vibes: ["Find activity partners", "Try something new", "Weekend plans"],
    isWeekend: true,
    cost: "Split court fee (~₹150)",
  },
  {
    id: "act-tech-2",
    title: "AI Builders & Agents Meetup",
    category: "Technology",
    description: "Deep dive into autonomous LLM agents, local models, MCP servers, and vision models. Live demo sessions and open discussions with Nagpur's AI engineers.",
    date: "Sunday, Oct 12",
    time: "3:00 PM - 6:00 PM",
    location: "Tech Hub Cowork, IT Park",
    city: "Nagpur",
    distance: "5.1 km",
    host: "Dev Malpani",
    hostAvatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=256&h=256&q=80",
    attendees: [
      SAMPLE_USERS[8], // Dev
      SAMPLE_USERS[0], // Aarav
      SAMPLE_USERS[2], // Kunal
      SAMPLE_USERS[6], // Rahul
    ],
    interestedCount: 18,
    capacity: 30,
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80",
    gradient: "from-blue-700/40 via-purple-950/80 to-zinc-950",
    tags: ["GenAI", "LLMs", "Autonomous Agents", "Tech Talk"],
    vibes: ["Meet new people", "Attend events", "Weekend plans"],
    isWeekend: true,
    cost: "Free (RSVP only)",
  },
  {
    id: "act-art-1",
    title: "Sunset Watercolor & Sketch Circle",
    category: "Art",
    description: "Grab your sketchbook and paints. We will sit near the lake steps, capture the dusk colors, and share techniques. No critique, only creative unwind.",
    date: "Saturday, Oct 11",
    time: "4:30 PM - 6:30 PM",
    location: "Ambazari Lake Garden",
    city: "Nagpur",
    distance: "4.0 km",
    host: "Riya Patel",
    hostAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&h=256&q=80",
    attendees: [
      SAMPLE_USERS[1], // Riya
      SAMPLE_USERS[3], // Meera
      SAMPLE_USERS[5], // Ananya
    ],
    interestedCount: 7,
    capacity: 10,
    image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=1200&q=80",
    gradient: "from-purple-600/40 via-pink-950/80 to-zinc-950",
    tags: ["Watercolor", "Sketching", "Sunset", "Mindfulness"],
    vibes: ["Try something new", "Weekend plans", "Meet new people"],
    isWeekend: true,
    cost: "Free · Bring your own paper & colors",
  },
  {
    id: "act-gaming-1",
    title: "Board Games & Catan Afternoon",
    category: "Gaming",
    description: "Settlers of Catan, Ticket to Ride, Codenames, and Avalon! If you haven't played modern strategy board games, we'll teach you in 5 minutes.",
    date: "Sunday, Oct 12",
    time: "2:00 PM - 6:00 PM",
    location: "Dice & Brews Lounge, Shankar Nagar",
    city: "Nagpur",
    distance: "3.2 km",
    host: "Rahul Nair",
    hostAvatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=256&h=256&q=80",
    attendees: [
      SAMPLE_USERS[6], // Rahul
      SAMPLE_USERS[0], // Aarav
      SAMPLE_USERS[8], // Dev
      SAMPLE_USERS[4], // Aditya
    ],
    interestedCount: 10,
    capacity: 12,
    image: "https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?auto=format&fit=crop&w=1200&q=80",
    gradient: "from-cyan-600/40 via-blue-950/80 to-zinc-950",
    tags: ["Catan", "Board Games", "Strategy", "Social"],
    vibes: ["Meet new people", "Find activity partners", "Weekend plans"],
    isWeekend: true,
    cost: "₹150 table fee with drink",
  },
  {
    id: "act-books-1",
    title: "Silent Reading Party & Book Swap",
    category: "Books",
    description: "45 minutes of silent uninterrupted reading with ambient lo-fi music, followed by an optional 30 minutes of book sharing and trading favorite titles.",
    date: "Saturday, Oct 11",
    time: "4:00 PM - 5:45 PM",
    location: "Old Tree Library Cafe, Bajaj Nagar",
    city: "Nagpur",
    distance: "2.7 km",
    host: "Sneha Kulkarni",
    hostAvatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=256&h=256&q=80",
    attendees: [
      SAMPLE_USERS[9], // Sneha
      SAMPLE_USERS[3], // Meera
      SAMPLE_USERS[8], // Dev
    ],
    interestedCount: 8,
    capacity: 14,
    image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=1200&q=80",
    gradient: "from-amber-700/40 via-stone-900 to-zinc-950",
    tags: ["Reading", "Book Swap", "Quiet", "Coffee"],
    vibes: ["Try something new", "Weekend plans", "Just see what's happening"],
    isWeekend: true,
    cost: "Free · Support cafe with a beverage",
  },
  {
    id: "act-outdoors-1",
    title: "Weekend Cycling Trail to Gorewada",
    category: "Outdoors",
    description: "20 km leisure morning cycle loop towards Gorewada forest reserve. Wide open roads, morning breeze, and breakfast stop on the way back.",
    date: "Sunday, Oct 12",
    time: "6:00 AM - 8:30 AM",
    location: "Start at Japanese Garden Square",
    city: "Nagpur",
    distance: "3.8 km",
    host: "Aditya Verma",
    hostAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=256&h=256&q=80",
    attendees: [
      SAMPLE_USERS[4], // Aditya
      SAMPLE_USERS[9], // Sneha
      SAMPLE_USERS[6], // Rahul
    ],
    interestedCount: 6,
    capacity: 10,
    image: "https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&w=1200&q=80",
    gradient: "from-emerald-700/40 via-green-950/80 to-zinc-950",
    tags: ["Cycling", "Gorewada", "Morning Trail", "Cardio"],
    vibes: ["Find activity partners", "Weekend plans", "Try something new"],
    isWeekend: true,
    cost: "Free · Bring cycle and helmet",
  },
  {
    id: "act-networking-1",
    title: "Freelance & Remote Workers Coffee Sync",
    category: "Networking",
    description: "Working from home gets isolating! Come cowork for 2 hours, talk client acquisition, design tools, code stacks, and celebrate each other's weekly wins.",
    date: "Friday, Oct 10",
    time: "4:00 PM - 6:30 PM",
    location: "Roastery Coffee House, Civil Lines",
    city: "Nagpur",
    distance: "1.9 km",
    host: "Kunal Deshmukh",
    hostAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=256&h=256&q=80",
    attendees: [
      SAMPLE_USERS[2], // Kunal
      SAMPLE_USERS[1], // Riya
      SAMPLE_USERS[0], // Aarav
      SAMPLE_USERS[5], // Ananya
    ],
    interestedCount: 14,
    capacity: 16,
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1200&q=80",
    gradient: "from-purple-700/40 via-indigo-950/80 to-zinc-950",
    tags: ["Remote Work", "Freelancing", "Coffee", "Networking"],
    vibes: ["Meet new people", "Attend events", "Just see what's happening"],
    isWeekend: true,
    cost: "Buy your own brew",
  },
  {
    id: "act-pune-1",
    title: "Sinhagad Fort Sunrise Trek",
    category: "Travel",
    description: "Early morning hike up Sinhagad fort steps to catch misty valley views and hot pitla bhakri at the top.",
    date: "Sunday, Oct 12",
    time: "5:30 AM - 9:30 AM",
    location: "Sinhagad Base, Pune",
    city: "Pune",
    distance: "14 km",
    host: "Tanvi Rao",
    hostAvatar: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=256&h=256&q=80",
    attendees: [SAMPLE_USERS[10]],
    interestedCount: 8,
    capacity: 12,
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80",
    gradient: "from-teal-600/40 via-emerald-950/80 to-zinc-950",
    tags: ["Trek", "Sinhagad", "Sunrise", "Heritage"],
    vibes: ["Weekend plans", "Try something new"],
    isWeekend: true,
    cost: "Vehicle fuel pool (~₹200)",
  },
  {
    id: "act-mumbai-1",
    title: "Marine Drive Sunset Walk & Chai",
    category: "Outdoors",
    description: "Evening breeze, tetrapods, sunset over Arabian sea, followed by piping hot cutting chai at Nariman Point.",
    date: "Saturday, Oct 11",
    time: "5:30 PM - 7:30 PM",
    location: "Marine Drive Promenade",
    city: "Mumbai",
    distance: "2.0 km",
    host: "Rohan Kapoor",
    hostAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=256&h=256&q=80",
    attendees: [SAMPLE_USERS[11]],
    interestedCount: 16,
    capacity: 20,
    image: "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=1200&q=80",
    gradient: "from-blue-600/40 via-sky-950/80 to-zinc-950",
    tags: ["Marine Drive", "Sunset", "Chai", "Chill"],
    vibes: ["Meet new people", "Weekend plans"],
    isWeekend: true,
    cost: "Free",
  },
];
