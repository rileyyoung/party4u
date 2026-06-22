import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  BarChart3,
  DollarSign,
  Globe,
  Link2,
  ShoppingBag,
  Sparkles,
  Star,
  TrendingUp,
  Users,
  Zap,
  CheckCircle2,
  ChevronRight,
} from "lucide-react";

// Mock data
const METRICS = {
  creatorsOnPlatform: "48,000+",
  brandsOnPlatform: "6,200+",
  totalGmv: "$320M+",
  avgCreatorEarnings: "$4,800/mo",
};

const TOP_CREATORS = [
  { name: "Ava Chen", handle: "@avastyleco", followers: "1.2M", earnings: "$38,400", avatar: "AC", niche: "Fashion" },
  { name: "Marcus Rivera", handle: "@marcuseats", followers: "890K", earnings: "$27,100", avatar: "MR", niche: "Food" },
  { name: "Lily Tran", handle: "@lilybeauty", followers: "2.1M", earnings: "$52,300", avatar: "LT", niche: "Beauty" },
  { name: "Jordan Blake", handle: "@jblakefitness", followers: "640K", earnings: "$19,800", avatar: "JB", niche: "Fitness" },
  { name: "Sophie Kim", handle: "@sophiehome", followers: "1.5M", earnings: "$44,200", avatar: "SK", niche: "Home" },
];

const BRANDS = [
  { name: "Glossier", category: "Beauty", campaigns: 142, roi: "8.4x" },
  { name: "Allbirds", category: "Footwear", campaigns: 89, roi: "6.2x" },
  { name: "Mejuri", category: "Jewelry", campaigns: 203, roi: "11.1x" },
  { name: "Caraway", category: "Home", campaigns: 67, roi: "7.8x" },
  { name: "Athletic Greens", category: "Wellness", campaigns: 156, roi: "9.3x" },
];

const FEATURES = [
  {
    icon: Link2,
    title: "Smart Affiliate Links",
    desc: "One-click shoppable links that auto-optimize for conversion. Deep linking, vanity URLs, and real-time click tracking.",
  },
  {
    icon: BarChart3,
    title: "Creator Analytics",
    desc: "See exactly what's converting. Revenue attribution, audience overlap analysis, and content performance scoring.",
  },
  {
    icon: ShoppingBag,
    title: "Shoppable Storefronts",
    desc: "Every creator gets a customizable storefront. Curated collections, wishlists, and seasonal edits — all commission-earning.",
  },
  {
    icon: Zap,
    title: "Instant Payouts",
    desc: "No more net-60 invoicing. Creators earn and withdraw instantly with transparent commission structures.",
  },
  {
    icon: Globe,
    title: "Brand Discovery",
    desc: "AI-powered brand matching connects creators with the right partnerships based on audience, niche, and engagement.",
  },
  {
    icon: TrendingUp,
    title: "Campaign Management",
    desc: "Brands launch, track, and scale influencer campaigns from a single dashboard. Gifting, paid collabs, and affiliate — unified.",
  },
];

const PRICING = [
  {
    tier: "Creator",
    price: "Free",
    sub: "forever",
    features: ["Unlimited affiliate links", "Personal storefront", "Real-time analytics", "Instant payouts", "Brand discovery"],
    cta: "Start Earning",
    accent: false,
  },
  {
    tier: "Brand",
    price: "$499",
    sub: "/month",
    features: ["Creator CRM & discovery", "Campaign management", "Gifting automation", "Performance analytics", "Dedicated account manager"],
    cta: "Launch Campaign",
    accent: true,
  },
  {
    tier: "Enterprise",
    price: "Custom",
    sub: "",
    features: ["Multi-brand portfolio", "API access", "Custom integrations", "White-label storefronts", "Priority support & SLA"],
    cta: "Contact Sales",
    accent: false,
  },
];

const MONTHLY_REVENUE = [
  { month: "Jan", revenue: 18.2 },
  { month: "Feb", revenue: 21.4 },
  { month: "Mar", revenue: 24.8 },
  { month: "Apr", revenue: 28.1 },
  { month: "May", revenue: 32.6 },
  { month: "Jun", revenue: 38.9 },
  { month: "Jul", revenue: 42.3 },
  { month: "Aug", revenue: 47.1 },
  { month: "Sep", revenue: 51.8 },
  { month: "Oct", revenue: 56.4 },
  { month: "Nov", revenue: 62.0 },
  { month: "Dec", revenue: 68.7 },
];

type Tab = "overview" | "creators" | "brands" | "product" | "pricing";

