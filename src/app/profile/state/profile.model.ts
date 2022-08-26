import { profile_list_item } from "src/app/groups/state/profile_list_item.model";

export interface ProfileCore {
  id: string;
  amendment_counter: number;
  follower_counter: number;
  following_counter: number;
  groups_counter: number;
  name: string;
  website: string;
  avatar_url: string;
  contact_email: string;
  contact_phone: string;
  street: string;
  post_code: string;
  city: string;
  about: string;
  followings: profile_list_item[],
  followers: profile_list_item[],
  fts?: string // test
}

export interface Profile extends ProfileCore {
  groups?: profile_list_item[]
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
