import { createClient } from "https://esm.sh/@supabase/supabase-js@1.35.7"

/* import { environment as prodEnvironment } from '/src/environments/environment.prod.ts';
import { environment as localEnvironment } from '/src/environments/environment.ts'; */

export const supabaseClient = createClient(
    // Supabase API URL - env var exported by default when deployed.
    // Deploy prod
    // Deno.env.get(prodEnvironment.supabaseUrl) ?? '',
    // Deploy local
    // Deno.env.get('https://ehsbtpkdyyzoipqdmmvv.supabase.co') ?? '',
    'https://ehsbtpkdyyzoipqdmmvv.supabase.co',
    // Supabase API ANON KEY - env var exported by default when deployed.
    // Deploy prod
    // Deno.env.get(prodEnvironment.supabaseKey) ?? ''
    // Deploy local
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVoc2J0cGtkeXl6b2lwcWRtbXZ2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTQxNjk1MzIsImV4cCI6MTk2OTc0NTUzMn0.RCp3gX4QRQx4ylZLTj98aMvjYVfxsPeSIXksOrBm6RI'
    // Deno.env.get('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVoc2J0cGtkeXl6b2lwcWRtbXZ2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTQxNjk1MzIsImV4cCI6MTk2OTc0NTUzMn0.RCp3gX4QRQx4ylZLTj98aMvjYVfxsPeSIXksOrBm6RI') ?? ''
  )