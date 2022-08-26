import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { GroupsService } from 'src/app/groups/services/groups.service';
import { MembershipService } from '../services/membership.service';
import { AuthentificationQuery } from 'src/app/authentification/state/authentification.query';
import { profile_list_item } from 'src/app/groups/state/profile_list_item.model';
import { ProfileService } from 'src/app/profile/state/profile.service';
import { Observable } from 'rxjs';
import { ProfileQuery } from 'src/app/profile/state/profile.query';
import { ProfileStore } from 'src/app/profile/state/profile.store';
import { Profile } from 'src/app/profile/state/profile.model';

@Component({
  selector: 'app-membership-user-management',
  templateUrl: './membership-user-management.component.html',
  styleUrls: ['./membership-user-management.component.scss'],
  providers: [MessageService]
})
export class MembershipUserManagementComponent implements OnInit {
  selectedGroupId: string = '';
  profile$ = new Observable<Profile | undefined>();
  groupsOfUser: profile_list_item[] | undefined = [];

  link: string = '';
  titleYourGroups: string = 'Deine Gruppen';
  noGroups: string = 'Du bist in noch keiner Gruppe Mitglied.';

  loggedInID: string | null = '';

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
    this.authentificationQuery.uuid$.subscribe(uuid => {
      this.loggedInID = uuid;
    });
    this.getAllGroups();
    if(this.loggedInID) {
      this.profile$ = this.profileQuery.selectEntity(this.loggedInID);
      this.profile$.subscribe((profile: Profile | undefined) => {
        if(profile) {
          this.groupsOfUser = profile.groups;
        }
      })
      this.profileService.getRealTimeChangesGroupsOfProfile(this.loggedInID);
    }
  }
// id: string
  leaveGroup(event: {id: string, user_id: string}): void {
    console.log('test')
    console.log('membership_id')
    console.log(event.id)
    console.log('user:id')
    console.log(this.loggedInID)
    console.log('group:id')
    console.log(event.user_id)

    if (this.loggedInID) {
      this.membershipService.removeMemberByMembershipId(event.id, this.loggedInID, event.user_id, )
      .then(() => {
        this.getAllGroups();
        this.messageService.add({severity:'success', summary: 'Du bist aus einer Gruppe ausgetreten.'});
      })
      .catch((error: any) =>  {
        this.messageService.add({severity:'error', summary: error})
      })
    }

  }

  getAllGroups(): void {
    console.log(1)
    this.groupsService.getAllGroupsOfId()
    .then((groupList) => {
      /**review**/
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
    })
  }
}
