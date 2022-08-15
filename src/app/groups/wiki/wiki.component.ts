import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MegaMenuItem, MenuItem, MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import { FollowingGroupsService } from 'src/app/following-groups-system/services/following-groups.service';
import { Group } from '../../UI-dialogs/create-group/create-group.component';
import { groupsMenuitemsParameter, groupsMenuitemsMegaParameter, groupsMenuitemsMegaParameterLoggedIn, groupsMenuitemsParameterLoggedIn } from '../state/groupMenuItems';
import { GroupsService } from '../services/groups.service';
import { GroupsQuery } from '../state/groups.query';
import { GroupsService as GroupsServiceState } from '../state/groups.service';
import { GroupUI } from '../state/groups.store';
import { MembershipService } from 'src/app/membership-group-system/services/membership.service';
@Component({
  selector: 'app-wiki',
  templateUrl: './wiki.component.html',
  styleUrls: ['./wiki.component.scss'],
  providers: [MessageService]
})
export class WikiComponent implements OnInit {
  menuItemsSpecial: MenuItem[] = [];
  menuItemsStandart: MenuItem[] = [];
  menuItemsMegaSpecial: MegaMenuItem[] = [];
  menuItemsMegaStandart: MegaMenuItem[] = [];


  selectedGroupId: string | undefined = undefined;
  group$ = new Observable<Group | undefined>();
  groupUI$ = new Observable<GroupUI | undefined>();
  groupUI!: GroupUI;

  constructor(
    private route: ActivatedRoute,
    private groupsService: GroupsService,
    private groupsServiceState: GroupsServiceState,
    private messageService: MessageService,
    private followingGroupsService: FollowingGroupsService,
    private membershipService: MembershipService,
    private groupsQuery: GroupsQuery
  ) { }

  ngOnInit(): void {
    this.getSelectedId();
    if(this.selectedGroupId) {
      this.checkIfLoggedInUserIsAdmin(this.selectedGroupId);
      this.getGroupById(this.selectedGroupId);
      this.checkIfAlreadyFollower(this.selectedGroupId);
      this.groupsServiceState.getRealTimeChanges(this.selectedGroupId);
      this.followingGroupsService.getRealTimeChangesIfStillFollower(this.selectedGroupId);
      this.membershipService.getRealTimeChangesIfStillAdmin(this.selectedGroupId);
    }

    if (this.selectedGroupId) {
      this.menuItemsSpecial = groupsMenuitemsParameterLoggedIn(this.selectedGroupId);
      this.menuItemsStandart = groupsMenuitemsParameter(this.selectedGroupId);
      this.menuItemsMegaSpecial = groupsMenuitemsMegaParameterLoggedIn(this.selectedGroupId);
      this.menuItemsMegaStandart = groupsMenuitemsMegaParameter(this.selectedGroupId);

/*       console.log('US Store test')
      const test =  {isMember: true};
      console.log('set data')
      this.groupsServiceState.updateIsMember(this.selectedGroupId, true);
      this.groupsServiceState.updateIsAdmin(this.selectedGroupId, true);
      this.groupsServiceState.updateIsFollowing(this.selectedGroupId, true);
      this.groupsServiceState.updateRequestedMembership(this.selectedGroupId, true); */

/*       this.groupsQuery.selectIsMember$.subscribe(isMember => {
        console.log('found ui is member')
        console.log(isMember);
      }) */
      //this.groupsQuery.ui.selectEntity(this.selectedGroupId).subscribe(ui => {
      this.groupUI$ = this.groupsQuery.selectUI$(this.selectedGroupId);
      this.groupsQuery.selectUI$(this.selectedGroupId).subscribe((ui: GroupUI | undefined) => {
        console.log(ui)
        console.log('query is following test')
        console.log(ui?.isFollowing)
        if (ui) {
          this.groupUI = ui;
        }
      })
      if(this.selectedGroupId && this.groupUI) {
        // this.displayAdminMenu(this.selectedGroupId, this.groupUI.isAdmin);
      }
      // this.groupsQuery.selectEntity(this.selectedGroupId).subscribe(is)
    }
  }

