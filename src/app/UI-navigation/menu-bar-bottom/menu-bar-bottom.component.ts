import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MegaMenuItem, MenuItem } from 'primeng/api';
import { Observable } from 'rxjs';
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
  showAddMenu: boolean = false;
  public $loggedInStatus!: Observable<boolean>;

  constructor(
    private readonly authentificationService: AuthentificationService,
    ) { }

    ngOnInit(): void {
      this.$loggedInStatus = this.authentificationService.getLoggedInStatus();
      this.$loggedInStatus.subscribe((loggedInId) => {
        if(loggedInId) {
          this.items = [
            {icon: 'pi pi-fw pi-user', /* label: 'Profil', */ routerLink: ['/profile']},
            {icon: 'pi pi-fw pi-users',/* label: 'Gruppen', */ routerLink: ['/groups']},
            {icon: 'pi pi-fw pi-plus-circle',/* label: 'Erstellen', */ command: () => this.toggleFullScreen()},
            {icon: 'pi pi-fw pi-search',/* label: 'Search', */ routerLink: ['/search']}
          ]
        } else {
          this.items = [
            {/* icon: 'pi pi-fw pi-video', */label: 'Login', routerLink: ['/login']},
            {/* icon: 'pi pi-fw pi-video', */label: 'Register', routerLink: ['/register']},
            {/* icon: 'pi pi-fw pi-video', */label: 'Über', routerLink: ['/über']}
        ];
        }
      })

    }

  showFullScreen(): void {
    this.showAddMenu = true;
  }

  toggleFullScreen(): void {
    this.showAddMenu = !this.showAddMenu;
  }



}
