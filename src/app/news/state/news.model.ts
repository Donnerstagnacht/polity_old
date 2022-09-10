export type Notifications  = {
  id: string,
  notifier: string,
  notifying: string,
  title: string,
  content: string,
  type: string,
  created_at: string,
  from_group: string
}

export interface News extends Notifications {
  avatar_url: string;
  name: string
}

export function createNews(params: Partial<News>) {
  return {

  } as News;
}
