import { City } from "@/types";

export interface CityOption {
  id: City;
  name: string;
  tagline: string;
  state: string;
  landmark: string;
  popularCategories: string[];
}

export const CITIES: CityOption[] = [
  {
    id: "Nagpur",
    name: "Nagpur",
    tagline: "The Orange City · Heart of India",
    state: "Maharashtra",
    landmark: "Futala Lake & Civil Lines",
    popularCategories: ["Sports", "Food", "Technology"],
  },
  {
    id: "Pune",
    name: "Pune",
    tagline: "Oxford of the East · Startup Hub",
    state: "Maharashtra",
    landmark: "FC Road & Koregaon Park",
    popularCategories: ["Startups", "Music", "Outdoors"],
  },
  {
    id: "Mumbai",
    name: "Mumbai",
    tagline: "The City of Dreams · Never Sleeps",
    state: "Maharashtra",
    landmark: "Marine Drive & Bandra",
    popularCategories: ["Art", "Dance", "Movies"],
  },
  {
    id: "Bangalore",
    name: "Bangalore",
    tagline: "Silicon Valley · Pub & Tech Capital",
    state: "Karnataka",
    landmark: "Indiranagar & Cubbon Park",
    popularCategories: ["Technology", "Gaming", "Networking"],
  },
  {
    id: "Delhi",
    name: "Delhi",
    tagline: "Capital Vibes · Heritage & Flavors",
    state: "NCR",
    landmark: "Hauz Khas & Lodhi Gardens",
    popularCategories: ["Food", "Books", "Art"],
  },
  {
    id: "Hyderabad",
    name: "Hyderabad",
    tagline: "Cyberabad · Biryani & Tech",
    state: "Telangana",
    landmark: "Jubilee Hills & Durgam Cheruvu",
    popularCategories: ["Technology", "Food", "Sports"],
  },
  {
    id: "Indore",
    name: "Indore",
    tagline: "Cleanest City · Street Food Capital",
    state: "Madhya Pradesh",
    landmark: "Sarafa Bazaar & Chappan Dukan",
    popularCategories: ["Food", "Travel", "Fitness"],
  },
];
