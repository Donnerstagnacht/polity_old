import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import { AuthentificationQuery } from 'src/app/authentification/state/authentification.query';
import { profile_list_item } from 'src/app/groups/state/profile_list_item.model';
import { Profile } from 'src/app/profile/state/profile.model';
import { ProfileQuery } from 'src/app/profile/state/profile.query';
import { ProfileService } from 'src/app/profile/state/profile.service';
import { ProfileStore } from 'src/app/profile/state/profile.store';
import { FollowingService } from '../services/following.service';

@Component({
  selector: 'app-follower-management',
  templateUrl: './follower-management.component.html',
  styleUrls: ['./follower-management.component.scss'],
  providers: [MessageService]
})
export class FollowerManagementComponent implements OnInit {
  columns: any[] = [];
  followers: any[] = [];
  followings: any[] = [];
  titleFollower: string = 'Follower';
  titleFollowings: string = 'Followings';
  noDataFollower: string = 'Du hast noch keine Follower.';
  noDataFollowings: string = 'Du folgst noch niemanden.';
  profile$ = new Observable<Profile | undefined>();
  loggedInID: string = '';


  filterString: string = '';
  constructor(
    private followingService: FollowingService,
    private messageService: MessageService,
    private profileQuery: ProfileQuery,
    private profileService: ProfileService,
    private authentificationQuery: AuthentificationQuery
  ) { }

  ngOnInit(): void {
    this.getProfileId();
    this.profileService.getAllFollowers(this.loggedInID);
    this.profileService.getAllFollowings(this.loggedInID);
    this.getFollowingSystem();
    this.profileService.getRealTimeChangesFollowerSystem(this.loggedInID);
  }

  getProfileId(): void {
    this.authentificationQuery.uuid$.subscribe(uuid => {
      if(uuid) {
        this.loggedInID = uuid;
      }
    });
  }

  getFollowingSystem(): void {
    console.log('called getAllFollower');
    this.profile$ = this.profileQuery.selectEntity(this.loggedInID);
    this.profile$.subscribe((profile: Profile | undefined) => {
      if(profile?.followers) {
        console.log('called requests');
        console.log(profile.followers)
        this.followers = []
        this.followers = profile.followers;
      }
      if(profile?.followings) {
        console.log('called requests');
        console.log(profile.followings)
        this.followings = []
        this.followings = profile.followings;
      }

    })
  }


  getAllFollower(): void {
    this.followingService.getAllFollower()
    .then((followers) => {
      this.followers = [];
      followers.data.forEach((profile: any) => {
        let id: any = profile.profiles.id;
        let name: any = profile.profiles.name;
        let avatar_url: any = profile.profiles.avatar_url;
        this.followers.push({
          'id': id,
          'name': name,
          'avatar_url': avatar_url
        });
      });
    })
    .catch((error) => {
      this.messageService.add({severity:'success', summary: 'Fehler beim laden. ' + error});
    });
  }

        /**review**/
  getAllFollowing(): void {
    this.followingService.getAllFollowing()
    .then((followings) => {
      this.followings = [];
      followings.data.forEach((profile: any) => {
        let id: any = profile.profiles.id;
        let name: any = profile.profiles.name;
        let avatar_url: any = profile.profiles.avatar_url;
        this.followings.push({
          'id': id,
          'name': name,
          'avatar_url': avatar_url
        });

      });
    })
    .catch((error) => {
      this.messageService.add({severity:'success', summary: 'Fehler beim laden. ' + error});
    });
  }

  onRemoveFollower(event: {id: string, user_id: string}): void {
    this.followingService.removeFollowerTransactionById(event)
    .then(() => {
      // this.getAllFollowing();
      this.messageService.add({severity:'success', summary: 'Follower entfernt.'});
    })
    .catch((error: any) =>  {
      this.messageService.add({severity:'error', summary: error})
    })
  }

  onUnFollow(event: {id: string, user_id: string}): void {
    console.log('onUnFollow')
    console.log(event.user_id)
    this.followingService.unfollowTransaction(event.user_id)
    .then(() => {
      // this.getAllFollower();
      this.messageService.add({severity:'success', summary: 'Du folgst der Person nicht mehr.'});
    })
    .catch((error) => {
      this.messageService.add({severity:'success', summary: error});
    })
  }
}
