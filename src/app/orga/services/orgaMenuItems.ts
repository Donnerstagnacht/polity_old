import { MegaMenuItem, MenuItem } from "primeng/api";

export const orgaeMenuitems: MenuItem[] = [
  {label: 'CHAT', routerLink: ['/orga'], routerLinkActiveOptions: {exact: true}},
  {label: 'NEWS', routerLink: ['/orga/news'], routerLinkActiveOptions: {exact: true}}
];

export const orgaMenuitemsMega: MegaMenuItem[] = [
  {icon: 'pi pi-fw pi-comments', /* label: 'Übersicht', */ routerLink: ['/orga'],  routerLinkActiveOptions: {exact: true}},
  {icon: 'pi pi-fw pi-bell', /* label: 'ändern', */ routerLink: ['/orga/news'],  routerLinkActiveOptions: {exact: true}}
];
