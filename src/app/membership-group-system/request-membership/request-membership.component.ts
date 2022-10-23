import { Component, Input, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { AuthentificationQuery } from 'src/app/authentification/state/authentification.query';
import { GroupsService } from 'src/app/groups/state/groups.service';
import { Subscription } from 'rxjs';
import { GroupsQuery } from 'src/app/groups/state/groups.query';
import { MembershipService } from '../services/membership.service';
import { GroupUI } from 'src/app/groups/state/group.model';
import { RealtimeChannel } from '@supabase/supabase-js';

@Component({
  selector: 'app-request-membership',
  templateUrl: './request-membership.component.html',
  styleUrls: ['./request-membership.component.scss'],
  providers: [MessageService]
})
export class RequestMembershipComponent implements OnInit {
  @Input() selectedGroupId: string = '';
  groupUI!: GroupUI;

  authSubscription: Subscription | undefined;
  groupSubscription: Subscription | undefined;
  stillMemberRealtimeChannel: RealtimeChannel | undefined;
  stillMembershipRequestedRealtimeChannel: RealtimeChannel | undefined;

  constructor(
    private messageService: MessageService,
    private membershipService: MembershipService,
    private authentificationQuery: AuthentificationQuery,
    private groupsQuery: GroupsQuery,
    private groupsService: GroupsService
  ) { }

  ngOnInit(): void {
    this.stillMemberRealtimeChannel = this.membershipService.getRealTimeChangesIfStillMembershipRequested(this.selectedGroupId);
    this.stillMemberRealtimeChannel = this.membershipService.getRealTimeChangesIfStillMember(this.selectedGroupId);
    this.checkIfMembershipAlreadyRequested();
    this.checkIfAlreadyMember();
    this.groupSubscription = this.groupsQuery.selectUI$(this.selectedGroupId).subscribe((ui) => {
      if(ui) {
        this.groupUI = ui;
      }
    })
  }

  ngOnDestroy(): void {
    if(this.authSubscription) {
      this.authSubscription.unsubscribe()
    }
    if(this.groupSubscription) {
      this.groupSubscription.unsubscribe()
    }
    if(this.stillMemberRealtimeChannel) {
      this.stillMemberRealtimeChannel.unsubscribe()
    }
    if(this.stillMembershipRequestedRealtimeChannel) {
      this.stillMembershipRequestedRealtimeChannel.unsubscribe()
    }
  }

  checkIfMembershipAlreadyRequested(): void {
    if(this.selectedGroupId) {
      this.membershipService.membershipAlreadyRequested(this.selectedGroupId)
      .then((results) => {
        if(results.data[0] !== undefined) {
          this.groupsService.updateRequestedMembership(this.selectedGroupId, true)
        } else {
          this.groupsService.updateRequestedMembership(this.selectedGroupId, false)
        }
      })
      .catch();
    }
  }

  checkIfAlreadyMember(): void {
    if(this.selectedGroupId) {
      this.membershipService.alreadyMember(this.selectedGroupId)
      .then((results) => {
        if(results.data[0] !== undefined) {
          this.groupsService.updateIsMember(this.selectedGroupId, true)
        } else {
          this.groupsService.updateIsMember(this.selectedGroupId, false)
        }
      })
      .catch();
    }
  }

  requestMembershipOrLeaveGroup(): void {
    if(this.groupUI.isMember) {
      this.leaveGroup();
    } else {
      if (this.groupUI.requestedMembership) {
        this.cancelRequestMembership();
      } else {
        this.requestMembership();
      }
    }
  }

  async requestMembership(): Promise<void> {
    try {
      await this.membershipService.requestMembership(this.selectedGroupId);
      this.messageService.add({severity:'success', summary: 'Beitrittansfrage verschickt.'});
    } catch(error: any) {
      this.messageService.add({severity:'error', summary: error.message});
    }
  }

  async cancelRequestMembership(): Promise<void> {
    try {
      await this.membershipService.cancelMembershipRequest(this.selectedGroupId);
      this.messageService.add({severity:'success', summary: 'Beitrittansfrage zurückgezogen.'});
    } catch(error: any) {
      this.messageService.add({severity:'error', summary: error.message});
    }
  }

  async leaveGroup(): Promise<void> {
    let loggedInID: string | null = '';
    this.authSubscription = this.authentificationQuery.uuid$.subscribe(uuid => {
      loggedInID = uuid;
    });
    try {
      if(loggedInID) {
        await this.membershipService.removeMember(loggedInID, this.selectedGroupId)
        this.messageService.add({severity:'success', summary: 'Erfolgreich ausgetreten.'});
      }
    } catch(error: any) {
      this.messageService.add({severity:'error', summary: error})
    }
  }

}
