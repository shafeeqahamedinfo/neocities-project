/*
  # Create Discussion Board Schema

  1. New Tables
    - `posts`
      - `id` (uuid, primary key)
      - `title` (text, required)
      - `subject` (text, required)
      - `description` (text, required)
      - `author` (text, required)
      - `author_type` (text, required - student or teacher)
      - `created_at` (timestamp with timezone)
      - `updated_at` (timestamp with timezone)
    - `replies`
      - `id` (uuid, primary key)
      - `content` (text, required)
      - `author` (text, required)
      - `author_type` (text, required - student or teacher)
      - `post_id` (uuid, foreign key to posts)
      - `created_at` (timestamp with timezone)
      - `updated_at` (timestamp with timezone)

  2. Security
    - Enable RLS on both tables
    - Add policies for public read and write access (as per original schema)

  3. Indexes
    - Index on posts.created_at for sorting
    - Index on posts.subject for filtering
    - Index on replies.post_id for joins
    - Index on replies.created_at for sorting

  4. Constraints
    - Check constraints for author_type values
    - Foreign key constraint from replies to posts with cascade delete
*/

-- Create posts table
CREATE TABLE IF NOT EXISTS posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  subject text NOT NULL,
  description text NOT NULL,
  author text NOT NULL,
  author_type text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create replies table
CREATE TABLE IF NOT EXISTS replies (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  content text NOT NULL,
  author text NOT NULL,
  author_type text NOT NULL,
  post_id uuid NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Add check constraints for author_type
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.table_constraints
    WHERE constraint_name = 'posts_author_type_check'
    AND table_name = 'posts'
  ) THEN
    ALTER TABLE posts ADD CONSTRAINT posts_author_type_check 
    CHECK (author_type = ANY (ARRAY['student'::text, 'teacher'::text]));
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.table_constraints
    WHERE constraint_name = 'replies_author_type_check'
    AND table_name = 'replies'
  ) THEN
    ALTER TABLE replies ADD CONSTRAINT replies_author_type_check 
    CHECK (author_type = ANY (ARRAY['student'::text, 'teacher'::text]));
  END IF;
END $$;

-- Add foreign key constraint
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.table_constraints
    WHERE constraint_name = 'replies_post_id_fkey'
    AND table_name = 'replies'
  ) THEN
    ALTER TABLE replies ADD CONSTRAINT replies_post_id_fkey 
    FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE;
  END IF;
END $$;

-- Create indexes
CREATE INDEX IF NOT EXISTS posts_created_at_idx ON posts (created_at DESC);
CREATE INDEX IF NOT EXISTS posts_subject_idx ON posts (subject);
CREATE INDEX IF NOT EXISTS replies_post_id_idx ON replies (post_id);
CREATE INDEX IF NOT EXISTS replies_created_at_idx ON replies (created_at DESC);

-- Enable Row Level Security
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE replies ENABLE ROW LEVEL SECURITY;

-- Create policies for posts
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'posts' AND policyname = 'Anyone can view posts'
  ) THEN
    CREATE POLICY "Anyone can view posts"
      ON posts
      FOR SELECT
      TO public
      USING (true);
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'posts' AND policyname = 'Anyone can create posts'
  ) THEN
    CREATE POLICY "Anyone can create posts"
      ON posts
      FOR INSERT
      TO public
      WITH CHECK (true);
  END IF;
END $$;

-- Create policies for replies
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'replies' AND policyname = 'Anyone can view replies'
  ) THEN
    CREATE POLICY "Anyone can view replies"
      ON replies
      FOR SELECT
      TO public
      USING (true);
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'replies' AND policyname = 'Anyone can create replies'
  ) THEN
    CREATE POLICY "Anyone can create replies"
      ON replies
      FOR INSERT
      TO public
      WITH CHECK (true);
  END IF;
END $$;