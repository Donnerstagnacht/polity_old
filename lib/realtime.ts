import { REALTIME_POSTGRES_CHANGES_LISTEN_EVENT } from "@supabase/supabase-js"
export type RealtimeChannelSnapshot<T> =
  {
    // eventType?: `${REALTIME_POSTGRES_CHANGES_LISTEN_EVENT.UPDATE}`,
    commit_timestamp?: any,
    errors?: any,
    new?: T
    old?: T,
    columns?: [{name: string, type: string}],
    schema?: string,
    table?: string,
    type?: REALTIME_POSTGRES_CHANGES_LISTEN_EVENT
  }
