import { Component, Input, OnInit } from '@angular/core';

export interface News {
  id: string,
  sender: string,
  connected_id: string,
  connected_name: string,
  time: Date,
  info: string,
  avatar_url: string,
  type: string,
}

@Component({
  selector: 'app-news-list-item',
  templateUrl: './news-list-item.component.html',
  styleUrls: ['./news-list-item.component.scss']
})
export class NewsListItemComponent implements OnInit {
  @Input() news!: News;
  showTime: boolean = false;

  constructor() { }

  ngOnInit(): void {

  }

  openProfile(): void {

  }

  openConnectedId(): void {

  }

  checkIfMessageReceivedToday(): void {
    const currentDate = new Date().setHours(0,0,0,0);
    const dateOflastMessage = new Date (this.news.time).setHours(0,0,0,0);

    if (currentDate === dateOflastMessage) {
      this.showTime = true
    }
  }

}
