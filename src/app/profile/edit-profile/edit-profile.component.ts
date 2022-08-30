import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Session } from '@supabase/supabase-js';
import { MessageService } from 'primeng/api';
import { AuthentificationQuery } from 'src/app/authentification/state/authentification.query';
import { ImgUploadObject, StorageService } from 'src/app/utilities/storage/services/storage.service';
import { ProfileCore } from '../state/profile.model';
import { ProfileQuery } from '../state/profile.query';
import { ProfileService } from '../state/profile.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss'],
  providers: [ MessageService, HttpClient ]
})
export class EditProfileComponent implements OnInit {
  loading: boolean = true;
  profile: ProfileCore | undefined;
  loggedInUserId: string | null = null;

  session: Session | undefined;
  uploading: boolean = false;

  constructor(
    private messageService: MessageService,
    private storageService: StorageService,
    private profileQuery: ProfileQuery,
    private profileService: ProfileService,
    private authentificationQuery: AuthentificationQuery
  ) { }

  ngOnInit(): void {
    this.getLoggedInUserId$();
    this.getSelectedProfile();
    // this.getProfile();
  }

  getLoggedInUserId$(): void {
    this.authentificationQuery.uuid$.subscribe((uuid) => {
      if(uuid) {
        this.loggedInUserId = uuid;
      }
    })
  }

  getSelectedProfile(): void {
    if (this.loggedInUserId) {
      this.profileQuery
        .selectProfileById(this.loggedInUserId)
        .subscribe((profile: ProfileCore | undefined) => {
          if(profile) {
            //Review
            this.profile = JSON.parse(JSON.stringify(profile));
            this.loading = false;
          }
        })
    }
  }

  async updateContactInformation(profile: Partial<ProfileCore>): Promise<void> {
    try {
      this.loading = true;
      await this.profileService.update(this.loggedInUserId, profile)
      this.messageService.add({severity:'success', summary: 'Update erfolgreich.'});
    } catch (error: any) {;
      this.messageService.add({severity:'error', summary: error});
    } finally {
      this.loading = false;
    }
  }

  async updateProfilePhoto(event: any, fileUploader: any) {
    if (!this.profile) return;
    try {
      this.uploading = true;
      const imgUploadObject: ImgUploadObject = this.storageService.createFilePath(event)
      try {
        const avatar_url = await this.storageService.uploadImg(
          imgUploadObject,
          this.profile.avatar_url || undefined,
          'avatars'
        );
        this.profile!.avatar_url = avatar_url
        await this.updateContactInformation({avatar_url:  avatar_url});
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
