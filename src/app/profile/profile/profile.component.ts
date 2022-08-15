import { Component, OnInit } from '@angular/core';
import { ActivatedRoute  } from '@angular/router';
import { AuthentificationQuery } from '../../authentification/state/authentification.query';
import { ProfileService } from '../state/profile.service';
import { FollowingService } from 'src/app/following-profiles-system/services/following.service';
import { MegaMenuItem, MenuItem, MessageService } from 'primeng/api';
import { profileMenuitems, profileMenuitemsIsOwner, profileMenuitemsMega, profileMenuitemsMegaIsOwner } from '../state/profileMenuItems';
import { Profile, ProfileUI } from '../state/profile.model';
import { ProfileQuery } from '../state/profile.query';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  providers: [MessageService]
})
export class ProfileComponent implements OnInit {
  menuItemsSpecial: MenuItem[] = [];
  menuItemsStandart: MenuItem[] = [];
  menuItemsMegaSpecial: MegaMenuItem[] = [];
  menuItemsMegaStandart: MegaMenuItem[] = [];

  profile$ = new Observable<Profile | undefined>();
  profileUI!: ProfileUI;

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
    if(this.selectedProfileId) {
      this.profileService.checkIfIsOwner(this.selectedProfileId);
    }
    this.getSelectedProfile();
    if (this.selectedProfileId) {
      this.profileQuery.selectUI$(this.selectedProfileId).subscribe((ui: ProfileUI | undefined) => {
        console.log(ui)
        if(ui) {
          this.profileUI = ui;
        }
      });
    }
    this.checkIfAlreadyFollower();
    if (this.selectedProfileId) {
      this.menuItemsSpecial = profileMenuitemsIsOwner(this.selectedProfileId);
      this.menuItemsStandart = profileMenuitems(this.selectedProfileId);
      this.menuItemsMegaSpecial = profileMenuitemsMegaIsOwner(this.selectedProfileId);
      this.menuItemsMegaStandart = profileMenuitemsMega(this.selectedProfileId);

      this.profileService.getRealTimeChanges(this.selectedProfileId);
      this.profileService.getRealTimeChangesIfStillFollower(this.selectedProfileId);
    }
  }

  getLoggedInUserId$(): void {
    this.authentificationQuery.uuid$.subscribe((uuid: any) => {
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
      if(this.profileUI.isFollowing) {
        this.followingservice.unfollowTransaction(this.selectedProfileId)
        .then(() => {
          if(this.selectedProfileId) {
            this.profileService.updateIsFollowing(this.selectedProfileId, false);
            this.messageService.add({severity:'success', summary: 'Du folgst einer neuen Inspirationsquelle.'});
          }
        })
        .catch((error) => {
          this.messageService.add({severity:'error', summary: error});
        });
      } else {
        this.followingservice.followTransaction(this.selectedProfileId)
        .then(() => {
          if(this.selectedProfileId) {
            this.profileService.updateIsFollowing(this.selectedProfileId, true);
            this.messageService.add({severity:'success', summary: 'Du folgst einer neuen Inspirationsquelle.'});
          }
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
          console.log('following')
          if(this.selectedProfileId) {
            this.profileService.updateIsFollowing(this.selectedProfileId, true);
          }
        } else {
          if(this.selectedProfileId) {
            this.profileService.updateIsFollowing(this.selectedProfileId, false);
          }
        }
      })
      .catch();
    }
  }
}
