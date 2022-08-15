import { MegaMenuItem, MenuItem } from "primeng/api";

export function profileMenuitemsIsOwner(id: string): MenuItem[] {
  const profileMenuitemsIsOwner: MenuItem[] = [
  {label: 'ÜBERSICHT', routerLink: ['/profile'], routerLinkActiveOptions: {exact: true}},
  {label: 'ÄNDERN', routerLink: ['/profile/edit'], routerLinkActiveOptions: {exact: true}}
  ];
  return profileMenuitemsIsOwner;
}

export function profileMenuitemsMegaIsOwner(id: string): MegaMenuItem[] {
  const profileMenuitemsMegaIsOwner: MegaMenuItem[] = [
    {icon: 'pi pi-fw pi-home', /* label: 'Übersicht', */ routerLink: ['/profile'], routerLinkActiveOptions: {exact: true}},
    {icon: 'pi pi-fw pi-user-edit', /* label: 'ändern', */ routerLink: ['/profile/edit'], routerLinkActiveOptions: {exact: true}}
  ];
  return profileMenuitemsMegaIsOwner;
}

export function profileMenuitems(id: string): MenuItem[] {
  const profileMenuitems: MenuItem[] = [
    {label: 'ÜBERSICHT', routerLink: [`/profile/${id}`], routerLinkActiveOptions: {exact: true}}
  ];
  return profileMenuitems;
}
export function profileMenuitemsMega(id: string): MegaMenuItem[] {
  const profileMenuitemsMega: MegaMenuItem[] = [
    {icon: 'pi pi-fw pi-home', /* label: 'Übersicht', */ routerLink: [`/profile/${id}`], routerLinkActiveOptions: {exact: true}}
  ];
  return profileMenuitemsMega;
}
