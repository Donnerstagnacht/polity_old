export interface Group {
  id?: string,
  created_at?: string,
  name: string,
  description: string,
  creator: string,
  member_counter?: number,
  events_counter?: number,
  level: string,
  street: string,
  post_code: string,
  city: string,
  contact_phone: string,
  avatar_url: string,
  follower_counter?: number,
  amendment_counter?: number,
  contact_email: string,
  updated_at?: Date
}

export function createGroup(params: Partial<Group>) {
  return {
    ...params
  } as Group;
}
