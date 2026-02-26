
-- Drop all existing restrictive policies and recreate as permissive

-- EVENTS
DROP POLICY IF EXISTS "Anyone can view events" ON public.events;
DROP POLICY IF EXISTS "Authenticated users can create events" ON public.events;
DROP POLICY IF EXISTS "Organizers can delete own events" ON public.events;
DROP POLICY IF EXISTS "Organizers can update own events" ON public.events;

CREATE POLICY "Anyone can view events" ON public.events FOR SELECT USING (true);
CREATE POLICY "Authenticated users can create events" ON public.events FOR INSERT WITH CHECK (organizer_id = get_my_profile_id());
CREATE POLICY "Organizers can update own events" ON public.events FOR UPDATE USING (organizer_id = get_my_profile_id());
CREATE POLICY "Organizers can delete own events" ON public.events FOR DELETE USING (organizer_id = get_my_profile_id());

-- PROFILES
DROP POLICY IF EXISTS "Anyone can view profiles" ON public.profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;

CREATE POLICY "Anyone can view profiles" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth_id = auth.uid());

-- REGISTRATIONS
DROP POLICY IF EXISTS "Users can view own registrations" ON public.registrations;
DROP POLICY IF EXISTS "Users can register for events" ON public.registrations;
DROP POLICY IF EXISTS "Users can cancel own registrations" ON public.registrations;

CREATE POLICY "Users can view own registrations" ON public.registrations FOR SELECT USING (user_id = get_my_profile_id());
CREATE POLICY "Users can register for events" ON public.registrations FOR INSERT WITH CHECK (user_id = get_my_profile_id());
CREATE POLICY "Users can cancel own registrations" ON public.registrations FOR DELETE USING (user_id = get_my_profile_id());

-- COMMENTS
DROP POLICY IF EXISTS "Anyone can view comments" ON public.comments;
DROP POLICY IF EXISTS "Authenticated users can create comments" ON public.comments;
DROP POLICY IF EXISTS "Users can delete own comments" ON public.comments;

CREATE POLICY "Anyone can view comments" ON public.comments FOR SELECT USING (true);
CREATE POLICY "Authenticated users can create comments" ON public.comments FOR INSERT WITH CHECK (user_id = get_my_profile_id());
CREATE POLICY "Users can delete own comments" ON public.comments FOR DELETE USING (user_id = get_my_profile_id());

-- MESSAGES
DROP POLICY IF EXISTS "Users can view own messages" ON public.messages;
DROP POLICY IF EXISTS "Authenticated users can send messages" ON public.messages;
DROP POLICY IF EXISTS "Recipients can update messages (mark read)" ON public.messages;

CREATE POLICY "Users can view own messages" ON public.messages FOR SELECT USING (sender_id = get_my_profile_id() OR recipient_id = get_my_profile_id());
CREATE POLICY "Authenticated users can send messages" ON public.messages FOR INSERT WITH CHECK (sender_id = get_my_profile_id());
CREATE POLICY "Recipients can update messages (mark read)" ON public.messages FOR UPDATE USING (recipient_id = get_my_profile_id());
