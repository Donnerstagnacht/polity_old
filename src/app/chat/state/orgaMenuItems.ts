import { MegaMenuItem, MenuItem } from "primeng/api";

export const orgaMenuitems: MenuItem[] = [
  {label: 'CHAT', routerLink: ['/orga'], routerLinkActiveOptions: {exact: true}, id: 'chat-cy'},
  {label: 'NEWS', routerLink: ['/orga/news'], routerLinkActiveOptions: {exact: true}, id: 'news-cy'}
];

export const orgaMenuitemsMega: MegaMenuItem[] = [
  {icon: 'pi pi-fw pi-comments', /* label: 'Übersicht', */ routerLink: ['/orga'],  routerLinkActiveOptions: {exact: true}, id: 'chat-cy-mob'},
  {icon: 'pi pi-fw pi-bell', /* label: 'ändern', */ routerLink: ['/orga/news'],  routerLinkActiveOptions: {exact: true}, id: 'news-cy-mob'}
];
