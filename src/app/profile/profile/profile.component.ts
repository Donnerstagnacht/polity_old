import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute  } from '@angular/router';
import { AuthentificationQuery } from '../../authentification/state/authentification.query';
import { ProfileService } from '../state/profile.service';
import { FollowingService } from 'src/app/following-profiles-system/services/following.service';
import { MegaMenuItem, MenuItem, MessageService } from 'primeng/api';
import { profileMenuitems, profileMenuitemsIsOwner, profileMenuitemsMega, profileMenuitemsMegaIsOwner } from '../state/profileMenuItems';
import { Profile, ProfileCore, ProfileUI } from '../state/profile.model';
import { ProfileQuery } from '../state/profile.query';
import { Observable, Subscription } from 'rxjs';
import { RealtimeSubscription } from '@supabase/supabase-js';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  providers: [MessageService]
})
export class ProfileComponent implements OnInit, OnDestroy {
  menuItemsSpecial: MenuItem[] = [];
  menuItemsStandart: MenuItem[] = [];
  menuItemsMegaSpecial: MegaMenuItem[] = [];
  menuItemsMegaStandart: MegaMenuItem[] = [];

  profile$ = new Observable<ProfileCore | undefined>();
  profile?: ProfileCore;
  profileUI!: ProfileUI;

  selectedProfileId: string | null = null;
  loggedInUserId: string | null = null;

  calledRealTime: boolean = false;
  test: Subscription | undefined;
  test2: Subscription | undefined;
  test3: RealtimeSubscription | undefined;
  test4: RealtimeSubscription | undefined;



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
    if (this.selectedProfileId) {
      this.profileQuery.selectUI$(this.selectedProfileId).subscribe((ui: ProfileUI | undefined) => {
        if(ui) {
          this.profileUI = ui;
        }
      });
    }
    this.checkIfAlreadyFollower();
    if(this.selectedProfileId) {
      // review gets called everytime page loads =>
      // realtime update ist not fired after loaded twice probalbly
      // recheck
      // could be due to two calls
      const profileFromStore: Profile | undefined = this.profileQuery.getEntity(this.selectedProfileId);
        if(profileFromStore) {
          console.log('already in store')
          this.test = this.profileQuery.selectEntity(this.selectedProfileId).subscribe((profile: Profile | undefined) => {
            if(profile) {
              console.log('loaded profile data from store again')
              console.log(profile)
              this.profile = profile;
            }
        })
      } else {
        if(this.selectedProfileId) {
          console.log('data not in store, fetched data and activate Realtime subscription')
          this.getSelectedProfile();
        }
      }
      this.test3 = this.profileService.getRealTimeChanges(this.selectedProfileId);
      this.test4 = this.profileService.getRealTimeChangesIfStillFollower(this.selectedProfileId);
    }
    if (this.selectedProfileId) {
      this.menuItemsSpecial = profileMenuitemsIsOwner(this.selectedProfileId);
      this.menuItemsStandart = profileMenuitems(this.selectedProfileId);
      this.menuItemsMegaSpecial = profileMenuitemsMegaIsOwner(this.selectedProfileId);
      this.menuItemsMegaStandart = profileMenuitemsMega(this.selectedProfileId);
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
        console.log('no route')
        this.selectedProfileId = this.loggedInUserId;
        console.log(this.selectedProfileId)

      } else {
        this.selectedProfileId = routeParameter;
      }
    })
  }

  getSelectedProfile(): void {
    if (this.selectedProfileId) {
      console.log('profile-id')
      console.log(this.selectedProfileId)
      this.profileService.add(this.selectedProfileId);
      this.test2 = this.profileQuery.selectProfileById(this.selectedProfileId)
      .subscribe((profile: ProfileCore | undefined) => {
        if(profile) {
          console.log('new profile in profile component fetched')
          console.log(profile)
          this.profile = profile;
        }
      })
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

  ngOnDestroy(): void {
      console.log('destroyed');
      if(this.test) {
        this.test.unsubscribe()
        console.log('1 destroyed');
      }
      if(this.test2) {
        this.test2.unsubscribe()
        console.log('2 destroyed');
      }
      if(this.test3) {
        this.test3.unsubscribe()
        console.log('3 destroyed');
      }
      if(this.test4) {
        this.test4.unsubscribe()
        console.log('4 destroyed');
      }
  }
}
