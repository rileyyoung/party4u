import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Calendar, MapPin, Users, ArrowRight, LogOut, User, Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import ProfileEditDialog from "@/components/ProfileEditDialog";

interface EventWithRegistration {
  id: string;
  event_id: string;
  created_at: string;
  events: {
    id: string;
    title: string;
    description: string;
    date: string;
    time: string;
    location: string;
    category: string;
    is_online: boolean;
    cover_image: string | null;
  };
}

const Account = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [registrations, setRegistrations] = useState<EventWithRegistration[]>([]);
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<{ full_name: string; email: string; avatar_url: string | null } | null>(null);

  useEffect(() => {
    if (!user) {
      navigate("/auth");
      return;
    }
    fetchData();
  }, [user]);

  const fetchData = async () => {
    try {
      // Fetch profile
      const { data: profileData } = await supabase
        .from("profiles")
        .select("full_name, email, avatar_url")
        .eq("auth_id", user!.id)
        .single();
      setProfile(profileData);

      // Fetch registrations with event data
      const { data: regData, error } = await supabase
        .from("registrations")
        .select("id, event_id, created_at, events(id, title, description, date, time, location, category, is_online, cover_image)")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setRegistrations((regData as any) || []);
    } catch (err: any) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCancelRegistration = async (regId: string) => {
    const { error } = await supabase.from("registrations").delete().eq("id", regId);
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Registration cancelled" });
      setRegistrations((prev) => prev.filter((r) => r.id !== regId));
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  const today = new Date().toISOString().split("T")[0];
  const upcoming = registrations.filter((r) => r.events && r.events.date >= today);
  const past = registrations.filter((r) => r.events && r.events.date < today);

  const EventRow = ({ reg, isPast }: { reg: EventWithRegistration; isPast?: boolean }) => {
    const e = reg.events;
    if (!e) return null;
    const dateObj = new Date(e.date + "T00:00:00");
    const month = dateObj.toLocaleString("en-US", { month: "short" }).toUpperCase();
    const day = dateObj.getDate();

    return (
      <div className="flex items-start gap-4 rounded-xl border border-border bg-card p-4 transition-all hover:shadow-card">
        <div className="flex flex-col items-center pt-0.5">
          <span className="text-[10px] font-bold tracking-wider text-primary">{month}</span>
          <span className="font-display text-xl font-bold leading-none">{day}</span>
        </div>
        <div className="flex-1 space-y-1">
          <Link to={`/event/${e.id}`} className="font-display text-base font-semibold hover:text-primary transition-colors">
            {e.title}
          </Link>
          <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
            <span className="flex items-center gap-1"><Calendar className="h-3 w-3" />{e.time}</span>
            <span className="flex items-center gap-1"><MapPin className="h-3 w-3" />{e.is_online ? "Online" : e.location.split(",")[0]}</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {isPast ? (
            <Badge variant="secondary">Attended</Badge>
          ) : (
            <Button variant="outline" size="sm" onClick={() => handleCancelRegistration(reg.id)}>
              Cancel
            </Button>
          )}
          <Link to={`/event/${e.id}`}>
            <Button variant="ghost" size="sm"><ArrowRight className="h-4 w-4" /></Button>
          </Link>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="mx-auto max-w-3xl px-6 py-12">
        {/* Profile header */}
        <div className="animate-fade-in mb-8 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Avatar className="h-14 w-14">
              <AvatarImage src={profile?.avatar_url || undefined} />
              <AvatarFallback className="text-xl font-display">{profile?.full_name?.[0] || "?"}</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="font-display text-2xl font-bold">{profile?.full_name || "Your Account"}</h1>
              <p className="text-sm text-muted-foreground">{profile?.email || user?.email}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <ProfileEditDialog profile={profile} onProfileUpdated={fetchData}>
              <Button variant="outline" size="sm" className="gap-1.5">
                <Pencil className="h-4 w-4" /> Edit Profile
              </Button>
            </ProfileEditDialog>
            <Button variant="outline" size="sm" onClick={handleSignOut} className="gap-1.5">
              <LogOut className="h-4 w-4" /> Sign Out
            </Button>
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="upcoming" className="animate-fade-in" style={{ animationDelay: "100ms" }}>
          <TabsList className="mb-6">
            <TabsTrigger value="upcoming">Upcoming ({upcoming.length})</TabsTrigger>
            <TabsTrigger value="past">Past ({past.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="upcoming" className="space-y-3">
            {loading ? (
              <p className="py-12 text-center text-muted-foreground">Loading...</p>
            ) : upcoming.length > 0 ? (
              upcoming.map((r) => <EventRow key={r.id} reg={r} />)
            ) : (
              <div className="py-16 text-center">
                <p className="font-display text-lg font-semibold text-muted-foreground">No upcoming events</p>
                <p className="mt-1 text-sm text-muted-foreground">Browse events and register for one!</p>
                <Link to="/"><Button className="mt-4">Discover Events</Button></Link>
              </div>
            )}
          </TabsContent>

          <TabsContent value="past" className="space-y-3">
            {loading ? (
              <p className="py-12 text-center text-muted-foreground">Loading...</p>
            ) : past.length > 0 ? (
              past.map((r) => <EventRow key={r.id} reg={r} isPast />)
            ) : (
              <div className="py-16 text-center">
                <p className="font-display text-lg font-semibold text-muted-foreground">No past events</p>
                <p className="mt-1 text-sm text-muted-foreground">Events you've attended will show up here.</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Account;
