/*
  # Initial Schema Setup

  1. New Tables
    - `users`
      - `id` (uuid, primary key)
      - `email` (text, unique)
      - `role` (text)
      - `created_at` (timestamp)
    
    - `blog_posts`
      - `id` (uuid, primary key)
      - `title` (text)
      - `slug` (text, unique)
      - `content` (text)
      - `image_url` (text)
      - `author` (text)
      - `author_photo` (text)
      - `author_bio` (text)
      - `status` (text)
      - `meta_title` (text)
      - `meta_description` (text)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `programs`
      - `id` (uuid, primary key)
      - `title` (text)
      - `slug` (text, unique)
      - `description` (text)
      - `content` (text)
      - `image_url` (text)
      - `meta_title` (text)
      - `meta_description` (text)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `projects`
      - `id` (uuid, primary key)
      - `title` (text)
      - `slug` (text, unique)
      - `description` (text)
      - `content` (text)
      - `image_url` (text)
      - `status` (text)
      - `meta_title` (text)
      - `meta_description` (text)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `sections`
      - `id` (uuid, primary key)
      - `title` (text)
      - `content` (text)
      - `image_url` (text)
      - `sort_order` (integer)
      - `updated_at` (timestamp)
    
    - `site_config`
      - `id` (uuid, primary key)
      - `name` (text)
      - `meta_title` (text)
      - `meta_description` (text)
      - `logo_url` (text)
      - `favicon_url` (text)
      - `social_links` (jsonb)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  role text NOT NULL DEFAULT 'user',
  created_at timestamptz DEFAULT now()
);

-- Create blog_posts table
CREATE TABLE IF NOT EXISTS blog_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  content text,
  image_url text,
  author text,
  author_photo text,
  author_bio text,
  status text DEFAULT 'draft',
  meta_title text,
  meta_description text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create programs table
CREATE TABLE IF NOT EXISTS programs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  description text,
  content text,
  image_url text,
  meta_title text,
  meta_description text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create projects table
CREATE TABLE IF NOT EXISTS projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  description text,
  content text,
  image_url text,
  status text DEFAULT 'ongoing',
  meta_title text,
  meta_description text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create sections table
CREATE TABLE IF NOT EXISTS sections (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  content text,
  image_url text,
  sort_order integer NOT NULL DEFAULT 0,
  updated_at timestamptz DEFAULT now()
);

-- Create site_config table
CREATE TABLE IF NOT EXISTS site_config (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  meta_title text,
  meta_description text,
  logo_url text,
  favicon_url text,
  social_links jsonb DEFAULT '{}',
  updated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE programs ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_config ENABLE ROW LEVEL SECURITY;

-- Create policies for users
CREATE POLICY "Users can read own data"
  ON users
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

-- Create policies for blog_posts
CREATE POLICY "Anyone can read published blog posts"
  ON blog_posts
  FOR SELECT
  TO anon
  USING (status = 'published');

CREATE POLICY "Admin can manage all blog posts"
  ON blog_posts
  FOR ALL
  TO authenticated
  USING (auth.jwt()->>'email' = 'admin@fidipa.org');

-- Create policies for programs
CREATE POLICY "Anyone can read programs"
  ON programs
  FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Admin can manage programs"
  ON programs
  FOR ALL
  TO authenticated
  USING (auth.jwt()->>'email' = 'admin@fidipa.org');

-- Create policies for projects
CREATE POLICY "Anyone can read projects"
  ON projects
  FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Admin can manage projects"
  ON projects
  FOR ALL
  TO authenticated
  USING (auth.jwt()->>'email' = 'admin@fidipa.org');

-- Create policies for sections
CREATE POLICY "Anyone can read sections"
  ON sections
  FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Admin can manage sections"
  ON sections
  FOR ALL
  TO authenticated
  USING (auth.jwt()->>'email' = 'admin@fidipa.org');

-- Create policies for site_config
CREATE POLICY "Anyone can read site config"
  ON site_config
  FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Admin can manage site config"
  ON site_config
  FOR ALL
  TO authenticated
  USING (auth.jwt()->>'email' = 'admin@fidipa.org');