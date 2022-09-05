import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { GroupsService } from 'src/app/groups/services/groups.service';
import { MembershipService } from '../services/membership.service';
import { AuthentificationQuery } from 'src/app/authentification/state/authentification.query';
import { profile_list_item } from 'src/app/groups/state/profile_list_item.model';
import { ProfileService } from 'src/app/profile/state/profile.service';
import { Subscription } from 'rxjs';
import { ProfileQuery } from 'src/app/profile/state/profile.query';
import { ProfileStore } from 'src/app/profile/state/profile.store';
import { Profile } from 'src/app/profile/state/profile.model';
import { RealtimeSubscription } from '@supabase/supabase-js';

@Component({
  selector: 'app-membership-user-management',
  templateUrl: './membership-user-management.component.html',
  styleUrls: ['./membership-user-management.component.scss'],
  providers: [MessageService]
})
export class MembershipUserManagementComponent implements OnInit {
  selectedGroupId: string = '';
  groupsOfUser: profile_list_item[] | undefined = [];

  link: string = '';
  titleYourGroups: string = 'Deine Gruppen';
  noGroups: string = 'Du bist in noch keiner Gruppe Mitglied.';

  loggedInID: string | null = '';

  loadingInitial: boolean = false;
  error: boolean = false;
  errorMessage: string | undefined;

  authSubscription: Subscription | undefined;
  profileSubscription: Subscription | undefined;
  groupsRealtimeSubscription: RealtimeSubscription | undefined;

  constructor(
    private membershipService: MembershipService,
    private authentificationQuery: AuthentificationQuery,
    private messageService: MessageService,
    private groupsService: GroupsService,
    private profileService: ProfileService,
    private profileQuery: ProfileQuery,
    private profileStore: ProfileStore
  ) {}

  ngOnInit(): void {
    this.link = `/profile/edit`;
    this.authSubscription = this.authentificationQuery.uuid$.subscribe(uuid => {
      this.loggedInID = uuid;
    });
    this.loadInitialData();
    if(this.loggedInID) {
      this.profileSubscription = this.profileQuery.selectEntity(this.loggedInID)
      .subscribe((profile: Profile | undefined) => {
        if(profile) {
          this.groupsOfUser = profile.groups;
        }
      })
      this.groupsRealtimeSubscription = this.profileService.getRealTimeChangesGroupsOfProfile(this.loggedInID);
    }
  }

  ngOnDestroy(): void {
    if(this.groupsRealtimeSubscription) {
      this.groupsRealtimeSubscription.unsubscribe()
    }
    if(this.authSubscription) {
      this.authSubscription.unsubscribe()
    }
    if(this.profileSubscription) {
      this.profileSubscription.unsubscribe()
    }
  }

  async loadInitialData(): Promise<void> {
    try{
      this.loadingInitial = true;
      this.error = false;
      await this.getAllGroups();
    } catch(error: any) {
      this.error = true;
      this.errorMessage = error.message;
      this.messageService.add({severity:'error', summary: error.message})
    } finally {
      this.loadingInitial = false;
    }
  }

  async leaveGroup(event: {id: string, user_id: string}): Promise<void> {
    try {
      if (this.loggedInID) {
        await this.membershipService.removeMemberByMembershipId(event.id, this.loggedInID, event.user_id, )
        this.messageService.add({severity:'success', summary: 'Du bist aus einer Gruppe ausgetreten.'});
      }
    } catch(error: any) {
      this.messageService.add({severity:'error', summary: error.message})

    }
  }

  async getAllGroups(): Promise<void> {
    console.log(1)
    const groupList: {data: any, error: any} = await this.groupsService.getAllGroupsOfId();
    if(groupList.data) {
      let groupsOfUser: profile_list_item[] = [];
      console.log('groupList')
      console.log(groupList)
      groupList.data.forEach((results: {
        id: string,
        group_id: string,
        groups: {
          avatar_url: string,
          creator: string,
          description: string,
          level: string,
          name: string
        }
      }) => {
        let group: profile_list_item = {
          id: results.id,
          name: results.groups.name,
          avatar_url: results.groups.avatar_url,
          user_id: results.group_id,
          isGroup: true
        }
        groupsOfUser.push(group);
      })
      this.profileStore.upsert(this.loggedInID, {groups: groupsOfUser})
    }
    if(groupList.error) throw new Error(groupList.error.message);
  }
}
