import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FollowingService } from 'src/app/following-profiles-system/services/following.service';
import { GroupsService } from 'src/app/groups/state/groups.service';
import { ProfileService } from 'src/app/profile/state/profile.service';
import { ProfileCore } from 'src/app/profile/state/profile.model';
import { Message } from 'src/app/UI-elements/message/message.component';
import { ChatService } from '../services/chat.service';
import { Observable } from 'rxjs';
import { ProfileQuery } from 'src/app/profile/state/profile.query';
import { AuthentificationQuery } from '../../authentification/state/authentification.query';
import { ChatRoomService } from './state/chat-room.service';
import { ChatRoomQuery } from './state/chat-room.query';
import { Group } from 'src/app/groups/state/group.model';

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
  messages$ = new Observable<Message[]>();
  loggedInUserId: string | null = '';
  @ViewChild('messages') content!: ElementRef;
  profile!: ProfileCore;
  profile$ = new Observable<ProfileCore | undefined>();
  group!: Group;
  isGroup: boolean = false;
  chatPartner: string = '';

  chatPartnerAcceptedRequest: boolean = true;
  loggedInUserAcceptedRequest: boolean = true;
  enquirer: boolean = false;

  test = true;

  constructor(
    private chatService: ChatService,
    private chatRoomQuery: ChatRoomQuery,
    private chatRoomService: ChatRoomService,
    private readonly authentificationQuery: AuthentificationQuery,
    private route: ActivatedRoute,
    private profileService: ProfileService,
    private profileQuery: ProfileQuery,
    private followingService: FollowingService,
    private groupsService: GroupsService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getSelectedId();
    if (this.selectedRoomId) {
      this.chatRoomService.getRealTimeChanges(this.selectedRoomId);
    }
    this.chatRoomService.getAllMessagesOfChat(this.selectedRoomId);
    this.messages$ = this.chatRoomQuery.messages$

    this.getChatPartner();
    this.getLoggedInUserId();
    if(this.selectedRoomId) {
      this.scrollDown(true)
    }
  }

  ngAfterViewChecked() {
    this.scrollDown(this.test);
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
/*       this.chatService.getAllMessagesOfChat(this.selectedRoomId)
      .then((messages) => {
        this.allMessages = messages.data;
      }) */
    });
  }

/*   getAllMessages(): void {
    this.chatService.getAllMessagesOfChat(this.selectedRoomId)
    .then((messages) => {
      this.allMessages = messages.data;
      if(this.isGroup && this.loggedInUserId) {
        this.chatService.resetNumberOfUnreadMessagesOfGroup(this.chatPartner, this.loggedInUserId);
      } else {
        this.chatService.resetNumberOfUnreadMessages(this.selectedRoomId, this.chatPartner);
      }
    })
    .catch((error) => {
      console.log(error)
    })
  } */

  getLoggedInUserId(): void {
    this.authentificationQuery.uuid$.subscribe((uuid: any) => {
      this.loggedInUserId = uuid;
    });
  }

  scrollDown(test: boolean): void {
    try {
      this.content.nativeElement.scrollTop = this.content.nativeElement.scrollHeight;
    } catch(err) {

    } finally {
      if (test) {
        this.test = false;
      }
    }
  }

  getProfile(): void {
    this.profileService.add(this.chatPartner)
    if(this.loggedInUserId)
    this.profile$ = this.profileQuery.selectProfileById(this.loggedInUserId);
    this.profile$.subscribe((profile: ProfileCore | undefined) => {
      if (profile) {
        this.profile = profile;
      }
    })
  }

  getGroup(): void {
    this.groupsService.selectGroup(this.chatPartner)
    .then((group) => {
      this.group = group.data;
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
        this.chatService.resetNumberOfUnreadMessages(this.selectedRoomId, this.chatPartner);
        this.scrollDown(this.test);
      } else {
        this.isGroup = true;
        this.chatService.getGroupAsChatPartner(this.selectedRoomId)
        .then((results) => {
          this.chatPartner = results.data;
          this.getGroup();
          this.scrollDown(this.test);
        })
        .catch((error) => {
          console.log(error)
        })
      }
      this.checkIfChatPartnerAcceptedRequest();
      this.checkIfChatLoggedInUserAcceptedRequest();
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
