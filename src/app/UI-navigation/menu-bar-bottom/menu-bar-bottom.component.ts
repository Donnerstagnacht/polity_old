import { Component, Input, OnInit } from '@angular/core';
import { MegaMenuItem } from 'primeng/api';
import { AuthentificationQuery } from 'src/app/authentification/state/authentification.query';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-menu-bar-bottom',
  templateUrl: './menu-bar-bottom.component.html',
  styleUrls: ['./menu-bar-bottom.component.scss']
})
export class MenuBarBottomComponent implements OnInit {
  @Input() unreadMessages: number | undefined;
  display: boolean = true;
  items: MegaMenuItem[] = [];
  showAddMenu: boolean = false;
  authSubscription: Subscription | undefined;

  loggedInItems: MegaMenuItem[] = [
    {icon: 'pi pi-fw pi-user', /* label: 'Profil', */ routerLink: ['/profile']},
    {icon: 'pi pi-fw pi-users',/* label: 'Gruppen', */ routerLink: ['/groups']},
    {icon: 'pi pi-fw pi-plus-circle',/* label: 'Erstellen', */ command: () => this.toggleFullScreen()},
    {icon: 'pi pi-fw pi-search',/* label: 'Search', */ routerLink: ['/search']},
    {icon: 'pi pi-fw pi-calendar',/* label: 'Search', */ routerLink: ['/orga']}
  ];

  loggedOutItems: MegaMenuItem[] = [
    {/* icon: 'pi pi-fw pi-video', */label: 'Login', routerLink: ['/login']},
    {/* icon: 'pi pi-fw pi-video', */label: 'Register', routerLink: ['/register']},
    {/* icon: 'pi pi-fw pi-video', */label: 'Über', routerLink: ['/über']}
  ];

  constructor(
    private readonly authentificationQuery: AuthentificationQuery,
  ) { }

  ngOnDestroy(): void {
    this.authSubscription?.unsubscribe();
  }

    ngOnInit(): void {
      this.authSubscription = this.authentificationQuery.uuid$.subscribe(uuid => {
        if(uuid) {
          this.items = this.loggedInItems;
        } else {
          this.items = this.loggedOutItems;
        }
      })
    }

  toggleFullScreen(): void {
    this.showAddMenu = !this.showAddMenu;
  }
}
