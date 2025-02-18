/*
  # Add initial data for all sections
  
  1. Initial Data
    - Add staff members
    - Add board members
    - Add home sections
    - Add site configuration
*/

-- Insert staff members
INSERT INTO team_members (name, role, sort_order) VALUES
  ('Ms Jayne A. I. Wasonga', 'Board Secretary and Chief Executive Officer', 1),
  ('Ms Jesca Mitaya', 'Finance and Administration FAM Manager', 2),
  ('Ms Linda Otieno', 'Project Lead (Volunteer)', 3),
  ('Rev. Walter Ang''ienda', 'Program Officer Peace Project (Volunteer)', 4),
  ('Phillip Noel', 'Volunteer, Soft Skills (Water and Sanitation)', 5),
  ('Jackson Lesian', 'Office Assistant/Driver', 6),
  ('Jamima Mtuli', 'Administer/Programs Assistant', 7);

-- Insert board members
INSERT INTO board_members (name, role, sort_order) VALUES
  ('Mrs Rosemary Meyo', 'Chairperson', 1),
  ('Dr. Josephine Munthali', 'Vice Chairperson', 2),
  ('Ms Jayne A. Wasonga', 'Chief Executive Officer and Board Secretary', 3),
  ('Sr. Mildred Mayeye', 'Treasurer', 4),
  ('Dr. Rev. Simon Oriedo', 'Member', 5),
  ('Mr. Samwel Otieno', 'Committee Member', 6),
  ('Prof. Esther Mombo', 'Committee Member', 7);

-- Insert home sections
INSERT INTO sections (title, content, image_url, sort_order) VALUES
  ('Empowering Communities', 'Building sustainable solutions for poverty alleviation through community-driven initiatives.', 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=1600', 1),
  ('Gender Equality', 'Promoting equal opportunities and social inclusion through comprehensive programs.', 'https://images.unsplash.com/photo-1523966211575-eb4a01e7dd51?auto=format&fit=crop&q=80&w=1600', 2),
  ('Sustainable Development', 'Implementing innovative approaches to create lasting positive change in communities.', 'https://images.unsplash.com/photo-1596526131083-e8c633c948d2?auto=format&fit=crop&q=80&w=1600', 3);

-- Insert or update site config
INSERT INTO site_config (id, name, meta_title, meta_description, social_links, sections)
VALUES (
  gen_random_uuid(),
  'FIDIPA',
  'FIDIPA - Friendly Integrated Development Initiative in Poverty Alleviation',
  'A holistic peaceful and democratic society with justice for all',
  '{"facebook": "https://facebook.com/fidipa", "twitter": "https://twitter.com/fidipa"}',
  '{"home":true,"about":true,"programs":true,"projects":true,"team":true,"blog":true,"contact":true}'
)
ON CONFLICT (id) DO UPDATE
SET 
  name = EXCLUDED.name,
  meta_title = EXCLUDED.meta_title,
  meta_description = EXCLUDED.meta_description,
  social_links = EXCLUDED.social_links,
  sections = EXCLUDED.sections;