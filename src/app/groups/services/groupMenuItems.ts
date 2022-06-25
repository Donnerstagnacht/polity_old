import { MegaMenuItem, MenuItem } from "primeng/api";

export function groupsMenuitemsParameter(id: string): MenuItem[] {
  const groupsMenuitems: MenuItem[] = [
    {label: 'Übersicht', routerLink: [`/groups/${id}`]},
  ];
  return groupsMenuitems;
}

export function groupsMenuitemsParameterLoggedIn(id: string): MenuItem[] {
  const groupsMenuitems: MenuItem[] = [
    {label: 'Übersicht', routerLink: [`/groups/${id}`]},
    {label: 'ändern', routerLink: [`/groups/${id}/edit`]}
  ];
  return groupsMenuitems;
}


export function groupsMenuitemsMegaParameter(id: string): MegaMenuItem[] {
  const groupsMenuitemsMegaParameter: MegaMenuItem[] = [
    {icon: 'pi pi-fw pi-home', /* label: 'Übersicht', */ routerLink: [`/groups/${id}`]},
  ];
  return groupsMenuitemsMegaParameter;
}

export function groupsMenuitemsMegaParameterLoggedIn(id: string): MegaMenuItem[] {
  const groupsMenuitemsMegaParameter: MegaMenuItem[] = [
    {icon: 'pi pi-fw pi-home', /* label: 'Übersicht', */ routerLink: [`/groups/${id}`]},
    {icon: 'pi pi-fw pi-user-edit', /* label: 'ändern', */ routerLink: [`/groups/${id}/edit`]}
  ];
  return groupsMenuitemsMegaParameter;
}

