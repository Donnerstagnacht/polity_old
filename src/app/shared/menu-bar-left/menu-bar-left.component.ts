import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { AuthentificationService } from 'src/app/authentification/services/authentification.service';

@Component({
  selector: 'app-menu-bar-left',
  templateUrl: './menu-bar-left.component.html',
  styleUrls: ['./menu-bar-left.component.scss']
})
export class MenuBarLeftComponent implements OnInit {
  display: boolean = true;
  loggedIn: boolean = false;
  items: MenuItem[] = [];

  constructor(
    private readonly authentificationService: AuthentificationService,
    private changeDetector: ChangeDetectorRef
    ) { }

  ngOnInit(): void {
    this.authentificationService.loggedInStatus.subscribe((loggedInStatus: boolean) => {
      this.loggedIn = loggedInStatus;
      console.log('changed')
      this.changeDetector.detectChanges();
      if(this.loggedIn) {
        this.items = [
          {label: 'Profil', routerLink: ['/profile']}
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
