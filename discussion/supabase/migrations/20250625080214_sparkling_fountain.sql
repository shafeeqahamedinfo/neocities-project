/*
  # Create posts and replies tables for EduConnect

  1. New Tables
    - `posts`
      - `id` (uuid, primary key)
      - `title` (text)
      - `subject` (text)
      - `description` (text)
      - `author` (text)
      - `author_type` (text - 'student' or 'teacher')
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `replies`
      - `id` (uuid, primary key)
      - `content` (text)
      - `author` (text)
      - `author_type` (text - 'student' or 'teacher')
      - `post_id` (uuid, foreign key)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on both tables
    - Add policies for public read access
    - Add policies for authenticated users to create posts and replies
*/

-- Create posts table
CREATE TABLE IF NOT EXISTS posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  subject text NOT NULL,
  description text NOT NULL,
  author text NOT NULL,
  author_type text NOT NULL CHECK (author_type IN ('student', 'teacher')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create replies table
CREATE TABLE IF NOT EXISTS replies (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  content text NOT NULL,
  author text NOT NULL,
  author_type text NOT NULL CHECK (author_type IN ('student', 'teacher')),
  post_id uuid NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE replies ENABLE ROW LEVEL SECURITY;

-- Create policies for posts
CREATE POLICY "Anyone can view posts"
  ON posts
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Anyone can create posts"
  ON posts
  FOR INSERT
  TO public
  WITH CHECK (true);

-- Create policies for replies
CREATE POLICY "Anyone can view replies"
  ON replies
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Anyone can create replies"
  ON replies
  FOR INSERT
  TO public
  WITH CHECK (true);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS posts_created_at_idx ON posts(created_at DESC);
CREATE INDEX IF NOT EXISTS posts_subject_idx ON posts(subject);
CREATE INDEX IF NOT EXISTS replies_post_id_idx ON replies(post_id);
CREATE INDEX IF NOT EXISTS replies_created_at_idx ON replies(created_at DESC);

-- Insert sample data
INSERT INTO posts (title, subject, description, author, author_type) VALUES
  ('How to solve quadratic equations?', 'Mathematics', 'I am having trouble understanding the quadratic formula and when to use it. Can someone explain the steps clearly?', 'Alice Student', 'student'),
  ('Understanding photosynthesis process', 'Biology', 'What are the light and dark reactions in photosynthesis? How do they work together?', 'Bob Wilson', 'student'),
  ('Newton''s laws of motion confusion', 'Physics', 'I understand the first law, but I''m confused about the relationship between the second and third laws. Can someone help clarify?', 'Carol Davis', 'student');

-- Insert sample replies
INSERT INTO replies (content, author, author_type, post_id) VALUES
  ('The quadratic formula is x = (-b ± √(b²-4ac)) / 2a. First, identify a, b, and c from your equation ax² + bx + c = 0, then substitute these values into the formula.', 'Prof. Smith', 'teacher', (SELECT id FROM posts WHERE title = 'How to solve quadratic equations?')),
  ('Great question! The second law (F=ma) describes how force affects motion, while the third law states that every action has an equal and opposite reaction. They work together - when you apply force (2nd law), there''s always a reaction force (3rd law).', 'Dr. Johnson', 'teacher', (SELECT id FROM posts WHERE title = 'Newton''s laws of motion confusion')),
  ('Think of walking: you push backward on the ground (action), and the ground pushes you forward (reaction). The force you apply determines your acceleration (F=ma).', 'Prof. Lee', 'teacher', (SELECT id FROM posts WHERE title = 'Newton''s laws of motion confusion'));