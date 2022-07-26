export interface Profile {
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
}

export function createProfile(params: Partial<Profile>) {
  return {
    ...params
  } as Profile;
}
