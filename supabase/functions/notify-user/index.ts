// deno-lint-ignore-file no-explicit-any
// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

import { serve } from "https://deno.land/std@0.131.0/http/server.ts"
import { supabaseClient } from '../_shared/supabaseClient.ts'

console.log("Hello from Functions!")

serve(async (req: any) => {
  const data_in: { 
    notifier_in: string,
    notifying_in: string,
    handler_in: string,
    title_in: string,
    message_in: string,
    type_in: string,
    for_admins_in: boolean
  } = await req.json()
  const data = {
    message: `
    Data received:
    ${data_in.notifier_in}
    ${data_in.notifying_in}
    ${data_in.handler_in}
    ${data_in.title_in}
    ${data_in.message_in}
    ${data_in.type_in}
    ${data_in.for_admins_in}
    !`,
  }

  try {
    // supabaseClient.auth.setAuth(req.headers.get('Authorization')!.replace('Bearer ', ''))

    const insertNotification: { data: any, error: any } = await supabaseClient
    .rpc('insert_notification_from_profile', 
      {
        notifier_in: data_in.notifier_in,
        notifying_in: data_in.notifying_in,
        handler_in: data_in.handler_in,
        title_in: data_in.title_in,
        message_in: data_in.message_in,
        type_in: data_in.type_in,
        for_admins_in: data_in.for_admins_in
      }
    )

    return new Response(
      JSON.stringify(data, insertNotification.data),
      { headers: { "Content-Type": "application/json" } },
    )

  } catch(error: any) {
    return new Response(
      JSON.stringify({error: error.message}),
      { headers: { "Content-Type": "application/json" } },
    )
  }
})

// To invoke:
/* curl -i --location --request POST 'http://localhost:54321/functions/v1/' \
   --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24ifQ.625_WdcF3KHqz5amU0x2X5WWHP-OEs_4qj0ssLNHzTs' \
   --header 'Content-Type: application/json' \
   --data '{
    "notifier_in":"d760b853-767f-4279-b69e-3f6b595dadda", 
    "notifying_in": "467732d4-0113-4bb6-80b3-ab251c48ed83",
    "handler_in": "467732d4-0113-4bb6-80b3-ab251c48ed83", 
    "title_in": "Neue Subscription", 
    "message_in": "Du hast erfolgreich zu Notifications Subscribed", 
    "type_in": "System",
    "for_admins_in": false
  }' */

  /*
  curl -L -X POST 'https://ehsbtpkdyyzoipqdmmvv.functions.supabase.co/notify-user' -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVoc2J0cGtkeXl6b2lwcWRtbXZ2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTQxNjk1MzIsImV4cCI6MTk2OTc0NTUzMn0.RCp3gX4QRQx4ylZLTj98aMvjYVfxsPeSIXksOrBm6RI' \
  --data '{
    "notifier_in":"d760b853-767f-4279-b69e-3f6b595dadda", 
    "notifying_in": "467732d4-0113-4bb6-80b3-ab251c48ed83",
    "handler_in": "467732d4-0113-4bb6-80b3-ab251c48ed83", 
    "title_in": "Neue Subscription", 
    "message_in": "Du hast erfolgreich zu Notifications Subscribed", 
    "type_in": "System",
    "for_admins_in": false
  }'
  */
