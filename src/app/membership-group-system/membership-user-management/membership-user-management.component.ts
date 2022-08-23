import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { GroupsService } from 'src/app/groups/services/groups.service';
import { MembershipService } from '../services/membership.service';
import { AuthentificationQuery } from 'src/app/authentification/state/authentification.query';
import { Group } from 'src/app/groups/state/group.model';

@Component({
  selector: 'app-membership-user-management',
  templateUrl: './membership-user-management.component.html',
  styleUrls: ['./membership-user-management.component.scss'],
  providers: [MessageService]
})
export class MembershipUserManagementComponent implements OnInit {
  selectedGroupId: string = '';
  groups: any[] = [];

  link: string = '';
  titleYourGroups: string = 'Deine Gruppen';
  noGroups: string = 'Du bist in noch keiner Gruppe Mitglied.';


  constructor(
    private membershipService: MembershipService,
    private messageService: MessageService,
    private groupsService: GroupsService,
    private authentificationQuery: AuthentificationQuery
  ) { }

  ngOnInit(): void {
    this.link = `/profile/edit`;
    this.getAllGroups();

  }
// id: string
  leaveGroup(event: {id: string, user_id: string}): void {
    let loggedInID: string | null = '';
    this.authentificationQuery.uuid$.subscribe(uuid => {
      loggedInID = uuid;
    });
    if (loggedInID) {
      this.membershipService.removeMember(loggedInID, event.user_id)
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
      console.log(groupList)
      groupList.data.forEach((results: any) => {
        let group: Group = {
          'id': results.group_id,
          'name': results.groups.name,
          'level': results.groups.level,
          'creator': results.groups.creator,
          'description': results.groups.description,
          'avatar_url': results.groups.avatar_url,
          street: '',
          post_code: '',
          city: '',
          contact_phone: '',
          contact_email: ''
        }
        this.groups.push(group);
      },
      console.log(this.groups)
    )})
  }

}
