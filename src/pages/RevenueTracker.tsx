import { Link } from "react-router-dom";

const RevenueTracker = () => {
  return (
    <div className="min-h-screen bg-background px-6 py-16">
      <div className="mx-auto w-full max-w-3xl">
        <div className="flex items-center justify-between gap-4">
          <h1 className="font-display text-3xl font-extrabold tracking-tight text-glow">
            Revenue Tracker
          </h1>
          <Link
            to="/"
            className="font-body text-sm font-medium text-primary hover:underline"
          >
            Home
          </Link>
        </div>

        <div className="mt-8 rounded-xl border border-border bg-card p-6 shadow-card">
          <p className="text-sm text-muted-foreground">
            This is a new interface living at <span className="font-mono">/revenuetracker</span>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default RevenueTracker;
