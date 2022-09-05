import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MegaMenuItem, MenuItem } from 'primeng/api';
import { Subscription } from 'rxjs';
import { GroupUI } from '../state/group.model';
import { groupsMenuitemsMegaParameter, groupsMenuitemsMegaParameterLoggedIn, groupsMenuitemsParameter, groupsMenuitemsParameterLoggedIn } from '../state/groupMenuItems';
import { GroupsQuery } from '../state/groups.query';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  menuItemsSpecial: MenuItem[] = [];
  menuItemsStandart: MenuItem[] = [];
  menuItemsMegaSpecial: MegaMenuItem[] = [];
  menuItemsMegaStandart: MegaMenuItem[] = [];
  selectedGroupId: string = '';
  groupUI!: GroupUI;

  editOverviewLink: string = '';
  editFollowerLink: string = '';
  editMembersLink: string = '';

  uiSubscription: Subscription | undefined;

  constructor(
    private route: ActivatedRoute,
    private groupsQuery: GroupsQuery
    ) { }

  ngOnInit(): void {
    this.getSelectedId();
    if (this.selectedGroupId) {
      this.menuItemsSpecial = groupsMenuitemsParameterLoggedIn(this.selectedGroupId);
      this.menuItemsStandart = groupsMenuitemsParameter(this.selectedGroupId);
      this.menuItemsMegaSpecial = groupsMenuitemsMegaParameterLoggedIn(this.selectedGroupId);
      this.menuItemsMegaStandart = groupsMenuitemsMegaParameter(this.selectedGroupId);
      this.editOverviewLink = `/groups/${this.selectedGroupId}/edit-overview`;
      this.editFollowerLink = `/groups/${this.selectedGroupId}/edit-follower`;
      this.editMembersLink = `/groups/${this.selectedGroupId}/edit-members`;

      this.uiSubscription = this.groupsQuery.selectUI$(this.selectedGroupId).subscribe((ui: GroupUI | undefined) => {
        if (ui) {
          this.groupUI = ui;
        }
      })
    }
  }

  ngOnDestroy(): void {
    if(this.uiSubscription) {
      this.uiSubscription.unsubscribe()
    }
  }

  getSelectedId(): void {
    this.route.paramMap.subscribe(parameter => {
    this.selectedGroupId = String(parameter.get('id'));
    })
  }
}
