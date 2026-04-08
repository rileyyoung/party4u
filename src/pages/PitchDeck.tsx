import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { Send, Sparkles, Presentation, BarChart3, Download, FileText } from "lucide-react";
import PptxGenJS from "pptxgenjs";

type Msg = { role: "user" | "assistant"; content: string };

// Revenue tracker data that the AI agent has access to
const REVENUE_DATA = {
  totalSubscribers: 1247,
  totalRevenue: 48920,
  mrr: 40114,
  todaySignups: 34,
  plans: [
    { name: "Starter", price: 9, subscribers: 412 },
    { name: "Pro", price: 29, subscribers: 498 },
    { name: "Business", price: 79, subscribers: 267 },
    { name: "Enterprise", price: 199, subscribers: 70 },
  ],
  growthRate: "18% MoM",
  churnRate: "3.2%",
  arpu: 39.23,
  ltv: 1226,
  cac: 42,
  runway: "24 months",
};

const quickPrompts = [
  "📊 Create a full investor pitch deck",
  "💰 Build a revenue & metrics slide",
  "📈 Show our growth trajectory",
  "🎯 Summarize our market opportunity",
  "🧮 Break down unit economics",
  "🚀 Write an executive summary slide",
];

// Smart demo responses that generate pitch deck slides from revenue data
const generateResponse = (prompt: string): string => {
  const p = prompt.toLowerCase();
  const d = REVENUE_DATA;

  if (p.includes("full") || p.includes("investor") || p.includes("pitch deck") || p.includes("entire")) {
    return `# 📊 Investor Pitch Deck

---

## Slide 1: Title
# [Your Company Name]
### Scaling SaaS Revenue with Proven Unit Economics
*Seed Round — ${new Date().getFullYear()}*

---

## Slide 2: Problem
- Businesses struggle with [problem area]
- Current solutions are fragmented and expensive
- **$4.2B** addressable market growing **22% YoY**

---

## Slide 3: Solution
- All-in-one platform that simplifies [solution]
- 4 pricing tiers from $${d.plans[0].price} to $${d.plans[3].price}/mo
- Self-serve onboarding with <5 min time-to-value

---

## Slide 4: Traction & Revenue
| Metric | Value |
|--------|-------|
| Total Subscribers | **${d.totalSubscribers.toLocaleString()}** |
| Monthly Revenue | **$${d.totalRevenue.toLocaleString()}** |
| MRR | **$${d.mrr.toLocaleString()}** |
| Growth Rate | **${d.growthRate}** |
| Today's Signups | **+${d.todaySignups}** |

---

## Slide 5: Unit Economics
| Metric | Value |
|--------|-------|
| ARPU | **$${d.arpu}** |
| LTV | **$${d.ltv.toLocaleString()}** |
| CAC | **$${d.cac}** |
| LTV:CAC | **${(d.ltv / d.cac).toFixed(1)}x** |
| Churn | **${d.churnRate}** |

---

## Slide 6: Plan Distribution
${d.plans.map((pl) => `- **${pl.name}** ($${pl.price}/mo): ${pl.subscribers} subscribers — $${(pl.price * pl.subscribers).toLocaleString()}/mo`).join("\n")}

---

## Slide 7: The Ask
- Raising **$2M Seed**
- 18 months runway to Series A
- Key milestones: 5,000 subscribers, $150K MRR

---

*Generated from live Revenue Tracker data. [View Revenue Tracker →](/revenuetracker)*`;
  }

  if (p.includes("revenue") || p.includes("metric") || p.includes("number")) {
    return `# 💰 Revenue & Metrics

| Metric | Current |
|--------|---------|
| Total Subscribers | **${d.totalSubscribers.toLocaleString()}** |
| Total Revenue | **$${d.totalRevenue.toLocaleString()}** |
| MRR | **$${d.mrr.toLocaleString()}** |
| ARPU | **$${d.arpu}** |
| Growth | **${d.growthRate}** |
| Churn | **${d.churnRate}** |

### Revenue by Plan
${d.plans.map((pl) => `- **${pl.name}** ($${pl.price}/mo): ${pl.subscribers} subs → **$${(pl.price * pl.subscribers).toLocaleString()}/mo**`).join("\n")}

### Key Insight
> Our Pro tier ($${d.plans[1].price}/mo) drives the most revenue with ${d.plans[1].subscribers} subscribers, representing **${Math.round((d.plans[1].subscribers / d.totalSubscribers) * 100)}%** of our customer base.

*Pulled from [Revenue Tracker →](/revenuetracker)*`;
  }

  if (p.includes("growth") || p.includes("trajectory") || p.includes("trend")) {
    return `# 📈 Growth Trajectory

### Current Pace
- **${d.growthRate}** subscriber growth
- **+${d.todaySignups}** new signups today
- Churn at **${d.churnRate}** (below industry avg of 5-7%)

### Projected Milestones
| Timeline | Subscribers | MRR |
|----------|-------------|-----|
| Now | ${d.totalSubscribers.toLocaleString()} | $${d.mrr.toLocaleString()} |
| +3 months | ~${Math.round(d.totalSubscribers * 1.6).toLocaleString()} | ~$${Math.round(d.mrr * 1.6).toLocaleString()} |
| +6 months | ~${Math.round(d.totalSubscribers * 2.6).toLocaleString()} | ~$${Math.round(d.mrr * 2.6).toLocaleString()} |
| +12 months | ~${Math.round(d.totalSubscribers * 6.5).toLocaleString()} | ~$${Math.round(d.mrr * 6.5).toLocaleString()} |

### Net Revenue Retention
> With ${d.growthRate} growth and ${d.churnRate} churn, our **NRR is ~115%** — customers expand over time.

*Data from [Revenue Tracker →](/revenuetracker)*`;
  }

  if (p.includes("market") || p.includes("opportunity") || p.includes("tam")) {
    return `# 🎯 Market Opportunity

### Total Addressable Market
- **$4.2B** global market in ${new Date().getFullYear()}
- Growing at **22% CAGR**
- Shifting from legacy tools to modern SaaS

### Our Position
- **${d.totalSubscribers.toLocaleString()}** paying customers acquired
- **$${d.arpu} ARPU** with room to expand
- **${d.growthRate}** organic growth

### Competitive Advantage
1. Lower CAC ($${d.cac}) vs industry avg ($85-120)
2. Superior LTV:CAC ratio of **${(d.ltv / d.cac).toFixed(1)}x**
3. Self-serve model with high retention (${(100 - parseFloat(d.churnRate)).toFixed(1)}%)

### Penetration
> We've captured **~0.03%** of the TAM — massive room for growth.`;
  }

  if (p.includes("unit economics") || p.includes("unit econ") || p.includes("economics")) {
    return `# 🧮 Unit Economics

| Metric | Value | Benchmark |
|--------|-------|-----------|
| **ARPU** | $${d.arpu} | — |
| **LTV** | $${d.ltv.toLocaleString()} | — |
| **CAC** | $${d.cac} | $85-120 |
| **LTV:CAC** | ${(d.ltv / d.cac).toFixed(1)}x | >3x is great |
| **Churn** | ${d.churnRate} | 5-7% avg |
| **Payback** | ${(d.cac / d.arpu).toFixed(1)} months | <12mo is ideal |

### Why This Matters
> A **${(d.ltv / d.cac).toFixed(1)}x LTV:CAC** means every $1 spent on acquisition returns **$${(d.ltv / d.cac).toFixed(2)}** in lifetime value. With a **${(d.cac / d.arpu).toFixed(1)}-month payback**, we recover CAC rapidly.

### Margin Profile
- Gross margin: ~**82%** (pure SaaS)
- Net margin improving as scale increases
- Runway: **${d.runway}** at current burn

*Sourced from [Revenue Tracker →](/revenuetracker)*`;
  }

  if (p.includes("executive") || p.includes("summary") || p.includes("overview")) {
    return `# 🚀 Executive Summary

### The Opportunity
We're building the modern platform for [industry]. In ${new Date().getFullYear()}, the market is **$4.2B** and growing **22% annually**.

### Traction
- **${d.totalSubscribers.toLocaleString()}** paying subscribers
- **$${d.mrr.toLocaleString()} MRR** growing at **${d.growthRate}**
- **${(d.ltv / d.cac).toFixed(1)}x** LTV:CAC ratio

### Business Model
| Plan | Price | Subscribers |
|------|-------|-------------|
${d.plans.map((pl) => `| ${pl.name} | $${pl.price}/mo | ${pl.subscribers} |`).join("\n")}

### The Ask
Raising **$2M Seed** to scale go-to-market and hit **$150K MRR** in 12 months.

*Real-time data from [Revenue Tracker →](/revenuetracker)*`;
  }

  // Default response
  return `# 📋 Pitch Deck Assistant

I can help you create pitch deck slides using your live revenue data. Here's what I have access to:

### Your Current Metrics
- **${d.totalSubscribers.toLocaleString()}** total subscribers
- **$${d.totalRevenue.toLocaleString()}** total revenue
- **$${d.mrr.toLocaleString()}** MRR
- **${d.growthRate}** growth rate

### Try asking me to:
- "Create a full investor pitch deck"
- "Build a revenue & metrics slide"
- "Show our growth trajectory"
- "Break down unit economics"
- "Write an executive summary"
- "Summarize our market opportunity"

All slides pull real-time data from your [Revenue Tracker →](/revenuetracker).`;
};

