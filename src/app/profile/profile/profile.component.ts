import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute  } from '@angular/router';
import { AuthentificationQuery } from '../../authentification/state/authentification.query';
import { ProfileService } from '../state/profile.service';
import { FollowingService } from 'src/app/following-profiles-system/services/following.service';
import { MegaMenuItem, MenuItem, MessageService } from 'primeng/api';
import { profileMenuitems, profileMenuitemsIsOwner, profileMenuitemsMega, profileMenuitemsMegaIsOwner } from '../state/profileMenuItems';
import { Profile, ProfileCore, ProfileUI, ProfileWithCounters } from '../state/profile.model';
import { ProfileQuery } from '../state/profile.query';
import { Subscription } from 'rxjs';
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

  profile?: ProfileWithCounters;
  profileUI!: ProfileUI;

  selectedProfileId: string | null = null;
  loggedInUserId: string | null = null;

  profileSubscription: Subscription | undefined;
  profileUISubscription: Subscription | undefined;
  userSubscription: Subscription | undefined;
  profileRealtimeChangesSubscription: RealtimeSubscription | undefined;
  profilesCounterRealtimeChangesSubscription: RealtimeSubscription | undefined;
  followerRealTimeChangesSubscription: RealtimeSubscription | undefined;

  loading: boolean = false;
  error: boolean = false;
  errorMessage: string | undefined;

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
      this.profileUISubscription = this.profileQuery.selectUI$(this.selectedProfileId).subscribe((ui: ProfileUI | undefined) => {
        if(ui) {
          this.profileUI = ui;
        }
      });
      this.checkIfAlreadyFollower();
      this.loadInitialData();

      this.menuItemsSpecial = profileMenuitemsIsOwner(this.selectedProfileId);
      this.menuItemsStandart = profileMenuitems(this.selectedProfileId);
      this.menuItemsMegaSpecial = profileMenuitemsMegaIsOwner(this.selectedProfileId);
      this.menuItemsMegaStandart = profileMenuitemsMega(this.selectedProfileId);
      }
    }

  getLoggedInUserId$(): void {
    this.userSubscription = this.authentificationQuery.uuid$.subscribe((uuid: any) => {
      if(uuid) {
        this.loggedInUserId = uuid;
      }
    })
  }

  async loadInitialData(): Promise<void> {
    console.log('called')
    this.error = false;
    this.loading = true;
    console.log(this.error)
    console.log(this.loading)
    if(this.selectedProfileId) {
      try {
        await this.profileService.upsert(this.selectedProfileId);
        this.profileSubscription = this.profileQuery.selectEntity(this.selectedProfileId).subscribe((profile: Profile | undefined) => {
          if(profile) {
            console.log('loaded profile data from store again')
            console.log(profile)
            this.profile = profile;
          }
        })
        this.profileRealtimeChangesSubscription = this.profileService.getRealTimeChanges(this.selectedProfileId);
        this.profilesCounterRealtimeChangesSubscription = this.profileService.getRealTimeChangesCounters(this.selectedProfileId);
        this.followerRealTimeChangesSubscription = this.profileService.getRealTimeChangesIfStillFollower(this.selectedProfileId);
      } catch(error: any) {
        this.messageService.add({severity:'error', summary: error.message});
        this.error = true;
        this.errorMessage = error.message;
      } finally {
        this.loading = false;
      }
    }

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

  async followOrUnfollowProfile(): Promise<void> {
    if(this.selectedProfileId) {
      if(this.profileUI.isFollowing) {
        try {
          this.loading = true;
          await this.followingservice.unfollowTransaction(this.selectedProfileId)
          if(this.selectedProfileId) {
            this.profileService.updateIsFollowing(this.selectedProfileId, false);
            this.messageService.add({severity:'success', summary: 'Eine Ideenquelle weniger.'});
          }
        } catch(error: any) {
          this.messageService.add({severity:'error', summary: error});
        } finally {
          this.loading = false;
        }
      } else {
        try {
          this.loading = true;
          await this.followingservice.followTransaction(this.selectedProfileId)
          if(this.selectedProfileId) {
            this.profileService.updateIsFollowing(this.selectedProfileId, true);
            this.messageService.add({severity:'success', summary: 'Du folgst einer neuen Inspirationsquelle.'});
          }
        } catch(error: any) {
          this.messageService.add({severity:'error', summary: error});
        } finally {
          this.loading = false;
        }
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
    if(this.profileSubscription) {
      this.profileSubscription.unsubscribe()
    }
    if(this.profileRealtimeChangesSubscription) {
      this.profileRealtimeChangesSubscription.unsubscribe()
    }
    if(this.followerRealTimeChangesSubscription) {
      this.followerRealTimeChangesSubscription.unsubscribe()
    }
    if(this.userSubscription) {
      this.userSubscription.unsubscribe()
    }
    if(this.profileUISubscription) {
      this.profileUISubscription.unsubscribe()
    }
    if(this.profilesCounterRealtimeChangesSubscription) {
      this.profilesCounterRealtimeChangesSubscription.unsubscribe()
    }
  }
}
