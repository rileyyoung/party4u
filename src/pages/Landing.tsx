import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const projects = [
  {
    title: "ShopMy Pitch",
    desc: "Recreating ShopMy — the SaaS affiliate marketing platform for creators and brands.",
    to: "/shopmypitch",
    accent: "from-rose-500 to-orange-400",
    tag: "SaaS",
  },
];

const Landing = () => {
  return (
    <div className="relative min-h-screen overflow-hidden bg-white">
      {/* Animated aura background */}
      <div className="pointer-events-none absolute inset-0 -z-0">
        <div className="absolute h-[600px] w-[600px] rounded-full bg-purple-200/60 blur-[120px] animate-[aura1_12s_ease-in-out_infinite]" />
        <div className="absolute h-[500px] w-[500px] rounded-full bg-violet-300/40 blur-[100px] animate-[aura2_15s_ease-in-out_infinite]" />
        <div className="absolute h-[400px] w-[400px] rounded-full bg-fuchsia-200/50 blur-[90px] animate-[aura3_18s_ease-in-out_infinite]" />
        <div className="absolute h-[350px] w-[350px] rounded-full bg-white/80 blur-[80px] animate-[aura4_10s_ease-in-out_infinite]" />
      </div>

      <style>{`
        @keyframes aura1 {
          0%, 100% { top: -10%; left: -5%; }
          25% { top: 20%; left: 60%; }
          50% { top: 50%; left: 30%; }
          75% { top: 10%; left: 70%; }
        }
        @keyframes aura2 {
          0%, 100% { top: 60%; left: 70%; }
          25% { top: 10%; left: 20%; }
          50% { top: 40%; left: 80%; }
          75% { top: 70%; left: 10%; }
        }
        @keyframes aura3 {
          0%, 100% { top: 30%; left: 50%; }
          33% { top: 70%; left: 10%; }
          66% { top: 5%; left: 80%; }
        }
        @keyframes aura4 {
          0%, 100% { top: 50%; left: 30%; }
          50% { top: 20%; left: 60%; }
        }
      `}</style>

      {/* Top bar */}
      <nav className="relative z-10 border-b border-gray-200/50 bg-white/40 backdrop-blur-xl">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-6 py-4">
          <span className="text-sm font-semibold tracking-wide text-gray-900">Riley Young</span>
          <span className="text-xs font-medium tracking-wider text-gray-400 uppercase">me + lovable + windsurf</span>
        </div>
      </nav>

      {/* Hero */}
      <div className="relative z-10 mx-auto max-w-3xl px-6 pt-20 pb-8">
        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
          Projects
        </h1>
        <p className="mt-3 max-w-lg text-base text-gray-500 leading-relaxed">
          A collection of things I've built with Lovable and Windsurf.
        </p>
      </div>

      {/* Project cards */}
      <div className="relative z-10 mx-auto max-w-3xl px-6 pb-20">
        <div className="grid gap-4">
          {projects.map((p) => (
            <Link
              key={p.title}
              to={p.to}
              className="group relative flex items-center justify-between rounded-2xl border border-gray-200 bg-white p-6 transition-all hover:border-gray-300 hover:shadow-lg hover:shadow-gray-200/50"
            >
              <div className="flex items-center gap-5">
                <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${p.accent}`}>
                  <span className="text-sm font-bold text-white">{p.title[0]}</span>
                </div>
                <div>
                  <div className="flex items-center gap-2.5">
                    <h2 className="text-base font-semibold text-gray-900">{p.title}</h2>
                    <span className="rounded-full bg-gray-100 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-gray-500">
                      {p.tag}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-gray-500">{p.desc}</p>
                </div>
              </div>
              <ArrowRight className="h-4 w-4 text-gray-300 transition-all group-hover:text-gray-500 group-hover:translate-x-0.5" />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Landing;
