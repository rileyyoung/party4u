import { useState, useEffect, useMemo } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import EventPost from "@/components/EventPost";
import { supabase } from "@/integrations/supabase/client";

const categories = ["All", "Design", "Technology", "Networking", "Wellness", "Business", "Other"];

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      const { data, error } = await supabase
        .from("events")
        .select("*")
        .order("created_at", { ascending: false });
      if (!error && data) setEvents(data);
      setLoading(false);
    };
    fetchEvents();
  }, []);

  const filteredEvents = useMemo(() => {
    return events.filter((event) => {
      const matchesSearch =
        event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory =
        activeCategory === "All" || event.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, activeCategory, events]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection searchQuery={searchQuery} onSearchChange={setSearchQuery} />

      <main className="mx-auto max-w-2xl pb-20">
        {/* Category filters */}
        <div className="flex flex-wrap gap-2 px-4 py-6 sm:px-6">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`rounded-full px-4 py-1.5 font-body text-xs font-medium transition-all ${
                activeCategory === cat
                  ? "bg-primary text-primary-foreground shadow-soft glow-primary"
                  : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Feed */}
        {loading ? (
          <div className="py-20 text-center">
            <div className="inline-block h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent" />
            <p className="mt-3 text-sm text-muted-foreground">Loading the vibes...</p>
          </div>
        ) : filteredEvents.length > 0 ? (
          <div className="divide-y divide-border/50">
            {filteredEvents.map((event, i) => (
              <EventPost key={event.id} event={event} index={i} />
            ))}
          </div>
        ) : (
          <div className="py-20 text-center px-6">
            <p className="font-display text-xl font-semibold text-muted-foreground">No parties found 🪩</p>
            <p className="mt-2 text-sm text-muted-foreground">Try a different vibe or throw the first one!</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default Index;
