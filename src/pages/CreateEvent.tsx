import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { useEffect } from "react";

const CreateEvent = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isOnline, setIsOnline] = useState(false);
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState("");
  const [requiresApproval, setRequiresApproval] = useState(false);

  useEffect(() => {
    if (!user) navigate("/tennis/auth");
  }, [user]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);

    try {
      // Get profile
      const { data: profile } = await supabase
        .from("profiles")
        .select("id")
        .eq("auth_id", user!.id)
        .single();

      if (!profile) throw new Error("Profile not found");

      const { error } = await supabase.from("events").insert({
        organizer_id: profile.id,
        title: formData.get("title") as string,
        description: formData.get("description") as string,
        date: formData.get("date") as string,
        time: formData.get("time") as string,
        location: formData.get("location") as string,
        category: category,
        is_online: isOnline,
        max_attendees: parseInt(formData.get("capacity") as string) || 100,
        cover_image: (formData.get("cover") as string) || null,
        requires_approval: requiresApproval,
        gate_question: requiresApproval ? (formData.get("gate_question") as string) || null : null,
      } as any);

      if (error) throw error;
      toast({ title: "Event created! 🎉", description: "Your event is now live." });
      navigate("/tennis");
    } catch (err: any) {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="mx-auto max-w-2xl px-6 py-12">
        <button onClick={() => navigate(-1)} className="mb-6 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="h-4 w-4" /> Back
        </button>

        <div className="animate-fade-in space-y-2">
          <h1 className="font-display text-3xl font-bold tracking-tight">Create an Event</h1>
          <p className="text-muted-foreground">Fill in the details below to publish your event.</p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 animate-fade-in space-y-6" style={{ animationDelay: "100ms" }}>
          <div className="space-y-2">
            <Label htmlFor="title">Event Title</Label>
            <Input id="title" name="title" placeholder="e.g. Design Systems Summit 2026" required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" name="description" placeholder="Tell people what your event is about..." rows={5} required />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="date">Date</Label>
              <Input id="date" name="date" type="date" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="time">Time</Label>
              <Input id="time" name="time" type="time" required />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Category</Label>
            <Select value={category} onValueChange={setCategory} required>
              <SelectTrigger><SelectValue placeholder="Select a category" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="Design">Design</SelectItem>
                <SelectItem value="Technology">Technology</SelectItem>
                <SelectItem value="Networking">Networking</SelectItem>
                <SelectItem value="Wellness">Wellness</SelectItem>
                <SelectItem value="Business">Business</SelectItem>
                <SelectItem value="Other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center justify-between rounded-xl border border-border bg-card p-4">
            <div>
              <p className="font-medium text-sm">Online Event</p>
              <p className="text-xs text-muted-foreground">Attendees will join via a virtual link</p>
            </div>
            <Switch checked={isOnline} onCheckedChange={setIsOnline} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="location">{isOnline ? "Meeting Link" : "Location"}</Label>
            <Input id="location" name="location" placeholder={isOnline ? "https://meet.google.com/..." : "e.g. The Glasshouse, San Francisco"} required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="capacity">Max Attendees</Label>
            <Input id="capacity" name="capacity" type="number" min={1} placeholder="200" required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="cover">Cover Image URL</Label>
            <Input id="cover" name="cover" placeholder="https://images.unsplash.com/..." />
          </div>

          <div className="flex items-center justify-between rounded-xl border border-border bg-card p-4">
            <div>
              <p className="font-medium text-sm">🔒 Require Approval</p>
              <p className="text-xs text-muted-foreground">Guests must be approved before they can attend</p>
            </div>
            <Switch checked={requiresApproval} onCheckedChange={setRequiresApproval} />
          </div>

          {requiresApproval && (
            <div className="space-y-2 animate-fade-in">
              <Label htmlFor="gate_question">Gate Question</Label>
              <Textarea
                id="gate_question"
                name="gate_question"
                placeholder="e.g. What's your favorite disco track? 🪩"
                rows={2}
              />
              <p className="text-xs text-muted-foreground">Guests must answer this before requesting access.</p>
            </div>
          )}

          <div className="flex gap-3 pt-4">
            <Button type="submit" className="flex-1" disabled={loading}>
              {loading ? "Publishing..." : "Publish Event"}
            </Button>
            <Button type="button" variant="outline" onClick={() => navigate(-1)}>Cancel</Button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default CreateEvent;
