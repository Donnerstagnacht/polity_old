import { MegaMenuItem, MenuItem } from "primeng/api";

export const profileMenuitems: MenuItem[] = [
  {label: 'Übersicht', routerLink: ['/profile'], routerLinkActiveOptions: {exact: true}},
  {label: 'ändern', routerLink: ['/profile/edit'], routerLinkActiveOptions: {exact: true}}
];

export const profileMenuitemsMega: MegaMenuItem[] = [
  {icon: 'pi pi-fw pi-home', /* label: 'Übersicht', */ routerLink: ['/profile'], routerLinkActiveOptions: {exact: true}},
  {icon: 'pi pi-fw pi-user-edit', /* label: 'ändern', */ routerLink: ['/profile/edit'], routerLinkActiveOptions: {exact: true}}
];
