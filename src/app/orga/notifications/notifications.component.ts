import { Component, OnInit } from '@angular/core';
import { MegaMenuItem, MenuItem } from 'primeng/api';
import { orgaeMenuitems, orgaMenuitemsMega } from '../services/orgaMenuItems';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {
  menuItems: MenuItem[] = orgaeMenuitems;
  menuItemsMega: MegaMenuItem[] = orgaMenuitemsMega;
  constructor() { }

  ngOnInit(): void {
  }

}