  getSelectedId(): void {
    this.route.paramMap.subscribe(parameter => {
      this.selectedGroupId = String(parameter.get('id'));
    });
  }

      // need to implement profile store
  checkIfLoggedInUserIsAdmin(selectedGroupId: string): void {
/*     this.group$.subscribe((group: Group | undefined ) => {
      if (group !== undefined && group.id === selectedGroupId) {
        this.displayAdminMenu(selectedGroupId!, true);
      } else {
        this.displayAdminMenu(selectedGroupId!, false);
      }
    }); */
    this.groupsService.isLoggedInUserAdmin(selectedGroupId)
    .then((results) => {
      // this.displayAdminMenu(selectedGroupId!, results.data.is_admin);
      console.log('*************+++++++')
      console.log(results.data.is_admin)
      this.groupsServiceState.updateIsAdmin(selectedGroupId, results.data.is_admin);
    })
    .catch((error) => {
      // this.displayAdminMenu(selectedGroupId!, false);
    });
  }

  getGroupById(selectedGroupId: string): void {
    this.groupsServiceState.findGroup(selectedGroupId);
    this.group$ = this.groupsQuery.selectEntity(selectedGroupId);
  }

  checkIfAlreadyFollower(selectedGroupId: string): void {
    this.followingGroupsService.isAlreadyFollower(selectedGroupId)
    .then((results) => {
      console.log('results of follower check')
      if(results.data[0] !== undefined) {
        console.log('following')
        if(this.selectedGroupId) {
          this.groupsServiceState.updateIsFollowing(this.selectedGroupId, true);
        }
      } else {
        if(this.selectedGroupId) {
          console.log('no following')
          this.groupsServiceState.updateIsFollowing(this.selectedGroupId, false);
        }
      }
    })
    .catch();
  }

/*   displayAdminMenu(selectedGroupId: string, isAdmin: boolean): void {
    if(isAdmin) {
      this.menuItemsMega = groupsMenuitemsMegaParameterLoggedIn(selectedGroupId);
      this.menuItems = groupsMenuitemsParameterLoggedIn(selectedGroupId);
    } else {
      this.menuItemsMega = groupsMenuitemsMegaParameter(selectedGroupId);
      this.menuItems = groupsMenuitemsParameter(selectedGroupId);
    }
  } */


  followOrUnfollowGroup(): void {
    if (this.selectedGroupId) {
      if(this.groupUI?.isFollowing) {
        this.followingGroupsService.unfollowTransaction(this.selectedGroupId)
        .then(() => {
          if(this.selectedGroupId) {
            this.groupsServiceState.updateIsFollowing(this.selectedGroupId, false);
            this.messageService.add({severity:'success', summary: 'Du folgst einer neuen Inspirationsquelle.'});
          }
        })
        .catch((error) => {
          this.messageService.add({severity:'error', summary: error});
        });
      } else {
        this.followingGroupsService.followTransaction(this.selectedGroupId)
        .then(() => {
          if(this.selectedGroupId) {
            this.groupsServiceState.updateIsFollowing(this.selectedGroupId, true)
            this.messageService.add({severity:'success', summary: 'Du folgst einer neuen Inspirationsquelle.'});
          }
        })
        .catch((error) => {
          this.messageService.add({severity:'error', summary: error});
        });

    }

    }




/*     if(this.selectedGroupId) {
      if(this.isAlreadyFollower) {
        this.followingGroupsService.unfollowTransaction(this.selectedGroupId)
        .then(() => {
          this.isAlreadyFollower = false;
          this.messageService.add({severity:'success', summary: 'Du folgst einer neuen Inspirationsquelle.'});
        })
        .catch((error) => {
          this.messageService.add({severity:'error', summary: error});
        });
      } else {
        this.followingGroupsService.followTransaction(this.selectedGroupId)
        .then(() => {
          this.isAlreadyFollower = true;
          this.messageService.add({severity:'success', summary: 'Du folgst einer neuen Inspirationsquelle.'});
        })
        .catch((error) => {
          this.messageService.add({severity:'error', summary: error});
        });
      }
    } */
  }

}
