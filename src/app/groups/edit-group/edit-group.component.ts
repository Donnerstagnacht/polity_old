import { Component, OnInit, ValueProvider } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MegaMenuItem, MenuItem, MessageService } from 'primeng/api';
import { Group } from '../create-group/create-group.component';
import { groupsMenuitemsParameter, groupsMenuitemsMegaParameter} from '../services/groupMenuItems';
import { GroupsService } from '../services/groups.service';
import { v4 as uuidv4 } from 'uuid';

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
  group: Group | undefined;
  backLink: string = '';
  loading: boolean = false;
  uploading: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private groupsService: GroupsService,
    private messageService: MessageService
    ) { }

  ngOnInit(): void {
    this.getSelectedId();
    if(this.selectedGroupId) {
      this.menuItemsMega = groupsMenuitemsMegaParameter(this.selectedGroupId);
      this.menuItems = groupsMenuitemsParameter(this.selectedGroupId);
      this.backLink = `/groups/${this.selectedGroupId}/edit`;
    }
    this.getGroupById();
  }

  getSelectedId(): void {
    this.route.paramMap.subscribe(parameter => {
    this.selectedGroupId = String(parameter.get('id'));
    })
  }

  getGroupById(): void {
    this.groupsService.findGroup(this.selectedGroupId)
    .then((results) => {
      this.group = results.data;
    })
    .catch((error) => {
      console.log(error);
    });
  }

  async updateGroup(group: Partial<Group>, id?: string): Promise<void> {
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
      if (!event.files || event.files.length === 0 || event.files === undefined) {
        throw new Error('You must select an image to upload.');
      }
      /*File-Upload - Feature */
      const file = event.files[0];
      const fileExt = file.name.split('.').pop();
      const fileName = `${uuidv4()}.${fileExt}`;
      const filePath = `${fileName}`;
      try {
        const avatarUrl = await this.groupsService.uploadAvatar(
          filePath,
          file,
          this.group.avatarUrl || undefined,
        );
        this.group!.avatarUrl = avatarUrl
        console.log(avatarUrl);

        this.updateGroup(
          {
          avatarUrl:  avatarUrl,
          },
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
