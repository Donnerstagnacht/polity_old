import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MegaMenuItem, MenuItem } from 'primeng/api';
import { Subscription } from 'rxjs';
import { AuthentificationQuery } from 'src/app/authentification/state/authentification.query';
import { AuthentificationService } from 'src/app/authentification/state/authentification.service';
import { profileMenuitems, profileMenuitemsIsOwner, profileMenuitemsMega, profileMenuitemsMegaIsOwner } from '../state/profileMenuItems';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit, OnDestroy {
  menuItemsSpecial: MenuItem[] = [];
  menuItemsStandart: MenuItem[] = [];
  menuItemsMegaSpecial: MegaMenuItem[] = [];
  menuItemsMegaStandart: MegaMenuItem[] = [];
  loggedInUserId: string = '';
  isOwner: boolean = true;

  loggedInUserSubscription?: Subscription;

  constructor(
    private readonly authentificationService: AuthentificationService,
    private authentificationQuery: AuthentificationQuery,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.loggedInUserSubscription = this.authentificationQuery.uuid$.subscribe((uuid: string | null) => {
      if(uuid) {
        this.loggedInUserId = uuid;
        this.menuItemsSpecial = profileMenuitemsIsOwner(this.loggedInUserId);
        this.menuItemsStandart = profileMenuitems(this.loggedInUserId);
        this.menuItemsMegaSpecial = profileMenuitemsMegaIsOwner(this.loggedInUserId);
        this.menuItemsMegaStandart = profileMenuitemsMega(this.loggedInUserId);
      }
    })
  }

  ngOnDestroy(): void {
    if(this.loggedInUserSubscription) {
      this.loggedInUserSubscription.unsubscribe()
    }
  }

  async signOut(): Promise<any> {
    await this.authentificationService.signOut();
    this.router.navigate(['/login']);
  }
}
