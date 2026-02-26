import { useState, useRef } from "react";
import { Camera, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";

interface ProfileEditDialogProps {
  profile: { full_name: string; email: string; avatar_url: string | null } | null;
  onProfileUpdated: () => void;
  children: React.ReactNode;
}

const ProfileEditDialog = ({ profile, onProfileUpdated, children }: ProfileEditDialogProps) => {
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const [fullName, setFullName] = useState(profile?.full_name || "");
  const [avatarUrl, setAvatarUrl] = useState(profile?.avatar_url || "");
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user) return;

    setUploading(true);
    try {
      const fileExt = file.name.split(".").pop();
      const filePath = `${user.id}/avatar.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(filePath, file, { upsert: true });

      if (uploadError) throw uploadError;

      const { data } = supabase.storage.from("avatars").getPublicUrl(filePath);
      setAvatarUrl(data.publicUrl + "?t=" + Date.now());
      toast({ title: "Photo uploaded!" });
    } catch (err: any) {
      toast({ title: "Upload failed", description: err.message, variant: "destructive" });
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async () => {
    if (!user) return;
    setSaving(true);
    try {
      const { error } = await supabase
        .from("profiles")
        .update({ full_name: fullName, avatar_url: avatarUrl || null })
        .eq("auth_id", user.id);

      if (error) throw error;
      toast({ title: "Profile updated!" });
      onProfileUpdated();
      setOpen(false);
    } catch (err: any) {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    } finally {
      setSaving(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={(v) => { setOpen(v); if (v) { setFullName(profile?.full_name || ""); setAvatarUrl(profile?.avatar_url || ""); } }}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-display">Edit Profile</DialogTitle>
        </DialogHeader>
        <div className="space-y-6 py-4">
          <div className="flex flex-col items-center gap-3">
            <div className="relative">
              <Avatar className="h-24 w-24">
                <AvatarImage src={avatarUrl || undefined} />
                <AvatarFallback className="text-2xl font-display">
                  {fullName?.[0]?.toUpperCase() || "?"}
                </AvatarFallback>
              </Avatar>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={uploading}
                className="absolute bottom-0 right-0 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-elevated transition-transform hover:scale-110"
              >
                {uploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Camera className="h-4 w-4" />}
              </button>
              <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleAvatarUpload} />
            </div>
            <p className="text-xs text-muted-foreground">Click the camera icon to change your photo</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="edit-name">Full Name</Label>
            <Input id="edit-name" value={fullName} onChange={(e) => setFullName(e.target.value)} />
          </div>

          <div className="space-y-2">
            <Label>Email</Label>
            <Input value={profile?.email || ""} disabled className="opacity-60" />
          </div>

          <Button onClick={handleSave} disabled={saving} className="w-full">
            {saving ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProfileEditDialog;
