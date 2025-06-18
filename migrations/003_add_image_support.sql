-- Add image_url column to comments table if it doesn't exist
ALTER TABLE comments 
ADD COLUMN IF NOT EXISTS image_url TEXT;

-- Create index for image_url column
CREATE INDEX IF NOT EXISTS idx_comments_image_url ON comments(image_url) WHERE image_url IS NOT NULL;
