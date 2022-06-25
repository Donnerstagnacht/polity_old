import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Observable } from 'rxjs';
import { AuthentificationService } from 'src/app/authentification/services/authentification.service';

@Component({
  selector: 'app-menu-bar-left',
  templateUrl: './menu-bar-left.component.html',
  styleUrls: ['./menu-bar-left.component.scss']
})
export class MenuBarLeftComponent implements OnInit {
  display: boolean = true;
  items: MenuItem[] = [];
  showAddMenu:boolean = false;

  public $loggedInStatus!: Observable<boolean>;

  constructor(
    private readonly authentificationService: AuthentificationService,
    ) { }

  ngOnInit(): void {
    this.$loggedInStatus = this.authentificationService.getLoggedInStatus();
    this.$loggedInStatus.subscribe((loggedInId) => {
      if(loggedInId) {
        this.items = [
          {label: 'PROFIL', routerLink: ['/profile']},
          {label: 'GRUPPEN', routerLink: ['/groups']},
          {label: 'ERSTLLEN', command: () => this.toggleFullScreen()},
          {label: 'SUCHE', routerLink: ['/search']},
          {label: 'ORGA', routerLink: ['/orga']}
        ]
      } else {
        this.items = [
          {label: 'Login', routerLink: ['/login']},
          {label: 'Register', routerLink: ['/register']},
          {label: 'Über', routerLink: ['/über']}
      ];
      }
    })

  }

  toggleFullScreen(): void {
    this.showAddMenu = !this.showAddMenu;
  }


}
