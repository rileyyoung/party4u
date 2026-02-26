import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Calendar, Clock, MapPin, Users, Globe, Share2, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";

const EventDetail = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [event, setEvent] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [registered, setRegistered] = useState(false);
  const [registering, setRegistering] = useState(false);
  const [attendeeCount, setAttendeeCount] = useState(0);

  useEffect(() => {
    fetchEvent();
  }, [id, user]);

  const fetchEvent = async () => {
    try {
      const { data: eventData, error } = await supabase
        .from("events")
        .select("*")
        .eq("id", id)
        .single();

      if (error || !eventData) {
        setEvent(null);
        setLoading(false);
        return;
      }
      setEvent(eventData);

      // Get attendee count
      const { data: countData } = await supabase.rpc("get_event_attendee_count", { event_uuid: id });
      setAttendeeCount(countData || 0);

      // Check if user is registered
      if (user) {
        const { data: regData } = await supabase
          .from("registrations")
          .select("id")
          .eq("event_id", id!);
        setRegistered(regData && regData.length > 0);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async () => {
    if (!user) {
      navigate("/auth");
      return;
    }
    setRegistering(true);
    try {
      // Get profile id
      const { data: profile } = await supabase
        .from("profiles")
        .select("id")
        .eq("auth_id", user.id)
        .single();

      if (!profile) throw new Error("Profile not found");

      const { error } = await supabase.from("registrations").insert({
        user_id: profile.id,
        event_id: id!,
      });

      if (error) throw error;
      setRegistered(true);
      setAttendeeCount((c) => c + 1);
      toast({ title: "You're registered! 🎉", description: `See you at ${event.title}` });
    } catch (err: any) {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    } finally {
      setRegistering(false);
    }
  };

  const handleCancelRegistration = async () => {
    try {
      const { data: profile } = await supabase
        .from("profiles")
        .select("id")
        .eq("auth_id", user!.id)
        .single();

      if (!profile) throw new Error("Profile not found");

      const { error } = await supabase
        .from("registrations")
        .delete()
        .eq("event_id", id!)
        .eq("user_id", profile.id);

      if (error) throw error;
      setRegistered(false);
      setAttendeeCount((c) => Math.max(0, c - 1));
      toast({ title: "Registration cancelled" });
    } catch (err: any) {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="flex items-center justify-center py-32">
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="flex flex-col items-center justify-center py-32">
          <p className="font-display text-2xl font-bold">Event not found</p>
          <Link to="/" className="mt-4 text-primary hover:underline">← Back to events</Link>
        </div>
      </div>
    );
  }

  const dateObj = new Date(event.date + "T00:00:00");
  const formattedDate = dateObj.toLocaleDateString("en-US", {
    weekday: "long", month: "long", day: "numeric", year: "numeric",
  });
  const spotsLeft = event.max_attendees - attendeeCount;
  const fillPercent = (attendeeCount / event.max_attendees) * 100;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {event.cover_image && (
        <div className="relative h-64 sm:h-80 overflow-hidden">
          <img src={event.cover_image} alt={event.title} className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
        </div>
      )}

      <main className={`mx-auto max-w-4xl px-6 ${event.cover_image ? "-mt-16 relative" : "pt-8"} pb-20`}>
        <Link to="/" className="mb-6 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="h-4 w-4" /> Back to events
        </Link>

        <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
          <div className="animate-fade-in space-y-6">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Badge variant={event.is_online ? "secondary" : "default"}>
                  {event.is_online ? "Online" : "In Person"}
                </Badge>
                <Badge variant="outline">{event.category}</Badge>
              </div>
              <h1 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">{event.title}</h1>
            </div>

            <div className="space-y-3 rounded-xl border border-border bg-card p-5">
              <div className="flex items-center gap-3 text-sm">
                <Calendar className="h-4 w-4 text-primary" /><span>{formattedDate}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Clock className="h-4 w-4 text-primary" /><span>{event.time}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                {event.is_online ? <Globe className="h-4 w-4 text-primary" /> : <MapPin className="h-4 w-4 text-primary" />}
                <span>{event.location}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Users className="h-4 w-4 text-primary" />
                <span>{attendeeCount} attending · {spotsLeft} spots left</span>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>{attendeeCount} registered</span>
                <span>{event.max_attendees} capacity</span>
              </div>
              <div className="h-2 rounded-full bg-secondary overflow-hidden">
                <div className="h-full rounded-full bg-primary transition-all duration-500" style={{ width: `${fillPercent}%` }} />
              </div>
            </div>

            <div className="space-y-2">
              <h2 className="font-display text-xl font-semibold">About this event</h2>
              <p className="text-muted-foreground leading-relaxed">{event.description}</p>
            </div>
          </div>

          {/* Registration panel */}
          <div className="animate-fade-in" style={{ animationDelay: "150ms" }}>
            <div className="sticky top-24 rounded-xl border border-border bg-card p-6 shadow-card">
              {registered ? (
                <div className="space-y-4 text-center">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                    <span className="text-3xl">🎉</span>
                  </div>
                  <h3 className="font-display text-xl font-semibold">You're registered!</h3>
                  <p className="text-sm text-muted-foreground">We'll see you there. Check your account for details.</p>
                  <Button variant="outline" className="w-full" onClick={handleCancelRegistration}>
                    Cancel Registration
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  <h3 className="font-display text-lg font-semibold">Register for this event</h3>
                  <p className="text-sm text-muted-foreground">Free · {spotsLeft} spots remaining</p>
                  <Button className="w-full" onClick={handleRegister} disabled={registering || spotsLeft <= 0}>
                    {registering ? "Registering..." : spotsLeft <= 0 ? "Event Full" : user ? "Register Now" : "Sign In to Register"}
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default EventDetail;
