-- Remove the public insert policy to prevent direct database inserts
-- Registrations now go through the secure edge function with rate limiting and honeypot protection
DROP POLICY IF EXISTS "Allow public insert" ON public.members;