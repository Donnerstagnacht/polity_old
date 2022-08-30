import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-element',
  templateUrl: './list-element.component.html',
  styleUrls: ['./list-element.component.scss']
})
export class ListElementComponent implements OnInit {
  @Input() title: string = '';
  @Input() link: string = '';

  constructor() { }

  ngOnInit(): void {}

}
