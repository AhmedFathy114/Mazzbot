const SUPABASE_URL = "https://ozfgvyjqwwuslgamgein.supabase.co";

const SUPABASE_ANON_KEY =
"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im96Zmd2eWpxd3d1c2xnYW1nZWluIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODU2MDQxMjUsImV4cCI6MjEwMTE4MDEyNX0.-LMbNzzQfApqKMAW6hh2FvhdVJFzXXm0vUkytZDzACk";

window.supabaseClient = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_ANON_KEY
);