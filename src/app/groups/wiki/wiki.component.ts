import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MegaMenuItem, MenuItem, MessageService } from 'primeng/api';
import { Observable, Subscription } from 'rxjs';
import { FollowingGroupsService } from 'src/app/following-groups-system/services/following-groups.service';
import { groupsMenuitemsParameter, groupsMenuitemsMegaParameter, groupsMenuitemsMegaParameterLoggedIn, groupsMenuitemsParameterLoggedIn } from '../state/groupMenuItems';
import { GroupsService } from '../services/groups.service';
import { GroupsQuery } from '../state/groups.query';
import { GroupsService as GroupsServiceState } from '../state/groups.service';
import { Group, GroupUI } from '../state/group.model';
import { MembershipService } from 'src/app/membership-group-system/services/membership.service';
import { RealtimeChannel } from '@supabase/supabase-js';
@Component({
  selector: 'app-wiki',
  templateUrl: './wiki.component.html',
  styleUrls: ['./wiki.component.scss'],
  providers: [MessageService]
})
export class WikiComponent implements OnInit, OnDestroy {
  menuItemsSpecial: MenuItem[] = [];
  menuItemsStandart: MenuItem[] = [];
  menuItemsMegaSpecial: MegaMenuItem[] = [];
  menuItemsMegaStandart: MegaMenuItem[] = [];


  selectedGroupId: string | undefined = undefined;
  group: Group | undefined;
  groupUI!: GroupUI;

  groupSubscription!: Subscription;
  groupRealTimeSubscription!: RealtimeChannel;
  groupsCountersRealTimeSubscription!: RealtimeChannel;
  getRealTimeSubscriptionIsAdmin!: RealtimeChannel;
  getRealTimeSubscriptionIsFollower!: RealtimeChannel;
  realTimeSubscriptionFollowers!: RealtimeChannel;
  uiSubscription!: Subscription;

  loadsFollow: boolean = false;
  loadsMembership: boolean = false;

  loadingInitial: boolean = false;
  loading: boolean = false;
  error: boolean = false;
  errorMessage: string | undefined;

  constructor(
    private route: ActivatedRoute,
    private groupsService: GroupsService,
    private groupsServiceState: GroupsServiceState,
    private messageService: MessageService,
    private followingGroupsService: FollowingGroupsService,
    private membershipService: MembershipService,
    private groupsQuery: GroupsQuery
  ) { }

  ngOnInit(): void {
    this.getSelectedId();
    if(this.selectedGroupId) {
      this.uiSubscription = this.groupsQuery.selectUI$(this.selectedGroupId).subscribe((ui: GroupUI | undefined) => {
        if (ui) {
          this.groupUI = ui;
        }
      })
    }
    if(this.selectedGroupId) {
      this.checkIfLoggedInUserIsAdmin(this.selectedGroupId);
      this.checkIfAlreadyFollower();
    }
    this.loadInitialData();

    if (this.selectedGroupId) {
      this.menuItemsSpecial = groupsMenuitemsParameterLoggedIn(this.selectedGroupId);
      this.menuItemsStandart = groupsMenuitemsParameter(this.selectedGroupId);
      this.menuItemsMegaSpecial = groupsMenuitemsMegaParameterLoggedIn(this.selectedGroupId);
      this.menuItemsMegaStandart = groupsMenuitemsMegaParameter(this.selectedGroupId);
    }
  }

  ngOnDestroy(): void {
      if(this.groupSubscription) {
        this.groupSubscription.unsubscribe();
      }
      if(this.groupRealTimeSubscription) {
        this.groupRealTimeSubscription.unsubscribe();
      }
      if(this.getRealTimeSubscriptionIsAdmin) {
        this.getRealTimeSubscriptionIsAdmin.unsubscribe();
      }
      if(this.getRealTimeSubscriptionIsFollower) {
        this.getRealTimeSubscriptionIsFollower.unsubscribe();
      }
      if(this.uiSubscription) {
        this.uiSubscription.unsubscribe();
      }
      if(this.realTimeSubscriptionFollowers) {
        this.realTimeSubscriptionFollowers.unsubscribe();
      }
      if(this.groupsCountersRealTimeSubscription) {
        this.groupsCountersRealTimeSubscription.unsubscribe();
      }
  }

