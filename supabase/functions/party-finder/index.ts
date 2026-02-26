import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.97.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS")
    return new Response(null, { headers: corsHeaders });

  try {
    const { messages, userId } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    // Fetch current events from DB for context
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const { data: events } = await supabase
      .from("events")
      .select("id, title, description, date, time, location, category, is_online, max_attendees, cover_image")
      .gte("date", new Date().toISOString().split("T")[0])
      .order("date", { ascending: true })
      .limit(50);

    // If user is logged in, fetch their friends' registrations
    let friendContext = "";
    if (userId) {
      // Get people the user has messaged (as a proxy for "people you follow")
      const { data: connections } = await supabase
        .from("messages")
        .select("sender_id, recipient_id")
        .or(`sender_id.eq.${userId},recipient_id.eq.${userId}`)
        .limit(100);

      if (connections && connections.length > 0) {
        const friendIds = new Set<string>();
        connections.forEach((m: any) => {
          if (m.sender_id !== userId) friendIds.add(m.sender_id);
          if (m.recipient_id !== userId) friendIds.add(m.recipient_id);
        });

        if (friendIds.size > 0) {
          const { data: friendRegs } = await supabase
            .from("registrations")
            .select("event_id, user_id, profiles:user_id(full_name)")
            .in("user_id", Array.from(friendIds));

          if (friendRegs && friendRegs.length > 0) {
            friendContext = `\n\nPeople the user knows and the events they're attending:\n${JSON.stringify(friendRegs)}`;
          }
        }
      }
    }

    const eventList = events
      ? events
          .map(
            (e: any) =>
              `- "${e.title}" (ID: ${e.id}) | ${e.date} ${e.time} | ${e.is_online ? "Online" : e.location} | Category: ${e.category} | ${e.description}`
          )
          .join("\n")
      : "No upcoming events found.";

    const systemPrompt = `You are the Party4U AI concierge — a hype, fun, disco-vibes assistant that helps people find the perfect party, club night, or event. You also help people CREATE amazing event postings that attract guests. You speak with energy and enthusiasm but stay helpful and concise.

You have access to these upcoming events:
${eventList}
${friendContext}

Your job:
1. Ask the user about their vibe, location preference, or who they want to party with
2. Recommend matching events from the list above
3. When recommending events, ALWAYS include the event ID formatted as a clickable link: [Event Title](/event/EVENT_ID)
4. If no events match, suggest they create their own party
5. Be fun, use emojis sparingly (✨🎉🪩💃), and keep the disco energy alive
6. If the user asks about friends going, reference the friend attendance data if available

EVENT CREATION MODE:
When a user asks you to help create an event posting, help them craft an irresistible listing:
- Ask about the vibe (chill rooftop? wild warehouse? elegant cocktail?)
- Ask about date, time, location if not provided
- Generate a catchy event title and a compelling description that sells the atmosphere
- Once you've helped them craft the details, format the final event as:

---
**🎉 YOUR EVENT:**
- **Title:** [catchy title]
- **Description:** [vibey description]
- **Category:** [one of: Design, Technology, Networking, Wellness, Business, Nightlife, House Party, Festival, Other]
- **Date suggestion:** [if discussed]
- **Location suggestion:** [if discussed]

👉 [Create this event now!](/create-event)
---

Keep responses concise — 2-4 short paragraphs max. Always format event names as links.`;

    const response = await fetch(
      "https://ai.gateway.lovable.dev/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${LOVABLE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "google/gemini-3-flash-preview",
          messages: [{ role: "system", content: systemPrompt }, ...messages],
          stream: true,
        }),
      }
    );

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Too many requests — the dancefloor is full! Try again in a moment. 🪩" }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "AI credits exhausted. Please add more credits in Settings." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      const t = await response.text();
      console.error("AI gateway error:", response.status, t);
      return new Response(
        JSON.stringify({ error: "AI gateway error" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (e) {
    console.error("party-finder error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
