import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Calendar, MapPin, Globe, MessageCircle, Repeat2, Heart, Share, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "@/hooks/use-toast";

interface EventPostProps {
  event: {
    id: string;
    title: string;
    description: string;
    date: string;
    time: string;
    location: string;
    category: string;
    is_online: boolean;
    cover_image: string | null;
    max_attendees: number;
    organizer_id: string;
    created_at: string;
  };
  index: number;
}

const EventPost = ({ event, index }: EventPostProps) => {
  const { user } = useAuth();
  const [organizer, setOrganizer] = useState<{ full_name: string; avatar_url: string | null; id: string } | null>(null);
  const [commentCount, setCommentCount] = useState(0);
  const [attendeeCount, setAttendeeCount] = useState(0);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [shared, setShared] = useState(false);

  useEffect(() => {
    const fetchMeta = async () => {
      const [orgRes, commentRes, attendeeRes] = await Promise.all([
        supabase.from("profiles").select("full_name, avatar_url, id").eq("id", event.organizer_id).single(),
        supabase.from("comments").select("id", { count: "exact", head: true }).eq("event_id", event.id),
        supabase.rpc("get_event_attendee_count", { event_uuid: event.id }),
      ]);
      if (orgRes.data) setOrganizer(orgRes.data);
      setCommentCount(commentRes.count || 0);
      setAttendeeCount(attendeeRes.data || 0);
      // Fake like count based on attendees for now
      setLikeCount(Math.max(0, (attendeeRes.data || 0) + Math.floor(Math.random() * 5)));
    };
    fetchMeta();
  }, [event.id, event.organizer_id]);

  const dateObj = new Date(event.date + "T00:00:00");
  const formattedDate = dateObj.toLocaleDateString("en-US", { month: "short", day: "numeric" });

  const timeAgo = () => {
    const diff = Date.now() - new Date(event.created_at).getTime();
    const hrs = Math.floor(diff / 3600000);
    if (hrs < 1) return "just now";
    if (hrs < 24) return `${hrs}h`;
    const days = Math.floor(hrs / 24);
    if (days < 7) return `${days}d`;
    return formattedDate;
  };

  const handleLike = () => {
    setLiked(!liked);
    setLikeCount((c) => liked ? c - 1 : c + 1);
  };

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(`${window.location.origin}/event/${event.id}`);
      setShared(true);
      toast({ title: "Link copied! 🔗", description: "Share the party vibes" });
      setTimeout(() => setShared(false), 2000);
    } catch {
      toast({ title: "Couldn't copy link", variant: "destructive" });
    }
  };

  return (
    <article
      className="animate-fade-in border-b border-border bg-card/50 backdrop-blur-sm transition-colors hover:bg-card/80"
      style={{ animationDelay: `${index * 60}ms` }}
    >
      <div className="px-4 pt-4 pb-2 sm:px-6">
        {/* Author header */}
        <div className="flex items-start gap-3">
          <Link to={organizer ? `/profile/${organizer.id}` : "#"}>
            <Avatar className="h-10 w-10 ring-2 ring-primary/20">
              <AvatarImage src={organizer?.avatar_url || undefined} />
              <AvatarFallback className="bg-secondary text-xs font-bold">
                {organizer?.full_name?.[0] || "?"}
              </AvatarFallback>
            </Avatar>
          </Link>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <Link
                to={organizer ? `/profile/${organizer.id}` : "#"}
                className="font-display text-sm font-semibold hover:text-primary transition-colors truncate"
              >
                {organizer?.full_name || "Loading..."}
              </Link>
              <span className="text-xs text-muted-foreground">· {timeAgo()}</span>
            </div>
            <p className="text-xs text-muted-foreground">is hosting a party 🪩</p>
          </div>
          <Badge variant="outline" className="text-[10px] shrink-0">{event.category}</Badge>
        </div>

        {/* Event content */}
        <div className="mt-3 ml-[52px]">
          <Link to={`/event/${event.id}`} className="group">
            <h3 className="font-display text-lg font-bold leading-snug tracking-tight group-hover:text-primary transition-colors">
              {event.title}
            </h3>
            <p className="mt-1 text-sm text-muted-foreground line-clamp-3 leading-relaxed">
              {event.description}
            </p>
          </Link>

          {/* Event info pills */}
          <div className="mt-3 flex flex-wrap gap-2">
            <span className="inline-flex items-center gap-1 rounded-full bg-secondary/80 px-2.5 py-1 text-xs text-secondary-foreground">
              <Calendar className="h-3 w-3 text-primary" />
              {formattedDate} · {event.time}
            </span>
            <span className="inline-flex items-center gap-1 rounded-full bg-secondary/80 px-2.5 py-1 text-xs text-secondary-foreground">
              {event.is_online ? <Globe className="h-3 w-3 text-primary" /> : <MapPin className="h-3 w-3 text-primary" />}
              {event.is_online ? "Online" : event.location.split(",")[0]}
            </span>
            <span className="inline-flex items-center gap-1 rounded-full bg-secondary/80 px-2.5 py-1 text-xs text-secondary-foreground">
              <Users className="h-3 w-3 text-primary" />
              {attendeeCount} going
            </span>
          </div>
        </div>
      </div>

      {/* Cover image */}
      {event.cover_image && (
        <Link to={`/event/${event.id}`} className="mt-3 block ml-[52px] mr-4 sm:mr-6">
          <div className="overflow-hidden rounded-xl border border-border">
            <img
              src={event.cover_image}
              alt={event.title}
              className="h-52 w-full object-cover transition-transform duration-500 hover:scale-105"
            />
          </div>
        </Link>
      )}

      {/* Engagement bar */}
      <div className="ml-[52px] mr-4 sm:mr-6 mt-2 mb-1 flex items-center justify-between border-t border-border/50 pt-2 pb-3">
        <Link to={`/event/${event.id}`}>
          <Button variant="ghost" size="sm" className="gap-1.5 text-muted-foreground hover:text-primary h-8 px-3">
            <MessageCircle className="h-4 w-4" />
            <span className="text-xs">{commentCount || ""}</span>
          </Button>
        </Link>
        <Button
          variant="ghost"
          size="sm"
          className={`gap-1.5 h-8 px-3 ${shared ? "text-accent" : "text-muted-foreground hover:text-accent"}`}
          onClick={handleShare}
        >
          <Repeat2 className="h-4 w-4" />
          <span className="text-xs">Repost</span>
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className={`gap-1.5 h-8 px-3 transition-all ${liked ? "text-accent scale-110" : "text-muted-foreground hover:text-accent"}`}
          onClick={handleLike}
        >
          <Heart className={`h-4 w-4 ${liked ? "fill-current" : ""}`} />
          <span className="text-xs">{likeCount || ""}</span>
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="gap-1.5 text-muted-foreground hover:text-primary h-8 px-3"
          onClick={handleShare}
        >
          <Share className="h-4 w-4" />
        </Button>
      </div>
    </article>
  );
};

export default EventPost;
