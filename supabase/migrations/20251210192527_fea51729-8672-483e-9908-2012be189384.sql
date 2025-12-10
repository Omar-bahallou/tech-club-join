-- Drop the existing insert policy
DROP POLICY IF EXISTS "Anyone can register as a member" ON public.members;

-- Create a new policy that explicitly allows anonymous users to insert
CREATE POLICY "Anyone can register as a member"
ON public.members
FOR INSERT
TO anon, authenticated
WITH CHECK (true);