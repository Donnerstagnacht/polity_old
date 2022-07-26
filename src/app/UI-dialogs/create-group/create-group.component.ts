import { Component, Input, OnInit } from '@angular/core';
import { AuthentificationQuery } from 'src/app/authentification/state/authentification.query';
import { Profile } from 'src/app/profile/state/profile.model';
import { ProfileQuery } from 'src/app/profile/state/profile.query';
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
  loggedInUser: Profile | undefined;
  loggedInUserId: string | null = null;

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
    private authentificationQuery: AuthentificationQuery,
    private groupsService: GroupsService,
    private menuService: MenuService,
    private profileQuery: ProfileQuery
    ) { }

  ngOnInit(): void {
    this.getLoggedInUserId$();
    this.getSelectedProfile();
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

  getLoggedInUserId$(): void {
    this.authentificationQuery.uuid$.subscribe((uuid) => {
      if(uuid) {
        this.loggedInUserId = uuid;
        console.log(this.loggedInUserId)
      }
    })
  }

  getSelectedProfile(): void {
    if (this.loggedInUserId) {
      this.profileQuery
        .selectProfileById(this.loggedInUserId)
        .subscribe((profile: Profile | undefined) => {
          if(profile) {
            //Review
            this.loggedInUser = profile;
            console.log(this.loggedInUser)
          }
        })
    }
  }

  getLoggedInUser(): void {
    if(this.loggedInUser) {
      this.newGroup.creator = this.loggedInUser.id;
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
