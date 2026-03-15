import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Calendar, MapPin, MessageSquare } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/Navbar";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

const Profile = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [profile, setProfile] = useState<any>(null);
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      const { data: profileData } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", id)
        .single();
      setProfile(profileData);

      if (profileData) {
        const { data: regData } = await supabase
          .from("registrations")
          .select("events(id, title, date, time, location, is_online, category)")
          .eq("user_id", profileData.id);
        if (regData) setEvents(regData.map((r: any) => r.events).filter(Boolean));
      }
      setLoading(false);
    };
    fetch();
  }, [id]);

  if (loading) return <div className="min-h-screen bg-background"><Navbar /><p className="py-32 text-center text-muted-foreground">Loading...</p></div>;
  if (!profile) return <div className="min-h-screen bg-background"><Navbar /><p className="py-32 text-center font-display text-2xl font-bold">Profile not found</p></div>;

  const isOwnProfile = user && profile.auth_id === user.id;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="mx-auto max-w-2xl px-6 py-12">
        <div className="animate-fade-in flex flex-col items-center gap-4 text-center">
          <Avatar className="h-24 w-24">
            <AvatarImage src={profile.avatar_url || undefined} />
            <AvatarFallback className="text-3xl font-display">{profile.full_name?.[0] || "?"}</AvatarFallback>
          </Avatar>
          <h1 className="font-display text-2xl font-bold">{profile.full_name || "User"}</h1>
          <p className="text-sm text-muted-foreground">Member since {new Date(profile.created_at).toLocaleDateString("en-US", { month: "long", year: "numeric" })}</p>
          
          {!isOwnProfile && user && (
            <Link to={`/tennis/messages?to=${profile.id}`}>
              <Button variant="outline" className="gap-2">
                <MessageSquare className="h-4 w-4" /> Message
              </Button>
            </Link>
          )}
        </div>

        {events.length > 0 && (
          <div className="mt-10 space-y-3">
            <h2 className="font-display text-lg font-semibold">Events attending</h2>
            {events.map((e: any) => (
              <Link key={e.id} to={`/tennis/event/${e.id}`} className="flex items-center gap-3 rounded-xl border border-border bg-card p-3 transition-all hover:shadow-card">
                <div className="flex flex-col items-center">
                  <span className="text-[10px] font-bold tracking-wider text-primary">
                    {new Date(e.date + "T00:00:00").toLocaleString("en-US", { month: "short" }).toUpperCase()}
                  </span>
                  <span className="font-display text-lg font-bold leading-none">{new Date(e.date + "T00:00:00").getDate()}</span>
                </div>
                <div className="flex-1">
                  <p className="font-display text-sm font-semibold">{e.title}</p>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Calendar className="h-3 w-3" />{e.time}
                    <MapPin className="h-3 w-3" />{e.is_online ? "Online" : e.location?.split(",")[0]}
                  </div>
                </div>
                <Badge variant="outline" className="text-xs">{e.category}</Badge>
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Profile;
