import { useState, useEffect, useRef } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Send, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import Navbar from "@/components/Navbar";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "@/hooks/use-toast";

interface Conversation {
  profileId: string;
  fullName: string;
  avatarUrl: string | null;
  lastMessage: string;
  lastAt: string;
  unread: number;
}

interface Message {
  id: string;
  sender_id: string;
  recipient_id: string;
  content: string;
  read: boolean;
  created_at: string;
}

const Messages = () => {
  const { user } = useAuth();
  const [searchParams] = useSearchParams();
  const toParam = searchParams.get("to");
  const [profileId, setProfileId] = useState<string | null>(null);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeChatId, setActiveChatId] = useState<string | null>(toParam);
  const [activeChatProfile, setActiveChatProfile] = useState<any>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [sending, setSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!user) return;
    const init = async () => {
      const { data } = await supabase.from("profiles").select("id").eq("auth_id", user.id).single();
      if (data) {
        setProfileId(data.id);
        fetchConversations(data.id);
      }
    };
    init();
  }, [user]);

  useEffect(() => {
    if (activeChatId) {
      fetchChatProfile(activeChatId);
      if (profileId) fetchMessages(profileId, activeChatId);
    }
  }, [activeChatId, profileId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Realtime subscription
  useEffect(() => {
    if (!profileId) return;
    const channel = supabase
      .channel("messages-realtime")
      .on("postgres_changes", { event: "INSERT", schema: "public", table: "messages" }, (payload) => {
        const msg = payload.new as Message;
        if (msg.sender_id === profileId || msg.recipient_id === profileId) {
          if (activeChatId && (msg.sender_id === activeChatId || msg.recipient_id === activeChatId)) {
            setMessages((prev) => [...prev, msg]);
            if (msg.sender_id === activeChatId) {
              supabase.from("messages").update({ read: true }).eq("id", msg.id).then();
            }
          }
          fetchConversations(profileId);
        }
      })
      .subscribe();
    return () => { supabase.removeChannel(channel); };
  }, [profileId, activeChatId]);

  const fetchConversations = async (myId: string) => {
    const { data: allMsgs } = await supabase
      .from("messages")
      .select("*")
      .order("created_at", { ascending: false });

    if (!allMsgs) return;

    const convMap = new Map<string, { lastMsg: Message; unread: number }>();
    for (const msg of allMsgs) {
      const otherId = msg.sender_id === myId ? msg.recipient_id : msg.sender_id;
      if (!convMap.has(otherId)) {
        convMap.set(otherId, { lastMsg: msg, unread: 0 });
      }
      if (msg.recipient_id === myId && !msg.read) {
        convMap.get(otherId)!.unread++;
      }
    }

    const ids = Array.from(convMap.keys());
    if (ids.length === 0) { setConversations([]); return; }

    const { data: profiles } = await supabase.from("profiles").select("id, full_name, avatar_url").in("id", ids);
    const profileMap = new Map(profiles?.map((p) => [p.id, p]) || []);

    const convs: Conversation[] = ids.map((id) => {
      const { lastMsg, unread } = convMap.get(id)!;
      const p = profileMap.get(id);
      return {
        profileId: id,
        fullName: p?.full_name || "User",
        avatarUrl: p?.avatar_url || null,
        lastMessage: lastMsg.content,
        lastAt: lastMsg.created_at,
        unread,
      };
    });

    setConversations(convs.sort((a, b) => new Date(b.lastAt).getTime() - new Date(a.lastAt).getTime()));
  };

  const fetchChatProfile = async (id: string) => {
    const { data } = await supabase.from("profiles").select("id, full_name, avatar_url").eq("id", id).single();
    setActiveChatProfile(data);
  };

  const fetchMessages = async (myId: string, otherId: string) => {
    const { data } = await supabase
      .from("messages")
      .select("*")
      .or(`and(sender_id.eq.${myId},recipient_id.eq.${otherId}),and(sender_id.eq.${otherId},recipient_id.eq.${myId})`)
      .order("created_at", { ascending: true });
    if (data) setMessages(data);

    // Mark as read
    await supabase
      .from("messages")
      .update({ read: true })
      .eq("sender_id", otherId)
      .eq("recipient_id", myId)
      .eq("read", false);
  };

  const handleSend = async () => {
    if (!newMessage.trim() || !profileId || !activeChatId) return;
    setSending(true);
    try {
      const { error } = await supabase.from("messages").insert({
        sender_id: profileId,
        recipient_id: activeChatId,
        content: newMessage.trim(),
      });
      if (error) throw error;
      setNewMessage("");
    } catch (err: any) {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    } finally {
      setSending(false);
    }
  };

  const timeLabel = (d: string) => {
    const date = new Date(d);
    const now = new Date();
    if (date.toDateString() === now.toDateString()) return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    return date.toLocaleDateString([], { month: "short", day: "numeric" });
  };

  if (!user) return <div className="min-h-screen bg-background"><Navbar /><p className="py-32 text-center text-muted-foreground">Please <Link to="/auth" className="text-primary hover:underline">sign in</Link> to view messages.</p></div>;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="mx-auto max-w-4xl px-6 py-8">
        <h1 className="font-display text-2xl font-bold mb-6">Messages</h1>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-[300px_1fr] md:h-[calc(100vh-200px)]">
          {/* Conversations list */}
          <div className={`space-y-1 overflow-y-auto rounded-xl border border-border bg-card p-2 ${activeChatId ? "hidden md:block" : ""}`}>
            {conversations.length === 0 && (
              <p className="py-8 text-center text-sm text-muted-foreground">No messages yet</p>
            )}
            {conversations.map((c) => (
              <button
                key={c.profileId}
                onClick={() => setActiveChatId(c.profileId)}
                className={`flex w-full items-center gap-3 rounded-lg p-3 text-left transition-colors ${
                  activeChatId === c.profileId ? "bg-primary/10" : "hover:bg-muted"
                }`}
              >
                <Avatar className="h-10 w-10 shrink-0">
                  <AvatarImage src={c.avatarUrl || undefined} />
                  <AvatarFallback>{c.fullName[0]}</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold truncate">{c.fullName}</span>
                    <span className="text-[10px] text-muted-foreground shrink-0">{timeLabel(c.lastAt)}</span>
                  </div>
                  <p className="truncate text-xs text-muted-foreground">{c.lastMessage}</p>
                </div>
                {c.unread > 0 && (
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                    {c.unread}
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Chat area */}
          {activeChatId ? (
            <div className="flex flex-col rounded-xl border border-border bg-card overflow-hidden">
              <div className="flex items-center gap-3 border-b border-border px-4 py-3">
                <button onClick={() => setActiveChatId(null)} className="md:hidden text-muted-foreground hover:text-foreground">
                  <ArrowLeft className="h-5 w-5" />
                </button>
                <Link to={`/profile/${activeChatProfile?.id}`} className="flex items-center gap-3 hover:opacity-80 transition-opacity">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={activeChatProfile?.avatar_url || undefined} />
                    <AvatarFallback>{activeChatProfile?.full_name?.[0] || "?"}</AvatarFallback>
                  </Avatar>
                  <span className="font-semibold text-sm">{activeChatProfile?.full_name || "User"}</span>
                </Link>
              </div>

              <div className="flex-1 overflow-y-auto p-4 space-y-3 min-h-[300px] max-h-[60vh]">
                {messages.map((m) => {
                  const isMine = m.sender_id === profileId;
                  return (
                    <div key={m.id} className={`flex ${isMine ? "justify-end" : "justify-start"}`}>
                      <div className={`max-w-[75%] rounded-2xl px-4 py-2 text-sm ${
                        isMine ? "bg-primary text-primary-foreground" : "bg-muted text-foreground"
                      }`}>
                        <p>{m.content}</p>
                        <p className={`mt-1 text-[10px] ${isMine ? "text-primary-foreground/60" : "text-muted-foreground"}`}>
                          {timeLabel(m.created_at)}
                        </p>
                      </div>
                    </div>
                  );
                })}
                <div ref={messagesEndRef} />
              </div>

              <div className="border-t border-border p-3 flex gap-2">
                <Input
                  placeholder="Type a message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyDown={(e) => { if (e.key === "Enter") handleSend(); }}
                />
                <Button size="icon" onClick={handleSend} disabled={sending || !newMessage.trim()}>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ) : (
            <div className="hidden md:flex items-center justify-center rounded-xl border border-border bg-card">
              <p className="text-muted-foreground">Select a conversation</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Messages;
