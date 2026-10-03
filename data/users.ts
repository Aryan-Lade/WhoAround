import { User } from "@/types";

export const SAMPLE_USERS: User[] = [
  {
    id: "user-aarav",
    name: "Aarav Sharma",
    avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=256&h=256&q=80",
    interests: ["Technology", "Startups", "Sports"],
    city: "Nagpur",
    bio: "Full-stack builder. Love late night hacks and weekend badminton.",
    role: "Developer",
  },
  {
    id: "user-riya",
    name: "Riya Patel",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&h=256&q=80",
    interests: ["Art", "Dance", "Food"],
    city: "Nagpur",
    bio: "Product designer & coffee enthusiast. Looking for Garba squad!",
    role: "Designer",
  },
  {
    id: "user-kunal",
    name: "Kunal Deshmukh",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=256&h=256&q=80",
    interests: ["Startups", "Technology", "Networking"],
    city: "Nagpur",
    bio: "Building early-stage SaaS. Always down for founder chats.",
    role: "Founder",
  },
  {
    id: "user-meera",
    name: "Meera Sen",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=256&h=256&q=80",
    interests: ["Music", "Food", "Books"],
    city: "Nagpur",
    bio: "Acoustic guitarist and foodie. Searching for open mics.",
    role: "Content Creator",
  },
  {
    id: "user-aditya",
    name: "Aditya Verma",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=256&h=256&q=80",
    interests: ["Sports", "Fitness", "Outdoors"],
    city: "Nagpur",
    bio: "Marathon runner & intermediate badminton player. Need morning peers.",
    role: "Fitness Enthusiast",
  },
  {
    id: "user-ananya",
    name: "Ananya Joshi",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=256&h=256&q=80",
    interests: ["Food", "Photography", "Travel"],
    city: "Nagpur",
    bio: "Street photographer. Looking for fellow lens explorers.",
    role: "Photographer",
  },
  {
    id: "user-rahul",
    name: "Rahul Nair",
    avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=256&h=256&q=80",
    interests: ["Gaming", "Technology", "Movies"],
    city: "Nagpur",
    bio: "Valorant & board games. Up for chill weekend sessions.",
    role: "Data Analyst",
  },
  {
    id: "user-ishita",
    name: "Ishita Roy",
    avatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=256&h=256&q=80",
    interests: ["Dance", "Music", "Fitness"],
    city: "Nagpur",
    bio: "Classical & contemporary dancer. Ready for weekend rhythm.",
    role: "Choreographer",
  },
  {
    id: "user-dev",
    name: "Dev Malpani",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=256&h=256&q=80",
    interests: ["Technology", "Startups", "Books"],
    city: "Nagpur",
    bio: "AI research nerd. Let's talk LLMs and agent architectures.",
    role: "AI Engineer",
  },
  {
    id: "user-sneha",
    name: "Sneha Kulkarni",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=256&h=256&q=80",
    interests: ["Outdoors", "Fitness", "Food"],
    city: "Nagpur",
    bio: "Weekend hiker. Can never say no to Sunday Saoji or poha.",
    role: "Architect",
  },
  {
    id: "user-tanvi",
    name: "Tanvi Rao",
    avatar: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=256&h=256&q=80",
    interests: ["Art", "Books", "Photography"],
    city: "Pune",
    bio: "Watercolor hobbyist & indie book lover.",
    role: "Illustrator",
  },
  {
    id: "user-rohan",
    name: "Rohan Kapoor",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=256&h=256&q=80",
    interests: ["Sports", "Gaming", "Networking"],
    city: "Mumbai",
    bio: "Fintech PM. Weekend pickleball and rooftop drinks.",
    role: "Product Manager",
  },
];

export function getUserById(id: string): User | undefined {
  return SAMPLE_USERS.find((u) => u.id === id);
}

export function getRandomAttendees(count: number, preferredInterests?: string[]): User[] {
  // Sort with preference to matching interests if provided
  const pool = [...SAMPLE_USERS];
  if (preferredInterests && preferredInterests.length > 0) {
    pool.sort((a, b) => {
      const aMatches = a.interests.filter((i) => preferredInterests.includes(i)).length;
      const bMatches = b.interests.filter((i) => preferredInterests.includes(i)).length;
      return bMatches - aMatches;
    });
  }
  return pool.slice(0, Math.min(count, pool.length));
}
