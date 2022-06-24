import { Component, Input, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { AuthentificationService } from 'src/app/authentification/services/authentification.service';
import { MembershipService } from '../services/membership.service';

@Component({
  selector: 'app-request-membership',
  templateUrl: './request-membership.component.html',
  styleUrls: ['./request-membership.component.scss'],
  providers: [MessageService]
})
export class RequestMembershipComponent implements OnInit {
  @Input() selectedGroupId: string = '';
  isAlreadyMember: boolean = false;
  membershipAlreadyRequested: boolean = true;

  constructor(
    private messageService: MessageService,
    private membershipService: MembershipService,
    private authentificationService: AuthentificationService
  ) { }

  ngOnInit(): void {
    this.checkIfMembershipAlreadyRequested();
    this.checkIfAlreadyMember();
  }

  checkIfMembershipAlreadyRequested(): void {
    if(this.selectedGroupId) {
      this.membershipService.membershipAlreadyRequested(this.selectedGroupId)
      .then((results) => {
        if(results.data[0] !== undefined) {
          this.membershipAlreadyRequested = true;
        } else {
          this.membershipAlreadyRequested = false;
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
          this.isAlreadyMember = true;
        } else {
          this.isAlreadyMember = false;
        }
      })
      .catch();
    }
  }

  requestMembershipOrLeaveGroup(): void {
    if(this.isAlreadyMember) {
      this.leaveGroup();
    } else {
      if (this.membershipAlreadyRequested) {
        this.cancelRequestMembership();
      } else {
        this.requestMembership();
      }
    }
  }

  requestMembership(): void {
    this.membershipService.requestMembership(this.selectedGroupId)
    .then(() => {
      this.membershipAlreadyRequested = true;
      this.messageService.add({severity:'success', summary: 'Beitrittansfrage verschickt.'});
    })
    .catch((error: any) =>  {
      this.messageService.add({severity:'error', summary: error})
    })
  }

  cancelRequestMembership(): void {
    this.membershipService.cancelMembershipRequest(this.selectedGroupId)
    .then(() => {
      this.membershipAlreadyRequested = false;
      this.messageService.add({severity:'success', summary: 'Beitrittansfrage zurückgezogen.'});
    })
    .catch((error: any) =>  {
      this.messageService.add({severity:'error', summary: error})
    })
  }

  leaveGroup(): void{
    const loggedInID: string |undefined = this.authentificationService.user?.id;
    if (loggedInID) {
      this.membershipService.removeMember(loggedInID, this.selectedGroupId)
      .then(() => {
        this.isAlreadyMember = false;
        this.messageService.add({severity:'success', summary: 'Erfolgreich ausgetreten.'});
      })
      .catch((error: any) =>  {
        this.messageService.add({severity:'error', summary: error})
      })
    }
  }

}
