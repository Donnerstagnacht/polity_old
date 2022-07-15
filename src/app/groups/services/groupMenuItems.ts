import { MegaMenuItem, MenuItem } from "primeng/api";

export function groupsMenuitemsParameter(id: string): MenuItem[] {
  const groupsMenuitems: MenuItem[] = [
    {label: 'ÜBERSICHT', routerLink: [`/groups/${id}`], routerLinkActiveOptions: {exact: true}},
  ];
  return groupsMenuitems;
}

export function groupsMenuitemsParameterLoggedIn(id: string): MenuItem[] {
  const groupsMenuitems: MenuItem[] = [
    {label: 'ÜBERSICHT', routerLink: [`/groups/${id}`], routerLinkActiveOptions: {exact: true}},
    {label: 'ÄNDERN', routerLink: [`/groups/${id}/edit`], routerLinkActiveOptions: {exact: true}}
  ];
  return groupsMenuitems;
}


export function groupsMenuitemsMegaParameter(id: string): MegaMenuItem[] {
  const groupsMenuitemsMegaParameter: MegaMenuItem[] = [
    {icon: 'pi pi-fw pi-home', /* label: 'Übersicht', */ routerLink: [`/groups/${id}`], routerLinkActiveOptions: {exact: true}},
  ];
  return groupsMenuitemsMegaParameter;
}

export function groupsMenuitemsMegaParameterLoggedIn(id: string): MegaMenuItem[] {
  const groupsMenuitemsMegaParameter: MegaMenuItem[] = [
    {icon: 'pi pi-fw pi-home', /* label: 'Übersicht', */ routerLink: [`/groups/${id}`], routerLinkActiveOptions: {exact: true}},
    {icon: 'pi pi-fw pi-user-edit', /* label: 'ändern', */ routerLink: [`/groups/${id}/edit`], routerLinkActiveOptions: {exact: true}}
  ];
  return groupsMenuitemsMegaParameter;
}

