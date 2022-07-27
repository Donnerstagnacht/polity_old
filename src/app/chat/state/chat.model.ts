export interface Chat {
  id: string,
  participant_id: string,
  name: string,
  last_message_time: Date,
  last_message: string,
  avatar_url: string,
  number_of_unread_messages: number,
  is_group: boolean
}

export function createChat(params: Partial<Chat>) {
  return {
    ...params
  } as Chat;
}