const ShopMyPitch = () => {
  const [activeTab, setActiveTab] = useState<Tab>("overview");

  const maxRevenue = Math.max(...MONTHLY_REVENUE.map((m) => m.revenue));

  const tabs: { key: Tab; label: string }[] = [
    { key: "overview", label: "Overview" },
    { key: "creators", label: "Creators" },
    { key: "brands", label: "Brands" },
    { key: "product", label: "Product" },
    { key: "pricing", label: "Pricing" },
  ];

  return (
    <div className="min-h-screen bg-[#fafafa]">
      {/* Nav */}
      <nav className="sticky top-0 z-50 border-b border-gray-200/60 bg-white/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-3">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-rose-500 to-orange-400">
              <ShoppingBag className="h-4 w-4 text-white" />
            </div>
            <span className="text-base font-bold tracking-tight text-gray-900">ShopMy</span>
            <span className="ml-1 rounded-full bg-rose-50 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-rose-500">
              Pitch
            </span>
          </div>
          <Link to="/" className="text-sm font-medium text-gray-400 hover:text-gray-600 transition">
            ← Home
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <div className="relative overflow-hidden bg-gradient-to-b from-white to-rose-50/40">
        <div className="mx-auto max-w-5xl px-6 pt-20 pb-16">
          <div className="max-w-2xl">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-rose-50 px-3 py-1 text-xs font-semibold text-rose-600">
              <Sparkles className="h-3 w-3" />
              The #1 Creator Commerce Platform
            </div>
            <h1 className="text-5xl font-extrabold tracking-tight text-gray-900 leading-[1.1] sm:text-6xl">
              Where creators
              <br />
              <span className="bg-gradient-to-r from-rose-500 to-orange-400 bg-clip-text text-transparent">
                become brands.
              </span>
            </h1>
            <p className="mt-5 max-w-lg text-lg leading-relaxed text-gray-500">
              ShopMy connects creators with the brands they love — turning authentic recommendations
              into revenue through affiliate links, shoppable storefronts, and brand partnerships.
            </p>
            <div className="mt-8 flex gap-3">
              <button className="inline-flex items-center gap-2 rounded-xl bg-gray-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-gray-800">
                Get Started <ArrowRight className="h-4 w-4" />
              </button>
              <button className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-5 py-3 text-sm font-semibold text-gray-700 transition hover:border-gray-300 hover:shadow-sm">
                See Demo
              </button>
            </div>
          </div>

          {/* Hero stats */}
          <div className="mt-16 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {[
              { label: "Creators", value: METRICS.creatorsOnPlatform, icon: Users },
              { label: "Brands", value: METRICS.brandsOnPlatform, icon: ShoppingBag },
              { label: "Total GMV", value: METRICS.totalGmv, icon: DollarSign },
              { label: "Avg Earnings", value: METRICS.avgCreatorEarnings, icon: TrendingUp },
            ].map((s) => (
              <div key={s.label} className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
                <div className="flex items-center gap-2 text-xs font-medium text-gray-400 uppercase tracking-wider">
                  <s.icon className="h-3.5 w-3.5" />
                  {s.label}
                </div>
                <div className="mt-2 text-2xl font-extrabold text-gray-900">{s.value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tab Nav */}
      <div className="sticky top-[53px] z-40 border-b border-gray-200/60 bg-white/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-5xl gap-1 px-6">
          {tabs.map((t) => (
            <button
              key={t.key}
              onClick={() => setActiveTab(t.key)}
              className={`px-4 py-3 text-sm font-medium transition-colors border-b-2 ${
                activeTab === t.key
                  ? "border-rose-500 text-gray-900"
                  : "border-transparent text-gray-400 hover:text-gray-600"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="mx-auto max-w-5xl px-6 py-12">
        {/* OVERVIEW */}
        {activeTab === "overview" && (
          <div className="space-y-12">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Platform Growth</h2>
              <p className="mt-1 text-sm text-gray-500">Monthly GMV (millions)</p>
              <div className="mt-6 flex items-end gap-2 h-52">
                {MONTHLY_REVENUE.map((m) => (
                  <div key={m.month} className="flex flex-1 flex-col items-center gap-1">
                    <span className="text-[10px] font-semibold text-gray-500">${m.revenue}M</span>
                    <div
                      className="w-full rounded-t-lg bg-gradient-to-t from-rose-500 to-orange-300 transition-all"
                      style={{ height: `${(m.revenue / maxRevenue) * 160}px` }}
                    />
                    <span className="text-[10px] font-medium text-gray-400">{m.month}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid gap-6 sm:grid-cols-3">
              <div className="rounded-2xl border border-gray-100 bg-white p-6">
                <div className="text-3xl font-extrabold text-gray-900">94%</div>
                <p className="mt-1 text-sm text-gray-500">Creator retention rate (12-month)</p>
              </div>
              <div className="rounded-2xl border border-gray-100 bg-white p-6">
                <div className="text-3xl font-extrabold text-gray-900">3.2x</div>
                <p className="mt-1 text-sm text-gray-500">Higher CVR vs traditional affiliate</p>
              </div>
              <div className="rounded-2xl border border-gray-100 bg-white p-6">
                <div className="text-3xl font-extrabold text-gray-900">$6.8B</div>
                <p className="mt-1 text-sm text-gray-500">Creator economy TAM by 2028</p>
              </div>
            </div>

            <div className="rounded-2xl border border-gray-100 bg-gradient-to-br from-gray-900 to-gray-800 p-8 text-white">
              <h3 className="text-xl font-bold">The Problem</h3>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-gray-300">
                Creators spend hours managing disparate affiliate networks, losing revenue to broken links and
                opaque reporting. Brands struggle to find authentic creator partnerships at scale. The $250B
                influencer marketing industry runs on manual outreach, spreadsheets, and delayed payments.
              </p>
              <div className="mt-6 flex items-center gap-2 text-sm font-semibold text-rose-400">
                <Zap className="h-4 w-4" />
                ShopMy fixes this with a unified commerce layer for the creator economy.
              </div>
            </div>
          </div>
        )}

        {/* CREATORS */}
        {activeTab === "creators" && (
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Top Earning Creators</h2>
              <p className="mt-1 text-sm text-gray-500">This month's highest performers across all niches</p>
            </div>
            <div className="space-y-3">
              {TOP_CREATORS.map((c, i) => (
                <div
                  key={c.handle}
                  className="flex items-center justify-between rounded-2xl border border-gray-100 bg-white p-5 transition hover:shadow-sm"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-rose-100 to-orange-100 text-sm font-bold text-rose-600">
                      {c.avatar}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-gray-900">{c.name}</span>
                        {i === 0 && <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />}
                      </div>
                      <span className="text-sm text-gray-400">{c.handle}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-8 text-right">
                    <div>
                      <div className="text-xs font-medium text-gray-400 uppercase">Niche</div>
                      <div className="text-sm font-semibold text-gray-700">{c.niche}</div>
                    </div>
                    <div>
                      <div className="text-xs font-medium text-gray-400 uppercase">Followers</div>
                      <div className="text-sm font-semibold text-gray-700">{c.followers}</div>
                    </div>
                    <div>
                      <div className="text-xs font-medium text-gray-400 uppercase">Earnings</div>
                      <div className="text-sm font-bold text-emerald-600">{c.earnings}</div>
                    </div>
                    <ChevronRight className="h-4 w-4 text-gray-300" />
                  </div>
                </div>
              ))}
            </div>

            <div className="rounded-2xl border border-rose-100 bg-rose-50 p-6">
              <h3 className="font-bold text-gray-900">How Creators Earn</h3>
              <div className="mt-4 grid gap-4 sm:grid-cols-3">
                {[
                  { title: "Affiliate Links", pct: "60%", desc: "Commission on every sale from shared links" },
                  { title: "Brand Partnerships", pct: "30%", desc: "Paid collaborations matched by AI" },
                  { title: "Storefronts", pct: "10%", desc: "Ongoing passive income from curated shops" },
                ].map((r) => (
                  <div key={r.title} className="rounded-xl bg-white p-4">
                    <div className="text-2xl font-extrabold text-rose-500">{r.pct}</div>
                    <div className="mt-1 text-sm font-semibold text-gray-900">{r.title}</div>
                    <div className="mt-1 text-xs text-gray-500">{r.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* BRANDS */}
        {activeTab === "brands" && (
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Brand Partners</h2>
              <p className="mt-1 text-sm text-gray-500">Top-performing brands on the platform</p>
            </div>
            <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-100 bg-gray-50/50">
                    <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-400">Brand</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-400">Category</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-400">Campaigns</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-400">ROI</th>
                  </tr>
                </thead>
                <tbody>
                  {BRANDS.map((b) => (
                    <tr key={b.name} className="border-b border-gray-50 transition hover:bg-gray-50/50">
                      <td className="px-6 py-4 font-semibold text-gray-900">{b.name}</td>
                      <td className="px-6 py-4">
                        <span className="rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-600">
                          {b.category}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">{b.campaigns}</td>
                      <td className="px-6 py-4 text-sm font-bold text-emerald-600">{b.roi}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-gray-100 bg-white p-6">
                <h3 className="font-bold text-gray-900">Why Brands Choose ShopMy</h3>
                <ul className="mt-4 space-y-3">
                  {[
                    "Authentic creator partnerships at scale",
                    "Full-funnel attribution from impression to sale",
                    "Automated gifting & product seeding",
                    "Performance-based pricing — pay for results",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-gray-600">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-2xl border border-gray-100 bg-white p-6">
                <h3 className="font-bold text-gray-900">Campaign Types</h3>
                <div className="mt-4 space-y-3">
                  {[
                    { type: "Affiliate", desc: "Commission-based product promotion", pct: 45 },
                    { type: "Gifting", desc: "Product seeding for organic content", pct: 30 },
                    { type: "Paid Collab", desc: "Sponsored content partnerships", pct: 25 },
                  ].map((ct) => (
                    <div key={ct.type}>
                      <div className="flex items-center justify-between text-sm">
                        <span className="font-medium text-gray-700">{ct.type}</span>
                        <span className="text-xs text-gray-400">{ct.pct}%</span>
                      </div>
                      <div className="mt-1 h-2 rounded-full bg-gray-100">
                        <div
                          className="h-2 rounded-full bg-gradient-to-r from-rose-500 to-orange-400"
                          style={{ width: `${ct.pct}%` }}
                        />
                      </div>
                      <div className="mt-0.5 text-xs text-gray-400">{ct.desc}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* PRODUCT */}
        {activeTab === "product" && (
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Product</h2>
              <p className="mt-1 text-sm text-gray-500">Everything creators and brands need in one platform</p>
            </div>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {FEATURES.map((f) => (
                <div
                  key={f.title}
                  className="group rounded-2xl border border-gray-100 bg-white p-6 transition hover:border-gray-200 hover:shadow-md"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-rose-50 to-orange-50">
                    <f.icon className="h-5 w-5 text-rose-500" />
                  </div>
                  <h3 className="mt-4 font-semibold text-gray-900">{f.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-gray-500">{f.desc}</p>
                </div>
              ))}
            </div>

            <div className="rounded-2xl border border-gray-100 bg-gradient-to-r from-rose-500 to-orange-400 p-8 text-white">
              <h3 className="text-xl font-bold">AI-Powered Matching</h3>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-white/80">
                Our proprietary algorithm analyzes creator content, audience demographics, engagement patterns,
                and brand affinity to surface the highest-converting partnerships. Brands see 3.2x higher ROI
                compared to manual outreach.
              </p>
              <div className="mt-6 grid grid-cols-3 gap-4">
                {[
                  { stat: "89%", label: "Match accuracy" },
                  { stat: "< 2 min", label: "Time to first match" },
                  { stat: "12,000+", label: "Matches per day" },
                ].map((s) => (
                  <div key={s.label}>
                    <div className="text-2xl font-extrabold">{s.stat}</div>
                    <div className="text-xs text-white/60">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* PRICING */}
        {activeTab === "pricing" && (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900">Simple, Transparent Pricing</h2>
              <p className="mt-1 text-sm text-gray-500">Free for creators. Performance-based for brands.</p>
            </div>
            <div className="grid gap-5 sm:grid-cols-3">
              {PRICING.map((p) => (
                <div
                  key={p.tier}
                  className={`rounded-2xl border p-6 transition ${
                    p.accent
                      ? "border-rose-200 bg-gradient-to-b from-white to-rose-50 shadow-lg shadow-rose-100/50"
                      : "border-gray-100 bg-white"
                  }`}
                >
                  <div className="text-xs font-semibold uppercase tracking-wider text-gray-400">{p.tier}</div>
                  <div className="mt-2 flex items-baseline gap-1">
                    <span className="text-4xl font-extrabold text-gray-900">{p.price}</span>
                    {p.sub && <span className="text-sm text-gray-400">{p.sub}</span>}
                  </div>
                  <ul className="mt-6 space-y-3">
                    {p.features.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-sm text-gray-600">
                        <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-500" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <button
                    className={`mt-6 w-full rounded-xl py-2.5 text-sm font-semibold transition ${
                      p.accent
                        ? "bg-gray-900 text-white hover:bg-gray-800"
                        : "border border-gray-200 bg-white text-gray-700 hover:border-gray-300"
                    }`}
                  >
                    {p.cta}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="border-t border-gray-100 bg-white">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-6">
          <span className="text-xs text-gray-400">© 2026 ShopMy Pitch — Demo by Riley Young</span>
          <Link to="/" className="text-xs font-medium text-gray-400 hover:text-gray-600 transition">
            Back to Projects
          </Link>
        </div>
      </footer>
    </div>
  );
};

export default ShopMyPitch;
