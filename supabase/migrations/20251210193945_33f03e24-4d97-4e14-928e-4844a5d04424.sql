-- Drop existing INSERT policy
DROP POLICY IF EXISTS "Anyone can register as a member" ON public.members;

-- Create new PERMISSIVE INSERT policy explicitly
CREATE POLICY "Public registration"
ON public.members
AS PERMISSIVE
FOR INSERT
TO public
WITH CHECK (true);