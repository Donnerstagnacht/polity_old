import { Component, Input, OnInit } from '@angular/core';
import { AuthentificationService, Profile } from 'src/app/authentification/services/authentification.service';
import { GroupsService } from '../../groups/services/groups.service';

export interface carouselPages {
  pageNumber: number
}

export interface Group {
  id?: string,
  created_at?: string,
  name: string,
  description: string,
  creator: string,
  member_counter?: string
  events_counter?: string
  level: string,
  street?: string,
  post_code?: string,
  city?: string,
  contact_phone?: string,
  avatar_url?: string,
  follower_counter?: string,
  amendment_counter?: string,
  contact_email?: string,
  updated_at?: Date
}

@Component({
  selector: 'app-create-group',
  templateUrl: './create-group.component.html',
  styleUrls: ['./create-group.component.scss']
})
export class CreateGroupComponent implements OnInit {
  @Input() showAddGroupDialog: boolean = true;
  showInput: boolean = true;
  carouselPages: carouselPages[] = [];
  page: number = 0;
  loggedInUser!: Profile;

  newGroup: Group = {
    name: '',
    description: '',
    level: '',
    creator: '',
  }

  constructor(
    private readonly authentificationService: AuthentificationService,
    private groupsService: GroupsService
    ) { }

  ngOnInit(): void {
    this.getLoggedInUser();

    this.carouselPages = [
      {
        pageNumber: 1,
      },
      {
        pageNumber: 2,
      }
    ]
  }

  getLoggedInUser(): void {
    const loggedInUser = this.authentificationService.profile;
    if(loggedInUser) {
      loggedInUser.then((profile: any) => {
        this.loggedInUser = profile.data;
        this.newGroup.creator = profile.data.id;
      });
    }
  }

  showinput(): void {
    this.showInput = !this.showInput;
  }

  pageForward(): void {
    console.log(this.newGroup)
    if(this.page === this.carouselPages.length-1) {
      this.page = this.carouselPages.length-1;
    } else {
      this.page = this.page +1;
    }
  }

  pageBackward(): void {
    if(this.page === 0) {
      this.page = 0;
    } else {
      this.page = this.page -1;
    }
  }

  setLevel(level: string) {
    this.newGroup.level = level;
  }

  createGroup(): void {
    this.groupsService.createGroupTransaction(
      this.newGroup
    ).then((result) => {
      console.log('success');
      this.showAddGroupDialog = false;
    })
    .catch((error) => {
      console.log(error);
    })
    ;
  }

}
