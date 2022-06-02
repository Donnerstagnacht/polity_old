import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu-bar-bottom',
  templateUrl: './menu-bar-bottom.component.html',
  styleUrls: ['./menu-bar-bottom.component.scss']
})
export class MenuBarBottomComponent implements OnInit {
  display: boolean = true;
  loggedIn: boolean = true;

  constructor() { }

  ngOnInit(): void {
  }

}
