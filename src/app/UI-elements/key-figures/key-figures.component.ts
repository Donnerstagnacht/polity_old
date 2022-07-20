import { Component, Input, OnInit } from '@angular/core';

export interface KeyFigure {
  name: string,
  number?: number
}

@Component({
  selector: 'app-key-figures',
  templateUrl: './key-figures.component.html',
  styleUrls: ['./key-figures.component.scss']
})

export class KeyFiguresComponent implements OnInit {
  @Input() keyFigureList: KeyFigure[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
