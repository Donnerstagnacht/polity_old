import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MegaMenuItem, MenuItem, MessageService } from 'primeng/api';
import { GroupCore } from '../../groups/state/group.model';
import { groupsMenuitemsParameter, groupsMenuitemsMegaParameter} from '../state/groupMenuItems';
import { GroupsService  } from '../state/groups.service';
import { ImgUploadObject, StorageService } from 'src/app/utilities/storage/services/storage.service';
import { Observable } from 'rxjs';
import { GroupsQuery } from '../state/groups.query';

@Component({
  selector: 'app-edit-group',
  templateUrl: './edit-group.component.html',
  styleUrls: ['./edit-group.component.scss'],
  providers: [MessageService]
})
export class EditGroupComponent implements OnInit {
  menuItems: MenuItem[] = [];
  menuItemsMega: MegaMenuItem[] = [];
  selectedGroupId: string = '';
  group!: GroupCore;
  backLink: string = '';
  loading: boolean = false;
  uploading: boolean = false;
  group$ = new Observable<GroupCore | undefined>();

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
      this.getGroupById(this.selectedGroupId);
      this.menuItemsMega = groupsMenuitemsMegaParameter(this.selectedGroupId);
      this.menuItems = groupsMenuitemsParameter(this.selectedGroupId);
      this.backLink = `/groups/${this.selectedGroupId}/edit`;
    }
    this.group = {...this.group}
  }

  getSelectedId(): void {
    this.route.paramMap.subscribe(parameter => {
    this.selectedGroupId = String(parameter.get('id'));
    })
  }

  getGroupById(selectedGroupId: string): void {
    console.log('called')
    this.group$ = this.groupQuery.selectEntity(selectedGroupId);
    this.group$.subscribe((group: GroupCore | undefined) => {
      console.log('inner')
      if(group) {
        console.log(group)
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

        console.log(this.group)
      }
    })

/*     this.groupsService.findGroup(this.selectedGroupId)
    .then((results) => {
      this.group = results.data;
    })
    .catch((error) => {
      console.log(error);
    }); */
  }

  async updateGroup(group: Partial<GroupCore>, id?: string): Promise<void> {
    console.log(group)
    console.log(id)

/*     const updateData: GroupCore =  {
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
    } */
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
