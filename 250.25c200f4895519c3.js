"use strict";(self.webpackChunkpolity=self.webpackChunkpolity||[]).push([[250],{3250:(We,F,a)=>{a.r(F),a.d(F,{ChatModule:()=>Ve});var l=a(6895),h=a(8492),y=a(9028),b=a(8306),e=a(8274),p=a(5861),T=a(5813),f=a(2340),w=a(6923);let D=(()=>{class n{constructor(t){this.authentificationQuery=t,this.supabaseClient=(0,T.eI)(f.N.supabaseUrl,f.N.supabaseKey)}resetNumberOfUnreadMessages(t,s){var o=this;return(0,p.Z)(function*(){return console.log("called"),console.log("service: room_id"+t),console.log("service: chatpartner"+s),yield o.supabaseClient.rpc("reset_number_of_unread_messages",{room_id_in:t,user_id_of_reader:s})})()}resetNumberOfUnreadMessagesOfGroup(t,s){var o=this;return(0,p.Z)(function*(){return yield o.supabaseClient.rpc("reset_number_of_unread_messages_in_group",{group_id_in:t,user_id_of_reader:s})})()}getAllMessagesOfChat(t){var s=this;return(0,p.Z)(function*(){return yield s.supabaseClient.rpc("select_all_messages_of_room",{room_id_in:t})})()}sendMessage(t,s,o,r,c){var g=this;return(0,p.Z)(function*(){let C="";return g.authentificationQuery.uuid$.subscribe(N=>{C=N}),yield g.supabaseClient.rpc("send_message_transaction",{room_id_in:t,message_sender:C,message_receiver:s,content_in:o,is_group:r,group_id_in:c})})()}checkIfChatPartnerAcceptedRequest(t,s){var o=this;return(0,p.Z)(function*(){return yield o.supabaseClient.from("rooms_participants").select("accepted").eq("room_id",t).eq("user_id",s).single()})()}acceptChatRequest(t,s){var o=this;return(0,p.Z)(function*(){return yield o.supabaseClient.rpc("accept_chat_request",{room_id_in:t,user_id_of_reader:s})})()}getChatPartner(t){var s=this;return(0,p.Z)(function*(){let o="";return s.authentificationQuery.uuid$.subscribe(c=>{o=c}),yield s.supabaseClient.rpc("select_chat_partner",{message_sender:o,room_id_in:t})})()}rejectChatRequest(t,s,o){var r=this;return(0,p.Z)(function*(){return yield r.supabaseClient.rpc("reject_chat_request_transaction",{room_id_in:t,follower_id:s,following_id:o})})()}getGroupAsChatPartner(t){var s=this;return(0,p.Z)(function*(){return yield s.supabaseClient.rpc("select_group_as_chat_partner",{room_id_in:t})})()}}return n.\u0275fac=function(t){return new(t||n)(e.LFG(w.c))},n.\u0275prov=e.Yz7({token:n,factory:n.\u0275fac,providedIn:"root"}),n})();var _=a(6130),R=a(655);let u=class extends _.yh{constructor(){super({messages:[]})}};u.\u0275fac=function(i){return new(i||u)},u.\u0275prov=e.Yz7({token:u,factory:u.\u0275fac,providedIn:"root"}),u=(0,R.gn)([(0,_.yC)({name:"chat-room",resettable:!0})],u);let E=(()=>{class n extends _.AE{constructor(t){super(t),this.store=t,this.messages$=this.select(s=>s.messages)}}return n.\u0275fac=function(t){return new(t||n)(e.LFG(u))},n.\u0275prov=e.Yz7({token:n,factory:n.\u0275fac,providedIn:"root"}),n})(),H=(()=>{class n{constructor(t){this.chatRoomStore=t,this.supabaseClient=(0,T.eI)(f.N.supabaseUrl,f.N.supabaseKey)}getAllMessagesOfChat(t){var s=this;return(0,p.Z)(function*(){return yield s.supabaseClient.rpc("select_all_messages_of_room",{room_id_in:t}).then(r=>{const c=r.data;s.chatRoomStore.reset(),s.chatRoomStore.update({messages:c})})})()}getRealTimeChanges(t){return this.supabaseClient.from("rooms_messages").on("INSERT",o=>{if(t===o.new.room_id){const r={message_id:o.new.message_id,created_at_in:o.new.created_at,sender_id:o.new.user_id,content_in:o.new.content};this.chatRoomStore.update(c=>{let g=c.messages;g.push(r),c.messages=g})}}).subscribe()}}return n.\u0275fac=function(t){return new(t||n)(e.LFG(u))},n.\u0275prov=e.Yz7({token:n,factory:n.\u0275fac,providedIn:"root"}),n})();var B=a(5754),$=a(8451),z=a(9466),j=a(2545),d=a(433),v=a(8271),x=a(1740),k=a(5593),Z=a(8092),K=a(9469);function V(n,i){if(1&n&&(e.TgZ(0,"h4",5),e._uU(1),e.qZA()),2&n){const t=e.oxw();e.xp6(1),e.Oqu(t.message.sender_id)}}const X=function(n){return{"flex flex-row-reverse":n}},W=function(n,i){return{"primary-container":n," neutral-90":i}};let ee=(()=>{class n{constructor(){this.showSender=!1,this.loggedInUserId="",this.messageOfLoggedInUser=!1}ngOnInit(){this.checkIfMessageFromLoggedInUser()}checkIfMessageFromLoggedInUser(){this.loggedInUserId===this.message.sender_id&&(this.messageOfLoggedInUser=!0)}}return n.\u0275fac=function(t){return new(t||n)},n.\u0275cmp=e.Xpm({type:n,selectors:[["app-message"]],inputs:{message:"message",showSender:"showSender",loggedInUserId:"loggedInUserId"},decls:8,vars:13,consts:[[3,"ngClass"],[1,"w-9","p-4","border-round","mb-2",3,"ngClass"],["class","my-0 on-light-surface-in-dark-theme",4,"ngIf"],[1,"mt-1","on-light-surface-in-dark-theme"],[1,"w-full","mb-0","text-right","on-light-surface-in-dark-theme"],[1,"my-0","on-light-surface-in-dark-theme"]],template:function(t,s){1&t&&(e.TgZ(0,"div",0)(1,"div",1),e.YNc(2,V,2,1,"h4",2),e.TgZ(3,"p",3),e._uU(4),e.qZA(),e.TgZ(5,"p",4),e._uU(6),e.ALo(7,"date"),e.qZA()()()),2&t&&(e.Q6J("ngClass",e.VKq(8,X,s.messageOfLoggedInUser)),e.xp6(1),e.Q6J("ngClass",e.WLB(10,W,s.messageOfLoggedInUser,!s.messageOfLoggedInUser)),e.xp6(1),e.Q6J("ngIf",s.showSender),e.xp6(2),e.Oqu(s.message.content_in),e.xp6(2),e.Oqu(e.xi3(7,5,s.message.created_at_in,"HH:mm:ss")))},dependencies:[l.mk,l.O5,l.uU]}),n})();const te=["messages"];function ne(n,i){if(1&n&&(e.TgZ(0,"p",21),e._uU(1),e.qZA()),2&n){const t=e.oxw(2);e.MGl("routerLink","/profile/",t.profile.id,""),e.xp6(1),e.Oqu(t.profile.name)}}function se(n,i){if(1&n){const t=e.EpF();e.TgZ(0,"div",15)(1,"div",16),e.YNc(2,ne,2,2,"p",17),e.TgZ(3,"a",18),e._UZ(4,"p-avatar",19),e.qZA()(),e.TgZ(5,"i",20),e.NdJ("click",function(){e.CHM(t);const o=e.oxw();return e.KtG(o.rejectRequest())}),e.qZA()()}if(2&n){const t=e.oxw();e.xp6(2),e.Q6J("ngIf",t.profile),e.xp6(1),e.MGl("routerLink","/profile/",t.profile.id,""),e.xp6(1),e.s9C("image",t.profile.avatar_url)}}function ie(n,i){if(1&n&&(e.TgZ(0,"p",23),e._uU(1),e.qZA()),2&n){const t=e.oxw(2);e.xp6(1),e.Oqu(t.group.name)}}function oe(n,i){if(1&n&&(e.TgZ(0,"div",15)(1,"div",16),e.YNc(2,ie,2,1,"p",22),e.TgZ(3,"a",18),e._UZ(4,"p-avatar",19),e.qZA()()()),2&n){const t=e.oxw();e.xp6(2),e.Q6J("ngIf",t.group),e.xp6(1),e.MGl("routerLink","/groups/",t.group.id,""),e.xp6(1),e.s9C("image",t.group.avatar_url)}}function ae(n,i){1&n&&(e.TgZ(0,"div")(1,"p",25),e._uU(2,"Ihr habt euch noch keine Nachrichten geschrieben."),e.qZA()())}function re(n,i){if(1&n&&(e.TgZ(0,"div"),e._UZ(1,"app-message",29),e.qZA()),2&n){const t=i.$implicit,s=e.oxw(4);e.xp6(1),e.Q6J("message",t)("loggedInUserId",s.loggedInUserId)}}function ce(n,i){if(1&n&&(e.TgZ(0,"div",26,27),e.YNc(2,re,2,2,"div",28),e.ALo(3,"async"),e.qZA()),2&n){const t=e.oxw(3);e.xp6(2),e.Q6J("ngForOf",e.lcZ(3,1,t.messages$))}}function le(n,i){if(1&n&&(e.TgZ(0,"div"),e.YNc(1,ae,3,0,"div",7),e.YNc(2,ce,4,3,"div",24),e.qZA()),2&n){const t=i.ngIf;e.xp6(1),e.Q6J("ngIf",0===t.length),e.xp6(1),e.Q6J("ngIf",t.length>0)}}function pe(n,i){if(1&n&&(e.TgZ(0,"div"),e.YNc(1,le,3,2,"div",7),e.ALo(2,"async"),e.qZA()),2&n){const t=e.oxw();e.xp6(1),e.Q6J("ngIf",e.lcZ(2,1,t.messages$))}}function de(n,i){1&n&&(e.TgZ(0,"div")(1,"p",25),e._uU(2,"Deine Anfrage wurde noch nicht akzeptiert."),e.qZA()())}function ue(n,i){if(1&n){const t=e.EpF();e.TgZ(0,"div")(1,"div",25)(2,"div",30)(3,"p"),e._uU(4,"Du hast eine neue Chat-Anfrage. Wie m\xf6chtest du reagieren?"),e.qZA(),e.TgZ(5,"div",31)(6,"button",32),e.NdJ("click",function(){e.CHM(t);const o=e.oxw();return e.KtG(o.acceptRequestAndFollow())}),e.qZA()(),e.TgZ(7,"div",31)(8,"button",33),e.NdJ("click",function(){e.CHM(t);const o=e.oxw();return e.KtG(o.acceptRequest())}),e.qZA()(),e.TgZ(9,"div",31)(10,"button",34),e.NdJ("click",function(){e.CHM(t);const o=e.oxw();return e.KtG(o.rejectRequest())}),e.qZA()()()()()}}let me=(()=>{class n{constructor(t,s,o,r,c,g,C,Y,N,Xe){this.chatService=t,this.chatRoomQuery=s,this.chatRoomService=o,this.authentificationQuery=r,this.route=c,this.profileService=g,this.profileQuery=C,this.followingService=Y,this.groupsService=N,this.router=Xe,this.name="",this.avatarUrl="",this.message="",this.selectedRoomId="",this.messages$=new b.y,this.loggedInUserId="",this.profile$=new b.y,this.isGroup=!1,this.chatPartner="",this.chatPartnerAcceptedRequest=!0,this.loggedInUserAcceptedRequest=!0,this.enquirer=!1,this.test=!0}ngOnInit(){this.getSelectedId(),this.selectedRoomId&&this.chatRoomService.getRealTimeChanges(this.selectedRoomId),this.chatRoomService.getAllMessagesOfChat(this.selectedRoomId),this.messages$=this.chatRoomQuery.messages$,this.getChatPartner(),this.getLoggedInUserId(),this.selectedRoomId&&this.scrollDown(!0)}ngAfterViewChecked(){this.scrollDown(this.test)}getSelectedId(){this.route.paramMap.subscribe(t=>{this.selectedRoomId=String(t.get("id"))})}onSendMessage(){let t;t=this.group?this.group.id:void 0,this.chatService.sendMessage(this.selectedRoomId,this.chatPartner,this.message,this.isGroup,t).then(()=>{this.message=""})}getLoggedInUserId(){this.authentificationQuery.uuid$.subscribe(t=>{this.loggedInUserId=t})}scrollDown(t){try{this.content.nativeElement.scrollTop=this.content.nativeElement.scrollHeight}catch{}finally{t&&(this.test=!1)}}getProfile(){this.profileService.add(this.chatPartner),this.loggedInUserId&&(this.profile$=this.profileQuery.selectProfileById(this.chatPartner)),this.profile$.subscribe(t=>{t&&(this.profile=t)})}getGroup(){this.groupsService.selectGroup(this.chatPartner).then(t=>{this.group=t.data}).catch(t=>{console.log(t)})}getChatPartner(){this.chatService.getChatPartner(this.selectedRoomId).then(t=>{this.chatPartner=t.data,this.chatPartner?(this.isGroup=!1,this.getProfile(),this.chatService.resetNumberOfUnreadMessages(this.selectedRoomId,this.chatPartner),this.scrollDown(this.test)):(this.isGroup=!0,this.chatService.getGroupAsChatPartner(this.selectedRoomId).then(s=>{this.chatPartner=s.data,this.getGroup(),this.scrollDown(this.test)}).catch(s=>{console.log(s)})),this.checkIfChatPartnerAcceptedRequest(),this.checkIfChatLoggedInUserAcceptedRequest()}).catch(t=>{console.log(t)})}checkIfChatPartnerAcceptedRequest(){this.chatPartner&&this.chatService.checkIfChatPartnerAcceptedRequest(this.selectedRoomId,this.chatPartner).then(t=>{this.chatPartnerAcceptedRequest=t.data.accepted}).catch(t=>{console.log(t)})}checkIfChatLoggedInUserAcceptedRequest(){this.loggedInUserId&&this.chatService.checkIfChatPartnerAcceptedRequest(this.selectedRoomId,this.loggedInUserId).then(t=>{this.loggedInUserAcceptedRequest=t.data.accepted}).catch(t=>{console.log(t)})}acceptRequestAndFollow(){this.followingService.followTransaction(this.chatPartner).then(t=>{this.loggedInUserAcceptedRequest=!0}).catch(t=>{console.log(t)})}acceptRequest(){this.loggedInUserId&&this.chatService.acceptChatRequest(this.selectedRoomId,this.loggedInUserId).then(t=>{this.loggedInUserAcceptedRequest=!0}).catch(t=>{console.log(t)})}rejectRequest(){this.loggedInUserId&&this.chatService.rejectChatRequest(this.selectedRoomId,this.chatPartner,this.loggedInUserId).then(t=>{this.loggedInUserAcceptedRequest=!1,this.router.navigate(["/orga"])}).catch(t=>{console.log(t)})}}return n.\u0275fac=function(t){return new(t||n)(e.Y36(D),e.Y36(E),e.Y36(H),e.Y36(w.c),e.Y36(h.gz),e.Y36(B.H),e.Y36($.w),e.Y36(z.J),e.Y36(j.J),e.Y36(h.F0))},n.\u0275cmp=e.Xpm({type:n,selectors:[["app-chat-room"]],viewQuery:function(t,s){if(1&t&&e.Gf(te,5),2&t){let o;e.iGM(o=e.CRH())&&(s.content=o.first)}},inputs:{name:"name",avatarUrl:"avatarUrl"},decls:19,vars:10,consts:[[1,"fixed","w-full","top-fixed","surface"],[1,"flex"],["data-cy","backButton",1,"",3,"title","link"],["class","flex align-items-center w-full",4,"ngIf"],[3,"noTopBar"],["slot","main"],[1,"mb-8"],[4,"ngIf"],["slot","side"],[1,"fixed","w-full","p-3","bottom-fixed","left-0","background-color"],[3,"ngSubmit"],["messageForm","ngForm"],[1,"p-float-label"],["data-cy","send-message","name","message","id","message","type","text","pInputText","",1,"w-full","p-inputtext",3,"ngModel","disabled","ngModelChange"],["for","message"],[1,"flex","align-items-center","w-full"],[1,"w-full","flex","justify-content-end"],["class","flex align-items-center cursor-pointer",3,"routerLink",4,"ngIf"],[1,"flex","align-items-center","ml-5","mr-5","cursor-pointer",3,"routerLink"],["shape","circle","styleClass","border-round",1,"border-round","flex","align-items-center","justify-content-center",3,"image"],["data-cy","delete-chat",1,"cursor-pointer","pi","pi-times","align-items-center","flex","justify-content-center","mr-4","on-dark-surface-in-dark-theme",3,"click"],[1,"flex","align-items-center","cursor-pointer",3,"routerLink"],["class","flex align-items-center",4,"ngIf"],[1,"flex","align-items-center"],["class","chat-scroll-container",4,"ngIf"],[1,"text-center","margin-mid"],[1,"chat-scroll-container"],["messages",""],[4,"ngFor","ngForOf"],[3,"message","loggedInUserId"],[1,"flex","flex-column"],[1,"flex","justify-content-center"],["pButton","","type","button","label","Akzeptieren & Folgen",1,"fit-content","p-button-raised",3,"click"],["pButton","","type","button","label","Nur akzeptieren",1,"fit-content","p-button-text",3,"click"],["pButton","","type","button","label","Ablehnen",1,"fit-content","p-button-text","p-button-danger",3,"click"]],template:function(t,s){1&t&&(e.TgZ(0,"div",0)(1,"div",1),e._UZ(2,"app-back-button",2),e.YNc(3,se,6,3,"div",3),e.YNc(4,oe,5,3,"div",3),e.qZA()(),e.TgZ(5,"app-wrapper-grid",4)(6,"div",5)(7,"div",6),e.YNc(8,pe,3,3,"div",7),e.YNc(9,de,3,0,"div",7),e.YNc(10,ue,11,0,"div",7),e.qZA()(),e._UZ(11,"div",8),e.qZA(),e.TgZ(12,"div",9)(13,"form",10,11),e.NdJ("ngSubmit",function(){return s.onSendMessage()}),e.TgZ(15,"span",12)(16,"input",13),e.NdJ("ngModelChange",function(r){return s.message=r}),e.qZA(),e.TgZ(17,"label",14),e._uU(18,"Neue Nachricht"),e.qZA()()()()),2&t&&(e.xp6(2),e.Q6J("title","Zur\xfcck")("link","/orga"),e.xp6(1),e.Q6J("ngIf",s.profile),e.xp6(1),e.Q6J("ngIf",s.group),e.xp6(1),e.Q6J("noTopBar",!0),e.xp6(3),e.Q6J("ngIf",s.loggedInUserAcceptedRequest&&s.chatPartnerAcceptedRequest),e.xp6(1),e.Q6J("ngIf",s.loggedInUserAcceptedRequest&&!s.chatPartnerAcceptedRequest),e.xp6(1),e.Q6J("ngIf",!s.loggedInUserAcceptedRequest&&s.chatPartnerAcceptedRequest),e.xp6(6),e.Q6J("ngModel",s.message)("disabled",!s.chatPartnerAcceptedRequest||!s.loggedInUserAcceptedRequest))},dependencies:[l.sg,l.O5,h.rH,h.yS,d._Y,d.Fj,d.JJ,d.JL,d.On,d.F,v.q,x.o,k.Hq,Z.V,K.W,ee,l.Ov],styles:[".bottom-fixed[_ngcontent-%COMP%]{bottom:4rem}.top-fixed[_ngcontent-%COMP%]{left:0rem;top:0rem;padding-left:2rem}.chat-scroll-container[_ngcontent-%COMP%]{overflow-y:scroll;overflow-x:hidden;height:calc(100vh - 10rem)!important;margin-bottom:8rem!important;margin-top:4rem}.margin-mid[_ngcontent-%COMP%]{margin-top:40vh}@media only screen and (min-width: 1024px){.bottom-fixed[_ngcontent-%COMP%]{padding-left:15rem!important;padding-right:5rem!important;bottom:0rem!important}.top-fixed[_ngcontent-%COMP%]{padding-left:16rem;padding-right:16rem}.chat-scroll-container[_ngcontent-%COMP%]{margin-bottom:0rem;height:calc(100vh - 10rem)!important}}"]}),n})();const M=[{label:"CHAT",routerLink:["/orga"],routerLinkActiveOptions:{exact:!0}},{label:"NEWS",routerLink:["/orga/news"],routerLinkActiveOptions:{exact:!0}}],U=[{icon:"pi pi-fw pi-comments",routerLink:["/orga"],routerLinkActiveOptions:{exact:!0}},{icon:"pi pi-fw pi-bell",routerLink:["/orga/news"],routerLinkActiveOptions:{exact:!0}}];var O=a(4004);const he={ui:{filters:{name:!1}}};let m=class extends _.cf{constructor(){super(he)}};m.\u0275fac=function(i){return new(i||m)},m.\u0275prov=e.Yz7({token:m,factory:m.\u0275fac,providedIn:"root"}),m=(0,R.gn)([(0,_.yC)({name:"chat",resettable:!0})],m);let S=(()=>{class n extends _.Gv{constructor(t){super(t),this.store=t,this.allChats$=this.selectAll()}filterData(t,s){let o=this.allChats$;return s&&(o=o.pipe((0,O.U)(r=>r.filter(c=>!0===c.is_group)))),""!==t&&(o=o.pipe((0,O.U)(r=>r.filter(c=>c.name.includes(t))))),o}}return n.\u0275fac=function(t){return new(t||n)(e.LFG(m))},n.\u0275prov=e.Yz7({token:n,factory:n.\u0275fac,providedIn:"root"}),n})(),ge=(()=>{class n{constructor(t,s,o){this.chatQuery=t,this.authentificationQuery=s,this.chatStore=o,this.supabaseClient=(0,T.eI)(f.N.supabaseUrl,f.N.supabaseKey)}selectAllRoomsOfUser(){var t=this;return(0,p.Z)(function*(){let s="";return t.authentificationQuery.uuid$.subscribe(r=>{s=r}),yield t.supabaseClient.rpc("select_all_rooms_of_user",{user_id_in:s}).then(r=>{const c=r.data;t.chatStore.reset(),t.chatStore.add(c)})})()}add(t){this.chatStore.add(t)}update(t,s){this.chatStore.update(t,s)}remove(t){this.chatStore.remove(t)}getRealTimeChanges(){this.chatQuery.allChats$.subscribe(t=>{t.forEach(s=>{let o=s.id;return this.supabaseClient.from(`rooms:id=eq.${o}`).on("UPDATE",c=>{this.chatStore.update(o,{last_message:c.new.last_message,last_message_time:c.new.last_message_time})}).subscribe()}),t.forEach(s=>{let o=s.id;return this.supabaseClient.from(`rooms_participants:room_id=eq.${o}`).on("UPDATE",c=>{this.chatStore.update(o,{number_of_unread_messages:c.new.number_of_unread_messages})}).subscribe()})})}}return n.\u0275fac=function(t){return new(t||n)(e.LFG(S),e.LFG(w.c),e.LFG(m))},n.\u0275prov=e.Yz7({token:n,factory:n.\u0275fac,providedIn:"root"}),n})();var I=a(7147),q=a(4479),J=a(4524),fe=a(805);let _e=(()=>{class n{containerClass(){return{"p-badge p-component":!0,"p-badge-no-gutter":null!=this.value&&1===String(this.value).length,"p-badge-lg":"large"===this.size,"p-badge-xl":"xlarge"===this.size,"p-badge-info":"info"===this.severity,"p-badge-success":"success"===this.severity,"p-badge-warning":"warning"===this.severity,"p-badge-danger":"danger"===this.severity}}}return n.\u0275fac=function(t){return new(t||n)},n.\u0275cmp=e.Xpm({type:n,selectors:[["p-badge"]],hostAttrs:[1,"p-element"],inputs:{styleClass:"styleClass",style:"style",size:"size",severity:"severity",value:"value"},decls:2,vars:5,consts:[[3,"ngClass","ngStyle"]],template:function(t,s){1&t&&(e.TgZ(0,"span",0),e._uU(1),e.qZA()),2&t&&(e.Tol(s.styleClass),e.Q6J("ngClass",s.containerClass())("ngStyle",s.style),e.xp6(1),e.hij(" ",s.value," "))},dependencies:[l.mk,l.PC],styles:[".p-badge{display:inline-block;border-radius:10px;text-align:center;padding:0 .5rem}.p-overlay-badge{position:relative}.p-overlay-badge .p-badge{position:absolute;top:0;right:0;transform:translate(50%,-50%);transform-origin:100% 0;margin:0}.p-badge-dot{width:.5rem;min-width:.5rem;height:.5rem;border-radius:50%;padding:0}.p-badge-no-gutter{padding:0;border-radius:50%}\n"],encapsulation:2,changeDetection:0}),n})(),ve=(()=>{class n{}return n.\u0275fac=function(t){return new(t||n)},n.\u0275mod=e.oAB({type:n}),n.\u0275inj=e.cJS({imports:[[l.ez],fe.m8]}),n})();function Ce(n,i){1&n&&e._UZ(0,"i",14)}function Ie(n,i){if(1&n&&e._UZ(0,"p-badge",15),2&n){const t=e.oxw();e.Q6J("value",t.unreadMessagesAsString)}}function ye(n,i){if(1&n&&(e.TgZ(0,"p",16),e._uU(1),e.ALo(2,"date"),e.qZA()),2&n){const t=e.oxw();e.xp6(1),e.Oqu(e.lcZ(2,1,t.chat.last_message_time))}}function be(n,i){if(1&n&&(e.TgZ(0,"p",16),e._uU(1),e.ALo(2,"date"),e.qZA()),2&n){const t=e.oxw();e.xp6(1),e.Oqu(e.xi3(2,1,t.chat.last_message_time,"HH:mm:ss"))}}let Te=(()=>{class n{constructor(t){this.router=t,this.showTime=!1,this.unreadMessagesAsString=""}ngOnInit(){this.checkIfMessageReceivedToday(),this.convertNumberToString()}openProfile(t){this.router.navigate([`profile/${this.chat.participant_id}`])}openChat(){this.router.navigate([`orga/${this.chat.id}`])}checkIfMessageReceivedToday(){(new Date).setHours(0,0,0,0)===new Date(this.chat.last_message_time).setHours(0,0,0,0)&&(this.showTime=!0)}convertNumberToString(){this.unreadMessagesAsString=this.chat.number_of_unread_messages.toString()}}return n.\u0275fac=function(t){return new(t||n)(e.Y36(h.F0))},n.\u0275cmp=e.Xpm({type:n,selectors:[["app-chat-list-item"]],inputs:{chat:"chat"},decls:19,vars:7,consts:[[1,"flex","w-full"],[1,"flex-space-arround","p-2","w-full"],[1,"flex","align-items-center","w-full"],[1,"flex-none","mr-5","cursor-pointer",3,"click"],["shape","circle","styleClass","border-round",3,"image"],[1,"flex-grow-1","mr-5","cursor-pointer",3,"click"],[1,"my-0"],[1,"mt-1","mb-0"],[1,"flex-none","p-2","cursor-pointer",3,"click"],[1,"flex-space-between"],[1,"text-center"],["class","pi pi-users mr-2",4,"ngIf"],["data-cy","number-of-unread-messages",3,"value",4,"ngIf"],["class","mb-0",4,"ngIf"],[1,"pi","pi-users","mr-2"],["data-cy","number-of-unread-messages",3,"value"],[1,"mb-0"]],template:function(t,s){1&t&&(e.TgZ(0,"div",0)(1,"div",1)(2,"div",2)(3,"a",3),e.NdJ("click",function(){return s.openProfile("id")}),e._UZ(4,"p-avatar",4),e.qZA(),e.TgZ(5,"a",5),e.NdJ("click",function(){return s.openChat()}),e.TgZ(6,"h4",6),e._uU(7),e.qZA(),e.TgZ(8,"p",7),e._uU(9),e.qZA()(),e.TgZ(10,"a",8),e.NdJ("click",function(){return s.openChat()}),e.TgZ(11,"div",9)(12,"div",10)(13,"div"),e.YNc(14,Ce,1,0,"i",11),e.YNc(15,Ie,1,1,"p-badge",12),e.qZA(),e.TgZ(16,"div"),e.YNc(17,ye,3,3,"p",13),e.YNc(18,be,3,4,"p",13),e.qZA()()()()()()()),2&t&&(e.xp6(4),e.s9C("image",s.chat.avatar_url),e.xp6(3),e.Oqu(s.chat.name),e.xp6(2),e.Oqu(s.chat.last_message),e.xp6(5),e.Q6J("ngIf",s.chat.is_group),e.xp6(1),e.Q6J("ngIf",s.chat.number_of_unread_messages>0),e.xp6(2),e.Q6J("ngIf",!s.showTime),e.xp6(1),e.Q6J("ngIf",s.showTime))},dependencies:[l.O5,_e,v.q,l.uU]}),n})();function we(n,i){if(1&n){const t=e.EpF();e.TgZ(0,"p-chip",15),e.NdJ("click",function(){e.CHM(t);const o=e.oxw();return e.KtG(o.setGroupFilter())}),e.qZA()}}function xe(n,i){if(1&n){const t=e.EpF();e.TgZ(0,"p-chip",16),e.NdJ("click",function(){e.CHM(t);const o=e.oxw();return e.KtG(o.setGroupFilter())}),e.qZA()}}function Ze(n,i){if(1&n&&(e.TgZ(0,"div"),e._UZ(1,"app-chat-list-item",17),e.qZA()),2&n){const t=i.$implicit;e.xp6(1),e.Q6J("chat",t)}}let Ae=(()=>{class n{constructor(t,s){this.chatQuery=t,this.chatServiceStore=s,this.menuItems=M,this.menuItemsMega=U,this.groupFilterOn=!1,this.searchTerm="",this.chats$=new b.y}ngOnInit(){this.chatServiceStore.selectAllRoomsOfUser(),this.chats$=this.chatQuery.allChats$,this.chatServiceStore.getRealTimeChanges()}onSearch(t){this.searchTerm=t,this.chats$=this.chatQuery.filterData(this.searchTerm,this.groupFilterOn)}setGroupFilter(){this.groupFilterOn=!this.groupFilterOn,this.chats$=this.chatQuery.filterData(this.searchTerm,this.groupFilterOn)}}return n.\u0275fac=function(t){return new(t||n)(e.Y36(S),e.Y36(ge))},n.\u0275cmp=e.Xpm({type:n,selectors:[["app-chat"]],decls:19,vars:8,consts:[[3,"menuItems"],["slot","main"],[1,"mb-8"],[3,"submit"],[1,"grid"],[1,"col-12"],[1,"p-float-label"],["id","float-input","type","text","pInputText","","data-cy","filter-chats",1,"w-full","p-inputtext",3,"value"],["searchBar",""],["for","float-input"],[1,"w-full","text-center"],["class","","label","POLITY GRUPPEN","styleClass","cursor-pointer",3,"click",4,"ngIf"],["class","","label","POLITY GRUPPEN","styleClass","cursor-pointer accent-container",3,"click",4,"ngIf"],[4,"ngFor","ngForOf"],["slot","side"],["label","POLITY GRUPPEN","styleClass","cursor-pointer",1,"",3,"click"],["label","POLITY GRUPPEN","styleClass","cursor-pointer accent-container",1,"",3,"click"],[3,"chat"]],template:function(t,s){if(1&t){const o=e.EpF();e._UZ(0,"app-menu-bar-secondary-top",0),e.TgZ(1,"app-wrapper-grid")(2,"div",1)(3,"div",2)(4,"form",3),e.NdJ("submit",function(){e.CHM(o);const c=e.MAs(9);return e.KtG(s.onSearch(c.value))}),e.TgZ(5,"div",4)(6,"div",5)(7,"span",6),e._UZ(8,"input",7,8),e.TgZ(10,"label",9),e._uU(11,"Search"),e.qZA()()()()(),e.TgZ(12,"div",10),e.YNc(13,we,1,0,"p-chip",11),e.YNc(14,xe,1,0,"p-chip",12),e.qZA(),e.YNc(15,Ze,2,1,"div",13),e.ALo(16,"async"),e.qZA()(),e.TgZ(17,"div",14),e._UZ(18,"app-menu-bar-secondary-right",0),e.qZA()()}2&t&&(e.Q6J("menuItems",s.menuItemsMega),e.xp6(8),e.Q6J("value",""),e.xp6(5),e.Q6J("ngIf",!s.groupFilterOn),e.xp6(1),e.Q6J("ngIf",s.groupFilterOn),e.xp6(1),e.Q6J("ngForOf",e.lcZ(16,6,s.chats$)),e.xp6(3),e.Q6J("menuItems",s.menuItems))},dependencies:[l.sg,l.O5,d._Y,d.JL,d.F,I.A,x.o,Z.V,q.e,J.U,Te,l.Ov]}),n})();var L=a(6679);function Ne(n,i){if(1&n&&e._UZ(0,"p-tag",15),2&n){const t=e.oxw();e.s9C("value",t.news.type)}}function Fe(n,i){if(1&n&&e._UZ(0,"p-tag",16),2&n){const t=e.oxw();e.s9C("value",t.news.type)}}function Re(n,i){if(1&n&&e._UZ(0,"p-tag",17),2&n){const t=e.oxw();e.s9C("value",t.news.type)}}function ke(n,i){if(1&n&&e._UZ(0,"p-tag",15),2&n){const t=e.oxw();e.s9C("value",t.news.type)}}function Me(n,i){if(1&n&&e._UZ(0,"p-tag",15),2&n){const t=e.oxw();e.s9C("value",t.news.type)}}function Ue(n,i){if(1&n&&(e.TgZ(0,"p",18),e._uU(1),e.ALo(2,"date"),e.qZA()),2&n){const t=e.oxw();e.xp6(1),e.Oqu(e.lcZ(2,1,t.news.time))}}function Oe(n,i){if(1&n&&(e.TgZ(0,"p",18),e._uU(1),e.ALo(2,"date"),e.qZA()),2&n){const t=e.oxw();e.xp6(1),e.Oqu(e.xi3(2,1,t.news.time,"HH:mm:ss"))}}let Se=(()=>{class n{constructor(){this.showTime=!1}ngOnInit(){}openProfile(){}openConnectedId(){}checkIfMessageReceivedToday(){(new Date).setHours(0,0,0,0)===new Date(this.news.time).setHours(0,0,0,0)&&(this.showTime=!0)}}return n.\u0275fac=function(t){return new(t||n)},n.\u0275cmp=e.Xpm({type:n,selectors:[["app-news-list-item"]],inputs:{news:"news"},decls:22,vars:10,consts:[[1,"flex","w-full"],[1,"flex-space-arround","p-2","w-full"],[1,"flex","align-items-center","w-full"],[1,"flex-none","mr-5","cursor-pointer",3,"click"],["shape","circle","styleClass","border-round",3,"image"],[1,"flex-grow-1","mr-5","cursor-pointer",3,"click"],[1,"my-0"],[1,"mt-1","mb-0"],[1,"flex-none","p-2","cursor-pointer",3,"click"],[1,"flex-space-between"],[1,"text-center"],["styleClass","primary-container font-normal primary-color",3,"value",4,"ngIf"],["styleClass","test accent-container-2 font-normal accent-color-2",3,"value",4,"ngIf"],["styleClass","tertiary-container font-normal tertiary-color",3,"value",4,"ngIf"],["class","mb-0",4,"ngIf"],["styleClass","primary-container font-normal primary-color",3,"value"],["styleClass","test accent-container-2 font-normal accent-color-2",3,"value"],["styleClass","tertiary-container font-normal tertiary-color",3,"value"],[1,"mb-0"]],template:function(t,s){1&t&&(e.TgZ(0,"div",0)(1,"div",1)(2,"div",2)(3,"a",3),e.NdJ("click",function(){return s.openProfile()}),e._UZ(4,"p-avatar",4),e.qZA(),e.TgZ(5,"a",5),e.NdJ("click",function(){return s.openConnectedId()}),e.TgZ(6,"h4",6),e._uU(7),e.qZA(),e.TgZ(8,"p",7),e._uU(9),e.qZA()(),e.TgZ(10,"a",8),e.NdJ("click",function(){return s.openConnectedId()}),e.TgZ(11,"div",9)(12,"div",10)(13,"div"),e.YNc(14,Ne,1,1,"p-tag",11),e.YNc(15,Fe,1,1,"p-tag",12),e.YNc(16,Re,1,1,"p-tag",13),e.YNc(17,ke,1,1,"p-tag",11),e.YNc(18,Me,1,1,"p-tag",11),e.qZA(),e.TgZ(19,"div"),e.YNc(20,Ue,3,3,"p",14),e.YNc(21,Oe,3,4,"p",14),e.qZA()()()()()()()),2&t&&(e.xp6(4),e.s9C("image",s.news.avatar_url),e.xp6(3),e.Oqu(s.news.connected_name),e.xp6(2),e.Oqu(s.news.info),e.xp6(5),e.Q6J("ngIf","task"===s.news.type),e.xp6(1),e.Q6J("ngIf","amendment"===s.news.type),e.xp6(1),e.Q6J("ngIf","event"===s.news.type),e.xp6(1),e.Q6J("ngIf","vote"===s.news.type),e.xp6(1),e.Q6J("ngIf","account"===s.news.type),e.xp6(2),e.Q6J("ngIf",!s.showTime),e.xp6(1),e.Q6J("ngIf",s.showTime))},dependencies:[l.O5,v.q,L.V,l.uU],styles:[".test[_ngcontent-%COMP%]{color:red}"]}),n})();function qe(n,i){if(1&n){const t=e.EpF();e.TgZ(0,"p-chip",18),e.NdJ("click",function(){e.CHM(t);const o=e.oxw();return e.KtG(o.setTaskFilter())}),e.qZA()}}function Je(n,i){if(1&n){const t=e.EpF();e.TgZ(0,"p-chip",19),e.NdJ("click",function(){e.CHM(t);const o=e.oxw();return e.KtG(o.setAmendmentFilter())}),e.qZA()}}function Le(n,i){if(1&n){const t=e.EpF();e.TgZ(0,"p-chip",20),e.NdJ("click",function(){e.CHM(t);const o=e.oxw();return e.KtG(o.setEventFilter())}),e.qZA()}}function Qe(n,i){if(1&n){const t=e.EpF();e.TgZ(0,"p-chip",21),e.NdJ("click",function(){e.CHM(t);const o=e.oxw();return e.KtG(o.setVoteFilter())}),e.qZA()}}function Pe(n,i){if(1&n){const t=e.EpF();e.TgZ(0,"p-chip",22),e.NdJ("click",function(){e.CHM(t);const o=e.oxw();return e.KtG(o.setAccountFilter())}),e.qZA()}}const Ye=function(){return{backgroundColor:"var(--primary-color\t)"}};function De(n,i){if(1&n&&(e.TgZ(0,"div")(1,"div")(2,"p",23),e._uU(3,"Test"),e.qZA()(),e._UZ(4,"app-news-list-item",24),e.qZA()),2&n){const t=i.$implicit;e.xp6(2),e.Q6J("ngStyle",e.DdM(2,Ye)),e.xp6(2),e.Q6J("news",t)}}const Ee=[{path:"",component:Ae,canActivate:[y.u]},{path:"news",component:(()=>{class n{constructor(){this.menuItems=M,this.menuItemsMega=U,this.newsList=[],this.taskFilterOn=!0,this.amendmentFilterOn=!0,this.eventFilterOn=!0,this.voteFilterOn=!0,this.accountFilterOn=!0}ngOnInit(){this.newsList=[{id:"dfdf-sdfs-sdff-sdfs",sender:"Tobias",time:new Date,connected_id:"dfdf-sdfs-sdff-sdfs",connected_name:"Task Board Rosbach",info:"Flyer drucken",avatar_url:"avatar-url",type:"Task"},{id:"dfdf-sdfs-sdff-sdfs",sender:"Tobias",time:new Date,connected_id:"dfdf-sdfs-sdff-sdfs",connected_name:"Umgehungsstra\xdfe Rosbach",info:"In Zeile 20 x einf\xfcgen",avatar_url:"avatar-url",type:"amendment"},{id:"dfdf-sdfs-sdff-sdfs",sender:"Tobias",time:new Date,connected_id:"dfdf-sdfs-sdff-sdfs",connected_name:"Vorstandssitzung Rosbach",info:'Neuer Tagesordnungspunkt "Bericht Bezirk"',avatar_url:"avatar-url",type:"event"},{id:"dfdf-sdfs-sdff-sdfs",sender:"Tobias",time:new Date,connected_id:"dfdf-sdfs-sdff-sdfs",connected_name:"Vorstandswahl",info:'Neuer Kandidat "Lukas Maier"',avatar_url:"avatar-url",type:"vote"},{id:"dfdf-sdfs-sdff-sdfs",sender:"Tobias",time:new Date,connected_id:"dfdf-sdfs-sdff-sdfs",connected_name:"Neuer Follower",info:'Lara Ziegler folgt dir jetzt"',avatar_url:"avatar-url",type:"account"}]}onSearch(t){}setTaskFilter(){this.taskFilterOn=!this.taskFilterOn}setAmendmentFilter(){this.amendmentFilterOn=!this.amendmentFilterOn}setEventFilter(){this.eventFilterOn=!this.eventFilterOn}setVoteFilter(){this.voteFilterOn=!this.voteFilterOn}setAccountFilter(){this.accountFilterOn=!this.accountFilterOn}}return n.\u0275fac=function(t){return new(t||n)},n.\u0275cmp=e.Xpm({type:n,selectors:[["app-news"]],decls:21,vars:9,consts:[[3,"menuItems"],["slot","main"],[1,"mb-8"],[3,"submit"],[1,"grid"],[1,"col-12"],[1,"p-float-label"],["id","float-input","type","text","pInputText","",1,"w-full","p-inputtext",3,"value"],["searchBar",""],["for","float-input"],[1,"w-full","text-center"],["label","TASKS","styleClass","cursor-pointer",3,"click",4,"ngIf"],["label","AMENDMENTS","styleClass","cursor-pointer accent-container",3,"click",4,"ngIf"],["label","EVENT","styleClass","cursor-pointer accent-container",3,"click",4,"ngIf"],["label","VOTE","styleClass","cursor-pointer accent-container",3,"click",4,"ngIf"],["label","ACCOUNT","styleClass","cursor-pointer accent-container",3,"click",4,"ngIf"],[4,"ngFor","ngForOf"],["slot","side"],["label","TASKS","styleClass","cursor-pointer",3,"click"],["label","AMENDMENTS","styleClass","cursor-pointer accent-container",3,"click"],["label","EVENT","styleClass","cursor-pointer accent-container",3,"click"],["label","VOTE","styleClass","cursor-pointer accent-container",3,"click"],["label","ACCOUNT","styleClass","cursor-pointer accent-container",3,"click"],[1,"test",3,"ngStyle"],[3,"news"]],template:function(t,s){if(1&t){const o=e.EpF();e._UZ(0,"app-menu-bar-secondary-top",0),e.TgZ(1,"app-wrapper-grid")(2,"div",1)(3,"div",2)(4,"form",3),e.NdJ("submit",function(){e.CHM(o);const c=e.MAs(9);return e.KtG(s.onSearch(c.value))}),e.TgZ(5,"div",4)(6,"div",5)(7,"span",6),e._UZ(8,"input",7,8),e.TgZ(10,"label",9),e._uU(11,"Search"),e.qZA()()()()(),e.TgZ(12,"div",10),e.YNc(13,qe,1,0,"p-chip",11),e.YNc(14,Je,1,0,"p-chip",12),e.YNc(15,Le,1,0,"p-chip",13),e.YNc(16,Qe,1,0,"p-chip",14),e.YNc(17,Pe,1,0,"p-chip",15),e.qZA(),e.YNc(18,De,5,3,"div",16),e.qZA()(),e.TgZ(19,"div",17),e._UZ(20,"app-menu-bar-secondary-right",0),e.qZA()()}2&t&&(e.Q6J("menuItems",s.menuItemsMega),e.xp6(8),e.Q6J("value",""),e.xp6(5),e.Q6J("ngIf",s.taskFilterOn),e.xp6(1),e.Q6J("ngIf",s.amendmentFilterOn),e.xp6(1),e.Q6J("ngIf",s.eventFilterOn),e.xp6(1),e.Q6J("ngIf",s.voteFilterOn),e.xp6(1),e.Q6J("ngIf",s.accountFilterOn),e.xp6(1),e.Q6J("ngForOf",s.newsList),e.xp6(2),e.Q6J("menuItems",s.menuItems))},dependencies:[l.sg,l.O5,l.PC,I.A,Z.V,J.U,q.e,Se],styles:[".test[_ngcontent-%COMP%]{width:300px;height:300px}"]}),n})(),canActivate:[y.u]},{path:":id",component:me,canActivate:[y.u]}];let He=(()=>{class n{}return n.\u0275fac=function(t){return new(t||n)},n.\u0275mod=e.oAB({type:n}),n.\u0275inj=e.cJS({imports:[h.Bz.forChild(Ee),h.Bz]}),n})();var Q=a(5480),A=a(3943),P=a(5604);let Be=(()=>{class n{}return n.\u0275fac=function(t){return new(t||n)},n.\u0275mod=e.oAB({type:n}),n.\u0275inj=e.cJS({imports:[l.ez,v.F,L.W]}),n})(),$e=(()=>{class n{}return n.\u0275fac=function(t){return new(t||n)},n.\u0275mod=e.oAB({type:n}),n.\u0275inj=e.cJS({imports:[l.ez,I.o,Q.x,A.q,P.Q,A.q,Be]}),n})();var ze=a(989);let je=(()=>{class n{}return n.\u0275fac=function(t){return new(t||n)},n.\u0275mod=e.oAB({type:n}),n.\u0275inj=e.cJS({imports:[l.ez]}),n})(),Ke=(()=>{class n{}return n.\u0275fac=function(t){return new(t||n)},n.\u0275mod=e.oAB({type:n}),n.\u0275inj=e.cJS({imports:[l.ez,ve,v.F]}),n})(),Ve=(()=>{class n{}return n.\u0275fac=function(t){return new(t||n)},n.\u0275mod=e.oAB({type:n}),n.\u0275inj=e.cJS({imports:[l.ez,He,d.u5,I.o,v.F,x.j,k.hJ,Q.x,P.Q,A.q,$e,ze.n,je,Ke]}),n})()}}]);