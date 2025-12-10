-- Add a SELECT policy for the trigger to work (internal reads)
CREATE POLICY "Allow select for member_number generation"
ON public.members
FOR SELECT
TO public
USING (true);