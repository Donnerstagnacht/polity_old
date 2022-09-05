import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { AuthentificationQuery } from 'src/app/authentification/state/authentification.query';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-menu-bar-left',
  templateUrl: './menu-bar-left.component.html',
  styleUrls: ['./menu-bar-left.component.scss']
})
export class MenuBarLeftComponent implements OnInit {
  display: boolean = true;
  items: MenuItem[] = [];
  showAddMenu:boolean = false;
  authSubscription: Subscription | undefined;

  loggedInItems: MenuItem[] = [
    {label: 'PROFIL', routerLink: ['/profile'], id: 'profile-cy'},
    {label: 'GRUPPEN', routerLink: ['/groups'], id: 'groups-cy'},
    {label: 'ERSTELLEN', command: () => this.toggleFullScreen(), id: 'create-cy'},
    {label: 'SUCHE', routerLink: ['/search'], id: 'search-cy'},
    {label: 'ORGA', routerLink: ['/orga'],  id: 'orga-cy'}
  ];

  loggedOutItems: MenuItem[] = [
    {label: 'Login', routerLink: ['/login'], id: 'login-cy'},
    {label: 'Register', routerLink: ['/register'], id: 'register-cy'},
    {label: 'Über', routerLink: ['/über'], id: 'about-cy'}
  ];

  constructor(
    private authentificationQuery: AuthentificationQuery
  ) { }

  ngOnInit(): void {
    this.authSubscription = this.authentificationQuery.uuid$.subscribe(uuid => {
      if(uuid) {
        this.items = this.loggedInItems;
      } else {
        this.items = this.loggedOutItems;
      }
    })
  }

  ngOnDestroy(): void {
    this.authSubscription?.unsubscribe();
  }

  toggleFullScreen(): void {
    this.showAddMenu = !this.showAddMenu;
  }
}
