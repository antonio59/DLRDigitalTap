import { createClient } from '@supabase/supabase-js'

// Load environment variables
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.error('Error: Missing Supabase environment variables.')
  process.exit(1)
}

// Initialize Supabase client
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)

async function keepAlive() {
  console.log('Starting Supabase keep-alive check...')
  
  try {
    // Perform a lightweight query to the 'votes' table (just counting 1 row)
    // This wakes up the database if it's paused
    const { count, error } = await supabase
      .from('votes')
      .select('*', { count: 'exact', head: true })
      .limit(1)

    if (error) {
      console.error('Error pinging Supabase:', error.message)
      process.exit(1)
    }

    console.log(`Successfully pinged Supabase. Current vote count: ${count}`)
    console.log('Database is active.')
  } catch (err) {
    console.error('Unexpected error:', err)
    process.exit(1)
  }
}

keepAlive()
