import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RealtimeSubscription } from '@supabase/supabase-js';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { Group } from 'src/app/groups/state/group.model';
import { GroupsQuery } from 'src/app/groups/state/groups.query';
import { GroupsService } from 'src/app/groups/state/groups.service';
import { FollowingGroupsService } from '../services/following-groups.service';

@Component({
  selector: 'app-follower-group-management',
  templateUrl: './follower-group-management.component.html',
  styleUrls: ['./follower-group-management.component.scss'],
  providers: [MessageService]
})
export class FollowerGroupManagementComponent implements OnInit, OnDestroy {
  group: Group | undefined;
  followers: any[] = [];
  followings: any[] = [];
  selectedGroupId: string = '';
  link: string = '';
  titleFollower: string = 'Follower';
  noDataFollower: string = 'Du hast noch keine Follower.';

  loading: boolean = false;
  followerSubscription!: Subscription;
  realTimeSubscriptionFollower!: RealtimeSubscription;
  realTimeSubscriptionGroup!: RealtimeSubscription;

  loadingInitial: boolean = false;
  error: boolean = false;
  errorMessage: string | undefined;

  constructor(
    private followingGroupsService: FollowingGroupsService,
    private groupsService: GroupsService,
    private groupQuery: GroupsQuery,
    private messageService: MessageService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.getSelectedId();
    this.link = `/groups/${this.selectedGroupId}/edit`;
    this.loadInitialData();
  }

  ngOnDestroy(): void {
      if(this.followerSubscription) {
        this.followerSubscription.unsubscribe()
      }
      if(this.realTimeSubscriptionFollower) {
        this.realTimeSubscriptionFollower.unsubscribe()
      }
      if(this.realTimeSubscriptionGroup) {
        this.realTimeSubscriptionGroup.unsubscribe()
      }
  }

  async loadInitialData(): Promise<void> {
    try{
      this.loadingInitial = true;
      this.error = false;
      await this.groupsService.getAllFollowers(this.selectedGroupId);
      this.getAllFollowerFromStore();
    } catch(error: any) {
      this.error = true;
      this.errorMessage = error.message;
      this.messageService.add({severity:'error', summary: error.message})
    } finally {
      this.loadingInitial = false;
    }
  }

  getAllFollowerFromStore(): void {
    this.followerSubscription = this.groupQuery.selectEntity(this.selectedGroupId).subscribe((group: Group | undefined) => {
      if(group?.followers) {
        this.followers = []
        this.followers = group.followers;
      }
      this.realTimeSubscriptionFollower = this.groupsService.getRealTimeChangesFollowers(this.selectedGroupId);
      this.realTimeSubscriptionGroup = this.groupsService.getRealTimeChanges(this.selectedGroupId);
    })
  }

  async onRemoveFollower(event: {id: string, user_id: string}): Promise<void> {
    try {
      this.loading = true;
      await this.followingGroupsService.removeFollowerTransaction(event.user_id, this.selectedGroupId)
      this.messageService.add({severity:'success', summary: 'Follower entfernt.'});
    } catch(error: any) {
      this.messageService.add({severity:'error', summary: error.message})
    } finally {
      this.loading = false;
    }
  }

  getSelectedId(): void {
    this.route.paramMap.subscribe(parameter => {
    this.selectedGroupId = String(parameter.get('id'));
    })
  }
}
