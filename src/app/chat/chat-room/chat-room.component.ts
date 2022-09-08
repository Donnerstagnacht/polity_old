import { Component, ElementRef, Input, OnInit, Renderer2, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FollowingService } from 'src/app/following-profiles-system/services/following.service';
import { GroupsService } from 'src/app/groups/state/groups.service';
import { ProfileService } from 'src/app/profile/state/profile.service';
import { ProfileCore } from 'src/app/profile/state/profile.model';
import { Message } from 'src/app/UI-elements/message/message.component';
import { ChatService } from '../services/chat.service';
import { Subscription } from 'rxjs';
import { ProfileQuery } from 'src/app/profile/state/profile.query';
import { AuthentificationQuery } from '../../authentification/state/authentification.query';
import { ChatRoomService } from './state/chat-room.service';
import { ChatRoomQuery } from './state/chat-room.query';
import { Group } from 'src/app/groups/state/group.model';
import { MessageService } from 'primeng/api';
import { RealtimeSubscription } from '@supabase/supabase-js';
import { ChatStore } from '../state/chat.store';
import { ChatRoomStore } from './state/chat-room.store';
import { PaginationData, PaginationFrontendService } from 'src/app/utilities/storage/services/pagination-frontend.service';

@Component({
  selector: 'app-chat-room',
  templateUrl: './chat-room.component.html',
  styleUrls: ['./chat-room.component.scss'],
  providers: [MessageService]
})
export class ChatRoomComponent implements OnInit {
  @ViewChild("hello") MyProp?: ElementRef<HTMLElement>;
  @ViewChild("test1") MyProp1?: ElementRef<HTMLElement>;


  @Input() name: string = '';
  @Input() avatarUrl: string = '';
  message: string = '';
  selectedRoomId: string = '';
  loggedInUserId: string | null = '';
  @ViewChild('messages') content!: ElementRef;
  profile!: ProfileCore;
  group!: Group;
  messagesOfChat: Message[] = [];
  isGroup: boolean = false;
  chatPartner: string = '';
  testBoolean: boolean = true;

  chatPartnerAcceptedRequest: boolean = true;
  loggedInUserAcceptedRequest: boolean = true;
  enquirer: boolean = false;

  scrolledDown = true;

  loadingInitial: boolean = false;
  error: boolean = false;
  errorMessage: string | undefined;

  profileSubscription: Subscription | undefined;
  authSubscription: Subscription | undefined;
  messageSubscription: Subscription | undefined;
  messageRealtimeSubscription: RealtimeSubscription | undefined;
  scrollNotifierSubscription: Subscription | undefined;


