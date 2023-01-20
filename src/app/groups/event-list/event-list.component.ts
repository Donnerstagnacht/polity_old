import { Component, OnInit } from '@angular/core';
import { MegaMenuItem, MenuItem } from 'primeng/api';
import { groupsMenuitemsParameter, groupsMenuitemsMegaParameter, groupsMenuitemsMegaParameterLoggedIn, groupsMenuitemsParameterLoggedIn } from '../state/groupMenuItems';
import { GroupsService } from '../services/groups.service';
import { GroupsService as GroupsServiceState } from '../state/groups.service';
import { GroupUI } from '../state/group.model';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { GroupsQuery } from '../state/groups.query';
import { ChipElement } from 'src/app/UI-elements/chips-picker-generic/chips-picker-generic.component';
import { SupabaseClient, createClient } from '@supabase/supabase-js';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.scss']
})
export class EventListComponent implements OnInit {
  private supabaseClient: SupabaseClient
  menuItemsSpecial: MenuItem[] = [];
  menuItemsStandart: MenuItem[] = [];
  menuItemsMegaSpecial: MegaMenuItem[] = [];
  menuItemsMegaStandart: MegaMenuItem[] = [];

  selectedGroupId: string | undefined = undefined;
  loading: boolean = false;
  error: boolean = false;
  errorMessage: string | undefined;
  groupUI: GroupUI = {
    isAdmin: false,
    isFollowing: false,
    isMember: false,
    requestedMembership: false
  };
  uiSubscription!: Subscription;

  chips: ChipElement[] = [
    {
      choosen: true,
      label: 'VORSTAND'
    },
    {
      choosen: false,
      label: 'AGs'
    },
    {
      choosen: false,
      label: 'TODO'
    },
    {
      choosen: false,
      label: 'ZUGESAGT'
    },
  ]

  constructor(
    private route: ActivatedRoute,
    private groupsService: GroupsService,
    private groupsServiceState: GroupsServiceState,
    private groupsQuery: GroupsQuery,
  ) {
    this.supabaseClient = createClient(environment.supabaseUrl, environment.supabaseKey);
    this.getSelectedId();
    if(this.selectedGroupId) {
      this.groupsService.isLoggedInUserAdmin(this.selectedGroupId)
      .then(results => {
        if(results.data.is_admin) {
          this.groupsServiceState.updateIsAdmin(this.selectedGroupId!, true);
        }
      });
    }

    if(this.selectedGroupId) {
      this.uiSubscription = this.groupsQuery.selectUI$(this.selectedGroupId).subscribe((ui: GroupUI | undefined) => {
        if (ui) {
          console.log('ui', ui)
          this.groupUI = ui;
        }
      })
    }
   }

  ngOnInit(): void {
    if(this.selectedGroupId) {
      this.checkIfLoggedInUserIsAdmin(this.selectedGroupId);
    }
    if(this.selectedGroupId) {
      this.loadInitialData(this.selectedGroupId);
    }

    if (this.selectedGroupId) {
      this.menuItemsSpecial = groupsMenuitemsParameterLoggedIn(this.selectedGroupId);
      this.menuItemsStandart = groupsMenuitemsParameter(this.selectedGroupId);
      this.menuItemsMegaSpecial = groupsMenuitemsMegaParameterLoggedIn(this.selectedGroupId);
      this.menuItemsMegaStandart = groupsMenuitemsMegaParameter(this.selectedGroupId);
    }
  }

  async checkIfLoggedInUserIsAdmin(selectedGroupId: string): Promise<void> {
    try {
      this.error = false;
      this.loading = true;
      await this.groupsService.isLoggedInUserAdmin(selectedGroupId)
      this.groupsServiceState.updateIsAdmin(selectedGroupId, true);
    } catch(error: any) {
      this.groupsServiceState.updateIsAdmin(selectedGroupId, false);
    } finally {
      this.loading = false;
    }
  }

  async loadInitialData(selectedGroupId: string): Promise<{data: any, error: any}> {
    const messages: {data: any, error: any} = await this.supabaseClient
    .from('events')
    .select('name')
    // .eq('host_group', selectedGroupId)
/*     .rpc('read_events_by_group', {
      group_id: selectedGroupId
    }) */
    // .order('created_at', {ascending: false})

    if(messages.data) {
      console.log(messages)
      // this.chatRoomStore.update({messages: messages.data});
    }
    if(messages.error) throw new Error(messages.error.message);
    return messages;
  }


  getSelectedId(): void {
    this.route.paramMap.subscribe(parameter => {
      this.selectedGroupId = String(parameter.get('id'));
    });
  }

  setFilter(filter: string[]): void {
    console.log('labelList', filter)
  }

}
