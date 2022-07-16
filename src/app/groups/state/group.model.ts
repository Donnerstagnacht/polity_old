export interface Group {
  id?: string,
  created_at?: string,
  name: string,
  description: string,
  creator: string,
  member_counter?: string
  events_counter?: string
  level: string,
  street?: string,
  post_code?: string,
  city?: string,
  contact_phone?: string,
  avatar_url?: string,
  follower_counter?: string,
  amendment_counter?: string,
  contact_email?: string,
  updated_at?: Date
}

export function createGroup(params: Partial<Group>) {
  return {
    ...params
  } as Group;
}
