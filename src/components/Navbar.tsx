import { Link, useLocation } from "react-router-dom";
import { Plus, Calendar, User, LogIn, MessageSquare, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";

const Navbar = () => {
  const location = useLocation();
  const { user, loading } = useAuth();

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-disco-gradient glow-primary">
            <Calendar className="h-4 w-4 text-primary-foreground" />
          </div>
          <span className="font-display text-xl font-extrabold tracking-tight text-glow">
            Party4U
          </span>
        </Link>

        <div className="flex items-center gap-4">
          <Link
            to="/"
            className={`font-body text-sm font-medium transition-colors hover:text-foreground ${
              location.pathname === "/" ? "text-foreground" : "text-muted-foreground"
            }`}
          >
            Discover
          </Link>
          <Link
            to="/find"
            className={`font-body text-sm font-medium transition-colors hover:text-foreground ${
              location.pathname === "/find" ? "text-foreground" : "text-muted-foreground"
            }`}
          >
            <span className="flex items-center gap-1"><Sparkles className="h-3.5 w-3.5" /> AI Finder</span>
          </Link>

          <a
            href="https://rileymyoung.com/tennis"
            target="_blank"
            rel="noreferrer"
            className="font-body text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Tennis
          </a>
          <a
            href="https://rileymyoung.com"
            target="_blank"
            rel="noreferrer"
            className="font-body text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            rileymyoung.com
          </a>

          {!loading && (
            <>
              {user ? (
                <>
                  <Link to="/create">
                    <Button size="sm" className="gap-1.5">
                      <Plus className="h-4 w-4" /> Create
                    </Button>
                  </Link>
                  <Link to="/messages">
                    <Button variant="ghost" size="sm" className="gap-1.5">
                      <MessageSquare className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Link to="/account">
                    <Button variant="outline" size="sm" className="gap-1.5">
                      <User className="h-4 w-4" /> Account
                    </Button>
                  </Link>
                </>
              ) : (
                <Link to="/auth">
                  <Button size="sm" className="gap-1.5">
                    <LogIn className="h-4 w-4" /> Sign In
                  </Button>
                </Link>
              )}
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
