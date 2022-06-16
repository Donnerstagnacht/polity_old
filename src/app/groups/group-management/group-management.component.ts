import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-group-management',
  templateUrl: './group-management.component.html',
  styleUrls: ['./group-management.component.scss'],
  providers: [MessageService]
})
export class GroupManagementComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
