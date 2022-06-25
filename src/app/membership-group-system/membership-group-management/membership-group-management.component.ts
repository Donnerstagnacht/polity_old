import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
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

  link: string = '';
  titleMembershipRequests: string = 'Beitrittsanfragen';
  noDataMembershiprequests: string = 'Du hast aktuell keine offenen Beitrittsanfragen.';
  titleMembers: string = 'Mitglieder';
  noDataMembers: string = 'Du hast aktuell noch keine Mitglieder.';

  constructor(
    private membershipService: MembershipService,
    private messageService: MessageService,
    private route: ActivatedRoute

  ) { }

  ngOnInit(): void {
    this.getSelectedId();
    this.link = `/groups/${this.selectedGroupId}/edit`;
    this.getAllMembershipRequests();
    this.getAllMembers();

  }

  getAllMembershipRequests(): void {
    this.membershipService.getAllMembershipRequests(this.selectedGroupId)
    .then((membershipRequests) => {
      this.membershipRequests = [];
      membershipRequests.data.forEach((profile: any) => {
        let id: any = profile.profiles.id;
        let username: any = profile.profiles.username;
        let avatar_url: any = profile.profiles.avatar_url;
        this.membershipRequests.push({
          'id': id,
          'username': username,
          'avatar_url': avatar_url
        });
      });
    })
    .catch((error) => {
      this.messageService.add({severity:'error', summary: 'Fehler beim laden. ' + error});
    });
  }

  getSelectedId(): void {
    this.route.paramMap.subscribe(parameter => {
    this.selectedGroupId = String(parameter.get('id'));
    })
  }

  acceptMembershipRequest(id: string): void {
    this.membershipService.confirmMembershipRequest(id, this.selectedGroupId)
    .then(() => {
      this.getAllMembershipRequests();
      this.messageService.add({severity:'success', summary: 'Du hast ein neues Mitglied aufgenommen.'});
    })
    .catch((error: any) =>  {
      this.messageService.add({severity:'error', summary: error})
    })
  }

  cancelMembershipRequest(id: string): void {
    this.membershipService.removeMembershipRequest(id, this.selectedGroupId)
    .then((results) => {
      console.log(results)
      this.getAllMembershipRequests();
      this.messageService.add({severity:'success', summary: 'Follower entfernt.'});
    })
    .catch((error: any) =>  {
      this.messageService.add({severity:'error', summary: error})
    })
  }

  getAllMembers(): void {
    this.membershipService.getAllMembers(this.selectedGroupId)
    .then((members) => {
      this.members = [];
      members.data.forEach((profile: any) => {
        let id: any = profile.profiles.id;
        let username: any = profile.profiles.username;
        let avatar_url: any = profile.profiles.avatar_url;
        this.members.push({
          'id': id,
          'username': username,
          'avatar_url': avatar_url
        });
      });
    })
    .catch((error) => {
      this.messageService.add({severity:'error', summary: 'Fehler beim laden. ' + error});
    });
  }

  removeMember(id: string): void {
    this.membershipService.removeMember(id, this.selectedGroupId)
    .then(() => {
      this.getAllMembershipRequests();
      this.messageService.add({severity:'success', summary: 'Follower entfernt.'});
    })
    .catch((error: any) =>  {
      this.messageService.add({severity:'error', summary: error})
    })
  }

}
