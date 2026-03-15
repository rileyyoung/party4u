import { useEffect, useState } from "react";
import heroBg from "@/assets/hero-bg.jpg";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface HeroSectionProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

const HeroSection = ({ searchQuery, onSearchChange }: HeroSectionProps) => {
  const variants = [
    {
      className: "font-display text-glow bg-disco-gradient bg-clip-text text-transparent",
    },
    {
      className:
        "font-body text-glow-accent bg-clip-text text-transparent bg-[linear-gradient(135deg,hsl(200_90%_60%),hsl(310_80%_55%))]",
    },
    {
      className:
        "font-mono bg-clip-text text-transparent bg-[linear-gradient(135deg,hsl(140_80%_55%),hsl(280_80%_60%))]",
    },
    {
      className:
        "font-display bg-clip-text text-transparent bg-[linear-gradient(135deg,hsl(50_95%_60%),hsl(280_80%_60%))]",
    },
  ];

  const [variantIndex, setVariantIndex] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => {
      setVariantIndex((i) => (i + 1) % variants.length);
    }, 900);

    return () => window.clearInterval(id);
  }, [variants.length]);

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
          <span
            key={variantIndex}
            className={`inline-block lowercase animate-fade-in transition-all duration-500 ${variants[variantIndex]?.className || ""}`}
          >
            now
          </span>
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
