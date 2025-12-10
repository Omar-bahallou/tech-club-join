-- Temporarily disable RLS to fix policies
ALTER TABLE public.members DISABLE ROW LEVEL SECURITY;

-- Drop all existing policies on members
DROP POLICY IF EXISTS "Public registration" ON public.members;
DROP POLICY IF EXISTS "Anyone can register as a member" ON public.members;
DROP POLICY IF EXISTS "Admins can view all members" ON public.members;
DROP POLICY IF EXISTS "Admins can update members" ON public.members;
DROP POLICY IF EXISTS "Admins can delete members" ON public.members;

-- Re-enable RLS
ALTER TABLE public.members ENABLE ROW LEVEL SECURITY;

-- Create a simple permissive INSERT policy for everyone
CREATE POLICY "Allow public insert"
ON public.members
FOR INSERT
TO public
WITH CHECK (true);

-- Create admin policies for other operations
CREATE POLICY "Admin select"
ON public.members
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admin update"
ON public.members
FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admin delete"
ON public.members
FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'::app_role));