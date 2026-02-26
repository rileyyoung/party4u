import { useState, useEffect } from "react";
import { Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";

interface Registration {
  id: string;
  status: string;
  gate_answer: string | null;
  created_at: string;
  profiles: { id: string; full_name: string; avatar_url: string | null } | null;
}

const GuestApprovalPanel = ({ eventId, gateQuestion }: { eventId: string; gateQuestion: string | null }) => {
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRegistrations();
  }, [eventId]);

  const fetchRegistrations = async () => {
    const { data } = await supabase
      .from("registrations")
      .select("id, status, gate_answer, created_at, profiles:user_id(id, full_name, avatar_url)")
      .eq("event_id", eventId)
      .order("created_at", { ascending: false });
    if (data) setRegistrations(data as any);
    setLoading(false);
  };

  const updateStatus = async (regId: string, status: "approved" | "denied") => {
    const { error } = await supabase
      .from("registrations")
      .update({ status } as any)
      .eq("id", regId);
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
      return;
    }
    setRegistrations((prev) =>
      prev.map((r) => (r.id === regId ? { ...r, status } : r))
    );
    toast({ title: status === "approved" ? "Guest approved ✅" : "Guest denied 🚫" });
  };

  const pending = registrations.filter((r) => r.status === "pending");
  const approved = registrations.filter((r) => r.status === "approved");
  const denied = registrations.filter((r) => r.status === "denied");

  if (loading) return null;

  return (
    <div className="space-y-4">
      <h2 className="font-display text-xl font-semibold">Guest Management 🔒</h2>
      {gateQuestion && (
        <div className="rounded-lg border border-primary/30 bg-primary/5 p-3">
          <p className="text-xs text-muted-foreground">Gate question:</p>
          <p className="text-sm font-medium">{gateQuestion}</p>
        </div>
      )}

      {pending.length > 0 && (
        <div className="space-y-2">
          <h3 className="text-sm font-semibold text-accent">Pending ({pending.length})</h3>
          {pending.map((r) => (
            <div key={r.id} className="flex items-start gap-3 rounded-lg border border-accent/30 bg-card p-3">
              <Link to={`/profile/${r.profiles?.id}`}>
                <Avatar className="h-8 w-8">
                  <AvatarImage src={r.profiles?.avatar_url || undefined} />
                  <AvatarFallback className="text-xs">{r.profiles?.full_name?.[0] || "?"}</AvatarFallback>
                </Avatar>
              </Link>
              <div className="flex-1 min-w-0 space-y-1">
                <Link to={`/profile/${r.profiles?.id}`} className="text-sm font-semibold hover:text-primary transition-colors">
                  {r.profiles?.full_name || "User"}
                </Link>
                {r.gate_answer && (
                  <p className="text-xs text-muted-foreground italic">"{r.gate_answer}"</p>
                )}
              </div>
              <div className="flex gap-1.5 shrink-0">
                <Button size="icon" variant="ghost" className="h-7 w-7 text-green-400 hover:text-green-300 hover:bg-green-400/10" onClick={() => updateStatus(r.id, "approved")}>
                  <Check className="h-4 w-4" />
                </Button>
                <Button size="icon" variant="ghost" className="h-7 w-7 text-destructive hover:bg-destructive/10" onClick={() => updateStatus(r.id, "denied")}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      {approved.length > 0 && (
        <div className="space-y-2">
          <h3 className="text-sm font-semibold text-muted-foreground">Approved ({approved.length})</h3>
          <div className="flex flex-wrap gap-2">
            {approved.map((r) => (
              <Link key={r.id} to={`/profile/${r.profiles?.id}`} className="flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 text-sm">
                <Avatar className="h-5 w-5">
                  <AvatarImage src={r.profiles?.avatar_url || undefined} />
                  <AvatarFallback className="text-[10px]">{r.profiles?.full_name?.[0]}</AvatarFallback>
                </Avatar>
                {r.profiles?.full_name}
                <Badge variant="outline" className="text-[10px] px-1.5 py-0">✓</Badge>
              </Link>
            ))}
          </div>
        </div>
      )}

      {denied.length > 0 && (
        <div className="space-y-2">
          <h3 className="text-sm font-semibold text-muted-foreground">Denied ({denied.length})</h3>
          <div className="flex flex-wrap gap-2">
            {denied.map((r) => (
              <span key={r.id} className="flex items-center gap-2 rounded-full border border-destructive/30 bg-card px-3 py-1.5 text-sm text-muted-foreground">
                {r.profiles?.full_name}
                <Badge variant="destructive" className="text-[10px] px-1.5 py-0">✗</Badge>
              </span>
            ))}
          </div>
        </div>
      )}

      {registrations.length === 0 && (
        <p className="text-sm text-muted-foreground text-center py-4">No guest requests yet.</p>
      )}
    </div>
  );
};

export default GuestApprovalPanel;
