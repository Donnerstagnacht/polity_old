import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AuthentificationService } from 'src/app/authentification/services/authentification.service';
@Component({
  selector: 'app-menu-bar-bottom',
  templateUrl: './menu-bar-bottom.component.html',
  styleUrls: ['./menu-bar-bottom.component.scss']
})
export class MenuBarBottomComponent implements OnInit {
  display: boolean = true;
  loggedIn: boolean = false;

  constructor(
    private readonly authentificationService: AuthentificationService,
    private changeDetector: ChangeDetectorRef
    ) { }

  ngOnInit() {
    this.authentificationService.authCheckLogin();
    this.authentificationService.loggedInStatus.subscribe((loggedInStatus: boolean) => {
      this.loggedIn = loggedInStatus;
      this.changeDetector.detectChanges();
    })
  }


}
