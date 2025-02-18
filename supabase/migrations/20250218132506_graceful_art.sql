/*
  # Add missing columns and create team tables
  
  1. Changes
    - Add sections column to site_config table
    - Create team_members table
    - Create board_members table
  
  2. Security
    - Enable RLS on new tables
    - Add policies for public read access
    - Add policies for admin write access
*/

-- Add sections column to site_config
ALTER TABLE site_config 
ADD COLUMN IF NOT EXISTS sections jsonb DEFAULT '{"home":true,"about":true,"programs":true,"projects":true,"team":true,"blog":true,"contact":true}';

-- Create team_members table
CREATE TABLE IF NOT EXISTS team_members (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  role text NOT NULL,
  photo_url text,
  sort_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create board_members table
CREATE TABLE IF NOT EXISTS board_members (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  role text NOT NULL,
  photo_url text,
  sort_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE board_members ENABLE ROW LEVEL SECURITY;

-- Create policies for team_members
CREATE POLICY "Anyone can read team members"
  ON team_members
  FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Admin can manage team members"
  ON team_members
  FOR ALL
  TO authenticated
  USING (auth.jwt()->>'email' = 'admin@fidipa.org');

-- Create policies for board_members
CREATE POLICY "Anyone can read board members"
  ON board_members
  FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Admin can manage board members"
  ON board_members
  FOR ALL
  TO authenticated
  USING (auth.jwt()->>'email' = 'admin@fidipa.org');