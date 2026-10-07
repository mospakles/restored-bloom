-- Restored Bloom, Supabase Database Schema
-- Run this in your Supabase SQL editor to set up the database

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ─────────────────────────────────────────────
-- USERS
-- ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  role TEXT NOT NULL DEFAULT 'user' CHECK (role IN ('user', 'admin', 'moderator', 'volunteer')),
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ─────────────────────────────────────────────
-- RESOURCES
-- ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS resources (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  excerpt TEXT NOT NULL,
  content TEXT NOT NULL DEFAULT '',
  category TEXT NOT NULL CHECK (category IN ('survivors','parents','teenagers','women','faith','sexual-health','counseling','legal','emergency')),
  tags TEXT[] DEFAULT '{}',
  author TEXT,
  read_time INT,
  image_url TEXT,
  published BOOLEAN DEFAULT FALSE,
  featured BOOLEAN DEFAULT FALSE,
  downloadable BOOLEAN DEFAULT FALSE,
  download_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ─────────────────────────────────────────────
-- STORIES
-- ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS stories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  content TEXT NOT NULL,
  author_alias TEXT,
  category TEXT NOT NULL CHECK (category IN ('adult-survivor','teen-survivor','male-survivor','parent','caregiver','faith-journey','recovery')),
  is_anonymous BOOLEAN DEFAULT TRUE,
  is_published BOOLEAN DEFAULT FALSE,
  trigger_warning BOOLEAN DEFAULT FALSE,
  helpful_count INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ─────────────────────────────────────────────
-- HELP REQUESTS
-- ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS help_requests (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  reference_code TEXT UNIQUE NOT NULL,
  name TEXT,
  email TEXT,
  phone TEXT,
  contact_method TEXT DEFAULT 'none' CHECK (contact_method IN ('none','email','phone','check-back')),
  message TEXT NOT NULL,
  is_anonymous BOOLEAN DEFAULT TRUE,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending','in-review','responded','closed')),
  category TEXT NOT NULL CHECK (category IN ('abuse-support','sexual-health','counseling','legal','emergency','other')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ─────────────────────────────────────────────
-- VOLUNTEER APPLICATIONS
-- ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS volunteer_applications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('therapist','counselor','social-worker','lawyer','child-advocate','medical','faith-leader','educator','content-writer','tech-volunteer')),
  organization TEXT,
  qualifications TEXT NOT NULL,
  experience TEXT NOT NULL,
  motivation TEXT NOT NULL,
  credentials_url TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending','under-review','approved','rejected')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ─────────────────────────────────────────────
-- PRAYER REQUESTS
-- ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS prayer_requests (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  request TEXT NOT NULL,
  is_anonymous BOOLEAN DEFAULT TRUE,
  author_name TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ─────────────────────────────────────────────
-- SAVED RESOURCES (User Bookmarks)
-- ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS saved_resources (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  resource_id UUID REFERENCES resources(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, resource_id)
);

-- ─────────────────────────────────────────────
-- ROW LEVEL SECURITY (RLS)
-- ─────────────────────────────────────────────
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE resources ENABLE ROW LEVEL SECURITY;
ALTER TABLE stories ENABLE ROW LEVEL SECURITY;
ALTER TABLE help_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE volunteer_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE prayer_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE saved_resources ENABLE ROW LEVEL SECURITY;

-- Resources: anyone can read published resources
CREATE POLICY "Public can read published resources" ON resources FOR SELECT USING (published = TRUE);

-- Stories: anyone can read published stories
CREATE POLICY "Public can read published stories" ON stories FOR SELECT USING (is_published = TRUE);

-- Help requests: anyone can insert
CREATE POLICY "Anyone can submit help requests" ON help_requests FOR INSERT WITH CHECK (TRUE);

-- Stories: anyone can submit
CREATE POLICY "Anyone can submit stories" ON stories FOR INSERT WITH CHECK (TRUE);

-- Volunteer applications: anyone can apply
CREATE POLICY "Anyone can apply to volunteer" ON volunteer_applications FOR INSERT WITH CHECK (TRUE);

-- Prayer requests: anyone can submit
CREATE POLICY "Anyone can submit prayer requests" ON prayer_requests FOR INSERT WITH CHECK (TRUE);

-- Users can read their own data
CREATE POLICY "Users can read own data" ON users FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own data" ON users FOR UPDATE USING (auth.uid() = id);

-- Saved resources: users manage their own
CREATE POLICY "Users manage own saved resources" ON saved_resources FOR ALL USING (auth.uid() = user_id);

-- ─────────────────────────────────────────────
-- INDEXES
-- ─────────────────────────────────────────────
CREATE INDEX IF NOT EXISTS idx_resources_category ON resources(category);
CREATE INDEX IF NOT EXISTS idx_resources_slug ON resources(slug);
CREATE INDEX IF NOT EXISTS idx_stories_category ON stories(category);
CREATE INDEX IF NOT EXISTS idx_help_requests_reference ON help_requests(reference_code);
CREATE INDEX IF NOT EXISTS idx_help_requests_status ON help_requests(status);