  async loadInitialData(): Promise<void> {
    this.error = false;
    this.loadingInitial = true;
    if(this.selectedGroupId) {
      try {
        await this.groupsServiceState.findGroup(this.selectedGroupId);
        this.groupSubscription = this.groupsQuery.selectEntity(this.selectedGroupId).subscribe((group: Group | undefined) => {
          if(group) {
            this.group = group;
          }
        })
        this.groupRealTimeSubscription = this.groupsServiceState.getRealTimeChanges(this.selectedGroupId);
        this.groupsCountersRealTimeSubscription = this.groupsServiceState.getRealTimeChangesGroupsCounters(this.selectedGroupId);
        this.getRealTimeSubscriptionIsAdmin = this.followingGroupsService.getRealTimeChangesIfStillFollower(this.selectedGroupId);
        this.getRealTimeSubscriptionIsFollower = this.membershipService.getRealTimeChangesIfStillAdmin(this.selectedGroupId);
        this.realTimeSubscriptionFollowers = this.groupsServiceState.getRealTimeChangesFollowers(this.selectedGroupId);
      } catch(error: any) {
        this.error = true;
        this.errorMessage = error.message
        this.messageService.add({severity:'error', summary: error.message});
      } finally {
        this.loadingInitial = false;
      }
    }
  }

  getSelectedId(): void {
    this.route.paramMap.subscribe(parameter => {
      this.selectedGroupId = String(parameter.get('id'));
    });
  }

  async checkIfLoggedInUserIsAdmin(selectedGroupId: string): Promise<void> {
    try {
      this.error = false;
      this.loading = true;
      await this.groupsService.isLoggedInUserAdmin(selectedGroupId)
      this.groupsServiceState.updateIsAdmin(selectedGroupId, true);
    } catch(error: any) {
      this.groupsServiceState.updateIsAdmin(selectedGroupId, false);
    } finally {
      this.loading = false;
    }
  }

  async checkIfAlreadyFollower(): Promise<void> {
    try {
      if(this.selectedGroupId) {
        this.error = false;
        this.loading = true;
        await this.followingGroupsService.isAlreadyFollower(this.selectedGroupId);
        if(this.selectedGroupId) {
          this.groupsServiceState.updateIsFollowing(this.selectedGroupId, true);
        }
      }
    } catch(error: any) {
      if(this.selectedGroupId) {
        this.groupsServiceState.updateIsFollowing(this.selectedGroupId, false);
      }
    } finally {
      this.loading = false;
    }
  }

  async followOrUnfollowGroup(): Promise<void> {
    if (this.selectedGroupId) {
      if(this.groupUI?.isFollowing) {
        try {
          this.loadsFollow = true;
          await this.followingGroupsService.unfollowTransaction(this.selectedGroupId)
          if(this.selectedGroupId) {
            this.groupsServiceState.updateIsFollowing(this.selectedGroupId, false);
            this.messageService.add({severity:'success', summary: 'Eine Ideenquelle weniger.'});
          }
        } catch(error: any) {
            this.messageService.add({severity:'error', summary: error});
        } finally {
          this.loadsFollow = false;
        }
      } else {
        try {
          this.loadsFollow = true;
          await this.followingGroupsService.followTransaction(this.selectedGroupId)
          if(this.selectedGroupId) {
            this.groupsServiceState.updateIsFollowing(this.selectedGroupId, true)
            this.messageService.add({severity:'success', summary: 'Du folgst einer neuen Inspirationsquelle.'});
          }
        } catch(error: any) {
          this.messageService.add({severity:'error', summary: error.message});
        } finally {
          this.loadsFollow = false;
        }
      }
    }
  }
}
