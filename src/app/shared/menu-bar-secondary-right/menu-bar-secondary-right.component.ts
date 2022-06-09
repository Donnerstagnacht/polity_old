import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-menu-bar-secondary-right',
  templateUrl: './menu-bar-secondary-right.component.html',
  styleUrls: ['./menu-bar-secondary-right.component.scss']
})
export class MenuBarSecondaryRightComponent implements OnInit {
  items: MenuItem[] = [];

  constructor() { }

  ngOnInit(): void {
    this.items = [
      {label: 'Übersicht', routerLink: ['/profile']},
      {label: 'ändern', routerLink: ['/profile-edit']}
  ];
  }

}
