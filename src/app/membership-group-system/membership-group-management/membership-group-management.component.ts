import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RealtimeSubscription } from '@supabase/supabase-js';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { Group } from 'src/app/groups/state/group.model';
import { GroupsQuery } from 'src/app/groups/state/groups.query';
import { GroupsService } from 'src/app/groups/state/groups.service';
import { PaginationData } from 'src/app/utilities/storage/services/pagination-frontend.service';
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

  loadMemebershipRequests: boolean = false;
  loadMembers: boolean = false;
  loadingInitial: boolean = false;
  error: boolean = false;
  errorMembershipRequests: boolean = false;
  errorMembers: boolean = false;
  errorMessage: string | undefined;

  membersRealtimeSubscription: RealtimeSubscription | undefined;
  membershipRequestsRealtimeSubscription: RealtimeSubscription | undefined;
  groupSubscription: Subscription | undefined;

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
    private membershipService: MembershipService,
    private messageService: MessageService,
    private route: ActivatedRoute,
    private groupService: GroupsService,
    private groupQuery: GroupsQuery
  ) { }

  ngOnInit(): void {
    this.getSelectedId();
    this.link = `/groups/${this.selectedGroupId}/edit`;
    this.loadInitialData();
    this.membersRealtimeSubscription = this.groupService.getRealTimeChangesMembers(this.selectedGroupId)
    this.membershipRequestsRealtimeSubscription = this.groupService.getRealTimeChangesMembershipRequests(this.selectedGroupId)
  }

  ngOnDestroy(): void {
    if(this.membersRealtimeSubscription) {
      this.membersRealtimeSubscription.unsubscribe();
    }
    if(this.membershipRequestsRealtimeSubscription) {
      this.membershipRequestsRealtimeSubscription.unsubscribe();
    }
    if(this.groupSubscription) {
      this.groupSubscription.unsubscribe();
    }
  }

  async loadInitialData(): Promise<void> {
    try{
      this.error = false;
      this.errorMembers = false;
      this.loadMemebershipRequests = true;
      this.loadingInitial = this.loadMemebershipRequests || this.loadMembers;
      this.errorMembershipRequests = false;
      await this.groupService.processGetAllMemberShipRequests(this.selectedGroupId);
    } catch(error: any) {
      this.errorMembershipRequests = true;
      this.error = this.errorMembershipRequests || this.errorMembers
      this.errorMessage = error.message;
      this.messageService.add({severity:'error', summary: error.message})
    } finally {
      this.loadMemebershipRequests = false;
      this.loadingInitial =  this.loadMemebershipRequests || this.loadMembers;
    }

    if(!this.errorMembershipRequests) {
      try{
        this.error = false;
        this.errorMembers = false;

        this.loadMembers = true;
        this.loadingInitial =  this.loadMemebershipRequests || this.loadMembers;
        await this.groupService.getAllMembers(this.selectedGroupId);
      } catch(error: any) {
        this.errorMembers = true;
        this.error = this.errorMembershipRequests || this.errorMembers;
        this.errorMessage = error.message;
        this.messageService.add({severity:'error', summary: error.message});
      } finally {
        this.loadMembers = false;
        this.loadingInitial =  this.loadMemebershipRequests || this.loadMembers;
      }
    }
    this.getAllMembersAndMembershipRequestsFromStore();
  }

  async getAllMembersAndMembershipRequestsFromStore(): Promise<void> {
    this.groupSubscription = this.groupQuery.selectEntity(this.selectedGroupId)
    .subscribe((group: Group | undefined) => {
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

  async acceptMembershipRequest(event: {id: string, user_id: string}): Promise<void> {
    try {
      await this.membershipService.confirmMembershipRequest(event.user_id, this.selectedGroupId, event.id);
      this.messageService.add({severity:'success', summary: 'Du hast ein neues Mitglied aufgenommen.'});
    } catch(error: any) {
      this.messageService.add({severity:'error', summary: error.message});
    }
  }

  async cancelMembershipRequest(event: {id: string, user_id: string }): Promise<void> {
    try {
      await this.membershipService.removeMembershipRequestById(event.id);
      this.messageService.add({severity:'success', summary: 'Anfrage entfernt.'});
    } catch(error: any) {
      this.messageService.add({severity:'error', summary: error.message});
    }
  }

  async removeMember(event: {id: string, user_id: string}): Promise<void> {
    try {
      await this.membershipService.removeMemberByMembershipId(event.id, event.user_id, this.selectedGroupId);
      this.messageService.add({severity:'success', summary: 'Mitglied entfernt.'});
    } catch(error: any) {
      this.messageService.add({severity:'error', summary: error.message});
    }
  }
}
