import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { supabase } from "@/integrations/supabase/client";

interface Attendee {
  id: string;
  profiles: { id: string; full_name: string; avatar_url: string | null } | null;
}

const AttendeeList = ({ eventId }: { eventId: string }) => {
  const [attendees, setAttendees] = useState<Attendee[]>([]);

  useEffect(() => {
    const fetch = async () => {
      const { data } = await supabase
        .from("registrations")
        .select("id, profiles:user_id(id, full_name, avatar_url)")
        .eq("event_id", eventId);
      if (data) setAttendees(data as any);
    };
    fetch();
  }, [eventId]);

  if (attendees.length === 0) return null;

  return (
    <div className="space-y-3">
      <h2 className="font-display text-xl font-semibold">Attendees ({attendees.length})</h2>
      <div className="flex flex-wrap gap-2">
        {attendees.map((a) => (
          <Link
            key={a.id}
            to={`/tennis/profile/${a.profiles?.id}`}
            className="flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 transition-all hover:shadow-card"
          >
            <Avatar className="h-6 w-6">
              <AvatarImage src={a.profiles?.avatar_url || undefined} />
              <AvatarFallback className="text-[10px]">{a.profiles?.full_name?.[0] || "?"}</AvatarFallback>
            </Avatar>
            <span className="text-sm font-medium">{a.profiles?.full_name || "User"}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AttendeeList;
