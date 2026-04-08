import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

interface TickerEntry {
  id: number;
  name: string;
  plan: string;
  amount: number;
  timestamp: Date;
}

const PLANS = [
  { name: "Starter", amount: 9 },
  { name: "Pro", amount: 29 },
  { name: "Business", amount: 79 },
  { name: "Enterprise", amount: 199 },
];

const FIRST_NAMES = [
  "Alex", "Jordan", "Taylor", "Morgan", "Casey", "Riley", "Avery", "Quinn",
  "Drew", "Jamie", "Sage", "Reese", "Blake", "Harper", "Emery", "Peyton",
  "Skyler", "Dakota", "Finley", "Rowan", "Kai", "Ari", "Jude", "Micah",
];

const LAST_INITIALS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

const randomName = () =>
  `${FIRST_NAMES[Math.floor(Math.random() * FIRST_NAMES.length)]} ${LAST_INITIALS[Math.floor(Math.random() * 26)]}.`;

const randomPlan = () => PLANS[Math.floor(Math.random() * PLANS.length)];

const formatCurrency = (n: number) =>
  n.toLocaleString("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 0 });

const RevenueTracker = () => {
  const [totalUsers, setTotalUsers] = useState(1_247);
  const [totalRevenue, setTotalRevenue] = useState(48_920);
  const [todayUsers, setTodayUsers] = useState(34);
  const [todayRevenue, setTodayRevenue] = useState(1_580);
  const [ticker, setTicker] = useState<TickerEntry[]>([]);
  const nextId = useRef(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const plan = randomPlan();
      const entry: TickerEntry = {
        id: nextId.current++,
        name: randomName(),
        plan: plan.name,
        amount: plan.amount,
        timestamp: new Date(),
      };

      setTotalUsers((u) => u + 1);
      setTotalRevenue((r) => r + plan.amount);
      setTodayUsers((u) => u + 1);
      setTodayRevenue((r) => r + plan.amount);
      setTicker((prev) => [entry, ...prev].slice(0, 20));
    }, 2200 + Math.random() * 1800);

    return () => clearInterval(interval);
  }, []);

  const mrrEstimate = totalRevenue * 0.82;

  return (
    <div className="min-h-screen bg-white px-6 py-12 text-[#4c1d95]">
      <div className="mx-auto w-full max-w-4xl">
        {/* Header */}
        <div className="flex items-center justify-between gap-4">
          <div>
            <h1 className="font-display text-3xl font-extrabold tracking-tight">
              Revenue Tracker
            </h1>
            <p className="mt-1 text-sm text-[#6b21a8]">Live subscription metrics</p>
          </div>
          <Link
            to="/"
            className="font-body text-sm font-bold text-[#6b21a8] hover:underline"
          >
            Home
          </Link>
        </div>

        {/* Stat Cards */}
        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
          <StatCard label="Total Subscribers" value={totalUsers.toLocaleString()} accent="primary" />
          <StatCard label="Total Revenue" value={formatCurrency(totalRevenue)} accent="accent" />
          <StatCard label="Today's Signups" value={`+${todayUsers}`} accent="green" />
          <StatCard label="Est. MRR" value={formatCurrency(Math.round(mrrEstimate))} accent="purple" />
        </div>

        {/* Revenue bar */}
        <div className="mt-8 rounded-xl border border-[#e9d5ff] bg-[#faf5ff] p-6 shadow-sm">
          <h2 className="font-display text-lg font-bold mb-4">Revenue by Plan</h2>
          <div className="space-y-3">
            {PLANS.map((plan) => {
              const count = ticker.filter((t) => t.plan === plan.name).length;
              const maxWidth = Math.min(100, (count / Math.max(ticker.length, 1)) * 100 + 15);
              return (
                <div key={plan.name} className="space-y-1">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium">{plan.name}</span>
                    <span className="text-[#7c3aed]">{formatCurrency(plan.amount)}/mo</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-[#e9d5ff] overflow-hidden">
                    <div
                      className="h-full rounded-full bg-disco-gradient transition-all duration-700 ease-out"
                      style={{ width: `${maxWidth}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Live Ticker */}
        <div className="mt-8 rounded-xl border border-[#e9d5ff] bg-[#faf5ff] p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-green-500" />
            </span>
            <h2 className="font-display text-lg font-bold">Live Feed</h2>
          </div>

          {ticker.length === 0 ? (
            <p className="text-sm text-[#6b21a8] text-center py-6">
              Waiting for new subscriptions...
            </p>
          ) : (
            <div className="space-y-2 max-h-[400px] overflow-y-auto">
              {ticker.map((entry) => (
                <div
                  key={entry.id}
                  className="flex items-center justify-between rounded-lg border border-[#e9d5ff] bg-[#faf5ff] px-4 py-2.5 animate-fade-in"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#e9d5ff] text-xs font-bold text-[#4c1d95]">
                      {entry.name[0]}
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-medium truncate">{entry.name}</p>
                      <p className="text-xs text-[#7c3aed]">
                        subscribed to <span className="font-semibold text-[#4c1d95]">{entry.plan}</span>
                      </p>
                    </div>
                  </div>
                  <div className="text-right shrink-0 ml-3">
                    <p className="text-sm font-bold text-green-400">+{formatCurrency(entry.amount)}</p>
                    <p className="text-[10px] text-[#7c3aed]">
                      {entry.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" })}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const ACCENT_COLORS: Record<string, string> = {
  primary: "text-[#4c1d95]",
  accent: "text-[#7c3aed]",
  green: "text-green-600",
  purple: "text-[#6b21a8]",
};

const StatCard = ({ label, value, accent }: { label: string; value: string; accent: string }) => (
  <div className="rounded-xl border border-[#e9d5ff] bg-[#faf5ff] p-4 shadow-sm">
    <p className="text-[11px] font-medium uppercase tracking-wider text-[#6b21a8]">{label}</p>
    <p className={`mt-1 font-display text-2xl font-extrabold tabular-nums ${ACCENT_COLORS[accent] || "text-primary"}`}>
      {value}
    </p>
  </div>
);

export default RevenueTracker;
