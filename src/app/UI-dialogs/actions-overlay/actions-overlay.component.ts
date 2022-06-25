import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-actions-overlay',
  templateUrl: './actions-overlay.component.html',
  styleUrls: ['./actions-overlay.component.scss']
})
export class ActionsOverlayComponent implements OnInit {
  @Input() showAddMenu!: boolean;
  @Output() showAddMenuChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  showCreateGroupMenu: boolean = false;

  constructor() { }

  ngOnInit(): void {

  }

  openAddGroupPanel(): void {
    this.showCreateGroupMenu = true;
    this.showAddMenu = false;
  }

}
