import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-headline-of-list',
  templateUrl: './headline-of-list.component.html',
  styleUrls: ['./headline-of-list.component.scss']
})
export class HeadlineOfListComponent implements OnInit {
  @Input() headline: string = '';

  constructor() { }

  ngOnInit(): void {
  }

}
