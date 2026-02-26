import heroBg from "@/assets/hero-bg.jpg";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface HeroSectionProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

const HeroSection = ({ searchQuery, onSearchChange }: HeroSectionProps) => {
  return (
    <section className="relative overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-30"
        style={{ backgroundImage: `url(${heroBg})` }}
      />
      <div className="relative mx-auto max-w-6xl px-6 py-20 text-center">
        <h1 className="animate-fade-in font-display text-5xl font-bold tracking-tight sm:text-6xl">
          Discover events that{" "}
          <span className="text-primary">inspire</span>
        </h1>
        <p className="mx-auto mt-4 max-w-xl animate-fade-in text-lg text-muted-foreground" style={{ animationDelay: "100ms" }}>
          Find and join amazing events hosted by communities around you — or create your own.
        </p>

        <div className="mx-auto mt-8 max-w-md animate-fade-in" style={{ animationDelay: "200ms" }}>
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search events..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="h-12 rounded-full border-border bg-card pl-10 shadow-soft font-body"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
