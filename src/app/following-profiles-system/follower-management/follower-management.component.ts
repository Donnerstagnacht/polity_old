import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
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

  filterString: string = '';
  constructor(
    private followingService: FollowingService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.getAllFollower();
    this.getAllFollowing();
  }

  getAllFollower(): void {
    this.followingService.getAllFollower()
    .then((followers) => {
      this.followers = [];
      followers.data.forEach((profile: any) => {
        let id: any = profile.profiles.id;
        let username: any = profile.profiles.username;
        let avatarUrl: any = profile.profiles.avatarUrl;
        this.followers.push({
          'id': id,
          'username': username,
          'avatarUrl': avatarUrl
        });
      });
    })
    .catch((error) => {
      this.messageService.add({severity:'success', summary: 'Fehler beim laden. ' + error});
    });
  }

  getAllFollowing(): void {
    this.followingService.getAllFollowing()
    .then((followings) => {
      this.followings = [];
      followings.data.forEach((profile: any) => {
        let id: any = profile.profiles.id;
        let username: any = profile.profiles.username;
        let avatarUrl: any = profile.profiles.avatarUrl;
        this.followings.push({
          'id': id,
          'username': username,
          'avatarUrl': avatarUrl
        });

      });
    })
    .catch((error) => {
      this.messageService.add({severity:'success', summary: 'Fehler beim laden. ' + error});
    });
  }

  onUnfollow(uuid:string): void {
    this.followingService.unFollow(uuid)
    .then(() => {
      this.getAllFollowing();
      this.messageService.add({severity:'success', summary: 'Unfollowed.'});
    })
    .catch((error: any) =>  {
      this.messageService.add({severity:'error', summary: error})
    })
  }

  onDeletefollowing(uuid:string): void {
    this.followingService.deleteFollower(uuid)
    .then(() => {
      this.getAllFollower();
      this.messageService.add({severity:'success', summary: 'Follower entfernt..'});
    })
    .catch((error) => {
      this.messageService.add({severity:'success', summary: error});
    })
  }
}
