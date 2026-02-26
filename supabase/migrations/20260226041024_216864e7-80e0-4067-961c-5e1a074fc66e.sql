
-- Storage bucket for avatars
INSERT INTO storage.buckets (id, name, public) VALUES ('avatars', 'avatars', true);

-- Storage policies for avatars
CREATE POLICY "Avatar images are publicly accessible"
ON storage.objects FOR SELECT
USING (bucket_id = 'avatars');

CREATE POLICY "Users can upload their own avatar"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'avatars' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can update their own avatar"
ON storage.objects FOR UPDATE
USING (bucket_id = 'avatars' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can delete their own avatar"
ON storage.objects FOR DELETE
USING (bucket_id = 'avatars' AND auth.uid()::text = (storage.foldername(name))[1]);

-- Allow anyone to view profiles (for attendee lists)
DROP POLICY IF EXISTS "Users can view own profile" ON public.profiles;
CREATE POLICY "Anyone can view profiles"
ON public.profiles FOR SELECT
USING (true);

-- Comments table
CREATE TABLE public.comments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  event_id UUID NOT NULL REFERENCES public.events(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.comments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view comments"
ON public.comments FOR SELECT
USING (true);

CREATE POLICY "Authenticated users can create comments"
ON public.comments FOR INSERT
WITH CHECK (user_id = get_my_profile_id());

CREATE POLICY "Users can delete own comments"
ON public.comments FOR DELETE
USING (user_id = get_my_profile_id());

-- Messages table
CREATE TABLE public.messages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  sender_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  recipient_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  read BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own messages"
ON public.messages FOR SELECT
USING (sender_id = get_my_profile_id() OR recipient_id = get_my_profile_id());

CREATE POLICY "Authenticated users can send messages"
ON public.messages FOR INSERT
WITH CHECK (sender_id = get_my_profile_id());

CREATE POLICY "Recipients can update messages (mark read)"
ON public.messages FOR UPDATE
USING (recipient_id = get_my_profile_id());

-- Enable realtime for messages
ALTER PUBLICATION supabase_realtime ADD TABLE public.messages;