const PitchDeck = () => {
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  const sendMessage = async (text: string) => {
    if (!text.trim() || isLoading) return;

    const userMsg: Msg = { role: "user", content: text.trim() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);

    // Simulate typing delay then generate response
    await new Promise((r) => setTimeout(r, 800 + Math.random() * 1200));

    const response = generateResponse(text);
    // Simulate streaming by adding characters progressively
    let soFar = "";
    const chars = response.split("");
    const chunkSize = 8;

    for (let i = 0; i < chars.length; i += chunkSize) {
      soFar += chars.slice(i, i + chunkSize).join("");
      const snapshot = soFar;
      setMessages((prev) => {
        const last = prev[prev.length - 1];
        if (last?.role === "assistant") {
          return prev.map((m, idx) => (idx === prev.length - 1 ? { ...m, content: snapshot } : m));
        }
        return [...prev, { role: "assistant", content: snapshot }];
      });
      await new Promise((r) => setTimeout(r, 10));
    }

    setIsLoading(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  const downloadPDF = (content: string) => {
    const html = content
      .split(/\n---\n/)
      .filter((s) => s.trim())
      .map((slide) => {
        const lines = slide
          .split("\n")
          .map((l) => {
            const t = l.trim();
            if (!t) return "";
            if (/^#{1,2}\s/.test(t)) return `<h2 style="color:#fff;margin:0 0 8px">${t.replace(/^#+\s*/, "").replace(/\*+/g, "")}</h2>`;
            if (/^###\s/.test(t)) return `<h3 style="color:#c084fc;margin:0 0 6px">${t.replace(/^###\s*/, "").replace(/\*+/g, "")}</h3>`;
            if (t.startsWith("|") && !t.match(/^\|[-\s|]+\|$/)) {
              const cells = t.split("|").filter((c) => c.trim()).map((c) => c.trim().replace(/\*+/g, ""));
              return `<p style="color:#d8b4fe;margin:2px 0;font-size:13px">${cells.join(" &nbsp;|&nbsp; ")}</p>`;
            }
            if (t.startsWith("- ") || t.startsWith("* ")) return `<p style="color:#e9d5ff;margin:2px 0 2px 16px">• ${t.replace(/^[-*]\s*/, "").replace(/\*+/g, "")}</p>`;
            if (/^\d+\.\s/.test(t)) return `<p style="color:#e9d5ff;margin:2px 0 2px 16px">${t.replace(/\*+/g, "")}</p>`;
            if (t.startsWith(">")) return `<blockquote style="color:#c084fc;margin:6px 0 6px 16px;font-style:italic;border-left:3px solid #a78bfa;padding-left:10px">${t.replace(/^>\s*/, "").replace(/\*+/g, "")}</blockquote>`;
            if (t.startsWith("*") && t.endsWith("*")) return `<p style="color:#9ca3af;font-size:11px;font-style:italic;margin:4px 0">${t.replace(/^\*+|\*+$/g, "")}</p>`;
            return `<p style="color:#e9d5ff;margin:2px 0">${t.replace(/\*+/g, "")}</p>`;
          })
          .join("");
        return `<div style="background:#1e1b4b;padding:40px;margin-bottom:20px;border-radius:12px;page-break-after:always">${lines}</div>`;
      })
      .join("");

    const doc = `<!DOCTYPE html><html><head><meta charset="utf-8"><title>Pitch Deck</title><style>@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&display=swap');*{font-family:'Space Grotesk',sans-serif;box-sizing:border-box}body{margin:0;padding:20px;background:#0f0d2e}@media print{body{padding:0;background:#fff}div{box-shadow:none!important}}</style></head><body>${html}</body></html>`;

    const w = window.open("", "_blank");
    if (!w) return;
    w.document.write(doc);
    w.document.close();
    setTimeout(() => w.print(), 400);
  };

  const downloadPPT = (content: string) => {
    const pptx = new PptxGenJS();
    pptx.layout = "LAYOUT_WIDE";
    pptx.author = "Pitch Deck AI";
    pptx.title = "Pitch Deck";

    // Parse markdown into slides split by ---
    const rawSlides = content.split(/\n---\n/).filter((s) => s.trim());

    for (const raw of rawSlides) {
      const slide = pptx.addSlide();
      slide.background = { color: "1E1B4B" };

      const lines = raw.split("\n").filter((l) => l.trim());
      let yPos = 0.4;

      for (const line of lines) {
        const trimmed = line.trim();
        if (!trimmed) continue;

        // Title (# heading)
        if (/^#{1,2}\s/.test(trimmed)) {
          const text = trimmed.replace(/^#+\s*/, "").replace(/\*+/g, "");
          slide.addText(text, {
            x: 0.6, y: yPos, w: "90%",
            fontSize: trimmed.startsWith("## ") ? 22 : 28,
            bold: true, color: "FFFFFF",
            fontFace: "Space Grotesk",
          });
          yPos += trimmed.startsWith("## ") ? 0.55 : 0.7;
          continue;
        }

        // H3 (### heading)
        if (/^###\s/.test(trimmed)) {
          const text = trimmed.replace(/^###\s*/, "").replace(/\*+/g, "");
          slide.addText(text, {
            x: 0.6, y: yPos, w: "90%",
            fontSize: 18, bold: true, color: "C084FC",
            fontFace: "Space Grotesk",
          });
          yPos += 0.45;
          continue;
        }

        // Table row
        if (trimmed.startsWith("|") && !trimmed.match(/^\|[-\s|]+\|$/)) {
          const cells = trimmed.split("|").filter((c) => c.trim()).map((c) => c.trim().replace(/\*+/g, ""));
          if (cells.length >= 2) {
            const isHeader = lines.indexOf(line) === lines.findIndex((l) => l.trim().startsWith("|"));
            slide.addText(
              cells.map((c) => c).join("   |   "),
              {
                x: 0.6, y: yPos, w: "90%",
                fontSize: isHeader ? 13 : 12,
                bold: isHeader, color: isHeader ? "FFFFFF" : "D8B4FE",
                fontFace: "Space Grotesk",
              }
            );
            yPos += 0.35;
          }
          continue;
        }

        // Bullet point
        if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
          const text = trimmed.replace(/^[-*]\s*/, "").replace(/\*+/g, "");
          slide.addText(text, {
            x: 0.8, y: yPos, w: "85%",
            fontSize: 14, color: "E9D5FF",
            fontFace: "Space Grotesk",
            bullet: { code: "2022", color: "A78BFA" },
          });
          yPos += 0.38;
          continue;
        }

        // Numbered list
        if (/^\d+\.\s/.test(trimmed)) {
          const text = trimmed.replace(/^\d+\.\s*/, "").replace(/\*+/g, "");
          slide.addText(text, {
            x: 0.8, y: yPos, w: "85%",
            fontSize: 14, color: "E9D5FF",
            fontFace: "Space Grotesk",
            bullet: { type: "number", color: "A78BFA" },
          });
          yPos += 0.38;
          continue;
        }

        // Blockquote
        if (trimmed.startsWith(">")) {
          const text = trimmed.replace(/^>\s*/, "").replace(/\*+/g, "");
          slide.addText(text, {
            x: 0.8, y: yPos, w: "85%",
            fontSize: 13, italic: true, color: "C084FC",
            fontFace: "Space Grotesk",
          });
          yPos += 0.4;
          continue;
        }

        // Italic footnote
        if (trimmed.startsWith("*") && trimmed.endsWith("*")) {
          const text = trimmed.replace(/^\*+|\*+$/g, "");
          slide.addText(text, {
            x: 0.6, y: yPos, w: "90%",
            fontSize: 10, italic: true, color: "9CA3AF",
            fontFace: "Space Grotesk",
          });
          yPos += 0.3;
          continue;
        }

        // Regular text
        slide.addText(trimmed.replace(/\*+/g, ""), {
          x: 0.6, y: yPos, w: "90%",
          fontSize: 14, color: "E9D5FF",
          fontFace: "Space Grotesk",
        });
        yPos += 0.35;
      }
    }

    pptx.writeFile({ fileName: `pitch-deck-${new Date().toISOString().slice(0, 10)}.pptx` });
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#1e1b4b]">
      {/* Header */}
      <header className="border-b border-white/10 px-6 py-4">
        <div className="mx-auto flex max-w-4xl items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-purple-400 to-pink-400">
              <Presentation className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="font-display text-xl font-bold text-white">Pitch Deck AI</h1>
              <p className="text-xs text-white/50">Powered by your Revenue Tracker data</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Link
              to="/revenuetracker"
              className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-white/70 transition hover:bg-white/10"
            >
              <BarChart3 className="h-3.5 w-3.5" />
              Revenue Tracker
            </Link>
            <Link to="/" className="text-sm font-bold text-white/60 hover:text-white transition">
              Home
            </Link>
          </div>
        </div>
      </header>

      <div className="mx-auto flex w-full max-w-4xl flex-1 flex-col px-4 py-6">
        {/* Welcome + Quick Prompts */}
        {messages.length === 0 && (
          <div className="flex flex-1 flex-col items-center justify-center pb-20">
            <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-400 to-pink-400 shadow-lg shadow-purple-500/30">
              <Sparkles className="h-10 w-10 text-white" />
            </div>
            <h2 className="font-display text-3xl font-extrabold text-white">Create Your Pitch Deck</h2>
            <p className="mt-2 text-center text-sm text-white/50 max-w-md">
              I'll generate investor-ready slides using real data from your Revenue Tracker.
              Ask me for a full deck or specific slides.
            </p>
            <div className="mt-8 grid grid-cols-2 gap-3 w-full max-w-lg">
              {quickPrompts.map((prompt) => (
                <button
                  key={prompt}
                  onClick={() => sendMessage(prompt)}
                  className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-left text-sm text-white/80 transition-all hover:bg-white/10 hover:border-white/20 hover:text-white"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Messages */}
        {messages.length > 0 && (
          <div ref={scrollRef} className="flex-1 space-y-4 overflow-y-auto pb-4">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-5 py-3 ${
                    msg.role === "user"
                      ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white"
                      : "border border-white/10 bg-white/5 text-white"
                  }`}
                >
                  {msg.role === "assistant" ? (
                    <>
                      <div className="prose prose-sm prose-invert max-w-none [&_table]:text-white/90 [&_th]:text-white [&_td]:text-white/80 [&_th]:border-white/20 [&_td]:border-white/10 [&_hr]:border-white/10 [&_a]:text-purple-300 [&_a]:underline [&_blockquote]:text-white/70 [&_blockquote]:border-purple-400/50 [&_h1]:text-white [&_h2]:text-white [&_h3]:text-white [&_strong]:text-white [&_li]:text-white/80">
                        <ReactMarkdown
                          components={{
                            a: ({ href, children, ...props }) => {
                              if (href?.startsWith("/")) {
                                return (
                                  <Link to={href} className="text-purple-300 hover:text-purple-200 underline" {...props}>
                                    {children}
                                  </Link>
                                );
                              }
                              return <a href={href} target="_blank" rel="noopener noreferrer" {...props}>{children}</a>;
                            },
                          }}
                        >
                          {msg.content}
                        </ReactMarkdown>
                      </div>
                      {!isLoading && (
                        <div className="mt-3 flex gap-2 border-t border-white/10 pt-3">
                          <button
                            onClick={() => downloadPDF(msg.content)}
                            className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-white/70 transition hover:bg-white/10"
                          >
                            <FileText className="h-3.5 w-3.5" />
                            Save as PDF
                          </button>
                          <button
                            onClick={() => downloadPPT(msg.content)}
                            className="flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 px-3 py-1.5 text-xs font-bold text-white transition hover:opacity-90"
                          >
                            <Download className="h-3.5 w-3.5" />
                            Download PPT
                          </button>
                        </div>
                      )}
                    </>
                  ) : (
                    <p className="text-sm">{msg.content}</p>
                  )}
                </div>
              </div>
            ))}

            {isLoading && messages[messages.length - 1]?.role === "user" && (
              <div className="flex justify-start">
                <div className="rounded-2xl border border-white/10 bg-white/5 px-5 py-3">
                  <div className="flex gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-purple-400 animate-pulse" />
                    <span className="h-2 w-2 rounded-full bg-purple-400 animate-pulse" style={{ animationDelay: "150ms" }} />
                    <span className="h-2 w-2 rounded-full bg-purple-400 animate-pulse" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Input */}
        <form onSubmit={handleSubmit} className="mt-4">
          <div className="flex gap-3 rounded-2xl border border-white/10 bg-white/5 p-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Describe the pitch deck slide you need..."
              className="flex-1 bg-transparent px-3 text-sm text-white placeholder-white/30 outline-none"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white transition-opacity disabled:opacity-30"
            >
              <Send className="h-4 w-4" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PitchDeck;
