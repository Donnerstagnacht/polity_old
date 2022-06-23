import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MegaMenuItem, MenuItem } from 'primeng/api';
import { groupsMenuitemsMegaParameter, groupsMenuitemsParameter } from '../services/groupMenuItems';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  menuItems: MenuItem[] = [];
  menuItemsMega: MegaMenuItem[] = [];
  selectedGroupId: string = '';

  editOverviewLink: string = '';
  editFollowerLink: string = '';
  editMembersLink: string = '';

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    console.log('reached')
    this.getSelectedId();
    if (this.selectedGroupId) {
      this.menuItemsMega = groupsMenuitemsMegaParameter(this.selectedGroupId);
      this.menuItems = groupsMenuitemsParameter(this.selectedGroupId);
      this.editOverviewLink = `/groups/${this.selectedGroupId}/edit-overview`;
      this.editFollowerLink = `/groups/${this.selectedGroupId}/edit-follower`;
      this.editMembersLink = `/groups/${this.selectedGroupId}/edit-members`;
    }
  }

  getSelectedId(): void {
    this.route.paramMap.subscribe(parameter => {
    this.selectedGroupId = String(parameter.get('id'));
    })
  }



}
