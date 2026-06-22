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
  Download,
  MessageCircle,
  ExternalLink,
  AlertCircle,
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

  const downloadBrandPitchDeck = () => {
    const slide = (content: string) =>
      `<div style="background:#fff;width:13.33in;height:7.5in;padding:60px 80px;box-sizing:border-box;page-break-after:always;position:relative;overflow:hidden">${content}</div>`;

    const badge = `<div style="display:inline-flex;align-items:center;gap:6px;background:linear-gradient(135deg,#f43f5e,#f97316);color:#fff;font-size:11px;font-weight:700;padding:4px 14px;border-radius:20px;letter-spacing:0.5px">★ ShopMy</div>`;

    const sectionTitle = (t: string) => `<h2 style="font-size:32px;font-weight:800;color:#111;margin:0 0 6px">${t}</h2>`;
    const subtitle = (t: string) => `<p style="font-size:15px;color:#888;margin:0 0 30px">${t}</p>`;

    const metricBox = (val: string, label: string) =>
      `<div style="background:#fafafa;border:1px solid #eee;border-radius:16px;padding:24px;text-align:center;flex:1"><div style="font-size:28px;font-weight:800;color:#111">${val}</div><div style="font-size:11px;color:#999;margin-top:4px;text-transform:uppercase;letter-spacing:1px">${label}</div></div>`;

    const barChart = MONTHLY_REVENUE.map(
      (m) =>
        `<div style="flex:1;display:flex;flex-direction:column;align-items:center;gap:4px"><div style="font-size:9px;font-weight:600;color:#666">$${m.revenue}M</div><div style="width:100%;height:${(m.revenue / maxRevenue) * 140}px;background:linear-gradient(to top,#f43f5e,#fb923c);border-radius:6px 6px 0 0"></div><div style="font-size:9px;color:#aaa">${m.month}</div></div>`
    ).join("");

    const creatorRows = TOP_CREATORS.map(
      (c) =>
        `<tr style="border-bottom:1px solid #f3f4f6"><td style="padding:12px 16px;font-weight:600;color:#111">${c.name}</td><td style="padding:12px 16px;color:#888">${c.handle}</td><td style="padding:12px 16px;color:#666">${c.niche}</td><td style="padding:12px 16px;color:#666">${c.followers}</td><td style="padding:12px 16px;font-weight:700;color:#059669">${c.earnings}</td></tr>`
    ).join("");

    const brandRows = BRANDS.map(
      (b) =>
        `<tr style="border-bottom:1px solid #f3f4f6"><td style="padding:12px 16px;font-weight:600;color:#111">${b.name}</td><td style="padding:12px 16px"><span style="background:#f3f4f6;padding:2px 10px;border-radius:12px;font-size:12px;color:#666">${b.category}</span></td><td style="padding:12px 16px;color:#666">${b.campaigns} campaigns</td><td style="padding:12px 16px;font-weight:700;color:#059669">${b.roi} ROI</td></tr>`
    ).join("");

    const caseStudies = [
      { brand: "Glossier", creator: "Ava Chen", spend: "$12,000", revenue: "$98,400", roi: "8.2x", desc: "Ava's 3-part skincare routine series drove 14,200 clicks and 2,840 conversions over 6 weeks. Her authentic review of Boy Brow became the #1 affiliate link on the platform for Q3." },
      { brand: "Allbirds", creator: "Jordan Blake", spend: "$8,500", revenue: "$52,700", roi: "6.2x", desc: "Jordan integrated Allbirds into his daily fitness content. The 'What I Wear to Train' series generated sustained organic traffic with a 4.1% conversion rate — 3x platform average." },
      { brand: "Mejuri", creator: "Sophie Kim", spend: "$15,000", revenue: "$166,500", roi: "11.1x", desc: "Sophie's curated jewelry collection storefront earned passive revenue for 9 months. Her Valentine's Day gift guide alone drove $42K in sales in a single weekend." },
    ];

    const caseStudySlides = caseStudies.map(
      (cs) => slide(`
        ${badge}
        <div style="margin-top:30px">
          ${sectionTitle(`Case Study: ${cs.brand} × ${cs.creator}`)}
          ${subtitle("Real campaign performance data")}
          <div style="display:flex;gap:16px;margin-bottom:30px">
            ${metricBox(cs.spend, "Brand Spend")}
            ${metricBox(cs.revenue, "Revenue Generated")}
            ${metricBox(cs.roi, "Return on Investment")}
          </div>
          <div style="background:#fafafa;border:1px solid #eee;border-radius:16px;padding:28px">
            <p style="font-size:14px;line-height:1.7;color:#555;margin:0">${cs.desc}</p>
          </div>
          <div style="position:absolute;bottom:50px;left:80px;right:80px;display:flex;justify-content:space-between;align-items:center">
            <span style="font-size:11px;color:#ccc">ShopMy Brand Pitch Deck — Confidential</span>
            <span style="font-size:11px;color:#ccc">shopmy.us</span>
          </div>
        </div>
      `)
    ).join("");

    const pages = [
      // Slide 1: Title
      slide(`
        <div style="display:flex;flex-direction:column;justify-content:center;height:100%;background:linear-gradient(135deg,#1e1b4b 0%,#4c1d95 50%,#7c3aed 100%);margin:-60px -80px;padding:80px;border-radius:0">
          <div style="display:inline-flex;align-items:center;gap:8px;margin-bottom:24px"><div style="width:48px;height:48px;border-radius:14px;background:linear-gradient(135deg,#f43f5e,#f97316);display:flex;align-items:center;justify-content:center;font-size:20px;color:#fff;font-weight:900">S</div><span style="font-size:24px;font-weight:800;color:#fff">ShopMy</span></div>
          <h1 style="font-size:52px;font-weight:900;color:#fff;margin:0;line-height:1.15">Why Your Brand<br/>Should Be on ShopMy</h1>
          <p style="font-size:18px;color:rgba(255,255,255,0.6);margin-top:16px;max-width:600px">The creator commerce platform powering $320M+ in GMV for 6,200+ brands. This is your growth channel.</p>
          <div style="position:absolute;bottom:60px;left:80px;font-size:12px;color:rgba(255,255,255,0.3)">Confidential — Prepared for Brand Partners — 2026</div>
        </div>
      `),

      // Slide 2: The Opportunity
      slide(`
        ${badge}
        <div style="margin-top:30px">
          ${sectionTitle("The $6.8B Opportunity")}
          ${subtitle("Creator commerce is the fastest-growing acquisition channel for DTC brands")}
          <div style="display:flex;gap:16px;margin-bottom:30px">
            ${metricBox("$6.8B", "Creator Economy TAM by 2028")}
            ${metricBox("72%", "Consumers Trust Creators Over Ads")}
            ${metricBox("3.2x", "Higher CVR vs Traditional Affiliate")}
            ${metricBox("47%", "YoY Growth in Creator-Driven Sales")}
          </div>
          <div style="background:#111;border-radius:16px;padding:28px;color:#fff">
            <p style="font-size:14px;line-height:1.7;margin:0;color:rgba(255,255,255,0.7)"><strong style="color:#fff">The shift is happening now.</strong> Consumers increasingly discover and purchase products through creators they trust — not ads. Brands that build authentic creator relationships today will own tomorrow's customer acquisition.</p>
          </div>
        </div>
      `),

      // Slide 3: Platform Growth
      slide(`
        ${badge}
        <div style="margin-top:30px">
          ${sectionTitle("Platform Growth — Monthly GMV")}
          ${subtitle("Consistent month-over-month growth across all verticals")}
          <div style="display:flex;align-items:flex-end;gap:8px;height:200px;margin-bottom:30px">${barChart}</div>
          <div style="display:flex;gap:16px">
            ${metricBox("48,000+", "Active Creators")}
            ${metricBox("6,200+", "Brand Partners")}
            ${metricBox("$320M+", "Total GMV")}
            ${metricBox("94%", "Creator Retention")}
          </div>
        </div>
      `),

      // Slide 4: Top Creators
      slide(`
        ${badge}
        <div style="margin-top:30px">
          ${sectionTitle("Top Creators Driving Brand Revenue")}
          ${subtitle("This month's highest-performing creators across all niches")}
          <table style="width:100%;border-collapse:collapse;background:#fff;border:1px solid #eee;border-radius:12px;overflow:hidden">
            <thead><tr style="background:#fafafa;border-bottom:2px solid #eee">
              <th style="padding:12px 16px;text-align:left;font-size:11px;text-transform:uppercase;letter-spacing:1px;color:#999">Creator</th>
              <th style="padding:12px 16px;text-align:left;font-size:11px;text-transform:uppercase;letter-spacing:1px;color:#999">Handle</th>
              <th style="padding:12px 16px;text-align:left;font-size:11px;text-transform:uppercase;letter-spacing:1px;color:#999">Niche</th>
              <th style="padding:12px 16px;text-align:left;font-size:11px;text-transform:uppercase;letter-spacing:1px;color:#999">Followers</th>
              <th style="padding:12px 16px;text-align:left;font-size:11px;text-transform:uppercase;letter-spacing:1px;color:#999">Monthly Earnings</th>
            </tr></thead>
            <tbody>${creatorRows}</tbody>
          </table>
          <p style="font-size:12px;color:#bbb;margin-top:16px;font-style:italic">*Earnings shown are creator commissions from affiliate links, storefronts, and brand partnerships combined.</p>
        </div>
      `),

      // Slide 5: Brand ROI
      slide(`
        ${badge}
        <div style="margin-top:30px">
          ${sectionTitle("Brand Partner Performance")}
          ${subtitle("Top brands and their return on creator partnerships")}
          <table style="width:100%;border-collapse:collapse;background:#fff;border:1px solid #eee;border-radius:12px;overflow:hidden">
            <thead><tr style="background:#fafafa;border-bottom:2px solid #eee">
              <th style="padding:12px 16px;text-align:left;font-size:11px;text-transform:uppercase;letter-spacing:1px;color:#999">Brand</th>
              <th style="padding:12px 16px;text-align:left;font-size:11px;text-transform:uppercase;letter-spacing:1px;color:#999">Category</th>
              <th style="padding:12px 16px;text-align:left;font-size:11px;text-transform:uppercase;letter-spacing:1px;color:#999">Activity</th>
              <th style="padding:12px 16px;text-align:left;font-size:11px;text-transform:uppercase;letter-spacing:1px;color:#999">ROI</th>
            </tr></thead>
            <tbody>${brandRows}</tbody>
          </table>
          <div style="display:flex;gap:16px;margin-top:24px">
            ${metricBox("8.6x", "Average Brand ROI")}
            ${metricBox("$4.20", "Avg Cost Per Acquisition")}
            ${metricBox("22 days", "Avg Time to First Sale")}
          </div>
        </div>
      `),

      // Slides 6-8: Case Studies
      caseStudySlides,

      // Slide 9: How It Works
      slide(`
        ${badge}
        <div style="margin-top:30px">
          ${sectionTitle("How It Works for Brands")}
          ${subtitle("Launch your first creator campaign in under 10 minutes")}
          <div style="display:flex;gap:20px">
            ${[
              { step: "1", title: "Create Your Brand Profile", desc: "Upload products, set commission rates, and define your ideal creator partnerships. Our AI indexes your catalog instantly." },
              { step: "2", title: "Discover & Match Creators", desc: "Our algorithm surfaces creators whose audience aligns with your target customer. Filter by niche, engagement rate, audience demographics, and past performance." },
              { step: "3", title: "Launch Campaigns", desc: "Choose affiliate, gifting, or paid collaboration. Send products, set budgets, and track everything from a single dashboard in real-time." },
              { step: "4", title: "Scale What Works", desc: "See full-funnel attribution from impression to sale. Double down on top performers. Our platform auto-optimizes commission structures for maximum ROI." },
            ].map((s) => `<div style="flex:1;background:#fafafa;border:1px solid #eee;border-radius:16px;padding:24px"><div style="width:36px;height:36px;border-radius:10px;background:linear-gradient(135deg,#f43f5e,#f97316);color:#fff;font-weight:800;font-size:16px;display:flex;align-items:center;justify-content:center;margin-bottom:14px">${s.step}</div><div style="font-size:15px;font-weight:700;color:#111;margin-bottom:8px">${s.title}</div><div style="font-size:12px;line-height:1.6;color:#777">${s.desc}</div></div>`).join("")}
          </div>
        </div>
      `),

      // Slide 10: CTA
      slide(`
        <div style="display:flex;flex-direction:column;justify-content:center;align-items:center;height:100%;text-align:center;background:linear-gradient(135deg,#1e1b4b 0%,#4c1d95 50%,#7c3aed 100%);margin:-60px -80px;padding:80px;border-radius:0">
          <div style="display:inline-flex;align-items:center;gap:8px;margin-bottom:32px"><div style="width:56px;height:56px;border-radius:16px;background:linear-gradient(135deg,#f43f5e,#f97316);display:flex;align-items:center;justify-content:center;font-size:24px;color:#fff;font-weight:900">S</div></div>
          <h1 style="font-size:48px;font-weight:900;color:#fff;margin:0">Ready to grow with creators?</h1>
          <p style="font-size:18px;color:rgba(255,255,255,0.5);margin-top:16px;max-width:500px">Join 6,200+ brands already using ShopMy to drive authentic, high-converting revenue through creator partnerships.</p>
          <div style="margin-top:32px;display:flex;gap:12px">
            <div style="background:#fff;color:#111;padding:14px 32px;border-radius:14px;font-size:15px;font-weight:700">Get Started — It's Free to List</div>
            <div style="border:2px solid rgba(255,255,255,0.3);color:#fff;padding:14px 32px;border-radius:14px;font-size:15px;font-weight:700">Talk to Sales</div>
          </div>
          <div style="position:absolute;bottom:50px;font-size:12px;color:rgba(255,255,255,0.2)">shopmy.us — Confidential Brand Pitch Deck — 2026</div>
        </div>
      `),
    ].join("");

    const doc = `<!DOCTYPE html><html><head><meta charset="utf-8"><title>ShopMy Brand Pitch Deck</title><style>@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');@page{size:13.33in 7.5in landscape;margin:0}*{font-family:'Inter',sans-serif;box-sizing:border-box;margin:0;padding:0}body{margin:0;padding:0}@media print{body{padding:0}}</style></head><body>${pages}</body></html>`;

    const w = window.open("", "_blank");
    if (!w) return;
    w.document.write(doc);
    w.document.close();
    setTimeout(() => w.print(), 500);
  };

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
            <div className="mt-8 flex flex-wrap gap-3">
              <button className="inline-flex items-center gap-2 rounded-xl bg-gray-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-gray-800">
                Get Started <ArrowRight className="h-4 w-4" />
              </button>
              <button className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-5 py-3 text-sm font-semibold text-gray-700 transition hover:border-gray-300 hover:shadow-sm">
                See Demo
              </button>
              <button
                onClick={downloadBrandPitchDeck}
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-rose-500 to-orange-400 px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90 shadow-lg shadow-rose-200/50"
              >
                <Download className="h-4 w-4" />
                Download Brand Pitch Deck
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

      {/* AUTO-LINK Feature Showcase */}
      <div className="relative overflow-hidden bg-gradient-to-br from-rose-500 via-pink-500 to-orange-400 py-16">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.15),transparent_60%)]" />
        <div className="mx-auto max-w-5xl px-6 relative">
          <div className="flex items-center gap-3 mb-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/20 backdrop-blur-sm px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-white">
              <Zap className="h-3 w-3" /> New Feature
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Auto-Link
          </h2>
          <p className="mt-3 max-w-xl text-base text-white/80 leading-relaxed">
            Your followers are asking for product links you haven't shared yet. Auto-Link detects repeated
            questions in your comments and suggests shoppable links — so you never miss revenue hiding in plain sight.
          </p>

          {/* Mock comment feed */}
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {/* Left: Detected Comments */}
            <div className="rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 p-6">
              <div className="flex items-center gap-2 mb-5">
                <MessageCircle className="h-4 w-4 text-white" />
                <span className="text-sm font-bold text-white uppercase tracking-wider">Detected Comments</span>
              </div>
              <div className="space-y-3">
                {[
                  { q: "what lip combo is this?? 😍", count: 847, time: "last 48h" },
                  { q: "NEED this lip combo pls link!!", count: 612, time: "last 48h" },
                  { q: "lip combo??? someone help", count: 394, time: "last 72h" },
                  { q: "what shade is this omg", count: 281, time: "last 24h" },
                  { q: "drop the lip link sis 🙏", count: 203, time: "last 24h" },
                ].map((c, i) => (
                  <div key={i} className="flex items-center justify-between rounded-xl bg-white/10 px-4 py-3">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-white truncate">"{c.q}"</p>
                      <p className="text-[11px] text-white/50 mt-0.5">{c.time}</p>
                    </div>
                    <div className="flex items-center gap-1.5 ml-3 shrink-0">
                      <AlertCircle className="h-3 w-3 text-amber-300" />
                      <span className="text-sm font-extrabold text-white">{c.count.toLocaleString()}×</span>
                    </div>
                  </div>
                ))}
                <div className="pt-2 text-center">
                  <span className="text-xs font-semibold text-white/40 uppercase tracking-wider">2,337 total unlinked requests</span>
                </div>
              </div>
            </div>

            {/* Right: Suggested Link */}
            <div className="flex flex-col gap-4">
              <div className="rounded-2xl bg-white p-6 shadow-2xl shadow-rose-900/20 flex-1">
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-rose-500 to-orange-400">
                    <Link2 className="h-3.5 w-3.5 text-white" />
                  </div>
                  <span className="text-sm font-bold text-gray-900 uppercase tracking-wider">Suggested Link</span>
                </div>

                <div className="rounded-xl border border-gray-100 bg-gray-50 p-4 mb-4">
                  <div className="flex items-start gap-3">
                    <div className="h-14 w-14 rounded-lg bg-gradient-to-br from-pink-100 to-rose-200 flex items-center justify-center text-lg shrink-0">💋</div>
                    <div>
                      <p className="text-sm font-bold text-gray-900">Charlotte Tilbury Pillow Talk Lip Kit</p>
                      <p className="text-xs text-gray-500 mt-0.5">Lip Liner + Lipstick + Gloss</p>
                      <p className="text-xs font-bold text-emerald-600 mt-1">$12.40 commission per sale</p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3 mb-4">
                  <div className="rounded-lg bg-rose-50 p-3 text-center">
                    <div className="text-lg font-extrabold text-rose-600">$10.5K</div>
                    <div className="text-[10px] font-medium text-rose-400 uppercase tracking-wider">Est. Revenue</div>
                  </div>
                  <div className="rounded-lg bg-amber-50 p-3 text-center">
                    <div className="text-lg font-extrabold text-amber-600">847</div>
                    <div className="text-[10px] font-medium text-amber-400 uppercase tracking-wider">Requests</div>
                  </div>
                  <div className="rounded-lg bg-emerald-50 p-3 text-center">
                    <div className="text-lg font-extrabold text-emerald-600">18.2%</div>
                    <div className="text-[10px] font-medium text-emerald-400 uppercase tracking-wider">Est. CVR</div>
                  </div>
                </div>

                <button className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-rose-500 to-orange-400 px-5 py-3 text-sm font-bold text-white transition hover:opacity-90 shadow-lg shadow-rose-200/50">
                  <ExternalLink className="h-4 w-4" />
                  Create Auto-Link Now
                </button>
              </div>

              <div className="rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 p-5">
                <p className="text-sm text-white/90 leading-relaxed">
                  <span className="font-bold text-white">You're leaving $10,500+ on the table.</span>{" "}
                  Auto-Link detects what your audience is begging for and generates commission-earning links instantly. No more scrolling through comments.
                </p>
              </div>
            </div>
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
