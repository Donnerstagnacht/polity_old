import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MegaMenuItem, MenuItem, MessageService } from 'primeng/api';
import { Group, GroupCore } from '../../groups/state/group.model';
import { groupsMenuitemsParameter, groupsMenuitemsMegaParameter} from '../state/groupMenuItems';
import { GroupsService  } from '../state/groups.service';
import { ImgUploadObject, StorageService } from 'src/app/utilities/storage/services/storage.service';
import { Observable, Subscription } from 'rxjs';
import { GroupsQuery } from '../state/groups.query';
import { RealtimeSubscription } from '@supabase/supabase-js';

@Component({
  selector: 'app-edit-group',
  templateUrl: './edit-group.component.html',
  styleUrls: ['./edit-group.component.scss'],
  providers: [MessageService]
})
export class EditGroupComponent implements OnInit, OnDestroy {
  menuItems: MenuItem[] = [];
  menuItemsMega: MegaMenuItem[] = [];
  selectedGroupId: string = '';
  backLink: string = '';
  loading: boolean = false;
  uploading: boolean = false;
  group$ = new Observable<GroupCore | undefined>();
  group!: GroupCore;

  groupCoreSubscription: Subscription | undefined;
  groupCoreRealtimeSubscription: RealtimeSubscription | undefined;

  constructor(
    private route: ActivatedRoute,
    private groupsService: GroupsService,
    private groupQuery: GroupsQuery,
    private messageService: MessageService,
    private storageService: StorageService
    ) { }

  ngOnInit(): void {
    this.getSelectedId();
    if(this.selectedGroupId) {
      this.menuItemsMega = groupsMenuitemsMegaParameter(this.selectedGroupId);
      this.menuItems = groupsMenuitemsParameter(this.selectedGroupId);
      this.backLink = `/groups/${this.selectedGroupId}/edit`;
    }

    if(this.selectedGroupId) {
      this.groupCoreSubscription = this.groupQuery.selectEntity(this.selectedGroupId).subscribe((group: Group | undefined ) => {
        if(group) {
          this.group = {
            id: group.id,
            created_at: group.created_at,
            name: group.name,
            description: group.description,
            creator: group.creator,
            member_counter: group.member_counter,
            events_counter: group.events_counter,
            level: group.level,
            street: group.street,
            post_code: group.post_code,
            city: group.city,
            contact_phone: group.contact_phone,
            avatar_url: group.avatar_url,
            follower_counter: group.follower_counter,
            amendment_counter: group.amendment_counter,
            contact_email: group.contact_email,
            updated_at: group.updated_at
          }
        } else {
          if(this.selectedGroupId) {
            this.groupsService.findGroup(this.selectedGroupId);
          }
        }
        if(this.selectedGroupId) {
          this.groupCoreRealtimeSubscription = this.groupsService.getRealTimeChanges(this.selectedGroupId);
        }
      });
    }
    this.group = {...this.group}
  }

  ngOnDestroy(): void {
    if(this.groupCoreSubscription) {
      this.groupCoreSubscription.unsubscribe()
    }
    if(this.groupCoreRealtimeSubscription) {
      this.groupCoreRealtimeSubscription.unsubscribe()
    }
  }

  getSelectedId(): void {
    this.route.paramMap.subscribe(parameter => {
    this.selectedGroupId = String(parameter.get('id'));
    })
  }

  async updateGroup(group: Partial<GroupCore>, id?: string): Promise<void> {
    try {
      this.loading = true;
      await this.groupsService.updateGroup(group, id);
      this.messageService.add({severity:'success', summary: 'Update erfolgreich.'});
    } catch (error: any) {;
      this.messageService.add({severity:'error', summary: error});
    } finally {
      this.loading = false;
    }
  }

  async updateGroupPhoto(event: any, fileUploader: any) {
    if (!this.group) return;
    try {
      this.uploading = true;
      const imgUploadObject: ImgUploadObject = this.storageService.createFilePath(event)
      try {
        const avatar_url = await this.storageService.uploadImg(
          imgUploadObject,
          this.group.avatar_url || undefined,
          'avatars'
        );
        this.group!.avatar_url = avatar_url
        this.updateGroup(
          {avatar_url:  avatar_url},
          this.selectedGroupId
        );
        fileUploader.clear();
        this.messageService.add({severity:'success', summary: 'Upload des Avatars war erfolgreich.'});
      } catch (error: any) {
        this.messageService.add({severity:'error', summary: error});
      }
    } catch (error: any) {
      this.messageService.add({severity:'error', summary: error.message});
    } finally {
      this.uploading = false;
    }
  }

}
