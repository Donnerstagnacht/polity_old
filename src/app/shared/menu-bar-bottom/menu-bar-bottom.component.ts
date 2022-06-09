import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MegaMenuItem, MenuItem } from 'primeng/api';
import { AuthentificationService } from 'src/app/authentification/services/authentification.service';
@Component({
  selector: 'app-menu-bar-bottom',
  templateUrl: './menu-bar-bottom.component.html',
  styleUrls: ['./menu-bar-bottom.component.scss']
})
export class MenuBarBottomComponent implements OnInit {
  display: boolean = true;
  loggedIn: boolean = false;
  items: MegaMenuItem[] = [];

  constructor(
    private readonly authentificationService: AuthentificationService,
    private changeDetector: ChangeDetectorRef
    ) { }

  ngOnInit() {
    this.authentificationService.loggedInStatus.subscribe((loggedInStatus: boolean) => {
      this.loggedIn = loggedInStatus;
      console.log('changed')
      this.changeDetector.detectChanges();
      if(this.loggedIn) {
        this.items = [
          {label: 'Profil', routerLink: ['/profile']},
          {label: 'logout', routerLink: ['/login']}
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


}
