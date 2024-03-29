// deno-lint-ignore-file no-explicit-any
// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

import { serve } from "https://deno.land/std@0.131.0/http/server.ts"
import { supabaseClient } from '../_shared/supabaseClient.ts'

console.log("Hello from Functions, right?!")

serve(async (req: any) => {
  const data_in: { 
    notifier: string,
    notifying: string,
    handler: string,
    title: string,
    message: string,
    type: string,
    for_admins: boolean
  } = await req.json()
  const data = {
    message: `
    Data received:
    ${data_in.notifier}
    ${data_in.notifying}
    ${data_in.handler}
    ${data_in.title}
    ${data_in.message}
    ${data_in.type}
    ${data_in.for_admins}
    !`,
  }

  console.log(data.message);

  try {
    // supabaseClient.auth.setAuth(req.headers.get('Authorization')!.replace('Bearer ', ''))

    // wont work probably since insert_notification_from_groups got moved to transactions schema only accessible by postgres
    const insertNotification: { data: any, error: any } = await supabaseClient
    .rpc('insert_notification_from_groups', 
      {
        notifier_in: data_in.notifier,
        notifying_in: '7e93a265-a4df-4dfc-b9b3-875b08960ece',
        handler_in: data_in.handler,
        title_in: data_in.title,
        message_in: data_in.message,
        type_in: data_in.type,
        for_admins_in: data_in.for_admins
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

/*   return new Response(
    JSON.stringify(data),
    { headers: { "Content-Type": "application/json" } },
  ) */
})

// To invoke:
/*  curl -i --location --request POST 'http://localhost:54321/functions/v1/' \
   --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24ifQ.625_WdcF3KHqz5amU0x2X5WWHP-OEs_4qj0ssLNHzTs' \
   --header 'Content-Type: application/json' \
   --data '{"name":"Functions"}' */
