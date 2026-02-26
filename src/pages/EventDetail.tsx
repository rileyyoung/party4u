import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Calendar, Clock, MapPin, Users, Globe, Share2, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import { mockEvents } from "@/lib/mock-data";

const EventDetail = () => {
  const { id } = useParams();
  const event = mockEvents.find((e) => e.id === id);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [registered, setRegistered] = useState(false);

  if (!event) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="flex flex-col items-center justify-center py-32">
          <p className="font-display text-2xl font-bold">Event not found</p>
          <Link to="/" className="mt-4 text-primary hover:underline">
            ← Back to events
          </Link>
        </div>
      </div>
    );
  }

  const dateObj = new Date(event.date + "T00:00:00");
  const formattedDate = dateObj.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const spotsLeft = event.maxAttendees - event.attendees;
  const fillPercent = (event.attendees / event.maxAttendees) * 100;

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) {
      toast({ title: "Please fill in all fields", variant: "destructive" });
      return;
    }
    setRegistered(true);
    toast({ title: "You're registered! 🎉", description: `See you at ${event.title}` });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Cover image */}
      <div className="relative h-64 sm:h-80 overflow-hidden">
        <img
          src={event.coverImage}
          alt={event.title}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
      </div>

      <main className="mx-auto max-w-4xl px-6 -mt-16 relative pb-20">
        <Link
          to="/"
          className="mb-6 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-4 w-4" /> Back to events
        </Link>

        <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
          {/* Left column */}
          <div className="animate-fade-in space-y-6">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Badge variant={event.isOnline ? "secondary" : "default"}>
                  {event.isOnline ? "Online" : "In Person"}
                </Badge>
                <Badge variant="outline">{event.category}</Badge>
              </div>
              <h1 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
                {event.title}
              </h1>
              <p className="text-sm text-muted-foreground">
                Hosted by <span className="font-medium text-foreground">{event.organizer}</span>
              </p>
            </div>

            {/* Details */}
            <div className="space-y-3 rounded-xl border border-border bg-card p-5">
              <div className="flex items-center gap-3 text-sm">
                <Calendar className="h-4 w-4 text-primary" />
                <span>{formattedDate}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Clock className="h-4 w-4 text-primary" />
                <span>{event.time}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                {event.isOnline ? (
                  <Globe className="h-4 w-4 text-primary" />
                ) : (
                  <MapPin className="h-4 w-4 text-primary" />
                )}
                <span>{event.location}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Users className="h-4 w-4 text-primary" />
                <span>{event.attendees} attending · {spotsLeft} spots left</span>
              </div>
            </div>

            {/* Capacity bar */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>{event.attendees} registered</span>
                <span>{event.maxAttendees} capacity</span>
              </div>
              <div className="h-2 rounded-full bg-secondary overflow-hidden">
                <div
                  className="h-full rounded-full bg-primary transition-all duration-500"
                  style={{ width: `${fillPercent}%` }}
                />
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <h2 className="font-display text-xl font-semibold">About this event</h2>
              <p className="text-muted-foreground leading-relaxed">{event.description}</p>
            </div>

            {/* Action buttons */}
            <div className="flex gap-3">
              <Button variant="outline" size="sm" className="gap-1.5">
                <Heart className="h-4 w-4" /> Save
              </Button>
              <Button variant="outline" size="sm" className="gap-1.5">
                <Share2 className="h-4 w-4" /> Share
              </Button>
            </div>
          </div>

          {/* Right column — registration */}
          <div className="animate-fade-in" style={{ animationDelay: "150ms" }}>
            <div className="sticky top-24 rounded-xl border border-border bg-card p-6 shadow-card">
              {registered ? (
                <div className="space-y-4 text-center">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                    <span className="text-3xl">🎉</span>
                  </div>
                  <h3 className="font-display text-xl font-semibold">You're in!</h3>
                  <p className="text-sm text-muted-foreground">
                    We've sent a confirmation to {email}. See you there!
                  </p>
                </div>
              ) : (
                <form onSubmit={handleRegister} className="space-y-4">
                  <h3 className="font-display text-lg font-semibold">Register for this event</h3>
                  <p className="text-sm text-muted-foreground">
                    Free · {spotsLeft} spots remaining
                  </p>
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-sm">Name</Label>
                    <Input
                      id="name"
                      placeholder="Your full name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <Button type="submit" className="w-full">
                    Register
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default EventDetail;
