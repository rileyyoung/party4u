
-- Add gating fields to events
ALTER TABLE public.events
ADD COLUMN requires_approval boolean NOT NULL DEFAULT false,
ADD COLUMN gate_question text DEFAULT NULL;

-- Add status and answer to registrations
ALTER TABLE public.registrations
ADD COLUMN status text NOT NULL DEFAULT 'approved',
ADD COLUMN gate_answer text DEFAULT NULL;

-- Update RLS: organizers need to see all registrations for their events
CREATE POLICY "Organizers can view registrations for their events"
ON public.registrations
FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM public.events
    WHERE events.id = registrations.event_id
    AND events.organizer_id = get_my_profile_id()
  )
);

-- Organizers can update registration status (approve/deny)
CREATE POLICY "Organizers can update registration status"
ON public.registrations
FOR UPDATE
USING (
  EXISTS (
    SELECT 1 FROM public.events
    WHERE events.id = registrations.event_id
    AND events.organizer_id = get_my_profile_id()
  )
);

-- Let anyone see registrations for public view (attendee list) — only approved ones
-- We need to update the existing select policy or add a new one for approved registrations
CREATE POLICY "Anyone can view approved registrations"
ON public.registrations
FOR SELECT
USING (status = 'approved');
