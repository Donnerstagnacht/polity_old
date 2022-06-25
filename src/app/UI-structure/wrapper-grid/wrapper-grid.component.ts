import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-wrapper-grid',
  templateUrl: './wrapper-grid.component.html',
  styleUrls: ['./wrapper-grid.component.scss']
})
export class WrapperGridComponent implements OnInit {
  @Input() noTopBar: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

}
