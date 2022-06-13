import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FollowingService } from '../services/following.service';

@Component({
  selector: 'app-follower-management',
  templateUrl: './follower-management.component.html',
  styleUrls: ['./follower-management.component.scss']
})
export class FollowerManagementComponent implements OnInit {
  followers: any[] = [];
  followings: any[] = [];
  constructor(
    private followingService: FollowingService
  ) { }

  ngOnInit(): void {
    this.getAllFollower();
    this.getAllFollowing();
  }

  getAllFollower(): void {
    this.followingService.getAllFollower()
    .then((followers) => {
      this.followers = followers.data;
      console.log(this.followers);
    })
    .catch((error) => {
      console.log(error);
    });
  }

  getAllFollowing(): void {
    this.followingService.getAllFollowing()
    .then((followings) => {
      this.followings = followings.data;
      console.log(this.followings);
    })
    .catch((error) => {
      console.log(error);
    });
  }
}
