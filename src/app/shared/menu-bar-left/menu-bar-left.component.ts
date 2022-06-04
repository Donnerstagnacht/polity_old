import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AuthentificationService } from 'src/app/authentification/services/authentification.service';

@Component({
  selector: 'app-menu-bar-left',
  templateUrl: './menu-bar-left.component.html',
  styleUrls: ['./menu-bar-left.component.scss']
})
export class MenuBarLeftComponent implements OnInit {
  display: boolean = true;
  loggedIn: boolean = false;

  constructor(
    private readonly authentificationService: AuthentificationService,
    private changeDetector: ChangeDetectorRef
    ) { }

  ngOnInit(): void {
    this.authentificationService.loggedInStatus.subscribe((loggedInStatus: boolean) => {
      this.loggedIn = loggedInStatus;
      this.changeDetector.detectChanges();
    })
  }

}
