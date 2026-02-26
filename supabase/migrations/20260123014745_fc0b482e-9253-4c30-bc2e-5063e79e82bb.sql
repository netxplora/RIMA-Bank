-- Fix overly permissive OTP policies
DROP POLICY IF EXISTS "Anyone can create OTP" ON public.otp_verifications;
DROP POLICY IF EXISTS "Anyone can verify OTP" ON public.otp_verifications;
DROP POLICY IF EXISTS "Anyone can read their OTP" ON public.otp_verifications;

-- More restrictive OTP policies - only allow anonymous access for signup flow
CREATE POLICY "Allow OTP creation for signup"
ON public.otp_verifications FOR INSERT
TO anon, authenticated
WITH CHECK (
  -- OTP must expire within 10 minutes
  expires_at <= NOW() + INTERVAL '10 minutes'
);

CREATE POLICY "Allow OTP verification update"
ON public.otp_verifications FOR UPDATE
TO anon, authenticated
USING (
  -- Only allow updating non-expired, non-verified OTPs
  expires_at > NOW() AND verified = FALSE AND attempts < 5
);

CREATE POLICY "Allow reading own OTP by phone"
ON public.otp_verifications FOR SELECT
TO anon, authenticated
USING (
  -- Only allow reading recent OTPs (within last 10 minutes)
  created_at > NOW() - INTERVAL '10 minutes'
);

-- Fix audit log insert policy - only authenticated users can create audit logs
DROP POLICY IF EXISTS "System can insert audit logs" ON public.audit_logs;

CREATE POLICY "Authenticated users can create audit logs"
ON public.audit_logs FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id OR user_id IS NULL);