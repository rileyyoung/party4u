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

const CreateEvent = () => {
  const navigate = useNavigate();
  const [isOnline, setIsOnline] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({ title: "Event created! 🎉", description: "Your event is now live." });
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="mx-auto max-w-2xl px-6 py-12">
        <button
          onClick={() => navigate(-1)}
          className="mb-6 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-4 w-4" /> Back
        </button>

        <div className="animate-fade-in space-y-2">
          <h1 className="font-display text-3xl font-bold tracking-tight">Create an Event</h1>
          <p className="text-muted-foreground">
            Fill in the details below to publish your event.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 animate-fade-in space-y-6" style={{ animationDelay: "100ms" }}>
          <div className="space-y-2">
            <Label htmlFor="title">Event Title</Label>
            <Input id="title" placeholder="e.g. Design Systems Summit 2026" required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Tell people what your event is about..."
              rows={5}
              required
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="date">Date</Label>
              <Input id="date" type="date" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="time">Time</Label>
              <Input id="time" type="time" required />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Category</Label>
            <Select required>
              <SelectTrigger>
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="design">Design</SelectItem>
                <SelectItem value="technology">Technology</SelectItem>
                <SelectItem value="networking">Networking</SelectItem>
                <SelectItem value="wellness">Wellness</SelectItem>
                <SelectItem value="business">Business</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center justify-between rounded-xl border border-border bg-card p-4">
            <div>
              <p className="font-medium text-sm">Online Event</p>
              <p className="text-xs text-muted-foreground">
                Attendees will join via a virtual link
              </p>
            </div>
            <Switch checked={isOnline} onCheckedChange={setIsOnline} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="location">
              {isOnline ? "Meeting Link" : "Location"}
            </Label>
            <Input
              id="location"
              placeholder={isOnline ? "https://meet.google.com/..." : "e.g. The Glasshouse, San Francisco"}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="capacity">Max Attendees</Label>
            <Input id="capacity" type="number" min={1} placeholder="200" required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="cover">Cover Image URL</Label>
            <Input id="cover" placeholder="https://images.unsplash.com/..." />
          </div>

          <div className="flex gap-3 pt-4">
            <Button type="submit" className="flex-1">
              Publish Event
            </Button>
            <Button type="button" variant="outline" onClick={() => navigate(-1)}>
              Cancel
            </Button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default CreateEvent;
