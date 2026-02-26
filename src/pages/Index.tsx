import { useState, useMemo } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import EventCard from "@/components/EventCard";
import { mockEvents, categories } from "@/lib/mock-data";
import { Badge } from "@/components/ui/badge";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredEvents = useMemo(() => {
    return mockEvents.filter((event) => {
      const matchesSearch =
        event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory =
        activeCategory === "All" || event.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, activeCategory]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection searchQuery={searchQuery} onSearchChange={setSearchQuery} />

      <main className="mx-auto max-w-6xl px-6 pb-20">
        {/* Category filter */}
        <div className="flex flex-wrap gap-2 py-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`rounded-full px-4 py-1.5 font-body text-sm font-medium transition-all ${
                activeCategory === cat
                  ? "bg-primary text-primary-foreground shadow-soft"
                  : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Events grid */}
        {filteredEvents.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredEvents.map((event, i) => (
              <EventCard key={event.id} event={event} index={i} />
            ))}
          </div>
        ) : (
          <div className="py-20 text-center">
            <p className="font-display text-xl font-semibold text-muted-foreground">
              No events found
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              Try adjusting your search or category filter.
            </p>
          </div>
        )}
      </main>
    </div>
  );
};

export default Index;
