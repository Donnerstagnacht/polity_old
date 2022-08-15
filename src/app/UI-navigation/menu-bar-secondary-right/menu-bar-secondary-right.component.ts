import { Component, Input, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-menu-bar-secondary-right',
  templateUrl: './menu-bar-secondary-right.component.html',
  styleUrls: ['./menu-bar-secondary-right.component.scss']
})
export class MenuBarSecondaryRightComponent implements OnInit {
  @Input() menuItemsSpecial: MenuItem[] = [];
  @Input() menuItemsStandart: MenuItem[] = [];
  @Input() specialOrStandart: boolean = false;
  @Input() menuItems: MenuItem[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
