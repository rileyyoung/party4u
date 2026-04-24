import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const projects = [
  {
    title: "Party4U",
    desc: "Discover parties, events and nightlife.",
    to: "/tennis",
    accent: "from-violet-600 to-indigo-600",
    tag: "Social",
  },
  {
    title: "Revenue Tracker",
    desc: "Track revenue with a dedicated interface.",
    to: "/revenuetracker",
    accent: "from-fuchsia-600 to-pink-600",
    tag: "Analytics",
  },
  {
    title: "Pitch Deck AI",
    desc: "AI-powered pitch deck generator linked to your revenue data.",
    to: "/pitchdeck",
    accent: "from-purple-600 to-violet-600",
    tag: "AI",
  },
];

const Landing = () => {
  return (
    <div className="min-h-screen bg-[#fafafa]">
      {/* Top bar */}
      <nav className="border-b border-gray-200/80 bg-white/70 backdrop-blur-md">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-6 py-4">
          <span className="text-sm font-semibold tracking-wide text-gray-900">Riley Young</span>
          <span className="text-xs font-medium tracking-wider text-gray-400 uppercase">me + lovable + windsurf</span>
        </div>
      </nav>

      {/* Hero */}
      <div className="mx-auto max-w-3xl px-6 pt-20 pb-8">
        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
          Projects
        </h1>
        <p className="mt-3 max-w-lg text-base text-gray-500 leading-relaxed">
          A collection of things I've built with Lovable and Windsurf.
        </p>
      </div>

      {/* Project cards */}
      <div className="mx-auto max-w-3xl px-6 pb-20">
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
