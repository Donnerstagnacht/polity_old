import { profile_list_item } from "src/app/groups/state/profile_list_item.model";

export interface EventCore {
  id?: string,
  created_at?: string,
  creator?: string,
  name?: string,
  date?: string,
  time?: string,
  rythm?: string,
  online_or_real?: string,
  online_link?: string,
  description?: string,
  event_type?: string,
  host_group?: string,
  delegates_calculation_type?: string,
  number_of_delegates?: number,
  number_of_executed_board_members?: number,
  gender_quota_speaking?: boolean,
  participants_counter?: number,
  motion_deadline?: Date,
  delegate_deadline?: Date
}

export interface Event extends EventCore {
  delegates?: profile_list_item[],
  guests?: profile_list_item[],
  followers?: profile_list_item[]
}

export type EventUI = {
  isFollowing: boolean;
  isAdmin: boolean;
  isDelegate: boolean;
  isGuest: boolean;
}

export const initialEventUIState: EventUI = {
  isFollowing: false,
  isAdmin: false,
  isDelegate: false,
  isGuest: false
}


export function createEvent(params: Partial<Event>) {
  return {
    ...params,
    delegates: [],
    guests: [],
    followers: []
  } as Event;
}
