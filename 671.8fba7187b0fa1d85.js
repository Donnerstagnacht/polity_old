"use strict";(self.webpackChunkpolity=self.webpackChunkpolity||[]).push([[671],{2671:(it,L,n)=>{n.r(L),n.d(L,{GroupsModule:()=>rt});var c=n(6895),y=n(5593),d=n(2453),J=n(1740),H=n(8783),m=n(8996),g=n(433),U=n(7772),K=n(2665),V=n(3214),k=n(3054),j=n(6679),Q=n(8271),e=n(4650);let P=(()=>{class r{}return r.\u0275fac=function(t){return new(t||r)},r.\u0275mod=e.oAB({type:r}),r.\u0275inj=e.cJS({imports:[[c.ez]]}),r})();var D=n(6919),C=n(5480),Z=n(989),O=n(7136),A=n(6609);let W=(()=>{class r{}return r.\u0275fac=function(t){return new(t||r)},r.\u0275mod=e.oAB({type:r}),r.\u0275inj=e.cJS({imports:[c.ez,y.hJ,d.EV,C.x,d.EV,Z.n,O.R,A.z]}),r})();var X=n(7296);let ee=(()=>{class r{}return r.\u0275fac=function(t){return new(t||r)},r.\u0275mod=e.oAB({type:r}),r.\u0275inj=e.cJS({imports:[c.ez,d.EV,C.x,Z.n,O.R,A.z,X.Rq]}),r})();var l=n(5861),p=n(805),N=n(9488),I=n(2545),f=n(8365),v=n(8092),F=n(9469),Y=n(9762),S=n(8249);function te(r,o){if(1&r){const t=e.EpF();e.TgZ(0,"div",5)(1,"div",6),e._UZ(2,"app-back-button",7),e.TgZ(3,"div",8)(4,"app-tab-view-table-lists",9),e.NdJ("removeItemFromFirstTab",function(s){e.CHM(t);const a=e.oxw();return e.KtG(a.onRemoveFollower(s))}),e.qZA()()()()}if(2&r){const t=e.oxw();e.xp6(2),e.Q6J("title","Zur\xfcck")("link",t.link),e.xp6(2),e.Q6J("paginationDataFirstTab",t.paginationData)("dataFirstTab",t.followers)("titleFirstTab",t.titleFollower)("noDataFirstTab",t.noDataFollower)("secondTabNeeded",!1)}}let re=(()=>{class r{constructor(t,i,s,a,u){this.followingGroupsService=t,this.groupsService=i,this.groupQuery=s,this.messageService=a,this.route=u,this.followers=[],this.followings=[],this.selectedGroupId="",this.link="",this.titleFollower="Follower",this.noDataFollower="Du hast noch keine Follower.",this.loading=!1,this.loadingInitial=!1,this.error=!1,this.paginationData={from:0,to:2,canLoad:!0,reloadDelay:2e3,sizeOfNewLoad:10,numberOfSearchResults:0}}ngOnInit(){this.getSelectedId(),this.link=`/groups/${this.selectedGroupId}/edit`,this.loadInitialData()}ngOnDestroy(){this.followerSubscription&&this.followerSubscription.unsubscribe(),this.realTimeSubscriptionFollower&&this.realTimeSubscriptionFollower.unsubscribe(),this.realTimeSubscriptionGroup&&this.realTimeSubscriptionGroup.unsubscribe()}loadInitialData(){var t=this;return(0,l.Z)(function*(){try{t.loadingInitial=!0,t.error=!1,yield t.groupsService.getAllFollowers(t.selectedGroupId),t.getAllFollowerFromStore()}catch(i){t.error=!0,t.errorMessage=i.message,t.messageService.add({severity:"error",summary:i.message})}finally{t.loadingInitial=!1}})()}getAllFollowerFromStore(){this.followerSubscription=this.groupQuery.selectEntity(this.selectedGroupId).subscribe(t=>{t?.followers&&(this.followers=[],this.followers=t.followers),this.paginationData.numberOfSearchResults=this.followers.length,this.realTimeSubscriptionFollower=this.groupsService.getRealTimeChangesFollowers(this.selectedGroupId),this.realTimeSubscriptionGroup=this.groupsService.getRealTimeChanges(this.selectedGroupId)})}onRemoveFollower(t){var i=this;return(0,l.Z)(function*(){try{i.loading=!0,yield i.followingGroupsService.removeFollowerTransaction(t.user_id,i.selectedGroupId),i.messageService.add({severity:"success",summary:"Follower entfernt."})}catch(s){i.messageService.add({severity:"error",summary:s.message})}finally{i.loading=!1}})()}getSelectedId(){this.route.paramMap.subscribe(t=>{this.selectedGroupId=String(t.get("id"))})}}return r.\u0275fac=function(t){return new(t||r)(e.Y36(N.s),e.Y36(I.J),e.Y36(f.$),e.Y36(p.ez),e.Y36(m.gz))},r.\u0275cmp=e.Xpm({type:r,selectors:[["app-follower-group-management"]],features:[e._Bn([p.ez])],decls:5,vars:5,consts:[["styleClass","max-w-90","position","top-right"],[3,"noTopBar"],["slot","main"],[3,"error","loading","errorMessage","retryAction"],["class","mb-8",4,"ngIf"],[1,"mb-8"],[1,"mx-4"],["data-cy","backButton",3,"title","link"],[1,"mb-30"],[3,"paginationDataFirstTab","dataFirstTab","titleFirstTab","noDataFirstTab","secondTabNeeded","removeItemFromFirstTab"]],template:function(t,i){1&t&&(e._UZ(0,"p-toast",0),e.TgZ(1,"app-wrapper-grid",1)(2,"div",2)(3,"app-loading-spinner",3),e.NdJ("retryAction",function(){return i.loadInitialData()}),e.qZA(),e.YNc(4,te,5,7,"div",4),e.qZA()()),2&t&&(e.xp6(1),e.Q6J("noTopBar",!0),e.xp6(2),e.Q6J("error",i.error)("loading",i.loadingInitial)("errorMessage",i.errorMessage),e.xp6(1),e.Q6J("ngIf",!i.loadingInitial&&!i.loading&&!i.error))},dependencies:[c.O5,d.FN,v.V,F.W,Y.r,S.g]}),r})();var w=n(9049);function ie(r,o){if(1&r){const t=e.EpF();e.TgZ(0,"div",5)(1,"div",6),e._UZ(2,"app-back-button",7),e.TgZ(3,"div",8)(4,"app-tab-view-table-lists",9),e.NdJ("removeItemFromFirstTab",function(s){e.CHM(t);const a=e.oxw();return e.KtG(a.cancelMembershipRequest(s))})("acceptItemFromFirstTab",function(s){e.CHM(t);const a=e.oxw();return e.KtG(a.acceptMembershipRequest(s))})("removeItemFromSecontTab",function(s){e.CHM(t);const a=e.oxw();return e.KtG(a.removeMember(s))}),e.qZA()()()()}if(2&r){const t=e.oxw();e.xp6(2),e.Q6J("title","Zur\xfcck")("link",t.link),e.xp6(2),e.Q6J("paginationDataFirstTab",t.paginationDataFirstTab)("paginationDataSecondTab",t.paginationDataSecondTab)("dataFirstTab",t.membershipRequests)("titleFirstTab",t.titleMembershipRequests)("noDataFirstTab",t.noDataMembershiprequests)("secondTabNeeded",!0)("acceptButtonNeededFirstTab",!0)("dataSecondTab",t.members)("titleSecondTab",t.titleMembers)("noDataSecondTab",t.noDataMembers)}}let se=(()=>{class r{constructor(t,i,s,a,u){this.membershipService=t,this.messageService=i,this.route=s,this.groupService=a,this.groupQuery=u,this.selectedGroupId="",this.membershipRequests=[],this.members=[],this.link="",this.titleMembershipRequests="Beitrittsanfragen",this.noDataMembershiprequests="Du hast aktuell keine offenen Beitrittsanfragen.",this.titleMembers="Mitglieder",this.noDataMembers="Du hast aktuell noch keine Mitglieder.",this.loadMemebershipRequests=!1,this.loadMembers=!1,this.loadingInitial=!1,this.error=!1,this.errorMembershipRequests=!1,this.errorMembers=!1,this.paginationDataFirstTab={from:0,to:2,canLoad:!0,reloadDelay:2e3,sizeOfNewLoad:10,numberOfSearchResults:0},this.paginationDataSecondTab={from:0,to:2,canLoad:!0,reloadDelay:2e3,sizeOfNewLoad:10,numberOfSearchResults:0}}ngOnInit(){this.getSelectedId(),this.link=`/groups/${this.selectedGroupId}/edit`,this.loadInitialData(),this.membersRealtimeChannel=this.groupService.getRealTimeChangesMembers(this.selectedGroupId),this.membershipRequestsRealtimeChannel=this.groupService.getRealTimeChangesMembershipRequests(this.selectedGroupId)}ngOnDestroy(){this.membersRealtimeChannel&&this.membersRealtimeChannel.unsubscribe(),this.membershipRequestsRealtimeChannel&&this.membershipRequestsRealtimeChannel.unsubscribe(),this.groupSubscription&&this.groupSubscription.unsubscribe()}loadInitialData(){var t=this;return(0,l.Z)(function*(){try{t.error=!1,t.errorMembers=!1,t.loadMemebershipRequests=!0,t.loadingInitial=t.loadMemebershipRequests||t.loadMembers,t.errorMembershipRequests=!1,yield t.groupService.processGetAllMemberShipRequests(t.selectedGroupId)}catch(i){t.errorMembershipRequests=!0,t.error=t.errorMembershipRequests||t.errorMembers,t.errorMessage=i.message,t.messageService.add({severity:"error",summary:i.message})}finally{t.loadMemebershipRequests=!1,t.loadingInitial=t.loadMemebershipRequests||t.loadMembers}if(!t.errorMembershipRequests)try{t.error=!1,t.errorMembers=!1,t.loadMembers=!0,t.loadingInitial=t.loadMemebershipRequests||t.loadMembers,yield t.groupService.getAllMembers(t.selectedGroupId)}catch(i){t.errorMembers=!0,t.error=t.errorMembershipRequests||t.errorMembers,t.errorMessage=i.message,t.messageService.add({severity:"error",summary:i.message})}finally{t.loadMembers=!1,t.loadingInitial=t.loadMemebershipRequests||t.loadMembers}t.getAllMembersAndMembershipRequestsFromStore()})()}getAllMembersAndMembershipRequestsFromStore(){var t=this;return(0,l.Z)(function*(){t.groupSubscription=t.groupQuery.selectEntity(t.selectedGroupId).subscribe(i=>{i?.membership_requests&&(console.log("called requests"),console.log(i.membership_requests),t.membershipRequests=[],t.membershipRequests=i.membership_requests),i?.members&&(console.log("group mebers exist from observable"),t.members=[],t.members=i.members)})})()}getSelectedId(){this.route.paramMap.subscribe(t=>{this.selectedGroupId=String(t.get("id"))})}acceptMembershipRequest(t){var i=this;return(0,l.Z)(function*(){try{yield i.membershipService.confirmMembershipRequest(t.user_id,i.selectedGroupId,t.id),i.messageService.add({severity:"success",summary:"Du hast ein neues Mitglied aufgenommen."})}catch(s){i.messageService.add({severity:"error",summary:s.message})}})()}cancelMembershipRequest(t){var i=this;return(0,l.Z)(function*(){try{yield i.membershipService.removeMembershipRequestById(t.user_id,i.selectedGroupId,t.id),i.messageService.add({severity:"success",summary:"Anfrage entfernt."})}catch(s){i.messageService.add({severity:"error",summary:s.message})}})()}removeMember(t){var i=this;return(0,l.Z)(function*(){try{yield i.membershipService.removeMemberByMembershipId(t.id,t.user_id,i.selectedGroupId),i.messageService.add({severity:"success",summary:"Mitglied entfernt."})}catch(s){i.messageService.add({severity:"error",summary:s.message})}})()}}return r.\u0275fac=function(t){return new(t||r)(e.Y36(w.v),e.Y36(p.ez),e.Y36(m.gz),e.Y36(I.J),e.Y36(f.$))},r.\u0275cmp=e.Xpm({type:r,selectors:[["app-membership-group-management"]],features:[e._Bn([p.ez])],decls:5,vars:5,consts:[["styleClass","max-w-90","position","top-right"],[3,"noTopBar"],["slot","main"],[3,"error","loading","errorMessage","retryAction"],["class","mb-8",4,"ngIf"],[1,"mb-8"],[1,"mx-4"],["data-cy","backButton",3,"title","link"],[1,"mb-30"],[3,"paginationDataFirstTab","paginationDataSecondTab","dataFirstTab","titleFirstTab","noDataFirstTab","secondTabNeeded","acceptButtonNeededFirstTab","dataSecondTab","titleSecondTab","noDataSecondTab","removeItemFromFirstTab","acceptItemFromFirstTab","removeItemFromSecontTab"]],template:function(t,i){1&t&&(e._UZ(0,"p-toast",0),e.TgZ(1,"app-wrapper-grid",1)(2,"div",2)(3,"app-loading-spinner",3),e.NdJ("retryAction",function(){return i.loadInitialData()}),e.qZA(),e.YNc(4,ie,5,12,"div",4),e.qZA()()),2&t&&(e.xp6(1),e.Q6J("noTopBar",!0),e.xp6(2),e.Q6J("error",i.error)("loading",i.loadingInitial)("errorMessage",i.errorMessage),e.xp6(1),e.Q6J("ngIf",!i.loadingInitial&&!i.error))},dependencies:[c.O5,d.FN,v.V,F.W,Y.r,S.g]}),r})();var x=n(7427);let G=(()=>{class r{constructor(t,i){this.groupsService=t,this.router=i}canActivate(t){var i=this;return(0,l.Z)(function*(){const s=t.params.id;try{return yield i.groupsService.isLoggedInUserAdmin(s),!0}catch{return i.router.navigate(["/groups"]),!1}})()}}return r.\u0275fac=function(t){return new(t||r)(e.LFG(x.J),e.LFG(m.F0))},r.\u0275prov=e.Yz7({token:r,factory:r.\u0275fac,providedIn:"root"}),r})();var b=n(9028);function R(r){return[{label:"\xdcBERSICHT",routerLink:[`/groups/${r}`],routerLinkActiveOptions:{exact:!0},id:"overview-cy"}]}function E(r){return[{label:"\xdcBERSICHT",routerLink:[`/groups/${r}`],routerLinkActiveOptions:{exact:!0},id:"overview-cy"},{label:"\xc4NDERN",routerLink:[`/groups/${r}/edit`],routerLinkActiveOptions:{exact:!0},id:"edit-cy"}]}function q(r){return[{icon:"pi pi-fw pi-home",routerLink:[`/groups/${r}`],routerLinkActiveOptions:{exact:!0},id:"overview-cy"}]}function B(r){return[{icon:"pi pi-fw pi-home",routerLink:[`/groups/${r}`],routerLinkActiveOptions:{exact:!0},id:"overview-cy-mob"},{icon:"pi pi-fw pi-user-edit",routerLink:[`/groups/${r}/edit`],routerLinkActiveOptions:{exact:!0},id:"edit-cy-mob"}]}var oe=n(9751),ne=n(9338);function ae(r,o){if(1&r&&e._UZ(0,"p-avatar",28),2&r){const t=e.oxw(2);e.Q6J("image",t.group.avatar_url)}}function le(r,o){if(1&r){const t=e.EpF();e.TgZ(0,"form",8,9)(2,"h5"),e._uU(3,"Pers\xf6nliche Daten"),e.qZA(),e.TgZ(4,"div",10)(5,"div",11)(6,"span",12)(7,"textarea",13,14),e.NdJ("ngModelChange",function(s){e.CHM(t);const a=e.oxw();return e.KtG(a.group.description=s)}),e.qZA(),e.TgZ(9,"label",15),e._uU(10,"\xdcber mich"),e.qZA()()(),e.TgZ(11,"div")(12,"h5"),e._uU(13,"group Foto"),e.qZA(),e.YNc(14,ae,1,1,"p-avatar",16),e.TgZ(15,"p-fileUpload",17,18),e.NdJ("uploadHandler",function(s){e.CHM(t);const a=e.MAs(16),u=e.oxw();return e.KtG(u.updateGroupPhoto(s,a))}),e.qZA()()(),e.TgZ(17,"h5"),e._uU(18,"Kontaktm\xf6glichkeiten"),e.qZA(),e.TgZ(19,"div",10)(20,"div",19)(21,"span",12)(22,"input",20),e.NdJ("ngModelChange",function(s){e.CHM(t);const a=e.oxw();return e.KtG(a.group.contact_email=s)}),e.qZA(),e.TgZ(23,"label",15),e._uU(24,"Email"),e.qZA()()(),e.TgZ(25,"div",19)(26,"span",12)(27,"input",21),e.NdJ("ngModelChange",function(s){e.CHM(t);const a=e.oxw();return e.KtG(a.group.contact_phone=s)}),e.qZA(),e.TgZ(28,"label",15),e._uU(29,"Phone"),e.qZA()()()(),e.TgZ(30,"h5"),e._uU(31,"Adresse"),e.qZA(),e.TgZ(32,"div",10)(33,"div",19)(34,"span",12)(35,"input",22),e.NdJ("ngModelChange",function(s){e.CHM(t);const a=e.oxw();return e.KtG(a.group.street=s)}),e.qZA(),e.TgZ(36,"label",15),e._uU(37,"Street"),e.qZA()()(),e.TgZ(38,"div",19)(39,"span",12)(40,"input",23),e.NdJ("ngModelChange",function(s){e.CHM(t);const a=e.oxw();return e.KtG(a.group.post_code=s)}),e.qZA(),e.TgZ(41,"label",15),e._uU(42,"Post Code"),e.qZA()()(),e.TgZ(43,"div",19)(44,"span",12)(45,"input",24),e.NdJ("ngModelChange",function(s){e.CHM(t);const a=e.oxw();return e.KtG(a.group.city=s)}),e.qZA(),e.TgZ(46,"label",15),e._uU(47,"City"),e.qZA()()()(),e.TgZ(48,"div",25)(49,"div",26)(50,"button",27),e.NdJ("click",function(){e.CHM(t);const s=e.oxw();return e.KtG(s.updateGroup(s.group))}),e.qZA()()()()}if(2&r){const t=e.oxw();e.xp6(7),e.Q6J("autoResize",!0)("ngModel",t.group.description),e.xp6(7),e.Q6J("ngIf",t.group.avatar_url),e.xp6(1),e.Q6J("auto",!0)("customUpload",!0),e.xp6(7),e.Q6J("ngModel",t.group.contact_email),e.xp6(5),e.Q6J("ngModel",t.group.contact_phone),e.xp6(8),e.Q6J("ngModel",t.group.street),e.xp6(5),e.Q6J("ngModel",t.group.post_code),e.xp6(5),e.Q6J("ngModel",t.group.city),e.xp6(5),e.s9C("label",t.loading?"Loading ...":"Update"),e.Q6J("disabled",t.loading)}}let ue=(()=>{class r{constructor(t,i,s,a,u){this.route=t,this.groupsService=i,this.groupQuery=s,this.messageService=a,this.storageService=u,this.menuItems=[],this.menuItemsMega=[],this.selectedGroupId="",this.backLink="",this.loading=!1,this.uploading=!1,this.group$=new oe.y}ngOnInit(){this.getSelectedId(),this.selectedGroupId&&(this.menuItemsMega=q(this.selectedGroupId),this.menuItems=R(this.selectedGroupId),this.backLink=`/groups/${this.selectedGroupId}/edit`),this.selectedGroupId&&(this.groupCoreSubscription=this.groupQuery.selectEntity(this.selectedGroupId).subscribe(t=>{t?this.group={id:t.id,created_at:t.created_at,name:t.name,description:t.description,creator:t.creator,level:t.level,street:t.street,post_code:t.post_code,city:t.city,contact_phone:t.contact_phone,avatar_url:t.avatar_url,contact_email:t.contact_email,updated_at:t.updated_at}:this.selectedGroupId&&this.groupsService.findGroup(this.selectedGroupId),this.selectedGroupId&&(this.groupCoreRealtimeChannel=this.groupsService.getRealTimeChanges(this.selectedGroupId))})),this.group={...this.group}}ngOnDestroy(){this.groupCoreSubscription&&this.groupCoreSubscription.unsubscribe(),this.groupCoreRealtimeChannel&&this.groupCoreRealtimeChannel.unsubscribe()}getSelectedId(){this.route.paramMap.subscribe(t=>{this.selectedGroupId=String(t.get("id"))})}updateGroup(t,i){var s=this;return(0,l.Z)(function*(){try{s.loading=!0,yield s.groupsService.updateGroup(t,i),s.messageService.add({severity:"success",summary:"Update erfolgreich."})}catch(a){s.messageService.add({severity:"error",summary:a.message})}finally{s.loading=!1}})()}updateGroupPhoto(t,i){var s=this;return(0,l.Z)(function*(){if(s.group)try{s.uploading=!0;const a=s.storageService.createFilePath(t);let u="";try{const h=s.group.avatar_url||void 0,_="avatars";u=yield s.storageService.uploadImg(a,_),yield s.updateGroup({avatar_url:u},s.selectedGroupId),h&&(yield s.storageService.deleteImg(h,_)),s.group.avatar_url=u,s.messageService.add({severity:"success",summary:"Upload des Avatars war erfolgreich."})}catch(h){try{yield s.storageService.deleteImg(u,"avatars"),s.messageService.add({severity:"error",summary:h})}catch{s.messageService.add({severity:"error",summary:h})}}i.clear()}catch(a){s.messageService.add({severity:"error",summary:a.message})}finally{s.uploading=!1}})()}}return r.\u0275fac=function(t){return new(t||r)(e.Y36(m.gz),e.Y36(I.J),e.Y36(f.$),e.Y36(p.ez),e.Y36(ne.V))},r.\u0275cmp=e.Xpm({type:r,selectors:[["app-edit-group"]],features:[e._Bn([p.ez])],decls:9,vars:4,consts:[["styleClass","max-w-90","position","top-right"],[3,"noTopBar"],["slot","main"],[1,"mb-8"],[1,"mx-4"],["data-cy","backButton",3,"title","link"],["class","mt-4",4,"ngIf"],["slot","side"],[1,"mt-4"],["editGroupForm","ngForm"],[1,"grid"],[1,"col-12"],[1,"p-float-label"],["name","description","pInputTextarea","","data-cy","about",1,"w-full",3,"autoResize","ngModel","ngModelChange"],["about",""],["for","float-input"],[3,"image",4,"ngIf"],["name","myfile[]","accept","image/*","data-cy","",1,"full-w",3,"auto","customUpload","uploadHandler"],["fileUploader",""],[1,"col-12","md:col-6"],["type","email","name","contact_email","pInputText","","data-cy","contactEmail",1,"w-full",3,"ngModel","ngModelChange"],["type","text","pInputText","","name","contact_phone","data-cy","contactPhone",1,"w-full",3,"ngModel","ngModelChange"],["type","text","pInputText","","name","street","data-cy","street",1,"w-full",3,"ngModel","ngModelChange"],["type","text","pInputText","","name","post_code","data-cy","postCode",1,"w-full",3,"ngModel","ngModelChange"],["type","text","pInputText","","name","city","data-cy","city",1,"w-full",3,"ngModel","ngModelChange"],[1,"flex","flex-column"],[1,"flex","align-items-center","justify-content-center"],["pButton","","type","button","data-cy","updateGroupInformationButton",3,"label","disabled","click"],[3,"image"]],template:function(t,i){1&t&&(e.TgZ(0,"p-toast",0),e._uU(1,">"),e.qZA(),e.TgZ(2,"app-wrapper-grid",1)(3,"div",2)(4,"div",3)(5,"div",4),e._UZ(6,"app-back-button",5),e.YNc(7,le,51,12,"form",6),e.qZA()()(),e._UZ(8,"div",7),e.qZA()),2&t&&(e.xp6(2),e.Q6J("noTopBar",!0),e.xp6(4),e.Q6J("title","Zur\xfcck")("link",i.backLink),e.xp6(1),e.Q6J("ngIf",i.group&&void 0!==i.group))},dependencies:[c.O5,g._Y,g.Fj,g.JJ,g.JL,g.On,g.F,y.Hq,d.FN,J.o,k.g,Q.q,D.p,v.V,F.W]}),r})();var z=n(4479),$=n(4524),pe=n(6355),ce=n(3078);let de=(()=>{class r{constructor(t,i){this.route=t,this.groupsQuery=i,this.menuItemsSpecial=[],this.menuItemsStandart=[],this.menuItemsMegaSpecial=[],this.menuItemsMegaStandart=[],this.selectedGroupId="",this.editOverviewLink="",this.editFollowerLink="",this.editMembersLink=""}ngOnInit(){this.getSelectedId(),this.selectedGroupId&&(this.menuItemsSpecial=E(this.selectedGroupId),this.menuItemsStandart=R(this.selectedGroupId),this.menuItemsMegaSpecial=B(this.selectedGroupId),this.menuItemsMegaStandart=q(this.selectedGroupId),this.editOverviewLink=`/groups/${this.selectedGroupId}/edit-overview`,this.editFollowerLink=`/groups/${this.selectedGroupId}/edit-follower`,this.editMembersLink=`/groups/${this.selectedGroupId}/edit-members`,this.uiSubscription=this.groupsQuery.selectUI$(this.selectedGroupId).subscribe(t=>{t&&(this.groupUI=t)}))}ngOnDestroy(){this.uiSubscription&&this.uiSubscription.unsubscribe()}getSelectedId(){this.route.paramMap.subscribe(t=>{this.selectedGroupId=String(t.get("id"))})}}return r.\u0275fac=function(t){return new(t||r)(e.Y36(m.gz),e.Y36(f.$))},r.\u0275cmp=e.Xpm({type:r,selectors:[["app-edit"]],decls:11,vars:13,consts:[[3,"megaMenuItemSpecial","megaMenuItemStandart","specialOrStandart"],["slot","main"],[1,"mb-8"],[1,"mx-4"],[3,"headline"],["data-cy","group-edit",3,"title","link"],["data-cy","follower-edit",3,"title","link"],["data-cy","members-edit",3,"title","link"],["slot","side"],[3,"menuItemsSpecial","menuItemsStandart","specialOrStandart"]],template:function(t,i){1&t&&(e._UZ(0,"app-menu-bar-secondary-top",0),e.TgZ(1,"app-wrapper-grid")(2,"div",1)(3,"div",2)(4,"div",3),e._UZ(5,"app-headline-of-list",4)(6,"app-list-element",5)(7,"app-list-element",6)(8,"app-list-element",7),e.qZA()()(),e.TgZ(9,"div",8),e._UZ(10,"app-menu-bar-secondary-right",9),e.qZA()()),2&t&&(e.Q6J("megaMenuItemSpecial",i.menuItemsMegaSpecial)("megaMenuItemStandart",i.menuItemsMegaStandart)("specialOrStandart",i.groupUI.isAdmin),e.xp6(5),e.Q6J("headline","INHALTE"),e.xp6(1),e.Q6J("title","\xdcbersicht bearbeiten")("link",i.editOverviewLink),e.xp6(1),e.Q6J("title","Follower-Management")("link",i.editFollowerLink),e.xp6(1),e.Q6J("title","Mitglieder-Management")("link",i.editMembersLink),e.xp6(2),e.Q6J("menuItemsSpecial",i.menuItemsSpecial)("menuItemsStandart",i.menuItemsStandart)("specialOrStandart",i.groupUI.isAdmin))},dependencies:[z.e,$.U,v.V,pe.g,ce.d]}),r})();function me(r,o){if(1&r&&(e.TgZ(0,"div",17),e._uU(1),e.qZA()),2&r){const t=e.oxw().$implicit;e.xp6(1),e.Oqu(t.name)}}const T=function(r){return["/groups",r]};function ge(r,o){1&r&&(e.TgZ(0,"a",14)(1,"p-messages",15),e.YNc(2,me,2,1,"ng-template",16),e.qZA()()),2&r&&e.Q6J("routerLink",e.VKq(1,T,o.$implicit.id))}function he(r,o){1&r&&(e.TgZ(0,"p"),e._uU(1,"Du bist in noch keinen lokalen Gruppen"),e.qZA())}function fe(r,o){if(1&r&&(e.TgZ(0,"div",17),e._uU(1),e.qZA()),2&r){const t=e.oxw().$implicit;e.xp6(1),e.Oqu(t.name)}}function ve(r,o){1&r&&(e.TgZ(0,"a",14)(1,"p-messages",15),e.YNc(2,fe,2,1,"ng-template",16),e.qZA()()),2&r&&e.Q6J("routerLink",e.VKq(1,T,o.$implicit.id))}function be(r,o){1&r&&(e.TgZ(0,"p"),e._uU(1,"Du bist in noch keinen regionalen Gruppen"),e.qZA())}function ye(r,o){if(1&r&&(e.TgZ(0,"div",17),e._uU(1),e.qZA()),2&r){const t=e.oxw().$implicit;e.xp6(1),e.Oqu(t.name)}}function Ie(r,o){1&r&&(e.TgZ(0,"a",14)(1,"p-messages",15),e.YNc(2,ye,2,1,"ng-template",16),e.qZA()()),2&r&&e.Q6J("routerLink",e.VKq(1,T,o.$implicit.id))}function _e(r,o){1&r&&(e.TgZ(0,"p"),e._uU(1,"Du bist in noch keinen Gruppen des Bundes"),e.qZA())}function Me(r,o){if(1&r&&(e.TgZ(0,"div",17),e._uU(1),e.qZA()),2&r){const t=e.oxw().$implicit;e.xp6(1),e.Oqu(t.name)}}function Se(r,o){1&r&&(e.TgZ(0,"a",14)(1,"p-messages",15),e.YNc(2,Me,2,1,"ng-template",16),e.qZA()()),2&r&&e.Q6J("routerLink",e.VKq(1,T,o.$implicit.id))}function Ge(r,o){1&r&&(e.TgZ(0,"p"),e._uU(1,"Du bist in noch keinen internationalen Gruppen"),e.qZA())}function Te(r,o){if(1&r&&(e.TgZ(0,"div",6)(1,"div",7)(2,"div",8),e._UZ(3,"i",9),e.TgZ(4,"h4",10),e._uU(5,"LOKALE"),e.qZA()(),e.YNc(6,ge,3,3,"a",11),e.YNc(7,he,2,0,"p",12),e.TgZ(8,"div",8),e._UZ(9,"i",9),e.TgZ(10,"h4",13),e._uU(11,"REGIONALE"),e.qZA()(),e.YNc(12,ve,3,3,"a",11),e.YNc(13,be,2,0,"p",12),e.TgZ(14,"div",8),e._UZ(15,"i",9),e.TgZ(16,"h4",13),e._uU(17,"BUND"),e.qZA()(),e.YNc(18,Ie,3,3,"a",11),e.YNc(19,_e,2,0,"p",12),e.TgZ(20,"div",8),e._UZ(21,"i",9),e.TgZ(22,"h4",13),e._uU(23,"INTERNATIONAL"),e.qZA()(),e.YNc(24,Se,3,3,"a",11),e.YNc(25,Ge,2,0,"p",12),e.qZA()()),2&r){const t=e.oxw();e.xp6(6),e.Q6J("ngForOf",t.localGroupList),e.xp6(1),e.Q6J("ngIf",0===t.localGroupList.length),e.xp6(5),e.Q6J("ngForOf",t.regionalGroupList),e.xp6(1),e.Q6J("ngIf",0===t.regionalGroupList.length),e.xp6(5),e.Q6J("ngForOf",t.federalGroupList),e.xp6(1),e.Q6J("ngIf",0===t.federalGroupList.length),e.xp6(5),e.Q6J("ngForOf",t.internationalGroupList),e.xp6(1),e.Q6J("ngIf",0===t.internationalGroupList.length)}}let Ce=(()=>{class r{constructor(t,i){this.groupsService=t,this.messageService=i,this.localGroupList=[],this.regionalGroupList=[],this.federalGroupList=[],this.internationalGroupList=[],this.loading=!1,this.error=!1}ngOnInit(){this.getAllGroups()}getAllGroups(){var t=this;return(0,l.Z)(function*(){try{t.error=!1,t.loading=!0,(yield t.groupsService.getAllGroupsOfId()).data.forEach(s=>{let a={id:s.group_id,name:s.groups.name,level:s.groups.level,creator:s.groups.creator,description:s.groups.description,street:"",post_code:"",city:"",contact_phone:"",contact_email:"",avatar_url:""};switch(a.level){case"local":t.localGroupList.push(a);break;case"regional":t.regionalGroupList.push(a);break;case"federal":t.federalGroupList.push(a);break;case"international":t.internationalGroupList.push(a)}})}catch(i){t.messageService.add({severity:"error",summary:i.message}),t.error=!0,t.errorMessage=i.message}finally{t.loading=!1}})()}}return r.\u0275fac=function(t){return new(t||r)(e.Y36(x.J),e.Y36(p.ez))},r.\u0275cmp=e.Xpm({type:r,selectors:[["app-my-groups-list"]],features:[e._Bn([p.ez])],decls:7,vars:5,consts:[["styleClass","max-w-90","position","top-right"],[3,"noTopBar"],["slot","main"],[3,"error","errorMessage","loading","retryAction"],["class","mb-8",4,"ngIf"],["slot","side"],[1,"mb-8"],[1,"mx-4"],[1,"flex","flex-row"],[1,"pi","pi-angle-down","align-items-center","flex","justify-content-center","mr-4","on-dark-surface-in-dark-theme"],[1,"onSurface","flex","align-items-center","justify-content-center"],[3,"routerLink",4,"ngFor","ngForOf"],[4,"ngIf"],[1,"flex","align-items-center","justify-content-center"],[3,"routerLink"],["severity","custom"],["pTemplate",""],[1,"ml-2"]],template:function(t,i){1&t&&(e.TgZ(0,"p-toast",0),e._uU(1,">"),e.qZA(),e.TgZ(2,"app-wrapper-grid",1)(3,"div",2)(4,"app-loading-spinner",3),e.NdJ("retryAction",function(){return i.getAllGroups()}),e.qZA(),e.YNc(5,Te,26,8,"div",4),e.qZA(),e._UZ(6,"div",5),e.qZA()),2&t&&(e.xp6(2),e.Q6J("noTopBar",!0),e.xp6(2),e.Q6J("error",i.error)("errorMessage",i.errorMessage)("loading",i.loading),e.xp6(1),e.Q6J("ngIf",!i.loading&&!i.error))},dependencies:[c.sg,c.O5,m.yS,d.FN,p.jx,U.V,v.V,S.g],styles:["a[_ngcontent-%COMP%]{text-decoration:none;color:#000}app-menu-bar-left[_ngcontent-%COMP%]{display:none}"]}),r})();var Ze=n(6923);let Ae=(()=>{class r{constructor(t,i,s,a,u){this.messageService=t,this.membershipService=i,this.authentificationQuery=s,this.groupsQuery=a,this.groupsService=u,this.selectedGroupId=""}ngOnInit(){this.stillMemberRealtimeChannel=this.membershipService.getRealTimeChangesIfStillMembershipRequested(this.selectedGroupId),this.stillMemberRealtimeChannel=this.membershipService.getRealTimeChangesIfStillMember(this.selectedGroupId),this.checkIfMembershipAlreadyRequested(),this.checkIfAlreadyMember(),this.groupSubscription=this.groupsQuery.selectUI$(this.selectedGroupId).subscribe(t=>{t&&(this.groupUI=t)})}ngOnDestroy(){this.authSubscription&&this.authSubscription.unsubscribe(),this.groupSubscription&&this.groupSubscription.unsubscribe(),this.stillMemberRealtimeChannel&&this.stillMemberRealtimeChannel.unsubscribe(),this.stillMembershipRequestedRealtimeChannel&&this.stillMembershipRequestedRealtimeChannel.unsubscribe()}checkIfMembershipAlreadyRequested(){this.selectedGroupId&&this.membershipService.membershipAlreadyRequested(this.selectedGroupId).then(t=>{this.groupsService.updateMembershipRequested(this.selectedGroupId,void 0!==t.data[0])}).catch()}checkIfAlreadyMember(){this.selectedGroupId&&this.membershipService.alreadyMember(this.selectedGroupId).then(t=>{this.groupsService.updateIsMember(this.selectedGroupId,void 0!==t.data[0])}).catch()}requestMembershipOrLeaveGroup(){this.groupUI.isMember?this.leaveGroup():this.groupUI.requestedMembership?this.cancelRequestMembership():this.requestMembership()}requestMembership(){var t=this;return(0,l.Z)(function*(){try{yield t.membershipService.requestMembership(t.selectedGroupId),t.groupsService.updateMembershipRequested(t.selectedGroupId,!0),t.messageService.add({severity:"success",summary:"Beitrittansfrage verschickt."})}catch(i){t.messageService.add({severity:"error",summary:i.message})}})()}cancelRequestMembership(){var t=this;return(0,l.Z)(function*(){try{yield t.membershipService.cancelMembershipRequest(t.selectedGroupId),t.groupsService.updateMembershipRequested(t.selectedGroupId,!1),t.messageService.add({severity:"success",summary:"Beitrittansfrage zur\xfcckgezogen."})}catch(i){t.messageService.add({severity:"error",summary:i.message})}})()}leaveGroup(){var t=this;return(0,l.Z)(function*(){let i="";t.authSubscription=t.authentificationQuery.uuid$.subscribe(s=>{i=s});try{i&&(yield t.membershipService.removeMember(i,t.selectedGroupId),t.messageService.add({severity:"success",summary:"Erfolgreich ausgetreten."}))}catch(s){t.messageService.add({severity:"error",summary:s})}})()}}return r.\u0275fac=function(t){return new(t||r)(e.Y36(p.ez),e.Y36(w.v),e.Y36(Ze.c),e.Y36(f.$),e.Y36(I.J))},r.\u0275cmp=e.Xpm({type:r,selectors:[["app-request-membership"]],inputs:{selectedGroupId:"selectedGroupId"},features:[e._Bn([p.ez])],decls:2,vars:1,consts:[["styleClass","max-w-90","position","top-right"],["data-cy","requestedMembershipButton","pButton","","type","button",3,"label","click"]],template:function(t,i){1&t&&(e._UZ(0,"p-toast",0),e.TgZ(1,"button",1),e.NdJ("click",function(){return i.requestMembershipOrLeaveGroup()}),e.qZA()),2&t&&(e.xp6(1),e.s9C("label",i.groupUI.isMember?"Austreten":i.groupUI.requestedMembership?"Anfrage zur\xfcckziehen":"Mitgliedschaft anfragen"))},dependencies:[y.Hq,d.FN]}),r})();var Fe=n(2606),we=n(1061),xe=n(1669);const Re=function(r,o,t){return{title:r,subtitle:o,imgUrl:t}};function qe(r,o){if(1&r&&e._UZ(0,"app-wiki-header",14),2&r){const t=e.oxw(2);e.Q6J("wikiHeader",e.kEZ(1,Re,t.group.name,t.group.level,t.group.avatar_url))}}function Le(r,o){if(1&r&&e._UZ(0,"app-request-membership",18),2&r){const t=e.oxw(3);e.Q6J("selectedGroupId",t.selectedGroupId)}}function Je(r,o){if(1&r){const t=e.EpF();e.TgZ(0,"div",15)(1,"button",16),e.NdJ("click",function(){e.CHM(t);const s=e.oxw(2);return e.KtG(s.followOrUnfollowGroup())}),e.qZA(),e.YNc(2,Le,1,1,"app-request-membership",17),e.qZA()}if(2&r){const t=e.oxw(2);e.xp6(1),e.s9C("label",t.groupUI.isFollowing?"Unfollow":"Follow"),e.xp6(1),e.Q6J("ngIf",t.selectedGroupId)}}const Ue=function(r){return{name:"Mitglieder",number:r}},ke=function(r){return{name:"Anr\xe4ge",number:r}},Qe=function(r){return{name:"Follower",number:r}},De=function(r){return{name:"Veranstaltungen",number:r}},Oe=function(r,o,t,i){return[r,o,t,i]};function Ne(r,o){if(1&r&&e._UZ(0,"app-key-figures",19),2&r){const t=e.oxw(2);e.Q6J("keyFigureList",e.l5B(9,Oe,e.VKq(1,Ue,t.group.member_counter),e.VKq(3,ke,t.group.amendment_counter),e.VKq(5,Qe,t.group.follower_counter),e.VKq(7,De,t.group.events_counter)))}}const Ye=function(r,o,t,i,s,a){return{about:r,contact_email:o,contact_phone:t,street:i,post_code:s,city:a}};function Ee(r,o){if(1&r&&e._UZ(0,"app-about-and-contact",20),2&r){const t=e.oxw(2);e.Q6J("contactData",e.HTZ(1,Ye,t.group.description,t.group.contact_email,t.group.contact_phone,t.group.street,t.group.post_code,t.group.city))}}function Be(r,o){if(1&r&&(e.TgZ(0,"div",7),e.YNc(1,qe,1,5,"app-wiki-header",8),e.TgZ(2,"div",9),e.YNc(3,Je,3,2,"div",10),e.qZA(),e.YNc(4,Ne,1,14,"app-key-figures",11),e.TgZ(5,"div",12),e.YNc(6,Ee,1,8,"app-about-and-contact",13),e.qZA()()),2&r){const t=e.oxw();e.xp6(1),e.Q6J("ngIf",t.group),e.xp6(2),e.Q6J("ngIf",t.groupUI),e.xp6(1),e.Q6J("ngIf",t.group),e.xp6(2),e.Q6J("ngIf",t.group)}}const $e=[{path:"",component:Ce,canActivate:[b.u]},{path:":id",component:(()=>{class r{constructor(t,i,s,a,u,h,_){this.route=t,this.groupsService=i,this.groupsServiceState=s,this.messageService=a,this.followingGroupsService=u,this.membershipService=h,this.groupsQuery=_,this.menuItemsSpecial=[],this.menuItemsStandart=[],this.menuItemsMegaSpecial=[],this.menuItemsMegaStandart=[],this.selectedGroupId=void 0,this.groupUI={isAdmin:!1,isFollowing:!1,isMember:!1,requestedMembership:!1},this.loadsFollow=!1,this.loadsMembership=!1,this.loadingInitial=!1,this.loading=!1,this.error=!1,this.getSelectedId(),this.selectedGroupId&&this.groupsService.isLoggedInUserAdmin(this.selectedGroupId).then(M=>{M.data.is_admin&&this.groupsServiceState.updateIsAdmin(this.selectedGroupId,!0)}),this.selectedGroupId&&(this.uiSubscription=this.groupsQuery.selectUI$(this.selectedGroupId).subscribe(M=>{M&&(console.log("ui",M),this.groupUI=M)}))}ngOnInit(){this.selectedGroupId&&(this.checkIfLoggedInUserIsAdmin(this.selectedGroupId),this.checkIfAlreadyFollower()),this.loadInitialData(),this.selectedGroupId&&(this.menuItemsSpecial=E(this.selectedGroupId),this.menuItemsStandart=R(this.selectedGroupId),this.menuItemsMegaSpecial=B(this.selectedGroupId),this.menuItemsMegaStandart=q(this.selectedGroupId))}ngOnDestroy(){this.groupSubscription&&this.groupSubscription.unsubscribe(),this.groupRealTimeSubscription&&this.groupRealTimeSubscription.unsubscribe(),this.getRealTimeSubscriptionIsAdmin&&this.getRealTimeSubscriptionIsAdmin.unsubscribe(),this.getRealTimeSubscriptionIsFollower&&this.getRealTimeSubscriptionIsFollower.unsubscribe(),this.uiSubscription&&this.uiSubscription.unsubscribe(),this.realTimeSubscriptionFollowers&&this.realTimeSubscriptionFollowers.unsubscribe(),this.groupsCountersRealTimeSubscription&&this.groupsCountersRealTimeSubscription.unsubscribe()}loadInitialData(){var t=this;return(0,l.Z)(function*(){if(t.error=!1,t.loadingInitial=!0,t.selectedGroupId)try{yield t.groupsServiceState.findGroup(t.selectedGroupId),t.groupSubscription=t.groupsQuery.selectEntity(t.selectedGroupId).subscribe(i=>{i&&(t.group=i)}),t.groupRealTimeSubscription=t.groupsServiceState.getRealTimeChanges(t.selectedGroupId),t.groupsCountersRealTimeSubscription=t.groupsServiceState.getRealTimeChangesGroupsCounters(t.selectedGroupId),t.getRealTimeSubscriptionIsAdmin=t.followingGroupsService.getRealTimeChangesIfStillFollower(t.selectedGroupId),t.getRealTimeSubscriptionIsFollower=t.membershipService.getRealTimeChangesIfStillAdmin(t.selectedGroupId),t.realTimeSubscriptionFollowers=t.groupsServiceState.getRealTimeChangesFollowers(t.selectedGroupId)}catch(i){t.error=!0,t.errorMessage=i.message,t.messageService.add({severity:"error",summary:i.message})}finally{t.loadingInitial=!1}})()}getSelectedId(){this.route.paramMap.subscribe(t=>{this.selectedGroupId=String(t.get("id"))})}checkIfLoggedInUserIsAdmin(t){var i=this;return(0,l.Z)(function*(){try{i.error=!1,i.loading=!0,yield i.groupsService.isLoggedInUserAdmin(t),i.groupsServiceState.updateIsAdmin(t,!0)}catch{i.groupsServiceState.updateIsAdmin(t,!1)}finally{i.loading=!1}})()}checkIfAlreadyFollower(){var t=this;return(0,l.Z)(function*(){try{t.selectedGroupId&&(t.error=!1,t.loading=!0,yield t.followingGroupsService.isAlreadyFollower(t.selectedGroupId),t.selectedGroupId&&t.groupsServiceState.updateIsFollowing(t.selectedGroupId,!0))}catch{t.selectedGroupId&&t.groupsServiceState.updateIsFollowing(t.selectedGroupId,!1)}finally{t.loading=!1}})()}followOrUnfollowGroup(){var t=this;return(0,l.Z)(function*(){if(t.selectedGroupId)if(t.groupUI?.isFollowing)try{t.loadsFollow=!0,yield t.followingGroupsService.unfollowTransaction(t.selectedGroupId),t.selectedGroupId&&(t.groupsServiceState.updateIsFollowing(t.selectedGroupId,!1),t.messageService.add({severity:"success",summary:"Eine Ideenquelle weniger."}))}catch(i){t.messageService.add({severity:"error",summary:i})}finally{t.loadsFollow=!1}else try{t.loadsFollow=!0,yield t.followingGroupsService.followTransaction(t.selectedGroupId),t.selectedGroupId&&(t.groupsServiceState.updateIsFollowing(t.selectedGroupId,!0),t.messageService.add({severity:"success",summary:"Du folgst einer neuen Inspirationsquelle."}))}catch(i){t.messageService.add({severity:"error",summary:i.message})}finally{t.loadsFollow=!1}})()}}return r.\u0275fac=function(t){return new(t||r)(e.Y36(m.gz),e.Y36(x.J),e.Y36(I.J),e.Y36(p.ez),e.Y36(N.s),e.Y36(w.v),e.Y36(f.$))},r.\u0275cmp=e.Xpm({type:r,selectors:[["app-wiki"]],features:[e._Bn([p.ez])],decls:9,vars:10,consts:[["styleClass","max-w-90","position","top-right"],[3,"megaMenuItemSpecial","megaMenuItemStandart","specialOrStandart"],["slot","main"],[3,"error","loading","errorMessage","retryAction"],["class","mb-8",4,"ngIf"],["slot","side"],[3,"menuItemsSpecial","menuItemsStandart","specialOrStandart"],[1,"mb-8"],[3,"wikiHeader",4,"ngIf"],[1,"flex","flex-column"],["class","flex align-items-center justify-content-center",4,"ngIf"],[3,"keyFigureList",4,"ngIf"],[1,"mb-30"],[3,"contactData",4,"ngIf"],[3,"wikiHeader"],[1,"flex","align-items-center","justify-content-center"],["pButton","","type","button","data-cy","followButton",3,"label","click"],[3,"selectedGroupId",4,"ngIf"],[3,"selectedGroupId"],[3,"keyFigureList"],[3,"contactData"]],template:function(t,i){1&t&&(e.TgZ(0,"p-toast",0),e._uU(1,">"),e.qZA(),e._UZ(2,"app-menu-bar-secondary-top",1),e.TgZ(3,"app-wrapper-grid")(4,"div",2)(5,"app-loading-spinner",3),e.NdJ("retryAction",function(){return i.loadInitialData()}),e.qZA(),e.YNc(6,Be,7,4,"div",4),e.qZA(),e.TgZ(7,"div",5),e._UZ(8,"app-menu-bar-secondary-right",6),e.qZA()()),2&t&&(e.xp6(2),e.Q6J("megaMenuItemSpecial",i.menuItemsMegaSpecial)("megaMenuItemStandart",i.menuItemsMegaStandart)("specialOrStandart",i.groupUI.isAdmin),e.xp6(3),e.Q6J("error",i.error)("loading",i.loadingInitial)("errorMessage",i.errorMessage),e.xp6(1),e.Q6J("ngIf",!i.loadingInitial&&!i.loading&&!i.error),e.xp6(2),e.Q6J("menuItemsSpecial",i.menuItemsSpecial)("menuItemsStandart",i.menuItemsStandart)("specialOrStandart",i.groupUI.isAdmin))},dependencies:[c.O5,y.Hq,d.FN,Ae,z.e,$.U,v.V,Fe.F,we.T,xe.Z,S.g]}),r})(),canActivate:[b.u]},{path:":id/edit",component:de,canActivate:[b.u,G]},{path:":id/edit-overview",component:ue,canActivate:[b.u,G]},{path:":id/edit-follower",component:re,canActivate:[b.u,G]},{path:":id/edit-members",component:se,canActivate:[b.u,G]}];let He=(()=>{class r{}return r.\u0275fac=function(t){return new(t||r)},r.\u0275mod=e.oAB({type:r}),r.\u0275inj=e.cJS({imports:[m.Bz.forChild($e),m.Bz]}),r})();var Ke=n(529),Ve=n(5604),je=n(3943),Pe=n(2942),We=n(2263),Xe=n(4747),et=n(4384),tt=n(5021);let rt=(()=>{class r{}return r.\u0275fac=function(t){return new(t||r)},r.\u0275mod=e.oAB({type:r}),r.\u0275inj=e.cJS({imports:[c.ez,g.u5,g.UX,m.Bz,y.hJ,d.EV,J.j,H.LU,U.$,K.O,V.l,k.A,Q.F,P,D.O,W,j.W,Ve.Q,je.q,ee,He,C.x,Z.n,Pe.N,We.q,Xe.y,et.I,tt.C,Ke.JF,A.z]}),r})()}}]);