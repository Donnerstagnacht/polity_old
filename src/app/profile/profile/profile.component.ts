import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute  } from '@angular/router';
import { Profile, AuthentificationService } from 'src/app/authentification/services/authentification.service';
import { AuthentificationService as Store } from 'src/app/authentification/state/authentification.service';
import { AuthentificationQuery } from 'src/app/authentification/state/authentification.query';

import { ProfileService } from '../services/profile.service';
import { FollowingService } from 'src/app/following-profiles-system/services/following.service';
import { MegaMenuItem, MenuItem, MessageService } from 'primeng/api';
import { KeyFigure } from 'src/app/UI-elements/key-figures/key-figures.component';
import { profileMenuitems, profileMenuitemsMega } from '../services/profileMenuItems';
import { WikiHeader } from 'src/app/UI-elements/wiki-header/wiki-header.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  providers: [MessageService]
})
export class ProfileComponent implements OnInit {
  menuItems: MenuItem[] = profileMenuitems;
  menuItemsMega: MegaMenuItem[] = profileMenuitemsMega;

  loading: boolean = true;
  profile: Profile | undefined;
  // @Input() session: Session | undefined;
  isAlreadyFollower: boolean = false;

  selectedProfileId: string | undefined = undefined;
  keyFigureList: KeyFigure[] = [];
  wikiHeader: WikiHeader | undefined;

  constructor(
    public readonly supabase: AuthentificationService,
    private authentificationQuery: AuthentificationQuery,
    private router: Router,
    private route: ActivatedRoute,
    private profileService: ProfileService,
    private followingservice: FollowingService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.getSelectedId();
    this.getSelectedProfile();
    this.checkIfAlreadyFollower();
  }

  getSelectedId(): void {
    this.route.paramMap.subscribe(parameter => {
      this.selectedProfileId = String(parameter.get('id'));
      console.log(this.selectedProfileId)
      if(this.selectedProfileId) {
        this.authentificationQuery.uuid$.subscribe((uuid) => {
                    console.log('my profile')
                    console.log(uuid)
          if(uuid) {
            this.selectedProfileId = uuid;
          }
        })
      } else {
        console.log('profile')
        console.log(this.selectedProfileId)
      }
    })
  }

  getSelectedProfile(): void {
    if (this.selectedProfileId) {
      this.profileService.findProfil(this.selectedProfileId)
      .then((profile) => {
        this.profile = profile.data;
        this.keyFigureList = [
          {
            name: 'Anträge',
            number: profile.data.amendment_counter
          },
          {
            name: 'Follower',
            number: profile.data.follower_counter
          },
          {
            name: 'Following',
            number: profile.data.following_counter
          },
          {
            name: 'Gruppen',
            number: profile.data.groups_counter
          },

        ];
        this.wikiHeader = {
          title: profile.data.name,
          subtitle: 'Rosbach | Wetteraus - Hessen (statisch)',
          imgUrl: profile.data.avatar_url,
        }
      }
      )
      .catch((error) => {console.log(error)})
    }
  }

  async getProfile() {
    try {
      this.loading = true;
      let {data: profile, error, status} = await this.supabase.profile;

      if (error && status !== 406) {
        throw error;
      }

      if (profile) {
        this.profile = profile;
      }
    } catch (error: any) {
      console.error(error.message);
      this.router.navigate(['/login']);
    } finally {
      this.loading = false;
    }
  }

  followOrUnfollowProfile(): void {
    if(this.selectedProfileId) {
      if(this.isAlreadyFollower) {
        this.followingservice.unfollowTransaction(this.selectedProfileId)
        .then(() => {
          this.isAlreadyFollower = false;
          this.messageService.add({severity:'success', summary: 'Du folgst einer neuen Inspirationsquelle.'});
        })
        .catch((error) => {
          this.messageService.add({severity:'error', summary: error});
        });
      } else {
        this.followingservice.followTransaction(this.selectedProfileId)
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
    if(this.selectedProfileId) {
      this.followingservice.isAlreadyFollower(this.selectedProfileId)
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
}
