export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  organizer: string;
  attendees: number;
  maxAttendees: number;
  coverImage: string;
  category: string;
  isOnline: boolean;
}

export const mockEvents: Event[] = [
  {
    id: "1",
    title: "Design Systems Summit 2026",
    description: "Join leading designers and engineers for a deep dive into building scalable design systems. We'll cover tokens, component libraries, documentation strategies, and cross-platform consistency. Featuring talks from teams at top tech companies and interactive workshops.",
    date: "2026-03-15",
    time: "10:00 AM",
    location: "The Glasshouse, San Francisco",
    organizer: "Design Collective",
    attendees: 142,
    maxAttendees: 200,
    coverImage: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=400&fit=crop",
    category: "Design",
    isOnline: false,
  },
  {
    id: "2",
    title: "AI & Creative Tools Workshop",
    description: "Explore the intersection of artificial intelligence and creative workflows. Hands-on sessions with the latest generative AI tools for designers, writers, and makers. Learn practical techniques to augment your creative process.",
    date: "2026-03-22",
    time: "2:00 PM",
    location: "Online",
    organizer: "Future Studio",
    attendees: 89,
    maxAttendees: 500,
    coverImage: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&h=400&fit=crop",
    category: "Technology",
    isOnline: true,
  },
  {
    id: "3",
    title: "Founders Dinner — Spring Edition",
    description: "An intimate evening for startup founders to connect, share stories, and build meaningful relationships. Enjoy a curated dinner experience with fellow entrepreneurs in a relaxed, off-the-record setting.",
    date: "2026-04-02",
    time: "7:00 PM",
    location: "Nopa, San Francisco",
    organizer: "Startup Social",
    attendees: 24,
    maxAttendees: 30,
    coverImage: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&h=400&fit=crop",
    category: "Networking",
    isOnline: false,
  },
  {
    id: "4",
    title: "Web Performance Masterclass",
    description: "A full-day workshop on making your web applications blazing fast. Core Web Vitals, bundle optimization, lazy loading strategies, and real-world performance debugging. Bring your laptop and your slowest app.",
    date: "2026-04-10",
    time: "9:00 AM",
    location: "WeWork Mission St, San Francisco",
    organizer: "WebDev Guild",
    attendees: 56,
    maxAttendees: 80,
    coverImage: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&h=400&fit=crop",
    category: "Technology",
    isOnline: false,
  },
  {
    id: "5",
    title: "Mindful Morning — Meditation & Coffee",
    description: "Start your Saturday with guided meditation followed by specialty coffee and organic pastries. A calm space to recharge and connect with like-minded people. All experience levels welcome.",
    date: "2026-04-05",
    time: "8:00 AM",
    location: "Golden Gate Park Pavilion",
    organizer: "Calm Collective",
    attendees: 35,
    maxAttendees: 50,
    coverImage: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&h=400&fit=crop",
    category: "Wellness",
    isOnline: false,
  },
  {
    id: "6",
    title: "Product Launch Playbook",
    description: "Learn the strategies behind successful product launches from PMs who've shipped to millions. Covers go-to-market planning, beta programs, launch day operations, and post-launch iteration.",
    date: "2026-04-18",
    time: "11:00 AM",
    location: "Online",
    organizer: "PM School",
    attendees: 210,
    maxAttendees: 1000,
    coverImage: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800&h=400&fit=crop",
    category: "Business",
    isOnline: true,
  },
];

export const categories = ["All", "Design", "Technology", "Networking", "Wellness", "Business"];
