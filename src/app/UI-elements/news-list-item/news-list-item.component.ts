import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { News } from 'src/app/news/state/news.model';

@Component({
  selector: 'app-news-list-item',
  templateUrl: './news-list-item.component.html',
  styleUrls: ['./news-list-item.component.scss']
})
export class NewsListItemComponent implements OnInit {
  @Input() news!: News;
  showTime: boolean = false;

  constructor(private router: Router) { }

  ngOnInit(): void {

  }

  openProfile(): void {
    this.router.navigateByUrl(`/profile/${this.news.notifier}`)
  }

  openConnectedId(): void {
    this.router.navigateByUrl(`/profile/${this.news.notifier}`)
  }

  checkIfMessageReceivedToday(): void {
    const currentDate = new Date().setHours(0,0,0,0);
    const dateOflastMessage = new Date (this.news.created_at).setHours(0,0,0,0);

    if (currentDate === dateOflastMessage) {
      this.showTime = true
    }
  }

}
