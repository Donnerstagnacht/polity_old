import { Component, OnInit } from '@angular/core';
import { MegaMenuItem, MenuItem } from 'primeng/api';
import { News } from 'src/app/UI-elements/news-list-item/news-list-item.component';
import { orgaeMenuitems, orgaMenuitemsMega } from '../../chat/services/orgaMenuItems';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {
  menuItems: MenuItem[] = orgaeMenuitems;
  menuItemsMega: MegaMenuItem[] = orgaMenuitemsMega;
  newsList: News[] = [];

  taskFilterOn: boolean = true;
  amendmentFilterOn: boolean = true;
  eventFilterOn: boolean = true;
  voteFilterOn: boolean = true;
  accountFilterOn: boolean = true;


  constructor() { }

  ngOnInit(): void {
    this.newsList = [
      {
        id: 'dfdf-sdfs-sdff-sdfs',
        sender: 'Tobias',
        time: new Date,
        connected_id: 'dfdf-sdfs-sdff-sdfs',
        connected_name: 'Task Board Rosbach',
        info: 'Flyer drucken',
        avatar_url: 'avatar-url',
        type: 'Task',
      },
      {
        id: 'dfdf-sdfs-sdff-sdfs',
        sender: 'Tobias',
        time: new Date,
        connected_id: 'dfdf-sdfs-sdff-sdfs',
        connected_name: 'Umgehungsstraße Rosbach',
        info: 'In Zeile 20 x einfügen',
        avatar_url: 'avatar-url',
        type: 'amendment'
      },
      {
        id: 'dfdf-sdfs-sdff-sdfs',
        sender: 'Tobias',
        time: new Date,
        connected_id: 'dfdf-sdfs-sdff-sdfs',
        connected_name: 'Vorstandssitzung Rosbach',
        info: 'Neuer Tagesordnungspunkt "Bericht Bezirk"',
        avatar_url: 'avatar-url',
        type: 'event'
      },
      {
        id: 'dfdf-sdfs-sdff-sdfs',
        sender: 'Tobias',
        time: new Date,
        connected_id: 'dfdf-sdfs-sdff-sdfs',
        connected_name: 'Vorstandswahl',
        info: 'Neuer Kandidat "Lukas Maier"',
        avatar_url: 'avatar-url',
        type: 'vote'
      },
      {
        id: 'dfdf-sdfs-sdff-sdfs',
        sender: 'Tobias',
        time: new Date,
        connected_id: 'dfdf-sdfs-sdff-sdfs',
        connected_name: 'Neuer Follower',
        info: 'Lara Ziegler folgt dir jetzt"',
        avatar_url: 'avatar-url',
        type: 'account'
      }
    ]
  }

  onSearch(searchTerm: string): void {}

  setTaskFilter(): void {
    this.taskFilterOn = !this.taskFilterOn;
  }

  setAmendmentFilter(): void {
    this.amendmentFilterOn = !this.amendmentFilterOn;
  }

  setEventFilter(): void {
    this.eventFilterOn = !this.eventFilterOn;
  }

  setVoteFilter(): void {
    this.voteFilterOn = !this.voteFilterOn;
  }

  setAccountFilter(): void {
    this.accountFilterOn = !this.accountFilterOn;
  }

}
