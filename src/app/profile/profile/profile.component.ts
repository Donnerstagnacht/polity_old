import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute  } from '@angular/router';
import { AuthentificationQuery } from 'src/app/authentification/state/authentification.query';
import { ProfileService } from '../state/profile.service';
import { FollowingService } from 'src/app/following-profiles-system/services/following.service';
import { MegaMenuItem, MenuItem, MessageService } from 'primeng/api';
import { profileMenuitems, profileMenuitemsMega } from '../state/profileMenuItems';
import { Profile } from '../state/profile.model';
import { ProfileQuery } from '../state/profile.query';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  providers: [MessageService]
})
export class ProfileComponent implements OnInit {
  menuItems: MenuItem[] = profileMenuitems;
  menuItemsMega: MegaMenuItem[] = profileMenuitemsMega;

  profile$ = new Observable<Profile | undefined>();

  isAlreadyFollower: boolean = false;
  selectedProfileId: string | null = null;
  loggedInUserId: string | null = null;

  constructor(
    private authentificationQuery: AuthentificationQuery,
    private route: ActivatedRoute,
    private followingservice: FollowingService,
    private messageService: MessageService,
    private profileService: ProfileService,
    private profileQuery: ProfileQuery
  ) {}

  ngOnInit(): void {
    this.getLoggedInUserId$();
    this.getSelectedId();
    this.getSelectedProfile();
    this.checkIfAlreadyFollower();
    if (this.selectedProfileId) {
      this.profileService.getRealTimeChanges(this.selectedProfileId);
    }
  }

  getLoggedInUserId$(): void {
    this.authentificationQuery.uuid$.subscribe((uuid) => {
      if(uuid) {
        this.loggedInUserId = uuid;
      }
    })
  }

  getSelectedId(): void {
    this.route.paramMap.subscribe(parameter => {
      let routeParameter: string = String(parameter.get('id'));
      if(routeParameter === 'null') {
        this.selectedProfileId = this.loggedInUserId;
      } else {
        this.selectedProfileId = routeParameter;
      }
    })
  }

  getSelectedProfile(): void {
    if (this.selectedProfileId) {
      this.profileService.add(this.selectedProfileId);
      this.profile$ = this.profileQuery.selectProfileById(this.selectedProfileId)
    }
  }

  followOrUnfollowProfile(): void {
    if(this.selectedProfileId) {
      if(this.isAlreadyFollower) {
        this.followingservice.unfollowTransaction(this.selectedProfileId)
        .then(() => {
          this.isAlreadyFollower = false;
          this.messageService.add({severity:'success', summary: 'Du folgst einer neuen Inspirationsquelle.'});
        })
        .catch((error) => {
          this.messageService.add({severity:'error', summary: error});
        });
      } else {
        this.followingservice.followTransaction(this.selectedProfileId)
        .then(() => {
          this.isAlreadyFollower = true;
          this.messageService.add({severity:'success', summary: 'Du folgst einer neuen Inspirationsquelle.'});
        })
        .catch((error) => {
          this.messageService.add({severity:'error', summary: error});
        });
      }
    }
  }

  checkIfAlreadyFollower(): void {
    if(this.selectedProfileId) {
      this.followingservice.isAlreadyFollower(this.selectedProfileId)
      .then((results) => {
        if(results.data[0] !== undefined) {
          this.isAlreadyFollower = true;
        } else {
          this.isAlreadyFollower = false;
        }
      })
      .catch();
    }
  }
}
