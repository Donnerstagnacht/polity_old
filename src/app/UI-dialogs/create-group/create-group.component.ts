import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { AuthentificationService, Profile } from '../../authentification/services/authentification.service';
import { GroupsService } from '../../groups/services/groups.service';
import { MenuService } from '../menu.service';

export interface carouselPages {
  pageNumber: number
}


export interface Group {
  id?: string,
  created_at?: string,
  name: string,
  description: string,
  creator: string,
  member_counter?: number,
  events_counter?: number,
  level: string,
  street: string,
  post_code: string,
  city: string,
  contact_phone: string,
  avatar_url: string,
  follower_counter?: number,
  amendment_counter?: number,
  contact_email: string,
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
    street: '',
    post_code: '',
    city: '',
    contact_email: '',
    contact_phone: '',
    avatar_url: ''
  }

  constructor(
    private readonly authentificationService: AuthentificationService,
    private groupsService: GroupsService,
    private menuService: MenuService
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

    this.menuService.getMenuStatus().subscribe((menuStatus) => {
      this.showAddGroupDialog = menuStatus;
    })

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
      this.newGroup = {
        name: '',
        description: '',
        level: '',
        creator: '',
        street: '',
        post_code: '',
        city: '',
        contact_email: '',
        contact_phone: '',
        avatar_url: ''
      }
      this.page = 0;
    })
    .catch((error) => {
      console.log(error);
    })
    ;
  }

  onHide(): void {
    this.page = 0;
  }

}
