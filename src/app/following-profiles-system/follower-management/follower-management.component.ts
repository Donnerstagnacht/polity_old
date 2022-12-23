import { Component, OnInit } from '@angular/core';
import { RealtimeChannel } from '@supabase/supabase-js';
import { MessageService } from 'primeng/api';
import { AuthentificationQuery } from 'src/app/authentification/state/authentification.query';
import { FollowingGroupsService } from 'src/app/following-groups-system/services/following-groups.service';
import { Profile } from 'src/app/profile/state/profile.model';
import { ProfileQuery } from 'src/app/profile/state/profile.query';
import { ProfileService } from 'src/app/profile/state/profile.service';
import { FollowingService } from '../services/following.service';
import { Subscription } from 'rxjs';
import { PaginationData } from 'src/app/utilities/storage/services/pagination-frontend.service';

@Component({
  selector: 'app-follower-management',
  templateUrl: './follower-management.component.html',
  styleUrls: ['./follower-management.component.scss'],
  providers: [MessageService]
})
export class FollowerManagementComponent implements OnInit {
  columns: any[] = [];
  followers: any[] = [];
  followings: any[] = [];
  titleFollower: string = 'Follower';
  titleFollowings: string = 'Followings';
  noDataFollower: string = 'Du hast noch keine Follower.';
  noDataFollowings: string = 'Du folgst noch niemanden.';
  loggedInID: string = '';
  filterString: string = '';

  loadingInitial: boolean = false;
  loadingFollower: boolean = false;
  loadingFollowing: boolean = false;

  error: boolean = false;
  errorFollower: boolean = false;
  errorFollowing: boolean = false;

  errorMessage: string | undefined;

  profileFollowerRealtimeChannel: RealtimeChannel | undefined;
  groupFollowerRealtimeChannel: RealtimeChannel | undefined;
  profileSubscription: Subscription | undefined;
  authSubscription: Subscription | undefined;

  paginationDataFirstTab: PaginationData = {
    from: 0,
    to: 2,
    canLoad: true,
    reloadDelay: 2000,
    sizeOfNewLoad: 10,
    numberOfSearchResults: 0
  }

  paginationDataSecondTab: PaginationData = {
    from: 0,
    to: 2,
    canLoad: true,
    reloadDelay: 2000,
    sizeOfNewLoad: 10,
    numberOfSearchResults: 0
  }

  constructor(
    private followingService: FollowingService,
    private messageService: MessageService,
    private profileQuery: ProfileQuery,
    private profileService: ProfileService,
    private followingGroupsService: FollowingGroupsService,
    private authentificationQuery: AuthentificationQuery
  ) { }

  ngOnInit(): void {
    this.getProfileId();
    this.loadInitialData();
  }

  ngOnDestroy(): void {
    if(this.profileFollowerRealtimeChannel) {
      this.profileFollowerRealtimeChannel.unsubscribe();
    }
    if(this.groupFollowerRealtimeChannel) {
      this.groupFollowerRealtimeChannel.unsubscribe();
    }
    if(this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
    if(this.profileSubscription) {
      this.profileSubscription.unsubscribe();
    }
  }

  async loadInitialData(): Promise<void> {
    console.log('before getFollowingSystem')
    this.getFollowingSystem();
    try{
      this.loadingInitial = true;
      this.loadingFollower = true;
      this.error = false;
      this.loadingInitial = this.loadingFollower || this.loadingFollowing;
      await this.profileService.getAllFollowers(this.loggedInID);
    } catch(error: any) {
      this.errorFollower = true;
      this.error = this.errorFollower || this.errorFollowing;
      this.errorMessage = error.message;
      this.messageService.add({severity:'error', summary: error.message})
    } finally {
      this.loadingFollower = false;
      this.loadingInitial = this.loadingFollower || this.loadingFollowing;
    }

    if(!this.errorFollower) {
      try{
        this.loadingFollowing = true;
        this.errorFollowing = false;
        await this.profileService.getAllFollowings(this.loggedInID);
      } catch(error: any) {
        this.errorFollowing = true;
        this.error = this.errorFollower || this.errorFollowing;
        this.errorMessage = error.message;
        this.messageService.add({severity:'error', summary: error.message})
      } finally {
        this.loadingFollowing = false;
        this.loadingInitial = this.loadingFollower || this.loadingFollowing;
      }
    }

    this.profileFollowerRealtimeChannel = this.profileService.getRealTimeChangesFollowerSystem(this.loggedInID);
    this.groupFollowerRealtimeChannel = this.profileService.getRealTimeChangesGroupFollowerSystem(this.loggedInID);
  }

  getProfileId(): void {
    this.authSubscription = this.authentificationQuery.uuid$.subscribe(uuid => {
      if(uuid) {
        this.loggedInID = uuid;
      }
    });
  }

  getFollowingSystem(): void {
    this.profileSubscription = this.profileQuery.selectEntity(this.loggedInID)
    .subscribe((profile: Profile | undefined) => {
      if(profile?.followers) {
        this.followers = []
        this.followers = profile.followers;
        this.paginationDataFirstTab.numberOfSearchResults = this.followers.length;
        console.log('followers')
        console.log(this.followers)
      }
      if(profile?.followings) {
        this.followings = []
        this.followings = profile.followings;
        this.paginationDataSecondTab.numberOfSearchResults = this.followings.length;
        console.log('followings')
        console.log(this.followings)
      }
    })
  }

  async onRemoveFollower(event: {id: string, user_id: string, isGroup?: boolean | undefined}): Promise<void> {
    if(event.isGroup) {
    } else {
      try {
        await this.followingService.removeFollowerTransactionFromEvent(event);
        this.messageService.add({severity:'success', summary: 'Follower entfernt.'});
      } catch(error: any) {
        this.messageService.add({severity:'error', summary: error});
      }
    }
  }

  async onUnFollow(event: {id: string, user_id: string, boolean?: boolean}): Promise<void> {
    const isGroup: boolean | undefined = event.boolean;
    const group_id: string = event.user_id;
    if(isGroup) {
      try {
        await this.followingGroupsService.removeFollowerTransaction(this.loggedInID, group_id);
        this.messageService.add({severity:'success', summary: 'Du folgst der Gruppe nicht mehr.'});
      } catch(error: any) {
        this.messageService.add({severity:'error', summary: error});
      }
    } else {
      try {
        await this.followingService.unfollowTransaction(event.user_id);
        this.messageService.add({severity:'success', summary: 'Du folgst der Person nicht mehr.'});
      } catch(error: any) {
        this.messageService.add({severity:'error', summary: error});
      }
    }
  }
}
