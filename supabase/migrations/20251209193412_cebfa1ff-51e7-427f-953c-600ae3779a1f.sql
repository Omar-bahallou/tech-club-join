-- Add unique constraint on email to prevent duplicates
ALTER TABLE public.members ADD CONSTRAINT members_email_unique UNIQUE (email);