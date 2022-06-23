import { MegaMenuItem, MenuItem } from "primeng/api";

export const profileMenuitems: MenuItem[] = [
  {label: 'Übersicht', routerLink: ['/profile']},
  {label: 'ändern', routerLink: ['/profile-edit']}
];

export const profileMenuitemsMega: MegaMenuItem[] = [
  {icon: 'pi pi-fw pi-home', /* label: 'Übersicht', */ routerLink: ['/profile']},
  {icon: 'pi pi-fw pi-user-edit', /* label: 'ändern', */ routerLink: ['/profile-edit']}
];
