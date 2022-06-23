import { Component, OnInit } from '@angular/core';
import { MegaMenuItem, MenuItem, MessageService } from 'primeng/api';
import { profileMenuitems, profileMenuitemsMega } from 'src/app/profile/services/profileMenuItems';

@Component({
  selector: 'app-group-management',
  templateUrl: './group-management.component.html',
  styleUrls: ['./group-management.component.scss'],
  providers: [MessageService]
})
export class GroupManagementComponent implements OnInit {
  menuItems: MenuItem[] = profileMenuitems;
  menuItemsMega: MegaMenuItem[] = profileMenuitemsMega;

  constructor() { }

  ngOnInit(): void {
  }

}
