import { Link, useLocation } from "react-router-dom";
import { Plus, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <Calendar className="h-4 w-4 text-primary-foreground" />
          </div>
          <span className="font-display text-xl font-bold tracking-tight">
            Eventful
          </span>
        </Link>

        <div className="flex items-center gap-6">
          <Link
            to="/"
            className={`font-body text-sm font-medium transition-colors hover:text-foreground ${
              location.pathname === "/"
                ? "text-foreground"
                : "text-muted-foreground"
            }`}
          >
            Discover
          </Link>
          <Link to="/create">
            <Button size="sm" className="gap-1.5">
              <Plus className="h-4 w-4" />
              Create Event
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
