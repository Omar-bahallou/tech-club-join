-- Remove the public SELECT policy that exposes member data to everyone
-- The generate_member_number trigger uses SECURITY DEFINER so it bypasses RLS
DROP POLICY IF EXISTS "Allow select for member_number generation" ON public.members;