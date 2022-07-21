import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { AuthentificationQuery } from 'src/app/authentification/state/authentification.query';
@Component({
  selector: 'app-menu-bar-left',
  templateUrl: './menu-bar-left.component.html',
  styleUrls: ['./menu-bar-left.component.scss']
})
export class MenuBarLeftComponent implements OnInit {
  display: boolean = true;
  items: MenuItem[] = [];
  showAddMenu:boolean = false;

  loggedInItems: MenuItem[] = [
    {label: 'PROFIL', routerLink: ['/profile']},
    {label: 'GRUPPEN', routerLink: ['/groups']},
    {label: 'ERSTELLEN', command: () => this.toggleFullScreen()},
    {label: 'SUCHE', routerLink: ['/search']},
    {label: 'ORGA', routerLink: ['/orga']}
  ];

  loggedOutItems: MenuItem[] = [
    {label: 'Login', routerLink: ['/login']},
    {label: 'Register', routerLink: ['/register']},
    {label: 'Über', routerLink: ['/über']}
  ];

  constructor(
    private authentificationQuery: AuthentificationQuery
    ) { }

  ngOnInit(): void {
    this.authentificationQuery.uuid$.subscribe(uuid => {
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
