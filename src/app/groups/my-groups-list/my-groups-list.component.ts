import { Component, OnInit } from '@angular/core';
import { Subscription } from '@supabase/supabase-js';
import { MessageService } from 'primeng/api';
import { GroupsService } from '../services/groups.service';
import { Group } from '../state/group.model';

@Component({
  selector: 'app-my-groups-list',
  templateUrl: './my-groups-list.component.html',
  styleUrls: ['./my-groups-list.component.scss'],
  providers: [MessageService]
})
export class MyGroupsListComponent implements OnInit {
  localGroupList: Group[] = [];
  regionalGroupList: Group[] = [];
  federalGroupList: Group[] = [];
  internationalGroupList: Group[] = [];

  loading: boolean = false;
  error: boolean = false;
  errorMessage: string | undefined;

  authSubscription: Subscription | undefined;
  groupsRealtimeSubscription: Subscription | undefined;

  constructor(
    private groupsService: GroupsService,
    private messageService: MessageService
    ) { }

  ngOnInit(): void {
    this.getAllGroups();
  }

  async getAllGroups(): Promise<void> {
    try {
      this.error = false;
      this.loading = true;
      const groupList: {data: any, error: any} = await this.groupsService.getAllGroupsOfId();
      groupList.data.forEach((results: any) => {
        let group: Group = {
          'id': results.group_id,
          'name': results.groups.name,
          'level': results.groups.level,
          'creator': results.groups.creator,
          'description': results.groups.description,
          street: '',
          post_code: '',
          city: '',
          contact_phone: '',
          contact_email: '',
          avatar_url: ''
        }
        switch(group.level) {
          case 'Lokal': {
            this.localGroupList.push(group);
            break;
          }
          case 'Regional': {
            this.regionalGroupList.push(group);
            break;
          }
          case 'Federal': {
            this.federalGroupList.push(group);
            break;
          }
          case 'International': {
            this.internationalGroupList.push(group);
            break;
          }
        }
      })
    } catch(error: any) {
      this.messageService.add({severity:'error', summary: error.message});
      this.error = true;
      this.errorMessage = error.message;
    } finally {
      this.loading = false;
    }
  }

}
