import { Component, Input, OnInit } from '@angular/core';
import { MegaMenuItem } from 'primeng/api';

@Component({
  selector: 'app-menu-bar-secondary-top',
  templateUrl: './menu-bar-secondary-top.component.html',
  styleUrls: ['./menu-bar-secondary-top.component.scss']
})
export class MenuBarSecondaryTopComponent implements OnInit {
  @Input() menuItems: MegaMenuItem[] = [];
  loggedIn: boolean = false;

  constructor(
  ) { }

  ngOnInit(): void {

  }

}
