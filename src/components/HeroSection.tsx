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
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{ backgroundImage: `url(${heroBg})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background" />
      <div className="relative mx-auto max-w-6xl px-6 py-24 text-center">
        <h1 className="animate-fade-in font-display text-5xl font-extrabold tracking-tight sm:text-7xl">
          The party starts{" "}
          <span className="text-glow bg-disco-gradient bg-clip-text text-transparent">here</span>
        </h1>
        <p className="mx-auto mt-5 max-w-xl animate-fade-in text-base text-muted-foreground" style={{ animationDelay: "100ms" }}>
          Discover the hottest events & nightlife near you — or throw your own party.
        </p>

        <div className="mx-auto mt-8 max-w-md animate-fade-in" style={{ animationDelay: "200ms" }}>
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search events..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="h-12 rounded-full border-border bg-card/80 pl-10 shadow-soft font-body backdrop-blur-sm"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
