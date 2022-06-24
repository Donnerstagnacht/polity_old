import { Component, OnInit } from '@angular/core';
import { Group } from '../create-group/create-group.component';
import { GroupsService } from '../services/groups.service';

@Component({
  selector: 'app-my-groups-list',
  templateUrl: './my-groups-list.component.html',
  styleUrls: ['./my-groups-list.component.scss']
})
export class MyGroupsListComponent implements OnInit {

  constructor(private groupsService: GroupsService) { }
  localGroupList: Group[] = [];
  regionalGroupList: Group[] = [];
  federalGroupList: Group[] = [];
  internationalGroupList: Group[] = [];

  ngOnInit(): void {
    this.getAllGroups();
  }

  getAllGroups(): void {
    this.groupsService.getAllGroupsOfId()
    .then((groupList) => {
      /**review**/
      groupList.data.forEach((results: any) => {
        let group: Group = {
          'id': results.group_id,
          'name': results.groups.name,
          'level': results.groups.level,
          'creator': results.groups.creator,
          'description': results.groups.description
        }
        switch(group.level) {
          case 'local': {
            this.localGroupList.push(group);
            break;
          }
          case 'regional': {
            this.regionalGroupList.push(group);
            break;
          }
          case 'federal': {
            this.federalGroupList.push(group);
            break;
          }
          case 'international': {
            this.internationalGroupList.push(group);
            break;
          }
        }
      })
    })
    .catch((error: any) => {
      console.log(error);
    })

  }

}
