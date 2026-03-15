import { Link } from "react-router-dom";
import { Calendar, MapPin, Users, Globe } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface EventCardProps {
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
  };
  index: number;
}

const EventCard = ({ event, index }: EventCardProps) => {
  const dateObj = new Date(event.date + "T00:00:00");
  const month = dateObj.toLocaleString("en-US", { month: "short" }).toUpperCase();
  const day = dateObj.getDate();

  return (
    <Link
      to={`/tennis/event/${event.id}`}
      className="group block animate-fade-in rounded-2xl border border-border bg-card transition-all duration-300 hover:shadow-elevated hover:-translate-y-1 hover:glow-primary"
      style={{ animationDelay: `${index * 80}ms` }}
    >
      {event.cover_image && (
        <div className="relative overflow-hidden rounded-t-2xl">
          <img
            src={event.cover_image}
            alt={event.title}
            className="h-48 w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute left-3 top-3">
            <Badge variant={event.is_online ? "secondary" : "default"} className="gap-1 text-xs font-medium">
              {event.is_online ? (<><Globe className="h-3 w-3" /> Online</>) : event.category}
            </Badge>
          </div>
        </div>
      )}

      <div className="p-5">
        <div className="flex gap-4">
          <div className="flex flex-col items-center pt-0.5">
            <span className="text-[10px] font-bold tracking-wider text-primary">{month}</span>
            <span className="font-display text-2xl font-bold leading-none">{day}</span>
          </div>
          <div className="flex-1 space-y-2">
            <h3 className="font-display text-lg font-semibold leading-snug tracking-tight group-hover:text-primary transition-colors">
              {event.title}
            </h3>
            <p className="text-sm text-muted-foreground line-clamp-2">{event.description}</p>
            <div className="flex flex-wrap items-center gap-3 pt-1 text-xs text-muted-foreground">
              <span className="flex items-center gap-1"><Calendar className="h-3.5 w-3.5" />{event.time}</span>
              <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" />{event.is_online ? "Online" : event.location.split(",")[0]}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default EventCard;
