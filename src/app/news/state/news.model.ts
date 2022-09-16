export type Notifications  = {
  id: string,
  notifier: string,
  notifying: string,
  handler: string,
  title: string,
  message: string,
  type: string,
  created_at: string,
  from_group: boolean,
  new: boolean
}

export interface News extends Notifications {
  avatar_url: string;
  name: string
}



export type NewsType = {
  group: string,
  account: string
}

export type NewsContents = {
  followUser: string,
  requestGroupForInquirer: string,
  requestGroupForAdmins: string,
  cancelGroupRequestForInquirer: string,
  cancelGroupRequestForAdmins: string,
  acceptGroupRequestForInquirer: string,
  acceptGroupRequestForAdmins: string,
  leaveGroupForInquirer: string,
  leaveGroupForAdmins: string,
  removeMemberForDeletedUser: string,
  removeMemberForAdmins: string
}

export type  NewsTitles = {
  followUser: string,
  requestGroupForInquirer: string,
  requestGroupForAdmins: string,
  cancelGroupRequestForInquirer: string,
  cancelGroupRequestForAdmins: string,
  acceptGroupRequestForInquirer: string,
  acceptGroupRequestForAdmins: string,
  leaveGroupForInquirer: string,
  leaveGroupForAdmins: string,
  removeMemberForDeletedUser: string,
  removeMemberForAdmins: string
}

export const NEWSTYPE: NewsType = {
  group: 'group',
  account: 'account'
}

export const NEWSCONTENTS: NewsContents = {
  followUser: 'Du hast einen neuen Follower.',
  requestGroupForInquirer: 'Deine Anfrage wird zeitnah beantwortet.',
  requestGroupForAdmins: 'Bitte entscheide über die Anfrage.',
  cancelGroupRequestForInquirer: 'Deine Anfrage wurde abgelehnt.',
  cancelGroupRequestForAdmins: 'Ein Admin hat die Anfrage abgelehnt.',
  acceptGroupRequestForInquirer: 'Du bist Mitglied in einer weiteren Gruppe.',
  acceptGroupRequestForAdmins: 'Dein Team verfügt über ein neues Teammitglied.',
  leaveGroupForInquirer: 'Du hast die Gruppe verlassen.',
  leaveGroupForAdmins: 'Dein Team hat ein Mitglied weniger.',
  removeMemberForDeletedUser: 'Du wurdest aus der Gruppe entfernt.',
  removeMemberForAdmins: 'Ihr habt ein Mitglied entfernt.'
}

export const  NEWSTITLES: NewsTitles = {
  followUser: 'Neuer Follower',
  requestGroupForInquirer: 'Anfrage für Mitgliedschaft',
  requestGroupForAdmins: 'Anfrage für Mitgliedschaft',
  cancelGroupRequestForInquirer: 'Anfrage für Mitgliedschaft abgelehnt.',
  cancelGroupRequestForAdmins: 'Anfrage für Mitgliedschaft abgelehnt.',
  acceptGroupRequestForInquirer: 'Neue Gruppenmitgliedschaft',
  acceptGroupRequestForAdmins: 'Neue Gruppenmitgliedschaft',
  leaveGroupForInquirer: 'Gruppe verlassen',
  leaveGroupForAdmins: 'Mitgliedsaustritt',
  removeMemberForDeletedUser: 'Aus Gruppe entfernt',
  removeMemberForAdmins: 'Mitglied entfernt'
}
