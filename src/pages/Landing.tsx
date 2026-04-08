import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div className="min-h-screen bg-[#f3e8ff] px-6 py-16">
      <div className="mx-auto w-full max-w-2xl">
        <h1 className="font-display text-6xl font-black tracking-tight text-[#4c1d95]">Riley Young</h1>
        <p className="mt-4 text-lg font-semibold text-[#6b21a8]">
          my secret creative outlet!
        </p>

        <div className="mt-10 rounded-xl border border-border bg-card p-6 shadow-card">
          <h2 className="font-display text-3xl font-bold text-white">Party4U</h2>
          <p className="mt-2 text-base text-white/80">
            Discover parties, events and nightlife.
          </p>
          <Link
            to="/tennis"
            className="mt-5 inline-flex font-body text-xl font-bold text-white hover:underline"
          >
            Open Party4U →
          </Link>
        </div>

        <div className="mt-6 rounded-xl border border-border bg-card p-6 shadow-card">
          <h2 className="font-display text-3xl font-bold text-white">Revenue Tracker</h2>
          <p className="mt-2 text-base text-white/80">
            Track revenue with a dedicated interface.
          </p>
          <Link
            to="/revenuetracker"
            className="mt-5 inline-flex font-body text-xl font-bold text-white hover:underline"
          >
            Open Revenue Tracker →
          </Link>
        </div>

        <div className="mt-6 rounded-xl border border-border bg-card p-6 shadow-card">
          <h2 className="font-display text-3xl font-bold text-white">Pitch Deck AI</h2>
          <p className="mt-2 text-base text-white/80">
            AI-powered pitch deck generator linked to your revenue data.
          </p>
          <Link
            to="/pitchdeck"
            className="mt-5 inline-flex font-body text-xl font-bold text-white hover:underline"
          >
            Open Pitch Deck AI →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Landing;
