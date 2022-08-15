import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import { Group } from 'src/app/groups/state/group.model';
import { GroupsQuery } from 'src/app/groups/state/groups.query';
import { GroupsService } from 'src/app/groups/state/groups.service';
import { FollowingGroupsService } from '../services/following-groups.service';

@Component({
  selector: 'app-follower-group-management',
  templateUrl: './follower-group-management.component.html',
  styleUrls: ['./follower-group-management.component.scss'],
  providers: [MessageService]
})
export class FollowerGroupManagementComponent implements OnInit {
  group$ = new Observable<Group | undefined>();
  followers: any[] = [];
  followings: any[] = [];
  selectedGroupId: string = '';
  link: string = '';
  titleFollower: string = 'Follower';
  noDataFollower: string = 'Du hast noch keine Follower.';

  constructor(
    private followingGroupsService: FollowingGroupsService,
    private groupsService: GroupsService,
    private groupQuery: GroupsQuery,
    private messageService: MessageService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.getSelectedId();
    this.link = `/groups/${this.selectedGroupId}/edit`;
    this.groupsService.getAllFollowers(this.selectedGroupId);
    this.groupsService.getRealTimeChangesFollowers(this.selectedGroupId);
    this.getAllFollower();
  }

  getAllFollower(): void {
    console.log('called getAllFollower');
    this.group$ = this.groupQuery.selectEntity(this.selectedGroupId);
    this.group$.subscribe((group: Group | undefined) => {
      if(group?.followers) {
        console.log('called requests');
        console.log(group.followers)
        this.followers = []
        this.followers = group.followers;
      }
    })
/*     this.followingGroupsService.getAllFollower(this.selectedGroupId)
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
      this.messageService.add({severity:'error', summary: 'Fehler beim laden. ' + error});
    }); */
  }

  onRemoveFollower(event: {id: string, user_id: string}): void {
    console.log('onrRemove follower')
    console.log('id')
    console.log(event.user_id)
    console.log('user_id')
    console.log(event.user_id)
    console.log('group_id')

    console.log(this.selectedGroupId)

    this.followingGroupsService.removeFollowerTransaction(event.user_id, this.selectedGroupId)
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
