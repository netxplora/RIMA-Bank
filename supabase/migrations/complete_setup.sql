-- =============================================
-- RIVERS MFB - Complete Database Setup
-- Run this ENTIRE script in Supabase SQL Editor
-- Project: bfgjdjroeqvxacahfsky
-- =============================================

-- =============================================
-- STEP 1: CREATE CUSTOM ENUM TYPES
-- =============================================

CREATE TYPE public.app_role AS ENUM (
    'super_admin',
    'compliance_officer',
    'loan_officer',
    'content_editor',
    'viewer'
);

CREATE TYPE public.kyc_status AS ENUM (
    'pending',
    'submitted',
    'under_review',
    'approved',
    'rejected',
    'resubmit_required'
);

CREATE TYPE public.loan_status AS ENUM (
    'draft',
    'submitted',
    'under_review',
    'approved',
    'rejected',
    'disbursed',
    'closed'
);

CREATE TYPE public.verification_method AS ENUM (
    'nin',
    'bvn'
);


-- =============================================
-- STEP 2: CREATE TABLES
-- =============================================

-- 1. PROFILES
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id TEXT NOT NULL UNIQUE,
    first_name TEXT,
    last_name TEXT,
    middle_name TEXT,
    phone_number TEXT NOT NULL,
    email TEXT,
    date_of_birth DATE,
    gender TEXT,
    address TEXT,
    state TEXT,
    lga TEXT,
    bvn TEXT,
    bvn_verified BOOLEAN DEFAULT FALSE,
    nin TEXT,
    nin_verified BOOLEAN DEFAULT FALSE,
    phone_verified BOOLEAN DEFAULT FALSE,
    photo_url TEXT,
    account_number TEXT,
    kyc_status public.kyc_status DEFAULT 'pending',
    verification_method public.verification_method,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. USER ROLES
