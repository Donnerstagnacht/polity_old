import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { FollowingGroupsService } from '../services/following-groups.service';

@Component({
  selector: 'app-follower-group-management',
  templateUrl: './follower-group-management.component.html',
  styleUrls: ['./follower-group-management.component.scss'],
  providers: [MessageService]
})
export class FollowerGroupManagementComponent implements OnInit {
  followers: any[] = [];
  followings: any[] = [];
  selectedGroupId: string = '';
  link: string = '';
  titleFollower: string = 'Follower';
  noDataFollower: string = 'Du hast noch keine Follower.';

  constructor(
    private followingGroupsService: FollowingGroupsService,
    private messageService: MessageService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.getSelectedId();
    this.link = `/groups/${this.selectedGroupId}/edit`;
    this.getAllFollower();
  }

  getAllFollower(): void {
    this.followingGroupsService.getAllFollower(this.selectedGroupId)
    .then((followers) => {
      this.followers = [];
      followers.data.forEach((profile: any) => {
        let id: any = profile.profiles.id;
        let username: any = profile.profiles.username;
        let avatar_Url: any = profile.profiles.avatar_Url;
        this.followers.push({
          'id': id,
          'username': username,
          'avatar_Url': avatar_Url
        });
      });
    })
    .catch((error) => {
      this.messageService.add({severity:'error', summary: 'Fehler beim laden. ' + error});
    });
  }

  onRemoveFollower(uuid: string): void {
    this.followingGroupsService.removeFollowerTransaction(uuid, this.selectedGroupId)
    .then(() => {
      this.getAllFollower();
      this.messageService.add({severity:'success', summary: 'Follower entfernt.'});
    })
    .catch((error: any) =>  {
      this.messageService.add({severity:'error', summary: error})
    })
  }

  getSelectedId(): void {
    this.route.paramMap.subscribe(parameter => {
    this.selectedGroupId = String(parameter.get('id'));
    })
  }

}
