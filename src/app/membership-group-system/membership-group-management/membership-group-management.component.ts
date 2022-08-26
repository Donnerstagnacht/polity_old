import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import { Group } from 'src/app/groups/state/group.model';
import { GroupsQuery } from 'src/app/groups/state/groups.query';
import { GroupsService } from 'src/app/groups/state/groups.service';
import { MembershipService } from '../services/membership.service';

@Component({
  selector: 'app-membership-group-management',
  templateUrl: './membership-group-management.component.html',
  styleUrls: ['./membership-group-management.component.scss'],
  providers: [MessageService]
})
export class MembershipGroupManagementComponent implements OnInit {
  selectedGroupId: string = '';
  membershipRequests: any[] = [];
  members: any[] = [];

  group$ = new Observable<Group | undefined>();

  link: string = '';
  titleMembershipRequests: string = 'Beitrittsanfragen';
  noDataMembershiprequests: string = 'Du hast aktuell keine offenen Beitrittsanfragen.';
  titleMembers: string = 'Mitglieder';
  noDataMembers: string = 'Du hast aktuell noch keine Mitglieder.';

  constructor(
    private membershipService: MembershipService,
    private messageService: MessageService,
    private route: ActivatedRoute,
    private groupService: GroupsService,
    private groupQuery: GroupsQuery
  ) { }

  ngOnInit(): void {
    this.getSelectedId();
    this.link = `/groups/${this.selectedGroupId}/edit`;
    this.groupService.getAllMemberShipRequests(this.selectedGroupId);
    this.getAllMembershipRequests();
    // this.getAllMembers();
    this.groupService.getAllMembers(this.selectedGroupId)
    this.groupService.getRealTimeChangesMembers(this.selectedGroupId)
    this.groupService.getRealTimeChangesMembershipRequests(this.selectedGroupId)
  }

  getAllMembershipRequests(): void {
    this.group$ = this.groupQuery.selectEntity(this.selectedGroupId);
    this.group$.subscribe((group: Group | undefined) => {
      if(group?.membership_requests) {
        console.log('called requests');
        console.log(group.membership_requests)
        this.membershipRequests = []
        this.membershipRequests = group.membership_requests;
      }
      if(group?.members) {
        console.log('group mebers exist from observable')
        this.members = [];
        this.members = group.members;
      }
    })
  }

  getSelectedId(): void {
    this.route.paramMap.subscribe(parameter => {
    this.selectedGroupId = String(parameter.get('id'));
    })
  }

  acceptMembershipRequest(event: {id: string, user_id: string}): void {
    console.log('user_id')
    console.log(event.user_id)
    console.log('group_id')
    console.log(this.selectedGroupId)
    console.log('request_id')
    console.log(event.id)
    this.membershipService.confirmMembershipRequest(event.user_id, this.selectedGroupId, event.id)
    .then(() => {
      // this.getAllMembershipRequests();
      this.messageService.add({severity:'success', summary: 'Du hast ein neues Mitglied aufgenommen.'});
    })
    .catch((error: any) =>  {
      this.messageService.add({severity:'error', summary: error})
    })
  }

  cancelMembershipRequest(event: {id: string, user_id: string }): void {
    console.log('canceld called')
    console.log(event.id)
    this.membershipService.removeMembershipRequestById(event.id)
    .then((results) => {
      console.log(results)
      /// this.getAllMembershipRequests();
      this.messageService.add({severity:'success', summary: 'Anfrage entfernt.'});
    })
    .catch((error: any) =>  {
      this.messageService.add({severity:'error', summary: error})
    })
  }

/*   getAllMembers(): void {
    this.membershipService.getAllMembers(this.selectedGroupId)
    .then((members) => {
      this.members = [];
      members.data.forEach((profile: any) => {
        let id: any = profile.profiles.id;
        let name: any = profile.profiles.name;
        let avatar_url: any = profile.profiles.avatar_url;
        this.members.push({
          'id': id,
          'name': name,
          'avatar_url': avatar_url
        });
      });
    })
    .catch((error) => {
      this.messageService.add({severity:'error', summary: 'Fehler beim laden. ' + error});
    });
  } */

  removeMember(event: {id: string, user_id: string}): void {
    console.log('user_id')
    console.log(event.user_id)
    console.log('membership_id')
    console.log(event.id)
    this.membershipService.removeMemberByMembershipId(event.id, event.user_id, this.selectedGroupId)
    .then(() => {
      // this.getAllMembershipRequests();
      this.messageService.add({severity:'success', summary: 'Mitglied entfernt.'});
    })
    .catch((error: any) =>  {
      this.messageService.add({severity:'error', summary: error})
    })
  }

}
