import { profile_list_item } from "./profile_list_item.model";

export interface GroupCore {
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
  updated_at?: Date,
}
export interface Group extends GroupCore {
  members?: profile_list_item[],
  membership_requests?: profile_list_item[],
  followers?: profile_list_item[]
}

export type GroupUI = {
  isFollowing: boolean;
  isAdmin: boolean;
  requestedMembership: boolean;
  isMember: boolean;
}

export const initialGroupUIState: GroupUI = {
  isFollowing: false,
  isAdmin: false,
  requestedMembership: false,
  isMember: false
}

export function createGroup(params: Partial<Group>) {
  return {
    ...params,
    mebers: [],
    membership_requests: [],
    followers: []
  } as Group;
}
