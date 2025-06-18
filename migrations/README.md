# Database Migrations

This directory contains SQL migration files for the DLR Digital Tap application database.

## Migration Files

### 001_initial_schema.sql
Creates the initial database schema with three main tables:
- `votes`: Stores user votes for the Digital Tap campaign
- `comments`: Stores user comments and feedback
- `analytics`: Tracks user interactions and page views

### 002_seed_initial_data.sql
Seeds the database with initial data:
- Sample comments from early supporters
- 1458 initial votes to match the campaign progress

### 003_add_image_support.sql
Adds image upload support to the comments system:
- Adds `image_url` column to comments table
- Creates appropriate indexes

### 004_setup_rls.sql
Sets up Row Level Security (RLS) policies:
- Enables RLS on all tables
- Creates public read/insert policies for votes and comments
- Restricts analytics read access to authenticated users

### 005_update_comments_table.sql
Enhances the comments table with additional features:
- Adds likes, featured status, and approval status columns
- Adds updated_at timestamps to all tables
- Creates triggers for automatic timestamp updates

## Running Migrations

### Option 1: Manual Execution
1. Go to your Supabase dashboard
2. Navigate to the SQL Editor
3. Copy and paste each migration file in order
4. Execute each migration

### Option 2: Using the Migration Script
\`\`\`bash
npm run migrate
\`\`\`

## Migration Order

Always run migrations in numerical order:
1. 001_initial_schema.sql
2. 002_seed_initial_data.sql
3. 003_add_image_support.sql
4. 004_setup_rls.sql
5. 005_update_comments_table.sql

## Notes

- All migrations use `IF NOT EXISTS` and `ON CONFLICT DO NOTHING` to prevent errors when re-running
- Indexes are created for optimal query performance
- RLS policies ensure data security while allowing public interaction
- The schema supports the full feature set of the DLR Digital Tap application
