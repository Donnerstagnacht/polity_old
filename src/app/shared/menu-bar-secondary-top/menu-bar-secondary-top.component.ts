import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { MegaMenuItem, MenuItem } from 'primeng/api';
import { AuthentificationService } from 'src/app/authentification/services/authentification.service';

@Component({
  selector: 'app-menu-bar-secondary-top',
  templateUrl: './menu-bar-secondary-top.component.html',
  styleUrls: ['./menu-bar-secondary-top.component.scss']
})
export class MenuBarSecondaryTopComponent implements OnInit {
  @Input() menuItems: MegaMenuItem[] = [];
  loggedIn: boolean = false;
/*   items: MegaMenuItem[] = [];
 */
  constructor(
    private readonly authentificationService: AuthentificationService,
  ) { }

  ngOnInit(): void {
/*     this.authentificationService.authCheckLogin();
    this.authentificationService.loggedInStatus.subscribe((loggedInStatus: boolean) => {
      this.loggedIn = loggedInStatus;
      this.changeDetector.detectChanges(); */
  }

}
