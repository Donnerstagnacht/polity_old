import { ApiError, Provider, Session, User } from "@supabase/supabase-js";

export interface SessionResponse {
  session: Session | null,
  user: User | null,
  provider?: Provider | undefined,
  url?: string | null | undefined,
  error: ApiError | null;
}
