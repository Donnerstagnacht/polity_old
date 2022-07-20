import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthentificationService, Profile } from 'src/app/authentification/services/authentification.service';
import { FollowingService } from 'src/app/following-profiles-system/services/following.service';
import { GroupsService } from 'src/app/groups/state/groups.service';
import { ProfileService } from 'src/app/profile/services/profile.service';
import { Group } from 'src/app/UI-dialogs/create-group/create-group.component';
import { Message } from 'src/app/UI-elements/message/message.component';
import { ChatService } from '../services/chat.service';

@Component({
  selector: 'app-chat-room',
  templateUrl: './chat-room.component.html',
  styleUrls: ['./chat-room.component.scss']
})
export class ChatRoomComponent implements OnInit {
  @Input() name: string = '';
  @Input() avatarUrl: string = '';
  message: string = '';
  selectedRoomId: string = '';
  allMessages: Message[] = [];
  loggedInUserId: string | undefined = '';
  @ViewChild('messages') content!: ElementRef;
  profile!: Profile;
  group!: Group;
  isGroup: boolean = false;
  chatPartner: string = '';

  chatPartnerAcceptedRequest: boolean = true;
  loggedInUserAcceptedRequest: boolean = true;
  enquirer: boolean = false;

  constructor(
    private chatService: ChatService,
    private readonly authentificationService: AuthentificationService,
    private route: ActivatedRoute,
    private profileService: ProfileService,
    private followingService: FollowingService,
    private groupsService: GroupsService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.getSelectedId();
    this.getChatPartner();
    this.getLoggedInUserId();
    this.scrollDown();
  }

  ngAfterViewChecked() {
    this.scrollDown();
}


  getSelectedId(): void {
    this.route.paramMap.subscribe(parameter => {
      this.selectedRoomId = String(parameter.get('id'));
    })
  }

  onSendMessage(): void {
    let groupIdParameter;
    if (this.group) {
      groupIdParameter = this.group.id
    } else {
      groupIdParameter = undefined

    }
    this.chatService.sendMessage(
      this.selectedRoomId,
      this.chatPartner,
      this.message,
      this.isGroup,
      groupIdParameter
      )
    .then(() => {
      this.message = '';
      this.chatService.getAllMessagesOfChat(this.selectedRoomId)
      .then((messages) => {
        this.allMessages = messages.data;
      })
    });
  }

  getAllMessages(): void {
    this.chatService.getAllMessagesOfChat(this.selectedRoomId)
    .then((messages) => {
      this.allMessages = messages.data;
      console.log(this.group)
      console.log(this.profile)
      console.log(this.loggedInUserId)
      console.log(this.chatPartner)
      console.log(this.isGroup)

      if(this.isGroup && this.loggedInUserId) {
        this.chatService.resetNumberOfUnreadMessagesOfGroup(this.chatPartner, this.loggedInUserId);
      } else {
        this.chatService.resetNumberOfUnreadMessages(this.selectedRoomId, this.chatPartner);
      }
    })
    .catch((error) => {
      console.log(error)
    })
  }

  getLoggedInUserId(): void {
    this.loggedInUserId = this.authentificationService.user?.id;
  }

  scrollDown(): void {
    try {
      this.content.nativeElement.scrollTop = this.content.nativeElement.scrollHeight;
    } catch(err) { }
  }

  getProfile(): void {
    this.profileService.findProfil(this.chatPartner)
    .then((profile) => {
      this.profile = profile.data;
      // this.isGroup = false;
    })
    .catch((error) => {
      console.log(error);
    })
  }

  getGroup(): void {
    this.groupsService.selectGroup(this.chatPartner)
    .then((group) => {
      this.group = group.data;
      // this.isGroup = true;
    })
    .catch((error) => {
      console.log(error);
    })
  }

  getChatPartner(): void {
    this.chatService.getChatPartner(this.selectedRoomId)
    .then((chatPartner) => {
      this.chatPartner = chatPartner.data;
      if(this.chatPartner) {
        this.isGroup = false;
        this.getProfile();
      } else {
        this.isGroup = true;
        this.chatService.getGroupAsChatPartner(this.selectedRoomId)
        .then((results) => {
          this.chatPartner = results.data;
          this.getGroup();
        })
        .catch((error) => {
          console.log(error)
        })
      }
      this.checkIfChatPartnerAcceptedRequest();
      this.checkIfChatLoggedInUserAcceptedRequest();
      if(this.chatPartnerAcceptedRequest && this.loggedInUserAcceptedRequest) {
        this.getAllMessages();
      }

    })
    .catch((error) => {
      console.log(error);
    })
  }

  checkIfChatPartnerAcceptedRequest(): void {
    if(this.chatPartner) {
      this.chatService.checkIfChatPartnerAcceptedRequest(this.selectedRoomId, this.chatPartner)
      .then((results) => {
        this.chatPartnerAcceptedRequest = results.data.accepted;
      })
      .catch((error) => {
        console.log(error)
      })
    }
  }

  checkIfChatLoggedInUserAcceptedRequest(): void {
    if(this.loggedInUserId) {
      this.chatService.checkIfChatPartnerAcceptedRequest(this.selectedRoomId, this.loggedInUserId)
      .then((results) => {
        this.loggedInUserAcceptedRequest = results.data.accepted;
      })
      .catch((error) => {
        console.log(error)
      })
    }
  }

  acceptRequestAndFollow(): void {
    this.followingService.followTransaction(this.chatPartner)
    .then((results) => {
      this.loggedInUserAcceptedRequest = true;
    })
    .catch((error) => {
      console.log(error)
    });
  }

  acceptRequest(): void {
    if(this.loggedInUserId) {
      this.chatService.acceptChatRequest(this.selectedRoomId, this.loggedInUserId)
      .then((results) => {
        this.loggedInUserAcceptedRequest = true;
      })
      .catch((error) => {
        console.log(error)
      });
    }
  }

  rejectRequest(): void {
    if(this.loggedInUserId) {
      this.chatService.rejectChatRequest(this.selectedRoomId, this.chatPartner, this.loggedInUserId)
      .then((results) => {
        this.loggedInUserAcceptedRequest = false;
        this.router.navigate(['/orga'])
      })
      .catch((error) => {
        console.log(error)
      });
    }
  }

}
