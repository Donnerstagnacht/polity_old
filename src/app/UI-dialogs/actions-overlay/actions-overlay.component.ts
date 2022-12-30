import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MenuService } from '../menu.service';

@Component({
  selector: 'app-actions-overlay',
  templateUrl: './actions-overlay.component.html',
  styleUrls: ['./actions-overlay.component.scss']
})
export class ActionsOverlayComponent implements OnInit {
  @Input() showAddMenu!: boolean;
  @Output() showAddMenuChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  showCreateGroupMenu: boolean = false;
  showCreateEventMenu: boolean = false;

  constructor(private menuService: MenuService) { }

  ngOnInit(): void {}

  openAddGroupPanel(): void {
    this.showCreateGroupMenu = true;
    this.showAddMenu = false;
    this.menuService.showGroupMenu();
  }

  openAddEventPanel(): void {
    this.showCreateEventMenu = true;
    this.showAddMenu = false;
    this.menuService.showEventMenu();
  }

}
