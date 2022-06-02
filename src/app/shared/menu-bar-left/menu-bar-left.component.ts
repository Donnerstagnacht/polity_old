import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu-bar-left',
  templateUrl: './menu-bar-left.component.html',
  styleUrls: ['./menu-bar-left.component.scss']
})
export class MenuBarLeftComponent implements OnInit {
  display: boolean = true;
  loggedIn: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

}
