import { Component, Input, OnInit } from '@angular/core';

export interface WikiHeader {
  title: string;
  subtitle: string;
  imgUrl: string;
}

@Component({
  selector: 'app-wiki-header',
  templateUrl: './wiki-header.component.html',
  styleUrls: ['./wiki-header.component.scss']
})
export class WikiHeaderComponent implements OnInit {
  @Input() wikiHeader: WikiHeader | undefined;

  constructor() { }

  ngOnInit(): void {
  }

}
