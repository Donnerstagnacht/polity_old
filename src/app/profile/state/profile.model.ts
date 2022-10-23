import { profile_list_item } from "src/app/groups/state/profile_list_item.model";

export interface ProfileCore {
  id: string;
  name: string;
  website: string;
  avatar_url: string;
  contact_email: string;
  contact_phone: string;
  street: string;
  post_code: string;
  city: string;
  about: string;

  fts?: string // test
}

export interface ProfileCounters {
  id: string;
  amendment_counter: number;
  follower_counter: number;
  following_counter: number;
  groups_counter: number;
  unread_notifications_counter: number;
}

export interface ProfileWithCounters extends ProfileCore {
  amendment_counter: number;
  follower_counter: number;
  following_counter: number;
  groups_counter: number;
  unread_notifications_counter: number;

}

export interface Profile extends ProfileWithCounters {
  groups?: profile_list_item[],
  followings: profile_list_item[],
  followers: profile_list_item[],
}

export type ProfileUI = {
  isFollowing: boolean;
  isOwner: boolean;

}

export const initialGroupUIState: ProfileUI = {
  isFollowing: false,
  isOwner: false
}

export function createProfile(params: Partial<ProfileCore>) {
  return {
    ...params
  } as ProfileCore;
}
