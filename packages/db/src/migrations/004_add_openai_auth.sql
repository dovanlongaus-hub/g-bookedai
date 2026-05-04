-- Add OpenAI OAuth support columns to users table
ALTER TABLE users ADD COLUMN IF NOT EXISTS openai_sub TEXT;
ALTER TABLE users ADD COLUMN IF NOT EXISTS auth_provider TEXT DEFAULT 'firebase';

-- Index for OpenAI user lookup
CREATE INDEX IF NOT EXISTS idx_users_openai_sub ON users(openai_sub) WHERE openai_sub IS NOT NULL;
