import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MegaMenuItem, MenuItem, MessageService } from 'primeng/api';
import { FollowingGroupsService } from 'src/app/following-groups-system/services/following-groups.service';
import { contactData } from 'src/app/UI-elements/about-and-contact/about-and-contact.component';
import { KeyFigure } from 'src/app/UI-elements/key-figures/key-figures.component';
import { WikiHeader } from 'src/app/UI-elements/wiki-header/wiki-header.component';
import { Group } from '../../UI-dialogs/create-group/create-group.component';
import { groupsMenuitemsParameter, groupsMenuitemsMegaParameter, groupsMenuitemsMegaParameterLoggedIn, groupsMenuitemsParameterLoggedIn } from '../services/groupMenuItems';
import { GroupsService } from '../services/groups.service';

@Component({
  selector: 'app-wiki',
  templateUrl: './wiki.component.html',
  styleUrls: ['./wiki.component.scss'],
  providers: [MessageService]
})
export class WikiComponent implements OnInit {
  menuItems: MenuItem[] = [];
  menuItemsMega: MegaMenuItem[] = [];

  keyFigureList: KeyFigure[] = [];
  contactData: contactData | undefined;
  selectedGroupId: string | undefined = undefined;
  group: Group | undefined;
  wikiHeader: WikiHeader | undefined;
  isAlreadyFollower: boolean = false;
  isAdmin: boolean = false;


  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private groupsService: GroupsService,
    private messageService: MessageService,
    private followingGroupsService: FollowingGroupsService
  ) { }

  ngOnInit(): void {
    this.getSelectedId();
    this.checkIfLoggedInUserIsAdmin();
    this.getGroupById();
  }

  getGroupById(): void {
    if(this.selectedGroupId) {
      this.groupsService.findGroup(this.selectedGroupId)
      .then((results) => {
        this.group = results.data;
        this.keyFigureList = [
          {
            name: 'Mitglieder',
            number: results.data.member_counter
          },
          {
            name: 'Anräge',
            number: results.data.amendment_counter
          },
          {
            name: 'Follower',
            number: results.data.follower_counter
          },
          {
            name: 'Veranstaltungen',
            number: results.data.events_counter
          }
        ];
        this.contactData = {
          about: results.data.description,
          contact_email: results.data.contact_email,
          contact_phone: results.data.contact_phone,
          street: results.data.street,
          post_code: results.data.post_code,
          city: results.data.city
        };
        this.wikiHeader = {
          title: results.data.name,
          subtitle: results.data.level,
          imgUrl: results.data.avatar_url,
        }
        if (this.selectedGroupId) {
          if(this.isAdmin) {
            this.menuItemsMega = groupsMenuitemsMegaParameterLoggedIn(this.selectedGroupId);
            this.menuItems = groupsMenuitemsParameterLoggedIn(this.selectedGroupId);
          } else {
            this.menuItemsMega = groupsMenuitemsMegaParameter(this.selectedGroupId);
            this.menuItems = groupsMenuitemsParameter(this.selectedGroupId);
          }

        }
      })
      .catch((error) => {
        console.log(error.data)
      })
      this.checkIfAlreadyFollower();
    }
  }

  getSelectedId(): void {
    this.route.paramMap.subscribe(parameter => {
    this.selectedGroupId = String(parameter.get('id'));
    })
  }

  followOrUnfollowGroup(): void {
    if(this.selectedGroupId) {
      if(this.isAlreadyFollower) {
        this.followingGroupsService.unfollowTransaction(this.selectedGroupId)
        .then(() => {
          this.isAlreadyFollower = false;
          this.messageService.add({severity:'success', summary: 'Du folgst einer neuen Inspirationsquelle.'});
        })
        .catch((error) => {
          this.messageService.add({severity:'error', summary: error});
        });
      } else {
        this.followingGroupsService.followTransaction(this.selectedGroupId)
        .then(() => {
          this.isAlreadyFollower = true;
          this.messageService.add({severity:'success', summary: 'Du folgst einer neuen Inspirationsquelle.'});
        })
        .catch((error) => {
          this.messageService.add({severity:'error', summary: error});
        });
      }
    }
  }

  checkIfAlreadyFollower(): void {
    if(this.selectedGroupId) {
      this.followingGroupsService.isAlreadyFollower(this.selectedGroupId)
      .then((results) => {
        if(results.data[0] !== undefined) {
          this.isAlreadyFollower = true;
        } else {
          this.isAlreadyFollower = false;
        }
      })
      .catch();
    }
  }

  checkIfLoggedInUserIsAdmin(): void {
    if (this.selectedGroupId) {
      this.groupsService.isLoggedInUserAdmin(this.selectedGroupId)
      .then((results) => {
        this.isAdmin = results.data.is_admin;
        console.log(this.selectedGroupId);
      })
      .catch((error) => {
        this.isAdmin = false;
        console.log(error);
      })
    }
  }


}
