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
@Component({
  selector: 'app-wiki',
  templateUrl: './wiki.component.html',
  styleUrls: ['./wiki.component.scss'],
  providers: [MessageService]
})
export class WikiComponent implements OnInit {
  menuItems: MenuItem[] = [];
  menuItemsMega: MegaMenuItem[] = [];

  selectedGroupId: string | undefined = undefined;
  group$ = new Observable<Group | undefined>();

  isAlreadyFollower: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private groupsService: GroupsService,
    private groupsServiceState: GroupsServiceState,
    private messageService: MessageService,
    private followingGroupsService: FollowingGroupsService,
    private groupsQuery: GroupsQuery
  ) { }

  ngOnInit(): void {
    this.getSelectedId();
    if(this.selectedGroupId) {
      this.checkIfLoggedInUserIsAdmin(this.selectedGroupId);
      this.getGroupById(this.selectedGroupId);
      this.checkIfAlreadyFollower(this.selectedGroupId);
      this.groupsServiceState.getRealTimeChanges(this.selectedGroupId);
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
      this.displayAdminMenu(selectedGroupId!, results.data.is_admin);
    })
    .catch((error) => {
      this.displayAdminMenu(selectedGroupId!, false);
    });
  }

  getGroupById(selectedGroupId: string): void {
    this.groupsServiceState.findGroup(selectedGroupId);
    this.group$ = this.groupsQuery.selectEntity(selectedGroupId);
  }

  checkIfAlreadyFollower(selectedGroupId: string): void {
    this.followingGroupsService.isAlreadyFollower(selectedGroupId)
    .then((results) => {
      if(results.data[0] !== undefined) {
        this.isAlreadyFollower = true;
      } else {
        this.isAlreadyFollower = false;
      }
    })
    .catch();
  }

  displayAdminMenu(selectedGroupId: string, isAdmin: boolean): void {
    if(isAdmin) {
      this.menuItemsMega = groupsMenuitemsMegaParameterLoggedIn(selectedGroupId);
      this.menuItems = groupsMenuitemsParameterLoggedIn(selectedGroupId);
    } else {
      this.menuItemsMega = groupsMenuitemsMegaParameter(selectedGroupId);
      this.menuItems = groupsMenuitemsParameter(selectedGroupId);
    }
  }


  followOrUnfollowGroup(): void {
    if(this.selectedGroupId) {
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
    }
  }

}