  checkView: boolean = true;
  paginationData: PaginationData = {
    from: 0,
    to: 10,
    canLoad: true,
    reloadDelay: 2000,
    sizeOfNewLoad: 10,
    numberOfSearchResults: 0
  }

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
    private router: Router,
    private messageService: MessageService,
    private chatRoomStore: ChatRoomStore,
    private renderer: Renderer2,
    private paginationService: PaginationFrontendService
  ) {}

  ngOnInit(): void {

    this.getSelectedId();
    this.getLoggedInUserId();
    this.scrollNotifierSubscription = this.chatRoomService.newMessageOfUserNotifier.subscribe((sender_id: string) => {
      this.checkView = true;
      console.log('Please scroll')
      console.log('Please reset counter')
        console.log('in my prop')
        // this.checkView = true;
        // this.renderer.selectRootElement(this.MyProp1["nativeElement"]).scrollIntoView();
        if(this.MyProp1) {

        }

/*       this.scrollDown();
      this.scrollDown();
      this.scrollDown();
      this.scrollDown();
      this.scrollDown();
      this.scrollDown();
      this.scrollDown(); */
      console.log('sender_id')
      console.log(sender_id);
      console.log('logged in')
      console.log(this.loggedInUserId);
      this.paginationData.to = this.paginationData.to + 1;
      if(sender_id !== this.loggedInUserId) {
        console.log('reset because other id')
        this.resetUnreadMessageCounterWhileChatOpen();
      }
    })
    this.getChatPartner();
    this.loadInitialData();
    // this.scrollDown();
    if(this.MyProp) {
    } else {
      console.log('undefined')
    }

  }

  ngAfterViewChecked(): void {
        console.log(window.scrollY);
        console.log(this.paginationData.from)
        console.log(this.paginationData.to)
        if(this.testBoolean) {
          console.log('called')
          console.log(this.testBoolean)
          this.testBoolean = true;
          if(this.MyProp1) {
            // console.log('found myprop1')
            if(this.checkView) {
              this.renderer.selectRootElement(this.MyProp1["nativeElement"]).scrollIntoView();
            }
          } else {
            // console.log('undefined mypro1')
          }
        }

  }

  ngOnDestroy(): void {
    if(this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
    if(this.profileSubscription) {
      this.profileSubscription.unsubscribe();
    }
    if(this.messageRealtimeSubscription) {
      this.messageRealtimeSubscription.unsubscribe();
    }
    if(this.messageSubscription) {
      this.messageSubscription.unsubscribe();
    }
    if(this.scrollNotifierSubscription) {
      this.scrollNotifierSubscription.unsubscribe();
    }
  }

/*   async getMoreMessages(): Promise<void> {
    try {
      await this.chatRoomService.getAllMessagesOfChat(this.selectedRoomId, this..paginationData.from, this..paginationData.to);
    } catch(error: any) {
      this.messageService.add({severity:'error', summary: error.message});
    }
  } */

  async resetUnreadMessageCounterWhileChatOpen(): Promise<void> {
    try {
      if(this.loggedInUserId) {
        await this.chatService.resetNumberOfUnreadMessages(this.selectedRoomId, this.chatPartner);
      }
    } catch(error: any) {
      this.messageService.add({severity:'error', summary: error.message});
    }
  }

  async loadInitialData(): Promise<void> {
    try {
      this.loadingInitial = true;
      this.error = false;
      await this.chatRoomService.getAllMessagesOfChat(this.selectedRoomId, this.paginationData.from, this.paginationData.to);
      this.messageSubscription = this.chatRoomQuery.messages$.subscribe((messages: Message[]) => {
        this.messagesOfChat = messages.reverse();

        this.paginationData.from = this.messagesOfChat.length-10;
        this.paginationData.to = this.messagesOfChat.length;
        console.log('initial')
        console.log(this.paginationData.from )
        console.log(this.paginationData.to )

        if(this.MyProp) {
        } else {
          console.log('undefined')
        }      })
      this.messageRealtimeSubscription = this.chatRoomService.getRealTimeChangesMessages(this.selectedRoomId);
    } catch(error: any) {
      this.error = true;
      this.errorMessage = error.message;
      this.messageService.add({severity:'error', summary: error.message});
    } finally {
      this.loadingInitial = false;
      console.log('called finally')
      if(this.MyProp1) {
        console.log('found in finally')
        this.renderer.selectRootElement(this.MyProp1["nativeElement"]).scrollIntoView();
      } else {
        console.log('undefined')
      }
    }
  }

  onScrollDown() {
    console.log('scrolled down!!');
    this.loadNewData();
  }

  onScrollUp() {
    console.log('scrolled up!!');
    this.loadNewData();
    console.log('from')
  }

  loadNewData(): void {
    this.checkView = false;
    this.paginationData = this.paginationService.scrollUpAndLoadDescending(this.paginationData);
  }

  getSelectedId(): void {
    this.route.paramMap.subscribe(parameter => {
      this.selectedRoomId = String(parameter.get('id'));
    })
  }

  async onSendMessage(): Promise<void> {
    let groupIdParameter;
    if (this.group) {
      groupIdParameter = this.group.id
    } else {
      groupIdParameter = undefined
    }
    try {
      const result: {data: any, error: any} = await this.chatService.sendMessage(
        this.selectedRoomId,
        this.chatPartner,
        this.message,
        this.isGroup,
        groupIdParameter
        );
        this.message = '';
    } catch(error: any) {
      this.messageService.add({severity:'error', summary: error.message});
    } finally {
      console.log('finnaly message send')
      if(this.MyProp1) {
        console.log('in my prop')
        // this.renderer.selectRootElement(this.MyProp1["nativeElement"]).scrollIntoView();
      }

    }
  }

  getLoggedInUserId(): void {
    this.authSubscription = this.authentificationQuery.uuid$.subscribe((uuid: any) => {
      this.loggedInUserId = uuid;
    });
  }

/*   async scrollDown(): Promise<void> {
    try {
      console.log('scoll');
      this.content.nativeElement.scrollTop = this.content.nativeElement.scrollHeight;
    } catch(error: any) {
      this.messageService.add({severity:'error', summary: error.message});
    } finally {
      console.log('final')
    }
  } */

  getProfile(): void {
    this.profileService.upsert(this.chatPartner);
    this.profileSubscription = this.profileQuery.selectEntity(this.chatPartner)
    .subscribe((profile: ProfileCore | undefined) => {
      if (profile) {
        this.profile = profile;
      }
    })
  }

  async getGroup(): Promise<void> {
    try {
      const group: {data: any, error: any} = await this.groupsService.selectGroup(this.chatPartner)
      this.group = group.data;
    } catch(error: any) {
      this.messageService.add({severity:'error', summary: error.message});
    }
  }

  async getChatPartner(): Promise<void> {
    try {
      const chatPartner: {data: any, error: any} = await this.chatService.getChatPartner(this.selectedRoomId);
      this.chatPartner = chatPartner.data;
        if(this.chatPartner) {
          this.isGroup = false;
          this.getProfile();
          try {
            if(this.loggedInUserId) {
              this.chatService.resetNumberOfUnreadMessages(this.selectedRoomId, this.chatPartner);
            }
          } catch(error: any) {
            this.messageService.add({severity:'error', summary: error.message});
          }
          // this.scrollDown();
        } else {
          try {
            this.isGroup = true;
            const results: {data: any, error: any} = await this.chatService.getGroupAsChatPartner(this.selectedRoomId);
            this.chatPartner = results.data;
            this.getGroup();
            // this.scrollDown();
          } catch(error: any) {
            this.messageService.add({severity:'error', summary: error.message});
          }
        }
        this.checkIfChatPartnerAcceptedRequest();
        this.checkIfChatLoggedInUserAcceptedRequest();
    } catch(error: any) {
      this.messageService.add({severity:'error', summary: error.message});
    }
  }

  async checkIfChatPartnerAcceptedRequest(): Promise<void> {
    try {
      const results: {data: any, error: any} = await this.chatService.checkIfChatPartnerAcceptedRequest(this.selectedRoomId, this.chatPartner);
      this.chatPartnerAcceptedRequest = results.data.accepted;
    } catch(error: any) {
      this.messageService.add({severity:'error', summary: error.message});
    }
  }

  async checkIfChatLoggedInUserAcceptedRequest(): Promise<void> {
    try {
      if(this.loggedInUserId) {
        const results: {data: any, error: any} = await this.chatService.checkIfChatPartnerAcceptedRequest(this.selectedRoomId, this.loggedInUserId)
        this.loggedInUserAcceptedRequest = results.data.accepted;
      }
    } catch(error: any) {
      this.messageService.add({severity:'error', summary: error.message});
    }
  }

  async acceptRequestAndFollow(): Promise<void> {
    try {
      const results: {data: any, error: any} = await this.followingService.followTransaction(this.chatPartner)
      this.loggedInUserAcceptedRequest = true;
    } catch(error: any) {
      this.messageService.add({severity:'error', summary: error.message});
    }
  }

  async acceptRequest(): Promise<void> {
    try {
      if(this.loggedInUserId) {
        const results: {data: any, error: any} = await this.chatService.acceptChatRequest(this.selectedRoomId, this.loggedInUserId)
        this.loggedInUserAcceptedRequest = true;
      }
    } catch(error: any) {
      this.messageService.add({severity:'error', summary: error.message});
    }
  }

  async rejectRequest(): Promise<void> {
    try {
      if(this.loggedInUserId) {
        const results: {data: any, error: any } = await this.chatService.rejectChatRequest(this.selectedRoomId, this.chatPartner, this.loggedInUserId)
        this.loggedInUserAcceptedRequest = false;
        this.router.navigate(['/orga'])
      }
    } catch(error: any) {
      this.messageService.add({severity:'error', summary: error.message});
    }
  }

}
