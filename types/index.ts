export type City = 
  | 'Nagpur'
  | 'Pune'
  | 'Mumbai'
  | 'Bangalore'
  | 'Delhi'
  | 'Hyderabad'
  | 'Indore';

export type Category =
  | 'Technology'
  | 'Sports'
  | 'Music'
  | 'Dance'
  | 'Food'
  | 'Art'
  | 'Gaming'
  | 'Fitness'
  | 'Movies'
  | 'Travel'
  | 'Photography'
  | 'Startups'
  | 'Books'
  | 'Outdoors'
  | 'Networking';

export type Vibe =
  | 'Meet new people'
  | 'Try something new'
  | 'Find activity partners'
  | 'Attend events'
  | 'Weekend plans'
  | 'Just see what\'s happening';

export interface User {
  id: string;
  name: string;
  avatar: string;
  interests: Category[];
  city: City;
  bio?: string;
  role?: string;
}

export interface Activity {
  id: string;
  title: string;
  category: Category;
  description: string;
  date: string;
  time: string;
  location: string;
  city: City;
  distance: string;
  host: string;
  hostAvatar: string;
  attendees: User[];
  interestedCount: number;
  capacity: number;
  image: string;
  gradient?: string;
  tags: string[];
  vibes: Vibe[];
  isWeekend?: boolean;
  isUserCreated?: boolean;
  createdAt?: number;
  cost?: string; // e.g. "Free", "Split court fee", "Buy your own food"
}

export interface Plan {
  id: string;
  activityId: string;
  status: 'interested' | 'created';
  createdAt: number;
  activity?: Activity;
}

export interface OnboardingState {
  city: City;
  interests: Category[];
  vibes: Vibe[];
  completed: boolean;
}

export type ActiveTab = 'explore' | 'plans' | 'create' | 'profile';