CREATE TABLE IF NOT EXISTS public.user_roles (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id TEXT NOT NULL,
    role public.app_role NOT NULL,
    assigned_by TEXT,
    assigned_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. AUDIT LOGS
CREATE TABLE IF NOT EXISTS public.audit_logs (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id TEXT,
    action TEXT NOT NULL,
    entity_type TEXT NOT NULL,
    entity_id TEXT,
    old_values JSONB,
    new_values JSONB,
    ip_address TEXT,
    user_agent TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. BRANCHES
CREATE TABLE IF NOT EXISTS public.branches (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    address TEXT NOT NULL,
    city TEXT NOT NULL,
    state TEXT DEFAULT 'Rivers',
    phone TEXT,
    email TEXT,
    opening_hours TEXT,
    latitude DOUBLE PRECISION,
    longitude DOUBLE PRECISION,
    manager_name TEXT,
    is_headquarters BOOLEAN DEFAULT FALSE,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. KYC DOCUMENTS
CREATE TABLE IF NOT EXISTS public.kyc_documents (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id TEXT NOT NULL,
    document_type TEXT NOT NULL,
    document_url TEXT NOT NULL,
    status public.kyc_status DEFAULT 'pending',
    rejection_reason TEXT,
    reviewed_by TEXT,
    reviewed_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. LOAN APPLICATIONS
CREATE TABLE IF NOT EXISTS public.loan_applications (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id TEXT NOT NULL,
    loan_type TEXT NOT NULL,
    amount NUMERIC NOT NULL,
    duration_months INTEGER NOT NULL,
    purpose TEXT NOT NULL,
    interest_rate NUMERIC,
    monthly_repayment NUMERIC,
    status public.loan_status DEFAULT 'draft',
    assigned_officer TEXT,
    approval_notes TEXT,
    rejection_reason TEXT,
    reviewed_by TEXT,
    reviewed_at TIMESTAMPTZ,
    disbursed_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. NEWS ARTICLES
CREATE TABLE IF NOT EXISTS public.news_articles (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    content TEXT NOT NULL,
    excerpt TEXT,
    featured_image TEXT,
    category TEXT,
    author_id TEXT,
    is_published BOOLEAN DEFAULT FALSE,
    published_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. CMS PAGES
CREATE TABLE IF NOT EXISTS public.cms_pages (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    content TEXT,
    meta_description TEXT,
    is_published BOOLEAN DEFAULT FALSE,
    published_at TIMESTAMPTZ,
    created_by TEXT,
    updated_by TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 9. OTP VERIFICATIONS
CREATE TABLE IF NOT EXISTS public.otp_verifications (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    phone_number TEXT NOT NULL,
    otp_code TEXT NOT NULL,
    expires_at TIMESTAMPTZ NOT NULL,
    verified BOOLEAN DEFAULT FALSE,
    attempts INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 10. CONTACT MESSAGES (NEW)
CREATE TABLE IF NOT EXISTS public.contact_messages (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    subject TEXT NOT NULL,
    message TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'open' CHECK (status IN ('open', 'pending', 'closed')),
    priority TEXT NOT NULL DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high')),
    admin_reply TEXT,
    replied_by UUID REFERENCES auth.users(id),
    replied_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);


-- =============================================
-- STEP 3: CREATE INDEXES
-- =============================================

CREATE INDEX idx_profiles_user_id ON public.profiles(user_id);
CREATE INDEX idx_profiles_phone ON public.profiles(phone_number);
CREATE INDEX idx_user_roles_user_id ON public.user_roles(user_id);
CREATE INDEX idx_audit_logs_user_id ON public.audit_logs(user_id);
CREATE INDEX idx_audit_logs_created_at ON public.audit_logs(created_at DESC);
CREATE INDEX idx_kyc_documents_user_id ON public.kyc_documents(user_id);
CREATE INDEX idx_loan_applications_user_id ON public.loan_applications(user_id);
CREATE INDEX idx_loan_applications_status ON public.loan_applications(status);
CREATE INDEX idx_news_articles_slug ON public.news_articles(slug);
CREATE INDEX idx_news_articles_published ON public.news_articles(is_published);
CREATE INDEX idx_cms_pages_slug ON public.cms_pages(slug);
CREATE INDEX idx_contact_messages_status ON public.contact_messages(status);
CREATE INDEX idx_contact_messages_created_at ON public.contact_messages(created_at DESC);


-- =============================================
-- STEP 4: ENABLE ROW LEVEL SECURITY (RLS)
-- =============================================

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.branches ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.kyc_documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.loan_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.news_articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cms_pages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.otp_verifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;


-- =============================================
-- STEP 5: RLS POLICIES
-- =============================================

-- PROFILES: Users can read/update their own profile, admins can read all
CREATE POLICY "Users can view own profile"
    ON public.profiles FOR SELECT
    TO authenticated
    USING (auth.uid()::text = user_id);

CREATE POLICY "Users can update own profile"
    ON public.profiles FOR UPDATE
    TO authenticated
    USING (auth.uid()::text = user_id)
    WITH CHECK (auth.uid()::text = user_id);

CREATE POLICY "Users can insert own profile"
    ON public.profiles FOR INSERT
    TO authenticated
    WITH CHECK (auth.uid()::text = user_id);

CREATE POLICY "Admins can view all profiles"
    ON public.profiles FOR SELECT
    TO authenticated
    USING (EXISTS (SELECT 1 FROM public.user_roles WHERE user_roles.user_id = auth.uid()::text AND user_roles.role = 'super_admin'));

-- USER ROLES: Only admins can manage roles
CREATE POLICY "Admins can view all roles"
    ON public.user_roles FOR SELECT
    TO authenticated
    USING (true);

CREATE POLICY "Admins can insert roles"
    ON public.user_roles FOR INSERT
    TO authenticated
    WITH CHECK (EXISTS (SELECT 1 FROM public.user_roles WHERE user_roles.user_id = auth.uid()::text AND user_roles.role = 'super_admin'));

CREATE POLICY "Admins can update roles"
    ON public.user_roles FOR UPDATE
    TO authenticated
    USING (EXISTS (SELECT 1 FROM public.user_roles WHERE user_roles.user_id = auth.uid()::text AND user_roles.role = 'super_admin'));

-- AUDIT LOGS: Only authenticated users can view
CREATE POLICY "Authenticated can view audit logs"
    ON public.audit_logs FOR SELECT
    TO authenticated
    USING (true);

CREATE POLICY "Authenticated can insert audit logs"
    ON public.audit_logs FOR INSERT
    TO authenticated
    WITH CHECK (true);

-- BRANCHES: Anyone can read, admins can modify
CREATE POLICY "Anyone can view branches"
    ON public.branches FOR SELECT
    TO anon, authenticated
    USING (true);

CREATE POLICY "Admins can manage branches"
    ON public.branches FOR ALL
    TO authenticated
    USING (EXISTS (SELECT 1 FROM public.user_roles WHERE user_roles.user_id = auth.uid()::text AND user_roles.role = 'super_admin'));

-- KYC DOCUMENTS: Users can manage their own, admins can view all
CREATE POLICY "Users can view own KYC docs"
    ON public.kyc_documents FOR SELECT
    TO authenticated
    USING (auth.uid()::text = user_id);

CREATE POLICY "Users can insert own KYC docs"
    ON public.kyc_documents FOR INSERT
    TO authenticated
    WITH CHECK (auth.uid()::text = user_id);

CREATE POLICY "Admins can view all KYC docs"
    ON public.kyc_documents FOR SELECT
    TO authenticated
    USING (EXISTS (SELECT 1 FROM public.user_roles WHERE user_roles.user_id = auth.uid()::text AND user_roles.role IN ('super_admin', 'compliance_officer')));

CREATE POLICY "Admins can update KYC docs"
    ON public.kyc_documents FOR UPDATE
    TO authenticated
    USING (EXISTS (SELECT 1 FROM public.user_roles WHERE user_roles.user_id = auth.uid()::text AND user_roles.role IN ('super_admin', 'compliance_officer')));

-- LOAN APPLICATIONS: Users can manage own, admins can view/update all
CREATE POLICY "Users can view own loans"
    ON public.loan_applications FOR SELECT
    TO authenticated
    USING (auth.uid()::text = user_id);

CREATE POLICY "Users can insert own loans"
    ON public.loan_applications FOR INSERT
    TO authenticated
    WITH CHECK (auth.uid()::text = user_id);

CREATE POLICY "Admins can view all loans"
    ON public.loan_applications FOR SELECT
    TO authenticated
    USING (EXISTS (SELECT 1 FROM public.user_roles WHERE user_roles.user_id = auth.uid()::text AND user_roles.role IN ('super_admin', 'loan_officer')));

CREATE POLICY "Admins can update loans"
    ON public.loan_applications FOR UPDATE
    TO authenticated
    USING (EXISTS (SELECT 1 FROM public.user_roles WHERE user_roles.user_id = auth.uid()::text AND user_roles.role IN ('super_admin', 'loan_officer')));

-- NEWS ARTICLES: Anyone can read published, admins can manage
CREATE POLICY "Anyone can view published articles"
    ON public.news_articles FOR SELECT
    TO anon, authenticated
    USING (is_published = true);

CREATE POLICY "Admins can manage articles"
    ON public.news_articles FOR ALL
    TO authenticated
    USING (EXISTS (SELECT 1 FROM public.user_roles WHERE user_roles.user_id = auth.uid()::text AND user_roles.role IN ('super_admin', 'content_editor')));

-- CMS PAGES: Anyone can read published, admins can manage
CREATE POLICY "Anyone can view published pages"
    ON public.cms_pages FOR SELECT
    TO anon, authenticated
    USING (is_published = true);

CREATE POLICY "Admins can manage pages"
    ON public.cms_pages FOR ALL
    TO authenticated
    USING (EXISTS (SELECT 1 FROM public.user_roles WHERE user_roles.user_id = auth.uid()::text AND user_roles.role IN ('super_admin', 'content_editor')));

-- OTP VERIFICATIONS: Service-level access
CREATE POLICY "Authenticated can manage OTP"
    ON public.otp_verifications FOR ALL
    TO authenticated
    USING (true)
    WITH CHECK (true);

CREATE POLICY "Anon can insert OTP"
    ON public.otp_verifications FOR INSERT
    TO anon
    WITH CHECK (true);

-- CONTACT MESSAGES: Anyone can submit, authenticated can view/update
CREATE POLICY "Anyone can submit contact messages"
    ON public.contact_messages FOR INSERT
    TO anon, authenticated
    WITH CHECK (true);

CREATE POLICY "Authenticated can view contact messages"
    ON public.contact_messages FOR SELECT
    TO authenticated
    USING (true);

CREATE POLICY "Authenticated can update contact messages"
    ON public.contact_messages FOR UPDATE
    TO authenticated
    USING (true)
    WITH CHECK (true);


-- =============================================
-- STEP 6: HELPER FUNCTIONS
-- =============================================

-- Check if user has a specific role
CREATE OR REPLACE FUNCTION public.has_role(_role public.app_role, _user_id TEXT)
RETURNS BOOLEAN AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 FROM public.user_roles
        WHERE user_roles.user_id = _user_id
        AND user_roles.role = _role
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Check if user is admin
CREATE OR REPLACE FUNCTION public.is_admin(_user_id TEXT)
RETURNS BOOLEAN AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 FROM public.user_roles
        WHERE user_roles.user_id = _user_id
        AND user_roles.role = 'super_admin'
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;


-- =============================================
-- STEP 7: AUTO-UPDATE TIMESTAMPS
-- =============================================

CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_profiles_timestamp
    BEFORE UPDATE ON public.profiles
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_branches_timestamp
    BEFORE UPDATE ON public.branches
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_kyc_documents_timestamp
    BEFORE UPDATE ON public.kyc_documents
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_loan_applications_timestamp
    BEFORE UPDATE ON public.loan_applications
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_news_articles_timestamp
    BEFORE UPDATE ON public.news_articles
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_cms_pages_timestamp
    BEFORE UPDATE ON public.cms_pages
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_contact_messages_timestamp
    BEFORE UPDATE ON public.contact_messages
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();


-- =============================================
-- STEP 8: SEED DATA - Default Branches
-- =============================================

INSERT INTO public.branches (name, address, city, state, phone, opening_hours, latitude, longitude, is_headquarters)
VALUES
    ('Head Office', 'No. 3 Evo Crescent, New GRA, Port Harcourt', 'Port Harcourt', 'Rivers', '+234 800 000 0000', 'Mon - Fri: 8am - 4pm', 4.796590, 7.011886, true),
    ('Oyigbo Branch', '45 Old Aba Road, Oyigbo', 'Oyigbo', 'Rivers', '+234 800 111 1111', 'Mon - Fri: 8am - 4pm', 4.8624, 7.1352, false),
    ('Mile 1 Branch', '10 Ikwerre Road, Mile 1 Diobu', 'Port Harcourt', 'Rivers', '+234 800 222 2222', 'Mon - Fri: 8am - 4pm', 4.7856, 7.0012, false),
    ('Trans-Amadi Branch', 'Plot 15 Trans-Amadi Industrial Layout', 'Port Harcourt', 'Rivers', '+234 800 333 3333', 'Mon - Fri: 8am - 4pm', 4.8091, 7.0504, false);


-- =============================================
-- DONE! All tables, enums, functions, policies,
-- and seed data have been created.
-- =============================================
