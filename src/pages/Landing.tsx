import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div className="min-h-screen bg-background px-6 py-16">
      <div className="mx-auto w-full max-w-2xl">
        <h1 className="font-display text-4xl font-extrabold tracking-tight text-glow">Riley Young</h1>
        <p className="mt-4 text-muted-foreground">
          Write a short blurb about yourself here.
        </p>

        <div className="mt-10 rounded-xl border border-border bg-card p-6 shadow-card">
          <h2 className="font-display text-2xl font-bold">Party4U</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Discover parties, events and nightlife.
          </p>
          <Link
            to="/tennis"
            className="mt-5 inline-flex font-body text-sm font-medium text-primary hover:underline"
          >
            Open Party4U
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Landing;
