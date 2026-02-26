import { useState, useEffect } from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";

interface Comment {
  id: string;
  content: string;
  created_at: string;
  user_id: string;
  profiles: { full_name: string; avatar_url: string | null; id: string } | null;
}

const EventComments = ({ eventId }: { eventId: string }) => {
  const { user } = useAuth();
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [posting, setPosting] = useState(false);
  const [profileId, setProfileId] = useState<string | null>(null);

  useEffect(() => {
    fetchComments();
    if (user) fetchProfileId();
  }, [eventId, user]);

  const fetchProfileId = async () => {
    const { data } = await supabase.from("profiles").select("id").eq("auth_id", user!.id).single();
    if (data) setProfileId(data.id);
  };

  const fetchComments = async () => {
    const { data } = await supabase
      .from("comments")
      .select("id, content, created_at, user_id, profiles(full_name, avatar_url, id)")
      .eq("event_id", eventId)
      .order("created_at", { ascending: true });
    if (data) setComments(data as any);
  };

  const handlePost = async () => {
    if (!newComment.trim() || !profileId) return;
    setPosting(true);
    try {
      const { error } = await supabase.from("comments").insert({
        event_id: eventId,
        user_id: profileId,
        content: newComment.trim(),
      });
      if (error) throw error;
      setNewComment("");
      fetchComments();
    } catch (err: any) {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    } finally {
      setPosting(false);
    }
  };

  const handleDelete = async (id: string) => {
    await supabase.from("comments").delete().eq("id", id);
    setComments((prev) => prev.filter((c) => c.id !== id));
  };

  const timeAgo = (date: string) => {
    const diff = Date.now() - new Date(date).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 1) return "just now";
    if (mins < 60) return `${mins}m ago`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `${hrs}h ago`;
    return `${Math.floor(hrs / 24)}d ago`;
  };

  return (
    <div className="space-y-4">
      <h2 className="font-display text-xl font-semibold">Comments ({comments.length})</h2>

      {user ? (
        <div className="flex gap-3">
          <Textarea
            placeholder="Add a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="min-h-[60px] resize-none"
            onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handlePost(); } }}
          />
          <Button size="icon" onClick={handlePost} disabled={posting || !newComment.trim()}>
            <Send className="h-4 w-4" />
          </Button>
        </div>
      ) : (
        <p className="text-sm text-muted-foreground">
          <Link to="/auth" className="text-primary hover:underline">Sign in</Link> to comment.
        </p>
      )}

      <div className="space-y-3">
        {comments.map((c) => (
          <div key={c.id} className="flex gap-3 rounded-lg border border-border bg-card p-3">
            <Link to={`/profile/${c.profiles?.id}`}>
              <Avatar className="h-8 w-8">
                <AvatarImage src={c.profiles?.avatar_url || undefined} />
                <AvatarFallback className="text-xs">{c.profiles?.full_name?.[0] || "?"}</AvatarFallback>
              </Avatar>
            </Link>
            <div className="flex-1 space-y-1">
              <div className="flex items-center gap-2">
                <Link to={`/profile/${c.profiles?.id}`} className="text-sm font-semibold hover:text-primary transition-colors">
                  {c.profiles?.full_name || "User"}
                </Link>
                <span className="text-xs text-muted-foreground">{timeAgo(c.created_at)}</span>
              </div>
              <p className="text-sm text-foreground">{c.content}</p>
            </div>
            {profileId === c.user_id && (
              <button onClick={() => handleDelete(c.id)} className="text-xs text-muted-foreground hover:text-destructive transition-colors">
                Delete
              </button>
            )}
          </div>
        ))}
        {comments.length === 0 && (
          <p className="py-4 text-center text-sm text-muted-foreground">No comments yet. Be the first!</p>
        )}
      </div>
    </div>
  );
};

export default EventComments;
