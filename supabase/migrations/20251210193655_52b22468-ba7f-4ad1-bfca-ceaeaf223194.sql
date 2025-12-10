-- Drop the restrictive policy
DROP POLICY IF EXISTS "Anyone can register as a member" ON public.members;

-- Create a PERMISSIVE policy that allows anyone to insert
CREATE POLICY "Anyone can register as a member"
ON public.members
FOR INSERT
TO anon, authenticated
WITH CHECK (true);